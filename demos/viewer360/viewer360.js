/*! Viewer360: interactive 360° viewer for the Aureon and Palmstone concept demos
    Designed and built by Kasim Elite Digital Global. Plain ES module, no build step.

    Two kinds of source, both showing ONE subject all the way round:
    1. A 3D model (glTF/GLB):           Viewer360.open({title, model:'car.glb'})
       Rendered live with three.js (vendored in ./vendor, loaded only when the viewer opens).
    2. A turntable image sequence:      Viewer360.open({title, frames:['01.webp', ... '36.webp']})
       Photos or renders taken at equal steps around the subject (36 frames = 10° a step).

    Controls: drag or swipe to turn, arrow keys turn 15°, buttons to turn, reset and pause.
    Gentle auto-rotation runs until the visitor touches it and resumes after a pause;
    with reduced motion there is no auto-rotation and no inertia.
*/
const RM = window.matchMedia ? matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };
const base = new URL('.', import.meta.url).href;
let dlg = null, current = null;

const CSS = `
.v360{width:min(1100px,calc(100vw - 20px));max-width:none;max-height:calc(100dvh - 20px);padding:0;border:1px solid rgba(212,175,55,.45);border-radius:20px;background:#06070a;color:#fff;overflow:hidden;font:400 15px/1.5 Inter,system-ui,sans-serif}
.v360::backdrop{background:rgba(2,3,6,.82);backdrop-filter:blur(4px)}
.v360-head{display:flex;align-items:center;gap:12px;padding:14px 16px 12px 20px;border-bottom:1px solid rgba(255,255,255,.08)}
.v360-head h2{flex:1;margin:0;font:600 18px/1.25 inherit;font-family:inherit}
.v360-head p{margin:2px 0 0;font-size:12.5px;color:rgba(255,255,255,.62)}
.v360-x{flex:0 0 44px;height:44px;border-radius:50%;border:1px solid rgba(255,255,255,.2);background:none;color:#fff;font-size:22px;line-height:1;cursor:pointer}
.v360-stage{position:relative;aspect-ratio:16/9;max-height:calc(100dvh - 190px);width:100%;background:radial-gradient(70% 70% at 50% 45%,#1a2033,#06070a 75%);touch-action:none;cursor:grab;user-select:none;-webkit-user-select:none;overflow:hidden}
.v360-stage.is-drag{cursor:grabbing}
.v360-stage canvas,.v360-stage img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;display:block;-webkit-user-drag:none}
.v360-badge{position:absolute;left:50%;top:14px;transform:translateX(-50%);z-index:2;padding:6px 14px;border-radius:999px;background:rgba(3,3,3,.62);border:1px solid rgba(212,175,55,.5);font:600 12px/1.3 inherit;letter-spacing:.04em;color:#F1D27A;pointer-events:none;transition:opacity .6s}
.v360-badge.is-gone{opacity:0}
.v360-load{position:absolute;left:20%;right:20%;bottom:24px;height:3px;border-radius:3px;background:rgba(255,255,255,.12);overflow:hidden}
.v360-load i{display:block;height:100%;width:0;background:linear-gradient(90deg,#0038A8,#D4AF37);transition:width .2s}
.v360-msg{position:absolute;inset:0;display:grid;place-items:center;padding:24px;text-align:center;color:rgba(255,255,255,.8)}
.v360-bar{display:flex;flex-wrap:wrap;align-items:center;gap:8px;padding:12px 16px 16px}
.v360-bar button{min-height:44px;min-width:44px;padding:0 14px;border-radius:999px;border:1px solid rgba(255,255,255,.2);background:rgba(255,255,255,.04);color:#fff;font:500 14px/1 inherit;cursor:pointer}
.v360-bar button:hover{border-color:#D4AF37;color:#F1D27A}
.v360-bar .v360-deg{margin-left:auto;font:500 13px/1 inherit;color:rgba(255,255,255,.6);font-variant-numeric:tabular-nums}
.v360-note{margin:0;padding:0 18px 16px;font-size:12px;color:rgba(255,255,255,.55)}
@media (max-width:640px){.v360-stage{aspect-ratio:4/3}.v360-head h2{font-size:16px}.v360-bar button{padding:0 12px;font-size:13px}}
`;

function el(tag, attrs, html) { const e = document.createElement(tag); if (attrs) for (const k in attrs) e.setAttribute(k, attrs[k]); if (html != null) e.innerHTML = html; return e; }

