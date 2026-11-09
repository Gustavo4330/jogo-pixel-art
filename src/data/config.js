/* =========================================================
   CONFIGURAÇÕES GERAIS — comece por aqui!
   Troque os nomes e textos à vontade.
   ========================================================= */

const CONFIG = {
  titulo: 'Nossa História',
  versao: '9', // aparece pequenininho na tela inicial (para conferir se o jogo atualizou)
  subtitulo: 'Uma aventura a dois',

  // Nomes que aparecem nas caixas de diálogo.
  // Dica: coloque os apelidos de vocês (ex.: 'Amor', 'Mozão', o nome dela...).
  nomeDela: 'Bia',
  nomeDele: 'Gustavo',

  // Velocidade da personagem (pixels por segundo).
  velocidade: 74,

  // Velocidade do texto dos diálogos (milissegundos por letra).
  velocidadeTexto: 28,

  // Quantos "tiles" (quadradinhos de 16px) aparecem, no mínimo,
  // no menor lado da tela. Menor número = zoom maior.
  tilesVisiveis: 11,

  // true = todas as fases ficam liberadas para todo mundo.
  // Dica: em vez disso, use o MODO CRIADOR secreto — na tela inicial,
  // toque 5 vezes seguidas no título "Nossa História". Ele libera todas
  // as fases só no aparelho em que você ativou (toque 5x de novo para desligar).
  liberarTodasFases: false,

  // true = mostra as caixas de colisão (útil para ajustar mapas).
  debug: false,
};
