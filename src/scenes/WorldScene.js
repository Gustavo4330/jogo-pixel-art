/* =========================================================
   CENA DO MUNDO — onde ela anda, explora e conversa.
   Funciona para qualquer mapa de src/data/maps: as próximas
   fases só precisam de um novo arquivo de mapa + roteiro.
   ========================================================= */

class WorldScene extends Phaser.Scene {
  constructor() { super('World'); }

  init(data) {
    this.mapId = data.mapa;
    this.spawnId = data.spawn;
    this.locked = false;
    this.leaving = false;
    this.cooldown = 0;
  }

  create() {
    const map = (this.map = MAPAS[this.mapId]);
    ArtFactory.currentFase = map.fase;
    const { w, h } = MapBuilder.size(map);
    this.worldW = w * T;
    this.worldH = h * T;
    this.cameras.main.setBackgroundColor('#1d1029');

    // Chão + paredes + portas
    this.add.image(0, 0, MapBuilder.bake(this, map)).setOrigin(0).setDepth(-100);
    this.physics.world.setBounds(0, 0, this.worldW, this.worldH);
    this.solids = this.physics.add.staticGroup();
    MapBuilder.buildSolids(this, map, this.solids);
    this.doors = MapBuilder.buildDoors(this, map);

    // Objetos
    this.objBodies = this.physics.add.staticGroup();
    this.interactables = [];
    (map.objetos || []).forEach((o) => this.addObject(o));

    // Jogadora
    const sp = map.spawns[this.spawnId] || Object.values(map.spawns)[0];
    this.player = new Character(this, sp.x * T, sp.y * T, 'ela', { player: true });
    this.player.face(sp.dir || 'down');
    this.physics.add.collider(this.player.sprite, this.solids);
    this.physics.add.collider(this.player.sprite, this.objBodies);

    // NPCs
    this.npcs = {};
    (map.npcs || []).forEach((n) => this.addNpc(n));

    // Estrelas bônus
    this.stars = [];
    (map.bonus || []).forEach((b) => { if (!SaveSystem.hasBonus(b.id)) this.addStar(b); });

    // Balãozinho de "pode interagir"
    this.hint = this.add.image(0, 0, 'bubble').setOrigin(0.5, 1).setDepth(100000).setVisible(false);
    this.tweens.add({ targets: this.hint, scale: { from: 1, to: 1.12 }, duration: 380, yoyo: true, repeat: -1 });

    // Luz de fim de tarde: tudo fica levemente alaranjado
    if (map.luz === 'entardecer') {
      this.add.rectangle(0, 0, this.worldW, this.worldH, 0xff7a3d, 0.16).setOrigin(0).setDepth(99000);
    }

    // Seta guia (mostra para onde ir)
    this.guide = this.add.image(0, 0, 'arrow').setDepth(100002).setVisible(false);

    // Câmera
    this.onResize();
    this.updateCamera(true);
    this.scale.on('resize', this.onResize, this);
    this.events.once('shutdown', () => this.scale.off('resize', this.onResize, this));

    UI.hud.show(map.fase);
    Controls.setVisible(true);
    Controls.consumeAction();

    this.locked = true; // espera o fade antes de liberar o movimento
    this.time.delayedCall(60, async () => {
      await UI.fade(false);
      this.locked = false;
      const ae = map.aoEntrar;
      if (ae && !SaveSystem.flag(ae.flag)) {
        await this.runScript(ae.roteiro);
        SaveSystem.setFlag(ae.flag);
      }
    });
  }

  /* ---------------- construção ---------------- */

  addObject(o) {
    const def = OBJETOS[o.tipo];
    if (!def) { console.warn('Objeto desconhecido:', o.tipo); return; }
    const x = o.x * T, y = o.y * T;
    this.add.image(x, y, def.tex).setOrigin(0.5, 1).setDepth(y);
    if (def.corpo) {
      const [bw, bh] = def.corpo;
      const z = this.add.zone(x, y - bh / 2, bw, bh);
      this.physics.add.existing(z, true);
      this.objBodies.add(z);
      if (o.texto || o.roteiro) this.interactables.push({ zone: z, data: o });
    }
  }

