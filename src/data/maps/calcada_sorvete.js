/* =========================================================
   MAPA: CALÇADA EM FRENTE À SORVETERIA (Fase 4 — parte 3)
   ---------------------------------------------------------
   À noite, na rua: a fachada roxa da sorveteria com a
   vitrine acesa, a calçada e o meio-fio onde os dois
   sentam para tomar o sorvete — ela no colo dele.
   ========================================================= */

MAPAS.calcada_sorvete = {
  id: 'calcada_sorvete',
  fase: 4,
  nome: 'Calçada da sorveteria',
  luz: 'noite',

  legenda: {
    P: { tile: 'fachada_roxa', solido: true },
    S: { tile: 'placa_cone', solido: true },
    V: { tile: 'vitrine_acesa', solido: true },
    D: { tile: 'vitrine_acesa', solido: true },
    s: { tile: 'calcada' },
    '=': { tile: 'meio_fio' },
    '#': { tile: 'rua', solido: true },
    '-': { tile: 'faixa_rua', solido: true },
  },

  chao: [
    'PPPPPPPSSPPPPPPPPPPP', // 0
    'VVVVVVVVDDVVVVVVVVVV', // 1
    'VVVVVVVVDDVVVVVVVVVV', // 2
    'ssssssssssssssssssss', // 3
    'ssssssssssssssssssss', // 4
    '====================', // 5
    '####################', // 6
    '--------------------', // 7
    '####################', // 8
  ],

  // ela já começa sentada no colo dele (veja o passo "colo" no roteiro)
  spawns: {
    inicio: { x: 10.25, y: 5.55, dir: 'down' },
  },

  objetos: [
    { tipo: 'poste', x: 4, y: 4.6 },
    { tipo: 'poste', x: 16, y: 4.6 },
    { tipo: 'muda', x: 7, y: 4.4 },
  ],

  npcs: [
    { id: 'ele', x: 10, y: 5.75, dir: 'down' },
  ],

  bonus: [],

  aoEntrar: { roteiro: 'f4_calcada', flag: 'f4_calcada' },
};
