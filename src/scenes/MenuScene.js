/* =========================================================
   CENA DE MENU — tela de título, mapa das fases e memórias.
   O fundo (céu estrelado + o casal) é desenhado pelo Phaser;
   os botões são HTML (src/ui/UI.js + style.css).
   ========================================================= */

const LOCK_SVG = `<svg class="px-lock" viewBox="0 0 7 8" shape-rendering="crispEdges" aria-hidden="true">
  <rect x="2" y="0" width="3" height="1"/><rect x="1" y="1" width="1" height="3"/><rect x="5" y="1" width="1" height="3"/>
  <rect x="0" y="3" width="7" height="5"/></svg>`;

class MenuScene extends Phaser.Scene {
  constructor() { super('Menu'); }

  init(data) {
    this.view = (data && data.view) || 'titulo';
  }

  create() {
    UI.hud.hide();
    UI.dialog.hide();
    Controls.setVisible(false);

    this.sky = this.add.image(0, 0, 'sky').setOrigin(0);
    this.starsLayer = [];
    for (let i = 0; i < 70; i++) {
      const s = this.add.image(0, 0, Math.random() < 0.15 ? 'sparkle' : 'pixel');
      s.rx = Math.random(); s.ry = Math.random() * 0.62;
      s.setAlpha(0.4 + Math.random() * 0.6);
      this.tweens.add({ targets: s, alpha: 0.15, duration: 700 + Math.random() * 1800, yoyo: true, repeat: -1, delay: Math.random() * 1500 });
      this.starsLayer.push(s);
    }
    this.moon = this.add.image(0, 0, 'moon');
    this.hill = this.add.graphics();
    this.couple = [
      this.add.sprite(0, 0, 'char_ela', CharacterArt.frameIndex('right', 0)).setOrigin(0.5, 1),
      this.add.sprite(0, 0, 'char_ele', CharacterArt.frameIndex('left', 0)).setOrigin(0.5, 1),
    ];
    this.heart = this.add.image(0, 0, 'bigHeart').setOrigin(0.5, 1);
    this.floaters = [];
    this.time.addEvent({ delay: 650, loop: true, callback: () => this.spawnFloater() });

    this.layout();
    this.scale.on('resize', this.layout, this);
    this.events.once('shutdown', () => { this.scale.off('resize', this.layout, this); UI.hideScreen(); });

    this.show(this.view);
    UI.fade(false);
  }

  layout() {
    const W = this.scale.width, H = this.scale.height;
    this.cameras.main.setSize(W, H);
    this.sky.setDisplaySize(W, H);
    this.starsLayer.forEach((s) => s.setPosition(Math.round(s.rx * W), Math.round(s.ry * H)).setScale(Math.max(1, Math.round(Math.min(W, H) / 400))));
    const s = Math.max(2, Math.floor(Math.min(W, H) / 120));
    this.s = s;
    const gy = Math.round(H * (W > H ? 0.68 : 0.6));
    this.moon.setPosition(W * 0.82, H * (W > H ? 0.16 : 0.27)).setScale(s * 0.8);
    this.hill.clear();
    this.hill.fillStyle(0x2a1638, 1);
    this.hill.fillEllipse(W / 2, gy + H * 0.5, Math.max(W * 1.4, 600), H);
    this.hill.fillStyle(0x3d1f4d, 1);
    this.hill.fillEllipse(W / 2, gy + 4 * s, 70 * s, 10 * s);
    this.couple[0].setPosition(W / 2 - 7 * s, gy + 3 * s).setScale(s);
    this.couple[1].setPosition(W / 2 + 7 * s, gy + 3 * s).setScale(s);
    this.heart.setPosition(W / 2, gy - 26 * s).setScale(s * 0.55);
    this.tweens.killTweensOf(this.heart);
    this.tweens.add({ targets: this.heart, y: gy - 29 * s, duration: 900, yoyo: true, repeat: -1, ease: 'Sine.inOut' });
    this.gy = gy;
  }