  addNpc(n) {
    const c = new Character(this, n.x * T, n.y * T, n.id);
    c.face(n.dir || 'down');
    c.data = n;
    c.home = { x: c.x, y: c.y };
    c.walkUntil = 0;
    c.nextThink = this.time.now + 800 + Math.random() * 2000;
    this.physics.add.collider(this.player.sprite, c.sprite);
    this.physics.add.collider(c.sprite, this.solids);
    this.physics.add.collider(c.sprite, this.objBodies);
    for (const other of Object.values(this.npcs)) this.physics.add.collider(c.sprite, other.sprite);
    if (n.oculto) this.setHidden(c, true);
    if (n.destaque && !SaveSystem.flag(`fase${this.map.fase}_concluida`)) {
      c.bubble = this.add.image(c.x, c.y - 25, 'bubbleHeart').setOrigin(0.5, 1).setDepth(99999);
    }
    this.npcs[n.id] = c;
  }

  setHidden(c, hidden) {
    c.hidden = hidden;
    c.sprite.setVisible(!hidden);
    c.shadow.setVisible(!hidden);
    c.sprite.body.enable = !hidden;
  }

  /** Faz um personagem escondido aparecer (ex.: amigos chegando). */
  appear(id) {
    const c = this.npcs[id];
    if (!c) return;
    this.setHidden(c, false);
    AudioSystem.play('door');
    c.sprite.setAlpha(0);
    this.tweens.add({ targets: c.sprite, alpha: 1, duration: 300 });
  }

  /** Move personagens de lugar de uma vez (usado durante transições). */
  place(posicoes) {
    for (const [id, [x, y, dir]] of Object.entries(posicoes)) {
      const c = this.charById(id);
      if (!c) continue;
      c.sprite.setPosition(x * T, y * T);
      c.sprite.body.reset(x * T, y * T);
      if (dir) c.face(dir);
      c.sync();
      if (c.bubble) { c.bubble.destroy(); c.bubble = null; }
    }
    this.updateCamera(true);
  }

  addStar(b) {
    const x = b.x * T, y = b.y * T;
    const img = this.add.image(x, y - 6, 'star').setDepth(y);
    this.tweens.add({ targets: img, y: y - 9, duration: 700, yoyo: true, repeat: -1, ease: 'Sine.inOut' });
    this.tweens.add({ targets: img, alpha: 0.65, duration: 500, yoyo: true, repeat: -1 });
    this.time.addEvent({
      delay: 900, loop: true, callback: () => {
        if (!img.active) return;
        const s = this.add.image(x + Phaser.Math.Between(-7, 7), y - Phaser.Math.Between(4, 16), 'sparkle').setDepth(y + 1);
        this.tweens.add({ targets: s, alpha: 0, scale: 0.3, duration: 600, onComplete: () => s.destroy() });
      },
    });
    this.stars.push({ img, x, y, id: b.id });
  }

  /* ---------------- câmera ---------------- */

  onResize() {
    const cam = this.cameras.main;
    const w = this.scale.width, h = this.scale.height;
    cam.setSize(w, h);
    cam.setZoom(Math.max(1, Math.floor(Math.min(w, h) / (CONFIG.tilesVisiveis * T))));
    this.updateCamera(true);
  }

  updateCamera(instant) {
    if (!this.player) return;
    const cam = this.cameras.main;
    const z = cam.zoom;
    const vw = cam.width / z, vh = cam.height / z;
    let tx = this.player.x - vw / 2;
    let ty = this.player.y - 12 - vh / 2;
    tx = this.worldW <= vw ? (this.worldW - vw) / 2 : Phaser.Math.Clamp(tx, 0, this.worldW - vw);
    // durante diálogos a câmera pode descer um pouco além do mapa,
    // para a caixa de diálogo não cobrir os personagens
    const extra = this.locked && !UI.$('#dialog').hidden ? vh * 0.32 : 0;
    if (extra) ty += extra * 0.6;
    ty = this.worldH + extra <= vh ? (this.worldH - vh) / 2 + extra / 2 : Phaser.Math.Clamp(ty, 0, this.worldH - vh + extra);
    const sx = tx - (cam.width - vw) / 2, sy = ty - (cam.height - vh) / 2;
    if (instant) { cam.scrollX = sx; cam.scrollY = sy; }
    else { cam.scrollX += (sx - cam.scrollX) * 0.2; cam.scrollY += (sy - cam.scrollY) * 0.2; }
    cam.scrollX = Math.round(cam.scrollX * z) / z;
    cam.scrollY = Math.round(cam.scrollY * z) / z;
  }

