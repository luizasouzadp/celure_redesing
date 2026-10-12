---
name: celure-design
description: Use whenever creating or changing any page, section, component, style or visual asset of the Celure site (Celure Viagens e Turismo). Contains the official Celure Design System — tokens, components, brand and copy rules — that every UI change in this repository must follow.
---

# Celure Design System

This repository's default and mandatory design system. Before any UI work:

1. Read `DESIGN.md` (repo root) — where tokens/components live in the code and the non-negotiable rules.
2. For brand, tone of voice and visual foundations in depth, read `design-system/readme.md`.
3. Build with the existing pieces:
   - Tokens: `src/styles/tokens/*.css` (never hard-code colors, font sizes or spacing; use the CSS variables and the `.h1…`, `.body-*`, `.color-white-*` classes from `src/styles/base.css`).
   - Components: `src/components/ds/*.astro` (Button, SectionHead, HairlineGrid, StatCard, TripCard, StepItem, PersonCard, IncludedList, InputGroup, Header, Footer, Icon, Lightbox…). Reuse or extend them before writing new markup.
   - Sections of the home page: `src/components/sections/`.
4. The original React reference components and specimen cards live in `design-system/components/` and `design-system/guidelines/` — reference only, the site uses the Astro versions.
5. Check the result at desktop (1440px) and mobile (390px) widths, and on the living style guide at `/design-system`.

Key rules (details in DESIGN.md): dark only (#091b20), white text at fixed opacities, single orange accent (#fb9826) for hover/active, Inter only, no boxes/shadows/rounded corners except pill buttons, hairline grids, own icon set only (no Lucide/emoji), real Celure photography only (the Vita Travel images in `design-system/assets/img/` are not licensed), Brazilian Portuguese copy addressing "você".

If you add a token, component or variant, document it in DESIGN.md under "Adições" and show it on `src/pages/design-system.astro`.