function build() {
  if (dlg) return dlg;
  const st = el('style'); st.textContent = CSS; document.head.appendChild(st);
  dlg = el('dialog', { class: 'v360', 'aria-labelledby': 'v360-title' });
  dlg.innerHTML = `
    <div class="v360-head"><div style="flex:1"><h2 id="v360-title"></h2><p class="v360-sub"></p></div><button type="button" class="v360-x" aria-label="Close the 360° view">&times;</button></div>
    <div class="v360-stage" tabindex="0" role="img" aria-roledescription="360 degree viewer"><span class="v360-badge">360° &middot; Drag or swipe to turn</span></div>
    <div class="v360-bar">
      <button type="button" data-a="left" aria-label="Turn left 15 degrees">&#8634;</button>
      <button type="button" data-a="right" aria-label="Turn right 15 degrees">&#8635;</button>
      <button type="button" data-a="auto" aria-pressed="true">Pause turning</button>
      <button type="button" data-a="reset">Front view</button>
      <span class="v360-deg" aria-live="off">0°</span>
    </div>
    <p class="v360-note"></p>`;
  document.body.appendChild(dlg);
  dlg.querySelector('.v360-x').addEventListener('click', () => dlg.close());
  dlg.addEventListener('close', () => { if (current) { current.destroy(); current = null; } });
  dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
  dlg.querySelector('.v360-bar').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b || !current) return;
    const a = b.dataset.a;
    if (a === 'left') current.turn(-15);
    if (a === 'right') current.turn(15);
    if (a === 'reset') current.reset();
    if (a === 'auto') current.setAuto(!current.auto);
  });
  dlg.querySelector('.v360-stage').addEventListener('keydown', e => {
    if (!current) return;
    if (e.key === 'ArrowLeft') { e.preventDefault(); current.turn(-15); }
    if (e.key === 'ArrowRight') { e.preventDefault(); current.turn(15); }
    if (e.key === 'Home') { e.preventDefault(); current.reset(); }
  });
  return dlg;
}

function ui() {
  const stage = dlg.querySelector('.v360-stage'), badge = stage.querySelector('.v360-badge'),
        deg = dlg.querySelector('.v360-deg'), autoBtn = dlg.querySelector('[data-a="auto"]');
  return {
    stage, badge,
    setDeg(d) { d = ((Math.round(d) % 360) + 360) % 360; deg.textContent = d + '°'; stage.setAttribute('aria-valuenow', d); },
    setAuto(on) { autoBtn.setAttribute('aria-pressed', String(on)); autoBtn.textContent = on ? 'Pause turning' : 'Turn slowly'; },
    hint() { setTimeout(() => badge.classList.add('is-gone'), 2600); },
    loader() { const l = el('div', { class: 'v360-load' }, '<i></i>'); stage.appendChild(l); return { set(p) { l.firstChild.style.width = Math.round(p * 100) + '%'; }, done() { l.remove(); } }; },
    message(t) { const m = el('div', { class: 'v360-msg' }); m.textContent = t; stage.appendChild(m); }
  };
}

/* shared drag logic: calls onTurn(deltaDegrees) */
function dragger(stage, degPerPx, onTurn, onStart, onEnd) {
  let down = false, lastX = 0, lastT = 0, vel = 0, raf = 0;
  const md = e => {
    down = true; lastX = e.clientX; lastT = performance.now(); vel = 0; cancelAnimationFrame(raf);
    stage.classList.add('is-drag'); stage.setPointerCapture && stage.setPointerCapture(e.pointerId); onStart && onStart();
  };
  const mv = e => {
    if (!down) return;
    const now = performance.now(), dx = e.clientX - lastX;
    const d = dx * degPerPx(); onTurn(d);
    vel = d / Math.max(8, now - lastT) * 16; lastX = e.clientX; lastT = now;
  };
  const up = () => {
    if (!down) return; down = false; stage.classList.remove('is-drag');
    if (!RM.matches && Math.abs(vel) > .2) {
      const glide = () => { vel *= .93; onTurn(vel); if (Math.abs(vel) > .05) raf = requestAnimationFrame(glide); else onEnd && onEnd(); };
      raf = requestAnimationFrame(glide);
    } else onEnd && onEnd();
  };
  stage.addEventListener('pointerdown', md); stage.addEventListener('pointermove', mv);
  stage.addEventListener('pointerup', up); stage.addEventListener('pointercancel', up); stage.addEventListener('lostpointercapture', up);
  return () => { cancelAnimationFrame(raf); stage.removeEventListener('pointerdown', md); stage.removeEventListener('pointermove', mv); stage.removeEventListener('pointerup', up); stage.removeEventListener('pointercancel', up); stage.removeEventListener('lostpointercapture', up); };
}

