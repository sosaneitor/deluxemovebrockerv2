# Deluxe Move Broker LLC — landing

Experience-first landing for a U.S. door-to-door vehicle transport broker.
Bilingual (EN `/`, ES `/es/`), mobile-first, with a 3-step quote form.

**Stack:** Astro (SSG, zero-JS by default) · Tailwind CSS v4 · React island (quote
form) · GSAP (scroll reveals) · self-hosted variable fonts (Inter, Space Grotesk).
Deployed on Vercel at https://deluxemovebrokerllc.com.

## Run

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
npm run preview  # serve the build
```

Regenerate OG image / touch icon after changing the hero photo or brand:

```bash
node scripts/gen-assets.mjs
```

## Concept

"Precision transit" — graphite night + highway-amber accent. One motion signature
(`power3.out`, 0.5–0.8s). Space Grotesk (display) + Inter (UI).

## Design decisions

- **Hero:** static photo + CSS entrance; the H1 is never hidden, so it paints at once (LCP).
- **Motion:** scroll reveals go through `gsap.matchMedia()`; reduced-motion shows final
  state, no movement. Content is only hidden once `.gsap-ready` is set, so if JS
  fails everything stays visible.
- **Form:** 3-step wizard posting JSON to Web3Forms (honeypot `botcheck`, phone/email
  validation). Hydrated with `client:load` so typing is never lost to hydration.
- **Theme:** single dark theme (the light theme was removed — it broke hero contrast).

## Pending (needs client input)

- `TODO_LOGO` — replace the placeholder SVG wordmark in
  [src/components/Logo.astro](src/components/Logo.astro) (drop the file in `src/assets/brand/`).
- Street address — footer and schema show "Concord, North Carolina" until it is provided.

## Business data

- Phone / WhatsApp: **+1 (786) 266-7459** · Email: **deluxemovebroker@gmail.com**
- Hours: Mon–Sat, 8 AM – 8 PM ET · Location: Concord, North Carolina
- Quotes inbox: Web3Forms (access key in [src/i18n/content.ts](src/i18n/content.ts)),
  delivered to deluxemovebroker@gmail.com.

Image sources: see [CREDITS.md](CREDITS.md).
