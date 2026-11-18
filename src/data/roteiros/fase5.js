/* =========================================================
   FASE 5 — CONHECENDO A MINHA FAMÍLIA + HALLOWEEN (31/10)
   ---------------------------------------------------------
   Parte 1: churrasco na sala do Gustavo com a família
   (Paula, Everton, Gabriela e a vó). Só o Gustavo, a Bia e a
   Paula conversam: já já vão para o Halloween.
   Parte 2: de moto elétrica pelo condomínio, ela fantasiada
   de corta-vento. Na casa dos doces vem a pergunta... e o tapa!
   Passos novos desta fase:
     { descer: { ela: [x, y, 'up'], ele: [x, y, 'up'] } }  (descem da moto)
     { tapa: true }                                         (ela bate nele)
   ========================================================= */

Object.assign(ROTEIROS, {
  f5_intro: [
    {
      passos: [
        { quem: 'narrador', fala: '31 de outubro. Hoje você vai conhecer a família do Gustavo. ♥' },
        { quem: 'ela', fala: 'Que cheirinho de churrasco...', rosto: 'feliz' },
        { marcar: 'f5_intro' },
      ],
    },
  ],

  /* ---- o churrasco na sala ---- */
  f5_paula: [
    {
      se: 'f5_churrasco',
      passos: [{ quem: 'paula', fala: 'Divirtam-se no Halloween! E não esqueçam meus docinhos.', rosto: 'feliz' }],
    },
    {
      passos: [
        { olhar: 'paula', para: 'jogador' },
        { quem: 'paula', fala: 'Bia! Que bom que você veio! Pega um pratinho, o Everton caprichou no churrasco.', rosto: 'feliz' },
        { quem: 'ela', fala: 'Obrigada, Paula! Tá com uma cara ótima.', rosto: 'feliz' },
        { item: 'churrasco', titulo: 'Churrasco em família!', texto: 'Todo mundo reunido na sala, com o Everton na churrasqueira.' },
        { quem: 'ele', fala: 'Mãe, daqui a pouco a gente vai pro Halloween, tá?', rosto: 'feliz' },
        { quem: 'paula', fala: 'Ah é, hoje é Halloween! Vão pegar muitos doces?', rosto: 'surpreso' },
        { quem: 'ela', fala: 'Vamos sim! Vou encher o saquinho de doce.', rosto: 'feliz' },
        { quem: 'paula', fala: 'Hahaha, juízo, hein? E tragam uns docinhos pra mim.', rosto: 'feliz' },
        { quem: 'ele', fala: 'Pode deixar! Bora, amor?', rosto: 'feliz' },
        { quem: 'ela', fala: 'Bora!', rosto: 'feliz' },
        { marcar: 'f5_churrasco' },
        { mudarMapa: 'condominio', spawn: 'inicio', texto: 'Mais tarde, no Halloween...' },
      ],
    },
  ],

  f5_ele: [
    { passos: [{ quem: 'ele', fala: 'Amor, vai lá falar com a minha mãe! Ela tá doida pra te ver.', rosto: 'feliz' }] },
  ],

  /* ---- Halloween de moto ---- */
  f5_halloween: [
    {
      passos: [
        { quem: 'narrador', fala: 'Fim de tarde de Halloween. Vocês dois de moto elétrica pelo condomínio.' },
        { quem: 'narrador', fala: 'Use o direcional para pilotar e siga a setinha até a casa que está dando doces.' },
        { marcar: 'f5_halloween' },
      ],
    },
  ],

  f5_casa: [
    {
      passos: [
        { quem: 'ele', fala: 'Olha ali, amor! Aquela casa tá dando doce!', rosto: 'feliz' },
        { quiz: 'f5_quiz' },
        { descer: { ela: [40.8, 10.2, 'up'], ele: [39.2, 10.2, 'up'] } },
        { olhar: 'ele', para: 'moca' },
        { quem: 'ele', fala: 'Moça, ela é muito vergonhosa, viu? Nem queria vir pedir doce!', rosto: 'feliz' },
        { quem: 'moca', fala: 'Ownn, que fofa! Pode pegar quantos quiser.', rosto: 'feliz' },
        { quem: 'ela', fala: 'GUSTAVO!', rosto: 'surpreso' },
        { tapa: true },
        { quem: 'ele', fala: 'Aiii! Hahaha, mas é verdade!', rosto: 'feliz' },
        { quem: 'ela', fala: 'Você me paga! ♥', rosto: 'feliz' },
        { item: 'doces', titulo: 'Doces!', texto: 'Doces garantidos... e um tapa bem merecido.' },
        { coracoes: true },
        { marcar: 'fase5_concluida' },
        { concluirFase: 5 },
      ],
    },
  ],
});

Object.assign(QUIZZES, {
  f5_quiz: {
    quem: 'ele',
    embaralhar: true,
    erro: [
      'Não foi isso, amor! Lembra do que eu falei pra moça...',
      'Hmm, não... Pensa no doce!',
    ],
    perguntas: [
      {
        pergunta: 'O que eu fiz nessa hora que deixou você brava?',
        opcoes: [
          'Fez eu ir pedir o doce e falou que eu tinha vergonha',
          'Comeu todos os meus doces',
          'Me deu um susto no meio da rua',
        ],
        correta: 0,
        acerto: 'Hahaha, isso mesmo! Olha só...',
      },
    ],
  },
});
