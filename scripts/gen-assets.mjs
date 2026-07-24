// One-off asset generator: OG image + apple-touch-icon. Run with `node scripts/gen-assets.mjs`.
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const p = (rel) => fileURLToPath(new URL(rel, import.meta.url));

// ---- OG image 1200x630 from the hero car, darkened, with brand overlay ----
const overlay = Buffer.from(`
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="v" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0b0d10" stop-opacity="0.86"/>
      <stop offset="0.55" stop-color="#0b0d10" stop-opacity="0.55"/>
      <stop offset="1" stop-color="#0b0d10" stop-opacity="0.35"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#v)"/>
  <g transform="translate(80,150)">
    <path d="M0 60 L34 20 L68 60" fill="none" stroke="#f5a623" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="90" y="42" font-family="'Space Grotesk',Arial,sans-serif" font-size="34" font-weight="700" letter-spacing="6" fill="#edeae3">DELUXE MOVE BROKER</text>
    <text x="0" y="150" font-family="'Space Grotesk',Arial,sans-serif" font-size="72" font-weight="700" fill="#edeae3">Ship your car anywhere</text>
    <text x="0" y="228" font-family="'Space Grotesk',Arial,sans-serif" font-size="72" font-weight="700" fill="#f5a623">in the U.S.</text>
    <text x="0" y="300" font-family="'Inter',Arial,sans-serif" font-size="30" fill="#a7a59d">Insured, door-to-door. Nothing to pay up front.</text>
  </g>
</svg>`);

await sharp(p('../src/assets/hero-sports-car-night.jpg'))
  .resize(1200, 630, { fit: 'cover', position: 'center' })
  .composite([{ input: overlay }])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(p('../public/og-image.jpg'));

// ---- apple-touch-icon 180x180 from favicon concept ----
const icon = Buffer.from(`
<svg width="180" height="180" xmlns="http://www.w3.org/2000/svg">
  <rect width="180" height="180" rx="40" fill="#0b0d10"/>
  <path d="M40 118 L90 56 L140 118" fill="none" stroke="#f5a623" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M62 126 L90 92 L118 126" fill="none" stroke="#edeae3" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" opacity="0.6"/>
</svg>`);
await sharp(icon).png().toFile(p('../public/apple-touch-icon.png'));

console.log('assets generated: og-image.jpg, apple-touch-icon.png');
