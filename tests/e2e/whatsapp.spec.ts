import { test, expect } from '@playwright/test';

const WA = 'https://wa.me/5553999491336?text=' + encodeURIComponent('Olá, equipe Celure! Gostaria de conversar sobre o planejamento de uma viagem personalizada e exclusiva.');

test('botão flutuante: só o ícone, aparece depois da abertura e abre o WhatsApp direto em nova aba', async ({ page }) => {
  await page.goto('/');
  const btn = page.locator('#whatsapp-float');
  await expect(btn).toHaveAttribute('href', WA);
  await expect(btn).toHaveAttribute('target', '_blank');
  await expect(btn).toHaveText(''); // sem texto, só o ícone
  await expect(btn.locator('svg[data-icon="whatsapp"]')).toHaveCount(1);
  await expect(btn).not.toHaveClass(/is-visible/);
  await page.locator('#sobre').scrollIntoViewIfNeeded();
  await expect(btn).toHaveClass(/is-visible/);
});

test('"Falar no WhatsApp" do menu abre o WhatsApp direto', async ({ page }, info) => {
  test.skip(info.project.name !== 'desktop');
  await page.goto('/');
  await expect(page.locator('#navbar .ds-header__accent')).toHaveAttribute('href', WA);
});