/* ---------- 1. image sequence ---------- */
function mountFrames(cfg, U) {
  const n = cfg.frames.length, img = el('img', { alt: '', draggable: 'false' });
  U.stage.insertBefore(img, U.stage.firstChild);
  let angle = 0, auto = !RM.matches && cfg.autoRotate !== false, idle = 0, raf = 0, last = 0, alive = true;
  const cache = new Array(n), load = U.loader(); let got = 0;
  const show = () => {
    let k = Math.round(((angle % 360) + 360) % 360 / (360 / n)) % n; if (cfg.reverse) k = (n - k) % n;
    const c = cache[k]; if (c && c.complete) img.src = c.src; U.setDeg(angle);
  };
  cfg.frames.forEach((src, k) => { const im = new Image(); im.decoding = 'async'; im.onload = im.onerror = () => { got++; load.set(got / n); if (got === n) load.done(); if (k === 0) show(); }; im.src = src; cache[k] = im; });
  const turn = d => { angle += d; show(); };
  const tick = t => { if (!alive) return; if (auto && t - idle > 0) { angle += (t - (last || t)) * (360 / 26000); show(); } last = t; raf = requestAnimationFrame(tick); };
  raf = requestAnimationFrame(tick);
  const off = dragger(U.stage, () => 360 / (U.stage.clientWidth * 1.15), turn, () => { idle = Infinity; U.badge.classList.add('is-gone'); }, () => { idle = performance.now() + 5000; });
  U.setAuto(auto); U.hint();
  const api = {
    get auto() { return auto; },
    turn(d) { idle = performance.now() + 5000; turn(d); },
    reset() { angle = 0; show(); },
    setAuto(on) { auto = on && !RM.matches; idle = 0; U.setAuto(auto); },
    destroy() { alive = false; cancelAnimationFrame(raf); off(); img.remove(); }
  };
  return api;
}

