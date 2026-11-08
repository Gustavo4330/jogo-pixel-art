/* =========================================================
   MAPA: CORREDOR INTERNO DA ESCOLA (Fase 1 — parte 2)
   ---------------------------------------------------------
   Corredor comprido com salas de aula, murais, janelas,
   piso claro, mesas com bancos e jardineiras.
   Aqui acontece a cena principal da Fase 1.
   ========================================================= */

MAPAS.escola_corredor = {
  id: 'escola_corredor',
  fase: 1,
  nome: 'Corredor da escola',

  legenda: {
    T: { tile: 'teto', solido: true },
    w: { tile: 'parede', solido: true },
    n: { tile: 'janela', solido: true, texto: 'Pela janela dá para ver o pátio lá fora.' },
    K: { tile: 'porta_sala', solido: true },
    k: { tile: 'porta_sala', solido: true, texto: 'A sala está fechada. A aula já vai começar!' },
    E: { tile: 'porta_saida', solido: true },
    e: { tile: 'porta_saida', porta: { para: 'escola_fachada', spawn: 'saida' } },
    b: { tile: 'rodape_azul', solido: true },
    q: { tile: 'mural', solido: true, texto: 'Mural de avisos: "Feira de ciências na sexta!"... e alguém desenhou um coraçãozinho no canto. ♥' },
    p: { tile: 'cartaz', solido: true, texto: 'Um cartaz colorido feito pelos alunos.' },
    f: { tile: 'piso_corredor' },
    L: { tile: 'jardineira', solido: true },
    G: { tile: 'grama', solido: true },
  },

  chao: [
    'TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT', // 0
    'wEEwwnnwKwnnwwnnwKwnnwwnnwKwnnwwnnwKwnnw', // 1
    'beebbqbbkbbpbbqbbkbbpbbqbbkbbpbbqbbkbbpb', // 2
    'ffffffffffffffffffffffffffffffffffffffff', // 3
    'ffffffffffffffffffffffffffffffffffffffff', // 4
    'ffffffffffffffffffffffffffffffffffffffff', // 5
    'ffffffffffffffffffffffffffffffffffffffff', // 6
    'ffffffffffffffffffffffffffffffffffffffff', // 7
    'ffffffffffffffffffffffffffffffffffffffff', // 8
    'ffffffffffffffffffffffffffffffffffffffff', // 9
    'ffffffffffffffffffffffffffffffffffffffff', // 10
    'ffffffffffffffffffffffffffffffffffffffff', // 11
    'LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL', // 12
    'GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG', // 13
  ],

  spawns: {
    entrada: { x: 2, y: 4.6, dir: 'down' },
  },

  objetos: [
    { tipo: 'mesa', x: 7, y: 8.2 },
    { tipo: 'mesa', x: 12, y: 8.2 },
    { tipo: 'mesa', x: 17, y: 8.2 },
    { tipo: 'mesa', x: 7, y: 11.6 },
    { tipo: 'mesa', x: 12, y: 11.6 },
    { tipo: 'mesa', x: 17, y: 11.6, texto: 'Alguém esqueceu um pen drive escrito "SLIDES - NÃO APAGAR!!!" aqui.' },
    { tipo: 'vaso', x: 4.5, y: 3.6 },
    { tipo: 'vaso', x: 13, y: 3.6 },
    { tipo: 'vaso', x: 22, y: 3.6 },
    { tipo: 'vaso', x: 31, y: 3.6 },
    { tipo: 'lixeira', x: 38.6, y: 3.7 },
    { tipo: 'vaso', x: 37.6, y: 11.8 },
  ],

  npcs: [
    { id: 'ele', x: 28, y: 7.6, dir: 'left', roteiro: 'f1_ele', destaque: true },
    { id: 'amiga', x: 30.2, y: 7.6, dir: 'left', roteiro: 'f1_amiga' },
    { id: 'aluno1', x: 9.5, y: 9.5, dir: 'up', roteiro: 'f1_colega_mesa' },
    { id: 'aluna2', x: 20.5, y: 5, dir: 'down', roteiro: 'f1_colega_corredor', passear: true },
  ],

  bonus: [
    { id: 'sebrasse', x: 39, y: 11.4 },
  ],

  aoEntrar: { roteiro: 'f1_corredor', flag: 'f1_corredor' },
};
