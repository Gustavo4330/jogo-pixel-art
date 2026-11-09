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
        { quem: 'narrador', fala: 'Fim de aula. A escada de incêndio estava vazia e silenciosa...' },
        { quem: 'ela', fala: 'Ele disse que ia me esperar lá na escada...', rosto: 'timido' },
        { quem: 'narrador', fala: 'Suba a escada de incêndio e siga a setinha rosa.' },
        { marcar: 'f2_intro' },
      ],
    },
  ],

  f2_ele: [
    {
      se: 'fase2_concluida',
      passos: [
        { quem: 'ele', fala: 'Toda vez que eu vejo uma escada de incêndio, eu lembro de você, vida. ♥', rosto: 'timido' },
      ],
    },
    {
      passos: [
        { olhar: 'ele', para: 'jogador' },
        { quem: 'ele', fala: 'Achei que você não vinha, vida.', rosto: 'feliz' },
        { quem: 'ela', fala: 'Claro que eu vinha, baby. Mas que escada, hein!', rosto: 'feliz' },
        { quem: 'ele', fala: 'Vem cá...', rosto: 'timido' },
        { andar: 'ele', ate: 'jogador', distancia: 11 },
        { quem: 'ela', fala: 'Aqui ninguém vê a gente...', rosto: 'timido' },
        { quem: 'ele', fala: 'Essa é a ideia.', rosto: 'feliz' },
        { beijo: 'O nosso primeiro beijo' },
        { marcar: 'f2_beijou' },
        { quem: 'ela', fala: 'Uau...', rosto: 'timido' },
        { quem: 'ele', fala: 'Pois é...', rosto: 'timido' },
        { quem: 'ela', fala: 'Faz de novo?', rosto: 'feliz' },
        { quem: 'ele', fala: 'Quantas vezes você quiser, vida.', rosto: 'feliz' },
        { beijo: 'E de novo... e de novo...' },

        // ainda dentro da escada de incêndio: gente do lado de fora da porta
        { quem: 'vozes', fala: '"Bora esperar aqui na porta mesmo?" "Bora, tô sem pressa nenhuma!"' },
        { emocao: 'ela', tipo: 'exclamacao' },
        { olhar: 'ela', para: 'ele' },
        { quem: 'ela', fala: 'Baby... tem gente bem do lado da porta!', rosto: 'surpreso' },
        { quem: 'ele', fala: 'Hahaha! Pronto, vida. A gente tá preso na escada de incêndio.', rosto: 'feliz' },
        { quem: 'ela', fala: 'Hahaha, para! Não tem graça! Como a gente vai sair daqui?', rosto: 'feliz' },
        { quem: 'ele', fala: 'Se a gente abrir aquela porta agora, todo mundo vai ver...', rosto: 'timido' },
        { quem: 'ela', fala: 'E vai todo mundo saber o que a gente tava fazendo! Hahaha', rosto: 'timido' },
        { quem: 'ele', fala: 'Calma, calma... já sei. Vou ligar pro Felipe.', rosto: 'normal' },
        { ligacao: 'Felipe' },
        { quem: 'felipe', fala: 'Alô? Vocês tão ONDE?! Na escada de incêndio?! Hahaha!', rosto: 'feliz' },
        { quem: 'ele', fala: 'Fala baixo! Tem gente na porta e a gente não consegue sair.', rosto: 'timido' },
        { quem: 'felipe', fala: 'Tá bom, tá bom. Vou chamar a Sofia e a gente tira vocês daí.', rosto: 'normal' },
        { transicao: 'Alguns minutos depois...', posicoes: { felipe: [12.2, 7.2, 'down'], amiga: [14, 7.2, 'down'] } },
        { aparecer: 'felipe' },
        { aparecer: 'amiga' },
        { quem: 'narrador', fala: 'O Felipe e a Sofia desceram a escada de incêndio pela porta lá de cima.' },
        { quem: 'amiga', fala: 'Pronto, barra limpa! A gente levou todo mundo lá pra fora.', rosto: 'feliz' },
        { quem: 'felipe', fala: 'Vocês me devem uma, hein!', rosto: 'feliz' },
        { quem: 'ela', fala: 'Obrigada, gente! ♥', rosto: 'feliz' },
        { quem: 'narrador', fala: 'E foi assim que o Felipe e a Sofia salvaram o nosso primeiro beijo.' },
        { quem: 'ele', fala: 'Vida, será que você lembra de tudo desse dia?', rosto: 'feliz' },
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
