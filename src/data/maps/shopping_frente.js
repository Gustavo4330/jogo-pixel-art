/* =========================================================
   MAPA: FRENTE DO SHOPPING (Fase 3 — parte 1)
   ---------------------------------------------------------
   Baseado na foto: fachada de tijolinhos com frontão
   triangular e o logo redondo, painel/outdoor grande no meio,
   painéis cinza nas laterais, marquise branca sobre a
   entrada, pilares de tijolo, vitrine de vidro à esquerda e
   uma lanchonete vermelha à direita. Calçada na frente.
   ========================================================= */

MAPAS.shopping_frente = {
  id: 'shopping_frente',
  fase: 3,
  nome: 'Frente do shopping',

  legenda: {
    k: { tile: 'ceu', solido: true },
    g: { tile: 'frontao', solido: true },
    l: { tile: 'logo_shop', solido: true },
    n: { tile: 'tijolo_shop', solido: true },
    b: { tile: 'tijolo_shop', solido: true },
    p: { tile: 'painel_cinza', solido: true },
    Q: { tile: 'outdoor', solido: true, texto: 'O painel enorme da fachada, cheio de propagandas.' },
    m: { tile: 'marquise', solido: true },
    I: { tile: 'pilar_tijolo', solido: true },
    v: { tile: 'entrada_shop', solido: true, texto: 'A entrada do shopping. Lá dentro fica o cinema!' },
    K: { tile: 'vitrine', solido: true, texto: 'Uma vitrine cheia de doces coloridos.' },
    R: { tile: 'lanchonete', solido: true, texto: 'A lanchonete da entrada. Cheirinho de batata frita...' },
    h: { tile: 'piso_entrada' },
    s: { tile: 'calcada' },
    '=': { tile: 'meio_fio' },
    '#': { tile: 'rua', solido: true },
    '-': { tile: 'faixa_rua', solido: true },
  },

  chao: [
    'kkkkkkkkkggggggggggggkkkkkkkkk', // 0  céu + frontão
    'nnnnnnnnnggggggggggggnnnnnnnnn', // 1
    'bbbbbbbbbgggggllgggggbbbbbbbbb', // 2  logo redondo
    'bbppppppbQQQQQQQQQQQQbppppppbb', // 3  painel grande
    'bbppppppbQQQQQQQQQQQQbppppppbb', // 4
    'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbb', // 5
    'bbbbbbbmmmmmmmmmmmmmmbbbbbbbbb', // 6  marquise
    'KKKKKKbIvvvvvvvvvvvvIbRRRRRbbb', // 7  vitrine | entrada | lanchonete
    'KKKKKKbIvvvvvvvvvvvvIbRRRRRbbb', // 8
    'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhh', // 9
    'ssssssssssssssssssssssssssssss', // 10
    'ssssssssssssssssssssssssssssss', // 11
    'ssssssssssssssssssssssssssssss', // 12
    'ssssssssssssssssssssssssssssss', // 13
    'ssssssssssssssssssssssssssssss', // 14
    'ssssssssssssssssssssssssssssss', // 15
    'ssssssssssssssssssssssssssssss', // 16
    '==============================', // 17
    '##############################', // 18
    '------------------------------', // 19
    '##############################', // 20
  ],

  spawns: {
    inicio: { x: 15, y: 16.6, dir: 'up' },
  },

  objetos: [
    { tipo: 'poste', x: 4, y: 15.6 },
    { tipo: 'poste', x: 26, y: 15.6 },
    { tipo: 'muda', x: 8, y: 12 },
    { tipo: 'muda', x: 22, y: 12 },
  ],

  npcs: [
    { id: 'ele', x: 15, y: 9.9, dir: 'down', roteiro: 'f3_encontro', destaque: true },
  ],

  bonus: [],

  objetivos: [
    { seNao: 'fase3_concluida', texto: 'Encontre o seu baby na entrada do shopping', alvo: { npc: 'ele' } },
  ],

  aoEntrar: { roteiro: 'f3_intro', flag: 'f3_intro' },
};
