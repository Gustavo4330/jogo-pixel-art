/* =========================================================
   FÁBRICA DE ARTE — transforma os desenhos em texturas do Phaser.
   ========================================================= */

const ArtFactory = {
  portraits: {},   // urls (data:) dos retratos para a interface
  icons: {},       // urls (data:) de ícones/itens para a interface
  EXPRESSOES: ['normal', 'feliz', 'timido', 'surpreso'],

  currentFase: null, // fase em andamento (define as roupas)

  /** Roupa da fase: junta o visual padrão com o que a fase troca. */
  outfit(id, faseId) {
    const f = FASES.find((x) => x.id === faseId);
    return f && f.roupas && f.roupas[id];
  },

  visualFor(id, faseId) {
    const o = this.outfit(id, faseId);
    return o ? Object.assign({}, PERSONAGENS[id].visual, o) : PERSONAGENS[id].visual;
  },

  textureKey(id, faseId) {
    return this.outfit(id, faseId) ? `char_${id}_f${faseId}` : `char_${id}`;
  },

  /** Cria (uma vez) a folha de sprites, animações e retratos do personagem com a roupa da fase. */
  ensureCharacter(scene, id, faseId) {
    const key = this.textureKey(id, faseId);
    const visual = this.visualFor(id, faseId);
    if (!scene.textures.exists(key)) {
      const t = scene.textures.addCanvas(key, CharacterArt.sheet(visual));
      for (let i = 0; i < 12; i++) t.add(i, 0, (i % 3) * 16, Math.floor(i / 3) * 24, 16, 24);
    }
    CharacterArt.DIRS.forEach((dir, row) => {
      const ak = `${key}-walk-${dir}`;
      if (scene.anims.exists(ak)) return;
      scene.anims.create({ key: ak, frames: [1, 0, 2, 0].map((c) => ({ key, frame: row * 3 + c })), frameRate: 8, repeat: -1 });
    });
    if (!this.portraits[key]) {
      this.portraits[key] = {};
      for (const e of this.EXPRESSOES) this.portraits[key][e] = CharacterArt.portrait(visual, e).toDataURL();
    }
    return key;
  },

  /** Retratos do personagem com a roupa da fase atual. */
  portraitsFor(id) {
    if (!PERSONAGENS[id] || !PERSONAGENS[id].visual) return null;
    return this.portraits[this.textureKey(id, this.currentFase)] || this.portraits['char_' + id];
  },

  generateAll(scene) {
    const tex = scene.textures;

    // Personagens com a roupa padrão
    for (const [id, p] of Object.entries(PERSONAGENS)) if (p.visual) this.ensureCharacter(scene, id, null);

    // Objetos e ícones
    for (const [name, fn] of Object.entries(ObjectArt)) {
      if (tex.exists(name)) continue;
      const c = fn();
      tex.addCanvas(name, c);
      this.icons[name] = c.toDataURL();
    }

    // Céu em degradê para menus
    if (!tex.exists('sky')) {
      const { c, ctx } = Pixel.canvas(1, 64);
      const stops = ['#1b0f2e', '#2c1640', '#47205a', '#6e2d6e', '#a2447f', '#d9729a'];
      for (let y = 0; y < 64; y++) {
        const i = Math.min(stops.length - 1, Math.floor((y / 64) * stops.length));
        ctx.fillStyle = stops[i];
        ctx.fillRect(0, y, 1, 1);
      }
      tex.addCanvas('sky', c);
    }
  },
};
