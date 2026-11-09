/* =========================================================
   ARTE DOS PERSONAGENS
   Gera os sprites (16x24 px) e os retratos (32x32 px) de cada
   personagem a partir das cores em src/data/personagens.js.

   Folha de sprites: 4 linhas (baixo, esquerda, direita, cima)
   x 3 colunas (parado, passo 1, passo 2).
   ========================================================= */

const CharacterArt = {
  FW: 16,
  FH: 24,
  DIRS: ['down', 'left', 'right', 'up'],
  OUTLINE: '#2a1730',

  frameIndex(dir, col) {
    return this.DIRS.indexOf(dir) * 3 + col;
  },

  colors(v) {
    const S = Pixel.shade;
    return {
      skin: v.pele, skinS: S(v.pele, -0.16),
      hair: v.cabelo, hairHi: v.cabeloBrilho || S(v.cabelo, 0.22), hairS: S(v.cabelo, -0.25),
      top: v.roupa, topS: S(v.roupa, -0.18), topHi: S(v.roupa, 0.15),
      collar: v.gola || S(v.roupa, 0.1),
      pants: v.calca, pantsS: S(v.calca, -0.2),
      shoes: v.tenis, shoesS: S(v.tenis, -0.18),
      eye: '#2a1a22', white: '#ffffff',
      blush: v.bochecha || S(v.pele, -0.08),
      mouth: S(v.pele, -0.35),
      tie: v.laco || '#ff6fae',
      detail: v.detalhe || null,     // gola/punhos de outra cor (ex.: camisa de seleção)
      badge: v.escudo || null,       // escudinho no peito
      hairStyle: v.estiloCabelo, topStyle: v.estiloRoupa,
      tankLike: ['regata', 'top', 'vestido'].includes(v.estiloRoupa),
      shorts: v.estiloCalca === 'shorts',
      dress: v.estiloRoupa === 'vestido',
    };
  },

  /* ---------------- SPRITE (16x24) ---------------- */
  frame(visual, dir, f) {
    const g = Pixel.grid(16, 24);
    const { P, R } = Pixel.painter(g);
    const L = this.colors(visual);
    const d = dir === 'right' ? 'left' : dir;
    const b = f === 0 ? 0 : 1; // leve "pulinho" ao andar

    this.hairBack(P, R, L, d, b);
    this.legs(P, R, L, d, f);
    this.torso(P, R, L, d, f, b);
    this.head(P, R, L, d, b);
    this.hairFront(P, R, L, d, b);

    // shorts e vestido: as pernas aparecem (cor da pele)
    if (L.shorts || L.dress) {
      const from = L.dress ? 19 : 21;
      for (let y = from; y < 23; y++) for (let x = 0; x < 16; x++) {
        if (g[y][x] === L.pants) g[y][x] = L.skin;
        else if (g[y][x] === L.pantsS) g[y][x] = L.skinS;
      }
    }
    if (L.dress) this.skirt(P, R, L, d, b);

    let out = Pixel.outline(g, this.OUTLINE);
    if (dir === 'right') out = Pixel.mirror(out);
    return out;
  },

  skirt(P, R, L, d, b) {
    const y = 18 + b;
    if (d === 'left') {
      R(5, y, 6, 1, L.top); R(4, y + 1, 8, 2, L.top); R(11, y + 1, 1, 2, L.topS);
      R(4, y + 2, 8, 1, L.topS);
    } else {
      R(4, y, 8, 1, L.top); R(3, y + 1, 10, 2, L.top);
      R(11, y, 1, 3, L.topS); R(12, y + 1, 1, 2, L.topS);
      R(3, y + 2, 10, 1, L.topS);
      P(5, y + 1, L.topHi); P(8, y + 1, L.topHi);
    }
  },

  legs(P, R, L, d, f) {
    if (d !== 'left') {
      const liftL = f === 1 ? 1 : 0, liftR = f === 2 ? 1 : 0;
      R(5, 19, 3, 4 - liftL, L.pants); R(7, 19, 1, 4 - liftL, L.pantsS);
      R(5, 23 - liftL, 3, 1, L.shoes);
      R(8, 19, 3, 4 - liftR, L.pants); R(10, 19, 1, 4 - liftR, L.pantsS);
      R(8, 23 - liftR, 3, 1, L.shoes);
    } else if (f === 0) {
      R(6, 19, 4, 4, L.pants); R(9, 19, 1, 4, L.pantsS);
      R(5, 23, 5, 1, L.shoes);
    } else {
      const far = f === 1 ? 9 : 4, near = f === 1 ? 4 : 9;
      R(far, 19, 3, 3, L.pantsS); R(far, 22, 3, 1, L.shoesS);
      R(near, 19, 3, 4, L.pants);
      R(near - 1, 23, 4, 1, L.shoes);
    }
  },

  torso(P, R, L, d, f, b) {
    const y = 12 + b;
    const tank = L.tankLike;
    const D = L.detail;
    if (d === 'down' || d === 'up') {
      if (tank) {
        R(5, y, 6, 6, L.top); R(10, y, 1, 6, L.topS);
        R(4, y, 1, 2, L.skin); R(11, y, 1, 2, L.skinS);
        R(3, y + 1, 1, 5, L.skin); R(12, y + 1, 1, 5, L.skinS);
        if (d === 'down') { P(7, y, L.skin); P(8, y, L.skin); }
        if (L.topStyle === 'top') { R(5, y + 5, 6, 1, L.skin); R(10, y + 5, 1, 1, L.skinS); }
      } else {
        R(4, y, 8, 6, L.top); R(11, y, 1, 6, L.topS);
        R(3, y + 1, 1, 2, L.top); R(12, y + 1, 1, 2, L.topS);
        R(3, y + 3, 1, 3, L.skin); R(12, y + 3, 1, 3, L.skinS);
        if (D) { P(3, y + 2, D); P(12, y + 2, D); }
        if (d === 'down') {
          if (L.topStyle === 'polo') {
            P(5, y, D || L.collar); P(6, y, D || L.collar); P(9, y, D || L.collar); P(10, y, D || L.collar);
            P(7, y, L.skin); P(8, y, L.skin); P(7, y + 1, L.topS); P(7, y + 2, L.topS);
          } else {
            P(7, y, L.skinS); P(8, y, L.skinS);
            if (D) { P(6, y, D); P(9, y, D); }
          }
          if (L.badge) P(9, y + 2, L.badge);
        } else if (L.topStyle === 'polo') {
          R(5, y, 6, 1, L.collar);
        }
      }
      R(5, y + 6, 6, 1, L.pantsS); // cintura
    } else {
      R(5, y, 6, 6, L.top); R(10, y, 1, 6, L.topS); R(5, y, 1, 6, L.topHi);
      if (tank) { P(5, y, L.skin); P(6, y, L.skin); }
      else if (L.topStyle === 'polo') { P(5, y, D || L.collar); P(6, y, D || L.collar); }
      if (L.topStyle === 'top') R(5, y + 5, 6, 1, L.skin);
      R(5, y + 6, 6, 1, L.pantsS);
      const ax = f === 1 ? 5 : f === 2 ? 8 : 7;
      if (tank) { R(ax, y, 2, 6, L.skin); R(ax + 1, y, 1, 6, L.skinS); }
      else {
        R(ax, y, 2, 2, L.top); R(ax + 1, y, 1, 2, L.topS); R(ax, y + 2, 2, 4, L.skin); R(ax + 1, y + 2, 1, 4, L.skinS);
        if (D) R(ax, y + 1, 2, 1, D);
      }
    }
  },

  head(P, R, L, d, b) {
    const y = b;
    if (d === 'down') {
      R(5, 3 + y, 6, 1, L.skin); R(4, 4 + y, 8, 7, L.skin); R(5, 11 + y, 6, 1, L.skin);
      R(11, 5 + y, 1, 5, L.skinS); P(10, 11 + y, L.skinS);
      R(5, 7 + y, 2, 2, L.eye); R(9, 7 + y, 2, 2, L.eye);
      P(5, 7 + y, L.white); P(9, 7 + y, L.white);
      P(5, 9 + y, L.blush); P(10, 9 + y, L.blush);
      P(7, 10 + y, L.mouth); P(8, 10 + y, L.mouth);
    } else if (d === 'up') {
      R(5, 3 + y, 6, 1, L.skin); R(4, 4 + y, 8, 7, L.skin); R(5, 11 + y, 6, 1, L.skinS);
    } else {
      R(5, 3 + y, 6, 1, L.skin); R(4, 4 + y, 7, 7, L.skin); R(5, 11 + y, 5, 1, L.skin);
      P(3, 8 + y, L.skin); // nariz
      R(5, 7 + y, 1, 2, L.eye);
      P(5, 9 + y, L.blush);
      P(4, 10 + y, L.mouth);
    }
  },

  hairBack(P, R, L, d, b) {
    if (L.hairStyle !== 'longo') return;
    const y = b;
    if (d === 'down') {
      // cabelo longo caindo atrás dos ombros (visível nas laterais)
      for (let j = 12; j <= 19; j++) {
        const c = j > 17 ? L.hairS : L.hair;
        const inset = j === 19 ? 1 : 0;
        R(1 + inset, j + y, 2 - inset, 1, c);
        R(13, j + y, 2 - inset, 1, c);
      }
    }
  },

  hairFront(P, R, L, d, b) {
    const y = b;
    const H = L.hair, Hi = L.hairHi, Hs = L.hairS;
    const st = L.hairStyle;

    if (d === 'down') {
      R(4, 1 + y, 8, 1, H); R(3, 2 + y, 10, 3, H);
      if (st === 'longo') {
        R(3, 5 + y, 3, 1, H); R(10, 5 + y, 3, 1, H); P(3, 6 + y, H); P(12, 6 + y, H);
        for (let j = 5; j <= 11; j++) {
          R(2, j + y, 2, 1, H); R(12, j + y, 2, 1, Hs);
          if (j === 7 || j === 10) { P(1, j + y, H); P(14, j + y, Hs); }
        }
        R(5, 2 + y, 2, 1, Hi); P(4, 3 + y, Hi); P(2, 8 + y, Hi); P(9, 2 + y, Hi);
      } else {
        P(5, 5 + y, H); P(6, 5 + y, H); P(8, 5 + y, H); P(9, 5 + y, H); P(10, 5 + y, H);
        R(3, 5 + y, 1, st === 'rabo' ? 4 : 3, H); R(12, 5 + y, 1, st === 'rabo' ? 4 : 3, Hs);
        P(4, 5 + y, H); P(11, 5 + y, H);
        R(5, 2 + y, 3, 1, Hi); P(4, 3 + y, Hi); P(9, 2 + y, Hi);
        if (st === 'rabo') { P(12, 2 + y, L.tie); P(12, 3 + y, L.tie); }
      }
    } else if (d === 'up') {
      R(4, 1 + y, 8, 1, H); R(3, 2 + y, 10, 8, H); R(4, 10 + y, 8, 1, Hs);
      R(5, 2 + y, 3, 1, Hi); P(4, 3 + y, Hi); P(9, 3 + y, Hi);
      if (st === 'longo') {
        R(3, 10 + y, 10, 2, H);
        for (let j = 12; j <= 18; j++) {
          const w = (j >> 1) % 2;
          R(4 - w, j + y, 8 + w * 2, 1, j > 16 ? Hs : H);
        }
        P(4, 19 + y, Hs); P(6, 19 + y, Hs); P(9, 19 + y, Hs); P(11, 19 + y, Hs);
        P(6, 13 + y, Hi); P(10, 15 + y, Hi);
      } else if (st === 'rabo') {
        P(7, 9 + y, L.tie); P(8, 9 + y, L.tie);
        R(7, 10 + y, 2, 6, H); P(8, 15 + y, Hs);
      }
    } else {
      // olhando para a esquerda
      R(4, 1 + y, 7, 1, H); R(3, 2 + y, 9, 3, H);
      P(3, 5 + y, H); P(4, 5 + y, H); P(5, 5 + y, H); P(7, 5 + y, H);
      R(9, 5 + y, 3, 5, H); R(9, 10 + y, 2, 1, Hs); R(8, 5 + y, 1, 2, H);
      P(8, 7 + y, L.skinS); P(8, 8 + y, L.skinS); // orelha
      R(5, 2 + y, 3, 1, Hi); P(10, 3 + y, Hi);
      if (st === 'longo') {
        R(9, 5 + y, 4, 7, H); R(12, 5 + y, 1, 7, Hs);
        for (let j = 12; j <= 19; j++) {
          const w = (j >> 1) % 2;
          R(9 + w, j + y, 3, 1, j > 17 ? Hs : H);
        }
        P(10, 8 + y, Hi); P(11, 14 + y, Hi);
      } else if (st === 'rabo') {
        P(11, 4 + y, L.tie); P(12, 4 + y, L.tie);
        R(12, 5 + y, 2, 6, H); P(13, 10 + y, Hs);
      }
    }
  },

  /** Monta a folha de sprites inteira num canvas (48x96). */
  sheet(visual) {
    const { c, ctx } = Pixel.canvas(this.FW * 3, this.FH * 4);
    this.DIRS.forEach((dir, row) => {
      for (let col = 0; col < 3; col++) {
        Pixel.drawGrid(ctx, this.frame(visual, dir, col), col * this.FW, row * this.FH);
      }
    });
    return c;
  },

  /* ---------------- RETRATO (32x32) ---------------- */
  // expressões: 'normal' | 'feliz' | 'timido' | 'surpreso'
  portrait(visual, expr = 'normal') {
    const g = Pixel.grid(32, 32);
    const { P, R } = Pixel.painter(g);
    const L = this.colors(visual);
    const st = L.hairStyle;

    // cabelo de trás (longo)
    if (st === 'longo') {
      for (let j = 8; j < 32; j++) {
        const w = (j >> 2) % 2;
        R(3 - w, j, 6, 1, j > 26 ? L.hairS : L.hair);
        R(23 + w, j, 6, 1, j > 26 ? L.hairS : L.hairS);
      }
      R(5, 5, 22, 6, L.hair);
    }
    if (st === 'rabo') { R(24, 6, 4, 12, L.hair); R(23, 6, 2, 3, L.tie); }

    // ombros e roupa
    if (L.tankLike) {
      R(5, 27, 22, 5, L.skin); R(4, 29, 24, 3, L.skin);
      R(9, 27, 14, 5, L.top); R(10, 25, 2, 3, L.top); R(20, 25, 2, 3, L.top);
      R(21, 27, 2, 5, L.topS);
    } else {
      R(5, 27, 22, 5, L.top); R(4, 29, 24, 3, L.top); R(23, 27, 4, 5, L.topS);
      if (L.topStyle === 'polo') {
        R(11, 26, 4, 2, L.detail || L.collar); R(17, 26, 4, 2, L.detail || L.collar); R(15, 27, 2, 3, L.topS);
      } else { R(13, 26, 6, 1, L.detail || L.topS); if (L.detail) { R(12, 26, 1, 2, L.detail); R(19, 26, 1, 2, L.detail); } }
      if (L.badge) R(19, 29, 2, 2, L.badge);
    }
    // pescoço
    R(13, 22, 6, 5, L.skinS);
    if (L.tankLike) R(13, 26, 6, 1, L.skin);

    // rosto
    R(9, 7, 14, 1, L.skin); R(8, 8, 16, 15, L.skin); R(9, 23, 14, 1, L.skin); R(11, 24, 10, 1, L.skin);
    R(22, 10, 2, 12, L.skinS); R(12, 24, 9, 1, L.skinS);
    R(7, 14, 1, 4, L.skin); R(24, 14, 1, 4, L.skinS); // orelhas

    // sobrancelhas
    R(10, 13, 4, 1, L.hairS); R(18, 13, 4, 1, L.hairS);

    // olhos
    if (expr === 'feliz') {
      P(10, 17, L.eye); R(11, 16, 2, 1, L.eye); P(13, 17, L.eye);
      P(18, 17, L.eye); R(19, 16, 2, 1, L.eye); P(21, 17, L.eye);
    } else if (expr === 'surpreso') {
      R(11, 15, 2, 4, L.eye); R(19, 15, 2, 4, L.eye); P(11, 15, L.white); P(19, 15, L.white);
    } else {
      R(10, 15, 3, 3, L.eye); R(19, 15, 3, 3, L.eye);
      P(10, 15, L.white); P(19, 15, L.white);
      P(12, 17, Pixel.shade(L.eye, 0.25)); P(21, 17, Pixel.shade(L.eye, 0.25));
    }

    // bochechas
    const bl = expr === 'timido' ? 2 : 1;
    R(8, 19, 3, bl, L.blush); R(21, 19, 3, bl, L.blush);

    // boca
    if (expr === 'feliz') { P(13, 20, L.mouth); R(14, 21, 4, 1, L.mouth); P(18, 20, L.mouth); }
    else if (expr === 'surpreso') { R(15, 20, 2, 2, L.mouth); }
    else if (expr === 'timido') { R(15, 21, 2, 1, L.mouth); }
    else { R(14, 21, 4, 1, L.mouth); }

    // cabelo da frente
    R(10, 3, 12, 1, L.hair); R(8, 4, 16, 2, L.hair); R(7, 6, 18, 4, L.hair);
    if (st === 'longo') {
      R(7, 10, 4, 2, L.hair); R(21, 10, 4, 2, L.hair); R(6, 10, 2, 12, L.hair); R(24, 10, 2, 12, L.hairS);
      R(11, 10, 3, 1, L.hair); R(18, 10, 3, 1, L.hair);
      R(11, 5, 4, 1, L.hairHi); R(9, 7, 2, 1, L.hairHi); R(19, 6, 3, 1, L.hairHi); P(6, 15, L.hairHi);
    } else {
      R(7, 10, 2, 4, L.hair); R(23, 10, 2, 4, L.hairS);
      R(9, 10, 3, 2, L.hair); R(13, 10, 3, 1, L.hair); R(17, 10, 4, 2, L.hair); R(21, 10, 2, 1, L.hair);
      R(11, 5, 5, 1, L.hairHi); R(9, 7, 2, 1, L.hairHi); R(19, 5, 2, 1, L.hairHi);
      if (st === 'rabo') { R(22, 5, 2, 2, L.tie); }
    }

    const out = Pixel.outline(g, this.OUTLINE);
    const { c, ctx } = Pixel.canvas(32, 32);
    Pixel.drawGrid(ctx, out, 0, 0);
    return c;
  },
};
