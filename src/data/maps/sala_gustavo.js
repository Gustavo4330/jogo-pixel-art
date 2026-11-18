/* =========================================================
   MAPA: SALA DE ESTAR DO GUSTAVO (Fase 5 — parte 1)
   ---------------------------------------------------------
   Baseado na foto: parede de ripado de madeira com a TV,
   poltronas brancas com os cachorrinhos, a rede na frente
   do jardim interno, portas de vidro grandes para o jardim,
   bancada preta com cooktop e banquetas, mesa de jantar de
   madeira e piso claro. O Everton cuida do churrasco.
   ========================================================= */

MAPAS.sala_gustavo = {
  id: 'sala_gustavo',
  fase: 5,
  nome: 'Sala do Gustavo',
  fumaca: { x: 19.5, y: 0.6 },

  legenda: {
    L: { tile: 'parede_branca', solido: true },
    W: { tile: 'parede_branca', solido: true },
    w: { tile: 'ripado', solido: true },
    V: { tile: 'tv_parede', solido: true, texto: 'A TV da sala, ligada num programa de domingo.' },
    q: { tile: 'quadro_luz', solido: true },
    J: { tile: 'jardim_interno', solido: true, texto: 'O jardinzinho interno, cheio de plantas.' },
    G: { tile: 'vidro_jardim', solido: true },
    g: { tile: 'vidro_jardim', solido: true, texto: 'As portas de vidro dão para o jardim. Dá pra ver as cadeiras lá fora.' },
    C: { tile: 'churrasqueira', solido: true },
    c: { tile: 'churrasqueira', solido: true, texto: 'A churrasqueira do Everton. O cheiro tá incrível!' },
    p: { tile: 'porcelanato' },
    B: { tile: 'bancada_preta', solido: true, texto: 'A bancada preta da cozinha, cheia de coisas.' },
    K: { tile: 'cooktop', solido: true },
  },

  chao: [
    'LwVVVwwqwwJJJGGGGGCCCL', // 0
    'LwwwwwwwwwJJJgggggcccL', // 1
    'LppppppppppppppppppppL', // 2
    'LppppppppppppppppppppL', // 3
    'LppppppppppppppppppppL', // 4
    'LppppppppppppppppppppL', // 5
    'LppppppppppppppppppppL', // 6
    'LppppppppppppppppppppL', // 7
    'LppppBBBBBBBKKBppppppL', // 8
    'LppppppppppppppppppppL', // 9
    'LppppppppppppppppppppL', // 10
    'LppppppppppppppppppppL', // 11
    'LppppppppppppppppppppL', // 12
    'WWWWWWWWWWWWWWWWWWWWWW', // 13
  ],

  spawns: {
    inicio: { x: 2, y: 11.6, dir: 'right' },
  },

  objetos: [
    { tipo: 'poltrona_branca', x: 3, y: 4.4, texto: 'A poltrona preferida dos cachorros.' },
    { tipo: 'poltrona_branca', x: 6.5, y: 4.4 },
    { tipo: 'cachorro_escuro', x: 3, y: 3.9, z: 20, texto: 'Um cachorrinho dormindo na poltrona. Que fofo!' },
    { tipo: 'cachorro_branco', x: 6.5, y: 3.9, z: 20 },
    { tipo: 'rede', x: 11.5, y: 3.4, texto: 'A rede na frente do jardim. Perfeita pra um cochilo.' },
    { tipo: 'vaso', x: 1.3, y: 3 },
    { tipo: 'banqueta', x: 6.5, y: 8.2 },
    { tipo: 'banqueta', x: 8.5, y: 8.2 },
    { tipo: 'banqueta', x: 10.5, y: 8.2 },
    { tipo: 'mesa_jantar', x: 17.5, y: 10.8, texto: 'A mesa cheia de churrasco. Todo mundo reunido!' },
  ],

  npcs: [
    { id: 'everton', x: 19.5, y: 2.9, dir: 'up' },                  // no churrasco (sem diálogo)
    { id: 'paula', x: 15, y: 6.6, dir: 'left', roteiro: 'f5_paula', destaque: true },
    { id: 'gabriela', x: 14.6, y: 11.6, dir: 'right', escala: 0.8 },
    { id: 'vo_dele', x: 20.4, y: 11.4, dir: 'left', escala: 0.85 },
    { id: 'ele', x: 11.5, y: 10.6, dir: 'left', roteiro: 'f5_ele' },
  ],

  bonus: [],

  objetivos: [
    { seNao: 'f5_churrasco', texto: 'Vá falar com a Paula, a mãe do Gustavo', alvo: { npc: 'paula' } },
  ],

  aoEntrar: { roteiro: 'f5_intro', flag: 'f5_intro' },
};