  spawnFloater() {
    const W = this.scale.width;
    const h = this.add.image(W / 2 + Phaser.Math.Between(-40, 40) * this.s / 2, this.gy - 20 * this.s, 'heart').setScale(this.s * 0.5).setAlpha(0.9);
    this.tweens.add({ targets: h, y: h.y - 50 * this.s, x: h.x + Phaser.Math.Between(-15, 15) * this.s, alpha: 0, duration: 2600, onComplete: () => h.destroy() });
  }

  /* ---------------- telas ---------------- */

  show(view) {
    this.view = view;
    if (view === 'fases') this.showPhases();
    else if (view === 'memorias') this.showMemories();
    else this.showTitle();
  }

  showTitle() {
    const d = SaveSystem.data;
    const nb = d.bonus.length, tb = Object.keys(BONUS).length;
    UI.screen(`
      <div class="title-screen">
        <div class="title-top">
          <div class="logo" data-action="logo">${UI.heart('big')} <span>${UI.esc(CONFIG.titulo)}</span></div>
          <div class="subtitle">${UI.esc(CONFIG.subtitulo)}</div>
        </div>
        <div class="title-bottom">
          ${SaveSystem.hasProgress()
            ? '<button class="btn primary" data-action="continuar">▶ Continuar</button>'
            : '<button class="btn primary" data-action="novo">▶ Começar</button>'}
          <button class="btn" data-action="memorias">${UI.heart()} Memórias ${nb}/${tb}</button>
          <div class="row">
            <button class="btn small" data-action="som">Som: ${d.som ? 'ligado' : 'desligado'}</button>
            <button class="btn small" data-action="musica">Música: ${d.musica ? 'ligada' : 'desligada'}</button>
          </div>
          <div class="hint">Dica: jogue com o celular deitado ${UI.heart()}</div>
        </div>
      </div>`, (a) => this.onAction(a));
  }

  showPhases() {
    const creator = SaveSystem.creatorMode();
    const cards = FASES.map((f) => {
      const done = SaveSystem.isCompleted(f.id);
      const unlocked = SaveSystem.isUnlocked(f.id);
      let state, label;
      if (done) { state = 'done'; label = `${UI.heart()} Concluída`; }
      else if (unlocked && f.disponivel) { state = 'open'; label = '▶ Jogar'; }
      else if (unlocked) { state = 'soon'; label = creator ? 'Em construção' : 'Em breve'; }
      else { state = 'locked'; label = LOCK_SVG; }
      const secret = f.boss && !done && !creator;
      const nome = secret ? '???' : (f.boss ? f.nomeReal : f.nome);
      const sub = secret ? 'Uma surpresa te espera...' : [f.local, f.data].filter(Boolean).join(' • ');
      const playable = done || unlocked;
      return `
        <button class="phase-card ${state} ${f.boss ? 'boss' : ''}" data-action="fase" data-id="${f.id}" ${playable ? '' : 'disabled'}>
          <span class="pc-num">${f.boss ? UI.heart() : f.id}</span>
          <span class="pc-info"><span class="pc-name">${UI.esc(nome)}</span><span class="pc-sub">${UI.esc(sub)}</span></span>
          <span class="pc-state">${label}</span>
        </button>`;
    }).join('');
    UI.screen(`
      <div class="panel-screen">
        <div class="screen-head">
          <button class="btn small icon" data-action="titulo" aria-label="Voltar">◀</button>
          <h1>${UI.heart()} Mapa das Memórias</h1>
        </div>
        ${creator ? `<div class="creator-note">Modo criador: todas as fases liberadas</div>` : ''}
        <div class="phase-list">${cards}</div>
        <div class="screen-foot">
          <button class="btn small" data-action="memorias">${UI.heart()} Memórias bônus</button>
          <button class="btn small ghost" data-action="reset">Recomeçar do zero</button>
        </div>
      </div>`, (a, ds) => this.onAction(a, ds));
  }

