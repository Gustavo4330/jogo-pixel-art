/* =========================================================
   MAPA: CONDOMÍNIO NO HALLOWEEN (Fase 5 — parte 2)
   ---------------------------------------------------------
   À noite, de moto elétrica pelo condomínio: casas decoradas
   com abóboras, teias e fantasminhas. Ela pilota a moto até
   a casa onde a moça está entregando doces.
   ========================================================= */

MAPAS.condominio = {
  id: 'condominio',
  fase: 5,
  nome: 'Condomínio — Halloween',
  luz: 'noite',
  veiculo: { textura: 'motoCasal', velocidade: 115 }, // a moto elétrica

  // Fantasia de Halloween da Bia: corta-vento bege e preto + máscara de
  // monstro (cara branca e cabelo preto longo por cima da cabeça)
  roupas: {
    ela: { estiloRoupa: 'jaqueta', roupa: '#d9c7a3', detalhe: '#1d1b22', mascara: '#f2f0ec', cabelo: '#141014', cabeloBrilho: '#2c2a30', estiloCabelo: 'longo', calca: '#83a9d8', estiloCalca: null },
  },

  legenda: {
    M: { tile: 'muro_condo', solido: true },
    g: { tile: 'grama' },
    s: { tile: 'calcada_condo' },
    r: { tile: 'rua_livre' },
    l: { tile: 'rua_livre' },
  },

  chao: [
    'MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM', // 0
    'gggggggggggggggggggggggggggggggggggggggggggggg', // 1
    'gggggggggggggggggggggggggggggggggggggggggggggg', // 2
    'gggggggggggggggggggggggggggggggggggggggggggggg', // 3
    'gggggggggggggggggggggggggggggggggggggggggggggg', // 4
    'gggggggggggggggggggggggggggggggggggggggggggggg', // 5
    'gggggggggggggggggggggggggggggggggggggggggggggg', // 6
    'ssssssssssssssssssssssssssssssssssssssssssssss', // 7
    'rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr', // 8
    'llllllllllllllllllllllllllllllllllllllllllllll', // 9
    'rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr', // 10
    'ssssssssssssssssssssssssssssssssssssssssssssss', // 11
    'gggggggggggggggggggggggggggggggggggggggggggggg', // 12
    'gggggggggggggggggggggggggggggggggggggggggggggg', // 13
    'gggggggggggggggggggggggggggggggggggggggggggggg', // 14
    'gggggggggggggggggggggggggggggggggggggggggggggg', // 15
    'gggggggggggggggggggggggggggggggggggggggggggggg', // 16
    'gggggggggggggggggggggggggggggggggggggggggggggg', // 17
    'ssssssssssssssssssssssssssssssssssssssssssssss', // 18
    'MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM', // 19
  ],

  spawns: {
    inicio: { x: 2.5, y: 9.4, dir: 'right' },
  },

  objetos: [
    { tipo: 'casa', x: 5, y: 6.9 },
    { tipo: 'casa', x: 12, y: 6.9 },
    { tipo: 'casa', x: 19, y: 6.9 },
    { tipo: 'casa', x: 26, y: 6.9 },
    { tipo: 'casa', x: 33, y: 6.9 },
    { tipo: 'casa', x: 40, y: 6.9 },
    { tipo: 'abobora', x: 10.2, y: 7.6 },
    { tipo: 'abobora', x: 24.2, y: 7.6 },
    { tipo: 'abobora', x: 38.4, y: 7.6 },
    { tipo: 'abobora', x: 41.6, y: 7.6 },
    { tipo: 'arvore', x: 8, y: 15 },
    { tipo: 'arvore', x: 21, y: 16 },
    { tipo: 'arvore', x: 34, y: 15 },
    { tipo: 'poste', x: 15.5, y: 11.6 },
    { tipo: 'poste', x: 30.5, y: 11.6 },
  ],

  npcs: [
    { id: 'moca', x: 40, y: 7.6, dir: 'down' },
    { id: 'ele', x: 39, y: 9, dir: 'up', oculto: true }, // aparece ao descer da moto
  ],

  gatilhos: [
    { x: 40, y: 9.4, raio: 56, roteiro: 'f5_casa', flag: 'f5_parou' },
  ],

  bonus: [],

  objetivos: [
    { seNao: 'f5_parou', texto: 'Pilote a moto até a casa que está dando doces', alvo: { x: 40, y: 8.6 } },
  ],

  aoEntrar: { roteiro: 'f5_halloween', flag: 'f5_halloween' },
};
