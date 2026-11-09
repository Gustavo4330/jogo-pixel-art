/* =========================================================
   MAPA: FRENTE DA ESCOLA (Fase 1 — parte 1)
   ---------------------------------------------------------
   Como ler o mapa:
   - Cada letra é um quadradinho de 16x16 pixels ("tile").
   - A "legenda" diz qual desenho cada letra usa e se é sólida
     (parede) ou se dá para andar por cima.
   - Posições (x, y) são em tiles. Pode usar decimais:
     x: 17 = exatamente entre a coluna 16 e a coluna 17.

   Baseado na foto da fachada: prédio comprido de concreto,
   telhado metálico curvo, aletas vermelhas e azuis com
   janelinhas redondas, térreo aberto sobre pilares (pilotis),
   faixa pendurada, prédio de tijolos ao lado e gramado
   com caminhos de cascalho na frente.
   ========================================================= */

MAPAS.escola_fachada = {
  id: 'escola_fachada',
  fase: 1,
  nome: 'Frente da escola',

  legenda: {
    t: { tile: 'tijolo_topo', solido: true },
    r: { tile: 'tijolo', solido: true },
    j: { tile: 'tijolo_janela', solido: true, texto: 'O prédio de tijolinhos ao lado. Lá dentro ficam outros blocos da escola.' },
    M: { tile: 'telhado_metal', solido: true },
    C: { tile: 'parapeito', solido: true },
    A: { tile: 'aleta', solido: true },
    V: { tile: 'viga_concreto', solido: true },
    P: { tile: 'pilotis', solido: true, texto: 'O térreo é aberto, sustentado por pilares. A entrada para o corredor fica no meio do prédio.' },
    D: { tile: 'entrada', solido: true },
    d: { tile: 'entrada', porta: { para: 'escola_corredor', spawn: 'entrada' } },
    N: { tile: 'faixa_banner', solido: true, texto: 'Uma faixa pendurada entre os pilares, com as cores da escola.' },
    s: { tile: 'calcada_concreto' },
    g: { tile: 'grama' },
    p: { tile: 'cascalho' },
    ',': { tile: 'calcada' },
    '=': { tile: 'meio_fio' },
    '#': { tile: 'rua', solido: true },
    '-': { tile: 'faixa_rua', solido: true },
  },

  chao: [
    'ttttMMMMMMMMMMMMMMMMMMMMMMMMMM', // 0
    'rjjrCCCCCCCCCCCCCCCCCCCCCCCCCC', // 1
    'rjjrAAAAAAAAAAAAAAAAAAAAAAAAAA', // 2
    'rrrrAAAAAAAAAAAAAAAAAAAAAAAAAA', // 3
    'rjjrVVVVVVVVVVVVVVVVVVVVVVVVVV', // 4
    'rjjrPPPPPPPPPPPPDDPPPPPPPPPPPP', // 5
    'rrrrPPPPPPPPPPPPddPPNNPPPPPPPP', // 6
    'ssssssssssssssssssssssssssssss', // 7
    'ggggggggggggggggppgggggggggggg', // 8
    'ggggggggggggggggppgggggggggggg', // 9
    'ggggggggggggggggppgggggggggggg', // 10
    'ggggggggggggggggppgggggggggggg', // 11
    'ggggggggggggggggppgggggggggggg', // 12
    'gggggppppppppppppppppppppppppg', // 13
    'ggggggggggggggggppgggggggggggg', // 14
    'ggggggggggggggggppgggggggggggg', // 15
    'ggggggggggggggggppgggggggggggg', // 16
    'ggggggggggggggggppgggggggggggg', // 17
    'ggggggggggggggggppgggggggggggg', // 18
    'ggggggggggggggggppgggggggggggg', // 19
    ',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,', // 20
    ',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,', // 21
    '==============================', // 22
    '##############################', // 23
    '------------------------------', // 24
    '##############################', // 25
  ],

  // Onde a personagem aparece
  spawns: {
    inicio: { x: 17, y: 21.6, dir: 'up' },
    saida: { x: 17, y: 7.8, dir: 'down' },
  },

  objetos: [
    { tipo: 'poste', x: 15.4, y: 10.5 },
    { tipo: 'poste', x: 18.6, y: 16.5 },
    { tipo: 'muda', x: 11, y: 10.5, texto: 'Uma arvorezinha nova, presa numa estaca. Um dia vai fazer muita sombra aqui.' },
    { tipo: 'muda', x: 23, y: 10.5 },
    { tipo: 'muda', x: 9, y: 17 },
    { tipo: 'muda', x: 25, y: 17 },
    { tipo: 'arvore', x: 2.2, y: 12 },
    { tipo: 'arvore', x: 28, y: 18 },
  ],

  npcs: [],

  // Estrelinhas de memória bônus (veja src/data/bonus.js)
  bonus: [
    { id: 'aniversario', x: 1.2, y: 11.6 },
  ],

  // Dicas: o primeiro objetivo cuja flag ainda não aconteceu aparece
  // na tela, e a setinha rosa aponta para o alvo.
  objetivos: [
    { seNao: 'fase1_concluida', texto: 'Entre no prédio pela passagem do meio, entre os pilares', alvo: { x: 17, y: 6.5 } },
  ],

  // Roteiro que roda ao entrar no mapa (uma única vez)
  aoEntrar: { roteiro: 'f1_intro', flag: 'f1_intro' },
};
