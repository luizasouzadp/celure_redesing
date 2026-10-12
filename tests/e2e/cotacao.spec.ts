import { test, expect } from '@playwright/test';

test.beforeEach(async ({ context }) => {
  await context.route('https://wa.me/**', (r) => r.fulfill({ body: 'ok' })); // não depende da rede
});

test('formulário abre o WhatsApp com a mensagem formatada', async ({ page, context }) => {
  await page.goto('/#cotacao');
  await page.fill('#quote-name', 'Ana & Zé');
  await page.selectOption('#quote-service', 'Planejamento de Roteiro Sob Medida');
  await page.fill('#quote-destination', 'Noronha');
  await page.selectOption('#quote-travelers', '3 a 4 pessoas (Família)');
  const [popup] = await Promise.all([context.waitForEvent('page'), page.click('#celure-quote-form button[type="submit"]')]);
  await popup.waitForLoadState();
  const url = new URL(popup.url());
  expect(url.origin + url.pathname).toBe('https://wa.me/5553999491336');
  const text = url.searchParams.get('text')!;
  expect(text).toContain('Me chamo *Ana & Zé*');
  expect(text).toContain('✨ *Serviço:* Planejamento de Roteiro Sob Medida\n');
  expect(text).toContain('📍 *Destino:* Noronha\n');
  expect(text).toContain('📅 *Período/Época:* A definir\n');
  expect(text).toContain('👥 *Viajantes:* 3 a 4 pessoas (Família)\n');
  expect(text).not.toContain('Observações');
  await expect(page.locator('#quote-success')).toBeVisible(); // painel de confirmação
});

test('nome é obrigatório', async ({ page, context }) => {
  await page.goto('/#cotacao');
  let opened = false;
  context.on('page', () => { opened = true; });
  await page.click('#celure-quote-form button[type="submit"]');
  await page.waitForTimeout(500);
  expect(opened).toBe(false);
});
