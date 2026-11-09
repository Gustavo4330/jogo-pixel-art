/* =========================================================
   MAPA: QUINTAL DA CASA DELA (Fase 4 — parte 1)
   ---------------------------------------------------------
   Fundo da casa com telhado de telhas, janelas e porta,
   área com piso, churrasqueira de tijolos soltando fumaça,
   mesa com o churrasco, cadeiras de plástico, isopor,
   e o gramado. A família da Bia está toda lá.
   ========================================================= */

MAPAS.casa_dela = {
  id: 'casa_dela',
  fase: 4,
  nome: 'Casa dela',
  fumaca: { x: 23, y: 3.4 }, // fumaça saindo da churrasqueira

  legenda: {
    R: { tile: 'telhado_telha', solido: true },
    H: { tile: 'parede_casa', solido: true },
    J: { tile: 'janela_casa', solido: true },
    j: { tile: 'janela_casa', solido: true, texto: 'A janela da cozinha. Tem até um vasinho de flor.' },
    P: { tile: 'porta_casa', solido: true },
    p: { tile: 'porta_casa', solido: true, texto: 'A porta da cozinha. Lá dentro tem mais comida esperando!' },
    a: { tile: 'piso_area' },
    C: { tile: 'churrasqueira', solido: true },
    c: { tile: 'churrasqueira', solido: true, texto: 'A churrasqueira a todo vapor. Que cheiro bom!' },
    M: { tile: 'muro', solido: true },
    g: { tile: 'grama' },
  },

  chao: [
    'RRRRRRRRRRRRRRRRRRRRRRRRRR', // 0  telhado
    'HHHJJHHHHPPHHHHJJHHHHHHHHH', // 1  fundo da casa
    'HHHjjHHHHppHHHHjjHHHHHHHHH', // 2
    'MaaaaaaaaaaaaaaaaaaaaCCCCM', // 3  área + churrasqueira
    'MaaaaaaaaaaaaaaaaaaaaccccM', // 4
    'MaaaaaaaaaaaaaaaaaaaaaaaaM', // 5
    'MaaaaaaaaaaaaaaaaaaaaaaaaM', // 6
    'MaaaaaaaaaaaaaaaaaaaaaaaaM', // 7
    'MaaaaaaaaaaaaaaaaaaaaaaaaM', // 8
    'MaaaaaaaaaaaaaaaaaaaaaaaaM', // 9
    'MggggggggggggggggggggggggM', // 10 gramado
    'MggggggggggggggggggggggggM', // 11
    'MggggggggggggggggggggggggM', // 12
    'MggggggggggggggggggggggggM', // 13
    'MggggggggggggggggggggggggM', // 14
    'MggggggggggggggggggggggggM', // 15
    'MggggggggggggggggggggggggM', // 16
    'MMMMMMMMMMMMMMMMMMMMMMMMMM', // 17
  ],

  spawns: {
    inicio: { x: 10, y: 4, dir: 'down' },
  },

  objetos: [
    { tipo: 'mesa_churrasco', x: 13, y: 8.6, texto: 'Picanha, linguiça, farofa, vinagrete, pão de alho... Banquete!' },
    { tipo: 'cadeira', x: 10, y: 6.5 },
    { tipo: 'cadeira', x: 13, y: 6.5 },
    { tipo: 'cadeira', x: 16, y: 6.5 },
    { tipo: 'cadeira', x: 10.5, y: 10.4 },
    { tipo: 'cadeira', x: 15.5, y: 10.4 },
    { tipo: 'isopor', x: 19.2, y: 5.4, texto: 'O isopor cheio de refrigerante gelado.' },
    { tipo: 'vaso', x: 2, y: 4 },
    { tipo: 'vaso', x: 6.5, y: 4 },
    { tipo: 'arvore', x: 4, y: 14.5 },
    { tipo: 'arvore', x: 22, y: 15.5 },
  ],

  npcs: [
    { id: 'pai', x: 22.5, y: 5.7, dir: 'down', roteiro: 'f4_churrasco' },
    { id: 'mae', x: 8, y: 8, dir: 'right', roteiro: 'f4_mae' },
    { id: 'vo', x: 17.4, y: 9.4, dir: 'left', roteiro: 'f4_foto' },
    { id: 'ele', x: 18.6, y: 7.4, dir: 'left', roteiro: 'f4_ele' },
  ],

  bonus: [],

  // As dicas mudam conforme a história avança
  objetivos: [
    { seNao: 'f4_churrasco', texto: 'Vá até a churrasqueira e chame todo mundo para comer', alvo: { npc: 'pai' } },
    { seNao: 'f4_foto', texto: 'Tire uma foto do Gustavo com a sua vó', alvo: { npc: 'vo' } },
  ],

  aoEntrar: { roteiro: 'f4_intro', flag: 'f4_intro' },
};
