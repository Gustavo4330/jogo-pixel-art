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

    /* ---------- ESCOLA REAL: FACHADA DE CONCRETO ---------- */
    telhado_metal(c, x, y, r, n) {
      const bands = [['#6f7781', 2], ['#9aa3ad', 2], ['#c9d0d8', 2], ['#eef2f5', 3], ['#c3cbd3', 3], ['#98a1ab', 2], ['#5d6570', 2]];
      let yy = 0;
      for (const [col, h] of bands) { F(c, x, y + yy, 16, h, col); yy += h; }
      F(c, x + 7, y + 2, 1, 12, 'rgba(90,98,110,.25)');
      if (n(-1, 0) !== n(0, 0)) { F(c, x, y, 3, 16, '#4a4f59'); F(c, x + 3, y + 1, 1, 14, '#8a929c'); }
    },

    parapeito(c, x, y, r) {
      F(c, x, y, 16, 16, '#b4afa9');
      F(c, x, y, 16, 2, '#cfcac4');
      for (let i = 0; i < 3; i++) F(c, x + Math.floor(r() * 15), y + 3, 1, 8 + Math.floor(r() * 5), '#9d9892');
      F(c, x + 15, y, 1, 16, '#a39e98');
      F(c, x, y + 15, 16, 1, '#8f8a85');
    },

    aleta(c, x, y, r, n) {
      const top = n(0, -1) !== n(0, 0);
      F(c, x, y, 16, 16, '#bdb8b2');
      F(c, x + 15, y, 1, 16, '#aaa49e');
      speckle(c, x, y, r, ['#b2ada7', '#c6c1bb'], 6);
      const col = Math.floor(x / 16) % 3;
      if (col === 2) {
        // janelinha redonda entre as aletas
        const cy = top ? 16 : 0;
        for (let py = 0; py < 16; py++) for (let px = 0; px < 16; px++) {
          const d = Math.hypot(px + 0.5 - 8, py + 0.5 - cy);
          if (d < 3.2) F(c, x + px, y + py, 1, 1, '#2b2a33');
          else if (d < 4.2) F(c, x + px, y + py, 1, 1, '#d6d2cd');
        }
        return;
      }
      const k = col === 0 ? ['#d0393f', '#e9696d', '#9e262c'] : ['#3c66c4', '#6c91e2', '#284a95'];
      for (let py = 0; py < 16; py++) {
        const gy = py + (top ? 0 : 16);
        if (gy < 1 || gy > 30) continue;
        const half = 4.6 * Math.sin(Math.PI * (gy - 1) / 30);
        if (half < 0.5) continue;
        const x0 = Math.round(8 - half), x1 = Math.round(8 + half);
        F(c, x + x0, y + py, x1 - x0, 1, k[0]);
        F(c, x + x0, y + py, 1, 1, k[1]);
        F(c, x + x1 - 1, y + py, 1, 1, k[2]);
        F(c, x + x1, y + py, 1, 1, 'rgba(60,50,60,.25)');
      }
    },

    viga_concreto(c, x, y) {
      F(c, x, y, 16, 10, '#c4bfb8');
      F(c, x, y, 16, 1, '#d8d4ce');
      F(c, x, y + 9, 16, 1, '#a19c96');
      F(c, x, y + 10, 16, 6, '#3f3c46');
    },

    pilotis(c, x, y, r, n) {
      const top = n(0, -1) !== n(0, 0) && !'PDN'.includes(n(0, -1) || '');
      const isTop = !'PDNd'.includes(n(0, -1) || '');
      F(c, x, y, 16, 16, isTop ? '#3f3c46' : '#57535e');
      if (!isTop) {
        // através do térreo aberto dá para ver o outro lado
        if (r() < 0.6) F(c, x + 2, y + 2, 12, 6, '#8fa07f');
        F(c, x, y + 8, 16, 8, '#6c6873');
        F(c, x, y + 15, 16, 1, '#4a4651');
      } else {
        F(c, x, y, 16, 3, '#2f2c36');
      }
      const ch = n(0, 0);
      if (ch === 'P' && Math.floor(x / 16) % 4 === 0) {
        F(c, x + 5, y, 6, 16, '#bdb8b2'); F(c, x + 5, y, 1, 16, '#d3cec8'); F(c, x + 10, y, 1, 16, '#9a958f');
      }
      return top;
    },

    entrada(c, x, y, r, n) {
      T.pilotis(c, x, y, r, n);
      const bottom = n(0, 0) === 'd';
      if (bottom) { F(c, x, y + 6, 16, 10, '#b5a99a'); speckle(c, x, y + 6, r, ['#a39684', '#c4b9ab'], 8); }
    },

    faixa_banner(c, x, y, r, n) {
      T.pilotis(c, x, y, r, n);
      const right = n(-1, 0) === n(0, 0);
      F(c, x, y + 2, 16, 9, '#f4f2f0');
      F(c, x, y + 2, 16, 1, '#2f5fb3'); F(c, x, y + 10, 16, 1, '#2f5fb3');
      for (let i = 0; i < 4; i++) F(c, x + 2 + i * 3 + (right ? 0 : 1), y + 5, 2, 3, i % 2 ? '#d0393f' : '#2f5fb3');
      if (!right) F(c, x, y + 2, 1, 9, '#6b6772'); else F(c, x + 15, y + 2, 1, 9, '#6b6772');
    },

    tijolo(c, x, y, r, n) {
      F(c, x, y, 16, 16, '#c0533f');
      for (let j = 0; j < 16; j += 4) {
        F(c, x, y + j + 3, 16, 1, '#a1442f');
        const off = (j / 4) % 2 ? 4 : 0;
        for (let i = off; i < 16; i += 8) F(c, x + i, y + j, 1, 3, '#a1442f');
      }
      if (n(0, -1) == null || n(0, -1) === 'M') F(c, x, y, 16, 3, '#8c3a2a');
    },

    tijolo_janela(c, x, y, r, n) {
      T.tijolo(c, x, y, r, n);
      F(c, x + 1, y + 3, 14, 10, '#e9e4df');
      F(c, x + 2, y + 4, 12, 8, '#b9cbd9');
      F(c, x + 7, y + 4, 1, 8, '#e9e4df'); F(c, x + 2, y + 7, 12, 1, '#e9e4df');
      F(c, x + 3, y + 5, 2, 1, '#e6f0f8');
    },

    tijolo_topo(c, x, y) {
      F(c, x, y, 16, 16, '#9cc8ec');
      F(c, x, y + 9, 16, 7, '#8c3a2a');
      F(c, x, y + 9, 16, 1, '#a8604e');
    },

    calcada_concreto(c, x, y, r) {
      F(c, x, y, 16, 16, '#c9c4bd');
      F(c, x + 15, y, 1, 16, '#aea8a1');
      F(c, x, y, 16, 1, '#d9d5cf');
      speckle(c, x, y, r, ['#bbb5ae', '#d4cfc9'], 5);
    },

    cascalho(c, x, y, r, n) {
      F(c, x, y, 16, 16, '#b3a796');
      speckle(c, x, y, r, ['#9d907e', '#c7bdaf', '#8f8371', '#d5ccc0'], 26);
      const g = (dx, dy) => { const ch = n(dx, dy); return ch === 'g'; };
      if (g(-1, 0)) F(c, x, y, 1, 16, '#7aa35e');
      if (g(1, 0)) F(c, x + 15, y, 1, 16, '#7aa35e');
      if (g(0, -1)) F(c, x, y, 16, 1, '#7aa35e');
      if (g(0, 1)) F(c, x, y + 15, 16, 1, '#7aa35e');
    },

    /* ---------- ESCOLA REAL: CORREDOR ---------- */
    teto_concreto(c, x, y, r) {
      F(c, x, y, 16, 16, '#5a5660');
      for (let i = 0; i < 16; i += 4) F(c, x, y + i, 16, 1, '#4a4650');
      F(c, x, y + 13, 16, 3, '#77737c');
      F(c, x, y + 15, 16, 1, '#3e3a44');
    },

    parede_concreto(c, x, y, r) {
      F(c, x, y, 16, 16, '#c8c4bf');
      F(c, x, y, 16, 2, '#a9a5a0');
      F(c, x, y + 13, 16, 3, '#8a7a5c');
      F(c, x, y + 13, 16, 1, '#b39c6e');
      speckle(c, x, y + 2, r, ['#bdb9b4', '#d2cec9'], 4);
    },

    porta_dupla(c, x, y, r, n) {
      const ch = n(0, 0);
      const bottom = ch === ch.toLowerCase();
      const right = n(-1, 0) === ch;
      if (bottom) T.rodape_azul(c, x, y, r, n); else T.parede_concreto(c, x, y, r);
      const top = bottom ? 0 : 3;
      F(c, x, y + top, 16, 16 - top, '#8a8792');
      F(c, x + (right ? 0 : 1), y + top + (bottom ? 0 : 1), 15, 16 - top - (bottom ? 1 : 1), '#f4f3f1');
      F(c, x + (right ? 0 : 15), y + top, 1, 16 - top, '#bdbac2');
      if (!bottom) {
        F(c, x + (right ? 3 : 4), y + 6, 9, 5, '#a8c3da'); F(c, x + (right ? 4 : 5), y + 7, 3, 1, '#d8e8f4');
      } else {
        F(c, x + (right ? 2 : 12), y + 2, 2, 3, '#7f7c87');
        F(c, x, y + 15, 16, 1, '#6f6c77');
      }
    },

    quadro_mural(c, x, y, r, n) {
      T.rodape_azul(c, x, y, r, n);
      const l = n(-1, 0) === n(0, 0), rr = n(1, 0) === n(0, 0);
      F(c, x + (l ? 0 : 1), y + 1, 16 - (l ? 0 : 1) - (rr ? 0 : 1), 12, '#d9d4cc');
      F(c, x + (l ? 0 : 2), y + 2, 16 - (l ? 0 : 2) - (rr ? 0 : 2), 10, '#f6f4f0');
      const papers = ['#ffe28a', '#ffc4de', '#bfe0ff', '#ffffff'];
      for (let i = 0; i < 3; i++) F(c, x + 2 + Math.floor(r() * 9), y + 3 + Math.floor(r() * 5), 3 + Math.floor(r() * 2), 3, pick(papers, r));
    },

    parede_vermelha(c, x, y, r, n) {
      const bottom = n(0, -1) === n(0, 0);
      F(c, x, y, 16, 16, '#c8373a');
      F(c, x, y, 16, 1, bottom ? '#c8373a' : '#a92c30');
      F(c, x + 15, y, 1, 16, '#b23033');
      if (bottom) F(c, x, y + 13, 16, 3, '#9c2a2d');
    },

    extintor(c, x, y, r, n) {
      T.rodape_azul(c, x, y, r, n);
      F(c, x + 6, y + 3, 4, 8, '#d42b2b'); F(c, x + 6, y + 3, 1, 8, '#f05656');
      F(c, x + 7, y + 1, 2, 2, '#2d2a30'); F(c, x + 9, y + 2, 2, 1, '#2d2a30');
    },

    piso_polido(c, x, y, r, n) {
      F(c, x, y, 16, 16, '#b3b9c0');
      speckle(c, x, y, r, ['#a7adb5', '#bfc4ca'], 7);
      F(c, x, y + 9, 16, 2, '#bec3c9');
      if (r() < 0.5) F(c, x + 2, y + 4, 9, 1, '#c8cdd2');
      const up = n(0, -1);
      if (up && !'cv'.includes(up)) { c.fillStyle = 'rgba(40,36,48,0.28)'; c.fillRect(x, y, 16, 4); }
    },

    borda_concreto(c, x, y, r) {
      F(c, x, y, 16, 8, '#aab0b8');
      speckle(c, x, y, r, ['#959ca5', '#c3c8ce'], 4);
      F(c, x, y + 8, 16, 3, '#cfcac3');
      F(c, x, y + 11, 16, 1, '#8e8880');
      T._bloquete(c, x, y + 12, 4);
    },

    _bloquete(c, x, y, h) {
      // blocos de concreto em padrão "espinha de peixe"
      for (let py = 0; py < h; py++) for (let px = 0; px < 16; px++) {
        const gx = x + px, gy = y + py;
        const cell = (Math.floor(gx / 8) + Math.floor(gy / 8)) % 2;
        const lx = gx % 8, ly = gy % 8;
        let col = cell ? '#8e7f73' : '#857669';
        if (cell ? (ly === 3 || ly === 7) : (lx === 3 || lx === 7)) col = '#665a51';
        if (cell ? ly === 0 || ly === 4 : lx === 0 || lx === 4) col = cell ? '#9a8b7f' : '#918275';
        F(c, gx, gy, 1, 1, col);
      }
    },

    piso_bloquete(c, x, y, r) {
      T._bloquete(c, x, y, 16);
      if (r() < 0.25) F(c, x + Math.floor(r() * 14), y + Math.floor(r() * 14), 2, 1, '#5f544c');
    },

    pilar_jardim(c, x, y, r, n) {
      const pillar = n(0, 0) === 'I';
      T.grama(c, x, y, r);
      // folhagens (palmeirinhas)
      for (let i = 0; i < 4; i++) {
        const cx = x + 2 + r() * 12, cy = y + 4 + r() * 6;
        for (let a = 0; a < 7; a++) {
          const ang = -Math.PI / 2 + (a - 3) * 0.45;
          for (let d = 1; d < 6; d++) F(c, Math.round(cx + Math.cos(ang) * d), Math.round(cy + Math.sin(ang) * d), 1, 1, d > 3 ? '#5aa04a' : '#3d7c37');
        }
      }
      F(c, x, y + 13, 16, 3, '#9d978f');
      F(c, x, y + 13, 16, 1, '#bdb7af');
      if (pillar) {
        F(c, x + 3, y, 10, 16, '#bcb7b0'); F(c, x + 3, y, 2, 16, '#d2cdc6'); F(c, x + 11, y, 2, 16, '#99938c');
        F(c, x + 7, y, 1, 16, '#2b2830');
      }
    },

    /* ---------- FASE 2: ESCADARIA AO ENTARDECER ---------- */
    janela_por_do_sol(c, x, y, r, n) {
      const ch = n(0, 0);
      const bottom = ch === 'j';
      const l = n(-1, 0) === ch, rr = n(1, 0) === ch;
      T.parede_concreto(c, x, y, r);
      F(c, x, y + (bottom ? 0 : 2), 16, bottom ? 13 : 14, '#3e3a46');
      const gx = x + (l ? 0 : 1), gw = 16 - (l ? 0 : 1) - (rr ? 0 : 1);
      const top = y + (bottom ? 0 : 3), h = bottom ? 12 : 13;
      const sky = bottom ? ['#ffb46b', '#ffc77e', '#ffd894'] : ['#c75c8a', '#e8728a', '#ff9672'];
      for (let i = 0; i < h; i++) F(c, gx, top + i, gw, 1, sky[Math.min(2, Math.floor((i / h) * 3))]);
      if (bottom) {
        // sol se pondo atrás das árvores (só na janela do meio)
        if (l && rr) Pixel.blob(c, x + 8, y + 8, 5, '#fff0b3');
        for (let i = 0; i < 16; i++) F(c, x + i, y + 8 + Math.round(Math.sin((x + i) / 3) * 1.5 + 2), 1, 4, '#7a3f62');
        F(c, gx, y + 12, gw, 1, '#5c2f4c');
        F(c, x, y + 12, 16, 4, '#bdb8b1'); F(c, x, y + 12, 16, 1, '#e6d4c0');
      }
      if (!rr) F(c, x + 15, y, 1, 16, '#3e3a46');
      if (!bottom && !rr) F(c, x + 15, y + 2, 1, 14, '#3e3a46');
      F(c, x + (l ? 0 : 1), y + (bottom ? 5 : 9), gw, 1, '#3e3a46');
    },

    corrimao(c, x, y, r, n) {
      T.piso_polido(c, x, y, r, n);
      F(c, x, y + 5, 16, 11, '#b9b4ad');
      F(c, x, y + 5, 16, 2, '#d8d3cc');
      F(c, x, y + 3, 16, 2, '#3a3640');
      F(c, x + 3, y + 5, 1, 1, '#3a3640'); F(c, x + 12, y + 5, 1, 1, '#3a3640');
      F(c, x, y + 14, 16, 2, '#8f8a84');
    },

    escada(c, x, y, r, n) {
      for (let k = 0; k < 2; k++) {
        const yy = y + k * 8;
        F(c, x, yy, 16, 6, '#cbc6bf');
        F(c, x, yy, 16, 1, '#e8e3dc');
        F(c, x, yy + 6, 16, 2, '#8e8983');
      }
      if (n(-1, 0) !== 'S') F(c, x, y, 1, 16, '#77727c');
      if (n(1, 0) !== 'S') F(c, x + 15, y, 1, 16, '#77727c');
      if (r() < 0.3) F(c, x + Math.floor(r() * 12), y + 2, 3, 1, '#d9d4cd');
    },

    parede_laje(c, x, y, r, n) {
      F(c, x, y, 16, 16, '#a7a29c');
      for (let i = 3; i < 16; i += 5) F(c, x, y + i, 16, 1, '#97928c');
      F(c, x + 15, y, 1, 16, '#9a958f');
      if (n(0, -1) !== n(0, 0)) F(c, x, y, 16, 3, '#7c7781');
      if (n(0, 1) !== n(0, 0)) { F(c, x, y + 13, 16, 3, '#8a8580'); }
      speckle(c, x, y, r, ['#9d9892', '#b2ada7'], 4);
    },

    lateral_escada(c, x, y, r, n) {
      T.parede_laje(c, x, y, r, n);
      const right = n(1, 0) === 'S';
      const ex = right ? x + 11 : x;
      F(c, ex, y, 5, 16, '#c3beb7');
      F(c, ex + (right ? 0 : 4), y, 1, 16, '#8e8983');
      F(c, ex + 2, y, 1, 16, '#3a3640');
    },

    /* ---------- FASE 2: ESCADA DE INCÊNDIO ---------- */
    parede_incendio(c, x, y, r) {
      F(c, x, y, 16, 16, '#b9b6b2');
      F(c, x, y, 16, 2, '#9a9792');
      F(c, x, y + 10, 16, 6, '#8d8a95');
      F(c, x, y + 10, 16, 1, '#c9a227');
      F(c, x, y + 11, 16, 1, '#6e6b76');
      speckle(c, x, y + 2, r, ['#aeaba7', '#c4c1bd'], 4);
    },

    porta_emergencia(c, x, y, r, n) {
      const ch = n(0, 0);
      const bottom = ch === ch.toLowerCase();
      const right = n(-1, 0) === ch;
      T.parede_incendio(c, x, y, r);
      const top = bottom ? 0 : 4;
      F(c, x, y + top, 16, 16 - top, '#5c5866');
      F(c, x + (right ? 0 : 1), y + top + (bottom ? 0 : 1), 15, 16 - top - 1, '#8d96a3');
      F(c, x + (right ? 0 : 1), y + top + (bottom ? 0 : 1), 1, 16 - top - 1, '#a9b2be');
      F(c, x + (right ? 0 : 15), y + top, 1, 16 - top, '#4a4654');
      if (!bottom) {
        // placa verde "SAÍDA" acima da porta
        F(c, x + (right ? 0 : 6), y, right ? 10 : 10, 4, '#1f9a52');
        F(c, x + (right ? 0 : 6), y, right ? 10 : 10, 1, '#5fd08e');
        if (!right) { F(c, x + 8, y + 1, 3, 2, '#ffffff'); F(c, x + 12, y + 1, 1, 2, '#ffffff'); F(c, x + 14, y + 1, 2, 2, '#ffffff'); }
        else { F(c, x + 1, y + 1, 2, 2, '#ffffff'); F(c, x + 4, y + 2, 4, 1, '#ffffff'); F(c, x + 7, y + 1, 1, 3, '#ffffff'); }
        F(c, x + (right ? 3 : 5), y + 8, 7, 3, '#c9d6e3');
      } else {
        // barra antipânico
        F(c, x + (right ? 0 : 3), y + 3, right ? 13 : 13, 2, '#d8dde3');
        F(c, x + (right ? 0 : 3), y + 5, right ? 13 : 13, 1, '#4a4654');
        F(c, x, y + 14, 16, 2, '#6e6b76');
      }
    },

    hidrante(c, x, y, r, n) {
      T.parede_incendio(c, x, y, r);
      F(c, x + 2, y + 1, 12, 12, '#a3151b');
      F(c, x + 3, y + 2, 10, 10, '#d42a2f');
      F(c, x + 4, y + 3, 8, 6, '#e8eef4');
      Pixel.blob(c, x + 8, y + 6, 2.6, '#c9202a');
      F(c, x + 7, y + 6, 2, 1, '#e8eef4');
    },

    numero_andar(c, x, y, r, n) {
      T.parede_incendio(c, x, y, r);
      const rows = ['####', '...#', '####', '#...', '####'];
      rows.forEach((row, j) => [...row].forEach((ch, i) => { if (ch === '#') F(c, x + 4 + i * 2, y + 1 + j * 2 - 1 + 2, 2, 2, '#e0b528'); }));
    },

    luz_emergencia(c, x, y, r, n) {
      T.parede_incendio(c, x, y, r);
      F(c, x + 3, y + 3, 10, 5, '#f2f2ee'); F(c, x + 3, y + 7, 10, 1, '#bdbab4');
      F(c, x + 4, y + 4, 3, 2, '#fff7c2'); F(c, x + 9, y + 4, 3, 2, '#fff7c2');
      F(c, x + 7, y + 5, 2, 1, '#e84040');
    },

    janelinha(c, x, y, r, n) {
      T.parede_incendio(c, x, y, r);
      F(c, x + 3, y + 2, 10, 7, '#3e3a46');
      F(c, x + 4, y + 3, 8, 2, '#e8728a'); F(c, x + 4, y + 5, 8, 3, '#ffb46b');
      F(c, x + 7, y + 3, 1, 5, '#3e3a46');
    },

    escada_incendio(c, x, y, r, n) {
      for (let k = 0; k < 2; k++) {
        const yy = y + k * 8;
        F(c, x, yy, 16, 6, '#a9a6a1');
        F(c, x, yy, 16, 2, '#e0b528');
        F(c, x, yy + 2, 16, 1, '#bfbcb7');
        F(c, x, yy + 6, 16, 2, '#6f6c69');
      }
      if (n(-1, 0) !== n(0, 0)) F(c, x, y, 1, 16, '#5c5866');
      if (n(1, 0) !== n(0, 0)) F(c, x + 15, y, 1, 16, '#5c5866');
    },

    piso_incendio(c, x, y, r, n) {
      F(c, x, y, 16, 16, '#9e9b97');
      speckle(c, x, y, r, ['#8f8c88', '#adaaa6'], 8);
      F(c, x + 15, y, 1, 16, '#928f8b'); F(c, x, y + 15, 16, 1, '#928f8b');
      const up = n(0, -1);
      if (up && !'cfS'.includes(up)) { c.fillStyle = 'rgba(30,26,40,0.3)'; c.fillRect(x, y, 16, 4); }
    },

    guarda_corpo(c, x, y, r, n) {
      T.piso_incendio(c, x, y, r, n);
      F(c, x, y + 6, 16, 10, '#8d8a95');
      F(c, x, y + 6, 16, 2, '#b2afba');
      F(c, x, y + 3, 16, 2, '#d23a2c');
      F(c, x, y + 3, 16, 1, '#f06a5a');
      F(c, x + 3, y + 5, 1, 1, '#d23a2c'); F(c, x + 12, y + 5, 1, 1, '#d23a2c');
      F(c, x, y + 14, 16, 2, '#6e6b76');
    },

    laje_incendio(c, x, y, r, n) {
      F(c, x, y, 16, 16, '#7f7c88');
      for (let i = 4; i < 16; i += 6) F(c, x, y + i, 16, 1, '#74717c');
      if (n(0, -1) !== n(0, 0)) F(c, x, y, 16, 3, '#5f5c68');
      speckle(c, x, y, r, ['#77747f', '#8a8793'], 4);
    },

    lateral_incendio(c, x, y, r, n) {
      T.laje_incendio(c, x, y, r, n);
      const right = n(1, 0) === 'S';
      const ex = right ? x + 10 : x;
      F(c, ex, y, 6, 16, '#a3a0ab');
      F(c, ex + 2, y, 2, 16, '#d23a2c');
      F(c, ex + 2, y, 1, 16, '#f06a5a');
    },

    parede_fundo(c, x, y, r) {
      F(c, x, y, 16, 16, '#6e6b76');
      F(c, x, y, 16, 3, '#8d8a95');
      F(c, x, y, 16, 1, '#a6a3ae');
      speckle(c, x, y + 3, r, ['#66636e', '#77747f'], 5);
    },

    /* ---------- FASE 2 (v2): ESCADA DE INCÊNDIO DE CONCRETO ---------- */
    concreto_liso(c, x, y, r, n) {
      // concreto aparente: cinza liso com furinhos da forma
      F(c, x, y, 16, 16, '#8f8e8b');
      speckle(c, x, y, r, ['#878683', '#979693'], 6);
      F(c, x + 3, y + 4, 1, 1, '#76756f'); F(c, x + 12, y + 4, 1, 1, '#76756f');
      F(c, x + 3, y + 12, 1, 1, '#76756f'); F(c, x + 12, y + 12, 1, 1, '#76756f');
      if (n(0, -1) === 'T') F(c, x, y, 16, 2, '#6c6b68');
      const ch = n(0, 0);
      if (ch === 'u' || ch === 'k' || ch === 'p') { F(c, x, y + 13, 16, 3, '#3d3e42'); F(c, x, y + 13, 16, 1, '#55565b'); }
    },

    porta_preta(c, x, y, r, n) {
      const ch = n(0, 0);
      const bottom = ch === ch.toLowerCase();
      const right = n(-1, 0) === ch;
      T.concreto_liso(c, x, y, r, n);
      const top = bottom ? 0 : 5;
      F(c, x, y + top, 16, 16 - top, '#2b2c30');
      F(c, x + (right ? 0 : 1), y + top + (bottom ? 0 : 1), 15, 16 - top, '#1b1c1f');
      F(c, x + (right ? 0 : 15), y + top, 1, 16 - top, '#3a3b40');
      if (!bottom) {
        // placa verde de saída com o bonequinho
        const sx = right ? x : x + 9;
        F(c, sx, y, 7, 4, '#1f9a52'); F(c, sx, y, 7, 1, '#5fd08e');
        F(c, sx + (right ? 1 : 3), y + 1, 2, 2, '#ffffff');
        F(c, sx + (right ? 4 : 1), y + 2, 2, 1, '#ffffff');
      } else {
        // barra antipânico inox
        F(c, x + (right ? 0 : 3), y + 4, 13, 2, '#c9ced4');
        F(c, x + (right ? 0 : 3), y + 4, 13, 1, '#eef1f4');
        F(c, x + (right ? 11 : 3), y + 6, 2, 2, '#9aa0a8');
        F(c, x, y + 14, 16, 2, '#3d3e42');
      }
    },

    cano_laranja(c, x, y, r, n) {
      T.concreto_liso(c, x, y, r, n);
      F(c, x + 7, y, 2, 16, '#e8742c'); F(c, x + 7, y, 1, 16, '#ff9a55');
      if (n(0, 1) !== 'o') { F(c, x + 5, y + 5, 6, 5, '#e8742c'); F(c, x + 5, y + 5, 6, 1, '#ff9a55'); F(c, x + 7, y + 10, 2, 3, '#e8742c'); }
    },

    botao_verde(c, x, y, r, n) {
      T.concreto_liso(c, x, y, r, n);
      F(c, x + 4, y + 4, 5, 5, '#1f9a52'); F(c, x + 5, y + 5, 3, 3, '#e8f3ec'); F(c, x + 6, y + 6, 1, 1, '#1f9a52');
    },

    piso_escuro(c, x, y, r, n) {
      F(c, x, y, 16, 16, '#5a5b60');
      speckle(c, x, y, r, ['#54555a', '#606166'], 6);
      F(c, x + 15, y, 1, 16, '#4c4d52'); F(c, x, y + 15, 16, 1, '#4c4d52');
      const up = n(0, -1);
      if (up && up !== 'f') { c.fillStyle = 'rgba(10,10,20,0.35)'; c.fillRect(x, y, 16, 5); }
      if (n(1, 0) === 'H') F(c, x + 14, y, 2, 16, '#4c4d52');
    },

    corrimao_inox(c, x, y, r, n) {
      T.piso_escuro(c, x, y, r, n);
      F(c, x + 8, y, 6, 16, '#d9d6cf');           // faixa clara na borda da escada
      F(c, x + 9, y, 1, 16, '#bdb9b1');
      F(c, x + 4, y, 2, 16, '#c9ced4');           // corrimão de inox
      F(c, x + 4, y, 1, 16, '#eef1f4');
      if ((y / 16) % 2 === 0) F(c, x + 3, y + 7, 4, 2, '#9aa0a8');
    },

    escada_desce(c, x, y, r, n) {
      // degraus descendo: quanto mais para baixo, mais escuro
      const k = Math.min(1, (y / 16 - 3) / 8);
      const shade = (hex) => Pixel.shade(hex, -0.45 * k);
      for (let s = 0; s < 2; s++) {
        const yy = y + s * 8;
        F(c, x, yy, 16, 6, shade('#6d6e73'));
        F(c, x, yy, 16, 1, shade('#8a8b90'));
        F(c, x, yy + 6, 16, 2, shade('#3e3f44'));
      }
      if (n(1, 0) !== 'S') { F(c, x + 13, y, 3, 16, shade('#c9ced4')); F(c, x + 13, y, 1, 16, shade('#eef1f4')); }
    },

    parede_lateral(c, x, y, r, n) {
      F(c, x, y, 16, 16, '#6f6e6b');
      F(c, x + (n(1, 0) ? 13 : 0), y, 3, 16, '#85847f');
      speckle(c, x, y, r, ['#6a6966', '#757470'], 4);
    },

    /* ---------- FASE 3: FRENTE DO SHOPPING ---------- */
    ceu(c, x, y) {
      for (let i = 0; i < 16; i++) F(c, x, y + i, 16, 1, i < 8 ? '#8ec3ec' : '#a6d2f2');
    },

    tijolo_shop(c, x, y, r, n) {
      F(c, x, y, 16, 16, '#b8653f');
      for (let j = 0; j < 16; j += 4) {
        F(c, x, y + j + 3, 16, 1, '#9a5233');
        const off = (j / 4) % 2 ? 4 : 0;
        for (let i = off; i < 16; i += 8) F(c, x + i, y + j, 1, 3, '#9a5233');
      }
      speckle(c, x, y, r, ['#c4744c', '#a95b39'], 4);
      if (n(0, 0) === 'n') { F(c, x, y, 16, 3, '#ece8e2'); F(c, x, y + 3, 16, 1, '#a9a49d'); }
    },

    frontao(c, x, y, r, n) {
      const cx = 15 * 16;
      for (let py = 0; py < 16; py++) for (let px = 0; px < 16; px++) {
        const gx = x + px + 0.5, gy = y + py;
        const half = (gy - 1) * 1.7;
        const d = Math.abs(gx - cx);
        let col;
        if (d < half - 4) col = ((Math.floor(gy / 4) + Math.floor((gx + (Math.floor(gy / 4) % 2) * 4) / 8)) % 2) && (gy % 4 !== 3) ? '#b8653f' : (gy % 4 === 3 ? '#9a5233' : '#b46141');
        else if (d < half) col = '#f2f0ec';
        else if (d < half + 6 && gy < 34) col = '#c9c7c4';
        else col = gy < 16 ? (py < 8 ? '#8ec3ec' : '#a6d2f2') : '#b8653f';
        F(c, x + px, y + py, 1, 1, col);
      }
    },

    logo_shop(c, x, y, r, n) {
      T.frontao(c, x, y, r, n);
      for (let py = 0; py < 16; py++) for (let px = 0; px < 16; px++) {
        const gx = x + px + 0.5, gy = y + py + 0.5;
        const d = Math.hypot(gx - 240, gy - 41);
        if (d < 9) F(c, x + px, y + py, 1, 1, d > 7.6 ? '#ffffff' : d > 3.5 && d < 5 ? '#ffffff' : '#2a9fa6');
      }
    },

    painel_cinza(c, x, y, r, n) {
      F(c, x, y, 16, 16, '#9c9a97');
      F(c, x, y, 16, 1, '#b5b3b0');
      if (n(0, 1) !== n(0, 0)) F(c, x, y + 14, 16, 2, '#86847f');
      if (n(-1, 0) !== n(0, 0)) F(c, x, y, 2, 16, '#86847f');
    },

    outdoor(c, x, y, r, n) {
      F(c, x, y, 16, 16, '#26262d');
      const l = n(-1, 0) === n(0, 0), rr = n(1, 0) === n(0, 0);
      const top = n(0, -1) !== n(0, 0), bottom = n(0, 1) !== n(0, 0);
      for (let px = 0; px < 16; px++) {
        const t = (x + px - 9 * 16) / (12 * 16);
        const col = t < 0.55 ? (t < 0.3 ? '#efe1d6' : '#d9b9a8') : t < 0.6 ? '#ffffff' : '#3f7fc1';
        F(c, x + px, y + (top ? 2 : 0), 1, 16 - (top ? 2 : 0) - (bottom ? 2 : 0), col);
      }
      if (!l) F(c, x, y, 2, 16, '#26262d');
      if (!rr) F(c, x + 14, y, 2, 16, '#26262d');
      if (x === 14 * 16 && !top) Pixel.blob(c, x + 4, y + 2, 4, '#c98f74');
      if (x === 18 * 16 && top) Pixel.blob(c, x + 8, y + 9, 4, '#ffffff');
    },

    marquise(c, x, y, r, n) {
      T.tijolo_shop(c, x, y, r, n);
      F(c, x, y + 4, 16, 6, '#f1efeb');
      F(c, x, y + 4, 16, 1, '#ffffff');
      F(c, x, y + 10, 16, 2, '#a9a6a1');
      F(c, x, y + 12, 16, 4, '#3a3540');
      if (n(-1, 0) !== 'm') F(c, x, y + 4, 2, 8, '#d7d4cf');
    },

    pilar_tijolo(c, x, y, r, n) {
      F(c, x, y, 16, 16, '#3a3540');
      F(c, x + 2, y, 12, 16, '#b8653f');
      for (let j = 0; j < 16; j += 4) F(c, x + 2, y + j + 3, 12, 1, '#9a5233');
      F(c, x + 2, y, 1, 16, '#c97a52'); F(c, x + 13, y, 1, 16, '#9a5233');
    },

    entrada_shop(c, x, y, r, n) {
      const bottom = n(0, -1) === n(0, 0);
      F(c, x, y, 16, 16, '#2b2832');
      F(c, x + 1, y + (bottom ? 0 : 2), 14, 16, '#3c4656');
      F(c, x + 7, y, 1, 16, '#5b6577');
      if (!bottom) { F(c, x + 2, y + 4, 4, 2, '#c9d6e3'); F(c, x + 10, y + 6, 3, 2, '#e8c35a'); }
      else { F(c, x, y + 14, 16, 2, '#7d7884'); if (r() < 0.5) F(c, x + 4, y + 4, 3, 8, '#5a4f6a'); }
    },

    vitrine(c, x, y, r, n) {
      const bottom = n(0, -1) === n(0, 0);
      F(c, x, y, 16, 16, '#2b2832');
      F(c, x, y + (bottom ? 0 : 3), 16, 16, '#2fa3a0');
      F(c, x + 1, y + (bottom ? 0 : 4), 14, bottom ? 9 : 12, '#cfe9ef');
      F(c, x + 3, y + (bottom ? 2 : 6), 3, 4, ['#ff8fbf', '#ffd86b', '#8fd0ff'][Math.floor(x / 16) % 3]);
      F(c, x + 9, y + (bottom ? 3 : 7), 3, 3, ['#ffd86b', '#8fd0ff', '#ff8fbf'][Math.floor(x / 16) % 3]);
      if (bottom) { F(c, x, y + 9, 16, 7, '#2fa3a0'); F(c, x, y + 9, 16, 1, '#6ed1cd'); }
    },

    lanchonete(c, x, y, r, n) {
      const bottom = n(0, -1) === n(0, 0);
      F(c, x, y, 16, 16, '#2b2832');
      if (!bottom) {
        F(c, x, y + 3, 16, 5, '#d6262f'); F(c, x, y + 3, 16, 1, '#ff6b6b');
        F(c, x + 2, y + 9, 12, 5, '#ffd86b'); F(c, x + 4, y + 10, 3, 3, '#d6262f'); F(c, x + 9, y + 10, 3, 3, '#ffffff');
      } else {
        F(c, x, y + 2, 16, 14, '#e2343c'); F(c, x, y + 2, 16, 2, '#ff6b6b');
        F(c, x + 3, y + 6, 10, 2, '#ffffff');
      }
    },

    piso_entrada(c, x, y, r) {
      F(c, x, y, 16, 16, '#c9c6c2');
      F(c, x + 15, y, 1, 16, '#b2afab'); F(c, x, y + 15, 16, 1, '#b2afab');
      c.fillStyle = 'rgba(40,30,50,0.18)'; c.fillRect(x, y, 16, 5);
    },

    /* ---------- FASE 3: SALA DE CINEMA ---------- */
    teto_cinema(c, x, y) {
      F(c, x, y, 16, 16, '#17121f');
      F(c, x, y + 14, 16, 2, '#241b2e');
    },

    parede_cinema(c, x, y, r, n) {
      F(c, x, y, 16, 16, '#2c2036');
      F(c, x + 1, y + 1, 14, 14, '#352743');
      F(c, x + 1, y + 1, 14, 1, '#40304f');
      if (y % 64 === 32) { F(c, x + 5, y + 6, 6, 3, '#ffcf7a'); F(c, x + 6, y + 9, 4, 2, 'rgba(255,207,122,0.4)'); }
    },

    fundo_tela(c, x, y) { F(c, x, y, 16, 16, '#0b0910'); },

    palco(c, x, y) {
      F(c, x, y, 16, 16, '#3a2a46');
      F(c, x, y, 16, 2, '#4d3a5c');
      F(c, x, y + 13, 16, 3, '#231a2c');
    },

    carpete(c, x, y, r) {
      F(c, x, y, 16, 16, '#4a1f30');
      for (let i = 0; i < 4; i++) F(c, x + 2 + i * 4, y + 2 + (i % 2) * 8, 1, 1, '#5b2a3e');
      speckle(c, x, y, r, ['#43192a', '#552538'], 4);
    },

    corredor_cinema(c, x, y, r) {
      F(c, x, y, 16, 16, '#3d1a28');
      F(c, x, y + 14, 16, 2, '#2c1220');
      F(c, x + 1, y + 13, 2, 1, '#ffcc66'); F(c, x + 13, y + 13, 2, 1, '#ffcc66');
    },

    porta_cinema(c, x, y, r, n) {
      F(c, x, y, 16, 16, '#2c2036');
      F(c, x + 1, y + 3, 14, 13, '#4b3a58');
      F(c, x + 2, y + 4, 12, 12, '#5d4a6c');
      F(c, x + 4, y, 8, 3, '#1f9a52'); F(c, x + 5, y + 1, 6, 1, '#ffffff');
    },

    /* ---------- FASE 4: QUINTAL DA CASA DELA ---------- */
    telhado_telha(c, x, y, r) {
      F(c, x, y, 16, 16, '#a8452f');
      for (let j = 0; j < 16; j += 5) {
        F(c, x, y + j + 4, 16, 1, '#7d2f20');
        for (let i = (j % 10 ? 3 : 0); i < 16; i += 6) F(c, x + i, y + j, 1, 4, '#c25a3f');
      }
      F(c, x, y + 14, 16, 2, '#5e2318');
    },

    parede_casa(c, x, y, r, n) {
      F(c, x, y, 16, 16, '#f2d7b0');
      speckle(c, x, y, r, ['#ead0a8', '#f7dfbd'], 5);
      if (n(0, 1) && !'HJjPp'.includes(n(0, 1))) { F(c, x, y + 13, 16, 3, '#c9a77e'); }
      if (n(0, -1) === 'R') F(c, x, y, 16, 2, '#d8b98f');
    },

    janela_casa(c, x, y, r, n) {
      T.parede_casa(c, x, y, r, n);
      const ch = n(0, 0); const bottom = ch === 'j';
      const right = n(-1, 0) === ch;
      F(c, x + (right ? 0 : 2), y + (bottom ? 0 : 3), right ? 14 : 14, bottom ? 9 : 13, '#ffffff');
      F(c, x + (right ? 0 : 3), y + (bottom ? 0 : 4), right ? 13 : 13, bottom ? 8 : 12, '#9cc8e6');
      F(c, x + (right ? 0 : 3), y + (bottom ? 0 : 4), right ? 13 : 13, bottom ? 0 : 3, '#c4e1f3');
      if (bottom) { F(c, x + (right ? 0 : 1), y + 9, 15, 2, '#e5e0d8'); Pixel.blob(c, x + 8, y + 12, 3, '#5aa64d'); F(c, x + 6, y + 13, 1, 1, '#ff8fbf'); }
      if (!right) F(c, x + 15, y + (bottom ? 0 : 3), 1, bottom ? 9 : 13, '#ffffff');
    },

    porta_casa(c, x, y, r, n) {
      const ch = n(0, 0); const bottom = ch === 'p';
      const right = n(-1, 0) === ch;
      T.parede_casa(c, x, y, r, n);
      F(c, x, y + (bottom ? 0 : 2), 16, 16, '#7a4a2e');
      F(c, x + (right ? 0 : 2), y + (bottom ? 0 : 4), 14, 16, '#9a6038');
      F(c, x + (right ? 0 : 15), y, 1, 16, '#5e3822');
      if (!bottom) F(c, x + (right ? 3 : 5), y + 6, 8, 6, '#c4e1f3');
      else { F(c, x + (right ? 2 : 12), y + 2, 2, 2, '#e9cc6a'); F(c, x, y + 14, 16, 2, '#c9a77e'); }
    },

    piso_area(c, x, y, r, n) {
      F(c, x, y, 16, 16, '#e6d3b8');
      F(c, x + 15, y, 1, 16, '#cdb99c'); F(c, x, y + 15, 16, 1, '#cdb99c');
      F(c, x + 2, y + 2, 3, 1, '#f1e3cf');
      const up = n(0, -1);
      if (up && 'HJjPpRCc'.includes(up)) { c.fillStyle = 'rgba(80,50,30,0.22)'; c.fillRect(x, y, 16, 4); }
    },

    muro(c, x, y, r, n) {
      F(c, x, y, 16, 16, '#e9e2d6');
      F(c, x, y, 16, 3, '#f7f2ea');
      F(c, x, y + 3, 16, 1, '#c9c0b2');
      speckle(c, x, y + 4, r, ['#ddd5c8', '#f1ebe2'], 5);
      if (r() < 0.3) { F(c, x + 4, y + 6, 2, 6, '#5aa64d'); F(c, x + 3, y + 8, 1, 2, '#5aa64d'); }
    },

    churrasqueira(c, x, y, r, n) {
      const ch = n(0, 0); const bottom = ch === 'c';
      const left = n(-1, 0) !== ch, right = n(1, 0) !== ch;
      F(c, x, y, 16, 16, '#b0563c');
      for (let j = 0; j < 16; j += 4) {
        F(c, x, y + j + 3, 16, 1, '#8c3f2b');
        for (let i = (j / 4) % 2 ? 4 : 0; i < 16; i += 8) F(c, x + i, y + j, 1, 3, '#8c3f2b');
      }
      if (!bottom) {
        // chaminé/coifa
        if (!left && !right) F(c, x, y, 16, 16, '#9a4a33');
        F(c, x, y + 12, 16, 4, '#5a5560'); F(c, x, y + 12, 16, 1, '#7a7580');
      } else {
        // boca da churrasqueira com brasa e espetos
        F(c, x + (left ? 2 : 0), y, 16 - (left ? 2 : 0) - (right ? 2 : 0), 10, '#2a2228');
        for (let i = 0; i < 6; i++) F(c, x + 2 + Math.floor(r() * 12), y + 6 + Math.floor(r() * 3), 2, 1, r() < 0.5 ? '#ff7a2c' : '#ffcc4a');
        F(c, x + (left ? 2 : 0), y + 3, 16 - (left ? 2 : 0) - (right ? 2 : 0), 1, '#9aa0a8');
        F(c, x + 4, y + 2, 3, 2, '#8c3a24'); F(c, x + 10, y + 2, 3, 2, '#b04a2c');
        F(c, x, y + 10, 16, 6, '#c9c4bd'); F(c, x, y + 10, 16, 1, '#e5e0d8');
      }
    },

    /* ---------- FASE 4: SORVETERIA ---------- */
    parede_sorveteria(c, x, y, r, n) {
      for (let i = 0; i < 16; i += 4) F(c, x + i, y, 4, 16, (i / 4) % 2 ? '#ffd3e4' : '#fff4f8');
      if (n(0, 1) && !'wQ'.includes(n(0, 1))) F(c, x, y + 13, 16, 3, '#9fd8cf');
    },

    cardapio(c, x, y, r, n) {
      T.parede_sorveteria(c, x, y, r, n);
      const l = n(-1, 0) === 'Q', rr = n(1, 0) === 'Q';
      F(c, x + (l ? 0 : 1), y + 2, 16 - (l ? 0 : 1) - (rr ? 0 : 1), 11, '#8a5a3c');
      F(c, x + (l ? 0 : 2), y + 3, 16 - (l ? 0 : 2) - (rr ? 0 : 2), 9, '#2f3a33');
      for (let j = 0; j < 3; j++) F(c, x + 3, y + 4 + j * 3, 6 + Math.floor(r() * 4), 1, '#f2efe6');
      F(c, x + 11, y + 4, 2, 2, ['#ff8fbf', '#ffd86b', '#8fd0ff'][Math.floor(x / 16) % 3]);
    },

    freezer(c, x, y, r, n) {
      F(c, x, y, 16, 16, '#dfe7ec');
      F(c, x, y, 16, 2, '#ffffff');
      F(c, x + 1, y + 3, 14, 12, '#bfe3f0');
      const cores = ['#ff9fc4', '#f6e3b0', '#7a4a33', '#9be3b9', '#ffd86b', '#c9a0f0'];
      for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) {
        F(c, x + 2 + i * 7, y + 4 + j * 6, 5, 4, cores[(Math.floor(x / 16) * 2 + i + j * 3) % cores.length]);
        F(c, x + 2 + i * 7, y + 4 + j * 6, 5, 1, '#ffffff');
      }
      F(c, x + 15, y, 1, 16, '#b7c3cb');
    },

    balcao(c, x, y, r, n) {
      F(c, x, y, 16, 16, '#ffffff');
      for (let i = 0; i < 16; i += 4) F(c, x + i, y + 3, 2, 13, '#ff8fbf');
      F(c, x, y, 16, 3, '#9fd8cf'); F(c, x, y + 14, 16, 2, '#d47aa0');
    },

    piso_xadrez(c, x, y, r, n) {
      for (const sy of [0, 8]) for (const sx of [0, 8]) {
        const dark = ((x + sx) / 8 + (y + sy) / 8) % 2 === 0;
        F(c, x + sx, y + sy, 8, 8, dark ? '#e7b7cc' : '#fff6fa');
      }
      const up = n(0, -1);
      if (up && 'wQFf'.includes(up)) { c.fillStyle = 'rgba(80,40,60,0.15)'; c.fillRect(x, y, 16, 4); }
    },

    porta_loja(c, x, y, r, n) {
      const right = n(-1, 0) === n(0, 0);
      F(c, x, y, 16, 16, '#9fd8cf');
      F(c, x + (right ? 0 : 2), y + 2, 14, 14, '#d9f0f6');
      F(c, x + (right ? 0 : 15), y, 1, 16, '#6fb8ad');
      F(c, x + (right ? 2 : 12), y + 7, 2, 4, '#ffffff');
    },

    /* ---------- FASE 4 (v2): ÁREA DA CHURRASQUEIRA ---------- */
    azulejo(c, x, y, r, n) {
      F(c, x, y, 16, 16, '#eef3f2');
      for (let i = 0; i < 16; i += 4) { F(c, x + i, y, 1, 16, '#cfdcda'); F(c, x, y + i, 16, 1, '#cfdcda'); }
      if (n(0, -1) === 'R') F(c, x, y, 16, 2, '#d8b98f');
    },

    pia(c, x, y, r, n) {
      // bancada da pia colada na churrasqueira, com cuba e torneira
      const left = n(-1, 0) !== n(0, 0);
      F(c, x, y, 16, 16, '#d9d6d0');
      F(c, x, y, 16, 2, '#f2f0ec');
      F(c, x, y + 13, 16, 3, '#a9a39b');
      if (left) {
        F(c, x + 3, y + 3, 13, 9, '#9aa3ad'); F(c, x + 4, y + 4, 12, 7, '#c3cbd3'); F(c, x + 5, y + 5, 3, 1, '#eef2f5');
        F(c, x + 9, y + 1, 2, 4, '#7d8590'); F(c, x + 9, y + 1, 4, 1, '#7d8590');
      } else {
        F(c, x, y + 3, 10, 9, '#9aa3ad'); F(c, x, y + 4, 9, 7, '#c3cbd3');
        F(c, x + 11, y + 5, 3, 5, '#ffd86b'); F(c, x + 11, y + 4, 3, 1, '#5aa64d');
      }
    },

    bancada_preta(c, x, y, r, n) {
      F(c, x, y, 16, 16, '#1d1c21');
      speckle(c, x, y, r, ['#2b2a31', '#3a3842', '#141317'], 14);
      F(c, x, y, 16, 1, '#4a4852');
      F(c, x, y + 12, 16, 4, '#121115');
      const left = n(-1, 0) !== n(0, 0), right = n(1, 0) !== n(0, 0);
      if (left) F(c, x, y, 1, 16, '#4a4852');
      if (right) F(c, x + 15, y, 1, 16, '#4a4852');
      const k = Math.floor(x / 16) % 3;
      if (k === 1) { F(c, x + 2, y + 3, 11, 7, '#b5824f'); F(c, x + 4, y + 4, 4, 3, '#a8452f'); F(c, x + 9, y + 5, 3, 2, '#8c3a24'); }
      if (k === 2) { Pixel.blob(c, x + 8, y + 6, 4, '#e8e3da'); F(c, x + 6, y + 5, 3, 2, '#d9b16a'); }
    },

    parede_lado_casa(c, x, y, r, n) {
      F(c, x, y, 16, 16, '#e6c9a0');
      F(c, x + (n(1, 0) ? 12 : 0), y, 4, 16, '#f2d7b0');
      speckle(c, x, y, r, ['#ddbf95', '#ecd2ab'], 4);
    },

    porta_vidro_aberta(c, x, y, r, n) {
      // porta de vidro de correr, aberta (vê-se a luz de fora)
      const bottom = n(0, -1) === n(0, 0);
      F(c, x, y, 16, 16, '#fff1cc');
      F(c, x + 6, y, 10, 16, '#f7e2b0');
      F(c, x, y, 3, 16, '#8a8f98');
      F(c, x + 3, y, 3, 16, 'rgba(160,200,230,0.8)');
      F(c, x + 3, y, 3, 16, '#bcd8ea'); F(c, x + 4, y + (bottom ? 2 : 4), 1, 6, '#e6f3fb');
      if (!bottom) F(c, x, y, 16, 1, '#8a8f98'); else F(c, x, y + 15, 16, 1, '#8a8f98');
    },

    /* ---------- FASE 4 (v2): SORVETERIA ROXA E LARANJA ---------- */
    teto_branco(c, x, y, r) {
      F(c, x, y, 16, 16, '#efeeec');
      F(c, x + 3, y + 3, 10, 4, '#ffffff'); F(c, x + 3, y + 7, 10, 1, '#d9d7d3');
      for (let i = 0; i < 16; i += 3) F(c, x + i, y + 11 + (i % 2), 2, 2, i % 6 ? '#b9bcc4' : '#8e3aa0'); // guirlanda
      F(c, x, y + 14, 16, 2, '#d9d7d3');
    },

    parede_roxa(c, x, y, r, n) {
      F(c, x, y, 16, 16, '#6e2580');
      F(c, x, y, 16, 2, '#5a1d69');
      speckle(c, x, y, r, ['#762a88', '#68227a'], 3);
      if (n(0, 1) && !'wQS'.includes(n(0, 1))) F(c, x, y + 14, 16, 2, '#4d1659');
    },

    placa_cone(c, x, y, r, n) {
      T.parede_roxa(c, x, y, r, n);
      const right = n(-1, 0) === 'S';
      F(c, x + (right ? 0 : 2), y + 3, right ? 14 : 14, 10, '#ffffff');
      if (!right) {
        // casquinha de sorvete (sem marca)
        for (let j = 0; j < 5; j++) F(c, x + 11 + Math.floor(j / 2), y + 8 + j, 4 - j * 0.8 | 0 || 1, 1, '#e0a14a');
        Pixel.blob(c, x + 13, y + 7, 2.6, '#ff8fbf');
      } else {
        Pixel.blob(c, x + 3, y + 7, 2.6, '#8e3aa0');
        for (let i = 0; i < 3; i++) F(c, x + 6 + i * 3, y + 7, 2, 2, '#8e3aa0');
      }
    },

    tela_menu(c, x, y, r, n) {
      T.parede_roxa(c, x, y, r, n);
      const right = n(-1, 0) === n(0, 0);
      F(c, x + (right ? 0 : 2), y + 3, 14, 9, '#1d1c22');
      F(c, x + (right ? 1 : 3), y + 4, 12, 7, right ? '#ff9a3c' : '#4fc3f7');
      F(c, x + (right ? 3 : 5), y + 6, 6, 1, '#ffffff'); F(c, x + (right ? 3 : 5), y + 8, 4, 1, '#ffffff');
    },

    balcao_laranja(c, x, y, r, n) {
      F(c, x, y, 16, 16, '#f08a24');
      F(c, x, y, 16, 4, '#ffa64a'); F(c, x, y, 16, 1, '#ffc27a');
      F(c, x, y + 4, 16, 1, '#c96d16');
      if (n(-1, 0) !== n(0, 0)) F(c, x, y, 1, 16, '#c96d16');
      if (n(1, 0) !== n(0, 0)) F(c, x + 15, y, 1, 16, '#c96d16');
      if (Math.floor(x / 16) % 3 === 1) { F(c, x + 4, y + 8, 8, 3, '#ffffff'); }
      F(c, x, y + 14, 16, 2, '#b85f12');
    },

    freezer_ilha(c, x, y, r, n) {
      const ch = n(0, 0);
      const l = n(-1, 0) === ch, rr = n(1, 0) === ch, u = n(0, -1) === ch, d = n(0, 1) === ch;
      F(c, x, y, 16, 16, '#c4268a');
      F(c, x + (l ? 0 : 2), y + (u ? 0 : 2), 16 - (l ? 0 : 2) - (rr ? 0 : 2), 16 - (u ? 0 : 2) - (d ? 0 : 3), '#d9e6ee');
      const cores = ['#ff9fc4', '#7a4a33', '#f6e3b0', '#9be3b9', '#ffd86b', '#c9a0f0'];
      for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) {
        const px = x + (l ? 1 : 3) + i * 6, py = y + (u ? 1 : 3) + j * 6;
        F(c, px, py, 5, 5, cores[(Math.floor(x / 16) + Math.floor(y / 16) * 2 + i + j * 2) % cores.length]);
        F(c, px, py, 5, 1, '#ffffff');
      }
      if (!d) { F(c, x, y + 13, 16, 3, '#9a1c6c'); }
      if (!l) F(c, x, y, 2, 16, '#a81f76');
    },

    piso_branco(c, x, y, r, n) {
      F(c, x, y, 16, 16, '#ecebe8');
      F(c, x + 15, y, 1, 16, '#d6d4d0'); F(c, x, y + 15, 16, 1, '#d6d4d0');
      if (r() < 0.4) F(c, x + 3, y + 3, 4, 1, '#ffffff');
      const up = n(0, -1);
      if (up && 'wQSO'.includes(up)) { c.fillStyle = 'rgba(60,20,70,0.16)'; c.fillRect(x, y, 16, 4); }
    },

    parede_deco(c, x, y, r, n) {
      // paredes laterais brancas com adesivos coloridos
      F(c, x, y, 16, 16, '#f6f5f2');
      const right = !n(1, 0);
      const k = Math.floor(y / 16) % 4;
      const cols = ['#ff6fae', '#ffd86b', '#8e3aa0', '#4fc3f7', '#f08a24'];
      if (k === 0) { for (let i = 0; i < 4; i++) Pixel.blob(c, x + (right ? 4 : 12), y + 16, 11 - i * 2.5, cols[i]); }
      if (k === 2) { Pixel.blob(c, x + 8, y + 6, 3, '#ff8fbf'); for (let j = 0; j < 5; j++) F(c, x + 6 + Math.floor(j / 2), y + 9 + j, Math.max(1, 4 - j), 1, '#e0a14a'); }
      if (k === 3) for (let i = 0; i < 5; i++) F(c, x + 2 + i * 3, y + 4, 2, 8, cols[i]);
      F(c, x + (right ? 0 : 14), y, 2, 16, '#d9d7d3');
    },

    vitrine_frente(c, x, y, r, n) {
      F(c, x, y, 16, 16, '#d6e7ef');
      F(c, x, y, 16, 2, '#9aa3ad');
      if (Math.floor(x / 16) % 4 === 1) { Pixel.blob(c, x + 8, y + 9, 4, '#ff6fae'); Pixel.blob(c, x + 8, y + 9, 2, '#ffd86b'); }
      F(c, x + 3, y + 4, 1, 8, '#ffffff');
    },

    tapete_laranja(c, x, y, r, n) {
      T.piso_branco(c, x, y, r, n);
      F(c, x, y + 2, 16, 12, '#f07a1c');
      F(c, x, y + 2, 16, 1, '#ff9a4a');
      if (n(-1, 0) === 'm') F(c, x, y + 7, 6, 2, '#ffffff'); else F(c, x + 8, y + 7, 8, 2, '#ffffff');
    },

    /* ---------- FASE 4: CALÇADA EM FRENTE À SORVETERIA ---------- */
    fachada_roxa(c, x, y, r, n) {
      F(c, x, y, 16, 16, '#5a1d69');
      F(c, x, y + 12, 16, 4, '#6e2580');
      F(c, x, y + 12, 16, 1, '#8e3aa0');
      for (let i = 0; i < 16; i += 4) F(c, x + i + 1, y + 13, 2, 2, '#ffd86b'); // luzinhas
    },

    vitrine_acesa(c, x, y, r, n) {
      const bottom = n(0, -1) === n(0, 0);
      F(c, x, y, 16, 16, '#3a1442');
      F(c, x + 1, y + (bottom ? 0 : 1), 14, 16 - (bottom ? 2 : 1), '#ffe2a8');
      F(c, x + 1, y + (bottom ? 0 : 1), 14, 3, '#fff3cf');
      if (!bottom && Math.floor(x / 16) % 3 === 0) { F(c, x + 4, y + 6, 8, 6, '#c4268a'); F(c, x + 5, y + 7, 6, 2, '#d9e6ee'); }
      if (bottom && Math.floor(x / 16) % 3 === 1) { F(c, x + 3, y + 2, 10, 8, '#f08a24'); }
      if (bottom) F(c, x, y + 14, 16, 2, '#4d1659');
    },
  };
  return T;
})();
