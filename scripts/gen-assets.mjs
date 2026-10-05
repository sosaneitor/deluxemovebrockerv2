// One-off asset generator: OG image + favicon + apple-touch-icon. Run with `node scripts/gen-assets.mjs`.
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const p = (rel) => fileURLToPath(new URL(rel, import.meta.url));

// ---- OG image 1200x630: hero photo, darkened, with the client logo + headline ----
const overlay = Buffer.from(`
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="v" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0b0d10" stop-opacity="0.9"/>
      <stop offset="0.55" stop-color="#0b0d10" stop-opacity="0.6"/>
      <stop offset="1" stop-color="#0b0d10" stop-opacity="0.35"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#v)"/>
  <g transform="translate(80,300)">
    <text x="0" y="0" font-family="'Space Grotesk',Arial,sans-serif" font-size="68" font-weight="700" fill="#edeae3">Ship your car anywhere</text>
    <text x="0" y="76" font-family="'Space Grotesk',Arial,sans-serif" font-size="68" font-weight="700" fill="#f5a623">in the U.S.</text>
    <text x="0" y="146" font-family="'Inter',Arial,sans-serif" font-size="30" fill="#a7a59d">Insured, door-to-door, all 50 states. Nothing up front.</text>
  </g>
</svg>`);

const logo = await sharp(p('../src/assets/brand/logo-light-text.png')).resize({ height: 110 }).png().toBuffer();

await sharp(p('../src/assets/hero-car-carrier-highway.png'))
  .resize(1200, 630, { fit: 'cover', position: 'left' })
  .composite([{ input: overlay }, { input: logo, top: 90, left: 70 }])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(p('../public/og-image.jpg'));

// ---- favicon + apple-touch-icon from the "X" brand mark ----
const mark = p('../src/assets/brand/logo-mark.png');
const clear = { r: 0, g: 0, b: 0, alpha: 0 };
await sharp(mark).resize(64, 64, { fit: 'contain', background: clear }).png().toFile(p('../public/favicon.png'));
// Browsers request /favicon.ico on their own; a PNG payload is accepted by all current ones.
await sharp(mark).resize(48, 48, { fit: 'contain', background: clear }).png().toFile(p('../public/favicon.ico'));
const inner = await sharp(mark).resize(130, 130, { fit: 'contain', background: clear }).png().toBuffer();
await sharp({ create: { width: 180, height: 180, channels: 4, background: '#0b0d10' } })
  .composite([{ input: inner, gravity: 'center' }])
  .png()
  .toFile(p('../public/apple-touch-icon.png'));

console.log('assets generated: og-image.jpg, favicon.png, favicon.ico, apple-touch-icon.png');
