# Celure website — UI kit

Click-through recreation of the Vita Travel page structure, filled with Celure content and assets.

- `index.html` — app shell: fixed `Header`, page router (persisted in localStorage), `Footer`, `CookieBanner`.
- `Home.jsx` — Hero (layered photo + giant "Viaje"), Stats (3 StatCards), About (photo + figures), Serviços (2×2 TripCards in a bleeding HairlineGrid), Experiência VIP (full-bleed photo + blurred JourneyStep strip), Como funciona (StepItems), Histórias (text cell + 2×2 PersonCards).
- `Pages.jsx` — `ServicePage` (breadcrumbs, photos, IncludedList, spec sidebar), `ContactPage` (underline form + success overlay), `PrivacyPage` (LegalNav sidebar).

Click a TripCard CTA → service page; "Falar no WhatsApp" → contact; footer "Política de Privacidade" → legal page; header logo → home.
Mobile layouts (burger menu, stacked grids) from the source CSS are documented in readme but not recreated.
