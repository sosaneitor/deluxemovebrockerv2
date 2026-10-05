import { initAnimations } from './animations.js';

function boot() {
  initAnimations();
  maybeInitHighway();
}

// Highway light streaks over the hero photo. Skipped for reduced-motion and Save-Data;
// the photo alone is the fallback, so nothing else is needed when we bail.
function maybeInitHighway() {
  const canvas = document.querySelector('[data-highway]');
  if (!canvas) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = navigator.connection && navigator.connection.saveData;
  if (reduced || saveData) return;
  import('./highway.js').then((m) => m.initHighway(canvas)).catch(() => {});
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
