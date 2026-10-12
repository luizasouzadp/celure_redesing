# Celure Design System — como usar neste repositório

Este é o design system oficial do site da Celure. Toda página, seção ou componente novo deve usá-lo.
A referência completa (regras de marca, tom de voz, cartões de exemplo) está em [`design-system/`](design-system/readme.md);
este arquivo explica **onde cada coisa mora no código** e **as regras que não se quebram**.

Vitrine viva com todas as peças: rode o site e abra `/design-system`.

## Onde fica cada coisa

| O quê | Onde |
|---|---|
| Tokens (cores, tipografia, espaçamentos, movimento) | `src/styles/tokens/*.css` — cópia de `design-system/tokens/` |
| Classes base (`.h1….h4`, `.body-*`, `.color-white-*`, `.container`, `.padding-global`, `.count`) e escala para tablet/celular | `src/styles/base.css` |
| Componentes do design system | `src/components/ds/*.astro` |
| Seções do site (montadas com os componentes) | `src/components/sections/*.astro` |
| Ícones (SVG próprios) | `src/assets/icons/` — usados via `<Icon name="…" />` |
| Fonte Inter (variável, auto-hospedada) | `public/fonts/Inter-Variable.woff2` |
| Marca "e" da Celure | `public/assets/brand/celure-mark.png` (via `<Icon name="celure-mark" />`) |
| Conteúdo (serviços, depoimentos, destinos) | `src/data/*.ts` |

## Componentes

`Button` (primary / secondary, sempre com a estrela) · `TextLink` · `CloseButton` · `Icon` · `Eyebrow` ·
`SectionHead` (rótulo 22,5% + título 75%) · `HairlineGrid` (grade de fios) · `StatCard` · `TripCard` ·
`JourneyStep` · `StepItem` · `PersonCard` · `IncludedList` · `InputGroup` · `Header` · `Footer` ·
`Breadcrumbs` · `LegalNav` · `CookieBanner` · `Lightbox` · `Modal` (janela de leitura por cima da página, aberta por `data-modal-open`) · `WorldMap` (mapa-múndi com pontinhos e fotos) · `AmbientVideo` (vídeo sem som que só toca quando aparece na tela) · `SwipeHint` (aviso "deslize" para fileiras e mapas que rolam para o lado no celular).

## Regras que não se quebram

- **Só modo escuro.** Fundo `--ink-900` (#091b20). Texto sempre branco em opacidades fixas: 100 / 60 (apoio) / 50 (contadores) / 40 (frase esmaecida).
- **Um único destaque: laranja** `--brand-accent` (#fb9826) no hover, `--button-clicked` (#fa8805) no clique/ativo. O verde-água da Celure vive só no logo.
- **Fonte única: Inter**, pesos 400–600, títulos com espaçamento negativo. Nunca crie tamanhos soltos: use as classes `.h1…`/`.body-*` ou as variáveis `--h2-size` etc.
- **Sem caixas, sem sombras, sem cantos arredondados.** O conteúdo se organiza em células separadas por fios de 1px (`HairlineGrid`). A única curva é a pílula dos botões.
- **Profundidade vem da fotografia** (fotos reais da Celure, escurecidas embaixo até o fundo) e do desfoque (`backdrop-filter`) — nunca de sombra ou gradiente decorativo.
- **Ícones só do conjunto próprio** (`src/assets/icons`). Não use Lucide/Heroicons/emoji. Se precisar de um ícone novo, desenhe no mesmo traço (linha fina, branco, `currentColor` quando precisar mudar de cor).
- **Títulos em duas frases**: a segunda vai esmaecida — `Frase forte. <span class="color-white-40">Frase de apoio.</span>`
- **Textos em português, falando com "você"**, empresa como "nós". Botões com verbo + intenção em Title Case ("Planejar Minha Viagem").
- **Movimento**: entradas sutis com `data-reveal` (e `style="--d:.1s"` para escalonar). Sem quiques. Tudo respeita "reduzir movimento" do sistema.
- **Efeitos de rolagem**: sempre respeitam "reduzir movimento" e funcionam sem quebrar a página se o efeito não rodar.
  - **Vídeo guiado pela rolagem** (abertura, `Hero.astro`): o vídeo não toca sozinho; ele foi separado em quadros (`public/assets/hero-aviao/`) e cada posição da rolagem mostra um quadro num `<canvas>`. Para trocar o vídeo, apague os quadros antigos e rode `"$(node -p "require('ffmpeg-static')")" -i video.mp4 -an -c:v libwebp -quality 72 public/assets/hero-aviao/%03d.webp` (ferramenta já instalada no projeto); depois ajuste `FRAMES` no componente para o novo número de quadros. Ao trocar o vídeo, use uma pasta com nome novo (e atualize o caminho no componente): os navegadores guardam os quadros por até um ano e, com os mesmos nomes, mostrariam o vídeo antigo.
- **Texto nunca na frente de rostos.** Em fotos e vídeos com pessoas, o texto fica ao lado (ou abaixo, no celular).
- **Celular**: tudo que rola para o lado mostra o `SwipeHint` e bordas que somem; áreas de toque com pelo menos 40px. O tamanho-raiz é fluido; abaixo de 992px as grades viram 1–2 colunas e os títulos encolhem automaticamente pelos tokens de `base.css`. Sempre confira em 390px de largura.

## Adições feitas ao design system original

Feitas para o site real e documentadas aqui para não se perderem:

- Escala de tablet/celular para os títulos e espaçamentos (o original só definia o desktop).
- Piso de 12,5px no tamanho-raiz para notebooks pequenos.
- `--ease-out` e `--dur-reveal` (curva e duração das entradas).
- Ícones `arrow-left`, `arrow-right` e `play`, e o logo do WhatsApp (`whatsapp`).
- Ícones das salas VIP: `lounge-drinks`, `lounge-shower`, `lounge-rest`, `lounge-wifi`, `lounge-quiet` (mesmo traço de 1,5px).
- Exceção de marca de terceiros: o botão flutuante do WhatsApp usa o verde oficial (`--whatsapp-green`) para ser reconhecido na hora; no hover vira laranja como os demais botões.
- `Eyebrow`, `Lightbox`, `Modal`, prop `template` no `HairlineGrid`, `description` no `TripCard`, `text` no `IncludedList`.
- Uma leve sombra escura na base das fotos do `PersonCard`, só para garantir a leitura do nome.
- `WorldMap`: mapa-múndi desenhado na montagem do site a partir dos contornos abertos do Natural Earth (pacote `world-atlas`, domínio público), com tokens próprios `--map-land`, `--map-border`, `--map-visited` e `--map-dot-glow`. Os pontinhos laranja têm um brilho suave — a única "luz" permitida no sistema, pedida para o mapa. Os países ficam em `src/data/viagens.ts`.

## Imagens

As fotos de paisagem do site de inspiração (Vita Travel, em `design-system/assets/img/`) **não são da Celure** e não podem ir para o site no ar.
Use apenas fotos próprias (`public/assets/images/`). Para um efeito de abertura em camadas como o da referência, é preciso uma foto própria recortada.