  showMemories() {
    const items = Object.entries(BONUS).map(([id, b]) => {
      const got = SaveSystem.hasBonus(id);
      return got
        ? `<button class="memory-item got" data-action="memoria" data-id="${id}"><span class="mi-star">★</span><span>${UI.esc(b.titulo)}</span></button>`
        : `<div class="memory-item"><span class="mi-star off">★</span><span>??? — uma estrelinha escondida em algum mapa</span></div>`;
    }).join('');
    UI.screen(`
      <div class="panel-screen">
        <div class="screen-head">
          <button class="btn small icon" data-action="voltar" aria-label="Voltar">◀</button>
          <h1>${UI.heart()} Memórias bônus</h1>
        </div>
        <div class="memory-list">${items}</div>
        <p class="screen-note">Procure estrelinhas brilhando pelos cenários. Cada uma guarda uma lembrança nossa.</p>
      </div>`, (a, ds) => this.onAction(a, ds));
  }

  /* ---------------- ações dos botões ---------------- */

  async onAction(a, ds = {}) {
    switch (a) {
      case 'novo':
        UI.hideScreen();
        await UI.card('Nossa História', 'Esta é uma aventura feita só para você. Cada fase é um pedacinho da nossa história. Pronta para relembrar tudo comigo?', 'Vamos lá! ♥');
        this.startPhase(1);
        break;
      case 'continuar': this.show('fases'); break;
      case 'logo': {
        // toque 5 vezes seguidas no título para ligar/desligar o modo criador
        const now = Date.now();
        this.logoTaps = now - (this.lastLogoTap || 0) < 700 ? (this.logoTaps || 0) + 1 : 1;
        this.lastLogoTap = now;
        if (this.logoTaps >= 5) {
          this.logoTaps = 0;
          SaveSystem.setOption('modoCriador', !SaveSystem.data.modoCriador);
          UI.toast(SaveSystem.data.modoCriador
            ? `${UI.heart()} Modo criador ligado: todas as fases liberadas`
            : 'Modo criador desligado');
        }
        break;
      }
      case 'titulo': this.show('titulo'); break;
      case 'memorias': this.prev = this.view; this.show('memorias'); break;
      case 'voltar': this.show(this.prev || 'titulo'); break;
      case 'memoria': await UI.memory(ds.id); break;
      case 'som': AudioSystem.setSound(!SaveSystem.data.som); this.show('titulo'); break;
      case 'musica': AudioSystem.setMusic(!SaveSystem.data.musica); this.show('titulo'); break;
      case 'fase': this.startPhase(Number(ds.id)); break;
      case 'reset':
        if (await UI.confirm('Recomeçar?', 'Isso apaga todo o progresso e as memórias encontradas.', 'Apagar e recomeçar', 'Cancelar')) { SaveSystem.reset(); this.show('titulo'); }
        break;
    }
  }

  async startPhase(id) {
    const fase = FASES.find((f) => f.id === id);
    if (!fase) return;
    if (!fase.disponivel) {
      await UI.card(fase.boss && !SaveSystem.creatorMode() ? 'Fase final' : `Fase ${fase.id}: ${fase.boss ? fase.nomeReal : fase.nome}`,
        'Esta fase ainda está sendo construída com muito carinho. Volte em breve! ♥', 'Voltar');
      this.show('fases');
      return;
    }
    // Recomeça a história da fase (mantém a fase como concluída)
    for (const k of Object.keys(SaveSystem.data.flags)) {
      if (k.startsWith(`f${id}_`) || k === `fase${id}_concluida`) delete SaveSystem.data.flags[k];
    }
    SaveSystem.save();
    UI.hideScreen();
    await UI.phaseIntro(fase);
    await UI.fade(true);
    this.scene.start('World', { mapa: fase.mapa, spawn: fase.spawn });
  }
}
