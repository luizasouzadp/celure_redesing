# Janela "Salas VIP: o que inclui" Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** O link "Saber como acessar" da seção Salas VIP abre uma janela por cima da página (mesma URL) explicando tudo o que uma sala VIP costuma incluir, com botão final para o WhatsApp.

**Architecture:** Um componente genérico do design system, `Modal.astro` (painel de leitura sobreposto, com abrir/fechar, Esc, clique fora, foco preso e página de trás travada), aberto por qualquer elemento com `data-modal-open="<id>"`. Uma seção `SalasVipModal.astro` monta o conteúdo a partir de `src/data/salas-vip.ts`, reaproveitando `AmbientVideo`, `IncludedList`, `Eyebrow` e `Button`. O link existente ganha `data-modal-open` e mantém `href="#cotacao"` como reserva sem JavaScript.

**Tech Stack:** Astro 7, CSS com tokens do Celure DS, TypeScript no `<script>` do componente, Vitest (unidade), Playwright (desktop 1440×900 e celular 390×844, sobre o build).

**Spec:** `docs/superpowers/specs/2026-10-12-janela-salas-vip-design.md`

## Global Constraints

- Seguir `DESIGN.md`: só modo escuro (`--ink-900`), texto branco em 100/60/50/40, único destaque laranja `--brand-accent`; sem sombras, sem cantos arredondados (só a pílula do botão), fios de 1px `--line-hairline`.
- Ícones só do conjunto próprio (`src/assets/icons`), traço fino branco; nada de Lucide/Heroicons/emoji.
- Títulos em duas frases, a segunda com `color-white-40`. Textos em pt-BR, "você"/"nós". Botões com verbo + intenção em Title Case.
- Conteúdo **geral** sobre salas VIP; nenhuma promessa específica da Celure. Sem lista de cartões nesta versão.
- Endereço (URL) não muda ao abrir/fechar. Sem JavaScript o link continua indo para `#cotacao`.
- O CTA "Falar sobre Classe Executiva" continua indo para `#cotacao`, sem abrir janela.
- Respeitar "reduzir movimento" (o `AmbientVideo` já faz isso). Áreas de toque ≥ 40px. Conferir em 390px.

## Review Focus

1. Teclado: Tab/Shift+Tab com a janela aberta nunca levam o foco para a página de trás — testado na Task 3.
2. Rolar com a janela aberta não rola a página de trás — testado na Task 3 (`html` com `overflow: hidden`) e na Task 4.
3. Clicar dentro do painel (texto, vídeo) não fecha a janela; só fundo, X e Esc fecham — testado nas Tasks 3 e 4.
4. Abrir, fechar e abrir de novo funciona e o foco volta ao link que abriu — testado na Task 4.
5. Celular 390px: painel ocupa a tela inteira, conteúdo rola até o botão do WhatsApp e o X fica sempre visível — testado na Task 4.

---

### Task 1: Mensagem de WhatsApp "salas-vip"

**Files:**
- Modify: `src/lib/whatsapp.ts` (tipo `CtaService` e `CTA_TAILS`)
- Test: `tests/unit/whatsapp.test.ts`

**Interfaces:**
- Produces: `ctaMessage('salas-vip')` → `'Olá, equipe Celure! Gostaria de conversar sobre como ter acesso às salas VIP dos aeroportos nas minhas próximas viagens.'`

- [ ] **Step 1: Write the failing test** — em `tests/unit/whatsapp.test.ts`, dentro do `it.each` de `ctaMessage`, acrescentar a linha logo antes de `['geral', …]`:

```ts
    ['salas-vip', 'como ter acesso às salas VIP dos aeroportos nas minhas próximas viagens.'],
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/whatsapp.test.ts`
Expected: FAIL no caso `salas-vip` (recebe a mensagem "geral").

- [ ] **Step 3: Write minimal implementation** — em `src/lib/whatsapp.ts`:

```ts
export type CtaService = 'passagens' | 'consultoria-milhas' | 'roteiro' | 'experiencias' | 'salas-vip' | 'geral';
```

e em `CTA_TAILS`, antes de `geral`:

