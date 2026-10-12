## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Design system (obrigatório)

Todo trabalho de interface segue o **Celure Design System**. Antes de criar ou alterar páginas, seções ou estilos, leia [`DESIGN.md`](DESIGN.md) e use os tokens de `src/styles/tokens/` e os componentes de `src/components/ds/`. Referência completa da marca em `design-system/`. Vitrine viva em `/design-system`.

## Testes

- `npm test` — testes de unidade (Vitest)
- `npm run e2e` — testes no navegador (Playwright), em desktop e celular, sobre o build
