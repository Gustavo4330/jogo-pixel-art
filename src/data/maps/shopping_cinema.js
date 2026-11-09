/* =========================================================
   MAPA: SALA DE CINEMA (Fase 3 — parte 2)
   ---------------------------------------------------------
   Sala escura, tela grande passando o filme, fileiras de
   poltronas vermelhas e corredores com luzinhas no chão.
   O Gustavo já está sentado; ela entra e senta do lado dele.
   ========================================================= */

// Fileiras de poltronas (geradas automaticamente)
const FILEIRAS_CINEMA = (() => {
  const lista = [];
  for (const y of [7.4, 9.4, 11.4, 13.4]) {
    for (let col = 3; col <= 20; col++) {
      // a poltrona ao lado do Gustavo fica livre para ela sentar
      const livre = y === 9.4 && col === 13;
      lista.push({ tipo: livre ? 'poltrona_livre' : 'poltrona', x: col + 0.5, y });
    }
  }
  return lista;
})();

MAPAS.shopping_cinema = {
  id: 'shopping_cinema',
  fase: 3,
  nome: 'Cinema',
  luz: 'cinema',
  telaCinema: { x: 12, y: 4 }, // tela do filme (fica brilhando no escuro)

  legenda: {
    T: { tile: 'teto_cinema', solido: true },
    W: { tile: 'parede_cinema', solido: true },
    X: { tile: 'fundo_tela', solido: true },
    D: { tile: 'palco', solido: true },
    c: { tile: 'carpete' },
    a: { tile: 'corredor_cinema' },
    B: { tile: 'parede_cinema', solido: true },
    P: { tile: 'porta_cinema', solido: true },
  },

  chao: [
    'TTTTTTTTTTTTTTTTTTTTTTTT', // 0
    'WXXXXXXXXXXXXXXXXXXXXXXW', // 1  tela
    'WXXXXXXXXXXXXXXXXXXXXXXW', // 2
    'WXXXXXXXXXXXXXXXXXXXXXXW', // 3
    'WDDDDDDDDDDDDDDDDDDDDDDW', // 4
    'WccccccccccccccccccccccW', // 5
    'WaaccccccccccccccccccaaW', // 6
    'WaaccccccccccccccccccaaW', // 7
    'WaaccccccccccccccccccaaW', // 8
    'WaaccccccccccccccccccaaW', // 9
    'WaaccccccccccccccccccaaW', // 10
    'WaaccccccccccccccccccaaW', // 11
    'WaaccccccccccccccccccaaW', // 12
    'WaaccccccccccccccccccaaW', // 13
    'WaaccccccccccccccccccaaW', // 14
    'BPPBBBBBBBBBBBBBBBBBBBBB', // 15 porta de entrada
  ],

  spawns: {
    entrada: { x: 2, y: 14.6, dir: 'up' },
  },

  objetos: FILEIRAS_CINEMA,

  npcs: [
    { id: 'ele', x: 12.5, y: 9.15, dir: 'up', destaque: true },
  ],

  // Quando ela chega na poltrona livre, a cena começa
  gatilhos: [
    { x: 13.5, y: 9.2, raio: 7, roteiro: 'f3_cinema', flag: 'f3_sentou' },
  ],

  bonus: [],

  objetivos: [
    { seNao: 'f3_sentou', texto: 'Sente na poltrona ao lado do seu amor', alvo: { x: 13.5, y: 8.8 } },
  ],
};
