/* =========================================================
   MAPA: ESCADARIA DA ESCOLA — FIM DE TARDE (Fase 2)
   ---------------------------------------------------------
   O mesmo prédio de concreto da Fase 1, já no fim do dia:
   a escola quase vazia, o sol entrando pelas janelas e
   deixando tudo laranja. Ela começa no térreo, sobe a
   escadaria e encontra o Gustavo no patamar de cima.
   ========================================================= */

MAPAS.escola_escadaria = {
  id: 'escola_escadaria',
  fase: 2,
  nome: 'Escadaria da escola',
  luz: 'entardecer', // raios de sol + tom alaranjado

  legenda: {
    T: { tile: 'teto_concreto', solido: true },
    w: { tile: 'parede_concreto', solido: true },
    J: { tile: 'janela_por_do_sol', solido: true, texto: 'O sol está se pondo atrás das árvores. O céu está todo rosa e laranja...' },
    j: { tile: 'janela_por_do_sol', solido: true, texto: 'Que fim de tarde bonito.' },
    u: { tile: 'parede_concreto', solido: true },
    c: { tile: 'piso_polido' },
    H: { tile: 'corrimao', solido: true, texto: 'Lá de cima dá para ver o térreo inteiro, quase vazio.' },
    S: { tile: 'escada' },
    Z: { tile: 'parede_laje', solido: true },
    Y: { tile: 'lateral_escada', solido: true },
    f: { tile: 'piso_polido' },
    L: { tile: 'pilar_jardim', solido: true, texto: 'Lá fora, o gramado já está ficando na sombra.' },
    I: { tile: 'pilar_jardim', solido: true },
    G: { tile: 'grama', solido: true },
  },

  chao: [
    'TTTTTTTTTTTTTTTTTTTTTTTTTTTTTT', // 0
    'wwJJJwwwwwwJJJJJJJJwwwwwwJJJww', // 1
    'wwjjjwwwwwwjjjjjjjjwwwwwwjjjww', // 2
    'uuuuuuuuuuuuuuuuuuuuuuuuuuuuuu', // 3
    'cccccccccccccccccccccccccccccc', // 4  patamar de cima
    'cccccccccccccccccccccccccccccc', // 5
    'HHHHHHHHHHSSSSSSSSSSHHHHHHHHHH', // 6  corrimão + topo da escada
    'ZZZZZZZZZYSSSSSSSSSSYZZZZZZZZZ', // 7
    'ZZZZZZZZZYSSSSSSSSSSYZZZZZZZZZ', // 8
    'ZZZZZZZZZYSSSSSSSSSSYZZZZZZZZZ', // 9
    'ZZZZZZZZZYSSSSSSSSSSYZZZZZZZZZ', // 10
    'ZZZZZZZZZYSSSSSSSSSSYZZZZZZZZZ', // 11
    'ffffffffffffffffffffffffffffff', // 12 térreo
    'ffffffffffffffffffffffffffffff', // 13
    'ffffffffffffffffffffffffffffff', // 14
    'ffffffffffffffffffffffffffffff', // 15
    'ffffffffffffffffffffffffffffff', // 16
    'LLLLILLLLLLLILLLLLLLILLLLLLLIL', // 17
    'GGGGGGGGGGGGGGGGGGGGGGGGGGGGGG', // 18
  ],

  spawns: {
    inicio: { x: 3, y: 15.6, dir: 'right' },
  },

  objetos: [
    { tipo: 'banco_concreto', x: 4, y: 13.2, texto: 'O banco onde todo mundo esperava o ônibus. Agora está vazio.' },
    { tipo: 'banco_concreto', x: 26, y: 13.2 },
    { tipo: 'lixeira_amarela', x: 7.6, y: 13 },
    { tipo: 'vaso', x: 1.2, y: 5.6 },
    { tipo: 'vaso', x: 28.8, y: 5.6 },
  ],

  npcs: [
    { id: 'ele', x: 15, y: 5.4, dir: 'down', roteiro: 'f2_ele', destaque: true },
  ],

  bonus: [],

  objetivos: [
    { seNao: 'fase2_concluida', texto: 'Suba a escadaria e encontre o Gustavo', alvo: { npc: 'ele' } },
  ],

  aoEntrar: { roteiro: 'f2_intro', flag: 'f2_intro' },
};
