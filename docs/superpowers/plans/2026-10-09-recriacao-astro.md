# Recriação do site da Celure em Astro: plano de implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Portar a landing page atual da Celure (HTML + Tailwind CDN + `app.js`) para um projeto Astro estático, idêntico no visual e no comportamento.

**Architecture:** Uma página (`src/pages/index.astro`) montada a partir de componentes `.astro`, um por seção. O HTML de cada um é copiado literalmente do `index.html` original, com transformações mecânicas definidas abaixo. A lógica pura (mensagens do WhatsApp, posições do coverflow, índice circular) fica em `src/lib/*.ts` e é testada com Vitest. Os scripts de cada componente usam essa lógica. A fidelidade visual é verificada com Playwright, comparando screenshots de cada seção do site original (servido localmente) com as do site novo.

**Tech Stack:** Astro (estável atual), Tailwind CSS 3.4 via PostCSS, `lucide-static` (ícones SVG em build), Vitest, Playwright, `http-server` (serve o original para comparação).

**Spec:** `docs/superpowers/specs/2026-10-09-recriacao-astro-design.md`

## Global Constraints

- Zero mudança de design, texto ou conteúdo. O site no ar (https://celure-viagens.vercel.app/) é a referência final.
- Fora do escopo: simulador, FAQ, filtros de destinos (citados no README antigo, ausentes no site) e qualquer publicação (GitHub, Vercel).
- Tailwind **v3** (`tailwindcss@^3.4`), nunca v4.
- WhatsApp `5553999491336`, Instagram `celure_turismo`, CNPJ `59.865.172/0001-70`: definidos **só** em `src/config/celure.ts`.
- Caminhos de mídia: `/assets/images/...` e `/assets/videos/...` (servidos de `public/`).
- A imagem de fundo de `#luxo` continua vindo do Unsplash (URL idêntica).
- Sem `<main>` nem wrappers extras: a hierarquia do `<body>` deve ser a mesma do original, porque os seletores dos testes visuais dependem dela.
- Git local, sem remoto. Commits terminam com `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

## Regras de portabilidade (valem para todas as tasks de componente)

O original fica em `referencia-original/index.html`. Ao copiar um intervalo de linhas para um componente:

1. `src="assets/` → `src="/assets/`. O mesmo vale para `href="assets/` (inclui `<image href=...>` dentro de SVG).
2. `<i data-lucide="NOME" class="CLASSES"></i>` → `<Icon name="NOME" class="CLASSES" />` (import `../components/Icon.astro`). **Exceção:** `instagram`. O Lucide atual não tem mais esse ícone, e no site no ar ele aparece como uma caixa vazia. Mantenha literalmente `<i data-lucide="instagram" class="CLASSES"></i>`.
3. Remova os `onclick` inline e troque por atributos de dados:
   - `onclick="openDestPhoto('eua')"` → `data-dest-photo="eua"`
   - `onclick="openCardVideo('assets/videos/X.mp4', 'TÍTULO', 'ETAPA 0N')"` → `data-video-src="/assets/videos/X.mp4" data-video-title="TÍTULO" data-video-eyebrow="ETAPA 0N"`
   - `onclick="coverflowGoTo(N)"` → `data-coverflow-goto="N"`
   - `onclick="coverflowNav(-1|1)"` → `data-coverflow-nav="-1|1"`
   - `onclick="scrollTestimonials(-1|1)"` → `data-testimonial-scroll="-1|1"`
   - `onclick="event.stopPropagation()"` (dentro dos lightboxes) → apenas remova. O fechamento já checa `e.target === lightbox`.
4. Comentários HTML podem ser mantidos. O conteúdo não tem `{`/`}` (verificado), então o texto é copiado sem escapes.
5. Listas homogêneas (cards de depoimento e de serviço) viram `.map()` sobre `src/data/*.ts`, gerando **exatamente** o mesmo HTML do card original.

## Review Focus

1. Formulário enviado só com o nome (campos opcionais vazios): a mensagem usa os padrões `Ainda decidindo` / `A definir`, omite a linha de observações, e acentos, `&`, emojis e quebras de linha chegam intactos no WhatsApp (URL-encoded).
2. Teclas Esc/←/→ com os lightboxes fechados: nada acontece, nem navegação escondida nem erro no console.
3. Fechar o vídeo (X, Esc ou clique fora) para o áudio na hora. Reabrir outro vídeo começa do zero.
4. Coverflow voltando do card 0 vai para o card 3 (e do 3 avançando vai para o 0), com as posições corretas.
5. Celular a 390px: nenhuma rolagem horizontal na página e o menu mobile abre/fecha.

---

### Task 1: Base do projeto (Astro + Tailwind 3 + layout + mídia)

**Files:**
- Create: `referencia-original/` (clone do repo original, ignorado pelo git)
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `postcss.config.cjs`, `tailwind.config.mjs`
- Create: `src/styles/global.css`, `src/layouts/BaseLayout.astro`, `src/pages/index.astro`, `src/config/celure.ts`
- Create: `public/assets/images/**`, `public/assets/videos/**` (copiados)
- Modify: `.gitignore`

**Interfaces:**
- Produces: `BaseLayout.astro` (slot = conteúdo do `<body>`); `celure` em `src/config/celure.ts`:
  ```ts
  export const celure = { phone: '5553999491336', instagram: 'celure_turismo', cnpj: '59.865.172/0001-70' } as const;
  ```

- [ ] **Step 1: Clonar o original e ignorá-lo no git**

```bash
cd "/c/Users/Usuario/Documents/Site Celure"
git clone --depth 1 https://github.com/luizasouzadp/celure referencia-original
printf 'referencia-original/\ntest-results/\nplaywright-report/\n' >> .gitignore
```

- [ ] **Step 2: Criar o projeto Astro e instalar dependências**

```bash
npm create astro@latest -- . --template minimal --no-install --no-git --skip-houston --yes
npm install
npm install -D tailwindcss@^3.4 postcss autoprefixer
npm install lucide-static
```
Se o `create astro` recusar a pasta por não estar vazia, gere em `../celure-tmp` e mova os arquivos (`package.json`, `astro.config.mjs`, `tsconfig.json`, `src/`, `public/`) para cá.

- [ ] **Step 3: Configurar Tailwind 3 com o tema da Celure**

`postcss.config.cjs`:
```js
module.exports = { plugins: { tailwindcss: {}, autoprefixer: {} } };
```
`tailwind.config.mjs` (tema copiado de `referencia-original/index.html:22-45`):
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,ts}'],
  theme: {
    extend: {
      colors: {
        celure: {
          teal: '#0D9488', 'teal-light': '#14B8A6', 'teal-dark': '#115E59',
          sand: '#FAF5EE', cream: '#F8F6F0', navy: '#0B132B', 'navy-soft': '#1C2541',
          coral: '#F97316', 'coral-hover': '#EA580C',
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        serif: ['Cormorant Garamond', 'serif'],
        handwritten: ['Caveat', 'cursive'],
      },
    },
  },
  plugins: [],
};
```
`src/styles/global.css`: começa com a linha `@import url('https://fonts.googleapis.com/...')` de `referencia-original/assets/css/custom.css` (o `@import` precisa vir antes de tudo), depois `@tailwind base; @tailwind components; @tailwind utilities;` e em seguida o resto do `custom.css`, sem alterações.

- [ ] **Step 4: Layout, config e página vazia**

`src/layouts/BaseLayout.astro`: reproduz `referencia-original/index.html:1-17` e a linha 54. Mesmo `<html lang="pt-BR" class="scroll-smooth">`, metatags, favicon `/assets/images/celure-logo.png` e `<body class="bg-[#FAF5EE] text-slate-800 antialiased selection:bg-teal-600 selection:text-white">`. Importa `../styles/global.css` e tem `<slot />` dentro do body. Sem scripts de CDN.
`src/config/celure.ts`: conforme a seção Interfaces.
`src/pages/index.astro`: usa `BaseLayout` com o corpo vazio por enquanto.

- [ ] **Step 5: Copiar a mídia**

```bash
mkdir -p public/assets && cp -r referencia-original/assets/images referencia-original/assets/videos public/assets/
```

- [ ] **Step 6: Verificar o build**

Run: `npm run build`
Expected: termina sem erros; `dist/index.html` contém `Celure Viagens e Turismo` e o CSS gerado contém `.bg-\[\#FAF5EE\]`.

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "chore: base do projeto Astro com Tailwind 3 e mídia

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 2: Lógica pura testada (WhatsApp, coverflow, índice circular) + Icon

**Files:**
- Create: `src/lib/whatsapp.ts`, `src/lib/carousel.ts`, `src/components/Icon.astro`
- Test: `tests/unit/whatsapp.test.ts`, `tests/unit/carousel.test.ts`

**Interfaces:**
- Produces:
  ```ts
  // src/lib/whatsapp.ts
  export type QuoteInput = { name: string; service: string; destination: string; dates: string; travelers: string; details: string };
  export function getWhatsAppUrl(text: string, phone?: string): string;
  export function buildQuoteMessage(input: QuoteInput): string;
  export type CtaService = 'passagens' | 'consultoria-milhas' | 'roteiro' | 'experiencias' | 'geral';
  export function ctaMessage(service: string | null): string;
  // src/lib/carousel.ts
  export function wrapIndex(i: number, len: number): number;
  export type CardPose = { translateX: number; scale: number; opacity: number; zIndex: number; pointerEvents: 'auto' | 'none' };
  export function coverflowPose(index: number, active: number, count: number): CardPose;
  ```
  `Icon.astro`: props `name: string` (kebab-case Lucide), `class?: string`.

- [ ] **Step 1: Instalar Vitest e escrever os testes que falham**

```bash
npm install -D vitest
npm pkg set scripts.test="vitest run"
```
`tests/unit/whatsapp.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { getWhatsAppUrl, buildQuoteMessage, ctaMessage } from '../../src/lib/whatsapp';

describe('getWhatsAppUrl', () => {
  it('usa o número da Celure e codifica o texto', () => {
    expect(getWhatsAppUrl('Olá & tchau\n✨')).toBe(
      'https://wa.me/5553999491336?text=' + encodeURIComponent('Olá & tchau\n✨'));
  });
  it('remove caracteres não numéricos do telefone', () => {
    expect(getWhatsAppUrl('x', '+55 (53) 99949-1336')).toBe('https://wa.me/5553999491336?text=x');
  });
});

describe('buildQuoteMessage', () => {
  it('monta a mensagem completa igual ao original', () => {
    const msg = buildQuoteMessage({ name: 'Ana', service: 'Planejamento de Roteiro Sob Medida',
      destination: 'Paris', dates: 'Julho', travelers: '2 pessoas (Casal/Amigos)', details: 'Executiva' });
    expect(msg).toBe(
      'Olá, Lucas e equipe Celure!\n\nMe chamo *Ana* e gostaria de solicitar uma cotação/atendimento personalizado:\n\n' +
      '✨ *Serviço:* Planejamento de Roteiro Sob Medida\n' +
      '📍 *Destino:* Paris\n' +
      '📅 *Período/Época:* Julho\n' +
      '👥 *Viajantes:* 2 pessoas (Casal/Amigos)\n' +
      '📝 *Observações / Preferências:* Executiva\n' +
      '\nAguardo as orientações para planejarmos essa experiência!');
  });
  it('aplica padrões e omite observações vazias (apara espaços)', () => {
    const msg = buildQuoteMessage({ name: '  ', service: '', destination: ' ', dates: '', travelers: '', details: '   ' });
    expect(msg).toContain('Me chamo *Viajante*');
    expect(msg).toContain('✨ *Serviço:* Roteiro & Passagens\n');
    expect(msg).toContain('📍 *Destino:* Ainda decidindo\n');
    expect(msg).toContain('📅 *Período/Época:* A definir\n');
    expect(msg).toContain('👥 *Viajantes:* 2 pessoas\n');
    expect(msg).not.toContain('Observações');
  });
});

describe('ctaMessage', () => {
  const base = 'Olá, equipe Celure! Gostaria de conversar sobre ';
  it.each([
    ['passagens', 'emissão inteligente de passagens aéreas (milhas e dinheiro) para o meu próximo destino.'],
    ['consultoria-milhas', 'a Consultoria de Milhas e Cartões de Crédito para otimizar meus gastos e acelerar minhas viagens.'],
    ['roteiro', 'um Roteiro Personalizado e planejamento completo sob medida para a minha viagem.'],
    ['experiencias', 'o planejamento de uma Viagem Exclusiva e personalizada sob medida.'],
    ['geral', 'o planejamento de uma viagem personalizada e exclusiva.'],
    ['desconhecido', 'o planejamento de uma viagem personalizada e exclusiva.'],
    [null, 'o planejamento de uma viagem personalizada e exclusiva.'],
  ])('%s', (svc, tail) => expect(ctaMessage(svc as string | null)).toBe(base + tail));
});
```
`tests/unit/carousel.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { wrapIndex, coverflowPose } from '../../src/lib/carousel';

describe('wrapIndex', () => {
  it('dá a volta nos dois sentidos', () => {
    expect(wrapIndex(-1, 4)).toBe(3);
    expect(wrapIndex(4, 4)).toBe(0);
    expect(wrapIndex(-1, 7)).toBe(6);
    expect(wrapIndex(2, 7)).toBe(2);
  });
});

describe('coverflowPose (4 cards)', () => {
  it('card ativo', () => expect(coverflowPose(0, 0, 4)).toEqual({ translateX: 0, scale: 1, opacity: 1, zIndex: 30, pointerEvents: 'auto' }));
  it('vizinho direito', () => expect(coverflowPose(1, 0, 4)).toEqual({ translateX: 170, scale: 0.78, opacity: 0.45, zIndex: 20, pointerEvents: 'auto' }));
  it('vizinho esquerdo com volta (ativo 0, card 3)', () => expect(coverflowPose(3, 0, 4)).toEqual({ translateX: -170, scale: 0.78, opacity: 0.45, zIndex: 20, pointerEvents: 'auto' }));
  it('card oposto (diff 2) fica escondido à direita', () => expect(coverflowPose(2, 0, 4)).toEqual({ translateX: 250, scale: 0.6, opacity: 0, zIndex: 10, pointerEvents: 'none' }));
  it('vizinho esquerdo com volta (ativo 3, card 2) e direito (card 0)', () => {
    expect(coverflowPose(2, 3, 4).translateX).toBe(-170);
    expect(coverflowPose(0, 3, 4).translateX).toBe(170);
  });
});
```

- [ ] **Step 2: Rodar e ver falhar**

Run: `npm test`
Expected: FAIL (módulos `src/lib/*` não existem).

- [ ] **Step 3: Implementar**

`src/lib/whatsapp.ts`:
```ts
import { celure } from '../config/celure';

export type QuoteInput = { name: string; service: string; destination: string; dates: string; travelers: string; details: string };
export type CtaService = 'passagens' | 'consultoria-milhas' | 'roteiro' | 'experiencias' | 'geral';

export function getWhatsAppUrl(text: string, phone: string = celure.phone): string {
  return `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`;
}

export function buildQuoteMessage(input: QuoteInput): string {
  const name = input.name.trim() || 'Viajante';
  const service = input.service || 'Roteiro & Passagens';
  const destination = input.destination.trim() || 'Ainda decidindo';
  const dates = input.dates.trim() || 'A definir';
  const travelers = input.travelers || '2 pessoas';
  const details = input.details.trim();

  let message = `Olá, Lucas e equipe Celure!\n\nMe chamo *${name}* e gostaria de solicitar uma cotação/atendimento personalizado:\n\n`;
  message += `✨ *Serviço:* ${service}\n`;
  message += `📍 *Destino:* ${destination}\n`;
  message += `📅 *Período/Época:* ${dates}\n`;
  message += `👥 *Viajantes:* ${travelers}\n`;
  if (details) message += `📝 *Observações / Preferências:* ${details}\n`;
  message += `\nAguardo as orientações para planejarmos essa experiência!`;
  return message;
}

const CTA_TAILS: Record<CtaService, string> = {
  passagens: 'emissão inteligente de passagens aéreas (milhas e dinheiro) para o meu próximo destino.',
  'consultoria-milhas': 'a Consultoria de Milhas e Cartões de Crédito para otimizar meus gastos e acelerar minhas viagens.',
  roteiro: 'um Roteiro Personalizado e planejamento completo sob medida para a minha viagem.',
  experiencias: 'o planejamento de uma Viagem Exclusiva e personalizada sob medida.',
  geral: 'o planejamento de uma viagem personalizada e exclusiva.',
};

export function ctaMessage(service: string | null): string {
  const tail = CTA_TAILS[(service ?? 'geral') as CtaService] ?? CTA_TAILS.geral;
  return 'Olá, equipe Celure! Gostaria de conversar sobre ' + tail;
}
```
`src/lib/carousel.ts`:
```ts
export type CardPose = { translateX: number; scale: number; opacity: number; zIndex: number; pointerEvents: 'auto' | 'none' };

export function wrapIndex(i: number, len: number): number {
  return ((i % len) + len) % len;
}

export function coverflowPose(index: number, active: number, count: number): CardPose {
  let diff = index - active;
  if (diff > count / 2) diff -= count;
  if (diff < -count / 2) diff += count;
  if (diff === 0) return { translateX: 0, scale: 1, opacity: 1, zIndex: 30, pointerEvents: 'auto' };
  if (diff === -1 || diff === 1) return { translateX: 170 * diff, scale: 0.78, opacity: 0.45, zIndex: 20, pointerEvents: 'auto' };
  return { translateX: diff < 0 ? -250 : 250, scale: 0.6, opacity: 0, zIndex: 10, pointerEvents: 'none' };
}
```
(Com 4 cards, diff=2 não é ajustado (`2 > 2` é falso), então fica à direita (+250), igual ao original.)

`src/components/Icon.astro` (gera o mesmo SVG que o `lucide.createIcons()` produzia):
```astro
---
import * as icons from 'lucide-static';
interface Props { name: string; class?: string }
const { name, class: className = '' } = Astro.props;
const pascal = name.replace(/(^|-)([a-z0-9])/g, (_, __, c) => c.toUpperCase());
const svg = (icons as Record<string, string>)[pascal];
if (!svg) throw new Error(`Ícone Lucide não encontrado: ${name}`);
const html = svg
  .replace(/<!--[\s\S]*?-->/g, '')
  .replace(/class="([^"]*)"/, `data-lucide="${name}" aria-hidden="true" class="$1 ${className}"`.trim());
---
<Fragment set:html={html} />
```

- [ ] **Step 4: Rodar e ver passar**

Run: `npm test`
Expected: PASS (todos).

- [ ] **Step 5: Conferir que todos os 35 ícones usados existem**

Rode uma vez (não é teste permanente):
```bash
node -e "const i=require('lucide-static');const n='armchair arrow-right award bed bed-double check-check check-circle chevron-left chevron-right clock compass credit-card crown gift headset heart map martini menu message-circle mouse-pointer-click percent plane play shield-check shower-head sparkles stamp star trending-up tv utensils wallet wine x'.split(' ');console.log(n.filter(x=>!i[x.replace(/(^|-)([a-z0-9])/g,(_,a,c)=>c.toUpperCase())]))"
```
Expected: `[]`. Se algum nome faltar, adicione um mapa de aliases em `Icon.astro` (ex.: `check-circle` → `CircleCheck`).

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: lógica do WhatsApp/carrosséis com testes e componente Icon

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 3: Bancada de comparação visual (Playwright)

**Files:**
- Create: `playwright.config.ts`, `tests/e2e/visual.spec.ts`, `tests/e2e/sections.ts`

**Interfaces:**
- Produces: `SECTIONS` (lista nome→seletor) e o fluxo de dois passos: `npm run visual:baseline` (fotografa o **original**) e `npm run visual` (compara o **novo** com essas fotos). Também os projetos `desktop` (1150×687) e `mobile` (390×844) para os testes de comportamento das próximas tasks.

- [ ] **Step 1: Instalar**

```bash
npm install -D @playwright/test http-server
npx playwright install chromium
npm pkg set scripts.visual:baseline="cross-env TARGET=original playwright test visual --update-snapshots"
npm pkg set scripts.visual="playwright test visual"
npm pkg set scripts.e2e="playwright test --grep-invert visual"
npm install -D cross-env
```

- [ ] **Step 2: Configuração**

`playwright.config.ts`:
```ts
import { defineConfig, devices } from '@playwright/test';
const original = process.env.TARGET === 'original';
export default defineConfig({
  testDir: 'tests/e2e',
  snapshotPathTemplate: 'tests/e2e/__baseline__/{projectName}/{arg}{ext}',
  expect: { toHaveScreenshot: { maxDiffPixelRatio: 0.01, animations: 'disabled', caret: 'hide' } },
  use: { baseURL: original ? 'http://localhost:4400' : 'http://localhost:4321' },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1150, height: 687 } } },
    { name: 'mobile', use: { ...devices['Desktop Chrome'], viewport: { width: 390, height: 844 }, isMobile: false, hasTouch: true } },
  ],
  webServer: original
    ? { command: 'npx http-server referencia-original -p 4400 -s -c-1', port: 4400, reuseExistingServer: true }
    : { command: 'npm run build && npm run preview -- --port 4321', port: 4321, reuseExistingServer: true, timeout: 180_000 },
});
```
`tests/e2e/sections.ts`:
```ts
export const SECTIONS: Record<string, string> = {
  anuncio: 'body > div:first-of-type',
  navbar: '#navbar',
  hero: 'body > section:nth-of-type(1)',
  sobre: '#sobre',
  luxo: '#luxo',
  depoimentos: '#depoimentos',
  servicos: '#servicos',
  passos: 'body > section:nth-of-type(6)', // hero, sobre, luxo, depoimentos, servicos, PASSOS, cotacao
  cotacao: '#cotacao',
  rodape: 'body > footer',
};
```
`tests/e2e/visual.spec.ts`:
```ts
import { test, expect } from '@playwright/test';
import { SECTIONS } from './sections';

test.describe('visual', () => {
  for (const [name, selector] of Object.entries(SECTIONS)) {
    test(name, async ({ page }) => {
      await page.goto('/');
      await page.evaluate(() => document.fonts.ready);
      // carrega todas as imagens antes de fotografar
      await page.evaluate(async () => {
        await Promise.all([...document.images].map(i => i.complete ? null : new Promise(r => { i.onload = i.onerror = r; })));
      });
      await page.waitForLoadState('networkidle');
      const el = page.locator(selector).first();
      await el.scrollIntoViewIfNeeded();
      await page.evaluate(() => window.scrollTo(0, 0)); // navbar sempre no estado "topo"
      await expect(el).toHaveScreenshot(`${name}.png`, { mask: [page.locator('#navbar')].filter(() => name !== 'navbar') });
    });
  }
});
```
Observação: a máscara cobre o navbar fixo quando ele se sobrepõe a outra seção. No teste do próprio navbar, ele não é mascarado.

- [ ] **Step 3: Gerar as fotos de referência do original**

Run: `npm run visual:baseline`
Expected: 20 arquivos PNG em `tests/e2e/__baseline__/{desktop,mobile}/`. Abra 2 ou 3 deles e confirme que mostram o site original com ícones, fontes e fotos.

- [ ] **Step 4: Confirmar que o novo (vazio) falha**

Run: `npm run visual`
Expected: FAIL nas 20 (seções ainda não existem).

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "test: comparação visual com o site original via Playwright

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 4: Barra de anúncio + Navbar (menu mobile e efeito de rolagem)

**Files:**
- Create: `src/components/AnnouncementBar.astro` (de `referencia-original/index.html:56-72`)
- Create: `src/components/Navbar.astro` (de `:74-114`, com `<script>`)
- Modify: `src/pages/index.astro`
- Test: `tests/e2e/navbar.spec.ts`

**Interfaces:**
- Consumes: `Icon.astro`
- Produces: nada usado por outras tasks.

- [ ] **Step 1: Teste que falha**

`tests/e2e/navbar.spec.ts`:
```ts
import { test, expect } from '@playwright/test';

test('navbar muda ao rolar além de 40px e volta', async ({ page }) => {
  await page.goto('/');
  const nav = page.locator('#navbar');
  await page.evaluate(() => window.scrollTo(0, 200));
  await expect(nav).toHaveClass(/shadow-md/);
  await expect(nav).toHaveClass(/py-3/);
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(nav).toHaveClass(/py-5/);
  await expect(nav).not.toHaveClass(/shadow-md/);
});

test('menu mobile abre, e clicar num link fecha', async ({ page }, info) => {
  test.skip(info.project.name !== 'mobile');
  await page.goto('/');
  const menu = page.locator('#mobile-menu');
  await expect(menu).toBeHidden();
  await page.locator('#mobile-menu-toggle').click();
  await expect(menu).toBeVisible();
  await menu.locator('.mobile-nav-link').first().click();
  await expect(menu).toBeHidden();
});

test('sem rolagem horizontal no celular', async ({ page }, info) => {
  test.skip(info.project.name !== 'mobile');
  await page.goto('/');
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});
```
Run: `npx playwright test navbar` → Expected: FAIL.

- [ ] **Step 2: Portar o HTML** aplicando as Regras de portabilidade. Monte `index.astro` com `<AnnouncementBar />` e `<Navbar />` dentro de `<BaseLayout>`.

- [ ] **Step 3: Script do Navbar** (no fim de `Navbar.astro`):
```astro
<script>
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        navbar.classList.add('shadow-md', 'py-3');
        navbar.classList.remove('py-5');
      } else {
        navbar.classList.remove('shadow-md', 'py-3');
        navbar.classList.add('py-5');
      }
    });
  }
  const toggle = document.getElementById('mobile-menu-toggle');
  const menu = document.getElementById('mobile-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => menu.classList.toggle('hidden'));
    document.querySelectorAll('.mobile-nav-link').forEach((l) => l.addEventListener('click', () => menu.classList.add('hidden')));
  }
</script>
```

- [ ] **Step 4: Rodar**

Run: `npx playwright test navbar` e `npx playwright test visual -g "anuncio|navbar"`
Expected: PASS. (O teste de rolagem horizontal pode falhar até as outras seções existirem. Se falhar só por isso, ele é revalidado na Task 10.)

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: barra de anúncio e navbar

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 5: Hero (capa)

**Files:**
- Create: `src/components/Hero.astro` (de `referencia-original/index.html:116-255`)
- Modify: `src/pages/index.astro`

- [ ] **Step 1:** Run `npx playwright test visual -g hero` → Expected: FAIL.
- [ ] **Step 2:** Portar aplicando as Regras de portabilidade. Os CTAs `href="#cotacao"` ficam como estão. Se algum tiver `data-cta-service`, o script global de CTAs da Task 9 cuida dele. Adicionar `<Hero />` após `<Navbar />`.
- [ ] **Step 3:** Run `npx playwright test visual -g hero` → Expected: PASS (desktop e mobile).
- [ ] **Step 4: Commit** `feat: seção hero` (com a linha Co-Authored-By).

---

### Task 6: Sobre (mapa-múndi) + lightbox de fotos de destinos

**Files:**
- Create: `src/data/destinos.ts`, `src/components/Sobre.astro` (de `:257-1064`), `src/components/DestPhotoLightbox.astro` (de `:1924-1944`)
- Modify: `src/pages/index.astro`
- Test: `tests/e2e/dest-photo.spec.ts`

**Interfaces:**
- Consumes: `wrapIndex` de `src/lib/carousel.ts`
- Produces: `src/data/destinos.ts`:
  ```ts
  export type Destino = { key: string; title: string; caption: string; src: string };
  export const destinos: Destino[] = [
    { key: 'eua', title: '🇺🇸 Estados Unidos', caption: 'Antelope Canyon', src: '/assets/images/destinos/eua.jpg' },
    { key: 'canada', title: '🇨🇦 Canadá', caption: 'Toronto', src: '/assets/images/destinos/canada.jpg' },
    { key: 'alemanha', title: '🇩🇪 Alemanha', caption: 'Allianz Arena, Munique', src: '/assets/images/destinos/alemanha.jpg' },
    { key: 'grecia', title: '🇬🇷 Grécia', caption: 'Santorini', src: '/assets/images/destinos/grecia.jpg' },
    { key: 'turquia', title: '🇹🇷 Turquia', caption: 'Hagia Sophia, Istambul', src: '/assets/images/destinos/turquia.jpg' },
    { key: 'catar', title: '🇶🇦 Catar', caption: 'Passeio de camelo no deserto', src: '/assets/images/destinos/catar.jpg' },
    { key: 'china', title: '🇨🇳 China', caption: 'Muralha da China', src: '/assets/images/destinos/china.jpg' },
  ];
  ```

- [ ] **Step 1: Teste que falha** (`tests/e2e/dest-photo.spec.ts`):
```ts
import { test, expect } from '@playwright/test';

test('abre na foto clicada, navega em ciclo e fecha', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('/');
  const box = page.locator('#dest-photo-lightbox');
  // teclas com o lightbox fechado não fazem nada
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('Escape');
  await expect(box).toBeHidden();

  await page.locator('[data-dest-photo="eua"]').dispatchEvent('click');
  await expect(box).toBeVisible();
  await expect(page.locator('#dest-photo-title')).toHaveText('🇺🇸 Estados Unidos');
  await expect(page.locator('#dest-photo-caption')).toHaveText('Antelope Canyon');
  await expect(page.locator('#dest-photo-img')).toHaveAttribute('src', '/assets/images/destinos/eua.jpg');

  await page.keyboard.press('ArrowLeft');
  await expect(page.locator('#dest-photo-title')).toHaveText('🇨🇳 China');
  await page.locator('#dest-photo-next').click();
  await expect(page.locator('#dest-photo-title')).toHaveText('🇺🇸 Estados Unidos');
  await page.locator('#dest-photo-prev').click();
  await expect(page.locator('#dest-photo-title')).toHaveText('🇨🇳 China');

  await page.keyboard.press('Escape');
  await expect(box).toBeHidden();

  await page.locator('[data-dest-photo="grecia"]').dispatchEvent('click');
  await expect(page.locator('#dest-photo-caption')).toHaveText('Santorini');
  await page.locator('#dest-photo-img').click(); // clicar na foto NÃO fecha
  await expect(box).toBeVisible();
  await box.click({ position: { x: 5, y: 5 } }); // clicar fora fecha
  await expect(box).toBeHidden();
  await page.locator('[data-dest-photo="china"]').dispatchEvent('click');
  await page.locator('#dest-photo-close').click();
  await expect(box).toBeHidden();
  expect(errors).toEqual([]);
});
```
(`dispatchEvent` porque os gatilhos são `<g>` dentro do SVG.)
Run: `npx playwright test dest-photo` → FAIL.

- [ ] **Step 2: Portar** `Sobre.astro` e `DestPhotoLightbox.astro` com as Regras de portabilidade (os 7 `<g class="dest-photo-thumb" ... onclick=...>` viram `data-dest-photo="KEY"`). O SVG do mapa é copiado inteiro, sem refatorar. Adicionar `<Sobre />` à página na ordem certa e `<DestPhotoLightbox />` no fim do body, depois do botão flutuante (mesma posição do original; até a Task 10, fica no fim).

- [ ] **Step 3: Script** no fim de `DestPhotoLightbox.astro`:
```astro
<script>
  import { destinos } from '../data/destinos';
  import { wrapIndex } from '../lib/carousel';

  const box = document.getElementById('dest-photo-lightbox')!;
  const img = document.getElementById('dest-photo-img') as HTMLImageElement;
  const title = document.getElementById('dest-photo-title')!;
  const caption = document.getElementById('dest-photo-caption')!;
  let current = 0;

  const isOpen = () => !box.classList.contains('hidden');
  function render() {
    const d = destinos[current];
    img.src = d.src;
    img.alt = `${d.title} — ${d.caption}`;
    title.textContent = d.title;
    caption.textContent = d.caption;
  }
  function open(key: string) {
    const i = destinos.findIndex((d) => d.key === key);
    if (i === -1) return;
    current = i;
    render();
    box.classList.remove('hidden');
    box.classList.add('flex');
  }
  function close() {
    box.classList.add('hidden');
    box.classList.remove('flex');
  }
  function nav(dir: number) {
    current = wrapIndex(current + dir, destinos.length);
    render();
  }

  document.querySelectorAll<SVGElement>('[data-dest-photo]').forEach((el) =>
    el.addEventListener('click', () => open(el.dataset.destPhoto!)));
  box.addEventListener('click', (e) => { if (e.target === box) close(); });
  document.getElementById('dest-photo-close')?.addEventListener('click', (e) => { e.stopPropagation(); close(); });
  document.getElementById('dest-photo-prev')?.addEventListener('click', (e) => { e.stopPropagation(); nav(-1); });
  document.getElementById('dest-photo-next')?.addEventListener('click', (e) => { e.stopPropagation(); nav(1); });
  document.addEventListener('keydown', (e) => {
    if (!isOpen()) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') nav(-1);
    if (e.key === 'ArrowRight') nav(1);
  });
</script>
```

- [ ] **Step 4:** Run `npx playwright test dest-photo` e `npx playwright test visual -g sobre` → PASS.
- [ ] **Step 5: Commit** `feat: seção sobre com mapa e lightbox de fotos` (com Co-Authored-By).

---

### Task 7: Experiência VIP (#luxo) + lightbox de vídeo

**Files:**
- Create: `src/components/Luxo.astro` (de `:1066-1364`), `src/components/VideoLightbox.astro` (de `:1946-1959`)
- Modify: `src/pages/index.astro`
- Test: `tests/e2e/video.spec.ts`

- [ ] **Step 1: Teste que falha** (`tests/e2e/video.spec.ts`):
```ts
import { test, expect } from '@playwright/test';

test('abre e toca o vídeo; ao fechar pausa e descarrega', async ({ page }) => {
  await page.goto('/');
  const box = page.locator('#card-video-lightbox');
  const player = page.locator('#card-video-player');
  await page.keyboard.press('Escape');
  await expect(box).toBeHidden();

  await page.locator('[data-video-src="/assets/videos/lounge.mp4"]').click();
  await expect(box).toBeVisible();
  await expect(page.locator('#card-video-title')).toHaveText('Lounge VIP & Espera com Estilo');
  await expect(page.locator('#card-video-eyebrow')).toHaveText('ETAPA 01');
  await expect(player).toHaveAttribute('src', '/assets/videos/lounge.mp4');
  await expect.poll(() => player.evaluate((v: HTMLVideoElement) => v.paused)).toBe(false);

  await page.keyboard.press('Escape');
  await expect(box).toBeHidden();
  expect(await player.evaluate((v: HTMLVideoElement) => v.paused)).toBe(true);
  expect(await player.getAttribute('src')).toBeNull();

  await page.locator('[data-video-eyebrow="ETAPA 02"]').click();
  await expect(player).toHaveAttribute('src', '/assets/videos/primeira-classe.mp4');
  await box.click({ position: { x: 5, y: 5 } });
  await expect(box).toBeHidden();
  await page.locator('[data-video-eyebrow="ETAPA 03"]').click();
  await page.locator('#card-video-close').click();
  await expect(box).toBeHidden();
});
```
Para o Chromium permitir autoplay com som no teste, adicione em `playwright.config.ts` → `use`: `launchOptions: { args: ['--autoplay-policy=no-user-gesture-required'] }`.
Run: `npx playwright test video` → FAIL.

- [ ] **Step 2: Portar** os dois componentes com as Regras de portabilidade (os 3 `onclick="openCardVideo(...)"` viram `data-video-src/title/eyebrow`). O `style="background-image: ..."` do `#luxo` é copiado idêntico. Adicionar `<Luxo />` após `<Sobre />` e `<VideoLightbox />` após `<DestPhotoLightbox />`.

- [ ] **Step 3: Script** no fim de `VideoLightbox.astro`:
```astro
<script>
  const box = document.getElementById('card-video-lightbox')!;
  const player = document.getElementById('card-video-player') as HTMLVideoElement;

  function open(src: string, title: string, eyebrow: string) {
    player.src = src;
    document.getElementById('card-video-title')!.textContent = title;
    document.getElementById('card-video-eyebrow')!.textContent = eyebrow;
    box.classList.remove('hidden');
    box.classList.add('flex');
    player.play();
  }
  function close() {
    player.pause();
    player.currentTime = 0;
    player.removeAttribute('src');
    player.load();
    box.classList.add('hidden');
    box.classList.remove('flex');
  }

  document.querySelectorAll<HTMLElement>('[data-video-src]').forEach((el) =>
    el.addEventListener('click', () => open(el.dataset.videoSrc!, el.dataset.videoTitle!, el.dataset.videoEyebrow!)));
  box.addEventListener('click', (e) => { if (e.target === box) close(); });
  document.getElementById('card-video-close')?.addEventListener('click', (e) => { e.stopPropagation(); close(); });
  document.addEventListener('keydown', (e) => {
    if (box.classList.contains('hidden')) return;
    if (e.key === 'Escape') close();
  });
</script>
```

- [ ] **Step 4:** Run `npx playwright test video` e `npx playwright test visual -g luxo` → PASS.
- [ ] **Step 5: Commit** `feat: seção experiência VIP com lightbox de vídeo` (com Co-Authored-By).

---

### Task 8: Depoimentos (dados + carrossel)

**Files:**
- Create: `src/data/depoimentos.ts`, `src/components/Depoimentos.astro` (de `:1366-1563`)
- Modify: `src/pages/index.astro`
- Test: `tests/e2e/depoimentos.spec.ts`

**Interfaces:**
- Produces: `src/data/depoimentos.ts`:
  ```ts
  export type Depoimento = { img: string; alt: string; local: string; likes: number; texto: string; assinatura: string };
  export const depoimentos: Depoimento[];
  ```

- [ ] **Step 1: Teste que falha** (`tests/e2e/depoimentos.spec.ts`):
```ts
import { test, expect } from '@playwright/test';

test('8 cards e setas rolam o carrossel', async ({ page }, info) => {
  await page.goto('/');
  const track = page.locator('#testimonial-carousel');
  await expect(track.locator(':scope > div')).toHaveCount(8);
  test.skip(info.project.name === 'mobile'); // setas são hidden md:flex
  await track.scrollIntoViewIfNeeded();
  await page.locator('[data-testimonial-scroll="1"]').click();
  await expect.poll(() => track.evaluate((t) => t.scrollLeft)).toBeGreaterThan(0);
  const after = await track.evaluate((t) => t.scrollLeft);
  await page.locator('[data-testimonial-scroll="-1"]').click();
  await expect.poll(() => track.evaluate((t) => t.scrollLeft)).toBeLessThan(after);
});
```
Run → FAIL.

- [ ] **Step 2: Extrair os dados.** Para cada um dos 8 cards em `referencia-original/index.html:1399-1551` (rio, ushuaia, bonito, vegas, nordeste, chile, panama, cruzeiro, nessa ordem), copie para `depoimentos.ts` o `src` (com `/` na frente), o `alt`, o nome do local (`<span class="text-white font-bold ...">`), o número de curtidas, o texto entre aspas **incluindo as aspas e reticências exatamente como estão** e a assinatura (`@celure_turismo · ...`). Confira que todos os cards têm a mesma marcação (diff entre eles só nos dados). Se algum diferir, mantenha esse card literal no componente em vez de vir do `map`.

- [ ] **Step 3: Portar** o componente. O card original vira o corpo de `{depoimentos.map((d) => (...))}`, com a marcação idêntica (`<!-- Card N -->` pode sumir). O texto é renderizado como `{d.texto}`, mantendo a mesma quebra/indentação dentro do `<p>` (espaços em volta não afetam o visual). As setas usam `data-testimonial-scroll`. Script:
```astro
<script>
  const track = document.getElementById('testimonial-carousel');
  document.querySelectorAll<HTMLElement>('[data-testimonial-scroll]').forEach((btn) =>
    btn.addEventListener('click', () => {
      if (!track) return;
      const card = track.querySelector('div');
      const width = card ? card.offsetWidth + 24 : 320;
      track.scrollBy({ left: width * Number(btn.dataset.testimonialScroll), behavior: 'smooth' });
    }));
</script>
```

- [ ] **Step 4:** Run `npx playwright test depoimentos` e `npx playwright test visual -g depoimentos` → PASS.
- [ ] **Step 5: Commit** `feat: seção de depoimentos com carrossel` (com Co-Authored-By).

---

### Task 9: Serviços (coverflow) + CTAs rápidos do WhatsApp

**Files:**
- Create: `src/data/servicos.ts`, `src/components/Servicos.astro` (de `:1565-1715`), `src/scripts/cta.ts`
- Modify: `src/layouts/BaseLayout.astro` (importa `cta.ts` uma vez, valendo para a página toda), `src/pages/index.astro`
- Test: `tests/e2e/servicos.spec.ts`

**Interfaces:**
- Consumes: `coverflowPose`, `wrapIndex`, `ctaMessage`, `getWhatsAppUrl`
- Produces: `src/data/servicos.ts`:
  ```ts
  export type Servico = { img: string; alt: string; icon: string; titulo: string; descricao: string; tags: string[]; cta: string; ctaLabel: string };
  export const servicos: Servico[];
  ```

- [ ] **Step 1: Teste que falha** (`tests/e2e/servicos.spec.ts`):
```ts
import { test, expect } from '@playwright/test';

const tx = (page, i: number) => page.locator(`.coverflow-card[data-index="${i}"]`).evaluate((el: HTMLElement) => el.style.transform);

test('coverflow: posição inicial, setas com volta e clique no card', async ({ page }) => {
  await page.goto('/');
  expect(await tx(page, 0)).toBe('translateX(-50%) translateX(0px) scale(1)');
  expect(await tx(page, 1)).toBe('translateX(-50%) translateX(170px) scale(0.78)');
  expect(await tx(page, 3)).toBe('translateX(-50%) translateX(-170px) scale(0.78)');
  await page.locator('#servicos').scrollIntoViewIfNeeded();
  await page.locator('[data-coverflow-nav="-1"]').click();
  expect(await tx(page, 3)).toBe('translateX(-50%) translateX(0px) scale(1)');
  await page.locator('[data-coverflow-nav="1"]').click();
  await page.locator('[data-coverflow-nav="1"]').click();
  expect(await tx(page, 1)).toBe('translateX(-50%) translateX(0px) scale(1)');
  await page.locator('.coverflow-card[data-index="2"]').click({ position: { x: 20, y: 20 } });
  expect(await tx(page, 2)).toBe('translateX(-50%) translateX(0px) scale(1)');
});

test('CTA de serviço vira link do WhatsApp com a mensagem certa', async ({ page, context }) => {
  await page.goto('/');
  const cta = page.locator('[data-cta-service="passagens"]');
  await page.locator('#servicos').scrollIntoViewIfNeeded();
  const popup = context.waitForEvent('page').catch(() => null);
  await cta.click();
  const href = await cta.getAttribute('href');
  expect(href).toBe('https://wa.me/5553999491336?text=' + encodeURIComponent(
    'Olá, equipe Celure! Gostaria de conversar sobre emissão inteligente de passagens aéreas (milhas e dinheiro) para o meu próximo destino.'));
  await popup;
});
```
Antes de escrever o `cta.ts`, verifique no original se os links `data-cta-service` têm `target="_blank"`. O comportamento (mesma aba ou nova) deve ser o mesmo; ajuste a última linha do teste se for o caso.
Run → FAIL.

- [ ] **Step 2: Extrair os dados** dos 4 cards (`:1587-1703`): passagens, milhas, roteiros, premium. Mesma regra da Task 8: marcação idêntica via `map`, `data-index={i}` e `data-coverflow-goto={i}`.

- [ ] **Step 3: Portar o componente e o script do coverflow**:
```astro
<script>
  import { coverflowPose, wrapIndex } from '../lib/carousel';
  const cards = [...document.querySelectorAll<HTMLElement>('.coverflow-card')];
  const count = cards.length;
  let active = 0;
  function render() {
    cards.forEach((card) => {
      const p = coverflowPose(Number(card.dataset.index), active, count);
      card.style.transform = `translateX(-50%) translateX(${p.translateX}px) scale(${p.scale})`;
      card.style.opacity = String(p.opacity);
      card.style.zIndex = String(p.zIndex);
      card.style.pointerEvents = p.pointerEvents;
    });
  }
  document.querySelectorAll<HTMLElement>('[data-coverflow-nav]').forEach((b) =>
    b.addEventListener('click', () => { active = wrapIndex(active + Number(b.dataset.coverflowNav), count); render(); }));
  cards.forEach((c) => c.addEventListener('click', () => { active = Number(c.dataset.coverflowGoto); render(); }));
  render();
</script>
```

- [ ] **Step 4: CTAs globais** em `src/scripts/cta.ts`:
```ts
import { ctaMessage, getWhatsAppUrl } from '../lib/whatsapp';
document.querySelectorAll<HTMLAnchorElement>('[data-cta-service]').forEach((btn) =>
  btn.addEventListener('click', () => { btn.href = getWhatsAppUrl(ctaMessage(btn.getAttribute('data-cta-service'))); }));
```
Em `BaseLayout.astro`, antes de `</body>`: `<script>import '../scripts/cta';</script>`.

- [ ] **Step 5:** Run `npx playwright test servicos` e `npx playwright test visual -g servicos` → PASS.
- [ ] **Step 6: Commit** `feat: seção de serviços com coverflow e CTAs do WhatsApp` (com Co-Authored-By).

---

### Task 10: Passos + Cotação (formulário) + Rodapé + botão flutuante

**Files:**
- Create: `src/components/Passos.astro` (`:1717-1768`), `src/components/Cotacao.astro` (`:1771-1863`), `src/components/Footer.astro` (`:1865-1914`), `src/components/WhatsAppFloat.astro` (`:1916-1922`)
- Modify: `src/pages/index.astro` (ordem final: AnnouncementBar, Navbar, Hero, Sobre, Luxo, Depoimentos, Servicos, Passos, Cotacao, Footer, WhatsAppFloat, DestPhotoLightbox, VideoLightbox)
- Test: `tests/e2e/cotacao.spec.ts`

**Interfaces:**
- Consumes: `buildQuoteMessage`, `getWhatsAppUrl`; `celure` (se o rodapé exibir CNPJ/Instagram, use `celure.cnpj` / `celure.instagram` no lugar do texto fixo, gerando o mesmo texto)

- [ ] **Step 1: Teste que falha** (`tests/e2e/cotacao.spec.ts`):
```ts
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ context }) => {
  await context.route('https://wa.me/**', (r) => r.fulfill({ body: 'ok' })); // não depende da rede
});

test('formulário abre o WhatsApp com a mensagem formatada', async ({ page, context }) => {
  await page.goto('/#cotacao');
  await page.fill('#quote-name', 'Ana & Zé');
  await page.selectOption('#quote-service', 'Planejamento de Roteiro Sob Medida');
  await page.fill('#quote-destination', 'Noronha');
  await page.selectOption('#quote-travelers', '3 a 4 pessoas (Família)');
  const [popup] = await Promise.all([context.waitForEvent('page'), page.click('#celure-quote-form button[type="submit"]')]);
  await popup.waitForLoadState();
  const url = new URL(popup.url());
  expect(url.origin + url.pathname).toBe('https://wa.me/5553999491336');
  const text = url.searchParams.get('text')!;
  expect(text).toContain('Me chamo *Ana & Zé*');
  expect(text).toContain('📍 *Destino:* Noronha\n');
  expect(text).toContain('📅 *Período/Época:* A definir\n');
  expect(text).not.toContain('Observações');
});

test('nome é obrigatório', async ({ page, context }) => {
  await page.goto('/#cotacao');
  let opened = false;
  context.on('page', () => { opened = true; });
  await page.click('#celure-quote-form button[type="submit"]');
  await page.waitForTimeout(500);
  expect(opened).toBe(false);
});
```
Run → FAIL.

- [ ] **Step 2: Portar** os quatro componentes com as Regras de portabilidade e montar a ordem final em `index.astro`.

- [ ] **Step 3: Script** no fim de `Cotacao.astro`:
```astro
<script>
  import { buildQuoteMessage, getWhatsAppUrl } from '../lib/whatsapp';
  const form = document.getElementById('celure-quote-form') as HTMLFormElement | null;
  const val = (id: string) => (document.getElementById(id) as HTMLInputElement | null)?.value ?? '';
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = buildQuoteMessage({
      name: val('quote-name'), service: val('quote-service'), destination: val('quote-destination'),
      dates: val('quote-dates'), travelers: val('quote-travelers'), details: val('quote-details'),
    });
    window.open(getWhatsAppUrl(msg), '_blank');
  });
</script>
```

- [ ] **Step 4:** Run `npx playwright test cotacao` e `npx playwright test visual -g "passos|cotacao|rodape"` → PASS.
- [ ] **Step 5: Commit** `feat: passos, cotação, rodapé e botão flutuante` (com Co-Authored-By).

---

### Task 11: Verificação final

**Files:** nenhum novo (só correções que surgirem).

- [ ] **Step 1:** `npm test` → PASS.
- [ ] **Step 2:** `npm run build` → sem erros e sem avisos relevantes.
- [ ] **Step 3:** `npx playwright test` (tudo: visual + comportamento, desktop + mobile) → PASS. Inclui o teste "sem rolagem horizontal no celular" da Task 4.
- [ ] **Step 4: Sem 404.** Teste temporário (ou via console no `npm run preview`): carregar `/`, registrar `page.on('response')` e confirmar que nenhuma resposta tem status ≥ 400. Também abrir os três vídeos e conferir que carregam.
- [ ] **Step 5: Conferência com o site no ar.** Abrir https://celure-viagens.vercel.app/ e `http://localhost:4321` lado a lado (1150px e 390px) e percorrer as seções. Qualquer diferença entre o repositório original e o site no ar (ex.: textos atualizados direto na Vercel) é corrigida a favor do site no ar.
- [ ] **Step 6: Commit** final, se houve ajustes: `fix: ajustes finais de fidelidade` (com Co-Authored-By).