  /* ---------------- loop principal ---------------- */

  update(time) {
    if (!this.player) return;
    const act = Controls.consumeAction();

    if (!this.locked) {
      const d = Controls.getDir();
      if (d) this.player.move(d, CONFIG.velocidade);
      else if (this.player.sprite.body.velocity.lengthSq() > 0 || this.player.sprite.anims.isPlaying) this.player.stop();

      for (const door of this.doors) {
        if (this.physics.overlap(this.player.sprite, door)) { this.goTo(door.porta); break; }
      }

      for (const s of this.stars) {
        if (s.img.active && Phaser.Math.Distance.Between(this.player.x, this.player.y, s.x, s.y) < 11) this.collectStar(s);
      }

      const target = this.locked ? null : this.findTarget();
      this.showHint(target);
      if (act && target && time > this.cooldown) this.interact(target);
    } else {
      this.hint.setVisible(false);
    }

    this.updateNpcs(time);
    this.player.sync();
    this.updateCamera(false);
    this.updateGuide(time);
  }

  /* ---------------- dicas: objetivo + seta ---------------- */

  currentGoal() {
    return (this.map.objetivos || []).find((o) =>
      (!o.se || SaveSystem.flag(o.se)) && (!o.seNao || !SaveSystem.flag(o.seNao)));
  }

  updateGuide(time) {
    const g = this.leaving ? null : this.currentGoal();
    UI.hud.goal(g ? g.texto : null);
    if (!g || this.locked) { this.guide.setVisible(false); return; }
    let tx, ty;
    if (g.alvo.npc) {
      const c = this.npcs[g.alvo.npc];
      if (!c) { this.guide.setVisible(false); return; }
      tx = c.x; ty = c.y - (c.bubble ? 47 : 32);
    } else {
      tx = g.alvo.x * T; ty = g.alvo.y * T - 10;
    }
    const v = this.cameras.main.worldView;
    const m = 12;
    const bob = Math.sin(time / 170) * 2.5;
    this.guide.setVisible(true);
    if (tx > v.x + m && tx < v.right - m && ty > v.y + m && ty < v.bottom - m) {
      this.guide.setPosition(Math.round(tx), Math.round(ty + bob)).setRotation(0);
    } else {
      // fora da tela: a seta fica na borda apontando na direção certa
      const cx = v.centerX, cy = v.centerY;
      const ang = Math.atan2(ty - cy, tx - cx);
      const hw = v.width / 2 - m, hh = v.height / 2 - m;
      const k = Math.min(hw / Math.abs(Math.cos(ang) || 1e-6), hh / Math.abs(Math.sin(ang) || 1e-6));
      const ox = Math.cos(ang) * (k - Math.abs(bob)), oy = Math.sin(ang) * (k - Math.abs(bob));
      this.guide.setPosition(Math.round(cx + ox), Math.round(cy + oy)).setRotation(ang - Math.PI / 2);
    }
  }

