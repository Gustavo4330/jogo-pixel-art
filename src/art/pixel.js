/* =========================================================
   PIXEL — ferramentas básicas para desenhar pixel art no código.

   Todo o visual do jogo (personagens, cenários, objetos) é
   desenhado aqui, pixel por pixel, em <canvas>. Assim o jogo
   não depende de imagens externas e funciona até offline.

   Se no futuro você quiser trocar algum desenho por um PNG
   feito à mão, é só carregar a imagem com o mesmo nome de
   textura (veja o README).
   ========================================================= */

const Pixel = {
  /** Cria um <canvas> com suavização desligada (pixels nítidos). */
  canvas(w, h) {
    const c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    const ctx = c.getContext('2d', { willReadFrequently: true });
    ctx.imageSmoothingEnabled = false;
    return { c, ctx };
  },

  /** Grade de pixels (matriz de cores) usada para os personagens. */
  grid(w, h) {
    const g = [];
    for (let y = 0; y < h; y++) g.push(new Array(w).fill(null));
    g.w = w;
    g.h = h;
    return g;
  },

  /** Retorna funções P (pixel) e R (retângulo) para pintar numa grade. */
  painter(g) {
    const P = (x, y, c) => {
      x |= 0; y |= 0;
      if (c && x >= 0 && y >= 0 && x < g.w && y < g.h) g[y][x] = c;
    };
    const R = (x, y, w, h, c) => {
      for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) P(x + i, y + j, c);
    };
    return { P, R };
  },

  /** Adiciona contorno escuro em volta do desenho (estilo jogo indie). */
  outline(g, color) {
    const out = Pixel.grid(g.w, g.h);
    for (let y = 0; y < g.h; y++) {
      for (let x = 0; x < g.w; x++) {
        if (g[y][x]) { out[y][x] = g[y][x]; continue; }
        const n = (xx, yy) => xx >= 0 && yy >= 0 && xx < g.w && yy < g.h && g[yy][xx];
        if (n(x - 1, y) || n(x + 1, y) || n(x, y - 1) || n(x, y + 1)) out[y][x] = color;
      }
    }
    return out;
  },

  /** Espelha a grade na horizontal (usado para "olhar para a direita"). */
  mirror(g) {
    const out = Pixel.grid(g.w, g.h);
    for (let y = 0; y < g.h; y++) for (let x = 0; x < g.w; x++) out[y][g.w - 1 - x] = g[y][x];
    return out;
  },

  /** Desenha uma grade num contexto de canvas. */
  drawGrid(ctx, g, ox, oy, scale = 1) {
    for (let y = 0; y < g.h; y++) {
      for (let x = 0; x < g.w; x++) {
        if (!g[y][x]) continue;
        ctx.fillStyle = g[y][x];
        ctx.fillRect(ox + x * scale, oy + y * scale, scale, scale);
      }
    }
  },

  /** Contorno aplicado diretamente num canvas (para objetos). */
  outlineCanvas(c, color = '#2a1730') {
    const ctx = c.getContext('2d');
    const img = ctx.getImageData(0, 0, c.width, c.height);
    const d = img.data;
    const W = c.width, H = c.height;
    const solid = (x, y) => x >= 0 && y >= 0 && x < W && y < H && d[(y * W + x) * 4 + 3] > 40;
    const marks = [];
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        if (solid(x, y)) continue;
        if (solid(x - 1, y) || solid(x + 1, y) || solid(x, y - 1) || solid(x, y + 1)) marks.push([x, y]);
      }
    }
    ctx.fillStyle = color;
    for (const [x, y] of marks) ctx.fillRect(x, y, 1, 1);
  },

  /** Retângulo cheio (atalho). */
  F(ctx, x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
  },

  /** Círculo "pixelado" cheio. */
  blob(ctx, cx, cy, r, color) {
    ctx.fillStyle = color;
    for (let y = Math.floor(cy - r); y <= Math.ceil(cy + r); y++) {
      for (let x = Math.floor(cx - r); x <= Math.ceil(cx + r); x++) {
        const dx = x + 0.5 - cx, dy = y + 0.5 - cy;
        if (dx * dx + dy * dy <= r * r) ctx.fillRect(x, y, 1, 1);
      }
    }
  },

  /** Pequeno coração de 7x6 pixels. */
  heart(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x + 1, y, 2, 1);
    ctx.fillRect(x + 4, y, 2, 1);
    ctx.fillRect(x, y + 1, 7, 2);
    ctx.fillRect(x + 1, y + 3, 5, 1);
    ctx.fillRect(x + 2, y + 4, 3, 1);
    ctx.fillRect(x + 3, y + 5, 1, 1);
  },

  /** Gerador de números aleatórios com semente (sempre o mesmo resultado). */
  rng(seed) {
    let a = seed >>> 0;
    return function () {
      a |= 0; a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  },

  pick(arr, r) {
    return arr[Math.floor(r() * arr.length) % arr.length];
  },

  /** Clareia (amt > 0) ou escurece (amt < 0) uma cor hexadecimal. */
  shade(hex, amt) {
    const n = parseInt(hex.slice(1), 16);
    let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    const f = (v) => {
      const out = amt >= 0 ? v + (255 - v) * amt : v * (1 + amt);
      return Math.max(0, Math.min(255, Math.round(out)));
    };
    r = f(r); g = f(g); b = f(b);
    return '#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
  },
};
