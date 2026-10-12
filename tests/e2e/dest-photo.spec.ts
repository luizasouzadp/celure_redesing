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

  await page.locator('[data-dest-photo=\"eua\"]').first().dispatchEvent('click');
  await expect(box).toBeVisible();
  await expect(page.locator('#dest-photo-title')).toHaveText('Estados Unidos');
  await expect(page.locator('#dest-photo-caption')).toHaveText('Antelope Canyon');
  await expect(page.locator('#dest-photo-img')).toHaveAttribute('src', '/assets/images/destinos/eua.jpg');

  await page.keyboard.press('ArrowLeft');
  await expect(page.locator('#dest-photo-title')).toHaveText('China');
  await page.locator('#dest-photo-next').click();
  await expect(page.locator('#dest-photo-title')).toHaveText('Estados Unidos');
  await page.locator('#dest-photo-prev').click();
  await expect(page.locator('#dest-photo-title')).toHaveText('China');

  await page.keyboard.press('Escape');
  await expect(box).toBeHidden();

  await page.locator('[data-dest-photo=\"grecia\"]').first().dispatchEvent('click');
  await expect(page.locator('#dest-photo-caption')).toHaveText('Santorini');
  await page.locator('#dest-photo-img').click(); // clicar na foto NÃO fecha
  await expect(box).toBeVisible();
  await box.click({ position: { x: 5, y: 5 } }); // clicar fora fecha
  await expect(box).toBeHidden();
  await page.locator('[data-dest-photo=\"china\"]').first().dispatchEvent('click');
  await page.locator('#dest-photo-close').click();
  await expect(box).toBeHidden();
  expect(errors).toEqual([]);
});

test('mapa: 30 países com pontinho, 7 com foto e o nome aparece ao passar o mouse', async ({ page }, info) => {
  await page.goto('/');
  const map = page.locator('#destinos .ds-world-map');
  await expect(map.locator('.ds-world-map__point, .ds-world-map__pin')).toHaveCount(30);
  await expect(map.locator('.ds-world-map__pin')).toHaveCount(7);
  test.skip(info.project.name !== 'desktop');
  const japao = map.locator('[aria-label="Japão"]');
  await japao.scrollIntoViewIfNeeded();
  await japao.hover();
  await expect(japao.locator('.ds-world-map__tip')).toHaveCSS('opacity', '1');
  await map.locator('.ds-world-map__pin[data-dest-photo="china"] img').click();
  await expect(page.locator('#dest-photo-title')).toHaveText('China');
});

test('celular: botões de região deslizam o mapa e o menu cobre a tela inteira', async ({ page }, info) => {
  test.skip(info.project.name !== 'mobile');
  await page.goto('/');
  const map = page.locator('.destinos__map');
  await page.locator('[data-map-region="americas"]').scrollIntoViewIfNeeded();
  await page.locator('[data-map-region="americas"]').click();
  await expect.poll(() => map.evaluate((m) => m.scrollLeft)).toBe(0);
  await page.locator('[data-map-region="asia"]').click();
  await expect.poll(() => map.evaluate((m) => m.scrollLeft)).toBeGreaterThan(400);
  await expect(page.locator('[data-map-region="asia"]')).toHaveAttribute('aria-pressed', 'true');
  await page.locator('#mobile-menu-toggle').click();
  const box = (await page.locator('#mobile-menu').boundingBox())!;
  expect(box.height).toBeGreaterThan(500); // painel ocupa a tela (antes ficava preso na barra)
});
