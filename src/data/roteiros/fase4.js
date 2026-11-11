/* =========================================================
   FASE 4 — CONHECENDO A SUA FAMÍLIA (12 de outubro)
   ---------------------------------------------------------
   Churrasco no quintal com a família da Bia, a foto do
   Gustavo com a vó, e depois um sorvete na sorveteria.
   Roupas desta fase (em fases.js): Gustavo com a camisa de
   Portugal; Bia de top marrom e shorts jeans branco.
   Passos novos desta fase:
     { foto: ['ele', 'vo'], legenda: 'Texto da polaroid' }
     { virar: { ele: 'down', vo: 'down' } }
     { escolha: 'Pergunta', opcoes: [...], respostas: ['Resposta ({opcao})'] }
     { colo: [x, y] }               (ela sentada no colo dele)
   ========================================================= */

Object.assign(ROTEIROS, {
  f4_intro: [
    {
      passos: [
        { quem: 'narrador', fala: '12 de outubro. O dia em que o Gustavo conheceu a sua família. ♥' },
        { quem: 'ela', fala: 'O cheiro do churrasco já tá na casa inteira...', rosto: 'feliz' },
        { marcar: 'f4_intro' },
      ],
    },
  ],

  /* ---- o churrasco ---- */
  f4_churrasco: [
    {
      se: 'f4_churrasco',
      passos: [{ quem: 'narrador', fala: 'Ainda tem muita carne na bancada. Ninguém vai passar fome hoje!' }],
    },
    {
      passos: [
        { quem: 'mae', fala: 'Senta, Gustavo, fica à vontade!', rosto: 'feliz' },
        { quem: 'ele', fala: 'Obrigado! Tá com um cheiro incrível.', rosto: 'feliz' },
        { item: 'churrasco', titulo: 'Churrasco!', texto: 'Picanha, linguiça, farofa e pão de alho. Todo mundo junto na mesa.' },
        { quem: 'vo', fala: 'Ah, meu filho... eu não ouço tão bem, tá bom?', rosto: 'normal' },
        { quem: 'ele', fala: 'Sem problema nenhum, Raquel! Eu repito pertinho de você se precisar.', rosto: 'feliz' },
        { emocao: 'vo', tipo: 'coracao' },
        { quem: 'ela', fala: 'Viu, amor? A vó Raquel já gostou de você!', rosto: 'feliz' },
        { emocao: 'ele', tipo: 'coracao' },
        { marcar: 'f4_churrasco' },
      ],
    },
  ],

  /* ---- a foto com a vó (falando com a vó ou com o Gustavo) ---- */
  f4_foto: [
    {
      se: 'f4_foto',
      passos: [{ quem: 'vo', fala: 'Depois me manda aquela foto, viu, minha filha?', rosto: 'feliz' }],
    },
    {
      se: 'f4_churrasco',
      passos: [
        { quem: 'ela', fala: 'Amor, vem cá! Deixa eu tirar uma foto sua com a vó Raquel.', rosto: 'feliz' },
        { quem: 'vo', fala: 'Ai, que bom! Vem cá, meu filho.', rosto: 'feliz' },
        { andar: 'ele', ate: 'vo', distancia: 13 },
        { virar: { ele: 'down', vo: 'down' } },
        { quem: 'ela', fala: 'Diz xis!', rosto: 'feliz' },
        { foto: ['ele', 'vo'], legenda: 'Gustavo e a vó Raquel ♥ — 12/10' },
        { quem: 'vo', fala: 'Ficou linda! Depois me manda essa foto.', rosto: 'feliz' },
        { marcar: 'f4_foto' },
        { quem: 'ele', fala: 'Amor, bora tomar um sorvete?', rosto: 'feliz' },
        { quem: 'ela', fala: 'Bora!', rosto: 'feliz' },
        { mudarMapa: 'sorveteria', spawn: 'entrada', texto: 'Mais tarde, na sorveteria...' },
      ],
    },
    {
      passos: [{ quem: 'vo', fala: 'Vai lá pegar o churrasco na bancada, minha filha. Tô morrendo de fome!', rosto: 'feliz' }],
    },
  ],

  f4_mae: [
    { passos: [{ quem: 'mae', fala: 'Que bom te ver feliz assim, filha. Ele é um amor!', rosto: 'feliz' }] },
  ],

  /* ---- a sorveteria ---- */
  f4_sorvete: [
    {
      passos: [
        { olhar: 'ele', para: 'jogador' },
        { quem: 'ele', fala: 'Vou de skimo! E você, amor?', rosto: 'feliz' },
        { quem: 'ela', fala: 'Chocolate, claro!', rosto: 'feliz' },
        { item: 'sorvetes', titulo: 'Sorvete!', texto: 'Um skimo pra ele e um de chocolate pra ela.' },
        { marcar: 'f4_sorvete' },
        { quem: 'ele', fala: 'Bora comer lá fora?', rosto: 'feliz' },
        { quem: 'ela', fala: 'Bora!', rosto: 'feliz' },
        { mudarMapa: 'calcada_sorvete', spawn: 'inicio', texto: 'Lá fora, sentados na calçada...' },
      ],
    },
  ],

  /* ---- na calçada: ela no colo dele ---- */
  f4_calcada: [
    {
      passos: [
        { colo: [10, 5.75] },
        { esperar: 600 },
        { quem: 'ela', fala: 'Hmm... esse chocolate tá perfeito.', rosto: 'feliz' },
        { quem: 'ele', fala: 'Quer provar meu skimo, amor?', rosto: 'feliz' },
        { quem: 'ela', fala: 'Quero!', rosto: 'feliz' },
        { emocao: 'ela', tipo: 'coracao' },
        { quem: 'ele', fala: 'Sua família é incrível, amor.', rosto: 'feliz' },
        { quem: 'ela', fala: 'E eles amaram você. ♥', rosto: 'timido' },
        { quem: 'ele', fala: 'Agora me diz: lembra de tudo desse dia?', rosto: 'feliz' },
        { quiz: 'f4_quiz' },
        { quem: 'ele', fala: 'Foi o dia em que eu ganhei uma segunda família. ♥', rosto: 'timido' },
        { coracoes: true },
        { marcar: 'fase4_concluida' },
        { concluirFase: 4 },
      ],
    },
  ],
});

