import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'tests/e2e',
  use: {
    baseURL: 'http://localhost:4329',
    launchOptions: { args: ['--autoplay-policy=no-user-gesture-required'] },
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
    { name: 'mobile', use: { ...devices['Desktop Chrome'], viewport: { width: 390, height: 844 }, isMobile: false, hasTouch: true } },
  ],
  // porta exclusiva e sem reaproveitar servidor: garante que o teste roda sobre o build recém-gerado,
  // nunca sobre um `astro dev` ou preview antigo esquecido aberto
  webServer: { command: 'npm run build && npm run preview -- --port 4329', port: 4329, reuseExistingServer: false, timeout: 180_000 },
});