  updateNpcs(time) {
    for (const c of Object.values(this.npcs)) {
      const n = c.data;
      if (n.passear && !this.locked) {
        if (c.walkUntil > time) {
          c.move(c.dir, 28);
        } else {
          if (c.sprite.body.velocity.lengthSq() > 0) c.stop();
          if (time > c.nextThink) {
            c.nextThink = time + 1400 + Math.random() * 2600;
            if (Math.random() < 0.65) {
              const far = Phaser.Math.Distance.Between(c.x, c.y, c.home.x, c.home.y) > 2.5 * T;
              let dir = Phaser.Utils.Array.GetRandom(['up', 'down', 'left', 'right']);
              if (far) {
                const dx = c.home.x - c.x, dy = c.home.y - c.y;
                dir = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up');
              }
              c.dir = dir;
              c.walkUntil = time + 350 + Math.random() * 600;
            } else {
              c.face(Phaser.Utils.Array.GetRandom(['up', 'down', 'left', 'right']));
            }
          }
        }
      } else if (c.sprite.body.velocity.lengthSq() > 0) {
        c.stop();
      }
      c.sync();
      if (c.bubble) {
        // o balão acompanha o personagem e some durante as conversas
        c.bubble.setPosition(c.x, Math.round(c.y - 25 + Math.sin(time / 190) * 1.5)).setVisible(!this.locked);
      }
    }
  }

  /* ---------------- interação ---------------- */

  findTarget() {
    const [dx, dy] = DIR_VEC[this.player.dir];
    const px = this.player.x + dx * 14;
    const py = this.player.y - 3 + dy * 14;
    const inRect = (b, pad) => px >= b.x - pad && px <= b.right + pad && py >= b.y - pad && py <= b.bottom + pad;

    for (const c of Object.values(this.npcs)) {
      if (!c.hidden && c.data.roteiro && inRect(c.sprite.body, 6)) return { npc: c, x: c.x, y: c.y - 25 };
    }
    for (const it of this.interactables) {
      const b = it.zone.body;
      if (inRect(b, 3)) return { obj: it.data, x: b.center.x, y: b.y - 4 };
    }
    const tx = Math.floor(px / T), ty = Math.floor(py / T);
    const def = MapBuilder.defAt(this.map, tx, ty);
    if (def && def.texto) return { texto: def.texto, x: (tx + 0.5) * T, y: ty * T + 4 };
    return null;
  }

  showHint(target) {
    if (!target || (target.npc && target.npc.bubble)) { this.hint.setVisible(false); return; }
    this.hint.setPosition(target.x, target.y).setVisible(true);
  }

  interact(target) {
    if (target.npc) {
      const c = target.npc;
      c.walkUntil = 0;
      c.stop();
      c.faceTowards(this.player.x, this.player.y);
      this.runScript(c.data.roteiro).then(() => {
        if (c.bubble && SaveSystem.flag(`fase${this.map.fase}_concluida`)) { c.bubble.destroy(); c.bubble = null; }
      });
    } else if (target.obj) {
      if (target.obj.roteiro) this.runScript(target.obj.roteiro);
      else this.runScript([{ passos: [{ quem: 'narrador', fala: target.obj.texto }] }]);
    } else if (target.texto) {
      this.runScript([{ passos: [{ quem: 'narrador', fala: target.texto }] }]);
    }
  }

  async runScript(ref) {
    const v = ScriptRunner.pick(ref);
    if (!v) return;
    this.locked = true;
    this.player.stop();
    Controls.setVisible(false);
    try {
      await ScriptRunner.run(this, v.passos);
    } catch (e) {
      console.error(e);
    }
    UI.dialog.hide();
    if (this.leaving || !this.sys.isActive()) return;
    this.locked = false;
    Controls.consumeAction();
    this.cooldown = this.time.now + 250;
    Controls.setVisible(true);
  }

  charById(id) {
    if (id === 'ela' || id === 'jogador') return this.player;
    return this.npcs[id];
  }

  lookAt(quem, para) {
    const a = this.charById(quem), b = this.charById(para);
    if (!a || !b) return;
    a.faceTowards(b.x, b.y);
    b.faceTowards(a.x, a.y);
  }

  /** Faz um personagem andar até ficar ao lado de outro. */
  walkTo(quem, para, dist = 13) {
    const c = this.charById(quem), t = this.charById(para);
    if (!c || !t) return Promise.resolve();
    const side = c.x >= t.x ? 1 : -1;
    const tx = t.x + side * dist, ty = t.y;
    const d = Math.hypot(tx - c.x, ty - c.y);
    if (d < 1) return Promise.resolve();
    c.dir = Math.abs(tx - c.x) > Math.abs(ty - c.y) ? (tx > c.x ? 'right' : 'left') : (ty > c.y ? 'down' : 'up');
    c.sprite.play(`${c.key}-walk-${c.dir}`);
    return new Promise((resolve) => {
      this.tweens.add({
        targets: c.sprite, x: tx, y: ty, duration: (d / 38) * 1000,
        onComplete: () => {
          c.face(c.dir);
          c.faceTowards(t.x, t.y);
          t.faceTowards(c.x, c.y);
          resolve();
        },
      });
    });
  }

