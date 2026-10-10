import { defineConfig } from 'vitest/config';

// Vitest só roda os testes de unidade; tests/e2e é do Playwright
export default defineConfig({
  test: { include: ['tests/unit/**/*.test.ts'] },
});
