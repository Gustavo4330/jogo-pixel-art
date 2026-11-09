/* =========================================================
   MAPA: ESCADA DE INCÊNDIO DA ESCOLA (Fase 2)
   ---------------------------------------------------------
   Escada de incêndio fechada: paredes de concreto, degraus
   com faixa amarela antiderrapante, corrimão vermelho, porta
   de emergência com barra antipânico e placa de SAÍDA,
   hidrante, luz de emergência e o número do andar.
   Ela entra pela porta lá em cima e desce até o Gustavo.
   ========================================================= */

MAPAS.escola_escadaria = {
  id: 'escola_escadaria',
  fase: 2,
  nome: 'Escada de incêndio',
  luz: 'entardecer', // raio de sol pela janelinha + tom alaranjado

  legenda: {
    T: { tile: 'teto_concreto', solido: true },
    w: { tile: 'parede_incendio', solido: true },
    u: { tile: 'parede_incendio', solido: true },
    E: { tile: 'porta_emergencia', solido: true },
    e: { tile: 'porta_emergencia', solido: true, texto: 'A porta de emergência. Do outro lado fica o corredor da escola.' },
    Q: { tile: 'luz_emergencia', solido: true, texto: 'Luz de emergência. Ainda bem que ninguém acendeu...' },
    J: { tile: 'janelinha', solido: true, texto: 'Pela janelinha dá para ver o céu ficando laranja.' },
    x: { tile: 'hidrante', solido: true, texto: 'Hidrante. "Em caso de incêndio, quebre o vidro." Melhor não!' },
    N: { tile: 'numero_andar', solido: true, texto: 'Segundo andar.' },
    c: { tile: 'piso_incendio' },
    H: { tile: 'guarda_corpo', solido: true },
    S: { tile: 'escada_incendio' },
    Z: { tile: 'laje_incendio', solido: true },
    Y: { tile: 'lateral_incendio', solido: true },
    f: { tile: 'piso_incendio' },
    B: { tile: 'parede_fundo', solido: true },
  },

  chao: [
    'TTTTTTTTTTTTTTTTTTTTTTTTTT', // 0
    'wwEEwwQwwwwwwwwwwJwwwQwwww', // 1
    'uueeuuuuxuuuuuuNuuuuuuuuuu', // 2
    'cccccccccccccccccccccccccc', // 3  patamar de cima (porta)
    'cccccccccccccccccccccccccc', // 4
    'cccccccccccccccccccccccccc', // 5
    'HHHHHHHHSSSSSSSSSSHHHHHHHH', // 6
    'ZZZZZZZYSSSSSSSSSSYZZZZZZZ', // 7
    'ZZZZZZZYSSSSSSSSSSYZZZZZZZ', // 8
    'ZZZZZZZYSSSSSSSSSSYZZZZZZZ', // 9
    'ZZZZZZZYSSSSSSSSSSYZZZZZZZ', // 10
    'ZZZZZZZYSSSSSSSSSSYZZZZZZZ', // 11
    'ffffffffffffffffffffffffff', // 12 patamar de baixo (escondidinho)
    'ffffffffffffffffffffffffff', // 13
    'ffffffffffffffffffffffffff', // 14
    'ffffffffffffffffffffffffff', // 15
    'BBBBBBBBBBBBBBBBBBBBBBBBBB', // 16
  ],

  spawns: {
    inicio: { x: 4, y: 4.4, dir: 'down' },
  },

  objetos: [],

  npcs: [
    { id: 'ele', x: 20, y: 14.2, dir: 'left', roteiro: 'f2_ele', destaque: true },
    // aparecem só no final (passo "aparecer" do roteiro)
    { id: 'felipe', x: 3.5, y: 3.7, dir: 'down', oculto: true, roteiro: 'f2_felipe' },
    { id: 'amiga', x: 4.5, y: 3.7, dir: 'down', oculto: true, roteiro: 'f2_amiga' },
  ],

  bonus: [],

  objetivos: [
    { seNao: 'f2_beijou', texto: 'Desça a escada de incêndio e encontre o seu baby', alvo: { npc: 'ele' } },
  ],

  aoEntrar: { roteiro: 'f2_intro', flag: 'f2_intro' },
};
