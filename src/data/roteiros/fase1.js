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
     { andar: 'ele', ate: 'jogador' }     (anda até ficar ao lado)
     { transicao: 'Alguns minutos depois...' }
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
        { quem: 'ele', fala: 'Oi, Bia! Tudo bem?', rosto: 'feliz' },
        { quem: 'ela', fala: 'Oi, Gustavo... Mais ou menos. Estou com problemas para fazer uns slides.', rosto: 'timido' },
        { quem: 'ela', fala: 'Já tentei de tudo e não consigo deixar do jeito certo...', rosto: 'timido' },
        { quem: 'amiga', fala: 'Ela está nisso desde cedo, coitada!' },
        { quem: 'ele', fala: 'Deixa comigo! Eu te ajudo.', rosto: 'feliz' },
        { andar: 'ele', ate: 'jogador', distancia: 12 },
        { emocao: 'ela', tipo: 'coracao' },
        { quem: 'narrador', fala: 'Ele chegou bem pertinho de você... pertinho até demais. ♥' },
        { quem: 'ela', fala: '(Ele está tão perto...)', rosto: 'timido' },
        { quem: 'ele', fala: 'Olha, é só arrumar assim... colocar isso aqui... e pronto!', rosto: 'normal' },
        { transicao: 'Alguns slides depois...' },
        { quem: 'ela', fala: 'Ficou perfeito! Muito obrigada, Gustavo!', rosto: 'feliz' },
        { quem: 'ela', fala: 'Toma, uma Tortuguita pra você. Como agradecimento!', rosto: 'feliz' },
        { quem: 'ele', fala: 'Ah, não precisa não, Bia. Obrigado!', rosto: 'normal' },
        { quem: 'ela', fala: 'Não precisa? Hmm...', rosto: 'normal' },
        { emocao: 'ela', tipo: 'exclamacao' },
        { item: 'tortuguita', titulo: 'Tortuguita!', texto: 'A Bia não aceitou o "não" e enfiou a Tortuguita na boca do Gustavo!' },
        { quem: 'ele', fala: 'Mmmmf?! ...', rosto: 'surpreso' },
        { quem: 'amiga', fala: 'HAHAHA, eu não acredito que você fez isso, Bia!', rosto: 'feliz' },
        { emocao: 'ele', tipo: 'coracao' },
        { quem: 'narrador', fala: 'E foi assim, com uma Tortuguita à força, que aconteceu o nosso primeiro flerte. ♥' },
        { quem: 'ele', fala: 'Agora me responde uma coisa...', rosto: 'feliz' },
        { quiz: 'f1_quiz' },
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
    embaralhar: false, // mantém as alternativas na ordem escrita
    perguntas: [
      {
        pergunta: 'Quem fez o primeiro flerte?',
        opcoes: ['Eu', 'Você'],
        correta: 1, // índice da alternativa certa (0 = primeira, 1 = segunda)
        acerto: 'Isso mesmo! Foi VOCÊ. E eu adorei. ♥',
        erro: [
          'Eu?! Quem enfiou uma Tortuguita na minha boca foi você! Tenta de novo ♥',
          'Hmm... pensa bem em quem estava segurando a Tortuguita...',
        ],
      },
    ],
  },
});
