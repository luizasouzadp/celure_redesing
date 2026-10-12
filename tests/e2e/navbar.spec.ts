import { test, expect } from '@playwright/test';

test('cabeçalho ganha fundo com desfoque ao rolar além de 40px e volta', async ({ page }, info) => {
  test.skip(info.project.name !== 'desktop'); // no celular o fundo é fixo
  await page.goto('/');
  const nav = page.locator('#navbar');
  await expect(nav).not.toHaveClass(/is-scrolled/);
  await page.evaluate(() => window.scrollTo(0, 200));
  await expect(nav).toHaveClass(/is-scrolled/);
  // o vidro fosco precisa sobreviver ao build
  await expect.poll(() => nav.evaluate((el) => getComputedStyle(el).backdropFilter)).toBe('blur(12px)');
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(nav).not.toHaveClass(/is-scrolled/);
});

test('menu mobile abre, e clicar num link fecha', async ({ page }, info) => {
  test.skip(info.project.name !== 'mobile');
  await page.goto('/');
  const menu = page.locator('#mobile-menu');
  const toggle = page.locator('#mobile-menu-toggle');
  await expect(menu).toBeHidden();
  await toggle.click();
  await expect(menu).toBeVisible();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await menu.locator('.mobile-nav-link').first().click();
  await expect(menu).toBeHidden();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
});

test('sem rolagem horizontal', async ({ page }) => {
  await page.goto('/');
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});
