/* =========================================================
   FASE 2 — PRIMEIRO BEIJO: diálogos e quiz
   ---------------------------------------------------------
   Na escada de incêndio da escola. Os dois se beijam, mas
   não conseguem sair porque tem gente do lado de fora...
   e precisam ligar para o Felipe e a Sofia irem resgatar.

   Os tipos de passo estão explicados em roteiros/fase1.js.
   Passos novos desta fase:
     { beijo: 'Texto que aparece na tela' }
     { transicao: 'Texto', posicoes: { ela: [x, y, 'up'], ele: [x, y, 'up'] } }
         (troca os personagens de lugar enquanto a tela está coberta)
     { ligacao: 'Felipe' }          (tela de celular chamando)
     { aparecer: 'felipe' }         (personagem escondido entra em cena)
   ========================================================= */

Object.assign(ROTEIROS, {
  f2_intro: [
    {
      passos: [
        { quem: 'ela', fala: 'Ele disse que ia me esperar na escada de incêndio...', rosto: 'timido' },
        { quem: 'narrador', fala: 'Suba a escada e siga a setinha rosa.' },
        { marcar: 'f2_intro' },
      ],
    },
  ],

  f2_ele: [
    {
      se: 'fase2_concluida',
      passos: [
        { quem: 'ele', fala: 'Melhor escada de incêndio do mundo, vida. ♥', rosto: 'timido' },
      ],
    },
    {
      passos: [
        { olhar: 'ele', para: 'jogador' },
        { quem: 'ele', fala: 'Achei que você não vinha, vida.', rosto: 'feliz' },
        { quem: 'ela', fala: 'Claro que eu vinha, baby.', rosto: 'timido' },
        { andar: 'ele', ate: 'jogador', distancia: 11 },
        { beijo: 'O nosso primeiro beijo' },
        { marcar: 'f2_beijou' },
        { quem: 'ela', fala: 'Uau...', rosto: 'timido' },
        { quem: 'ele', fala: 'Mais um?', rosto: 'feliz' },
        { beijo: 'E mais um... ♥' },

        // gente do lado de fora da porta
        { quem: 'vozes', fala: '"Bora esperar aqui na porta mesmo!"' },
        { emocao: 'ela', tipo: 'exclamacao' },
        { quem: 'ela', fala: 'Baby... tem gente na porta!', rosto: 'surpreso' },
        { quem: 'ele', fala: 'Hahaha, pronto. Tamo presos, vida!', rosto: 'feliz' },
        { quem: 'ela', fala: 'Para de rir! Como a gente sai daqui?', rosto: 'feliz' },
        { quem: 'ele', fala: 'Calma... vou ligar pro Felipe.', rosto: 'normal' },
        { ligacao: 'Felipe' },
        { quem: 'felipe', fala: 'Na escada de incêndio?! Hahaha! Tô indo com a Sofia.', rosto: 'feliz' },
        { transicao: 'Alguns minutos depois...', posicoes: { felipe: [12.2, 7.2, 'down'], amiga: [14, 7.2, 'down'] } },
        { aparecer: 'felipe' },
        { aparecer: 'amiga' },
        { quem: 'amiga', fala: 'Barra limpa! Bora, bora!', rosto: 'feliz' },
        { quem: 'felipe', fala: 'Vocês me devem uma, hein!', rosto: 'feliz' },
        { quem: 'ele', fala: 'Vida, lembra de tudo desse dia?', rosto: 'feliz' },
        { quiz: 'f2_quiz' },
        { quem: 'ele', fala: 'Melhor escada de incêndio do mundo. ♥', rosto: 'feliz' },
        { coracoes: true },
        { marcar: 'fase2_concluida' },
        { concluirFase: 2 },
      ],
    },
  ],

  // Falas se ela conversar com eles depois que aparecerem
  f2_felipe: [{ passos: [{ quem: 'felipe', fala: 'Da próxima vez escolham um lugar com duas saídas, por favor! Hahaha' }] }],
  f2_amiga: [{ passos: [{ quem: 'amiga', fala: 'Eu não acredito que vocês ficaram presos na escada de incêndio! ♥', rosto: 'feliz' }] }],
});

Object.assign(QUIZZES, {
  f2_quiz: {
    quem: 'ele',
    embaralhar: true,
    erro: [
      'Hmm... não foi bem assim, vida! Tenta de novo ♥',
      'Quase! Pensa naquele dia...',
    ],
    perguntas: [
      {
        pergunta: 'Onde foi o nosso primeiro beijo?',
        opcoes: ['Na escada de incêndio', 'No pátio da escola', 'Na porta da sala'],
        correta: 0,
        acerto: 'Isso! Na nossa escada de incêndio. ♥',
      },
      {
        pergunta: 'Por que a gente não conseguia sair de lá?',
        opcoes: ['Tinha gente do lado de fora', 'A porta estava trancada', 'A gente se perdeu'],
        correta: 0,
        acerto: 'Exatamente! Ficamos presos, hahaha.',
      },
      {
        pergunta: 'Quem foi tirar a gente de lá?',
        opcoes: ['O Felipe e a Sofia', 'O diretor da escola', 'Ninguém, fugimos sozinhos'],
        correta: 0,
        acerto: 'Isso! Nossos salvadores. ♥',
      },
    ],
  },
});
