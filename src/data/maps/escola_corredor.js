/* =========================================================
   MAPA: CORREDOR DA ESCOLA (Fase 1 — parte 2)
   ---------------------------------------------------------
   Baseado na foto do corredor: corredor aberto de concreto,
   salas com portas duplas brancas e murais na parede azul,
   piso polido junto à parede, calçamento de bloquetes no
   meio com bancos de concreto e mesas compridas com
   banquinhos, e plantas entre os pilares do lado do jardim.
   Aqui acontece a cena principal da Fase 1.
   ========================================================= */

MAPAS.escola_corredor = {
  id: 'escola_corredor',
  fase: 1,
  nome: 'Corredor da escola',

  legenda: {
    T: { tile: 'teto_concreto', solido: true },
    w: { tile: 'parede_concreto', solido: true },
    K: { tile: 'porta_dupla', solido: true },
    k: { tile: 'porta_dupla', solido: true, texto: 'A porta dupla da sala está fechada. A aula já vai começar!' },
    b: { tile: 'rodape_azul', solido: true },
    Q: { tile: 'quadro_mural', solido: true, texto: 'Mural de avisos: horários, recados... e alguém desenhou um coraçãozinho no canto. ♥' },
    x: { tile: 'extintor', solido: true, texto: 'Um extintor de incêndio. Melhor não mexer!' },
    R: { tile: 'parede_vermelha', solido: true },
    c: { tile: 'piso_polido' },
    e: { tile: 'borda_concreto' },
    v: { tile: 'piso_bloquete' },
    X: { tile: 'piso_bloquete', porta: { para: 'escola_fachada', spawn: 'saida' } },
    L: { tile: 'pilar_jardim', solido: true, texto: 'Pelas aberturas entre os pilares dá para ver o gramado lá fora.' },
    I: { tile: 'pilar_jardim', solido: true },
    G: { tile: 'grama', solido: true },
  },

  chao: [
    'TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT', // 0
    'wwKKwwwwwwwwKKwwwwwwwwKKwwwwwwwwKKwRRRww', // 1
    'bbkkbQQQbbbbkkbQQxbbbbkkbQQQbbbbkkbRRRbb', // 2
    'cccccccccccccccccccccccccccccccccccccccc', // 3
    'cccccccccccccccccccccccccccccccccccccccc', // 4
    'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', // 5
    'Xvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv', // 6
    'Xvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv', // 7
    'Xvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv', // 8
    'Xvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv', // 9
    'Xvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv', // 10
    'Xvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv', // 11
    'LLLLILLLLLLLILLLLLLLILLLLLLLILLLLLLLILLL', // 12
    'GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG', // 13
    'GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG', // 14
  ],

  spawns: {
    entrada: { x: 1.8, y: 9, dir: 'right' },
  },

  objetos: [
    { tipo: 'banco_concreto', x: 6, y: 6.9, texto: 'Um banco de concreto, geladinho como sempre.' },
    { tipo: 'banco_concreto', x: 12, y: 6.9 },
    { tipo: 'banco_concreto', x: 18, y: 6.9 },
    { tipo: 'banco_concreto', x: 30, y: 6.9 },
    { tipo: 'banco_concreto', x: 36, y: 6.9 },
    { tipo: 'lixeira_amarela', x: 9, y: 6.8 },
    { tipo: 'mesa_longa', x: 8, y: 11.6 },
    { tipo: 'mesa_longa', x: 15, y: 11.6 },
    { tipo: 'mesa_longa', x: 22, y: 11.6, texto: 'Alguém esqueceu um pen drive escrito "SLIDES - NÃO APAGAR!!!" aqui.' },
    { tipo: 'mesa_longa', x: 34, y: 11.6 },
  ],

  npcs: [
    { id: 'ele', x: 28, y: 9.2, dir: 'left', roteiro: 'f1_ele', destaque: true },
    { id: 'amiga', x: 30, y: 9.2, dir: 'left', roteiro: 'f1_amiga' },
  ],

  bonus: [
    { id: 'sebrasse', x: 39, y: 11.5 },
  ],

  objetivos: [
    { seNao: 'fase1_concluida', texto: 'Encontre o Gustavo no corredor', alvo: { npc: 'ele' } },
  ],

  aoEntrar: { roteiro: 'f1_corredor', flag: 'f1_corredor' },
};
