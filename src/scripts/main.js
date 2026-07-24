import { initAnimations } from './animations.js';

// ---- GSAP reveals ----
function boot() {
  initAnimations();
  maybeInitScene();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}

// ---- 3D scene with capability-gated fallback ----
function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl')));
  } catch (e) {
    return false;
  }
}

function shouldRun3D() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const smallMobile = window.matchMedia('(max-width: 640px)').matches;
  const lowCores = (navigator.hardwareConcurrency || 8) <= 4;
  const saveData = navigator.connection && navigator.connection.saveData;
  return hasWebGL() && !reduced && !smallMobile && !lowCores && !saveData;
}

function maybeInitScene() {
  const canvas = document.querySelector('[data-scene]');
  if (!canvas) return;
  // Poster fallback stays visible if we bail — nothing else to do.
  if (!shouldRun3D()) return;

  const io = new IntersectionObserver(
    (entries, obs) => {
      if (entries[0].isIntersecting) {
        obs.disconnect();
        import('./scene.js')
          .then((m) => m.initScene(canvas))
          .catch(() => {
            /* keep poster fallback on any load/runtime failure */
          });
      }
    },
    { rootMargin: '200px' }
  );
  io.observe(canvas);
}
