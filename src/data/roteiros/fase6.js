/* =========================================================
   FASE 6 — O PEDIDO 💍 (19 de novembro)
   ---------------------------------------------------------
   Um piquenique simples. Ela senta do lado dele, ele tira a
   aliança e pergunta: "Quer namorar comigo?" (Sim / Não).
   No "Sim": comemoração, o presente com a carta (src/data/
   carta.js) e o vídeo (CONFIG.videoPedido).
   Passos novos desta fase:
     { sentar: { ela: [x, y] } }   (senta no banco)
     { pedido: true }              (a pergunta com Sim / Não)
     { presente: true }            (o presente com a carta e o vídeo)
   ========================================================= */

Object.assign(ROTEIROS, {
  f6_intro: [
    {
      passos: [
        { quem: 'narrador', fala: '19 de novembro. Exatamente 2 meses depois do nosso primeiro date. ♥' },
        { quem: 'ela', fala: 'Ele disse pra eu encontrar ele aqui...', rosto: 'timido' },
        { marcar: 'f6_intro' },
      ],
    },
  ],

  f6_pedido: [
    {
      passos: [
        { sentar: { ela: [12.3, 8.6] } },
        { esperar: 700 },
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
