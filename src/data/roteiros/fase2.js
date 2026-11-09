/* =========================================================
   FASE 2 — PRIMEIRO BEIJO: diálogos e quiz
   ---------------------------------------------------------
   Escadaria da escola, no fim do dia. Os dois muito tímidos.
   Os tipos de passo estão explicados em roteiros/fase1.js.
   Novo passo desta fase:
     { beijo: 'Texto que aparece na tela' }
   ========================================================= */

Object.assign(ROTEIROS, {
  f2_intro: [
    {
      passos: [
        { quem: 'narrador', fala: 'Fim de tarde. A escola já estava quase vazia...' },
        { quem: 'ela', fala: 'O Gustavo disse que ia me esperar na escadaria...', rosto: 'timido' },
        { quem: 'ela', fala: 'Por que meu coração está batendo tão rápido?', rosto: 'timido' },
        { quem: 'narrador', fala: 'Siga a setinha rosa e suba a escada.' },
        { marcar: 'f2_intro' },
      ],
    },
  ],

  f2_ele: [
    {
      se: 'fase2_concluida',
      passos: [
        { quem: 'ele', fala: 'Toda vez que eu passo por essa escada, eu lembro de você. ♥', rosto: 'timido' },
      ],
    },
    {
      passos: [
        { olhar: 'ele', para: 'jogador' },
        { quem: 'ele', fala: 'Bia... você veio.', rosto: 'timido' },
        { quem: 'ela', fala: 'Eu disse que vinha, né?', rosto: 'timido' },
        { quem: 'narrador', fala: 'O sol entrava pelas janelas e deixava tudo cor de laranja.' },
        { quem: 'ele', fala: 'Então... é...', rosto: 'timido' },
        { quem: 'ela', fala: '...', rosto: 'timido' },
        { quem: 'narrador', fala: 'Vocês dois estavam muito tímidos. Ninguém sabia direito o que dizer.' },
        { quem: 'ele', fala: 'Posso... te falar uma coisa?', rosto: 'timido' },
        { quem: 'ela', fala: 'Pode...', rosto: 'timido' },
        { quem: 'ele', fala: 'Eu gosto muito de ficar com você.', rosto: 'timido' },
        { emocao: 'ela', tipo: 'coracao' },
        { quem: 'ela', fala: 'Eu também, Gustavo...', rosto: 'timido' },
        { andar: 'ele', ate: 'jogador', distancia: 11 },
        { quem: 'narrador', fala: 'Ele foi chegando mais perto... devagarinho...' },
        { beijo: 'O nosso primeiro beijo' },
        { quem: 'ele', fala: '...', rosto: 'timido' },
        { quem: 'ela', fala: '...', rosto: 'feliz' },
        { quem: 'ele', fala: 'Eu nunca vou esquecer este fim de tarde.', rosto: 'feliz' },
        { quem: 'ele', fala: 'E você? Será que lembra de tudo desse dia?', rosto: 'feliz' },
        { quiz: 'f2_quiz' },
        { quem: 'ele', fala: 'Foi o melhor fim de tarde da minha vida. ♥', rosto: 'feliz' },
        { coracoes: true },
        { marcar: 'fase2_concluida' },
        { concluirFase: 2 },
      ],
    },
  ],
});

Object.assign(QUIZZES, {
  f2_quiz: {
    quem: 'ele',
    embaralhar: true,
    erro: [
      'Hmm... não foi bem assim! Tenta de novo ♥',
      'Quase! Pensa naquele fim de tarde...',
    ],
    perguntas: [
      {
        pergunta: 'Onde foi o nosso primeiro beijo?',
        opcoes: ['Na escadaria da escola', 'No pátio, perto das mesas', 'Na porta da sala'],
        correta: 0,
        acerto: 'Isso! Na nossa escadaria. ♥',
      },
      {
        pergunta: 'Em que hora do dia foi?',
        opcoes: ['No final do dia', 'Logo de manhã', 'Na hora do intervalo'],
        correta: 0,
        acerto: 'Isso mesmo, com o sol se pondo.',
      },
      {
        pergunta: 'E como a gente estava?',
        opcoes: ['Muito tímidos', 'Super confiantes', 'Morrendo de sono'],
        correta: 0,
        acerto: 'Muito, muito tímidos! Hahaha ♥',
      },
    ],
  },
});
