/* =========================================================
   FÁBRICA DE ARTE — transforma os desenhos em texturas do Phaser.
   ========================================================= */

const ArtFactory = {
  portraits: {},   // urls (data:) dos retratos para a interface
  icons: {},       // urls (data:) de ícones/itens para a interface
  EXPRESSOES: ['normal', 'feliz', 'timido', 'surpreso'],

  generateAll(scene) {
    const tex = scene.textures;

    // Personagens: folha de sprites + animações + retratos
    for (const [id, p] of Object.entries(PERSONAGENS)) {
      if (!p.visual) continue;
      const key = 'char_' + id;
      if (!tex.exists(key)) {
        const t = tex.addCanvas(key, CharacterArt.sheet(p.visual));
        for (let i = 0; i < 12; i++) t.add(i, 0, (i % 3) * 16, Math.floor(i / 3) * 24, 16, 24);
      }
      CharacterArt.DIRS.forEach((dir, row) => {
        const ak = `${id}-walk-${dir}`;
        if (scene.anims.exists(ak)) return;
        scene.anims.create({
          key: ak,
          frames: [1, 0, 2, 0].map((c) => ({ key, frame: row * 3 + c })),
          frameRate: 8,
          repeat: -1,
        });
      });
      this.portraits[id] = {};
      for (const e of this.EXPRESSOES) this.portraits[id][e] = CharacterArt.portrait(p.visual, e).toDataURL();
    }

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