```ts
  'salas-vip': 'como ter acesso às salas VIP dos aeroportos nas minhas próximas viagens.',
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/unit/whatsapp.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/lib/whatsapp.ts tests/unit/whatsapp.test.ts
git commit -m "feat: mensagem de WhatsApp para acesso às salas VIP"
```

---

### Task 2: Ícones novos das salas VIP

**Files:**
- Create: `src/assets/icons/lounge-drinks.svg`, `lounge-shower.svg`, `lounge-rest.svg`, `lounge-wifi.svg`, `lounge-quiet.svg`
- Modify: `src/pages/design-system.astro:39` (lista `icones`)
- Modify: `DESIGN.md` (seção "Adições feitas ao design system original")
- Test: `tests/unit/icons.test.ts` (novo)

**Interfaces:**
- Produces: nomes de ícone `lounge-drinks`, `lounge-shower`, `lounge-rest`, `lounge-wifi`, `lounge-quiet` para `<Icon name="…" />`. O buffet usa o existente `included-meals`.

- [ ] **Step 1: Write the failing test** — `tests/unit/icons.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';

const novos = ['lounge-drinks', 'lounge-shower', 'lounge-rest', 'lounge-wifi', 'lounge-quiet'];

describe('ícones das salas VIP', () => {
  it.each(novos)('%s existe no traço do design system (24px, linha branca)', (nome) => {
    const path = `src/assets/icons/${nome}.svg`;
    expect(existsSync(path)).toBe(true);
    const svg = readFileSync(path, 'utf8');
    // o Icon.astro remove width/height com esta ordem exata
    expect(svg.startsWith('<svg width="24" height="24" viewBox="0 0 24 24"')).toBe(true);
    expect(svg).toContain('stroke="white"');
    expect(svg).toContain('stroke-width="1.5"');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/icons.test.ts`
Expected: FAIL (arquivos não existem).

- [ ] **Step 3: Create the icons** (um arquivo por bloco, conteúdo exato, numa linha só):

`src/assets/icons/lounge-drinks.svg` (taça):
```svg
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3h10l-1 6a4 4 0 0 1-8 0L7 3Z"/><path d="M7.5 6h9"/><path d="M12 13v7"/><path d="M8 21h8"/></svg>
```

`src/assets/icons/lounge-shower.svg` (chuveiro):
```svg
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 21V6a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v1"/><path d="M8 7h8"/><path d="M9 11v1M12 11v1M15 11v1M10.5 14.5v1M13.5 14.5v1M9 18v1M12 18v1M15 18v1"/></svg>
```

`src/assets/icons/lounge-rest.svg` (poltrona):
```svg
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 11V7a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v4"/><path d="M3 13a2 2 0 0 1 4 0v2h10v-2a2 2 0 0 1 4 0v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4Z"/><path d="M6 19v2M18 19v2"/></svg>
```

`src/assets/icons/lounge-wifi.svg`:
```svg
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 8.5a15 15 0 0 1 20 0"/><path d="M5 12a10 10 0 0 1 14 0"/><path d="M8.5 15.5a5 5 0 0 1 7 0"/><path d="M12 19h.01" stroke-width="2.5"/></svg>
```

`src/assets/icons/lounge-quiet.svg` (alto-falante mudo):
```svg
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H3v6h3l5 4V5Z"/><path d="m16 9 5 6M21 9l-5 6"/></svg>
```

- [ ] **Step 4: Show them in the showcase** — em `src/pages/design-system.astro:39`, acrescentar ao fim do array `icones` (antes de `'step-1'` não importa; ao final):

```ts
, 'lounge-drinks', 'lounge-shower', 'lounge-rest', 'lounge-wifi', 'lounge-quiet'
```

e em `DESIGN.md`, na lista "Adições feitas ao design system original", acrescentar:

```md
- Ícones das salas VIP: `lounge-drinks`, `lounge-shower`, `lounge-rest`, `lounge-wifi`, `lounge-quiet` (mesmo traço de 1,5px).
```

- [ ] **Step 5: Run tests and build**

Run: `npx vitest run && npm run build`
Expected: todos PASS; build sem erro "Ícone não encontrado".

