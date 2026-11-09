/* =========================================================
   FASE 3 — PRIMEIRO DATE: shopping e cinema (19 de setembro)
   ---------------------------------------------------------
   Encontro na frente do shopping, uma voltinha e depois o
   cinema para ver o Homem-Aranha... que vocês quase nem
   viram. Lá aconteceu o primeiro "eu te amo".
   A partir do cinema, os dois se chamam de "amor".
   Passos novos desta fase:
     { mudarMapa: 'id_do_mapa', spawn: 'id', texto: 'Texto da transição' }
     { posicionar: { ela: [x, y, 'up'] } }
     { beijo: 'Título', fala: 'Frase que aparece durante o beijo' }
   ========================================================= */

Object.assign(ROTEIROS, {
  f3_intro: [
    {
      passos: [
        { quem: 'narrador', fala: '19 de setembro. O nosso primeiro date. ♥' },
        { marcar: 'f3_intro' },
      ],
    },
  ],

  /* ---- encontro na frente do shopping ---- */
  f3_encontro: [
    {
      passos: [
        { olhar: 'ele', para: 'jogador' },
        { quem: 'ele', fala: 'Vida! Nossa... você tá linda demais.', rosto: 'feliz' },
        { quem: 'ela', fala: 'Para, baby... obrigada!', rosto: 'timido' },
        { quem: 'ele', fala: 'Bora dar uma volta antes do filme?', rosto: 'feliz' },
        { quem: 'ela', fala: 'Bora!', rosto: 'feliz' },
        { mudarMapa: 'shopping_cinema', spawn: 'entrada', texto: 'Depois de uma voltinha pelo shopping...' },
      ],
    },
  ],

  /* ---- no cinema: um único diálogo, o primeiro "eu te amo" ---- */
  f3_cinema: [
    {
      passos: [
        { posicionar: { ela: [13.5, 9.15, 'up'] } },
        { esperar: 1200 },
        { olhar: 'ele', para: 'jogador' },
        { beijo: 'O nosso primeiro "eu te amo"', fala: 'Gustavo: — Eu te amo, amor.' },
        { olhar: 'ela', para: 'ele' },
        { quiz: 'f3_quiz' },
        { coracoes: true },
        { marcar: 'fase3_concluida' },
        { concluirFase: 3 },
      ],
    },
  ],
});

Object.assign(QUIZZES, {
  f3_quiz: {
    quem: 'ele',
    embaralhar: true,
    erro: ['Hmm... não foi bem assim, amor! Tenta de novo ♥', 'Quase! Lembra daquele dia...'],
    perguntas: [
      {
        pergunta: 'Que filme a gente foi ver no nosso primeiro date?',
        opcoes: ['Homem-Aranha', 'Um filme de terror', 'Uma comédia romântica'],
        correta: 0,
        acerto: 'Isso! Mesmo que a gente quase nem tenha visto, hahaha.',
      },
      {
        pergunta: 'Em que dia foi o nosso primeiro date?',
        opcoes: ['19 de setembro', '12 de outubro', '31 de outubro'],
        correta: 0,
        acerto: '19 de setembro. ♥',
      },
      {
        pergunta: 'E o que aconteceu de especial lá no cinema?',
        opcoes: ['O nosso primeiro "eu te amo"', 'A gente dormiu no filme', 'A pipoca caiu toda'],
        correta: 0,
        acerto: 'E eu continuo te amando. ♥',
      },
    ],
  },
});
