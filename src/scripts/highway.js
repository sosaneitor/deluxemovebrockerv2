// Hero atmosphere anchored to the photo (hero-car-carrier-highway.png, 1672×941):
// the truck's own headlights breathe and flare, its amber marker lights chase, the lane
// line and the lit asphalt stream toward the camera, and distant traffic comes on.
// Every effect is placed in the photo's pixel coordinates and mapped through the same
// object-fit: cover / object-position math the <img> uses, so it stays glued to the
// truck at any viewport size. Pure decoration (canvas is aria-hidden).

const IMG_W = 1672;
const IMG_H = 941;

// Feature coordinates measured on the source photo.
const HEADLIGHTS = [
  { x: 818, y: 583, r: 46 },
  { x: 1080, y: 578, r: 52 },
];
const FOG_LIGHTS = [
  { x: 810, y: 658, r: 18 },
  { x: 1058, y: 632, r: 22 },
];
const ROOF_MARKERS = [
  [922, 371],
  [996, 364],
  [1022, 363],
  [1048, 362],
  [1128, 360],
];
const TRAILER_MARKERS = [
  [1195, 590],
  [1372, 630],
  [1420, 622],
  [1470, 612],
  [1520, 604],
  [1556, 598],
];
const STREET_LAMP = { x: 907, y: 289, r: 42 };
// Lane line, far → near (it runs to the right of the truck, then across the foreground).
const LANE = [
  [1690, 614],
  [1625, 630],
  [1285, 718],
  [960, 820],
  [570, 912],
  [360, 962],
];
// Lit asphalt in front of the truck, far → near (direction of the road toward the camera).
const SHEEN_FROM = [1250, 735];
const SHEEN_TO = [380, 990];
// Oncoming traffic far right: emerges near the horizon and leaves past the right edge.
const TRAFFIC_FROM = [1548, 566];
const TRAFFIC_TO = [1760, 602];

const lerp = (a, b, t) => a + (b - a) * t;

// Point at fraction s (0 far … 1 near) along a polyline, by length.
function along(poly, s) {
  const lens = [];
  let total = 0;
  for (let i = 1; i < poly.length; i++) {
    const l = Math.hypot(poly[i][0] - poly[i - 1][0], poly[i][1] - poly[i - 1][1]);
    lens.push(l);
    total += l;
  }
  let d = s * total;
  for (let i = 0; i < lens.length; i++) {
    if (d <= lens[i]) {
      const t = d / lens[i];
      return [lerp(poly[i][0], poly[i + 1][0], t), lerp(poly[i][1], poly[i + 1][1], t)];
    }
    d -= lens[i];
  }
  return poly[poly.length - 1];
}