- [ ] **Step 6: Commit**

```bash
git add src/assets/icons/lounge-*.svg src/pages/design-system.astro DESIGN.md tests/unit/icons.test.ts
git commit -m "feat: ícones de open bar, chuveiro, descanso, Wi-Fi e silêncio"
```

---

### Task 3: Componente `Modal` do design system

**Files:**
- Create: `src/components/ds/Modal.astro`
- Modify: `src/pages/design-system.astro` (demonstração), `DESIGN.md` (lista de componentes + adições)
- Test: `tests/e2e/modal.spec.ts` (novo)

**Interfaces:**
- Produces: `<Modal id="…" labelledby="…">conteúdo</Modal>`. Abre com qualquer elemento `[data-modal-open="<id>"]` (o clique tem `preventDefault`, então um `<a href="#x">` não navega). Fecha com `[data-modal-close]` (o X já vem com isso), clique no fundo ou Esc. Classe `ds-modal-open` no `<html>` enquanto aberta. Partes: `.ds-modal` (fundo), `.ds-modal__panel`, `.ds-modal__body` (área que rola).

- [ ] **Step 1: Write the failing test** — `tests/e2e/modal.spec.ts`:

```ts
import { test, expect } from '@playwright/test';

test('Modal: abre, prende o foco, trava a página e fecha por X, Esc e fundo', async ({ page }, info) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('/design-system');
  const url = page.url();
  const modal = page.locator('#demo-modal');
  const opener = page.locator('[data-modal-open="demo-modal"]');
  await expect(modal).toBeHidden();

  await opener.click();
  await expect(modal).toBeVisible();
  expect(page.url()).toBe(url);
  await expect(page.locator('html')).toHaveClass(/ds-modal-open/);
  await expect(page.locator('html')).toHaveCSS('overflow', 'hidden');

  // foco preso: 6 Tabs e 6 Shift+Tabs nunca saem da janela
  for (const key of ['Tab', 'Shift+Tab']) {
    for (let i = 0; i < 6; i++) {
      await page.keyboard.press(key);
      expect(await page.evaluate(() => !!document.activeElement?.closest('#demo-modal'))).toBe(true);
    }
  }

  // clicar no texto do painel não fecha
  await modal.locator('#demo-modal-title').click();
  await expect(modal).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(modal).toBeHidden();
  await expect(opener).toBeFocused();
  await expect(page.locator('html')).not.toHaveClass(/ds-modal-open/);

  await opener.click();
  await modal.locator('[data-modal-close]').click();
  await expect(modal).toBeHidden();

  if (info.project.name === 'desktop') {
    await opener.click();
    await modal.click({ position: { x: 5, y: 5 } }); // fundo escuro, fora do painel
    await expect(modal).toBeHidden();
  }
  expect(errors).toEqual([]);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx playwright test tests/e2e/modal.spec.ts`
Expected: FAIL (`[data-modal-open="demo-modal"]` não existe).

- [ ] **Step 3: Write `src/components/ds/Modal.astro`**