  /** Cena do beijo: os dois se aproximam e a tela se enche de corações. */
  async kiss(texto) {
    const ele = this.npcs.ele;
    if (ele) await this.walkTo('ele', 'jogador', 8);
    this.emote('ela', 'coracao');
    if (ele) this.emote('ele', 'coracao');
    await UI.wait(700);
    AudioSystem.play('victory');
    await UI.kiss(texto);
  }

  emote(quem, tipo) {
    const c = this.charById(quem);
    if (!c) return Promise.resolve();
    AudioSystem.play(tipo === 'coracao' ? 'heart' : 'select');
    const img = this.add.image(c.x, c.y - 24, tipo === 'coracao' ? 'bubbleHeart' : 'bubble')
      .setOrigin(0.5, 1).setDepth(100001).setScale(0);
    return new Promise((resolve) => {
      this.tweens.add({
        targets: img, scale: 1, y: c.y - 27, duration: 220, ease: 'Back.out',
        onComplete: () => this.tweens.add({
          targets: img, alpha: 0, delay: 650, duration: 250,
          onComplete: () => { img.destroy(); resolve(); },
        }),
      });
    });
  }

  celebrate() {
    AudioSystem.play('victory');
    const v = this.cameras.main.worldView;
    for (let i = 0; i < 46; i++) {
      const x = v.x + Math.random() * v.width;
      const y = v.bottom + 10 + Math.random() * 40;
      const hrt = this.add.image(x, y, 'heart').setDepth(200000).setScale(0.6 + Math.random() * 0.9);
      this.tweens.add({
        targets: hrt, y: v.y - 20, x: x + Phaser.Math.Between(-30, 30), duration: 1500 + Math.random() * 1400,
        delay: Math.random() * 900, ease: 'Sine.in', onComplete: () => hrt.destroy(),
      });
    }
    this.emote('ela', 'coracao');
    if (this.npcs.ele) this.emote('ele', 'coracao');
    return UI.wait(2400);
  }

  async collectStar(s) {
    s.img.destroy();
    SaveSystem.collectBonus(s.id);
    this.locked = true;
    this.player.stop();
    Controls.setVisible(false);
    await UI.memory(s.id);
    UI.toast(`${UI.heart()} Memória guardada! (${SaveSystem.data.bonus.length}/${Object.keys(BONUS).length})`);
    this.locked = false;
    Controls.consumeAction();
    Controls.setVisible(true);
  }

  async goTo(porta) {
    if (this.leaving) return;
    this.leaving = true;
    this.locked = true;
    this.player.stop();
    AudioSystem.play('door');
    await UI.fade(true);
    this.scene.restart({ mapa: porta.para, spawn: porta.spawn });
  }

  async completePhase(id) {
    SaveSystem.complete(id);
    this.leaving = true;
    Controls.setVisible(false);
    const next = FASES.find((f) => f.id === id + 1);
    const nextTxt = next
      ? (next.disponivel
        ? `Fase desbloqueada: <b>${UI.esc(next.nome)}</b>`
        : `Próxima fase: <b>${UI.esc(next.nome)}</b> — em breve! ${UI.heart()}`)
      : '';
    await UI.modal(`
      <div class="big-heart">${UI.heart()}</div>
      <h2>Fase ${id} concluída!</h2>
      <p>Mais uma memória guardada no nosso coração.</p>
      <p class="unlock">${nextTxt}</p>`, { botao: 'Mapa das memórias', classe: 'complete' });
    await UI.fade(true);
    UI.hud.hide();
    this.scene.start('Menu', { view: 'fases' });
  }
}
