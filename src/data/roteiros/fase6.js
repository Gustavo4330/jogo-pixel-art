/* =========================================================
   FASE 6 — O PEDIDO 💍 (19 de novembro)
   ---------------------------------------------------------
   Um piquenique simples. Ela senta do lado dele, ele tira a
   aliança e pergunta: "Quer namorar comigo?" (Sim / Não).
   No "Sim": comemoração e o presente com a carta (src/data/
   carta.js), com botões para ela tirar uma foto ou gravar um
   vídeo com a câmera do celular.
   Passos novos desta fase:
     { sentar: { ela: [x, y] } }   (senta no banco)
     { pedido: true }              (a pergunta com Sim / Não)
     { presente: true }            (o presente com a carta e o vídeo)
   ========================================================= */

Object.assign(ROTEIROS, {
  f6_pedido: [
    {
      passos: [
        { esperar: 500 },
        { quem: 'narrador', fala: '19 de novembro. Exatamente 2 meses depois do nosso primeiro date. O sol está se pondo... ♥' },
        { quem: 'ele', fala: 'Amor... preparei esse piquenique só pra gente.', rosto: 'feliz' },
        { quem: 'ela', fala: 'Que lindo, amor! 🥹', rosto: 'timido' },
        { quem: 'ele', fala: 'Eu preciso te perguntar uma coisa muito importante...', rosto: 'timido' },
        { item: 'ring', titulo: 'A aliança 💍', texto: 'O Gustavo tirou do bolso uma aliança...' },
        { pedido: true },
        { coracoes: true },
        { presente: true },
        { marcar: 'fase6_concluida' },
        { concluirFase: 6 },
      ],
    },
  ],
});
