import { test, expect } from '@playwright/test';

test('nenhum arquivo da página retorna erro (404 etc.) e os vídeos carregam', async ({ page, request }) => {
  const bad: string[] = [];
  page.on('response', (r) => { if (r.status() >= 400) bad.push(`${r.status()} ${r.url()}`); });
  await page.goto('/');
  await page.waitForLoadState('load');
  // força o carregamento de imagens com loading="lazy", se houver
  await page.evaluate(() => document.querySelectorAll('img').forEach((i) => i.setAttribute('loading', 'eager')));
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);
  expect(bad).toEqual([]);

  // vídeos de ambiente (Experiência VIP): existem e são vídeos de verdade
  const srcs = await page.locator('video[data-ambient-src]').evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.ambientSrc!));
  expect(srcs).toHaveLength(2);
  for (const src of srcs) {
    const r = await request.get(src);
    expect(r.status(), src).toBe(200);
    expect(r.headers()['content-type']).toContain('video');
  }
});

test('vídeo do lounge só toca quando aparece na tela', async ({ page }) => {
  await page.goto('/');
  const v = page.locator('video[data-ambient-src="/assets/videos/lounge.mp4"]');
  expect(await v.evaluate((el: HTMLVideoElement) => el.currentSrc)).toBe(''); // ainda não baixou
  await v.scrollIntoViewIfNeeded();
  await expect.poll(() => v.evaluate((el: HTMLVideoElement) => !el.paused)).toBe(true);
});
