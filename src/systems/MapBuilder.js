/* =========================================================
   CONSTRUTOR DE MAPAS — lê os arquivos de src/data/maps e
   desenha o chão, cria as paredes (colisão) e as portas.
   ========================================================= */

const T = 16; // tamanho do tile em pixels

const MapBuilder = {
  size(map) {
    return { w: map.chao[0].length, h: map.chao.length };
  },

  charAt(map, x, y) {
    if (y < 0 || y >= map.chao.length || x < 0 || x >= map.chao[0].length) return null;
    return map.chao[y][x];
  },

  defAt(map, x, y) {
    const ch = this.charAt(map, x, y);
    return ch == null ? null : map.legenda[ch];
  },

  /** Desenha todo o chão do mapa numa única imagem (rápido no celular). */
  bake(scene, map) {
    const key = 'map_' + map.id;
    if (scene.textures.exists(key)) return key;
    const { w, h } = this.size(map);
    const { c, ctx } = Pixel.canvas(w * T, h * T);
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const ch = map.chao[y][x];
        const def = map.legenda[ch];
        if (!def) { console.warn(`Mapa ${map.id}: letra "${ch}" sem legenda (x=${x}, y=${y})`); continue; }
        const fn = TileArt[def.tile];
        if (!fn) { console.warn(`Tile "${def.tile}" não existe`); continue; }
        const r = Pixel.rng(x * 7919 + y * 104729 + 17);
        const n = (dx, dy) => this.charAt(map, x + dx, y + dy);
        fn(ctx, x * T, y * T, r, n, def);
      }
    }
    if (map.luz === 'entardecer') this.sunBeams(ctx, map, w, h);
    scene.textures.addCanvas(key, c);
    return key;
  },

  /** Raios de sol entrando pelas janelas (luz de fim de tarde). */
  sunBeams(ctx, map, w, h) {
    ctx.save();
    ctx.fillStyle = 'rgba(255, 176, 96, 0.17)';
    for (let x = 0; x < w; x++) {
      if (map.chao[1][x] !== 'J' || map.chao[1][x - 1] === 'J') continue;
      let len = 1;
      while (map.chao[1][x + len] === 'J') len++;
      const x0 = x * T, x1 = (x + len) * T;
      ctx.beginPath();
      ctx.moveTo(x0, 3 * T); ctx.lineTo(x1, 3 * T);
      ctx.lineTo(x1 + 4 * T, h * T); ctx.lineTo(x0 + 4 * T, h * T);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
  },

  /** Agrupa tiles vizinhos que satisfazem test() em retângulos. */
  runs(map, test) {
    const { w, h } = this.size(map);
    const rects = [];
    for (let y = 0; y < h; y++) {
      let start = -1, key = null, startDef = null;
      for (let x = 0; x <= w; x++) {
        const def = x < w ? map.legenda[map.chao[y][x]] : null;
        const k = def ? test(def) : false;
        if (start >= 0 && k !== key) {
          rects.push({ x: start, y, w: x - start, def: startDef });
          start = -1;
        }
        if (k && start < 0) { start = x; key = k; startDef = def; }
      }
    }
    return rects;
  },

  /** Cria as paredes invisíveis (colisão). */
  buildSolids(scene, map, group) {
    for (const r of this.runs(map, (d) => !!d.solido)) {
      const z = scene.add.zone(r.x * T + (r.w * T) / 2, r.y * T + T / 2, r.w * T, T);
      scene.physics.add.existing(z, true);
      group.add(z);
    }
  },

  /** Cria as áreas de porta (troca de mapa). */
  buildDoors(scene, map) {
    const doors = [];
    for (const r of this.runs(map, (d) => (d.porta ? d.porta.para + '|' + d.porta.spawn : false))) {
      const z = scene.add.zone(r.x * T + (r.w * T) / 2, r.y * T + T / 2, r.w * T, T);
      scene.physics.add.existing(z, true);
      z.porta = r.def.porta;
      doors.push(z);
    }
    return doors;
  },
};
