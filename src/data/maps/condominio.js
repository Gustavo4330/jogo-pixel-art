/* =========================================================
   MAPA: CONDOMÍNIO (Fase 5 — parte 2: Halloween)
   ---------------------------------------------------------
   Baseado na foto: fim de tarde, casas modernas de telhado
   reto (brancas e mostarda), jardim na frente, calçada com
   arvorezinhas presas em estacas, postes de concreto, rua
   larga com faixa amarela dupla no meio e, do outro lado,
   terrenos de grama com casas em construção.
   Os dois andam de moto elétrica até a casa dos doces.
   ========================================================= */

MAPAS.condominio = {
  id: 'condominio',
  fase: 5,
  nome: 'Condomínio — Halloween',
  luz: 'entardecer',
  veiculo: { textura: 'motoCasal', velocidade: 115 }, // a moto elétrica

  // Roupa da Bia no Halloween: corta-vento bege e preto (sem máscara)
  roupas: {
    ela: { estiloRoupa: 'jaqueta', roupa: '#d9c7a3', detalhe: '#1d1b22', calca: '#83a9d8' },
  },

  legenda: {
    g: { tile: 'grama' },
    v: { tile: 'jardim_frente' },
    s: { tile: 'calcada_clara' },
    '=': { tile: 'meio_fio' },
    r: { tile: 'rua_livre' },
    Y: { tile: 'rua_faixa_amarela' },
  },

  chao: [
    'gggggggggggggggggggggggggggggggggggggggggggggg', // 0
    'gggggggggggggggggggggggggggggggggggggggggggggg', // 1
    'gggggggggggggggggggggggggggggggggggggggggggggg', // 2
    'gggggggggggggggggggggggggggggggggggggggggggggg', // 3
    'gggggggggggggggggggggggggggggggggggggggggggggg', // 4
    'gggggggggggggggggggggggggggggggggggggggggggggg', // 5
    'gggggggggggggggggggggggggggggggggggggggggggggg', // 6
    'vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv', // 7
    'ssssssssssssssssssssssssssssssssssssssssssssss', // 8
    '==============================================', // 9
    'rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr', // 10
    'YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY', // 11
    'rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr', // 12
    '==============================================', // 13
    'gggggggggggggggggggggggggggggggggggggggggggggg', // 14
    'gggggggggggggggggggggggggggggggggggggggggggggg', // 15
    'gggggggggggggggggggggggggggggggggggggggggggggg', // 16
    'gggggggggggggggggggggggggggggggggggggggggggggg', // 17
    'gggggggggggggggggggggggggggggggggggggggggggggg', // 18
    'gggggggggggggggggggggggggggggggggggggggggggggg', // 19
  ],

  spawns: {
    inicio: { x: 2.5, y: 11.6, dir: 'right' },
  },

  objetos: [
    { tipo: 'casa_moderna', x: 5, y: 6.9 },
    { tipo: 'casa_moderna2', x: 12, y: 6.9 },
    { tipo: 'casa_moderna', x: 19, y: 6.9 },
    { tipo: 'casa_moderna2', x: 26, y: 6.9 },
    { tipo: 'casa_moderna2', x: 33, y: 6.9 },
    { tipo: 'casa_moderna', x: 40, y: 6.9 },
    { tipo: 'muda', x: 3.5, y: 8 },
    { tipo: 'muda', x: 10.5, y: 8 },
    { tipo: 'muda', x: 17.5, y: 8 },
    { tipo: 'muda', x: 24.5, y: 8 },
    { tipo: 'muda', x: 31.5, y: 8 },
    { tipo: 'muda', x: 38.5, y: 8 },
    { tipo: 'muda', x: 45.5, y: 8 },
    { tipo: 'poste_concreto', x: 9.5, y: 8.9 },
    { tipo: 'poste_concreto', x: 23.5, y: 8.9 },
    { tipo: 'poste_concreto', x: 37.5, y: 8.9 },
    { tipo: 'obra', x: 9, y: 19.2 },
    { tipo: 'obra', x: 31, y: 19.6 },
    { tipo: 'muda', x: 20.5, y: 17 },
    { tipo: 'abobora', x: 38.6, y: 7.6 },
    { tipo: 'abobora', x: 41.4, y: 7.6 },
  ],

  npcs: [
    { id: 'moca', x: 40, y: 8.8, dir: 'down' },
    { id: 'ele', x: 39, y: 10.4, dir: 'up', oculto: true }, // aparece ao descer da moto
  ],

  gatilhos: [
    { x: 40, y: 11, raio: 56, roteiro: 'f5_casa', flag: 'f5_parou' },
  ],

  bonus: [],

  objetivos: [
    { seNao: 'f5_parou', texto: 'Pilote a moto até a casa que está dando doces', alvo: { x: 40, y: 10.4 } },
  ],

  aoEntrar: { roteiro: 'f5_halloween', flag: 'f5_halloween' },
};
