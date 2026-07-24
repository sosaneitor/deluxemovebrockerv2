import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EASE = 'power3.out';

/**
 * Manual word/char split — no SplitText license needed.
 * Wraps each character of a word span in its own inline-block <span>.
 */
function splitChars(el) {
  const targets = el.querySelectorAll('.hero-word > span');
  const chars = [];
  targets.forEach((wordSpan) => {
    const text = wordSpan.textContent;
    wordSpan.textContent = '';
    for (const ch of text) {
      const s = document.createElement('span');
      s.textContent = ch;
      s.style.display = 'inline-block';
      s.style.willChange = 'transform, opacity';
      wordSpan.appendChild(s);
      chars.push(s);
    }
  });
  return chars;
}

export function initAnimations() {
  // Everything runs through matchMedia so reduced-motion gets a no-op branch.
  const mm = gsap.matchMedia();

  const motion = '(prefers-reduced-motion: no-preference)';

  mm.add(motion, () => {
    // --- Hero headline: char stagger ---
    const title = document.querySelector('[data-reveal="chars"]');
    if (title) {
      const chars = splitChars(title);
      // Set the hidden state in JS (not CSS) so the headline is never lost if JS fails.
      gsap.fromTo(
        chars,
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.8, ease: EASE, stagger: 0.028, delay: 0.1 }
      );
    }

    // --- Hero supporting elements: sequenced fade-up ---
    const heroBits = gsap.utils.toArray('.hero [data-reveal]:not([data-reveal="chars"])');
    gsap.to(heroBits, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: EASE,
      stagger: 0.12,
      delay: 0.45,
    });

    // --- Scroll reveals for the rest of the page ---
    const reveals = gsap.utils.toArray('[data-reveal]:not([data-reveal="chars"])').filter(
      (el) => !el.closest('.hero')
    );
    reveals.forEach((el) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: EASE,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    });

    // --- Section headings: subtle amber underline sweep on enter (one pinned-free flourish) ---
    ScrollTrigger.refresh();

    return () => {
      // cleanup handled by gsap.matchMedia() automatically
    };
  });

  // Reduced motion / no data-reveal hiding: ensure everything is visible.
  mm.add('(prefers-reduced-motion: reduce)', () => {
    gsap.set('[data-reveal]', { opacity: 1, y: 0, clearProps: 'all' });
  });
}
