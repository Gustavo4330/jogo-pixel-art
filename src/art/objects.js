/* =========================================================
   ARTE DOS OBJETOS (árvores, bancos, mesas, itens, ícones...)
   Cada função retorna um <canvas> com o desenho.
   ========================================================= */

// Moto elétrica vista de lado (virada para a direita). Com o casal: Gustavo
// pilotando (regata preta) e a Bia na garupa de corta-vento.
function CharArtMoto(c, comCasal) {
  const F = Pixel.F, B = Pixel.blob;
  const oy = comCasal ? 12 : 0;
  for (const wx of [8, 30]) { B(c, wx, oy + 16, 5.5, '#1d1b22'); B(c, wx, oy + 16, 2.5, '#9aa0a8'); }
  F(c, 9, oy + 9, 20, 5, '#2b2a33'); F(c, 9, oy + 9, 20, 1, '#4a4856');
  F(c, 11, oy + 6, 14, 3, '#3a3842'); F(c, 11, oy + 6, 14, 1, '#55535f');   // banco
  F(c, 27, oy + 3, 2, 8, '#55535f'); F(c, 26, oy + 2, 5, 2, '#2b2a33');      // guidão
  F(c, 31, oy + 7, 4, 3, '#ffe28a'); F(c, 30, oy + 13, 3, 2, '#55535f');     // farol
  F(c, 12, oy + 11, 10, 2, '#4fc3f7');                                       // faixa (elétrica)
  if (!comCasal) return;
  // Bia na garupa: corta-vento bege e preto, cabelo longo
  F(c, 9, 4, 7, 9, '#3a231d'); F(c, 12, 1, 6, 7, '#c88a62'); F(c, 11, 0, 7, 2, '#3a231d'); F(c, 11, 2, 2, 4, '#3a231d');
  F(c, 16, 3, 1, 2, '#2a1a22'); F(c, 16, 5, 1, 1, '#e0727f'); F(c, 17, 6, 1, 1, '#a86e4c');
  F(c, 11, 8, 7, 8, '#d9c7a3'); F(c, 11, 8, 1, 8, '#1d1b22'); F(c, 16, 9, 2, 6, '#1d1b22');
  F(c, 12, 15, 6, 3, '#83a9d8');
  // Gustavo pilotando: regata preta
  F(c, 20, 0, 6, 3, '#2e1f1a'); F(c, 20, 3, 6, 5, '#e6b590'); F(c, 24, 4, 1, 1, '#2a1a22'); F(c, 19, 2, 2, 4, '#2e1f1a');
  F(c, 19, 8, 7, 8, '#1d1b22'); F(c, 25, 9, 3, 2, '#e6b590'); F(c, 27, 10, 1, 1, '#e6b590');
  F(c, 20, 15, 6, 3, '#7aa2d4');
}

