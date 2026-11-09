/* =========================================================
   CATÁLOGO DE OBJETOS que podem ser colocados nos mapas.
   tex   = nome do desenho (src/art/objects.js)
   corpo = [largura, altura] da área sólida, na base do objeto
           (null = dá para atravessar)
   ========================================================= */

const OBJETOS = {
  arvore:          { tex: 'tree',        corpo: [14, 8] },
  cerejeira:       { tex: 'treePink',    corpo: [16, 8] },
  canteiro_arvore: { tex: 'planterTree', corpo: [50, 16] },
  canteiro:        { tex: 'planter',     corpo: [30, 12] },
  banco:           { tex: 'bench',       corpo: [30, 9] },
  poste:           { tex: 'lamp',        corpo: [6, 4] },
  mesa:            { tex: 'table',       corpo: [32, 26] },
  lixeira:         { tex: 'trash',       corpo: [10, 6] },
  vaso:            { tex: 'plant',       corpo: [12, 7] },
  placa:           { tex: 'sign',        corpo: [10, 4] },
  banco_concreto:  { tex: 'benchConcrete', corpo: [32, 8] },
  mesa_longa:      { tex: 'tableLong',   corpo: [46, 28] },
  lixeira_amarela: { tex: 'trashYellow', corpo: [10, 6] },
  muda:            { tex: 'sapling',     corpo: [6, 4] },
  poltrona:        { tex: 'seat',        corpo: [14, 5] },
  poltrona_livre:  { tex: 'seat',        corpo: null },   // dá para sentar (sem colisão)
};
