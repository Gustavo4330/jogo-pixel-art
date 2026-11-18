/* =========================================================
   MAPA: O PIQUENIQUE DO PEDIDO (Fase 6 — fase final)
   ---------------------------------------------------------
   Gramado com a mesa de concreto revestida de madeira onde
   os dois sentam, piquenique, árvores à direita, quadra de
   futsal no canto superior esquerdo e escadas à esquerda.
   ========================================================= */

MAPAS.piquenique = {
  id: 'piquenique',
  fase: 6,
  nome: 'O piquenique',

  legenda: {
    Q: { tile: 'quadra', solido: true, texto: 'A quadra de futsal.' },
    A: { tile: 'alambrado', solido: true },
    E: { tile: 'escada_lateral' },
    c: { tile: 'caminho_cimento' },
    g: { tile: 'grama' },
  },

  chao: [
    'QQQQQQQQQAgggggggggggg', // 0
    'QQQQQQQQQAgggggggggggg', // 1
    'QQQQQQQQQAgggggggggggg', // 2
    'QQQQQQQQQAgggggggggggg', // 3
    'QQQQQQQQQAgggggggggggg', // 4
    'QQQQQQQQQAgggggggggggg', // 5
    'AAAAAAAAAAgggggggggggg', // 6
    'EEgggggggggggggggggggg', // 7
    'EEgggggggggggggggggggg', // 8
    'EEgggggggggggggggggggg', // 9
    'EEgggggggggggggggggggg', // 10
    'EEgggggggggggggggggggg', // 11
    'EEccccccccgggggggggggg', // 12
    'EEgggggggggggggggggggg', // 13
  ],

  spawns: {
    inicio: { x: 1.2, y: 12.6, dir: 'right' }, // chegando pelas escadas
  },

  objetos: [
    { tipo: 'banco_piquenique', x: 11.5, y: 8.2 },
    { tipo: 'mesa_piquenique', x: 11.5, y: 10, texto: 'A mesa de concreto com madeira, cheia de coisas gostosas.' },
    { tipo: 'toalha', x: 16, y: 11.6, texto: 'A toalha xadrez do piquenique.' },
    { tipo: 'arvore', x: 19.5, y: 3.5 },
    { tipo: 'arvore', x: 21, y: 6.5 },
    { tipo: 'arvore', x: 18.6, y: 9 },
    { tipo: 'arvore', x: 21, y: 12 },
    { tipo: 'arvore', x: 19, y: 14.2 },
    { tipo: 'muda', x: 13, y: 4 },
  ],

  npcs: [
    { id: 'ele', x: 10.7, y: 8.6, dir: 'down', sentado: true, destaque: true },
  ],

  // Quando ela chega na frente da mesa, a cena começa
  gatilhos: [
    { x: 11.5, y: 10.9, raio: 30, roteiro: 'f6_pedido', flag: 'f6_sentou' },
  ],

  bonus: [],

  objetivos: [
    { seNao: 'f6_sentou', texto: 'Vá até a mesa do piquenique encontrar o seu amor', alvo: { x: 11.5, y: 10.6 } },
  ],

  aoEntrar: { roteiro: 'f6_intro', flag: 'f6_intro' },
};
