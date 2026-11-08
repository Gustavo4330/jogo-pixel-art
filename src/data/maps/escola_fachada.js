/* =========================================================
   MAPA: FRENTE DA ESCOLA (Fase 1 — parte 1)
   ---------------------------------------------------------
   Como ler o mapa:
   - Cada letra é um quadradinho de 16x16 pixels ("tile").
   - A "legenda" diz qual desenho cada letra usa e se é sólida
     (parede) ou se dá para andar por cima.
   - Posições (x, y) são em tiles. Pode usar decimais:
     x: 15 = exatamente entre a coluna 14 e a coluna 15.

   Inspirado na fachada: prédio claro, faixas verticais rosa e
   amarelas, janelas redondas, entrada de vidro no centro,
   pátio com árvores, canteiros e bancos.
   ========================================================= */

MAPAS.escola_fachada = {
  id: 'escola_fachada',
  fase: 1,
  nome: 'Frente da escola',

  legenda: {
    R: { tile: 'telhado', solido: true },
    U: { tile: 'fachada', solido: true },
    P: { tile: 'faixa_rosa', solido: true },
    Y: { tile: 'faixa_amarela', solido: true },
    O: { tile: 'janela_redonda', solido: true },
    G: { tile: 'vidro', solido: true },
    B: { tile: 'viga', solido: true },
    I: { tile: 'pilar', solido: true },
    W: { tile: 'janela_baixa', solido: true, texto: 'Dá para ver as salas de aula pelo vidro. Tudo parece tão familiar...' },
    D: { tile: 'porta_vidro', solido: true },
    d: { tile: 'porta_vidro', porta: { para: 'escola_corredor', spawn: 'entrada' } },
    _: { tile: 'base_predio', solido: true },
    s: { tile: 'degrau' },
    '.': { tile: 'piso_patio' },
    g: { tile: 'grama' },
    h: { tile: 'cerca_viva', solido: true },
    ',': { tile: 'calcada' },
    '=': { tile: 'meio_fio' },
    '#': { tile: 'rua', solido: true },
    '-': { tile: 'faixa_rua', solido: true },
  },

  chao: [
    'RRRRRRRRRRRRRRRRRRRRRRRRRRRRRR', // 0
    'UPUYUPUYUPUYUGGGGUYUPUYUPUYUPU', // 1
    'UPOYUPOYUPOYUGGGGUYOPUYOPUYOPU', // 2
    'BBBBBBBBBBBBBGGGGBBBBBBBBBBBBB', // 3
    'IWWWIWWWIWWWIWDDWIWWWIWWWIWWWI', // 4
    'IWWWIWWWIWWWIWddWIWWWIWWWIWWWI', // 5
    '______________ss______________', // 6
    'gggg......................gggg', // 7
    'gggg......................gggg', // 8
    'hhhh......................hhhh', // 9
    '..............................', // 10
    '..............................', // 11
    '..............................', // 12
    '..............................', // 13
    '..............................', // 14
    '..............................', // 15
    '..............................', // 16
    '..............................', // 17
    'hhhhhhhhhh..........hhhhhhhhhh', // 18
    'gggggggggg..........gggggggggg', // 19
    ',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,', // 20
    ',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,', // 21
    '==============================', // 22
    '##############################', // 23
    '------------------------------', // 24
    '##############################', // 25
  ],

  // Onde a personagem aparece
  spawns: {
    inicio: { x: 15, y: 21.6, dir: 'up' },
    saida: { x: 15, y: 7.7, dir: 'down' },
  },

  objetos: [
    { tipo: 'cerejeira', x: 2.4, y: 9 },
    { tipo: 'arvore', x: 27.6, y: 9 },
    { tipo: 'canteiro', x: 6, y: 8, texto: 'Um canteiro cheio de florzinhas. ♥' },
    { tipo: 'canteiro', x: 24, y: 8 },
    { tipo: 'lixeira', x: 11.5, y: 7.6 },
    { tipo: 'banco', x: 6.5, y: 12.4, texto: 'Um banco do pátio. Quantas conversas já aconteceram aqui?' },
    { tipo: 'banco', x: 6.5, y: 15.4 },
    { tipo: 'canteiro_arvore', x: 21.5, y: 14.6, texto: 'A árvore do pátio. A sombra dela era o lugar preferido de todo mundo no intervalo.' },
    { tipo: 'banco', x: 25.5, y: 10.6 },
    { tipo: 'poste', x: 10.5, y: 17.8 },
    { tipo: 'poste', x: 19.5, y: 17.8 },
    { tipo: 'placa', x: 12.6, y: 17.6, texto: 'ESCOLA — "Onde tudo começou." ♥' },
  ],

  // Personagens no mapa
  npcs: [
    { id: 'aluno1', x: 9, y: 11, dir: 'right', roteiro: 'f1_colega_patio', passear: true },
    { id: 'aluna1', x: 24, y: 17, dir: 'left', roteiro: 'f1_colega_polo', passear: true },
    { id: 'aluno2', x: 18.5, y: 8.4, dir: 'down', roteiro: 'f1_colega_porta' },
  ],

  // Estrelinhas de memória bônus (veja src/data/bonus.js)
  bonus: [
    { id: 'aniversario', x: 1, y: 7.9 },
  ],

  // Roteiro que roda ao entrar no mapa (uma única vez)
  aoEntrar: { roteiro: 'f1_intro', flag: 'f1_intro' },
};
