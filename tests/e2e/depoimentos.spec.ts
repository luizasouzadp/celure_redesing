import { test, expect } from '@playwright/test';

test('8 histórias e setas rolam a faixa', async ({ page }) => {
  await page.goto('/');
  const track = page.locator('#testimonial-carousel');
  await expect(track.locator(':scope > div')).toHaveCount(8);
  await track.scrollIntoViewIfNeeded();
  await page.locator('[data-testimonial-scroll="1"]').click();
  await expect.poll(() => track.evaluate((t) => t.scrollLeft)).toBeGreaterThan(0);
  const after = await track.evaluate((t) => t.scrollLeft);
  await page.locator('[data-testimonial-scroll="-1"]').click();
  await expect.poll(() => track.evaluate((t) => t.scrollLeft)).toBeLessThan(after);
});