const ObjectArt = (() => {
  const F = Pixel.F, B = Pixel.blob;

  function make(w, h, draw, outline = true) {
    const { c, ctx } = Pixel.canvas(w, h);
    draw(ctx, Pixel.rng(w * 31 + h));
    if (outline) Pixel.outlineCanvas(c);
    return c;
  }

  function canopy(c, r, cx, cy, rad, k) {
    B(c, cx, cy + 2, rad, k[0]);
    B(c, cx - rad * 0.45, cy + 2, rad * 0.7, k[1]);
    B(c, cx + rad * 0.45, cy + 1, rad * 0.7, k[1]);
    B(c, cx, cy - rad * 0.3, rad * 0.72, k[2]);
    B(c, cx - rad * 0.35, cy - rad * 0.45, rad * 0.3, k[3]);
    B(c, cx + rad * 0.25, cy - rad * 0.6, rad * 0.2, k[3]);
    for (let i = 0; i < 14; i++) {
      const a = r() * Math.PI * 2, d = r() * rad * 0.85;
      F(c, Math.round(cx + Math.cos(a) * d), Math.round(cy + Math.sin(a) * d), 1, 1, r() < 0.5 ? k[3] : k[0]);
    }
  }

  const GREEN = ['#3a7a37', '#4b9243', '#5aa64d', '#7cc265'];
  const PINK = ['#c4669c', '#dc84b6', '#eea2cb', '#ffd3ea'];

  return {
    tree: () => make(32, 42, (c, r) => {
      F(c, 14, 26, 4, 14, '#6e4a36'); F(c, 14, 26, 1, 14, '#8a6046'); F(c, 12, 38, 8, 3, '#5b3d2d');
      canopy(c, r, 16, 15, 12.5, GREEN);
    }),

    treePink: () => make(40, 50, (c, r) => {
      F(c, 18, 30, 5, 18, '#6e4a36'); F(c, 18, 30, 1, 18, '#8a6046'); F(c, 15, 46, 11, 3, '#5b3d2d');
      F(c, 13, 30, 6, 2, '#6e4a36'); F(c, 22, 28, 6, 2, '#6e4a36');
      canopy(c, r, 20, 17, 15.5, PINK);
      for (let i = 0; i < 6; i++) F(c, Math.floor(r() * 40), 36 + Math.floor(r() * 12), 1, 1, '#ffb6d9');
    }),

    planterTree: () => make(52, 60, (c, r) => {
      F(c, 24, 26, 4, 22, '#6e4a36'); F(c, 24, 26, 1, 22, '#8a6046');
      canopy(c, r, 26, 17, 15, GREEN);
      for (let i = 0; i < 7; i++) B(c, 5 + i * 7, 45, 4, i % 2 ? '#4b9243' : '#3a7a37');
      for (let i = 0; i < 8; i++) F(c, 3 + Math.floor(r() * 46), 41 + Math.floor(r() * 5), 1, 1, '#7cc265');
      F(c, 1, 46, 50, 14, '#cbc2c9'); F(c, 1, 46, 50, 3, '#e5dde3'); F(c, 1, 57, 50, 3, '#a399a5');
      F(c, 1, 46, 2, 14, '#e5dde3');
    }),

    planter: () => make(32, 22, (c, r) => {
      for (let i = 0; i < 5; i++) B(c, 4 + i * 6, 9, 4.2, i % 2 ? '#4b9243' : '#3a7a37');
      for (let i = 0; i < 6; i++) F(c, 3 + Math.floor(r() * 26), 5 + Math.floor(r() * 5), 1, 1, '#7cc265');
      F(c, 8, 6, 2, 2, '#f08cbf'); F(c, 21, 7, 2, 2, '#ffd86b');
      F(c, 1, 11, 30, 11, '#cbc2c9'); F(c, 1, 11, 30, 2, '#e5dde3'); F(c, 1, 19, 30, 3, '#a399a5');
    }),

    bench: () => make(32, 16, (c) => {
      F(c, 3, 10, 2, 6, '#4a3f55'); F(c, 27, 10, 2, 6, '#4a3f55');
      F(c, 1, 0, 30, 3, '#c27a45'); F(c, 1, 0, 30, 1, '#dc9560');
      F(c, 4, 3, 2, 2, '#4a3f55'); F(c, 26, 3, 2, 2, '#4a3f55');
      F(c, 1, 5, 30, 3, '#b8703f'); F(c, 1, 5, 30, 1, '#d38b55');
      F(c, 1, 8, 30, 3, '#a5623a');
    }),

    lamp: () => make(10, 36, (c) => {
      F(c, 4, 8, 2, 25, '#4b4560'); F(c, 4, 8, 1, 25, '#6a6380');
      F(c, 2, 32, 6, 4, '#3a3550');
      F(c, 1, 2, 8, 6, '#5a5470'); F(c, 3, 0, 4, 2, '#5a5470');
      F(c, 2, 5, 6, 2, '#fff2b8'); F(c, 3, 5, 2, 1, '#ffffff');
    }),

    table: () => make(34, 32, (c) => {
      // banco de trás
      F(c, 3, 0, 28, 4, '#8e8496'); F(c, 3, 0, 28, 1, '#aca2b4');
      F(c, 5, 4, 2, 3, '#5b5468'); F(c, 27, 4, 2, 3, '#5b5468');
      // tampo
      F(c, 1, 8, 32, 12, '#dcd5de'); F(c, 1, 8, 32, 1, '#f3eef5'); F(c, 1, 18, 32, 2, '#a59cab');
      F(c, 4, 11, 6, 1, '#ece7ee');
      F(c, 4, 20, 2, 4, '#5b5468'); F(c, 28, 20, 2, 4, '#5b5468');
      // banco da frente
      F(c, 3, 24, 28, 4, '#8e8496'); F(c, 3, 24, 28, 1, '#aca2b4');
      F(c, 5, 28, 2, 4, '#5b5468'); F(c, 27, 28, 2, 4, '#5b5468');
    }),

    trash: () => make(12, 16, (c) => {
      F(c, 1, 3, 10, 13, '#9aa0ae'); F(c, 2, 4, 1, 11, '#c3c8d2'); F(c, 9, 4, 1, 11, '#7c8292');
      F(c, 1, 8, 10, 1, '#7c8292');
      F(c, 0, 1, 12, 3, '#7c8292'); F(c, 0, 1, 12, 1, '#a9aebb');
    }),

    plant: () => make(16, 24, (c, r) => {
      F(c, 4, 16, 8, 8, '#c0623e'); F(c, 3, 15, 10, 2, '#d97c56'); F(c, 5, 18, 1, 5, '#d97c56');
      B(c, 8, 10, 5.5, '#3f8a3c'); B(c, 5, 8, 3.2, '#56a24c'); B(c, 11, 7, 3.2, '#56a24c'); B(c, 8, 4, 3, '#6cb85a');
      for (let i = 0; i < 5; i++) F(c, 3 + Math.floor(r() * 10), 3 + Math.floor(r() * 10), 1, 1, '#8fd277');
    }),

    sign: () => make(18, 22, (c) => {
      F(c, 8, 11, 2, 11, '#6e4a36');
      F(c, 1, 1, 16, 11, '#b5468a'); F(c, 2, 2, 14, 9, '#fbe4f0');
      Pixel.heart(c, 5, 4, '#ff5fa2');
      F(c, 11, 4, 3, 1, '#c9a9bd'); F(c, 11, 6, 3, 1, '#c9a9bd'); F(c, 11, 8, 2, 1, '#c9a9bd');
    }),

    star: () => make(14, 14, (c) => {
      const pts = ['......#......', '.....###.....', '.....###.....', '#############', '.###########.', '...#######...', '...#######...', '..####.####..', '..###...###..', '.##.......##.'];
      pts.forEach((row, y) => [...row].forEach((ch, x) => { if (ch === '#') F(c, x, y + 2, 1, 1, '#ffd75e'); }));
      F(c, 5, 6, 3, 2, '#fff7d1'); F(c, 6, 3, 1, 3, '#fff3b8');
    }),

    tortuguita: () => make(28, 20, (c) => {
      // patinhas
      F(c, 5, 4, 4, 3, '#4f2c18'); F(c, 17, 4, 4, 3, '#4f2c18');
      F(c, 5, 14, 4, 3, '#4f2c18'); F(c, 17, 14, 4, 3, '#4f2c18');
      F(c, 1, 9, 3, 2, '#4f2c18');
      // cabeça
      B(c, 24, 10, 3.5, '#5a341e'); F(c, 25, 8, 1, 1, '#ffffff'); F(c, 26, 8, 1, 1, '#1a0f0a');
      // casco
      B(c, 13, 10.5, 8.2, '#6b3f24');
      B(c, 13, 10, 6.5, '#82502e');
      F(c, 10, 7, 6, 1, '#a8703f'); F(c, 8, 10, 1, 3, '#a8703f'); F(c, 18, 9, 1, 3, '#a8703f');
      F(c, 11, 10, 4, 3, '#6b3f24'); F(c, 12, 11, 2, 1, '#a8703f');
      F(c, 9, 5, 3, 1, '#c48b55');
    }),

    benchConcrete: () => make(34, 13, (c, r) => {
      F(c, 4, 8, 6, 5, '#9f9992'); F(c, 24, 8, 6, 5, '#9f9992');
      F(c, 1, 0, 32, 7, '#dad6d0'); F(c, 1, 0, 32, 1, '#ece9e4');
      F(c, 1, 6, 32, 3, '#b6b0a9');
      for (let i = 0; i < 6; i++) F(c, 2 + Math.floor(r() * 30), 1 + Math.floor(r() * 5), 1, 1, '#c8c3bd');
    }),

    tableLong: () => make(48, 34, (c) => {
      const stool = (x, y) => { F(c, x + 3, y + 4, 2, 4, '#24212a'); F(c, x, y, 8, 4, '#e9e6e2'); F(c, x, y + 3, 8, 1, '#c4c0bb'); };
      [5, 20, 35].forEach((x) => stool(x, 0));
      F(c, 2, 9, 44, 13, '#f2f0ee'); F(c, 2, 9, 44, 1, '#ffffff'); F(c, 2, 20, 44, 2, '#c9c5c0');
      F(c, 6, 12, 10, 1, '#ffffff');
      F(c, 5, 22, 2, 4, '#24212a'); F(c, 41, 22, 2, 4, '#24212a'); F(c, 5, 25, 38, 1, '#24212a');
      [5, 20, 35].forEach((x) => { F(c, x + 3, 26, 2, 3, '#24212a'); F(c, x, 28, 8, 4, '#e9e6e2'); F(c, x, 31, 8, 1, '#c4c0bb'); });
    }),

    trashYellow: () => make(12, 17, (c) => {
      F(c, 1, 4, 10, 13, '#8f95a3'); F(c, 2, 5, 1, 11, '#b9bec9'); F(c, 9, 5, 1, 11, '#727886');
      F(c, 0, 1, 12, 4, '#f2c230'); F(c, 0, 1, 12, 1, '#ffe07a'); F(c, 3, 0, 6, 1, '#d9a91f');
    }),

    sapling: () => make(18, 32, (c, r) => {
      F(c, 8, 12, 2, 18, '#7a5a3f'); F(c, 12, 14, 1, 16, '#c8b07a'); F(c, 9, 18, 4, 1, '#c8b07a');
      F(c, 6, 29, 7, 3, '#6b5a3d');
      B(c, 9, 9, 6, '#4b9243'); B(c, 6, 7, 3.5, '#5aa64d'); B(c, 12, 6, 3.5, '#5aa64d'); B(c, 9, 4, 3, '#7cc265');
      for (let i = 0; i < 6; i++) F(c, 4 + Math.floor(r() * 10), 3 + Math.floor(r() * 10), 1, 1, '#3a7a37');
    }),

    arrow: () => make(13, 11, (c) => {
      F(c, 4, 0, 5, 5, '#ff4f98'); F(c, 0, 4, 13, 2, '#ff4f98'); F(c, 1, 6, 11, 1, '#ff4f98');
      F(c, 2, 7, 9, 1, '#ff4f98'); F(c, 3, 8, 7, 1, '#ff4f98'); F(c, 5, 9, 3, 1, '#ff4f98'); F(c, 6, 10, 1, 1, '#ff4f98');
      F(c, 5, 1, 1, 3, '#ffc2dc');
    }),

    seat: () => make(16, 15, (c) => {
      F(c, 0, 3, 3, 12, '#2a1d2f'); F(c, 13, 3, 3, 12, '#2a1d2f');
      F(c, 2, 0, 12, 13, '#a81f30'); F(c, 2, 0, 12, 2, '#d23a48'); F(c, 3, 2, 1, 9, '#c22d3c');
      F(c, 2, 11, 12, 2, '#7d1522');
      F(c, 0, 3, 3, 1, '#3d2b44'); F(c, 13, 3, 3, 1, '#3d2b44');
    }),

    movieScreen: () => make(352, 46, (c, r) => {
      // tela do cinema: cidade à noite, lua e teias (cena de filme de herói)
      F(c, 0, 0, 352, 46, '#0b0910');
      const x0 = 8, y0 = 3, w = 336, h = 40;
      for (let i = 0; i < h; i++) {
        const t = i / h;
        F(c, x0, y0 + i, w, 1, t < 0.4 ? '#1a2a5e' : t < 0.75 ? '#2c3f7c' : '#5a3f7c');
      }
      Pixel.blob(c, 270, 14, 7, '#f6edcf');
      for (let i = 0; i < 40; i++) F(c, x0 + Math.floor(r() * w), y0 + Math.floor(r() * 14), 1, 1, '#d8e2ff');
      let bx = x0;
      while (bx < x0 + w) {
        const bw = 10 + Math.floor(r() * 16), bh = 10 + Math.floor(r() * 22);
        F(c, bx, y0 + h - bh, bw, bh, '#151a33');
        for (let wy = y0 + h - bh + 3; wy < y0 + h - 2; wy += 4) for (let wx = bx + 2; wx < bx + bw - 2; wx += 4) if (r() < 0.45) F(c, wx, wy, 2, 2, '#ffd86b');
        bx += bw + 1;
      }
      // teias no canto
      c.strokeStyle = 'rgba(255,255,255,0.75)'; c.lineWidth = 1;
      for (let a = 0; a < 6; a++) { c.beginPath(); c.moveTo(x0, y0); c.lineTo(x0 + Math.cos(a * 0.3) * 60, y0 + Math.sin(a * 0.3) * 60); c.stroke(); }
      for (let k = 1; k < 4; k++) { c.beginPath(); c.arc(x0, y0, k * 14, 0, Math.PI / 2); c.stroke(); }
      F(c, 0, 0, 352, 3, '#0b0910'); F(c, 0, 43, 352, 3, '#0b0910');
    }, false),

    swinger: () => make(7, 9, (c) => {
      F(c, 2, 0, 3, 3, '#d42a2f'); F(c, 1, 3, 5, 3, '#2d58c8'); F(c, 2, 3, 3, 2, '#d42a2f');
      F(c, 1, 6, 2, 3, '#2d58c8'); F(c, 4, 6, 2, 3, '#d42a2f');
    }, false),

    bbqTable: () => make(68, 30, (c) => {
      F(c, 2, 4, 64, 20, '#f2f0ec'); F(c, 2, 4, 64, 2, '#ffffff'); F(c, 2, 22, 64, 2, '#c9c4bd');
      F(c, 6, 24, 2, 6, '#9a958f'); F(c, 60, 24, 2, 6, '#9a958f');
      // travessa de carne, farofa, vinagrete, pão de alho e copos
      F(c, 24, 8, 20, 10, '#d9d4cc'); F(c, 26, 10, 6, 3, '#8c3a24'); F(c, 33, 10, 7, 3, '#a8452f'); F(c, 27, 14, 12, 2, '#b04a2c');
      Pixel.blob(c, 13, 13, 5, '#e8d08a'); F(c, 11, 12, 2, 1, '#c9a75a');
      Pixel.blob(c, 54, 13, 5, '#e8e3da'); F(c, 52, 12, 2, 2, '#d6262f'); F(c, 55, 14, 2, 1, '#5aa64d');
      F(c, 46, 7, 3, 5, '#7ec7f0'); F(c, 19, 17, 3, 5, '#7ec7f0'); F(c, 8, 6, 3, 5, '#7ec7f0');
    }),

    plasticChair: () => make(14, 14, (c) => {
      F(c, 1, 0, 12, 5, '#f4f4f2'); F(c, 1, 0, 12, 1, '#ffffff');
      F(c, 2, 5, 10, 6, '#e6e6e2'); F(c, 2, 11, 2, 3, '#c9c9c4'); F(c, 10, 11, 2, 3, '#c9c9c4');
    }),

    cooler: () => make(18, 14, (c) => {
      F(c, 1, 2, 16, 12, '#2f7fd0'); F(c, 0, 0, 18, 4, '#f2f2f2'); F(c, 6, 1, 6, 1, '#c9c9c4');
      F(c, 2, 5, 1, 7, '#5aa0e6');
    }),

    cafeTable: () => make(30, 22, (c) => {
      F(c, 0, 4, 6, 8, '#9fd8cf'); F(c, 24, 4, 6, 8, '#9fd8cf'); F(c, 0, 4, 6, 1, '#c4ece5'); F(c, 24, 4, 6, 1, '#c4ece5');
      Pixel.blob(c, 15, 9, 8, '#ffffff'); Pixel.blob(c, 15, 9, 6.5, '#ffeaf2');
      F(c, 14, 17, 2, 5, '#b7c3cb');
    }),

    churrasco: () => make(26, 18, (c) => {
      Pixel.blob(c, 13, 10, 9, '#ececec'); Pixel.blob(c, 13, 10, 7, '#ffffff');
      F(c, 3, 3, 22, 1, '#9aa0a8');
      F(c, 6, 1, 4, 5, '#8c3a24'); F(c, 11, 1, 4, 5, '#a8452f'); F(c, 16, 1, 4, 5, '#7a2f1c');
      F(c, 7, 8, 7, 4, '#a8452f'); F(c, 8, 8, 5, 1, '#e9b08a'); F(c, 15, 10, 5, 3, '#d9b16a');
    }),

    sorvete: () => make(16, 26, (c) => {
      for (let j = 0; j < 12; j++) F(c, 8 - Math.floor((12 - j) / 2.2), 13 + j, Math.max(1, Math.floor((12 - j) / 1.1)), 1, j % 2 ? '#d9a35e' : '#c48c45');
      Pixel.blob(c, 8, 11, 5.5, '#ff9fc4'); Pixel.blob(c, 8, 6, 4.5, '#7a4a33'); F(c, 6, 4, 2, 1, '#a8704f');
      F(c, 7, 0, 2, 2, '#d6262f'); F(c, 5, 10, 2, 1, '#ffd0e4');
    }),

    roundTable: () => make(44, 34, (c) => {
      F(c, 20, 24, 4, 8, '#5b5468'); F(c, 14, 31, 16, 3, '#5b5468');
      Pixel.blob(c, 22, 14, 18, '#7a4a2e'); Pixel.blob(c, 22, 13, 17, '#a8703f'); Pixel.blob(c, 22, 12, 16, '#b8804c');
      Pixel.blob(c, 22, 12, 6, '#ececec'); F(c, 18, 10, 4, 3, '#a8452f'); F(c, 23, 11, 4, 3, '#8c3a24'); F(c, 19, 14, 7, 2, '#b04a2c');
      Pixel.blob(c, 10, 9, 3.5, '#ffffff'); Pixel.blob(c, 34, 9, 3.5, '#ffffff'); Pixel.blob(c, 10, 17, 3.5, '#ffffff'); Pixel.blob(c, 34, 17, 3.5, '#ffffff');
      Pixel.blob(c, 22, 4, 3, '#e8d08a'); F(c, 30, 21, 3, 4, '#7ec7f0'); F(c, 13, 21, 3, 4, '#7ec7f0');
    }),

    sorvetes: () => make(36, 30, (c) => {
      // skimo (picolé coberto de chocolate) + casquinha de chocolate
      F(c, 9, 20, 3, 10, '#e2c08a'); F(c, 9, 20, 1, 10, '#f2d8a8');
      F(c, 4, 2, 13, 19, '#4a2a1c'); F(c, 5, 2, 2, 17, '#6b3f2a'); F(c, 4, 2, 13, 2, '#5c3524');
      F(c, 13, 2, 4, 4, 'rgba(0,0,0,0)'); c.clearRect(14, 2, 3, 3); F(c, 13, 5, 1, 1, '#f6efe2'); // mordidinha
      for (let j = 0; j < 12; j++) F(c, 27 - Math.floor((12 - j) / 2.2), 17 + j, Math.max(1, Math.floor((12 - j) / 1.1)), 1, j % 2 ? '#d9a35e' : '#c48c45');
      Pixel.blob(c, 27, 14, 6, '#6b3f2a'); Pixel.blob(c, 27, 9, 4.5, '#7a4a33'); F(c, 25, 7, 2, 1, '#a8704f');
    }),

    armchair: () => make(22, 20, (c) => {
      F(c, 0, 4, 4, 14, '#8a6a4a'); F(c, 18, 4, 4, 14, '#8a6a4a');
      F(c, 2, 0, 18, 8, '#f4f2ee'); F(c, 2, 0, 18, 1, '#ffffff');
      F(c, 3, 8, 16, 9, '#ebe8e3'); F(c, 3, 8, 16, 1, '#ffffff'); F(c, 3, 16, 16, 1, '#cfcbc4');
      F(c, 2, 17, 2, 3, '#6e5238'); F(c, 18, 17, 2, 3, '#6e5238');
    }),

    dogWhite: () => make(14, 10, (c) => {
      Pixel.blob(c, 7, 6, 4.5, '#f2f0ec'); Pixel.blob(c, 11, 4, 3, '#f2f0ec');
      F(c, 12, 3, 1, 1, '#1d1b22'); F(c, 13, 5, 1, 1, '#1d1b22'); F(c, 10, 1, 2, 2, '#e3ddd3'); F(c, 1, 6, 3, 2, '#f2f0ec');
    }),

    dogDark: () => make(14, 10, (c) => {
      Pixel.blob(c, 7, 6, 4.5, '#3a2a22'); Pixel.blob(c, 11, 4, 3, '#4a3428');
      F(c, 12, 3, 1, 1, '#f2f0ec'); F(c, 11, 6, 2, 1, '#c48a5a'); F(c, 9, 1, 2, 2, '#2a1d18'); F(c, 1, 6, 3, 2, '#3a2a22');
    }),

    hammock: () => make(44, 16, (c) => {
      F(c, 0, 0, 2, 16, '#6e5238'); F(c, 42, 0, 2, 16, '#6e5238');
      for (let i = 0; i < 40; i++) {
        const yy = 3 + Math.round(Math.sin((i / 40) * Math.PI) * 7);
        F(c, 2 + i, yy, 1, 4, ['#4f9446', '#d9b04a', '#c94f3c', '#4f9446'][Math.floor(i / 5) % 4]);
      }
      F(c, 14, 12, 16, 3, '#d63a5a');
    }),

    stool: () => make(10, 14, (c) => {
      F(c, 1, 0, 8, 5, '#c9a06a'); F(c, 1, 0, 8, 1, '#e2bd88');
      F(c, 2, 5, 1, 9, '#2b2a30'); F(c, 7, 5, 1, 9, '#2b2a30'); F(c, 2, 10, 6, 1, '#2b2a30');
    }),

    diningTable: () => make(60, 30, (c) => {
      F(c, 2, 4, 56, 18, '#a8744d'); F(c, 2, 4, 56, 2, '#c08a5e'); F(c, 2, 20, 56, 2, '#7a5034');
      F(c, 5, 22, 3, 8, '#5a3a28'); F(c, 52, 22, 3, 8, '#5a3a28');
      F(c, 20, 8, 20, 9, '#d9d4cc'); F(c, 22, 10, 6, 3, '#8c3a24'); F(c, 29, 10, 8, 3, '#a8452f'); F(c, 23, 14, 13, 2, '#b04a2c');
      Pixel.blob(c, 10, 12, 4, '#ffffff'); Pixel.blob(c, 50, 12, 4, '#ffffff'); Pixel.blob(c, 44, 7, 3, '#e8d08a');
      F(c, 14, 6, 2, 5, '#7ec7f0'); F(c, 46, 15, 2, 5, '#7ec7f0');
    }),

    house: () => make(64, 60, (c, r) => {
      // casa do condomínio vista de frente, com decoração de Halloween
      F(c, 4, 24, 56, 36, '#e9dcc8'); F(c, 4, 24, 56, 2, '#f7efe2');
      for (let i = 0; i < 26; i++) F(c, 32 - i - 6, 4 + i, (i + 6) * 2 + 1, 1, i % 4 === 3 ? '#5a2f24' : '#7a3a2a');
      F(c, 26, 38, 12, 22, '#6e4a32'); F(c, 27, 39, 10, 20, '#8a5c3b'); F(c, 35, 48, 2, 2, '#e9cc6a');
      for (const wx of [10, 44]) { F(c, wx, 32, 12, 12, '#3a3440'); F(c, wx + 1, 33, 10, 10, '#ffb84a'); F(c, wx + 5, 33, 2, 10, '#3a3440'); F(c, wx + 1, 37, 10, 2, '#3a3440'); }
      // teias e fantasminha
      c.strokeStyle = 'rgba(255,255,255,0.8)'; c.lineWidth = 1;
      for (let a = 0; a < 4; a++) { c.beginPath(); c.moveTo(4, 24); c.lineTo(4 + Math.cos(a * 0.45) * 12, 24 + Math.sin(a * 0.45) * 12); c.stroke(); }
      Pixel.blob(c, 52, 20, 4, '#f6f6f2'); F(c, 48, 20, 8, 5, '#f6f6f2'); F(c, 50, 19, 1, 1, '#1d1b22'); F(c, 53, 19, 1, 1, '#1d1b22');
    }),

    pumpkin: () => make(14, 12, (c) => {
      Pixel.blob(c, 7, 7, 5.5, '#e8741c'); F(c, 4, 3, 1, 8, '#c95e12'); F(c, 9, 3, 1, 8, '#c95e12');
      F(c, 6, 0, 2, 3, '#4f7a2a');
      F(c, 4, 6, 2, 2, '#ffe28a'); F(c, 8, 6, 2, 2, '#ffe28a'); F(c, 4, 9, 6, 1, '#ffe28a');
    }),

    moto: () => make(38, 22, (c) => CharArtMoto(c, false)),
    motoCasal: () => make(38, 34, (c) => CharArtMoto(c, true)),

    candyBowl: () => make(16, 12, (c) => {
      Pixel.blob(c, 8, 7, 6.5, '#e8741c'); F(c, 1, 3, 14, 3, '#ffd86b');
      F(c, 3, 2, 2, 2, '#ff6fae'); F(c, 7, 1, 2, 2, '#7ec7f0'); F(c, 11, 2, 2, 2, '#9be3b9');
    }),

    doces: () => make(30, 22, (c) => {
      F(c, 2, 4, 9, 6, '#ff6fae'); F(c, 0, 6, 2, 2, '#ff6fae'); F(c, 11, 6, 2, 2, '#ff6fae'); F(c, 4, 5, 5, 1, '#ffd0e4');
      F(c, 16, 2, 10, 7, '#7a4a33'); F(c, 16, 2, 10, 1, '#a8704f'); F(c, 18, 4, 6, 1, '#ffd86b');
      Pixel.blob(c, 8, 16, 5, '#7ec7f0'); F(c, 13, 16, 8, 1, '#efe6dc'); Pixel.blob(c, 22, 16, 4, '#9be3b9'); F(c, 22, 8, 1, 4, '#efe6dc');
    }),

    bubbleAngry: () => make(13, 14, (c) => {
      F(c, 1, 0, 11, 11, '#ffffff'); F(c, 0, 1, 13, 9, '#ffffff');
      F(c, 5, 11, 3, 1, '#ffffff'); F(c, 6, 12, 1, 1, '#ffffff');
      // símbolo de raiva
      F(c, 3, 3, 2, 2, '#e8343c'); F(c, 8, 3, 2, 2, '#e8343c'); F(c, 3, 6, 2, 2, '#e8343c'); F(c, 8, 6, 2, 2, '#e8343c');
      F(c, 5, 4, 3, 3, '#ffffff');
    }),

    modernHouse: () => make(68, 56, (c) => {
      // casa moderna de telhado reto: bloco branco + bloco mostarda
      F(c, 2, 20, 40, 36, '#f1efea'); F(c, 2, 16, 44, 5, '#e6e3dc'); F(c, 2, 16, 44, 1, '#ffffff');
      F(c, 40, 6, 26, 50, '#d8a548'); F(c, 40, 4, 28, 3, '#c49236');
      F(c, 44, 12, 18, 10, '#c9d6e3'); F(c, 44, 20, 18, 2, '#efede9'); F(c, 45, 13, 6, 2, '#e6f0f8');   // sacada de vidro
      F(c, 8, 28, 14, 24, '#3a3f4a'); F(c, 9, 29, 12, 22, '#9fb4c8'); F(c, 14, 29, 1, 22, '#3a3f4a'); // janelão
      F(c, 28, 30, 8, 26, '#b07a4c'); F(c, 29, 31, 6, 24, '#c48a5a'); F(c, 34, 42, 1, 2, '#2b2a30'); // porta de madeira
      F(c, 44, 34, 18, 22, '#6b6f78'); for (let i = 36; i < 56; i += 3) F(c, 44, i, 18, 1, '#5a5e67');  // garagem
      F(c, 0, 54, 68, 2, '#c9c5bd');
    }),

    modernHouse2: () => make(68, 56, (c) => {
      F(c, 4, 14, 60, 42, '#ece4d6'); F(c, 2, 10, 64, 5, '#d9d3c7'); F(c, 2, 10, 64, 1, '#ffffff');
      F(c, 8, 22, 22, 14, '#3a3f4a'); F(c, 9, 23, 20, 12, '#9fb4c8'); F(c, 19, 23, 1, 12, '#3a3f4a');
      F(c, 38, 24, 10, 32, '#8a6a4a'); F(c, 39, 25, 8, 30, '#a07a52');
      F(c, 52, 22, 8, 10, '#9fb4c8');
      F(c, 4, 40, 30, 4, '#b8b2a6');
      F(c, 0, 54, 68, 2, '#c9c5bd');
    }),

    concretePole: () => make(16, 52, (c) => {
      F(c, 7, 6, 3, 46, '#a9a6a0'); F(c, 7, 6, 1, 46, '#c9c6c0');
      F(c, 9, 6, 7, 2, '#8f8c86'); F(c, 13, 7, 3, 2, '#e9e6c8');
      F(c, 2, 12, 12, 1, '#5a5866'); F(c, 0, 14, 16, 1, '#5a5866');
    }),

    construction: () => make(52, 34, (c) => {
      for (let j = 0; j < 30; j += 4) for (let i = (j / 4) % 2 ? 0 : 4; i < 48; i += 8) F(c, 2 + i, 4 + j, 7, 3, '#c0533f');
      F(c, 2, 4, 48, 30, 'rgba(0,0,0,0)');
      for (let j = 0; j < 30; j += 4) F(c, 2, 7 + j, 48, 1, '#d9c9b8');
      F(c, 18, 14, 10, 20, '#5a4a40'); F(c, 34, 12, 8, 8, '#5a4a40');
      F(c, 2, 2, 48, 2, '#9a958f');
    }),

    picnicTable: () => make(56, 30, (c) => {
      // mesa de concreto revestida de madeira, com o piquenique em cima
      F(c, 6, 20, 8, 10, '#9a968f'); F(c, 42, 20, 8, 10, '#9a968f'); F(c, 6, 20, 1, 10, '#b9b5ae');
      F(c, 1, 6, 54, 15, '#8a5a3b');
      for (let j = 6; j < 21; j += 4) { F(c, 1, j, 54, 1, '#6e4630'); F(c, 1, j + 1, 54, 1, '#a8744d'); }
      F(c, 1, 19, 54, 2, '#5a3a28');
      // piquenique: cesta, frutas, sanduíches, suco e bolo
      F(c, 6, 2, 12, 8, '#c49a5c'); F(c, 6, 2, 12, 1, '#e2bd88'); F(c, 8, 0, 8, 2, '#8a5a3b'); F(c, 6, 5, 12, 1, '#a87c42');
      Pixel.blob(c, 24, 9, 2.5, '#d6262f'); Pixel.blob(c, 28, 9, 2.5, '#5aa64d'); Pixel.blob(c, 26, 7, 2.2, '#ffd86b');
      F(c, 32, 8, 7, 4, '#f2e2b0'); F(c, 32, 10, 7, 1, '#7a4a33'); F(c, 33, 9, 5, 1, '#5aa64d');
      F(c, 42, 4, 3, 7, '#ff9a3c'); F(c, 42, 4, 3, 1, '#ffffff');
      F(c, 46, 7, 7, 5, '#ffd3e4'); F(c, 46, 7, 7, 1, '#ffffff'); F(c, 49, 5, 1, 2, '#ffd86b');
    }),

    picnicBench: () => make(56, 12, (c) => {
      F(c, 6, 6, 6, 6, '#9a968f'); F(c, 44, 6, 6, 6, '#9a968f');
      F(c, 2, 0, 52, 7, '#8a5a3b'); F(c, 2, 0, 52, 1, '#a8744d'); F(c, 2, 3, 52, 1, '#6e4630'); F(c, 2, 6, 52, 1, '#5a3a28');
    }),

    picnicBlanket: () => make(40, 26, (c) => {
      for (let j = 0; j < 26; j += 4) for (let i = 0; i < 40; i += 4) F(c, i, j, 4, 4, ((i + j) / 4) % 2 ? '#d6263f' : '#fff4f4');
      F(c, 4, 4, 10, 8, '#c49a5c'); F(c, 4, 4, 10, 1, '#e2bd88'); F(c, 6, 2, 6, 2, '#8a5a3b');
      Pixel.blob(c, 26, 14, 3, '#ffffff'); Pixel.blob(c, 34, 18, 3, '#ffffff'); F(c, 25, 13, 2, 2, '#d6262f');
    }, false),

    ring: () => make(26, 24, (c) => {
      Pixel.blob(c, 13, 15, 8.5, '#e8b64a'); Pixel.blob(c, 13, 15, 6, 'rgba(0,0,0,0)');
      c.globalCompositeOperation = 'destination-out'; Pixel.blob(c, 13, 15, 6, '#000'); c.globalCompositeOperation = 'source-over';
      F(c, 6, 11, 2, 3, '#ffe28a'); F(c, 18, 19, 2, 1, '#b8862a');
      F(c, 10, 3, 6, 4, '#e8f6ff'); F(c, 11, 2, 4, 1, '#ffffff'); F(c, 12, 7, 2, 1, '#b8d8ee'); F(c, 11, 3, 1, 1, '#ffffff');
      F(c, 2, 2, 1, 3, '#ffffff'); F(c, 1, 3, 3, 1, '#ffffff'); F(c, 22, 5, 1, 3, '#ffffff'); F(c, 21, 6, 3, 1, '#ffffff');
    }),

    heart: () => make(9, 8, (c) => {
      Pixel.heart(c, 1, 1, '#ff5fa2');
      F(c, 2, 2, 1, 1, '#ffd0e4');
    }),

    bubble: () => make(13, 14, (c) => {
      F(c, 1, 0, 11, 11, '#ffffff'); F(c, 0, 1, 13, 9, '#ffffff');
      F(c, 5, 11, 3, 1, '#ffffff'); F(c, 6, 12, 1, 1, '#ffffff');
      F(c, 6, 2, 1, 5, '#ff4f98'); F(c, 5, 3, 3, 3, '#ff4f98'); F(c, 6, 8, 1, 1, '#ff4f98'); F(c, 5, 8, 3, 1, '#ff4f98');
    }),

    bubbleHeart: () => make(13, 14, (c) => {
      F(c, 1, 0, 11, 11, '#ffffff'); F(c, 0, 1, 13, 9, '#ffffff');
      F(c, 5, 11, 3, 1, '#ffffff'); F(c, 6, 12, 1, 1, '#ffffff');
      Pixel.heart(c, 3, 2, '#ff4f98'); F(c, 4, 3, 1, 1, '#ffc2dc');
    }),

    shadow: () => make(12, 5, (c) => {
      c.fillStyle = 'rgba(40,18,52,0.32)';
      c.fillRect(2, 0, 8, 5); c.fillRect(0, 1, 12, 3);
    }, false),

    sparkle: () => make(5, 5, (c) => {
      F(c, 2, 0, 1, 5, '#ffffff'); F(c, 0, 2, 5, 1, '#ffffff');
    }, false),

    pixel: () => make(2, 2, (c) => F(c, 0, 0, 2, 2, '#ffffff'), false),

    moon: () => make(28, 28, (c) => {
      B(c, 14, 14, 12, '#fff1d6'); B(c, 18, 11, 10, 'rgba(0,0,0,0)');
      c.globalCompositeOperation = 'destination-out'; B(c, 19, 10, 10, '#000'); c.globalCompositeOperation = 'source-over';
    }),

    bigHeart: () => make(30, 27, (c) => {
      const rows = ['....######.....######....', '..##########.##########..', '.########################', '#########################', '#########################', '#########################', '.#######################.', '..#####################..', '...###################...', '.....###############.....', '.......###########.......', '.........#######.........', '...........###...........', '............#............'];
      rows.forEach((row, y) => [...row].forEach((ch, x) => { if (ch === '#') F(c, x + 2, y * 1.8 | 0, 1, 2, '#ff5fa2'); }));
      F(c, 6, 3, 4, 2, '#ffc2dc'); F(c, 5, 5, 2, 3, '#ffc2dc');
    }),
  };
})();
