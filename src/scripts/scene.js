// Lightweight Three.js atmosphere: a drifting field of light streaks evoking
// vehicles moving along a highway at night. Amber signal + cool depth.
// Pure atmosphere — carries no information, aria-hidden on the canvas.

export async function initScene(canvas) {
  const THREE = await import('three');

  const scene = new THREE.Scene();
  const dpr = Math.min(window.devicePixelRatio || 1, 1.75);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: false,
    alpha: true,
    powerPreference: 'low-power',
  });
  renderer.setPixelRatio(dpr);

  const camera = new THREE.PerspectiveCamera(70, 1, 0.1, 100);
  camera.position.z = 8;

  // --- Particle field ---
  const COUNT = window.innerWidth < 768 ? 700 : 1400;
  const positions = new Float32Array(COUNT * 3);
  const speeds = new Float32Array(COUNT);
  const spread = 26;

  for (let i = 0; i < COUNT; i++) {
    positions[i * 3] = (Math.random() - 0.5) * spread;
    positions[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.6;
    positions[i * 3 + 2] = Math.random() * -60;
    speeds[i] = 0.06 + Math.random() * 0.22;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  // Round soft sprite drawn to a canvas — avoids shipping a texture file.
  const sprite = makeDotTexture(THREE);
  const material = new THREE.PointsMaterial({
    size: 0.16,
    map: sprite,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    color: new THREE.Color('#f5a623'),
  });

  const points = new THREE.Points(geometry, material);
  scene.add(points);

  // A second, cooler, slower layer for depth.
  const material2 = material.clone();
  material2.color = new THREE.Color('#5b6b8c');
  material2.size = 0.1;
  const points2 = new THREE.Points(geometry.clone(), material2);
  points2.position.z = -6;
  scene.add(points2);

  // --- Pointer parallax ---
  let px = 0;
  let py = 0;
  const onPointer = (e) => {
    px = (e.clientX / window.innerWidth - 0.5) * 0.6;
    py = (e.clientY / window.innerHeight - 0.5) * 0.6;
  };
  window.addEventListener('pointermove', onPointer, { passive: true });

  function resize() {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);

  const pos = geometry.attributes.position.array;
  let raf = 0;
  let running = false;

  function tick() {
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3 + 2] += speeds[i];
      if (pos[i * 3 + 2] > camera.position.z) {
        pos[i * 3 + 2] = -60;
        pos[i * 3] = (Math.random() - 0.5) * spread;
        pos[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.6;
      }
    }
    geometry.attributes.position.needsUpdate = true;

    camera.position.x += (px - camera.position.x) * 0.04;
    camera.position.y += (-py - camera.position.y) * 0.04;
    camera.lookAt(0, 0, -20);

    points.rotation.z += 0.0004;
    renderer.render(scene, camera);
    raf = requestAnimationFrame(tick);
  }

  function start() {
    if (running) return;
    running = true;
    raf = requestAnimationFrame(tick);
  }
  function stop() {
    running = false;
    cancelAnimationFrame(raf);
  }

  // Pause when tab hidden.
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else start();
  });

  // Pause when canvas leaves the viewport.
  const io = new IntersectionObserver(
    ([entry]) => (entry.isIntersecting ? start() : stop()),
    { threshold: 0.01 }
  );
  io.observe(canvas);

  canvas.classList.add('is-live');
  start();
}

function makeDotTexture(THREE) {
  const size = 64;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.35, 'rgba(255,255,255,0.6)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}
