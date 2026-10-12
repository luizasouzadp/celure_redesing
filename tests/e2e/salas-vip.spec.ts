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
