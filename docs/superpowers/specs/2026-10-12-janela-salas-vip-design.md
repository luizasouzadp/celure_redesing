# Janela "Salas VIP: o que inclui" — design

Data: 12/10/2026 · Branch: `redesign-design-system`

## Objetivo

Na seção **Salas VIP & Lounges Exclusivos** (`src/components/sections/ExperienciaVip.astro`), o link
**"Saber como acessar"** hoje só rola até `#cotacao`. Ele passa a abrir uma **janela por cima da página**
(mesma URL) que explica em detalhe **tudo o que uma sala VIP costuma incluir**, terminando num convite
para falar com a Celure no WhatsApp.

Sucesso: o visitante entende o valor de uma sala VIP e tem um caminho direto para conversar com a Celure.

## Decisões (com a Luiza)

- Formato: janela sobreposta (modal), **sem mudar a URL** e sem página nova.
- Conteúdo **geral**, válido para a maioria das salas ("a maioria das salas oferece…"). Nada de promessa
  específica da Celure — o que a Celure oferece ainda será definido com o Lucas e entra depois.
- **Fora desta versão:** lista de cartões (Visa Infinite, Mastercard Black…) e páginas por cartão.
  Ficam para uma etapa futura; a janela deve permitir acrescentar esse bloco sem refazer nada.
- Visual: **vídeo da sala VIP no topo + ícones e textos** por item. Fotos por item podem substituir os
  ícones no futuro.

## Comportamento

- Clique em "Saber como acessar" (só no bloco Salas VIP; o CTA da Classe Executiva continua indo a `#cotacao`)
  abre a janela. Sem JavaScript, o link continua funcionando como hoje (`#cotacao`).
- Computador: painel centralizado, largura de leitura confortável, fundo escurecido atrás.
  Celular: ocupa a tela inteira.
- O conteúdo rola **dentro** da janela; a página de trás não rola enquanto ela está aberta.
- Fecha por: botão X, clique fora do painel, tecla Esc. Ao fechar, o foco volta ao link que abriu e a
  página fica onde estava.
- Acessibilidade: `role="dialog"`, `aria-modal`, título ligado por `aria-labelledby`, foco vai para a
  janela ao abrir e fica preso dentro dela enquanto aberta.
- Vídeo no topo: o `AmbientVideo` existente (`/assets/videos/lounge.mp4`), tocando só com a janela aberta;
  respeita "reduzir movimento".

## Conteúdo (rascunho — texto final no tom da marca, ver `DESIGN.md`)

1. **Topo:** vídeo, eyebrow "Experiência VIP", título tipo *"O que te espera numa sala VIP"*, frase de abertura.
2. **Itens** (ícone + título + parágrafo curto):
   - Buffet — comida quente e fria, saladas, sobremesas; em algumas, pratos à la carte.
   - Open bar — vinhos, espumantes, cervejas, drinks, café e sucos à vontade.
   - Banho — chuveiros privativos com toalha e amenities (nem toda sala tem).
   - Descanso — poltronas confortáveis; em algumas, espaços para cochilo.
   - Wi-Fi & tomadas — para trabalhar ou carregar o celular com calma.
   - Silêncio & privacidade — longe das filas, com painéis de voos.
3. **Bom saber:** salas ficam após o raio-X; entrada normalmente até ~3 h antes do voo; acesso costuma vir
   pelo cartão de crédito ou pela classe da passagem; regras para acompanhantes variam; serviços variam por sala.
4. **Fechamento:** *"Quer saber se você já tem acesso? A gente te ajuda."* + botão WhatsApp.

## Peças (seguindo o Celure Design System)

- **`src/components/ds/Modal.astro`** (novo): painel de leitura sobreposto — fundo escuro, painel rolável,
  `CloseButton` no canto. Genérico (recebe `id`, `labelledby`, conteúdo por slot), reaproveitável depois.
  O `Lightbox` atual é próprio para foto em tela cheia e não é alterado.
- **`src/components/sections/SalasVipModal.astro`** (novo): o conteúdo acima + o script de abrir/fechar.
  Os textos ficam num arquivo de dados (`src/data/salas-vip.ts`) para facilitar a troca depois.
- **Ícones novos** em `src/assets/icons/` no mesmo traço fino dos existentes: bebida (open bar), chuveiro,
  poltrona/descanso, Wi-Fi, silêncio. Buffet usa o `included-meals` existente.
- **`ExperienciaVip.astro`:** o CTA do bloco Salas VIP ganha um marcador (ex.: `data-open="salas-vip"`)
  mantendo `href="#cotacao"` como reserva.
- **WhatsApp:** nova mensagem pronta em `src/lib/whatsapp.ts` (serviço `salas-vip`, ex.: "…gostaria de
  saber como ter acesso às salas VIP nos aeroportos.").
- Vitrine `/design-system`: incluir o `Modal`.

## Testes

- Unidade (Vitest): mensagem de WhatsApp de `salas-vip`.
- Navegador (Playwright, desktop e celular): abrir pelo link; conteúdo visível; fechar por X, Esc e clique
  fora; foco volta ao link; URL não muda; página de trás não rola com a janela aberta; botão WhatsApp com
  link correto.