export function initHighway(canvas) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  // Read the photo's horizontal object-position (70% desktop, 80% phones) so the
  // overlay uses exactly the same crop as the <img>.
  const photo = canvas.parentElement?.querySelector('.hero-photo');
  let posX = 0.7;
  let w = 0;
  let h = 0;
  let k = 1; // photo px → CSS px
  let ox = 0;
  let oy = 0;

  function resize() {
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (photo) {
      const pos = parseFloat(getComputedStyle(photo).objectPosition);
      if (!Number.isNaN(pos)) posX = pos / 100;
    }
    k = Math.max(w / IMG_W, h / IMG_H);
    ox = (w - IMG_W * k) * posX;
    oy = (h - IMG_H * k) * 0.5;
  }
  const X = (x) => ox + x * k;
  const Y = (y) => oy + y * k;

  function glow(x, y, r, rgb, a) {
    const g = ctx.createRadialGradient(X(x), Y(y), 0, X(x), Y(y), r * k);
    g.addColorStop(0, `rgba(${rgb},${a})`);
    g.addColorStop(0.35, `rgba(${rgb},${a * 0.35})`);
    g.addColorStop(1, `rgba(${rgb},0)`);
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(X(x), Y(y), r * k, 0, Math.PI * 2);
    ctx.fill();
  }

  // Horizontal anamorphic flare through a light source.
  function flare(x, y, len, a) {
    ctx.save();
    ctx.translate(X(x), Y(y));
    ctx.scale(1, 0.05);
    const r = len * k;
    const g = ctx.createRadialGradient(0, 0, 0, 0, 0, r);
    g.addColorStop(0, `rgba(255,236,200,${a})`);
    g.addColorStop(0.4, `rgba(255,190,110,${a * 0.3})`);
    g.addColorStop(1, 'rgba(255,170,80,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // Moving elements.
  const dashes = Array.from({ length: 5 }, (_, i) => ({ t: i / 5 }));
  const sheens = Array.from({ length: 22 }, () => ({
    t: Math.random(),
    off: (Math.random() - 0.5) * 2, // lateral position across the lit asphalt
    speed: 0.0025 + Math.random() * 0.003,
    a: 0.08 + Math.random() * 0.14,
  }));
  const cars = Array.from({ length: 3 }, (_, i) => ({ t: i / 3 + Math.random() * 0.2 }));

  let raf = 0;
  let running = false;
  let time = 0;
  let last = performance.now();

  function frame(now) {
    const dt = Math.min(50, now - last) / 16.67; // 1 ≈ one 60fps frame
    last = now;
    time += dt / 60;
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'lighter';
    ctx.lineCap = 'round';

    // 1 · Lit asphalt streaming toward the camera (matches the photo's road motion blur).
    const dx = SHEEN_TO[0] - SHEEN_FROM[0];
    const dy = SHEEN_TO[1] - SHEEN_FROM[1];
    const len = Math.hypot(dx, dy);
    const nx = -dy / len;
    const ny = dx / len;
    for (const s of sheens) {
      s.t += s.speed * dt;
      if (s.t > 1) s.t -= 1;
      const p = s.t * s.t; // accelerate as it nears the camera
      const spread = lerp(40, 260, p) * s.off;
      const hx = lerp(SHEEN_FROM[0], SHEEN_TO[0], p) + nx * spread;
      const hy = lerp(SHEEN_FROM[1], SHEEN_TO[1], p) + ny * spread;
      const tl = lerp(30, 220, p);
      const tx = hx - (dx / len) * tl;
      const ty = hy - (dy / len) * tl;
      const fade = Math.sin(Math.PI * s.t);
      const g = ctx.createLinearGradient(X(tx), Y(ty), X(hx), Y(hy));
      g.addColorStop(0, 'rgba(255,190,110,0)');
      g.addColorStop(1, `rgba(255,200,130,${s.a * fade})`);
      ctx.strokeStyle = g;
      ctx.lineWidth = lerp(0.6, 2.4, p) * Math.max(k, 0.5);
      ctx.beginPath();
      ctx.moveTo(X(tx), Y(ty));
      ctx.lineTo(X(hx), Y(hy));
      ctx.stroke();
    }

    // 2 · Lane dashes rushing past along the real lane line.
    for (const d of dashes) {
      d.t += 0.0042 * dt;
      if (d.t > 1) d.t -= 1;
      const s = Math.pow(d.t, 2.2);
      const s2 = Math.min(1, s + lerp(0.004, 0.09, s));
      const [x1, y1] = along(LANE, s);
      const [x2, y2] = along(LANE, s2);
      const a = 0.55 * Math.sin(Math.PI * d.t);
      ctx.strokeStyle = `rgba(255,248,235,${a})`;
      ctx.lineWidth = lerp(1, 9, s) * k;
      ctx.beginPath();
      ctx.moveTo(X(x1), Y(y1));
      ctx.lineTo(X(x2), Y(y2));
      ctx.stroke();
    }

    // 3 · Oncoming traffic on the far right.
    for (const c of cars) {
      c.t += 0.0016 * dt;
      if (c.t > 1) c.t -= 1;
      const p = c.t * c.t;
      const cx = lerp(TRAFFIC_FROM[0], TRAFFIC_TO[0], p);
      const cy = lerp(TRAFFIC_FROM[1], TRAFFIC_TO[1], p);
      const gap = lerp(5, 34, p);
      const r = lerp(5, 26, p);
      const a = Math.min(1, c.t * 4) * 0.8;
      glow(cx - gap / 2, cy, r, '255,244,220', a);
      glow(cx + gap / 2, cy, r, '255,244,220', a);
    }

    // 4 · The truck's headlights: steady breathing with a slight engine flicker + flare.
    HEADLIGHTS.forEach((l, i) => {
      const breath = 0.82 + 0.18 * Math.sin(time * 1.6 + i * 0.7) + (Math.random() - 0.5) * 0.04;
      glow(l.x, l.y, l.r * 2.4, '255,232,190', 0.35 * breath);
      glow(l.x, l.y, l.r, '255,250,235', 0.75 * breath);
      flare(l.x, l.y, 420, 0.5 * breath);
    });
    FOG_LIGHTS.forEach((l, i) => glow(l.x, l.y, l.r * 2, '255,220,160', 0.4 + 0.1 * Math.sin(time * 2 + i)));

    // 5 · Amber marker lights: a slow chase across the cab roof and along the trailer.
    ROOF_MARKERS.forEach(([x, y], i) => {
      const pulse = 0.5 + 0.5 * Math.sin(time * 3 - i * 0.6);
      glow(x, y, 16, '245,166,35', 0.35 + 0.55 * pulse);
    });
    TRAILER_MARKERS.forEach(([x, y], i) => {
      const pulse = 0.5 + 0.5 * Math.sin(time * 2.4 - i * 0.8);
      glow(x, y, 14, '245,166,35', 0.25 + 0.5 * pulse);
    });

    // 6 · Street lamp hum.
    glow(STREET_LAMP.x, STREET_LAMP.y, STREET_LAMP.r, '255,200,120', 0.35 + 0.08 * Math.sin(time * 0.9));

    raf = requestAnimationFrame(frame);
  }

  const start = () => {
    if (running) return;
    running = true;
    last = performance.now();
    raf = requestAnimationFrame(frame);
  };
  const stop = () => {
    running = false;
    cancelAnimationFrame(raf);
  };

  resize();
  window.addEventListener('resize', resize, { passive: true });
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
  new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()), { threshold: 0 }).observe(canvas);

  canvas.classList.add('is-live');
  start();
}
