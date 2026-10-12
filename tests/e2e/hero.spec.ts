import { test, expect } from '@playwright/test';

const frame = (page) => page.locator('#hero-canvas').evaluate((c: HTMLElement) => Number(c.dataset.frame));

test('vídeo da abertura só anda com a rolagem (parado não mexe; desce e volta)', async ({ page }) => {
  await page.goto('/');
  await page.waitForTimeout(1500);
  expect(await frame(page)).toBe(0); // parado: não toca sozinho
  const room = await page.evaluate(() => document.getElementById('hero')!.offsetHeight - innerHeight);
  await page.evaluate((y) => scrollTo(0, y), Math.round(room * 0.4));
  await expect.poll(() => frame(page)).toBeGreaterThan(20);
  await page.evaluate((y) => scrollTo(0, y), Math.round(room * 0.9));
  await expect.poll(() => frame(page)).toBe(127); // último quadro
  await page.evaluate(() => scrollTo(0, 0));
  await expect.poll(() => frame(page)).toBe(0); // rolou para cima, volta ao início
});
