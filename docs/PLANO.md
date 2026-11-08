# Nossa História — Etapa 1: planejamento visual e técnico

> Observação: até agora recebi **duas imagens de referência** (a cena da escola
> e a folha de conceito com personagens, interface e cenários). As **fotos reais**
> (de vocês dois, da fachada e do corredor) ainda não chegaram. Quando chegarem,
> eu ajusto as cores dos personagens e os mapas para ficarem fiéis aos lugares de
> verdade. Tudo foi feito para ser fácil de ajustar.

## 1. Direção artística

- **Estilo:** RPG indie 2D em pixel art, visão de cima (top-down), tiles de
  16×16 px, personagens chibi de 16×24 px com contorno escuro (`#2a1730`).
- **Paleta:** rosa (`#ff6fae`, `#e2468f`), roxo (`#4a2147`, `#2b1430`),
  branco-rosado (`#fff6fb`) e tons escuros para contraste. Os cenários usam
  cores naturais (verde, creme, azul) levemente puxadas para o lilás, para
  combinar com a interface.
- **Romantismo discreto:** corações aparecem na interface (nomes, botões,
  progresso do quiz), em adesivos na porta da escola, no mural e nas memórias
  bônus — sem poluir os cenários.
- **Interface:** caixas de diálogo roxas com borda rosa e retrato do personagem
  (como na referência), fonte pixelada *Pixelify Sans*, janelas em "papel rosa".
- **Tudo desenhado por código:** a arte é gerada em `src/art/`. Vantagens: não
  depende de imagens externas, nunca fica borrada, e trocar uma cor é só editar
  um número. Se no futuro alguém desenhar sprites à mão, dá para substituir.

## 2. Os personagens

| | Ela (jogadora) | Ele (você) |
|---|---|---|
| Cabelo | longo, escuro e ondulado | curto e escuro |
| Roupa | regata/blusa marrom | polo clara com gola branca |
| Calça | jeans claro | jeans |
| Tênis | brancos | brancos |
| Pele | morena (`#c88a62`) | clara (`#e6b590`) |

- Sprites com 4 direções (baixo, esquerda, direita, cima) × 3 quadros
  (parado + 2 passos), com um leve "pulinho" ao andar.
- Retratos 32×32 com 4 expressões: `normal`, `feliz`, `timido`, `surpreso`.
- Cores em `src/data/personagens.js` — ajustáveis quando as fotos chegarem.
- Também foram criados: a **amiga** (rabo de cavalo, blusa rosa) e colegas
  de escola de camiseta branca.

## 3. Mapa da Fase 1

**Parte A — Frente da escola (30×26 tiles)**

```
 ┌──────────────────────────────────────┐
 │ telhado                               │
 │ fachada: faixas rosa/amarelas,        │
 │ janelas redondas, vidro no centro     │
 │ térreo com pilares + PORTA DE VIDRO   │  ← entrada (troca de mapa)
 │ cerejeira ★        degrau      árvore │  ★ = memória bônus
 │ canteiros  bancos   pátio   árvore no │
 │                     canteiro + banco  │
 │ cerca viva  postes  placa  cerca viva │
 │ calçada  ← ela começa aqui            │
 │ rua                                   │
 └──────────────────────────────────────┘
```

**Parte B — Corredor interno (40×14 tiles)**

```
 ┌──────────────────────────────────────────────────┐
 │ teto                                              │
 │ SAÍDA  janelas  porta  janelas  porta ...         │
 │ rodapé azul com murais e cartazes                 │
 │ vasos   ← ela entra aqui                          │
 │      mesa  mesa  mesa          ELE ♥  amiga       │
 │      mesa  mesa  mesa                         ★   │
 │ jardineira (plantas)                              │
 └──────────────────────────────────────────────────┘
```

Fluxo: começa na calçada → explora o pátio → entra pela porta de vidro →
corredor → encontra ele (balão de coração) → conversa → amiga entra na cena →
**Tortuguita** → quiz de 3 perguntas (com novas tentativas) → chuva de corações
→ fase concluída → mapa das memórias com a Fase 2 marcada como próxima.

## 4. Elementos visuais produzidos

- Personagens: ela, ele, amiga, 4 colegas (sprites + retratos).
- Tiles externos: piso do pátio, grama, cerca viva, calçada, meio-fio, rua,
  telhado, fachada, faixas rosa/amarela, janela redonda, pano de vidro, viga,
  pilar, janelas do térreo, porta de vidro, base do prédio, degrau.
- Tiles internos: teto, parede, janela, porta de sala, porta de saída,
  rodapé azul, mural, cartaz, piso, jardineira.
- Objetos: árvore, cerejeira, árvore em canteiro, canteiro, banco, poste,
  mesa com bancos, lixeira, vaso, placa.
- Itens/ícones: Tortuguita, estrela de memória, corações, balões de
  exclamação/coração, sombra, brilho, lua.
- Interface: HUD, caixa de diálogo com retrato, alternativas do quiz,
  janelas, abertura de fase, mapa das memórias, menu de pausa, controles de toque.

## 5. Estrutura do projeto

Veja o `README.md` (seção "Estrutura").

## Próximas etapas

1. **Você testa a Fase 1** no celular e me manda as fotos reais.
2. Ajuste fino dos personagens e da escola com base nas fotos.
3. Fase 2 (escadaria ao entardecer), Fase 3 (shopping + cinema),
   Fases 4 e 5 (casas), fases bônus.
4. Boss Final: pedido, comemoração, carta e o seu vídeo.
