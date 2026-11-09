/* =========================================================
   FASE 1 — PRIMEIRO FLERTE: diálogos e quiz
   ---------------------------------------------------------
   Aqui ficam todos os textos da fase. Edite à vontade!

   Cada roteiro é uma lista de "variações". O jogo usa a
   primeira variação cuja condição ('se') for verdadeira.
   Uma variação sem 'se' é a padrão.

   Passos que você pode usar:
     { quem: 'ele', fala: 'Texto', rosto: 'feliz' }
         rosto: 'normal' | 'feliz' | 'timido' | 'surpreso'
     { quem: 'narrador', fala: 'Texto' }
     { item: 'tortuguita', titulo: '...', texto: '...' }
     { emocao: 'ele', tipo: 'coracao' }   (ou 'exclamacao')
     { olhar: 'ele', para: 'jogador' }
     { quiz: 'id_do_quiz' }
     { marcar: 'nome_da_flag' }           (lembra que algo aconteceu)
     { esperar: 500 }                     (milissegundos)
     { coracoes: true }                   (chuva de corações)
     { concluirFase: 1 }
   ========================================================= */

Object.assign(ROTEIROS, {
  /* ---- ao chegar na frente da escola (só na primeira vez) ---- */
  f1_intro: [
    {
      passos: [
        { quem: 'narrador', fala: 'Tudo começou aqui... na escola. ♥' },
        { quem: 'ela', fala: 'Nossa, quantas lembranças esse lugar guarda...', rosto: 'feliz' },
        { quem: 'narrador', fala: 'Use o direcional para andar e o botão A para conversar e examinar as coisas.' },
        { quem: 'narrador', fala: 'Dica: siga a setinha rosa! Ela sempre mostra para onde você deve ir.' },
        { quem: 'narrador', fala: 'Agora suba pelo caminho de cascalho e entre no prédio pela passagem do meio, entre os pilares.' },
        { marcar: 'f1_intro' },
      ],
    },
  ],

  /* ---- ao entrar no corredor (só na primeira vez) ---- */
  f1_corredor: [
    {
      passos: [
        { quem: 'ela', fala: 'O corredor... parece igualzinho àquele dia.', rosto: 'timido' },
        { quem: 'ela', fala: 'O Gustavo deve estar por aqui em algum lugar...' },
        { quem: 'narrador', fala: 'Dica: ande pelo corredor para a direita. O Gustavo e a Sofia estão perto das mesas.' },
        { marcar: 'f1_corredor' },
      ],
    },
  ],

  /* ---- a Sofia ---- */
  f1_amiga: [
    {
      se: 'fase1_concluida',
      passos: [
        { quem: 'amiga', fala: 'Eu sabia! Eu SABIA que ia dar namoro! Hahaha ♥', rosto: 'feliz' },
      ],
    },
    {
      passos: [
        { quem: 'amiga', fala: 'Bia! O Gustavo está bem aqui do meu lado, olha.', rosto: 'feliz' },
        { quem: 'amiga', fala: 'Você não ia pedir ajuda com aqueles slides? Vai lá falar com ele!' },
        { marcar: 'f1_falou_amiga' },
      ],
    },
  ],

  /* ---- GUSTAVO: a cena principal da fase ---- */
  f1_ele: [
    {
      se: 'fase1_concluida',
      passos: [
        { quem: 'ele', fala: 'Até hoje eu sinto o gosto daquela Tortuguita... ♥', rosto: 'feliz' },
      ],
    },
    {
      passos: [
        { olhar: 'ele', para: 'jogador' },
        { emocao: 'ele', tipo: 'exclamacao' },
        { quem: 'ele', fala: 'Ah, oi, Bia! Você por aqui?', rosto: 'surpreso' },
        { quem: 'ela', fala: 'Oi, Gustavo! Lembra deste lugar?', rosto: 'feliz' },
        { quem: 'ele', fala: 'Como eu ia esquecer? Foi aqui que tudo começou...', rosto: 'feliz' },
        { quem: 'narrador', fala: 'Naquele dia, o Gustavo encontrou você e a Sofia conversando na escola.' },
        { quem: 'amiga', fala: 'Gustavo, a Bia está desesperada com uns slides, sabia?' },
        { quem: 'ela', fala: 'Eu preciso muito de ajuda com uns slides...', rosto: 'timido' },
        { quem: 'ele', fala: 'Eu posso te ajudar! Sou ótimo com slides.', rosto: 'feliz' },
        { quem: 'ela', fala: 'Sério?! Então toma... um presente pra você!', rosto: 'feliz' },
        { item: 'tortuguita', titulo: 'Tortuguita!', texto: 'A Bia colocou uma Tortuguita na boca do Gustavo. À força. Sem aviso.' },
        { quem: 'ele', fala: 'Mmmmf?! ...Isso é chocolate?!', rosto: 'surpreso' },
        { emocao: 'ele', tipo: 'coracao' },
        { quem: 'narrador', fala: 'E foi assim, com uma Tortuguita, que aconteceu o nosso primeiro flerte. ♥' },
        { quem: 'ele', fala: 'Mas será que você lembra de todos os detalhes daquele dia?', rosto: 'normal' },
        { quem: 'ele', fala: 'Vamos ver! Responda certinho para concluir a fase.', rosto: 'feliz' },
        { quiz: 'f1_quiz' },
        { quem: 'ele', fala: 'Você lembra de tudo... Isso me deixa muito feliz.', rosto: 'feliz' },
        { quem: 'ele', fala: 'Aquela Tortuguita foi o começo da melhor história da minha vida. ♥', rosto: 'timido' },
        { coracoes: true },
        { marcar: 'fase1_concluida' },
        { concluirFase: 1 },
      ],
    },
  ],
});

Object.assign(QUIZZES, {
  f1_quiz: {
    quem: 'ele',
    embaralhar: true, // embaralha a ordem das alternativas
    erro: [
      'Hmm... acho que não foi bem assim! Tenta de novo ♥',
      'Errou! Mas eu deixo você tentar outra vez.',
      'Quase! Pensa mais um pouquinho...',
    ],
    perguntas: [
      {
        pergunta: 'Com o que você precisava de ajuda naquele dia?',
        opcoes: ['Uns slides', 'Uma prova de matemática', 'Um trabalho de artes'],
        correta: 0, // índice da alternativa certa (0 = primeira)
        acerto: 'Isso! Os famosos slides. ♥',
      },
      {
        pergunta: 'Quem estava conversando com a gente?',
        opcoes: ['A Sofia', 'O diretor da escola', 'Ninguém, só nós dois'],
        correta: 0,
        acerto: 'Exatamente! A Sofia foi testemunha de tudo.',
      },
      {
        pergunta: 'E o que você colocou, à força, na minha boca?',
        opcoes: ['Uma Tortuguita', 'Um brigadeiro', 'Uma bala de menta'],
        correta: 0,
        acerto: 'A lendária Tortuguita! O nosso primeiro flerte. ♥',
        erro: ['Não, não! Era de chocolate... e tinha formato de bichinho!', 'Hmm, não. Pensa num chocolate em forma de tartaruga...'],
      },
    ],
  },
});
