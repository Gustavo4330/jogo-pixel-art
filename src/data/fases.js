/* =========================================================
   FASES — a ordem da história.
   'disponivel: false' = fase ainda em construção ("Em breve").

   ROUPAS POR FASE
   Em "roupas" você troca só o que muda naquela fase; o resto
   vem de src/data/personagens.js. Opções úteis:
     roupa: '#cor'            cor da blusa/camisa/vestido
     estiloRoupa: 'polo' | 'camiseta' | 'regata' | 'top' | 'vestido'
     detalhe: '#cor'          gola e punhos de outra cor
     escudo: '#cor'           escudinho no peito
     calca: '#cor'            cor da calça/shorts
     estiloCalca: 'shorts'    deixa as pernas de fora
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
    roupas: {
      ele: { roupa: '#1f4a35', gola: '#2c6248', estiloRoupa: 'polo' }, // camisa verde-escura
    },
  },
  {
    id: 2,
    nome: 'Primeiro Beijo',
    local: 'Escadaria da escola',
    data: 'Fim de tarde',
    mapa: 'escola_escadaria',
    spawn: 'inicio',
    disponivel: true,
  },
  {
    id: 3,
    nome: 'Primeiro Date',
    local: 'Shopping e cinema',
    data: '19 de setembro',
    mapa: 'shopping_frente',
    spawn: 'inicio',
    disponivel: true,
  },
  {
    id: 4,
    nome: 'Conhecendo a sua família',
    local: 'Sua casa',
    data: '12 de outubro',
    mapa: 'casa_dela',
    spawn: 'inicio',
    disponivel: true,
    roupas: {
      // camisa vermelha da seleção de Portugal
      ele: { roupa: '#c8102e', estiloRoupa: 'camiseta', detalhe: '#0a6b3a', escudo: '#f2c230' },
      // top marrom e shorts jeans branco
      ela: { roupa: '#7b4a33', estiloRoupa: 'top', calca: '#f1eee9', estiloCalca: 'shorts' },
    },
  },
  {
    id: 5,
    nome: 'Conhecendo a minha família',
    local: 'Aniversário da minha irmã',
    data: '31 de outubro',
    disponivel: false,
    roupas: {
      ele: { roupa: '#1d1b22', estiloRoupa: 'regata' },   // regata preta
      ela: { roupa: '#3f74c9', estiloRoupa: 'vestido' },  // vestido azul
    },
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
