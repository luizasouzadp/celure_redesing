import { test, expect, type Page } from '@playwright/test';

const tx = (page: Page, i: number) =>
  page.locator(`.coverflow-card[data-index="${i}"]`).evaluate((el: HTMLElement) => el.style.transform);

test('coverflow: posição inicial, setas com volta e clique no card', async ({ page }) => {
  await page.goto('/');
  expect(await tx(page, 0)).toBe('translateX(-50%) translateX(0px) scale(1)');
  expect(await tx(page, 1)).toBe('translateX(-50%) translateX(170px) scale(0.78)');
  expect(await tx(page, 3)).toBe('translateX(-50%) translateX(-170px) scale(0.78)');
  await page.locator('#servicos').scrollIntoViewIfNeeded();
  await page.locator('[data-coverflow-nav="-1"]').click();
  expect(await tx(page, 3)).toBe('translateX(-50%) translateX(0px) scale(1)');
  await page.locator('[data-coverflow-nav="1"]').click();
  await page.locator('[data-coverflow-nav="1"]').click();
  expect(await tx(page, 1)).toBe('translateX(-50%) translateX(0px) scale(1)');
  // o card 2 está à direita, parcialmente coberto pelo card ativo: clica na parte visível dele
  const b1 = (await page.locator('.coverflow-card[data-index="1"]').boundingBox())!;
  const b2 = (await page.locator('.coverflow-card[data-index="2"]').boundingBox())!;
  const track = (await page.locator('#coverflow-track').boundingBox())!;
  const visibleRight = Math.min(b2.x + b2.width, track.x + track.width - 50); // antes da seta
  await page.mouse.click((b1.x + b1.width + visibleRight) / 2, b2.y + b2.height / 2);
  expect(await tx(page, 2)).toBe('translateX(-50%) translateX(0px) scale(1)');
});

test('CTA de serviço leva ao WhatsApp com a mensagem certa (mesma aba, como no original)', async ({ page }) => {
  await page.route('https://wa.me/**', (r) => r.fulfill({ body: 'ok' })); // não depende da rede
  await page.goto('/');
  await page.locator('#servicos').scrollIntoViewIfNeeded();
  const cta = page.locator('[data-cta-service="passagens"]');
  await cta.click();
  await page.waitForURL(/wa\.me/);
  expect(page.url()).toBe('https://wa.me/5553999491336?text=' + encodeURIComponent(
    'Olá, equipe Celure! Gostaria de conversar sobre emissão inteligente de passagens aéreas (milhas e dinheiro) para o meu próximo destino.'));
});
