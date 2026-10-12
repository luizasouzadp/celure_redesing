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
