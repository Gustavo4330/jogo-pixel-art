/* =========================================================
   MAPA: ESCADA DE INCÊNDIO (Fase 2)
   ---------------------------------------------------------
   Baseado na foto de referência: paredes de concreto
   aparente, piso escuro, UMA porta preta com barra
   antipânico e placa verde de saída, cano laranja na parede,
   botão verde e a escada descendo à direita com corrimão
   de inox e faixa clara na borda. Ambiente mais escuro.
   A Bia e o Gustavo já estão lá dentro.
   ========================================================= */

MAPAS.escola_escadaria = {
  id: 'escola_escadaria',
  fase: 2,
  nome: 'Escada de incêndio',
  luz: 'escuro', // ambiente mais escuro

  legenda: {
    T: { tile: 'teto_concreto', solido: true },
    w: { tile: 'concreto_liso', solido: true },
    u: { tile: 'concreto_liso', solido: true },
    E: { tile: 'porta_preta', solido: true },
    e: { tile: 'porta_preta', solido: true, texto: 'A única porta da escada de incêndio. Do outro lado fica o corredor da escola.' },
    o: { tile: 'cano_laranja', solido: true, texto: 'Um cano laranja de eletricidade subindo pela parede.' },
    k: { tile: 'botao_verde', solido: true, texto: 'Botão de emergência. Melhor não apertar!' },
    f: { tile: 'piso_escuro' },
    H: { tile: 'corrimao_inox', solido: true, texto: 'O corrimão da escada. Ela desce para os outros andares.' },
    S: { tile: 'escada_desce', solido: true, texto: 'A escada desce para os outros andares. Melhor ficar por aqui...' },
    L: { tile: 'parede_lateral', solido: true },
    B: { tile: 'parede_fundo', solido: true },
  },

  chao: [
    'TTTTTTTTTTTTTTTTTTTT', // 0
    'LwowwwEEwwwwwwwwwwwL', // 1  porta (E) com placa de saída
    'LuouuueekuuuuuuuuuuL', // 2
    'LfffffffffffHSSSSSSL', // 3  patamar | corrimão | escada descendo
    'LfffffffffffHSSSSSSL', // 4
    'LfffffffffffHSSSSSSL', // 5
    'LfffffffffffHSSSSSSL', // 6
    'LfffffffffffHSSSSSSL', // 7
    'LfffffffffffHSSSSSSL', // 8
    'LfffffffffffHSSSSSSL', // 9
    'LfffffffffffHSSSSSSL', // 10
    'BBBBBBBBBBBBBBBBBBBB', // 11
  ],

  spawns: {
    inicio: { x: 3.5, y: 9.4, dir: 'up' },
  },

  objetos: [],

  npcs: [
    { id: 'ele', x: 9, y: 6.4, dir: 'left', roteiro: 'f2_ele', destaque: true },
    // chegam pela porta no final (passo "aparecer" do roteiro)
    { id: 'felipe', x: 5.3, y: 4.3, dir: 'down', oculto: true, roteiro: 'f2_felipe' },
    { id: 'amiga', x: 8.7, y: 4.3, dir: 'down', oculto: true, roteiro: 'f2_amiga' },
  ],

  bonus: [],

  objetivos: [
    { seNao: 'f2_beijou', texto: 'Vá falar com o seu baby', alvo: { npc: 'ele' } },
  ],

  aoEntrar: { roteiro: 'f2_intro', flag: 'f2_intro' },
};
