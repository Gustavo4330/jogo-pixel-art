/* =========================================================
   MEMÓRIAS BÔNUS — estrelinhas escondidas nos mapas.

   Para criar uma nova:
   1) Adicione um item aqui (o id é o nome antes dos dois-pontos).
   2) No arquivo do mapa, em "bonus", coloque { id: 'seu_id', x, y }.
   3) (Opcional) coloque uma foto em assets/fotos/ e preencha "foto".
   ========================================================= */

const BONUS = {
  aniversario: {
    titulo: '24 de setembro ♥',
    texto: 'O meu aniversário! Cada ano fica melhor desde que você chegou. Obrigado por tornar esse dia tão especial.',
    foto: null, // ex.: 'assets/fotos/aniversario.jpg'
  },
  sebrasse: {
    titulo: 'A viagem para o SebrasSE',
    texto: 'A viagem da escola que virou uma das nossas melhores lembranças. (Escreva aqui o que aconteceu de mais especial nesse dia!)',
    foto: null,
  },
};
