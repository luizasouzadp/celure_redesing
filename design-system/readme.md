# Celure Design System

> **No repositório do site:** este design system está implementado em Astro — tokens em `src/styles/tokens/`, componentes em `src/components/ds/`. Veja `DESIGN.md` na raiz para o mapa e as regras. Os arquivos desta pasta são a referência original.

Visual system for **Celure Viagens e Turismo** — a Brazilian boutique travel consultancy ("de viajantes para viajantes") selling smart flight issuance with miles, miles & credit-card consulting, custom itineraries and premium experiences (VIP lounges, business class). Founder: Lucas Müller (@mullermilhas). Instagram @celure_turismo. CNPJ 59.865.172/0001-70.

**What this system is:** the *visual language* of the reference site **Vita Travel** (vita-travel.webflow.io — a premium wellness-travel marketplace built in Webflow), extracted and re-applied to Celure's brand assets and Portuguese copy. The user's brief: "extrair o design system do vita travel para utilizar em um novo site" for https://celure-viagens.vercel.app/.

## Sources
- `inspiração site viagem/` (local capture of https://vita-travel.webflow.io/, 2026-10-10): `page.html` (rendered DOM), `styles.raw.css` (full CSS — **the source of truth for every value here**), `styles.computed.json`, `layout.json`, `references.json` (image/font URLs), `vita-travel.webflow.io-design.md` (auto-extracted token summary).
- Vita imagery and icons downloaded from `cdn.prod.website-files.com/696eeb61714a6c90a5f18c9e/…` (URLs in references.json).
- Celure live site https://celure-viagens.vercel.app/ — logo, photos (`assets/images/…`) and all copy. Its own current styling (DM Sans / Cormorant / teal + sand, glassmorphism) is **not** used; it is being replaced by this system.

## Products
One surface: the **marketing website** (single long home page + detail pages: serviço, contato, legal). UI kit in `ui_kits/website/`.

---

## CONTENT FUNDAMENTALS
- **Language:** Brazilian Portuguese. Address the reader as **você**; the company speaks as **nós** ("Nós cuidamos de toda a inteligência…", "Criamos o seu roteiro").
- **Tone:** warm, confident, anti-bureaucratic, "insider friend who has been there". Recurring ideas: authenticity (lived experience), money intelligence (milhas, cartões), time saved, 100% human support. Taglines: "Somos um estilo de viagem moderno, suave e autêntico.", "De viajantes para viajantes", "onde seus sonhos voam".
- **Headlines:** short declaratives, often two clauses where the second is dimmed (`white-40`): "Muito mais do que uma agência. *Um estilo de viagem moderno e humano.*" Vita pattern: one huge word as hero ("Travel" → **"Viaje"**).
- **Casing:** Title Case is common on Celure for section titles and CTAs ("Planejar Minha Viagem", "Cotar Passagens", "Roteiros Sob Medida"); keep it for buttons and card titles, sentence case for long headlines and body. Step labels in caps: "ETAPA 01".
- **Numbers as proof:** "+30 países", "Até 60% de economia", "100% humano", "5.0 de avaliação" — short figure + short label. Vita's "/ 78+ Countries" counter style becomes "/ até 65% off".
- **CTAs:** verb-first, first-person intent: "Planejar Minha Viagem", "Quero Economizar com Milhas", "Falar no WhatsApp", "Agendar Consultoria", "Montar Meu Roteiro".
- **Emoji:** the current Celure site uses a few (✈️ in the title, 🔒 by the form). The Vita system uses **none** — drop them in UI. Unicode "+" prefixes mobile nav items (Vita: "+Retreats").
- **Avoid:** "pacotes de prateleira/gaveta" offerings, course-like language ("A Celure NÃO é curso"), exclamation-heavy sales talk in headings (fine inside client quotes).

## VISUAL FOUNDATIONS
- **Mode:** dark only. Page `#091b20` (ink). All type white at fixed opacities: 100 / 60 (body) / 50 (counters) / 40 (dimmed clause, muted nav). Raised surface `#0d2e37` appears *only* as the secondary pill.
- **Accent:** one orange, `#fb9826`, used for hover fills and the active legal-nav rule; pressed `#fa8805` (also the active header link). Celure teal `#14b8a6` lives only inside the logo artwork.
- **Type:** Inter only, 400–600. Display is semibold with extreme negative tracking (h1 190px/-10px, h2 60px/-3.6px, h3 45px/-3px, h4 28px/-2px); body 500 weight with -0.5px. Line-heights tight (100–130%). Root font-size is fluid (`html{font-size:1.11111vw}`, 16px at ≥1440, 4.26667vw on mobile), so everything is in rem and scales with the viewport.
- **Layout:** full-width `.container` with 2.5rem side padding (1.25rem mobile); sections 5rem top/bottom (4rem mobile). A 12-ish column row of 22.5% / 75% splits eyebrow from headline. Header fixed, transparent, 4.5rem, divided into cells.
- **The hairline grid** is the signature: content sits in gutterless cells with 2.5rem padding, separated by 1px `white-10` rules (header/footer use `white-20`). No cards, no boxes, no backgrounds on cells. Lines animate in (scaleX/scaleY from an origin) on scroll in the source.
- **Corners:** 0 everywhere (images, cells, inputs, banners). The only rounding is the 5rem **pill** on buttons.
- **Shadows / elevation:** none at all. Depth comes from photography and `backdrop-filter: blur(10px)` (step strip over the photo section; mobile header 12px).
- **Backgrounds & imagery:** full-bleed, warm golden-hour landscapes (amber grass, misty Tuscan hills, snow peaks against blue) graded dark at the bottom so they melt into `#091b20`. Hero is a **layered cut-out**: sky layer behind, giant headline in the middle, foreground grass layer (z-index 3) in front of the word. Celure's own client photos (real trips, bright daylight) are used in grid cells and testimonials. No gradients as decoration, no patterns, no illustrations.
- **Inputs:** no boxes — label (body-sm, white-60) above a 22px/500 field with only a 1px white-10 bottom border.
- **Hover:** buttons swap background to orange in .2s ease; pressed to #fa8805. Close icon swaps artwork (rest/hover/pressed SVGs). Links have no hover change in source.
- **Motion:** GSAP-style entrances — `fade-up`, `fade-down`, `fade-up-big` with 0.1s staggered delays; H2s split into characters and revealed; about paragraph split into lines sliding up from overflow-hidden masks; dividers draw in. Panels (cookie bar, mobile menu) fade + translateY(1rem→0) in .4s. No bounces.
- **Transparency:** only white-alpha text/lines, blurred strips, and a 20% black overlay on the mobile hero.
- **Fixed elements:** header (top), cookie banner (bottom). Mobile menu is a full-screen ink panel with 45px nav items.

## ICONOGRAPHY
- The source uses **its own small SVG set** (copied into `assets/icons/`, inlined in the `Icon` component): `pin`, `calendar`, `users`, `location`, `earth`, `yoga` (14px spec-row icons), `stars` (5-star strip 53×9), `plus`, `close` (+ `close-hover`, `close-clicked`), `step-1…4` (49px line illustrations for "how it works"), `included-*` (24px inclusion icons), and the 8px four-point **sparkle** that trails every button.
- No icon font (Webflow's built-in `webflow-icons` is only used for framework widgets), no emoji, no icon library. Don't substitute Lucide/Heroicons — if a new glyph is needed, ask for it.
- Section eyebrows use a tiny brand mark next to the label. Vita used its own mark (`assets/icons/vita-logo-mini.svg`, kept for reference only); Celure uses the **"e" mark** cropped from its logo (`assets/celure-mark.png`).

## Brand assets
- `assets/celure-logo-full.png` — full lockup (teal, transparent background, includes "onde seus sonhos voam" and @celure_turismo). PNG only — **no vector logo was available**.
- `assets/celure-mark.png` — the "e" with arrow, cropped from the PNG. `assets/celure-wordmark.png` — "Celure" word crop.
- `assets/img/` — Vita reference imagery (hero layers, landscapes, footer band). ⚠️ Vita's property; replace with licensed Celure imagery before launch.
- `assets/celure/` — Celure's own photos (hero couple in Cappadocia, lounge, flight, services, client trips).

## Index
- `styles.css` → `tokens/fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `base.css` (type utility classes `.h1…`, `.body-*`, `.color-white-*`, `.container`, `.padding-global`)
- `fonts/Inter-Variable.woff2` (latin, 300–700)
- `guidelines/` — foundation specimen cards (Colors, Type, Spacing, Brand)
- `components/` — React primitives (namespace `window.CelureDesignSystem_c0924c`)
- `ui_kits/website/` — click-through site recreation
- `SKILL.md` — Agent Skill entry point

## Components
- **buttons/** — `Button` (primary/secondary pill), `CloseButton`, `TextLink`
- **icons/** — `Icon`
- **navigation/** — `Header`, `Breadcrumbs`, `LegalNav`, `Footer`
- **layout/** — `SectionHead`, `HairlineGrid`
- **content/** — `StatCard` (statistic-item), `TripCard` (featured-item), `StepItem` (how-works-item), `JourneyStep` (combine-step), `PersonCard` (practitioners-person), `IncludedList` (retreat inclusions)
- **forms/** — `InputGroup` (input / select / textarea)
- **feedback/** — `CookieBanner`

### Intentional additions
- `Icon` — wrapper so the copied SVG set ships inside the bundle.
- `HairlineGrid` — the source draws its dividers with absolutely-positioned `__dec` divs per section; this generalises them into one layout primitive.
- `InputGroup` focus state (bottom rule → white-40) — source has no visible focus style; added for accessibility.
- `Breadcrumbs` "/" separator — the source's separator rule was not in the capture.
