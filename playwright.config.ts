import { defineConfig, devices } from '@playwright/test';

// TARGET=original fotografa o site antigo (referencia-original/) para servir de gabarito
const original = process.env.TARGET === 'original';

export default defineConfig({
  testDir: 'tests/e2e',
  snapshotPathTemplate: 'tests/e2e/__baseline__/{projectName}/{arg}{ext}',
  expect: { toHaveScreenshot: { maxDiffPixelRatio: 0.01, animations: 'disabled', caret: 'hide' } },
  use: {
    baseURL: original ? 'http://localhost:4400' : 'http://localhost:4321',
    launchOptions: { args: ['--autoplay-policy=no-user-gesture-required'] },
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1150, height: 687 } } },
    { name: 'mobile', use: { ...devices['Desktop Chrome'], viewport: { width: 390, height: 844 }, isMobile: false, hasTouch: true } },
  ],
  webServer: original
    ? { command: 'npx http-server referencia-original -p 4400 -s -c-1', port: 4400, reuseExistingServer: true }
    : { command: 'npm run build && npm run preview -- --port 4321', port: 4321, reuseExistingServer: true, timeout: 180_000 },
});
