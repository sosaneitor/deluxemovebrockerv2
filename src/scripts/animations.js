import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EASE = 'power3.out';

/**
 * Manual char split — no SplitText license needed. Each word stays an unbreakable
 * inline-block so lines only wrap between words; the H1 keeps its aria-label.
 */
function splitChars(el) {
  const chars = [];
  el.querySelectorAll('[data-word]').forEach((word) => {
    const text = word.textContent;
    word.textContent = '';
    for (const ch of text) {
      const s = document.createElement('span');
      s.className = 'char';
      s.textContent = ch;
      word.appendChild(s);
      chars.push(s);
    }
  });
  return chars;
}

/** Count a number up from 0, keeping any prefix/suffix (e.g. "$0", "10+", "50"). */
function countUp(el) {
  const raw = el.textContent.trim();
  const match = raw.match(/^(\D*)(\d+)(\D*)$/);
  if (!match) return;
  const [, pre, num, post] = match;
  const target = Number(num);
  if (!target) return;
  const obj = { v: 0 };
  el.textContent = `${pre}0${post}`;
  gsap.to(obj, {
    v: target,
    duration: 1.6,
    ease: 'power2.out',
    delay: 0.9,
    onUpdate: () => (el.textContent = `${pre}${Math.round(obj.v)}${post}`),
  });
}

export function initAnimations() {
  // Everything runs through matchMedia so reduced-motion gets a no-op branch.
  const mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    // --- Hero headline: per-character rise (hidden state set here, never in CSS) ---
    const title = document.querySelector('[data-split]');
    if (title) {
      gsap.fromTo(
        splitChars(title),
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.8, ease: EASE, stagger: 0.022, delay: 0.1 }
      );
    }

    // --- Hero stats count up ---
    document.querySelectorAll('[data-count]').forEach(countUp);

    // --- Hero scroll choreography: photo drifts, copy lifts and fades ---
    const hero = document.querySelector('.hero');
    if (hero) {
      // Photo and its light layer move as one so the lights stay on the truck.
      gsap.to('.hero-photo, .hero-canvas', {
        yPercent: 12,
        scale: 1.08,
        ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to('.hero-inner', {
        yPercent: -18,
        opacity: 0.15,
        ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
      });
    }

    // --- Scroll reveals, batched so cards in a row cascade instead of popping together ---
    ScrollTrigger.batch('[data-reveal]', {
      start: 'top 88%',
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, { opacity: 1, y: 0, duration: 0.8, ease: EASE, stagger: 0.12, overwrite: true }),
    });

    // --- Image wipes: the frame opens from the bottom while the photo settles ---
    gsap.utils.toArray('[data-wipe]').forEach((frame) => {
      const img = frame.querySelector('img');
      const tl = gsap.timeline({ scrollTrigger: { trigger: frame, start: 'top 85%', once: true } });
      tl.fromTo(frame, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, ease: 'power4.inOut' });
      // Clear the inline transform afterwards so CSS hover zooms keep working,
      // unless the image is also driven by the parallax below.
      if (img) {
        const keep = img.hasAttribute('data-parallax');
        tl.fromTo(img, { scale: 1.25 }, { scale: 1, duration: 1.4, ease: EASE, clearProps: keep ? '' : 'transform' }, 0);
      }
    });

    // --- Gentle parallax on large images ---
    gsap.utils.toArray('[data-parallax]').forEach((img) => {
      gsap.fromTo(
        img,
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: 'none',
          scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
        }
      );
    });

    // --- "How it works": the truck drives the road as you scroll through the steps ---
    const road = document.querySelector('[data-road]');
    if (road) {
      const truck = road.querySelector('[data-truck]');
      const fill = road.querySelector('[data-road-fill]');
      const steps = gsap.utils.toArray('.how-step');
      const tl = gsap.timeline({
        scrollTrigger: { trigger: '.how-grid', start: 'top 75%', end: 'bottom 55%', scrub: 0.6 },
      });
      tl.fromTo(fill, { scaleX: 0 }, { scaleX: 1, ease: 'none' }, 0);
      tl.fromTo(truck, { left: '0%' }, { left: '100%', ease: 'none' }, 0);
      steps.forEach((step, i) => {
        tl.call(() => step.classList.add('is-lit'), null, (i / steps.length) * 1 + 0.02);
      });
    }

    // --- Scroll progress bar ---
    const bar = document.querySelector('[data-progress]');
    if (bar) {
      gsap.fromTo(bar, { scaleX: 0 }, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { start: 0, end: 'max', scrub: true },
      });
    }

    ScrollTrigger.refresh();
  });

  // Reduced motion: show final state, no movement.
  mm.add('(prefers-reduced-motion: reduce)', () => {
    gsap.set('[data-reveal]', { opacity: 1, y: 0, clearProps: 'all' });
    document.querySelectorAll('.how-step').forEach((s) => s.classList.add('is-lit'));
  });

  initSpotlight();
}

/** Cards light up under the pointer (desktop pointers only). */
function initSpotlight() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  document.querySelectorAll('[data-spotlight]').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });
}