/* ---------- 2. 3D model ---------- */
async function mountModel(cfg, U) {
  const load = U.loader(); load.set(.05);
  const [THREE, { GLTFLoader }, { OrbitControls }, { RoomEnvironment }] = await Promise.all([
    import(base + 'vendor/three.module.min.js'), import(base + 'vendor/GLTFLoader.js'),
    import(base + 'vendor/OrbitControls.js'), import(base + 'vendor/RoomEnvironment.js')]);
  const stage = U.stage, w = () => stage.clientWidth, h = () => stage.clientHeight;
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
  renderer.setSize(w(), h(), false);
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = cfg.exposure || 1.05;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  stage.insertBefore(renderer.domElement, stage.firstChild);
  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), .04).texture;
  const key = new THREE.DirectionalLight(0xfff1d6, 1.6); key.position.set(4, 6, 3); scene.add(key);
  scene.add(new THREE.HemisphereLight(0x9fb4ff, 0x15110a, .5));
  const camera = new THREE.PerspectiveCamera(32, w() / h(), .05, 500);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = !RM.matches; controls.dampingFactor = .08; controls.enablePan = false;
  controls.minPolarAngle = Math.PI * .22; controls.maxPolarAngle = Math.PI * .49;
  controls.rotateSpeed = .8; controls.autoRotateSpeed = .9;
  controls.autoRotate = !RM.matches && cfg.autoRotate !== false;

  const gltf = await new Promise((res, rej) => new GLTFLoader().load(cfg.model, res, e => { if (e.total) load.set(.1 + .85 * e.loaded / e.total); }, rej));
  const root = gltf.scene; scene.add(root);
  // centre on the ground and frame the whole subject
  const box = new THREE.Box3().setFromObject(root), size = box.getSize(new THREE.Vector3()), ctr = box.getCenter(new THREE.Vector3());
  root.position.sub(new THREE.Vector3(ctr.x, box.min.y, ctr.z));
  const radius = Math.max(size.x, size.z) * .5, height = size.y;
  // soft contact shadow
  const cv = document.createElement('canvas'); cv.width = cv.height = 128; const g = cv.getContext('2d');
  const grd = g.createRadialGradient(64, 64, 4, 64, 64, 64); grd.addColorStop(0, 'rgba(0,0,0,.55)'); grd.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = grd; g.fillRect(0, 0, 128, 128);
  const shadow = new THREE.Mesh(new THREE.PlaneGeometry(size.x * 1.5, size.z * 1.5), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(cv), transparent: true, depthWrite: false }));
  shadow.rotation.x = -Math.PI / 2; shadow.position.y = .001; scene.add(shadow);
  const tf = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
  const dist = Math.max(height / (1.35 * tf), 2 * radius / (1.25 * tf * camera.aspect)) + radius * .6;
  const front = cfg.frontAngle || 30; // degrees: a three-quarter view to start
  const home = () => { const a = THREE.MathUtils.degToRad(front); camera.position.set(Math.sin(a) * dist, height * .55 + dist * .18, Math.cos(a) * dist); controls.target.set(0, height * .46, 0); controls.update(); };
  controls.minDistance = dist * .55; controls.maxDistance = dist * 1.5;
  home(); load.set(1); load.done();

  let alive = true, idleT = 0;
  const azimuth = () => THREE.MathUtils.radToDeg(controls.getAzimuthalAngle()) - front;
  const loop = () => {
    if (!alive) return;
    if (!controls.autoRotate && wantAuto && performance.now() > idleT) controls.autoRotate = true;
    controls.update(); renderer.render(scene, camera); U.setDeg(-azimuth());
    requestAnimationFrame(loop);
  };
  let wantAuto = controls.autoRotate;
  controls.addEventListener('start', () => { controls.autoRotate = false; idleT = Infinity; U.badge.classList.add('is-gone'); });
  controls.addEventListener('end', () => { idleT = performance.now() + 5000; });
  const ro = new ResizeObserver(() => { renderer.setSize(w(), h(), false); camera.aspect = w() / h(); camera.updateProjectionMatrix(); });
  ro.observe(stage);
  U.setAuto(wantAuto); U.hint(); loop();
  const rotateBy = d => { // turn the camera around the target
    const off = camera.position.clone().sub(controls.target); off.applyAxisAngle(new THREE.Vector3(0, 1, 0), THREE.MathUtils.degToRad(-d));
    camera.position.copy(controls.target).add(off); controls.update();
  };
  return {
    get auto() { return wantAuto; },
    turn(d) { controls.autoRotate = false; idleT = performance.now() + 5000; rotateBy(d); },
    reset() { home(); },
    setAuto(on) { wantAuto = on && !RM.matches; controls.autoRotate = wantAuto; idleT = 0; U.setAuto(wantAuto); },
    destroy() { alive = false; ro.disconnect(); controls.dispose(); renderer.dispose(); pmrem.dispose(); renderer.forceContextLoss && renderer.forceContextLoss(); renderer.domElement.remove(); }
  };
}

async function open(cfg) {
  build();
  if (current) { current.destroy(); current = null; }
  dlg.querySelector('#v360-title').textContent = cfg.title || '360° view';
  dlg.querySelector('.v360-sub').textContent = cfg.subtitle || '';
  dlg.querySelector('.v360-note').textContent = cfg.note || '';
  const stage = dlg.querySelector('.v360-stage');
  stage.querySelectorAll('canvas,img,.v360-msg,.v360-load').forEach(n => n.remove());
  stage.querySelector('.v360-badge').classList.remove('is-gone');
  stage.setAttribute('aria-label', (cfg.title || 'Subject') + ', 360 degree view. Use the left and right arrow keys to turn.');
  if (!dlg.open) dlg.showModal();
  stage.focus({ preventScroll: true });
  const U = ui();
  try {
    current = cfg.frames ? mountFrames(cfg, U) : await mountModel(cfg, U);
  } catch (err) {
    console.error(err);
    U.message('The 360° view could not load on this device. Please try another browser.');
  }
  return current;
}

/* Buttons with data-v360="key" open the matching entry from assets.json.
   A button stays hidden until its subject has a model or a full frame set. */
async function wire(root = document) {
  const btns = [...root.querySelectorAll('[data-v360]')];
  if (!btns.length) return;
  let assets = {};
  try { const r = await fetch(base + 'assets.json', { cache: 'no-cache' }); if (r.ok) assets = await r.json(); } catch (e) {}
  btns.forEach(b => {
    const a = assets[b.dataset.v360];
    const ok = a && (a.model || (Array.isArray(a.frames) && a.frames.length >= 24));
    if (!ok) return;
    const resolve = p => new URL(p, base).href;
    const cfg = Object.assign({}, a, a.model ? { model: resolve(a.model) } : { frames: a.frames.map(resolve) });
    b.hidden = false;
    b.addEventListener('click', () => open(cfg));
  });
}

window.Viewer360 = { open, wire };
wire();
export { open, wire };
