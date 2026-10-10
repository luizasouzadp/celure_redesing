import { test, expect } from '@playwright/test';
import { SECTIONS } from './sections';

test.describe('visual', () => {
  test.beforeEach(async ({ page }) => {
    // Congela efeitos que dependem da rolagem, senão a foto de seções altas "treme":
    // o navbar muda de altura ao rolar e o fundo parallax acompanha a tela.
    // Vale igual para o original e para o novo; o comportamento é testado em navbar.spec.ts.
    await page.addInitScript(() => {
      const add = window.addEventListener;
      window.addEventListener = function (type: string, ...rest: unknown[]) {
        if (type === 'scroll') return;
        return (add as Function).call(this, type, ...rest);
      } as typeof window.addEventListener;
    });
  });

  for (const [name, selector] of Object.entries(SECTIONS)) {
    test(name, async ({ page }) => {
      await page.goto('/');
      // navbar sai do modo "grudado" (mesmo lugar no fluxo, mas não cobre outras seções na foto)
      // e o botão flutuante do WhatsApp some, para não aparecer por cima das seções
      await page.addStyleTag({ content: `
        .parallax-bg { background-attachment: scroll !important; }
        #navbar { position: relative !important; }
        body > a.fixed { visibility: hidden !important; }
      ` });
      await page.evaluate(() => document.fonts.ready);
      // espera todas as imagens carregarem antes de fotografar
      await page.evaluate(async () => {
        await Promise.all([...document.images].map((i) => (i.complete ? null : new Promise((r) => { i.onload = i.onerror = r; }))));
      });
      await page.waitForLoadState('load');
      const el = page.locator(selector).first();
      await expect(el).toHaveScreenshot(`${name}.png`);
    });
  }
});
