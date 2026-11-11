/* =========================================================
   MAPA: CALÇADA (Fase 4 — parte 3)
   ---------------------------------------------------------
   De dia, na rua: uma calçada com uma floresta atrás.
   Os dois sentam no meio-fio para tomar o sorvete — ela no
   colo dele — e o sorvete de chocolate cai no shorts dela.
   ========================================================= */

MAPAS.calcada_sorvete = {
  id: 'calcada_sorvete',
  fase: 4,
  nome: 'Calçada',

  legenda: {
    Y: { tile: 'floresta', solido: true },
    y: { tile: 'floresta_borda', solido: true },
    g: { tile: 'grama' },
    s: { tile: 'calcada' },
    '=': { tile: 'meio_fio' },
    '#': { tile: 'rua', solido: true },
    '-': { tile: 'faixa_rua', solido: true },
  },

  chao: [
    'YYYYYYYYYYYYYYYYYYYY', // 0
    'YYYYYYYYYYYYYYYYYYYY', // 1
    'YYYYYYYYYYYYYYYYYYYY', // 2
    'yyyyyyyyyyyyyyyyyyyy', // 3
    'gggggggggggggggggggg', // 4
    'ssssssssssssssssssss', // 5
    '====================', // 6
    '####################', // 7
    '--------------------', // 8
    '####################', // 9
  ],

  // ela já começa sentada no colo dele (veja o passo "colo" no roteiro)
  spawns: {
    inicio: { x: 10.25, y: 6.6, dir: 'down' },
  },

  objetos: [
    { tipo: 'poste', x: 4, y: 5.8 },
    { tipo: 'poste', x: 16, y: 5.8 },
  ],

  npcs: [
    { id: 'ele', x: 10, y: 6.8, dir: 'down' },
  ],

  bonus: [],

  aoEntrar: { roteiro: 'f4_calcada', flag: 'f4_calcada' },
};
