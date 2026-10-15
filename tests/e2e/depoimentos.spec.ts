import { test, expect } from '@playwright/test';

test('8 histórias, faixa desliza sozinha e setas rolam a faixa', async ({ page }) => {
  await page.goto('/');
  const track = page.locator('#testimonial-carousel');
  await expect(track.locator(':scope > div:not([data-clone])')).toHaveCount(8);
  // cópias para o ciclo contínuo ficam escondidas de leitores de tela
  await expect(track.locator(':scope > div[data-clone]')).toHaveCount(8);
  await expect(track.locator(':scope > div[data-clone]').first()).toHaveAttribute('aria-hidden', 'true');
  await track.scrollIntoViewIfNeeded();
  const start = await track.evaluate((t) => t.scrollLeft);
  await expect.poll(() => track.evaluate((t) => t.scrollLeft)).toBeGreaterThan(start);
  await page.locator('[data-testimonial-scroll="1"]').click();
  const card = await track.evaluate((t) => (t.firstElementChild as HTMLElement).offsetWidth);
  await expect.poll(() => track.evaluate((t) => t.scrollLeft)).toBeGreaterThan(card * 0.9);
  const after = await track.evaluate((t) => t.scrollLeft);
  await page.locator('[data-testimonial-scroll="-1"]').click();
  await expect.poll(() => track.evaluate((t) => t.scrollLeft)).toBeLessThan(after);
});