```astro
---
// Janela de leitura por cima da página (mesma URL): fundo escuro, painel com fio de 1px e conteúdo que rola.
// Abre com qualquer elemento [data-modal-open="<id>"]; fecha no X, no fundo ou com Esc.
// Enquanto aberta, o foco fica preso dentro dela e a página de trás não rola. No celular ocupa a tela toda.
import CloseButton from './CloseButton.astro';
interface Props { id: string; labelledby: string; class?: string }
const { id, labelledby, class: className } = Astro.props;
---
<div id={id} class:list={['ds-modal', className]} role="dialog" aria-modal="true" aria-labelledby={labelledby} hidden>
  <div class="ds-modal__panel">
    <CloseButton class="ds-modal__close" data-modal-close />
    <div class="ds-modal__body"><slot /></div>
  </div>
</div>

<style>
  .ds-modal {
    position: fixed; inset: 0; z-index: 200; display: flex; align-items: center; justify-content: center;
    padding: 2rem var(--container-pad); background: rgba(9, 27, 32, .85);
    -webkit-backdrop-filter: blur(var(--blur-header-mobile)); backdrop-filter: blur(var(--blur-header-mobile));
    animation: ds-modal-in var(--dur-panel) var(--ease);
  }
  .ds-modal[hidden] { display: none; }
  .ds-modal__panel {
    position: relative; display: flex; width: min(72rem, 100%); max-height: calc(100svh - 4rem);
    background: var(--ink-900); border: 1px solid var(--line-hairline);
  }
  .ds-modal__body { flex: 1; min-width: 0; overflow-y: auto; overscroll-behavior: contain; }
  /* o X fica sempre no canto, por cima do conteúdo que rola; área de toque de 40px */
  .ds-modal__panel :global(.ds-modal__close) {
    position: absolute; top: 1rem; right: 1rem; z-index: 1; width: 2.5rem; height: 2.5rem; place-items: center;
    background: var(--ink-900);
  }
  :global(html.ds-modal-open), :global(html.ds-modal-open body) { overflow: hidden; }
  @keyframes ds-modal-in { from { opacity: 0; } to { opacity: 1; } }
  @media (prefers-reduced-motion: reduce) { .ds-modal { animation: none; } }
  @media (max-width: 767px) {
    .ds-modal { padding: 0; }
    .ds-modal__panel { width: 100%; height: 100svh; max-height: none; border: 0; }
  }
</style>

<script>
  const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select, textarea, video[controls], [tabindex]:not([tabindex="-1"])';
  let opener: HTMLElement | null = null;

  function open(modal: HTMLElement, from: HTMLElement) {
    opener = from;
    modal.hidden = false;
    document.documentElement.classList.add('ds-modal-open');
    modal.querySelector<HTMLElement>('[data-modal-close]')?.focus();
  }

  function close(modal: HTMLElement) {
    modal.hidden = true;
    document.documentElement.classList.remove('ds-modal-open');
    opener?.focus();
    opener = null;
  }

  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const trigger = target.closest<HTMLElement>('[data-modal-open]');
    if (trigger) {
      const modal = document.getElementById(trigger.dataset.modalOpen!);
      if (modal?.classList.contains('ds-modal')) { e.preventDefault(); open(modal, trigger); }
      return;
    }
    const modal = target.closest<HTMLElement>('.ds-modal');
    if (modal && (target === modal || target.closest('[data-modal-close]'))) close(modal);
  });

  document.addEventListener('keydown', (e) => {
    const modal = document.querySelector<HTMLElement>('.ds-modal:not([hidden])');
    if (!modal) return;
    if (e.key === 'Escape') { close(modal); return; }
    if (e.key !== 'Tab') return;
    const items = [...modal.querySelectorAll<HTMLElement>(FOCUSABLE)].filter((el) => el.getClientRects().length > 0);
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    const inside = modal.contains(document.activeElement);
    if (e.shiftKey && (document.activeElement === first || !inside)) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && (document.activeElement === last || !inside)) { e.preventDefault(); first.focus(); }
  });
</script>
```

Nota: o `CloseButton` repassa atributos extras (`{...rest}`), então `data-modal-close` chega ao `<button>`. O `.ds-close` usa `display: grid`; o `place-items: center` acima centraliza o X na área de 40px.

- [ ] **Step 4: Add the showcase demo** — em `src/pages/design-system.astro`: importar `import Modal from '../components/ds/Modal.astro';` junto aos outros imports, e logo antes de `<CookieBanner open>` acrescentar:

```astro
    <section class="padding-global container">
      <SectionHead eyebrow="Janela"><Fragment slot="title">Modal <span class="color-white-40">— leitura por cima da página.</span></Fragment></SectionHead>
      <Button variant="secondary" data-modal-open="demo-modal">Abrir Exemplo</Button>
      <Modal id="demo-modal" labelledby="demo-modal-title">
        <div style="padding:var(--cell-pad);display:flex;flex-direction:column;gap:1.5rem">
          <h2 id="demo-modal-title" class="h3">Título da janela. <span class="color-white-40">Frase de apoio.</span></h2>
          <p class="body-md color-white-60">Conteúdo de exemplo. Fecha no X, clicando fora ou com Esc.</p>
          <TextLink href="#">Um link dentro da janela</TextLink>
          <Button href="#">Ação Principal</Button>
        </div>
      </Modal>
    </section>
```

