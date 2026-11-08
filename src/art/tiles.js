/* =========================================================
   ARTE DOS CENÁRIOS (tiles de 16x16)
   Cada função desenha um quadradinho do mapa.
   Parâmetros: (ctx, x, y, r, n)
     r() = número aleatório com semente (variação natural)
     n(dx, dy) = caractere do vizinho no mapa (para emendas)
   ========================================================= */

const TileArt = (() => {
  const F = Pixel.F;
  const pick = Pixel.pick;

  function speckle(c, x, y, r, colors, count) {
    for (let i = 0; i < count; i++) F(c, x + Math.floor(r() * 16), y + Math.floor(r() * 16), 1, 1, pick(colors, r));
  }

  const T = {
    /* ---------- ÁREA EXTERNA ---------- */
    piso_patio(c, x, y, r) {
      for (const sy of [0, 8]) for (const sx of [0, 8]) {
        F(c, x + sx, y + sy, 8, 8, pick(['#bca9b9', '#b5a2b3', '#c0aebd', '#b9a6b6'], r));
        F(c, x + sx, y + sy, 8, 1, '#ccbdca');
        F(c, x + sx, y + sy + 7, 8, 1, '#9f8c9f');
        F(c, x + sx + 7, y + sy, 1, 8, '#a8959f');
      }
      speckle(c, x, y, r, ['#a894a6', '#c9b9c6'], 3);
    },

    grama(c, x, y, r) {
      F(c, x, y, 16, 16, '#62a14f');
      for (let i = 0; i < 9; i++) F(c, x + Math.floor(r() * 15), y + Math.floor(r() * 14), 1, 2, '#4f8a40');
      for (let i = 0; i < 4; i++) F(c, x + Math.floor(r() * 15), y + Math.floor(r() * 15), 1, 1, '#84c167');
      if (r() < 0.12) { F(c, x + 6, y + 6, 1, 1, '#ff9fcb'); F(c, x + 5, y + 7, 3, 1, '#ffd2e6'); F(c, x + 6, y + 8, 1, 1, '#ff9fcb'); }
    },

    cerca_viva(c, x, y, r, n) {
      const topOpen = n(0, -1) !== n(0, 0);
      F(c, x, y, 16, 16, '#3f7c39');
      if (topOpen) { T.piso_patio(c, x, y, r); F(c, x, y + 4, 16, 12, '#3f7c39'); }
      const top = topOpen ? 4 : 0;
      for (let i = 0; i < 6; i++) Pixel.blob(c, x + 2 + r() * 12, y + top + 2 + r() * 9, 2.6, '#4f9446');
      if (topOpen) for (let i = 0; i < 4; i++) Pixel.blob(c, x + 2 + i * 4, y + 4, 2.5, '#5aa14f');
      for (let i = 0; i < 5; i++) F(c, x + Math.floor(r() * 15), y + top + Math.floor(r() * 9), 1, 1, '#79bd62');
      F(c, x, y + 14, 16, 2, '#2c5a2b');
    },

    calcada(c, x, y, r) {
      F(c, x, y, 16, 16, '#cdc1ca');
      F(c, x + 15, y, 1, 16, '#ab9fab');
      F(c, x, y + 15, 16, 1, '#ab9fab');
      F(c, x, y, 16, 1, '#ddd3db');
      speckle(c, x, y, r, ['#bfb2bc', '#d9cfd7'], 4);
    },

    meio_fio(c, x, y) {
      F(c, x, y, 16, 9, '#d6ccd3');
      F(c, x, y, 16, 1, '#ece5ea');
      F(c, x, y + 9, 16, 2, '#9b8f9d');
      F(c, x, y + 11, 16, 5, '#5c556a');
    },

    rua(c, x, y, r) {
      F(c, x, y, 16, 16, '#4b4559');
      speckle(c, x, y, r, ['#57516a', '#413b4f', '#5d5770'], 10);
    },

    faixa_rua(c, x, y, r) {
      T.rua(c, x, y, r);
      F(c, x + 3, y + 7, 9, 2, '#efe6c8');
    },

    /* ---------- FACHADA DA ESCOLA ---------- */
    telhado(c, x, y, r) {
      F(c, x, y, 16, 16, '#5e4b70');
      F(c, x, y, 16, 3, '#45375a');
      if (r() < 0.6) F(c, x + Math.floor(r() * 12), y + 5, 4, 1, '#6c5880');
      F(c, x, y + 11, 16, 5, '#f1e9de');
      F(c, x, y + 11, 16, 1, '#fffaf2');
      F(c, x, y + 15, 16, 1, '#cfc2b4');
    },

    fachada(c, x, y) {
      F(c, x, y, 16, 16, '#efe5d7');
      F(c, x, y + 7, 16, 1, '#e5d9ca');
      F(c, x, y + 15, 16, 1, '#e5d9ca');
    },

    faixa_rosa(c, x, y, r, n) { T._faixa(c, x, y, n, ['#e0568f', '#f37fb0', '#b23d6e', '#f9a3c8', '#8d3058']); },
    faixa_amarela(c, x, y, r, n) { T._faixa(c, x, y, n, ['#e9c25a', '#f7da86', '#c39a3a', '#fbe8b0', '#9a7726']); },
    _faixa(c, x, y, n, k) {
      T.fachada(c, x, y);
      F(c, x + 5, y, 6, 16, k[0]);
      F(c, x + 5, y, 1, 16, k[1]);
      F(c, x + 10, y, 1, 16, k[2]);
      if (n(0, -1) !== n(0, 0)) F(c, x + 5, y, 6, 1, k[3]);
      if (n(0, 1) !== n(0, 0)) F(c, x + 5, y + 15, 6, 1, k[4]);
    },

    janela_redonda(c, x, y) {
      T.fachada(c, x, y);
      for (let py = 0; py < 16; py++) for (let px = 0; px < 16; px++) {
        const d = Math.hypot(px + 0.5 - 8, py + 0.5 - 8);
        if (d > 6.6) continue;
        let col;
        if (d > 5.3) col = px + py > 16 ? '#a59ca9' : '#d6cfd6';
        else if (px === 7 || px === 8 || py === 7 || py === 8) col = '#d8d4de';
        else col = py < 8 ? '#3b5e94' : '#2a4878';
        F(c, x + px, y + py, 1, 1, col);
      }
      F(c, x + 4, y + 5, 1, 2, '#86aadd'); F(c, x + 5, y + 4, 2, 1, '#86aadd');
    },

    vidro(c, x, y, r, n) {
      F(c, x, y, 16, 16, '#3c5785');
      for (let px = 0; px < 16; px++) for (let py = 0; py < 16; py++) {
        if ((px + 16 - py + (y % 32)) % 16 < 2) F(c, x + px, y + py, 1, 1, '#5b7bae');
      }
      for (let i = 0; i < 16; i += 4) F(c, x + i, y, 1, 16, '#a4b4cd');
      for (let j = 0; j < 16; j += 5) F(c, x, y + j, 16, 1, '#a4b4cd');
      if (n(-1, 0) !== n(0, 0)) F(c, x, y, 2, 16, '#8a7f96');
      if (n(1, 0) !== n(0, 0)) F(c, x + 14, y, 2, 16, '#8a7f96');
    },

    viga(c, x, y) {
      F(c, x, y, 16, 10, '#ddd1c2');
      F(c, x, y, 16, 1, '#f3ebe0');
      F(c, x, y + 9, 16, 1, '#bfb2a4');
      F(c, x, y + 10, 16, 6, '#3b3550');
      F(c, x, y + 10, 16, 1, '#2b2640');
    },

    pilar(c, x, y, r, n) {
      F(c, x, y, 16, 16, '#3b3550');
      F(c, x + 4, y, 8, 16, '#e9e1d6');
      F(c, x + 4, y, 1, 16, '#fff7ee');
      F(c, x + 11, y, 1, 16, '#bfb4aa');
      if (n(0, 1) !== n(0, 0)) F(c, x + 3, y + 14, 10, 2, '#cfc5ba');
    },

    janela_baixa(c, x, y, r, n) {
      F(c, x, y, 16, 16, '#3b3550');
      F(c, x + 1, y + 1, 14, 15, '#4c628e');
      F(c, x + 7, y + 1, 2, 15, '#b9b2c4');
      F(c, x + 1, y + 1, 14, 1, '#c9c2d2');
      F(c, x + 2, y + 3, 1, 5, '#7d98c4'); F(c, x + 3, y + 2, 1, 2, '#7d98c4');
      F(c, x + 10, y + 4, 1, 3, '#6a86b4');
      if (n(0, 1) !== n(0, 0)) F(c, x, y + 14, 16, 2, '#8f8599');
    },

    porta_vidro(c, x, y, r, n) {
      const ch = n(0, 0);
      const right = n(-1, 0) === ch;
      const bottom = ch === ch.toLowerCase() && ch !== ch.toUpperCase();
      F(c, x, y, 16, 16, '#6f6582');
      F(c, x + (right ? 1 : 2), y + (bottom ? 0 : 2), 13, bottom ? 14 : 14, '#6c8fc4');
      for (let i = 0; i < 6; i++) F(c, x + 4 + i, y + 12 - i * 2 + (bottom ? 2 : 0), 1, 2, '#9ab4dc');
      F(c, x + (right ? 0 : 15), y, 1, 16, '#4d4560');
      if (!bottom) F(c, x, y, 16, 2, '#4d4560');
      if (bottom) {
        F(c, x + (right ? 2 : 12), y, 2, 4, '#efe8f5');
        F(c, x, y + 14, 16, 2, '#8c8296');
      } else {
        // corações de adesivo na porta
        Pixel.heart(c, x + (right ? 4 : 5), y + 6, '#ff7fb6');
      }
    },

    base_predio(c, x, y) {
      F(c, x, y, 16, 16, '#a597a6');
      F(c, x, y, 16, 2, '#c7bac6');
      F(c, x, y + 14, 16, 2, '#8a7c8c');
      F(c, x + 7, y + 3, 1, 10, '#998b9a');
    },

    degrau(c, x, y) {
      F(c, x, y, 16, 16, '#cbbfc9');
      F(c, x, y, 16, 1, '#e2d8e0');
      F(c, x, y + 7, 16, 1, '#b5a8b3');
      F(c, x, y + 8, 16, 1, '#ddd3db');
      F(c, x, y + 15, 16, 1, '#a99ba8');
    },

    /* ---------- CORREDOR INTERNO ---------- */
    teto(c, x, y) {
      F(c, x, y, 16, 16, '#3a2c48');
      F(c, x, y + 12, 16, 3, '#56456a');
      F(c, x, y + 15, 16, 1, '#2a2036');
      F(c, x + 7, y + 4, 2, 2, '#4a3a5c');
    },

    parede(c, x, y) {
      F(c, x, y, 16, 16, '#efe6dc');
      F(c, x, y, 16, 2, '#d6cabc');
      F(c, x, y + 15, 16, 1, '#e2d6c8');
    },

    janela(c, x, y, r, n) {
      T.parede(c, x, y);
      const l = n(-1, 0) === n(0, 0), rr = n(1, 0) === n(0, 0);
      F(c, x + (l ? 0 : 2), y + 3, 16 - (l ? 0 : 2) - (rr ? 0 : 2), 11, '#ffffff');
      F(c, x + (l ? 0 : 3), y + 4, 16 - (l ? 0 : 3) - (rr ? 0 : 3), 9, '#9cc3e8');
      F(c, x + (l ? 0 : 3), y + 4, 16 - (l ? 0 : 3) - (rr ? 0 : 3), 3, '#b9d6f2');
      if (!rr) F(c, x + 7, y + 4, 2, 9, '#ffffff');
      F(c, x + 5, y + 5, 2, 1, '#e6f3ff');
      F(c, x + (l ? 0 : 1), y + 14, 16 - (l ? 0 : 1) - (rr ? 0 : 1), 2, '#d2c6ba');
      // árvore lá fora
      if (r() < 0.5) { Pixel.blob(c, x + 11, y + 11, 3, '#7fb36b'); }
    },

    porta_sala(c, x, y, r, n) {
      const ch = n(0, 0);
      const bottom = ch === ch.toLowerCase();
      if (bottom) T.rodape_azul(c, x, y, r, n); else T.parede(c, x, y);
      const wood = '#8d5b3d', dark = '#5e3a28';
      F(c, x + 1, y + (bottom ? 0 : 3), 14, bottom ? 16 : 13, dark);
      F(c, x + 2, y + (bottom ? 0 : 4), 12, bottom ? 15 : 12, wood);
      F(c, x + 2, y + (bottom ? 0 : 4), 1, bottom ? 15 : 12, '#a8714f');
      if (!bottom) {
        F(c, x + 5, y + 6, 6, 5, dark); F(c, x + 6, y + 7, 4, 3, '#a9cdea'); F(c, x + 6, y + 7, 2, 1, '#d8ecff');
        F(c, x + 6, y + 13, 4, 2, '#f1e2c0');
      } else {
        F(c, x + 11, y + 3, 2, 2, '#e9cc6a');
        F(c, x + 4, y + 8, 8, 1, '#7a4c32');
        F(c, x + 1, y + 15, 14, 1, dark);
      }
    },

    rodape_azul(c, x, y) {
      F(c, x, y, 16, 16, '#4e6ba8');
      F(c, x, y, 16, 2, '#e8dfd2');
      F(c, x, y + 2, 16, 1, '#3f5a91');
      F(c, x, y + 13, 16, 3, '#3a4f80');
      F(c, x + 15, y + 3, 1, 10, '#46619b');
    },

    mural(c, x, y, r, n) {
      T.rodape_azul(c, x, y, r, n);
      F(c, x + 1, y + 3, 14, 10, '#7a5436');
      F(c, x + 2, y + 4, 12, 8, '#c99a64');
      F(c, x + 3, y + 5, 4, 4, '#fff3f8');
      F(c, x + 8, y + 5, 4, 5, '#ffd86b');
      F(c, x + 4, y + 10, 3, 1, '#ff8fbf');
      F(c, x + 4, y + 6, 2, 1, '#c9b7c4'); F(c, x + 9, y + 7, 2, 1, '#c79b3a');
      F(c, x + 5, y + 5, 1, 1, '#e0568f'); F(c, x + 10, y + 5, 1, 1, '#4e6ba8');
    },

    cartaz(c, x, y, r, n) {
      T.rodape_azul(c, x, y, r, n);
      const colors = pick([['#ffd1e6', '#c2508f'], ['#fff2c4', '#c79b3a'], ['#d9ecff', '#4e6ba8']], r);
      F(c, x + 3, y + 3, 10, 10, colors[1]);
      F(c, x + 4, y + 4, 8, 8, colors[0]);
      Pixel.heart(c, x + 4, y + 5, colors[1]);
      F(c, x + 5, y + 11, 6, 1, colors[1]);
    },

    porta_saida(c, x, y, r, n) {
      const ch = n(0, 0);
      const bottom = ch === ch.toLowerCase();
      const right = n(-1, 0) === ch;
      if (bottom) T.rodape_azul(c, x, y, r, n); else T.parede(c, x, y);
      F(c, x, y + (bottom ? 0 : 4), 16, bottom ? 16 : 12, '#6f6582');
      F(c, x + (right ? 1 : 2), y + (bottom ? 0 : 5), 13, bottom ? 14 : 11, '#8fb6dc');
      F(c, x + (right ? 0 : 15), y + (bottom ? 0 : 4), 1, bottom ? 16 : 12, '#4d4560');
      for (let i = 0; i < 4; i++) F(c, x + 5 + i, y + 10 - i * 2, 1, 2, '#c5ddf2');
      if (!bottom) {
        // placa verde de saída
        F(c, x + (right ? 0 : 8), y, 8, 4, '#2f9e5a');
        F(c, x + (right ? 0 : 8), y, 8, 1, '#53c47e');
        if (!right) { F(c, x + 10, y + 1, 4, 1, '#ffffff'); F(c, x + 10, y + 2, 1, 1, '#ffffff'); }
        else { F(c, x + 1, y + 2, 4, 1, '#ffffff'); }
      } else {
        F(c, x + (right ? 2 : 12), y + 2, 2, 4, '#efe8f5');
        F(c, x, y + 14, 16, 2, '#8c8296');
      }
    },

    piso_corredor(c, x, y, r, n) {
      for (const sy of [0, 8]) for (const sx of [0, 8]) {
        const alt = ((x + sx) / 8 + (y + sy) / 8) % 2 === 0;
        F(c, x + sx, y + sy, 8, 8, alt ? '#d3c6d1' : '#c9bac7');
        F(c, x + sx + 7, y + sy, 1, 8, '#b6a6b5');
        F(c, x + sx, y + sy + 7, 8, 1, '#b6a6b5');
      }
      if (r() < 0.3) F(c, x + 2 + Math.floor(r() * 4), y + 2, 2, 1, '#e4dae2');
      const up = n(0, -1);
      if (up && up !== n(0, 0) && !'f'.includes(up)) {
        c.fillStyle = 'rgba(58,36,72,0.22)';
        c.fillRect(x, y, 16, 4);
      }
    },

    jardineira(c, x, y, r) {
      F(c, x, y, 16, 16, '#3f7c39');
      for (let i = 0; i < 5; i++) Pixel.blob(c, x + 1 + r() * 14, y + 3 + r() * 5, 3, '#4f9446');
      for (let i = 0; i < 4; i++) F(c, x + Math.floor(r() * 15), y + 1 + Math.floor(r() * 7), 1, 1, '#79bd62');
      if (r() < 0.5) { F(c, x + 4 + Math.floor(r() * 8), y + 3 + Math.floor(r() * 4), 2, 2, '#f08cbf'); }
      F(c, x, y + 9, 16, 7, '#a59aa9');
      F(c, x, y + 9, 16, 2, '#cbc2cd');
      F(c, x, y + 15, 16, 1, '#857a8a');
    },
  };
  return T;
})();
