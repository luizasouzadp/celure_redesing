import { test, expect } from '@playwright/test';

test('abre na foto clicada, navega em ciclo e fecha', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('/');
  const box = page.locator('#dest-photo-lightbox');
  // teclas com o lightbox fechado não fazem nada
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('Escape');
  await expect(box).toBeHidden();

  await page.locator('[data-dest-photo="eua"]').dispatchEvent('click');
  await expect(box).toBeVisible();
  await expect(page.locator('#dest-photo-title')).toHaveText('🇺🇸 Estados Unidos');
  await expect(page.locator('#dest-photo-caption')).toHaveText('Antelope Canyon');
  await expect(page.locator('#dest-photo-img')).toHaveAttribute('src', '/assets/images/destinos/eua.jpg');

  await page.keyboard.press('ArrowLeft');
  await expect(page.locator('#dest-photo-title')).toHaveText('🇨🇳 China');
  await page.locator('#dest-photo-next').click();
  await expect(page.locator('#dest-photo-title')).toHaveText('🇺🇸 Estados Unidos');
  await page.locator('#dest-photo-prev').click();
  await expect(page.locator('#dest-photo-title')).toHaveText('🇨🇳 China');

  await page.keyboard.press('Escape');
  await expect(box).toBeHidden();

  await page.locator('[data-dest-photo="grecia"]').dispatchEvent('click');
  await expect(page.locator('#dest-photo-caption')).toHaveText('Santorini');
  await page.locator('#dest-photo-img').click(); // clicar na foto NÃO fecha
  await expect(box).toBeVisible();
  await box.click({ position: { x: 5, y: 5 } }); // clicar fora fecha
  await expect(box).toBeHidden();
  await page.locator('[data-dest-photo="china"]').dispatchEvent('click');
  await page.locator('#dest-photo-close').click();
  await expect(box).toBeHidden();
  expect(errors).toEqual([]);
});