E em `DESIGN.md`: na lista de componentes, depois de `` `Lightbox` · `` acrescentar `` `Modal` (janela de leitura por cima da página, aberta por `data-modal-open`) · ``; na lista de adições, acrescentar à linha de `Eyebrow`, `Lightbox`… o item `` `Modal` ``.

- [ ] **Step 5: Run test to verify it passes**

Run: `npx playwright test tests/e2e/modal.spec.ts`
Expected: PASS em `desktop` e `mobile`.

- [ ] **Step 6: Commit**

```bash
git add src/components/ds/Modal.astro src/pages/design-system.astro DESIGN.md tests/e2e/modal.spec.ts
git commit -m "feat: componente Modal do design system (janela de leitura)"
```

---

### Task 4: Janela "Salas VIP" ligada ao "Saber como acessar"

**Files:**
- Create: `src/data/salas-vip.ts`, `src/components/sections/SalasVipModal.astro`
- Modify: `src/components/sections/ExperienciaVip.astro:21` e `:54`, `src/pages/index.astro`
- Test: `tests/e2e/salas-vip.spec.ts` (novo)

**Interfaces:**
- Consumes: `Modal` (Task 3), ícones `lounge-*` (Task 2), `ctaMessage('salas-vip')` e `getWhatsAppUrl` (Task 1), `IncludedList` (`items: { icon?: string; label: string; text?: string }[]`, `columns?: number`), `AmbientVideo`, `Eyebrow`, `Button`.
- Produces: janela `#salas-vip` com título `#salas-vip-title`; link `#luxo [data-modal-open="salas-vip"]`.

- [ ] **Step 1: Write the failing test** — `tests/e2e/salas-vip.spec.ts`:

```ts
import { test, expect } from '@playwright/test';

test('"Saber como acessar" abre a janela das salas VIP sem mudar o endereço', async ({ page }, info) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('/');
  const url = page.url();
  const link = page.locator('#luxo [data-modal-open="salas-vip"]');
  const modal = page.locator('#salas-vip');

  await expect(link).toHaveCount(1);
  await expect(link).toHaveText('Saber como acessar');
  await expect(link).toHaveAttribute('href', '#cotacao'); // reserva sem JavaScript
  await expect(page.locator('#luxo a', { hasText: 'Falar sobre Classe Executiva' })).not.toHaveAttribute('data-modal-open', /.*/);

  await link.scrollIntoViewIfNeeded();
  await link.click();
  await expect(modal).toBeVisible();
  expect(page.url()).toBe(url);
  await expect(page.locator('#salas-vip-title')).toContainText('O que te espera numa sala VIP');
  await expect(modal.locator('.ds-included-list__item')).toHaveCount(6);
  await expect(modal.locator('.salas-vip__saber li')).toHaveCount(5);
  await expect(page.locator('html')).toHaveCSS('overflow', 'hidden');

  // rola até o fim e o botão do WhatsApp aparece, com a mensagem das salas VIP
  const cta = modal.locator('a.ds-button');
  await cta.scrollIntoViewIfNeeded();
  await expect(cta).toBeInViewport();
  await expect(cta).toHaveAttribute('target', '_blank');
  const href = await cta.getAttribute('href');
  expect(href).toContain('https://wa.me/5553999491336?text=');
  expect(decodeURIComponent(href!.split('text=')[1])).toContain('salas VIP');
  await expect(modal.locator('[data-modal-close]')).toBeInViewport(); // X continua visível após rolar

  // clicar no conteúdo não fecha; Esc fecha e devolve o foco ao link
  await page.locator('#salas-vip-title').click();
  await expect(modal).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(modal).toBeHidden();
  await expect(link).toBeFocused();

  // reabre e fecha pelo X
  await link.click();
  await expect(modal).toBeVisible();
  await modal.locator('[data-modal-close]').click();
  await expect(modal).toBeHidden();

  if (info.project.name === 'mobile') {
    await link.click();
    const box = (await modal.locator('.ds-modal__panel').boundingBox())!;
    expect(box.width).toBeGreaterThanOrEqual(389);
    expect(box.height).toBeGreaterThan(800);
    await page.keyboard.press('Escape');
  }
  expect(page.url()).toBe(url);
  expect(errors).toEqual([]);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx playwright test tests/e2e/salas-vip.spec.ts`
