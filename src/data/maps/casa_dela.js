/* =========================================================
   MAPA: ÁREA DA CHURRASQUEIRA NA CASA DELA (Fase 4 — parte 1)
   ---------------------------------------------------------
   Ambiente pequeno, sem grama:
   - churrasqueira na parede do lado esquerdo, com a pia
     colada do lado direito dela;
   - bancada preta na frente da churrasqueira;
   - mesa redonda a uns 4 passos da bancada;
   - lado direito livre (uns 2,5 m de espaço);
   - entrada do lado direito, com porta de vidro aberta.
   ========================================================= */

MAPAS.casa_dela = {
  id: 'casa_dela',
  fase: 4,
  nome: 'Casa dela',
  fumaca: { x: 2.5, y: 1.3 }, // fumaça saindo da churrasqueira

  legenda: {
    R: { tile: 'telhado_telha', solido: true },
    H: { tile: 'parede_casa', solido: true },
    C: { tile: 'churrasqueira', solido: true },
    c: { tile: 'churrasqueira', solido: true, texto: 'A churrasqueira a todo vapor. Que cheiro bom!' },
    z: { tile: 'azulejo', solido: true },
    s: { tile: 'pia', solido: true, texto: 'A pia, coladinha na churrasqueira.' },
    B: { tile: 'bancada_preta', solido: true, roteiro: 'f4_churrasco' },
    a: { tile: 'piso_area' },
    M: { tile: 'parede_lado_casa', solido: true },
    V: { tile: 'porta_vidro_aberta', solido: true, texto: 'A porta de vidro aberta, por onde você entrou.' },
    W: { tile: 'parede_casa', solido: true },
  },

  chao: [
    'RRRRRRRRRRRRRR', // 0
    'MCCCzzHHHHHHHM', // 1  churrasqueira (esquerda) + pia colada
    'McccssHHHHHHHM', // 2
    'MaaaaaaaaaaaaM', // 3
    'MBBBBBaaaaaaaM', // 4  bancada preta na frente da churrasqueira
    'MaaaaaaaaaaaaV', // 5  entrada: porta de vidro aberta (direita)
    'MaaaaaaaaaaaaV', // 6
    'MaaaaaaaaaaaaM', // 7  mesa redonda a uns 4 passos da bancada
    'MaaaaaaaaaaaaM', // 8  lado direito livre
    'MaaaaaaaaaaaaM', // 9
    'WWWWWWWWWWWWWW', // 10
  ],

  spawns: {
    inicio: { x: 12, y: 6.4, dir: 'left' },
  },

  objetos: [
    { tipo: 'mesa_redonda', x: 3.5, y: 8.9, texto: 'A mesa cheia: picanha, farofa e pão de alho.' },
    { tipo: 'cadeira', x: 1.4, y: 7.9 },
    { tipo: 'cadeira', x: 5.6, y: 7.9 },
  ],

  npcs: [
    { id: 'pai', x: 2.5, y: 3.8, dir: 'up' },              // assando a carne (sem diálogo)
    { id: 'mae', x: 1.6, y: 9.6, dir: 'right', roteiro: 'f4_mae' },
    { id: 'vo', x: 5.6, y: 9.6, dir: 'left', roteiro: 'f4_foto' },
    { id: 'ele', x: 9, y: 6.6, dir: 'left', roteiro: 'f4_ele' },
  ],

  bonus: [],

  // As dicas mudam conforme a história avança
  objetivos: [
    { seNao: 'f4_churrasco', texto: 'Vá até a bancada da churrasqueira pegar o churrasco', alvo: { x: 4, y: 4.6 } },
    { seNao: 'f4_foto', texto: 'Tire uma foto do Gustavo com a vó Raquel', alvo: { npc: 'vo' } },
  ],

  aoEntrar: { roteiro: 'f4_intro', flag: 'f4_intro' },
};
