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
