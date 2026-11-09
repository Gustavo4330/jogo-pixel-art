/* =========================================================
   MAPA: SORVETERIA (Fase 4 — parte 2)
   ---------------------------------------------------------
   Sorveteria em tons pastel: parede listrada, cardápio de
   giz, freezer com os potes de sorvete coloridos, balcão
   listrado, piso xadrez e mesinhas redondas.
   ========================================================= */

MAPAS.sorveteria = {
  id: 'sorveteria',
  fase: 4,
  nome: 'Sorveteria',

  legenda: {
    w: { tile: 'parede_sorveteria', solido: true },
    Q: { tile: 'cardapio', solido: true, texto: 'O cardápio: chocolate, morango, flocos, ninho, pistache... difícil escolher!' },
    F: { tile: 'freezer', solido: true, texto: 'Um monte de sabores coloridos no freezer.' },
    f: { tile: 'balcao', solido: true },
    x: { tile: 'piso_xadrez' },
    B: { tile: 'muro', solido: true },
    P: { tile: 'porta_loja', solido: true },
  },

  chao: [
    'wwwwwwwwwwwwwwwwwwww', // 0
    'wwwwQQQQwwwwQQQQwwww', // 1  cardápios
    'wwwwwwwwwwwwwwwwwwww', // 2
    'xxFFFFFFFFFFFFxxxxxx', // 3  freezer
    'xxffffffffffffxxxxxx', // 4  balcão
    'xxxxxxxxxxxxxxxxxxxx', // 5
    'xxxxxxxxxxxxxxxxxxxx', // 6
    'xxxxxxxxxxxxxxxxxxxx', // 7
    'xxxxxxxxxxxxxxxxxxxx', // 8
    'xxxxxxxxxxxxxxxxxxxx', // 9
    'xxxxxxxxxxxxxxxxxxxx', // 10
    'xxxxxxxxxxxxxxxxxxxx', // 11
    'BBBBBBBBPPBBBBBBBBBB', // 12 porta
  ],

  spawns: {
    entrada: { x: 9, y: 11.6, dir: 'up' },
  },

  objetos: [
    { tipo: 'mesinha', x: 4, y: 8.6 },
    { tipo: 'mesinha', x: 16, y: 7.6 },
    { tipo: 'mesinha', x: 15, y: 11.2 },
    { tipo: 'vaso', x: 18.6, y: 4.2 },
  ],

  npcs: [
    { id: 'ele', x: 8.5, y: 5.8, dir: 'up', roteiro: 'f4_sorvete', destaque: true },
  ],

  bonus: [],

  objetivos: [
    { seNao: 'fase4_concluida', texto: 'Escolha um sorvete com o seu amor', alvo: { npc: 'ele' } },
  ],
};
