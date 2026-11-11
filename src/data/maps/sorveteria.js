/* =========================================================
   MAPA: SORVETERIA (Fase 4 — parte 2)
   ---------------------------------------------------------
   Inspirada na foto (sem marca): parede do fundo roxa com
   placa de casquinha e telinhas de cardápio, balcões laranja
   no fundo, ilhas de freezer rosa-pink dos dois lados, piso
   branco, paredes laterais com adesivos coloridos, teto
   branco com luzes e guirlandas, e o tapete laranja na
   entrada de vidro.
   ========================================================= */

MAPAS.sorveteria = {
  id: 'sorveteria',
  fase: 4,
  nome: 'Sorveteria',

  legenda: {
    T: { tile: 'teto_branco', solido: true },
    w: { tile: 'parede_roxa', solido: true },
    Q: { tile: 'tela_menu', solido: true, texto: 'As telinhas com o cardápio de sabores.' },
    S: { tile: 'placa_cone', solido: true },
    O: { tile: 'balcao_laranja', solido: true, texto: 'O balcão laranja do caixa.' },
    F: { tile: 'freezer_ilha', solido: true, texto: 'Um freezer cheio de sabores: chocolate, morango, flocos, ninho...' },
    x: { tile: 'piso_branco' },
    L: { tile: 'parede_deco', solido: true },
    G: { tile: 'vitrine_frente', solido: true },
    m: { tile: 'tapete_laranja' },
  },

  chao: [
    'TTTTTTTTTTTTTTTTTTTT', // 0
    'LwwwwQQwSSwQQwwwwwwL', // 1
    'LwwwwOOOOOOOOOOwwwwL', // 2
    'LxxxxxxxxxxxxxxxxxxL', // 3
    'LxFFxxxxxxxxxxxxFFxL', // 4
    'LxFFxxxxxxxxxxxxFFxL', // 5
    'LxFFxxxxxxxxxxxxFFxL', // 6
    'LxFFxxxxxxxxxxxxFFxL', // 7
    'LxFFxxxxxxxxxxxxFFxL', // 8
    'LxFFxxxxxxxxxxxxFFxL', // 9
    'LxxxxxxxxxxxxxxxxxxL', // 10
    'GGGGGGGGGmmGGGGGGGGG', // 11
  ],

  spawns: {
    entrada: { x: 10, y: 10.7, dir: 'up' },
  },

  objetos: [],

  npcs: [
    { id: 'ele', x: 9.5, y: 3.7, dir: 'up', roteiro: 'f4_sorvete', destaque: true },
  ],

  bonus: [],

  objetivos: [
    { seNao: 'f4_sorvete', texto: 'Vá até o balcão pedir o sorvete com o seu amor', alvo: { npc: 'ele' } },
  ],
};