Expected: FAIL (`[data-modal-open="salas-vip"]` com contagem 0).

- [ ] **Step 3: Write the content file** — `src/data/salas-vip.ts`:

```ts
// Conteúdo da janela "Salas VIP: o que inclui" — geral, vale para a maioria das salas.
// O que a Celure oferece especificamente (e os cartões) entra depois, combinado com o Lucas.
export type ItemSala = { icon: string; titulo: string; texto: string };

export const salasVip = {
  eyebrow: 'Experiência VIP',
  titulo: 'O que te espera numa sala VIP.',
  dim: 'Muito além de uma cadeira confortável.',
  intro: 'Antes do embarque, você troca o barulho do saguão por um espaço tranquilo, com comida, bebida e conforto à vontade. Veja o que a maioria das salas oferece.',
  itens: [
    { icon: 'included-meals', titulo: 'Buffet à vontade', texto: 'Pratos quentes e frios, saladas, frutas e sobremesas, repostos ao longo do dia. Em algumas salas, há pratos feitos na hora.' },
    { icon: 'lounge-drinks', titulo: 'Open bar', texto: 'Vinhos, espumantes, cervejas, drinques, café, chás e sucos. Tudo incluso, sem conta no final.' },
    { icon: 'lounge-shower', titulo: 'Banho antes do voo', texto: 'Chuveiros privativos com toalha e produtos de higiene, perfeitos antes de um voo longo. Nem toda sala tem.' },
    { icon: 'lounge-rest', titulo: 'Descanso', texto: 'Poltronas amplas e cantos tranquilos para relaxar. Algumas salas têm espaços reservados para cochilar.' },
    { icon: 'lounge-wifi', titulo: 'Wi-Fi & tomadas', texto: 'Internet rápida e tomadas por toda parte para trabalhar, falar com a família ou carregar o celular com calma.' },
    { icon: 'lounge-quiet', titulo: 'Silêncio & privacidade', texto: 'Longe das filas e do barulho do saguão, com telas mostrando os voos para você não perder o embarque.' },
  ] satisfies ItemSala[],
  bomSaber: [
    'As salas ficam depois do raio-X, na área de embarque.',
    'Normalmente você pode entrar até 3 horas antes do seu voo.',
    'O acesso costuma vir pelo cartão de crédito ou pela classe da passagem.',
    'Acompanhantes podem ter regras diferentes, dependendo do cartão.',
    'Os serviços variam de uma sala para outra.',
  ],
  fechamento: { titulo: 'Quer saber se você já tem acesso?', dim: 'A gente te ajuda.', cta: 'Descobrir Meu Acesso' },
};
```

- [ ] **Step 4: Write the section** — `src/components/sections/SalasVipModal.astro`:

