import { test, expect } from '@playwright/test';

test('4 serviços, cada um com seu botão de WhatsApp', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#servicos [data-cta-service]')).toHaveCount(4);
});

test('CTA de serviço leva ao WhatsApp com a mensagem certa (mesma aba)', async ({ page }) => {
  await page.route('https://wa.me/**', (r) => r.fulfill({ body: 'ok' })); // não depende da rede
  await page.goto('/');
  const cta = page.locator('[data-cta-service="passagens"]');
  await cta.scrollIntoViewIfNeeded();
  await cta.click();
  await page.waitForURL(/wa\.me/);
  expect(page.url()).toBe('https://wa.me/5553999491336?text=' + encodeURIComponent(
    'Olá, equipe Celure! Gostaria de conversar sobre emissão inteligente de passagens aéreas (milhas e dinheiro) para o meu próximo destino.'));
});
