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

test('efeito de vidro fosco (backdrop-filter) sobrevive ao build', async ({ page }) => {
  await page.goto('/');
  expect(await page.locator('#navbar').evaluate((el) => getComputedStyle(el).backdropFilter)).toBe('blur(14px)');
});
