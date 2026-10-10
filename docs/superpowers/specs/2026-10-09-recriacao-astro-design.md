# Recriação do site da Celure em Astro: documento de design

**Data:** 09/10/2026
**Status:** aguardando revisão

## Objetivo

Recriar em Astro, de forma **visual e funcionalmente idêntica**, a landing page da Celure Viagens e Turismo que está no ar hoje (https://celure-viagens.vercel.app/). Este projeto é a fundação para um redesign completo no futuro. Por isso, a estrutura interna precisa ser organizada e fácil de modificar, mas **nada muda no visual nem no conteúdo agora**.

### O que a usuária pediu
- Usar o framework Astro.
- Recriar o site "como já é hoje", sem mudanças de design.
- Projeto apenas local por enquanto: nada é publicado no GitHub nem na Vercel.

### Critérios de sucesso
1. Lado a lado com o site atual, em computador (~1150px) e celular (~390px), as seções não têm diferenças perceptíveis de layout, cores, fontes, textos, imagens e espaçamentos.
2. Todas as interações funcionam como hoje (lista na seção "Comportamentos").
3. O projeto roda localmente (`npm run dev`) e gera a versão final (`npm run build`) sem erros.

### Fora do escopo
- Qualquer mudança de design, texto ou conteúdo.
- Os recursos citados no README antigo que **não existem** no site no ar: simulador de economia, FAQ e filtros de destinos.
- Publicação (GitHub, Vercel, domínio).

## Fontes de verdade

| Fonte | Uso |
|---|---|
| Site no ar (celure-viagens.vercel.app) | Referência final do que é "igual" |
| Repositório original `github.com/luizasouzadp/celure` (`index.html`, `assets/js/app.js`, `assets/css/custom.css`, `assets/images`, `assets/videos`) | Código, textos, imagens, vídeos e comportamento |
| Extração em `base/` | Apoio para comparação (estilos calculados, posições e tokens) |

Se o repositório e o site no ar divergirem, vale o site no ar.

## Decisões técnicas

- **Astro** (versão estável atual), gerando um site estático, sem servidor.
- **Tailwind CSS v3 instalado no projeto** (mesma versão principal servida pelo `cdn.tailwindcss.com` do original, para garantir equivalência visual), em vez do script de CDN usado hoje. O tema da Celure (cores `celure-*`, fontes DM Sans, Cormorant Garamond e Caveat) é transportado da configuração inline do `index.html` original para `tailwind.config.mjs`. A migração para a v4 fica para o redesign.
- **`custom.css`** é mantido como folha de estilo global (glassmorphism, animações, parallax, etc.).
- **Ícones Lucide**: hoje vêm de `lucide@latest` via CDN e são trocados no navegador. No novo projeto, viram SVGs gerados na construção do site (pacote Lucide para Astro, versão fixa). O resultado é o mesmo, sem depender de script externo.
- **Fontes do Google**: carregadas pelo mesmo link do Google Fonts do original.
- **Imagens e vídeos**: copiados para `public/assets/...` mantendo os mesmos caminhos (`/assets/images/...`, `/assets/videos/...`). A imagem de fundo da seção "luxo" continua vindo do Unsplash, como hoje. Não há otimização de imagem nesta etapa, para manter fidelidade.
- **JavaScript**: o `app.js` é dividido por responsabilidade em scripts próprios de cada componente, com o mesmo comportamento. Funções hoje chamadas por `onclick` inline (`openCardVideo`, `openDestPhoto`, `coverflowNav`, `coverflowGoTo`, `scrollTestimonials`) passam a ser ligadas por `addEventListener` com atributos `data-*`.
- **Controle de versão**: repositório git local na pasta do projeto, sem remoto.

## Estrutura do projeto

```
Site Celure/
├── base/                      # extração (referência, não faz parte do site)
├── docs/superpowers/specs/    # este documento
├── public/assets/
│   ├── images/                # logo, capas, depoimentos, servicos, destinos
│   └── videos/                # lounge, primeira-classe, destino
├── src/
│   ├── config/celure.ts       # WhatsApp, Instagram, CNPJ (fonte única)
│   ├── data/                  # conteúdo em listas: depoimentos, servicos, destinos, passos...
│   ├── lib/whatsapp.ts        # gerador de link wa.me + mensagens dos CTAs
│   ├── styles/global.css      # Tailwind + conteúdo do custom.css
│   ├── layouts/BaseLayout.astro   # <head>, metatags, fontes, SEO/OG
│   ├── components/
│   │   ├── AnnouncementBar.astro  # barra superior
│   │   ├── Navbar.astro           # menu + menu mobile + efeito de rolagem
│   │   ├── Hero.astro             # capa
│   │   ├── Sobre.astro            # #sobre (inclui mapa/fotos de destinos)
│   │   ├── Luxo.astro             # #luxo (cards de vídeo "janela de avião")
│   │   ├── Depoimentos.astro      # #depoimentos + carrossel
│   │   ├── Servicos.astro         # #servicos + coverflow
│   │   ├── Passos.astro           # "3 passos"
│   │   ├── Cotacao.astro          # #cotacao + formulário → WhatsApp
│   │   ├── Footer.astro
│   │   ├── WhatsAppFloat.astro    # botão flutuante
│   │   ├── DestPhotoLightbox.astro
│   │   └── VideoLightbox.astro
│   └── pages/index.astro      # monta a página com os componentes, na ordem original
├── astro.config.mjs
└── package.json
```

Regra para os componentes: o HTML de cada seção é portado **literalmente** do `index.html` original (mesmas classes e mesma hierarquia). Só repetições viram laços sobre `src/data/*`, quando o conteúdo é uma lista homogênea (cards de depoimento, serviço, destino). Textos únicos ficam no próprio componente.

## Comportamentos a preservar (do `app.js`)

1. **Navbar ao rolar**: acima de 40px de rolagem, ganha `shadow-md` e `py-3`; abaixo, volta para `py-5`.
2. **Menu mobile**: o botão abre e fecha o menu, e clicar num link fecha o menu.
3. **Coverflow de serviços** (4 cards): card ativo centralizado; vizinhos a ±170px com escala 0,78 e opacidade 0,45; demais escondidos. Setas e indicadores navegam em ciclo.
4. **Carrossel de depoimentos**: setas rolam a largura de um card + 24px, com rolagem suave.
5. **Lightbox de fotos de destinos** (7 destinos, na ordem EUA, Canadá, Alemanha, Grécia, Turquia, Catar, China): abre na foto clicada, com título e legenda. Setas e teclas ←/→ navegam em ciclo. Fecha com X, Esc ou clique fora da foto.
6. **Lightbox de vídeo** (Lounge, Primeira Classe, Destino): abre e toca com som, com título e subtítulo. Ao fechar (X, Esc ou clique fora), pausa, volta ao início e descarrega o vídeo.
7. **Formulário de cotação**: monta a mensagem formatada (nome, serviço, destino, período, viajantes e observações opcionais, com os mesmos emojis, negritos e valores padrão) e abre `wa.me/5553999491336` em nova aba.
8. **CTAs rápidos** (`data-cta-service`: passagens, consultoria-milhas, roteiro, experiencias, geral): ao clicar, o link aponta para o WhatsApp com a mensagem específica de cada serviço.
9. **Botão flutuante do WhatsApp** com animação de pulso.

## Verificação

- `npm run build` sem erros nem avisos relevantes.
- Comparação visual lado a lado (site atual × local) em ~1150px e ~390px, seção por seção, por captura de tela.
- Teste manual de cada comportamento da lista acima, incluindo o texto exato da mensagem do WhatsApp gerada pelo formulário e pelos CTAs (comparada com a do site atual).
- Conferir que todas as imagens e vídeos carregam (sem erro 404).
