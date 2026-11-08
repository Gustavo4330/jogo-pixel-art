/* =========================================================
   FASES — a ordem da história.
   'disponivel: false' = fase ainda em construção ("Em breve").
   ========================================================= */

const FASES = [
  {
    id: 1,
    nome: 'Primeiro Flerte',
    local: 'Escola',
    data: '',
    mapa: 'escola_fachada',
    spawn: 'inicio',
    disponivel: true,
  },
  {
    id: 2,
    nome: 'Primeiro Beijo',
    local: 'Escadaria da escola',
    data: 'Fim de tarde',
    disponivel: false,
  },
  {
    id: 3,
    nome: 'Primeiro Date',
    local: 'Shopping e cinema',
    data: '19 de setembro',
    disponivel: false,
  },
  {
    id: 4,
    nome: 'Conhecendo a sua família',
    local: 'Sua casa',
    data: '12 de outubro',
    disponivel: false,
  },
  {
    id: 5,
    nome: 'Conhecendo a minha família',
    local: 'Aniversário da minha irmã',
    data: '31 de outubro',
    disponivel: false,
  },
  {
    id: 6,
    nome: '???',          // o nome fica escondido para não estragar a surpresa!
    nomeReal: 'O Pedido',
    local: '???',
    boss: true,
    disponivel: false,
  },
];