// Falar com o Gustavo depois do churrasco também começa a cena da foto
ROTEIROS.f4_ele = [
  ROTEIROS.f4_foto[1],
  { passos: [{ quem: 'ele', fala: 'Amor, o churrasco já tá saindo lá na bancada!', rosto: 'feliz' }] },
];

Object.assign(QUIZZES, {
  f4_quiz: {
    quem: 'ele',
    embaralhar: true,
    erro: ['Hmm... não foi bem assim, amor! Tenta de novo ♥', 'Quase! Lembra daquele dia...'],
    perguntas: [
      {
        pergunta: 'Em que dia eu conheci a sua família?',
        opcoes: ['12 de outubro', '19 de setembro', '31 de outubro'],
        correta: 0,
        acerto: 'Isso! 12 de outubro. ♥',
      },
      {
        pergunta: 'Você tirou uma foto minha com quem?',
        opcoes: ['Com a vó Raquel', 'Com o meu pai', 'Com a minha mãe'],
        correta: 0,
        acerto: 'Com a vó Raquel! A foto mais fofa. ♥',
      },
      {
        pergunta: 'Qual sorvete cada um pediu?',
        opcoes: ['Skimo pra mim e chocolate pra você', 'Morango pra mim e flocos pra você', 'Os dois de baunilha'],
        correta: 0,
        acerto: 'Isso! Skimo e chocolate.',
      },
      {
        pergunta: 'E onde a gente tomou o sorvete?',
        opcoes: ['Sentados na calçada, você no meu colo', 'Numa mesinha lá dentro', 'Andando pelo shopping'],
        correta: 0,
        acerto: 'Na calçada, juntinhos. ♥',
      },
    ],
  },
});
