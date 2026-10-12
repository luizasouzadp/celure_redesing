import { test, expect } from '@playwright/test';

test('"Saber como acessar" abre a janela das salas VIP sem mudar o endereço', async ({ page }, info) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('/');
  const url = page.url();
  const link = page.locator('#luxo [data-modal-open="salas-vip"]');
  const modal = page.locator('#salas-vip');

  await expect(link).toHaveCount(1);
  await expect(link).toHaveText('Saber como acessar');
  await expect(link).toHaveAttribute('href', '#cotacao'); // reserva sem JavaScript
  await expect(page.locator('#luxo a', { hasText: 'Falar sobre Classe Executiva' })).not.toHaveAttribute('data-modal-open', /.*/);

  await link.scrollIntoViewIfNeeded();
  await link.click();
  await expect(modal).toBeVisible();
  expect(page.url()).toBe(url);
  await expect(page.locator('#salas-vip-title')).toContainText('O que te espera numa sala VIP');
  await expect(modal.locator('.ds-included-list__item')).toHaveCount(6);
  await expect(modal.locator('.salas-vip__saber li')).toHaveCount(5);
  await expect(page.locator('html')).toHaveCSS('overflow', 'hidden');

  // rola até o fim e o botão do WhatsApp aparece, com a mensagem das salas VIP
  const cta = modal.locator('a.ds-button');
  await cta.scrollIntoViewIfNeeded();
  await expect(cta).toBeInViewport();
  await expect(cta).toHaveAttribute('target', '_blank');
  const href = await cta.getAttribute('href');
  expect(href).toContain('https://wa.me/5553999491336?text=');
  expect(decodeURIComponent(href!.split('text=')[1])).toContain('salas VIP');
  await expect(modal.locator('[data-modal-close]')).toBeInViewport(); // X continua visível após rolar

  // clicar no conteúdo não fecha; Esc fecha e devolve o foco ao link
  await page.locator('#salas-vip-title').click();
  await expect(modal).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(modal).toBeHidden();
  await expect(link).toBeFocused();

  // reabre e fecha pelo X
  await link.click();
  await expect(modal).toBeVisible();
  await modal.locator('[data-modal-close]').click();
  await expect(modal).toBeHidden();

  if (info.project.name === 'mobile') {
    await link.click();
    const box = (await modal.locator('.ds-modal__panel').boundingBox())!;
    expect(box.width).toBeGreaterThanOrEqual(389);
    expect(box.height).toBeGreaterThan(800);
    await page.keyboard.press('Escape');
  }
  expect(page.url()).toBe(url);
  expect(errors).toEqual([]);
});

test('teclado: a janela rola com PageDown/setas logo ao abrir', async ({ page }) => {
  await page.goto('/');
  const link = page.locator('#luxo [data-modal-open="salas-vip"]');
  await link.scrollIntoViewIfNeeded();
  await link.press('Enter');
  const body = page.locator('#salas-vip .ds-modal__body');
  await expect(page.locator('#salas-vip')).toBeVisible();
  await page.keyboard.press('PageDown');
  await page.keyboard.press('ArrowDown');
  await expect.poll(() => body.evaluate((el) => el.scrollTop)).toBeGreaterThan(0);
  await expect(page.locator('#salas-vip')).toBeVisible();
});

test('selecionar texto e soltar o mouse fora do painel não fecha a janela', async ({ page }, info) => {
  test.skip(info.project.name !== 'desktop');
  await page.goto('/');
  const link = page.locator('#luxo [data-modal-open="salas-vip"]');
  await link.scrollIntoViewIfNeeded();
  await link.click();
  const box = (await page.locator('#salas-vip-title').boundingBox())!;
  await page.mouse.move(box.x + 10, box.y + 10);
  await page.mouse.down();
  await page.mouse.move(5, 5, { steps: 5 });
  await page.mouse.up();
  await expect(page.locator('#salas-vip')).toBeVisible();
});

test('abrir a janela não desloca a página de trás para o lado', async ({ page }, info) => {
  test.skip(info.project.name !== 'desktop');
  await page.goto('/');
  const link = page.locator('#luxo [data-modal-open="salas-vip"]');
  await link.scrollIntoViewIfNeeded();
  const before = await page.evaluate(() => document.documentElement.clientWidth);
  await link.click();
  await expect(page.locator('#salas-vip')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.clientWidth)).toBe(before);
});
