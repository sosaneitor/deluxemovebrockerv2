# Deluxe Move Broker LLC — landing

Experience-first landing for a U.S. door-to-door vehicle transport broker.
Bilingual (EN `/`, ES `/es/`), mobile-first, with a 3-step quote form.

**Stack:** Astro (SSG, zero-JS by default) · Tailwind CSS v4 · React island (quote
form) · GSAP (scroll reveals) · Three.js (hero atmosphere, dynamically imported).

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

- **3D:** hero particle field (light streaks) via Three.js, dynamically imported on
  scroll. Falls back to the static hero photo when WebGL is absent, on small mobile,
  low-core devices, Save-Data, or `prefers-reduced-motion`.
- **Motion:** all reveals go through `gsap.matchMedia()`; reduced-motion shows final
  state, no movement. Content is only hidden once `.gsap-ready` is set, so if JS
  fails everything stays visible.
- **Form:** posts JSON to Formspree; 3-step wizard blocks advancing until the current
  step validates; success/error message + reset on submit.

## TODO (needs client input)

- `TODO_DOMAIN` — set the real domain in [astro.config.mjs](astro.config.mjs) `site`
  and [public/robots.txt](public/robots.txt).
- `TODO_LOGO` — replace the placeholder SVG wordmark in
  [src/components/Logo.astro](src/components/Logo.astro).
- `TODO_REVIEWS` — testimonial wording is paraphrased from the brief; confirm exact
  text / permission with the named customers.
- `TODO_LEGAL` — add USDOT/MC broker number + privacy/terms links in
  [src/components/Footer.astro](src/components/Footer.astro).

## Real data wired in

- Phone / WhatsApp: **+1 704-699-4001** (`tel:` + `wa.me`)
- Quotes inbox: Formspree `https://formspree.io/f/xjkwvwoa`
- Location: Concord, North Carolina

Image sources: see [CREDITS.md](CREDITS.md).
