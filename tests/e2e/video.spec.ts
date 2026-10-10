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
