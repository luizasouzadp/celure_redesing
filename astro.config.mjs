// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  vite: {
    build: {
      // Navegadores-alvo do compactador de CSS. Com Safari 15 na lista, ele mantém o
      // `-webkit-backdrop-filter` (vidro fosco) para iPhones/Macs mais antigos.
      cssTarget: ['chrome100', 'edge100', 'firefox100', 'safari15'],
    },
  },
});