```astro
---
// Janela "Salas VIP: o que inclui", aberta pelo "Saber como acessar" da seção Experiência VIP.
// Computador: vídeo vertical fixo à esquerda e texto rolando à direita. Celular: vídeo em cima, recortado.
import Modal from '../ds/Modal.astro';
import AmbientVideo from '../ds/AmbientVideo.astro';
import IncludedList from '../ds/IncludedList.astro';
import Eyebrow from '../ds/Eyebrow.astro';
import Button from '../ds/Button.astro';
import { salasVip as s } from '../../data/salas-vip';
import { ctaMessage, getWhatsAppUrl } from '../../lib/whatsapp';
---
<Modal id="salas-vip" labelledby="salas-vip-title">
  <div class="salas-vip">
    <div class="salas-vip__midia">
      <AmbientVideo src="/assets/videos/lounge.mp4" poster="/assets/images/lounge-poster.webp" label="Vídeo de uma sala VIP de aeroporto" aspect="540 / 1170" />
    </div>
    <div class="salas-vip__texto">
      <Eyebrow>{s.eyebrow}</Eyebrow>
      <h2 id="salas-vip-title" class="h3">{s.titulo} <span class="color-white-40">{s.dim}</span></h2>
      <p class="body-lg color-white-60">{s.intro}</p>
      <IncludedList items={s.itens.map((i) => ({ icon: i.icon, label: i.titulo, text: i.texto }))} />
      <div class="salas-vip__saber">
        <h3 class="h4">Bom saber</h3>
        <ul>{s.bomSaber.map((t) => <li class="body-md color-white-60">{t}</li>)}</ul>
      </div>
      <div class="salas-vip__fim">
        <p class="h4">{s.fechamento.titulo} <span class="color-white-40">{s.fechamento.dim}</span></p>
        <Button href={getWhatsAppUrl(ctaMessage('salas-vip'))} target="_blank" rel="noopener noreferrer">{s.fechamento.cta}</Button>
      </div>
    </div>
  </div>
</Modal>

<style>
  .salas-vip { display: grid; grid-template-columns: 2fr 3fr; }
  .salas-vip__midia { position: sticky; top: 0; align-self: start; border-right: 1px solid var(--line-hairline); }
  .salas-vip__midia :global(.ds-ambient-video) { height: calc(100svh - 4rem - 2px); }
  .salas-vip__texto { display: flex; flex-direction: column; gap: 1.5rem; padding: var(--cell-pad); padding-top: 4.5rem; }
  .salas-vip__texto :global(.ds-included-list) { margin-top: 1rem; }
  .salas-vip__saber { display: flex; flex-direction: column; gap: 1rem; margin-top: 1.5rem; }
  .salas-vip__saber li { padding: .875rem 0; border-top: 1px solid var(--line-hairline); }
  .salas-vip__fim { display: flex; flex-direction: column; align-items: flex-start; gap: 1.5rem; padding-top: 2rem; border-top: 1px solid var(--line-hairline); }
  @media (max-width: 767px) {
    .salas-vip { grid-template-columns: 1fr; }
    .salas-vip__midia { position: static; border-right: 0; }
    .salas-vip__midia :global(.ds-ambient-video) { height: 45svh; }
    .salas-vip__texto { padding: 2rem var(--container-pad-mobile) 3rem; }
  }
</style>
```

Notas: o `AmbientVideo` só baixa/toca quando visível, então começa ao abrir a janela e pausa ao fechar (o `hidden` o tira da tela), sem código extra. Com "reduzir movimento" fica só a capa.

- [ ] **Step 5: Connect the link and the page**

Em `src/components/sections/ExperienciaVip.astro`, no primeiro bloco (linha 21), acrescentar `modal: 'salas-vip',` ao objeto:

```ts
    nota: 'Incluso nas consultorias e viagens Celure', cta: 'Saber como acessar', modal: 'salas-vip',
```

e trocar a linha 54:

```astro
          <TextLink href="#cotacao" data-modal-open={'modal' in b ? b.modal : undefined}>{b.cta}</TextLink>
```

Em `src/pages/index.astro`: importar `import SalasVipModal from '../components/sections/SalasVipModal.astro';` e colocar `<SalasVipModal />` logo depois de `<DestPhotoLightbox />`.

- [ ] **Step 6: Run the new test and the whole suite**

Run: `npx playwright test tests/e2e/salas-vip.spec.ts`
Expected: PASS em `desktop` e `mobile`.

Run: `npm test && npm run e2e`
Expected: tudo PASS (nada quebrado nas outras seções).

- [ ] **Step 7: Visual check** — `astro dev --background`, abrir `/` em 1440px e em 390px, clicar em "Saber como acessar" e conferir: vídeo à esquerda no computador / em cima no celular, X sempre visível, textos legíveis, nada colado na borda. Depois `astro dev stop`.

- [ ] **Step 8: Commit**

```bash
git add src/data/salas-vip.ts src/components/sections/SalasVipModal.astro src/components/sections/ExperienciaVip.astro src/pages/index.astro tests/e2e/salas-vip.spec.ts
git commit -m "feat: janela das salas VIP no 'Saber como acessar'"
```
