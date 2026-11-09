# Nossa História ♥ — Uma aventura a dois

Um RPG 2D em pixel art, feito para ser jogado no celular pelo navegador,
contando a nossa história fase por fase até o grande pedido.

**Status:** Fases 1 (Primeiro Flerte) e 2 (Primeiro Beijo) jogáveis. Fases 3 a 6
aparecem como "em breve" / bloqueadas.

## Como jogar / testar

- **No computador:** abra o arquivo `index.html` no navegador (dois cliques).
  - Setas ou WASD para andar · Espaço / Enter / Z para interagir.
- **No celular:** publique o jogo (veja abaixo) e abra o link.
  - Direcional à esquerda · botão **A** à direita · toque na caixa de diálogo
    para avançar.
- O progresso é salvo automaticamente no navegador.
- Para recomeçar: Mapa das Memórias → "Recomeçar do zero".
- **Modo criador (só para você):** na tela inicial, toque **5 vezes seguidas** no
  título "Nossa História". Todas as fases ficam liberadas naquele aparelho e o
  nome da fase final aparece. Toque 5 vezes de novo para desligar. Para liberar
  para todo mundo, use `liberarTodasFases: true` em `src/data/config.js`.
- Ao entrar numa fase pelo mapa, a cena dela recomeça do início.

## Publicar de graça (GitHub Pages)

1. No GitHub, abra o repositório → **Settings** → **Pages**.
2. Em *Source*, escolha **Deploy from a branch**.
3. Escolha a branch (ex.: `main`) e a pasta `/ (root)` → **Save**.
4. Em 1 ou 2 minutos aparece o link `https://SEU-USUARIO.github.io/jogo-pixel-art/`.

Não precisa instalar nada: o Phaser já está incluído em `lib/`.

## Onde editar cada coisa

| Quero mudar... | Arquivo |
|---|---|
| Nomes que aparecem nos diálogos, velocidade, zoom | `src/data/config.js` |
| Cores dos personagens (pele, cabelo, roupa) | `src/data/personagens.js` |
| Falas e perguntas do quiz da Fase 1 | `src/data/roteiros/fase1.js` |
| Nome/data das fases, quais estão disponíveis | `src/data/fases.js` |
| Roupas de cada personagem em cada fase | `roupas` em `src/data/fases.js` |
| Falas e quiz da Fase 2 | `src/data/roteiros/fase2.js` |
| Memórias bônus (estrelinhas) | `src/data/bonus.js` |
| Layout dos mapas (onde ficam paredes, objetos, NPCs) | `src/data/maps/*.js` |
| Dicas / objetivos e a seta rosa | `objetivos` dentro de cada mapa |
| Música própria (mp3) | `src/systems/AudioSystem.js` → `MUSICA_ARQUIVO` |

### Como funciona um mapa

Cada mapa é um "desenho com letras": cada letra é um quadradinho de 16×16 px.
A `legenda` diz o desenho de cada letra, se ela é sólida (parede), se é uma
porta para outro mapa ou se tem um texto ao interagir.

```js
legenda: {
  '.': { tile: 'piso_patio' },                       // chão comum
  h:   { tile: 'cerca_viva', solido: true },          // não dá para atravessar
  d:   { tile: 'porta_vidro', porta: { para: 'escola_corredor', spawn: 'entrada' } },
  W:   { tile: 'janela_baixa', solido: true, texto: 'Texto ao interagir' },
},
```

Objetos, personagens e estrelas usam posições `x, y` em tiles (pode usar
decimais). Ative `debug: true` em `config.js` para ver as áreas de colisão.

### Como funciona um roteiro (diálogo)

```js
f1_amiga: [
  { se: 'fase1_concluida', passos: [ { quem: 'amiga', fala: 'Eu sabia!' } ] },
  { passos: [
      { quem: 'amiga', fala: 'Ele está bem ali!', rosto: 'feliz' },
      { marcar: 'f1_falou_amiga' },
  ] },
],
```

O jogo usa a primeira variação cuja condição `se` for verdadeira. Os tipos de
passo estão listados no topo de `src/data/roteiros/fase1.js`.

## Estrutura

```
index.html          página do jogo (carrega todos os scripts)
style.css           visual da interface (diálogos, menus, botões)
main.js             inicia o Phaser e o menu de pausa
lib/phaser.min.js   biblioteca de jogos Phaser 3.80.1
assets/             fotos, músicas, vídeo final (para as próximas etapas)
docs/PLANO.md       direção artística e planejamento
src/
  data/             TEXTOS E DADOS — o que você mais vai editar
    config.js         nomes e ajustes gerais
    personagens.js    cores/visual dos personagens
    fases.js          lista das 6 fases
    bonus.js          memórias bônus
    objetos.js        catálogo de objetos dos mapas
    registro.js       "gavetas" de mapas/roteiros/quizzes
    maps/             um arquivo por mapa
    roteiros/         diálogos e quizzes de cada fase
  art/              pixel art gerada por código
    pixel.js          ferramentas de desenho
    characters.js     sprites e retratos
    tiles.js          chão, paredes, portas, janelas
    objects.js        árvores, bancos, mesas, itens, ícones
    ArtFactory.js     transforma os desenhos em texturas
  systems/          lógica do jogo
    SaveSystem.js     salvar progresso
    AudioSystem.js    efeitos e música 8-bit
    Controls.js       teclado + toque
    MapBuilder.js     monta os mapas e as colisões
    ScriptRunner.js   executa os roteiros
  ui/UI.js          diálogos, quiz, janelas, HUD
  characters/       classe dos personagens (andar, olhar, animar)
  scenes/           Boot (carrega), Menu (título/fases), World (exploração)
```

## Como adicionar uma nova fase (resumo)

1. Crie `src/data/maps/novo_mapa.js` (copie um existente como modelo).
2. Crie `src/data/roteiros/faseN.js` com as falas e o quiz.
3. Inclua os dois arquivos no `index.html` (junto dos outros `src/data`).
4. Em `src/data/fases.js`, preencha `mapa`, `spawn` e `disponivel: true`.
5. No roteiro final da fase, use `{ marcar: 'faseN_concluida' }` e `{ concluirFase: N }`.
