import { test, expect } from '@playwright/test';

test('nenhum arquivo da página retorna erro (404 etc.) e os 3 vídeos carregam', async ({ page, request }) => {
  const bad: string[] = [];
  page.on('response', (r) => { if (r.status() >= 400) bad.push(`${r.status()} ${r.url()}`); });
  await page.goto('/');
  await page.waitForLoadState('load');
  // força o carregamento de imagens com loading="lazy", se houver
  await page.evaluate(() => document.querySelectorAll('img').forEach((i) => i.setAttribute('loading', 'eager')));
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);
  expect(bad).toEqual([]);

  const srcs = await page.locator('[data-video-src]').evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.videoSrc!));
  expect(srcs).toHaveLength(3);
  for (const src of srcs) {
    const r = await request.get(src);
    expect(r.status(), src).toBe(200);
    expect(r.headers()['content-type']).toContain('video');
  }
});
