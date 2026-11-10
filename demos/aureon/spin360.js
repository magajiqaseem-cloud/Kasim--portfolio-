/*! Spin360: drag / swipe 360° viewer
    Aureon Motors concept demo, designed and built by Kasim Elite Digital Global.
    Plain JavaScript, no build step, no dependencies.

    TWO KINDS OF SOURCE
    1. Photo frames (turntable photography or 3D renders), the production option:
         Spin360.mount(el, {frames: ['gt-01.webp', ..., 'gt-36.webp'], label: 'Aureon GT Coupé'})
       Frames are preloaded with a progress bar; the first frame shows as soon as it arrives.
       36 frames = 10° per step, 72 frames = 5°. Add reverse:true if the sequence turns the other way.
    2. Stand-in model, used until frames exist: a shaded low-poly car drawn live on <canvas>.
         Spin360.mount(el, {model: {body: 'Coupé' | 'SUV' | 'Saloon', color: '#C98A22'}, label: '...'})

    Spin360.still(canvas, model, degrees) paints a single still view (used on listing cards).
    mount() returns {destroy(), setAngle(degrees)}.

    Input: pointer events (mouse, pen, touch) with a touchstart/touchmove/touchend fallback,
    arrow keys, Home. Vertical page scrolling on phones is left alone (touch-action: pan-y).
    Reduced motion: no hint animation and no inertia; the viewer still turns under the finger.
*/
(function (global) {
  'use strict';
  var doc = global.document;
  var RM = global.matchMedia ? global.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };
  var PI = Math.PI, DEG = PI / 180;

  /* ---------- vector helpers ---------- */
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function norm(a) { var l = Math.sqrt(dot(a, a)) || 1; return [a[0] / l, a[1] / l, a[2] / l]; }
  function avg(pts) { var c = [0, 0, 0]; pts.forEach(function (p) { c[0] += p[0]; c[1] += p[1]; c[2] += p[2]; }); return [c[0] / pts.length, c[1] / pts.length, c[2] / pts.length]; }
  function newell(pts) {
    var n = [0, 0, 0];
    for (var i = 0; i < pts.length; i++) {
      var a = pts[i], b = pts[(i + 1) % pts.length];
      n[0] += (a[1] - b[1]) * (a[2] + b[2]); n[1] += (a[2] - b[2]) * (a[0] + b[0]); n[2] += (a[0] - b[0]) * (a[1] + b[1]);
    }
    return norm(n);
  }
  function rgb(h) { h = h.replace('#', ''); return [parseInt(h.substr(0, 2), 16), parseInt(h.substr(2, 2), 16), parseInt(h.substr(4, 2), 16)]; }
  function css(c, a) { return 'rgba(' + Math.min(255, c[0] | 0) + ',' + Math.min(255, c[1] | 0) + ',' + Math.min(255, c[2] | 0) + ',' + (a == null ? 1 : a) + ')'; }

  /* ---------- stand-in car shapes (metres; x = length with the nose at +x, y = up, z = width) ---------- */
  var SPECS = {
    'Coupé':  { w: 1.94, cw: 1.50, r: .35, wx: [1.42, -1.38],
      body: [[2.30, .27], [2.37, .55], [2.12, .76], [.72, .93], [-1.95, .97], [-2.28, .82], [-2.31, .30]],
      cabin: [[.80, .91], [-.08, 1.29], [-.86, 1.30], [-1.80, .95]] },
    'SUV':    { w: 2.02, cw: 1.72, r: .41, wx: [1.50, -1.48],
      body: [[2.40, .36], [2.46, .76], [2.24, 1.02], [1.02, 1.12], [-2.26, 1.15], [-2.43, 1.00], [-2.43, .38]],
      cabin: [[1.05, 1.10], [.32, 1.64], [-2.02, 1.66], [-2.30, 1.13]] },
    'Saloon': { w: 1.92, cw: 1.56, r: .35, wx: [1.48, -1.46],
      body: [[2.42, .27], [2.48, .57], [2.24, .80], [.92, .94], [-1.88, .98], [-2.40, .87], [-2.45, .31]],
      cabin: [[.97, .92], [.16, 1.38], [-1.10, 1.40], [-1.88, .97]] }
  };

  function face(pts, pieceC, o) {
    var c = avg(pts), n = newell(pts);
    if (dot(n, [c[0] - pieceC[0], c[1] - pieceC[1], c[2] - pieceC[2]]) < 0) n = [-n[0], -n[1], -n[2]];
    o.pts = pts; o.c = c; o.n = n; return o;
  }
  function prism(prof, z0, z1) {
    var m = prof.length, pc = [0, 0, (z0 + z1) / 2], out = [];
    prof.forEach(function (p) { pc[0] += p[0] / m; pc[1] += p[1] / m; });
    out.push(face(prof.map(function (p) { return [p[0], p[1], z1]; }), pc, { cap: z1 > 0 ? 1 : -1 }));
    out.push(face(prof.map(function (p) { return [p[0], p[1], z0]; }).reverse(), pc, { cap: z0 > 0 ? 1 : -1 }));
    for (var i = 0; i < m; i++) {
      var a = prof[i], b = prof[(i + 1) % m];
      out.push(face([[a[0], a[1], z1], [b[0], b[1], z1], [b[0], b[1], z0], [a[0], a[1], z0]], pc, { q: i }));
    }
    return out;
  }
  function box(x0, x1, y0, y1, z0, z1, kind) {
    return prism([[x0, y0], [x1, y0], [x1, y1], [x0, y1]], z0, z1).map(function (f) { f.kind = kind; return f; });
  }

  function build(spec) {
    var hw = spec.w / 2, chw = spec.cw / 2, B = spec.body, C = spec.cabin;
    var G = { body: [], front: [], rear: [], cabin: [], wheels: [], arches: [], belt: [], hw: hw };
    var minY = Math.min.apply(null, B.map(function (p) { return p[1]; }));
    var xs = B.map(function (p) { return p[0]; });
    G.len = Math.max.apply(null, xs) - Math.min.apply(null, xs);

    var frontTop = null, rearTop = null;
    prism(B, -hw, hw).forEach(function (f) {
      if (f.cap) { f.kind = 'paint'; f.side = f.cap; f.panel = 1; G.body.push(f); return; }
      var a = B[f.q], b = B[(f.q + 1) % B.length];
      if (f.n[0] > .7) { f.kind = 'paint'; G.front.push(f); frontTop = a[1] > b[1] ? a : b; }
      else if (f.n[0] < -.7) { f.kind = 'paint'; G.rear.push(f); rearTop = a[1] > b[1] ? a : b; }
      else if (f.n[1] < -.7) { f.kind = 'under'; G.body.push(f); }
      else { f.kind = 'paint'; f.panel = f.n[1] > .5 ? 1 : 0; G.body.push(f); }
    });
    /* lights and grille sit on the front and rear faces */
    var fx = frontTop[0], fy = frontTop[1], rx = rearTop[0], ry = rearTop[1];
    G.front = G.front
      .concat(box(fx - .05, fx + .012, minY + .05, fy - .13, -(hw - .48), hw - .48, 'dark'))
      .concat(box(fx - .07, fx + .025, fy - .10, fy - .025, hw - .40, hw - .08, 'lamp'))
      .concat(box(fx - .07, fx + .025, fy - .10, fy - .025, -(hw - .08), -(hw - .40), 'lamp'));
    G.rear = G.rear.concat(box(rx - .025, rx + .06, ry - .11, ry - .045, -(hw - .10), hw - .10, 'tail'));

    /* glasshouse: side windows, windscreen, roof, rear screen */
    prism(C, -chw, chw).forEach(function (f) {
      if (f.cap) { f.kind = 'glass'; f.win = 1; f.side = f.cap; G.cabin.push(f); }
      else if (f.q === 0 || f.q === 2) { f.kind = 'glass'; G.cabin.push(f); }
      else if (f.q === 1) { f.kind = 'paint'; f.panel = 1; G.cabin.push(f); }
    });
    G.cabinProf = C; G.chw = chw;

    /* wheels: 20-sided cylinders; the outer cap carries the alloy */
    spec.wx.forEach(function (wx) {
      [1, -1].forEach(function (s) {
        var zc = s * (hw - .15), hwW = .13, ring = [], n = 20, r = spec.r;
        for (var i = 0; i < n; i++) ring.push([wx + r * Math.cos(i / n * 2 * PI), r + r * Math.sin(i / n * 2 * PI)]);
        var faces = prism(ring, zc - hwW, zc + hwW).map(function (f) {
          if (f.cap === s) { f.kind = 'wheelcap'; f.meta = { x: wx, y: r, z: zc + s * hwW, r: r }; }
          else f.kind = 'tyre';
          return f;
        });
        G.wheels.push({ s: s, faces: faces });
      });
      /* dark wheel arch on each side panel, flattened where the body ends */
      [1, -1].forEach(function (s) {
        var R = spec.r * 1.14, pts = [], b0 = B[B.length - 1], b1 = B[0];
        for (var i = 0; i < 24; i++) {
          var t = i / 24 * 2 * PI, x = wx + R * Math.cos(t), floor = b0[1] + (b1[1] - b0[1]) * (x - b0[0]) / (b1[0] - b0[0]);
          pts.push([x, Math.max(floor, spec.r + R * Math.sin(t)), s * hw * 1.003]);
        }
        G.arches.push({ s: s, pts: pts });
      });
    });
    /* chrome beltline from scuttle to deck */
    [1, -1].forEach(function (s) { G.belt.push({ s: s, pts: [[B[3][0], B[3][1] - .05, s * hw * 1.004], [B[4][0], B[4][1] - .05, s * hw * 1.004]] }); });
    return G;
  }

  /* mirror copy (y flipped) for the floor reflection */
  function flipPt(p) { return [p[0], -p[1], p[2]]; }
  function flipFace(f) {
    var g = {}; for (var k in f) g[k] = f[k];
    g.pts = f.pts.map(flipPt); g.c = flipPt(f.c); g.n = flipPt(f.n);
    if (f.meta) g.meta = { x: f.meta.x, y: -f.meta.y, z: f.meta.z, r: f.meta.r, flip: 1 };
    return g;
  }
  function mirror(G) {
    return {
      body: G.body.map(flipFace), front: G.front.map(flipFace), rear: G.rear.map(flipFace), cabin: G.cabin.map(flipFace),
      wheels: G.wheels.map(function (w) { return { s: w.s, faces: w.faces.map(flipFace) }; }),
      arches: G.arches.map(function (a) { return { s: a.s, pts: a.pts.map(flipPt) }; }),
      belt: [], cabinProf: G.cabinProf.map(function (p) { return [p[0], -p[1]]; }), chw: G.chw, hw: G.hw, len: G.len, flip: 1
    };
  }
  var CACHE = {};
  function geom(body) {
    var key = SPECS[body] ? body : 'Coupé';
    if (!CACHE[key]) { var g = build(SPECS[key]); CACHE[key] = { main: g, refl: mirror(g) }; }
    return CACHE[key];
  }

  /* ---------- camera ---------- */
  function camera(th, ph, k, cx, cy) {
    var ct = Math.cos(th), st = Math.sin(th), cp = Math.cos(ph), sp = Math.sin(ph), D = 12;
    return {
      D: D, k: k,
      P: function (p) {
        var x1 = p[0] * ct + p[2] * st, z1 = -p[0] * st + p[2] * ct, y2 = p[1] * cp - z1 * sp, z2 = p[1] * sp + z1 * cp, s = D / (D - z2);
        return [cx + x1 * s * k, cy - y2 * s * k, z2, x1, y2];
      },
      N: function (n) { var x1 = n[0] * ct + n[2] * st, z1 = -n[0] * st + n[2] * ct; return [x1, n[1] * cp - z1 * sp, n[1] * sp + z1 * cp]; }
    };
  }

  /* ---------- shading ---------- */
  var LIGHT = norm([-.38, .8, .46]), HALF = norm([LIGHT[0], LIGHT[1], LIGHT[2] + 1]);
  var MAT = {
    paint: { a: .2, d: .8, s: .9, e: 30, r: .2 },
    glass: { a: .55, d: .35, s: 1.15, e: 70, r: .35 },
    metal: { a: .38, d: .62, s: .9, e: 22, r: .2 },
    tyre:  { a: .55, d: .45, s: .1, e: 10, r: .05 },
    dark:  { a: .6, d: .4, s: .35, e: 40, r: .1 },
    under: { a: 1, d: 0, s: 0, e: 1, r: 0 }
  };
  var COL = { glass: [12, 18, 30], tyre: [13, 14, 17], dark: [10, 11, 13], under: [5, 6, 7], metal: [196, 202, 212] };
  function lit(base, n, m) {
    var d = Math.max(0, dot(n, LIGHT)), sp = Math.pow(Math.max(0, dot(n, HALF)), m.e), f = Math.pow(1 - Math.abs(n[2]), 3);
    var t = m.a + m.d * d, add = 255 * (m.s * sp + m.r * f);
    return [base[0] * t + add, base[1] * t + add, base[2] * t + add];
  }

  function trace(ctx, pts) { ctx.moveTo(pts[0][0], pts[0][1]); for (var i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]); ctx.closePath(); }
  /* holes: wheel arches cut out of a side panel, so the wheels behind always show correctly */
  function poly(ctx, pts, fill, holes) {
    ctx.beginPath(); trace(ctx, pts);
    if (holes) holes.forEach(function (h) { trace(ctx, h); });
    ctx.fillStyle = fill; ctx.fill(holes ? 'evenodd' : 'nonzero');
    if (typeof fill === 'string') { ctx.strokeStyle = fill; ctx.lineWidth = 1; ctx.stroke(); } /* hides hairline seams */
  }

  function drawFace(ctx, f, C, base, G) {
    var cp = C.P(f.c), n = C.N(f.n);
    if (n[0] * -cp[3] + n[1] * -cp[4] + n[2] * (C.D - cp[2]) <= 0) return; /* facing away */
    var pts = f.pts.map(C.P), col;
    if (f.kind === 'lamp' || f.kind === 'tail') {
      if (G.flip) return; /* no floating lamp reflections */
      col = f.kind === 'lamp' ? 'rgb(255,244,214)' : 'rgb(232,44,40)';
      ctx.save(); ctx.shadowColor = f.kind === 'lamp' ? 'rgba(255,236,190,.9)' : 'rgba(255,40,30,.9)'; ctx.shadowBlur = C.k * .09; poly(ctx, pts, col); ctx.restore();
      return;
    }
    var kind = f.kind === 'wheelcap' ? 'tyre' : f.kind;
    var holes = (f.kind === 'paint' && f.side && f.panel) ? G.arches.filter(function (a) { return a.s === f.side; }).map(function (a) { return a.pts.map(C.P); }) : null;
    col = css(lit(kind === 'paint' ? base : COL[kind], n, MAT[kind]));
    poly(ctx, pts, col, holes);
    if (kind === 'paint' && f.panel) { /* metallic falloff across large panels */
      var y0 = Math.min.apply(null, pts.map(function (p) { return p[1]; })), y1 = Math.max.apply(null, pts.map(function (p) { return p[1]; }));
      if (y1 - y0 > 2) {
        var g = ctx.createLinearGradient(0, y0, 0, y1);
        g.addColorStop(0, 'rgba(255,255,255,.16)'); g.addColorStop(.45, 'rgba(255,255,255,0)'); g.addColorStop(1, 'rgba(0,0,0,.32)');
        poly(ctx, pts, g, holes);
      }
    }
    if (f.win) { /* window frame and B-pillar in body colour */
      var P = G.cabinProf, z = f.side * G.chw * 1.003, paint = css(lit(base, n, MAT.paint));
      var lw = Math.max(1, C.k * .045);
      ctx.save(); ctx.strokeStyle = paint; ctx.lineWidth = lw; ctx.lineJoin = 'round';
      ctx.beginPath(); pts.forEach(function (p, i) { if (i) ctx.lineTo(p[0], p[1]); else ctx.moveTo(p[0], p[1]); }); ctx.closePath(); ctx.stroke();
      var top = C.P([P[1][0] + (P[2][0] - P[1][0]) * .55, P[1][1] + (P[2][1] - P[1][1]) * .55, z]);
      var bot = C.P([P[0][0] + (P[3][0] - P[0][0]) * .47, P[0][1] + (P[3][1] - P[0][1]) * .47, z]);
      ctx.lineWidth = lw * 1.5; ctx.beginPath(); ctx.moveTo(top[0], top[1]); ctx.lineTo(bot[0], bot[1]); ctx.stroke(); ctx.restore();
    }
    if (f.kind === 'wheelcap') { /* five-spoke alloy */
      var m = f.meta, alloy = css(lit(COL.metal, n, MAT.metal));
      var circ = function (rad) { var o = []; for (var i = 0; i < 22; i++) { var t = i / 22 * 2 * PI; o.push(C.P([m.x + rad * Math.cos(t), m.y + rad * Math.sin(t), m.z])); } return o; };
      poly(ctx, circ(m.r * .72), alloy);
      poly(ctx, circ(m.r * .6), 'rgb(9,10,12)');
      var hub = C.P([m.x, m.y, m.z]), edge = C.P([m.x + m.r, m.y, m.z]);
      ctx.save(); ctx.strokeStyle = alloy; ctx.lineCap = 'round'; ctx.lineWidth = Math.max(1, Math.abs(edge[0] - hub[0]) * .16 + C.k * .02);
      for (var i = 0; i < 5; i++) { var t = i / 5 * 2 * PI + .3, sp = C.P([m.x + m.r * .64 * Math.cos(t), m.y + m.r * .64 * Math.sin(t), m.z]); ctx.beginPath(); ctx.moveTo(hub[0], hub[1]); ctx.lineTo(sp[0], sp[1]); ctx.stroke(); }
      ctx.restore();
      poly(ctx, circ(m.r * .15), alloy);
    }
  }

  function byDepth(C) { return function (a, b) { return C.P(a.c)[2] - C.P(b.c)[2]; }; }

  function paintCar(ctx, G, C, base) {
    var sideVis = { '1': C.N([0, 0, 1])[2] > 0, '-1': C.N([0, 0, -1])[2] > 0 };
    var fv = C.N([1, 0, 0])[2] > 0, rv = C.N([-1, 0, 0])[2] > 0, sort = byDepth(C);
    function faces(list) { list.slice().sort(sort).forEach(function (f) { drawFace(ctx, f, C, base, G); }); }
    if (G.flip) faces(G.cabin);                                   /* reflection: roof is farthest away */
    G.wheels.forEach(function (w) { if (!sideVis[w.s]) faces(w.faces); });
    G.arches.forEach(function (a) { if (sideVis[a.s]) poly(ctx, a.pts.map(C.P), 'rgb(4,4,6)'); });
    G.wheels.forEach(function (w) { if (sideVis[w.s]) faces(w.faces); });
    faces(G.body);
    G.belt.forEach(function (b) {
      if (!sideVis[b.s]) return; var p = b.pts.map(C.P);
      ctx.save(); ctx.strokeStyle = 'rgba(255,255,255,.38)'; ctx.lineWidth = Math.max(1, C.k * .012); ctx.beginPath(); ctx.moveTo(p[0][0], p[0][1]); ctx.lineTo(p[1][0], p[1][1]); ctx.stroke(); ctx.restore();
    });
    var ends = [];
    if (fv) ends.push([C.P([G.len / 2, 0, 0])[2], G.front]);
    if (rv) ends.push([C.P([-G.len / 2, 0, 0])[2], G.rear]);
    ends.sort(function (a, b) { return a[0] - b[0]; }).forEach(function (e) { e[1].forEach(function (f) { drawFace(ctx, f, C, base, G); }); });
    if (!G.flip) faces(G.cabin);
  }

  /* one complete frame: reflection, floor glow, soft shadow, car */
  function drawModel(ctx, W, H, model, deg) {
    var g = geom(model.body), base = rgb(model.color || '#C98A22');
    var k = Math.min(W / 6.1, H / 2.75), cx = W / 2, cy = H * .73;
    var C = camera(deg * DEG, 13 * DEG, k, cx, cy), gy = C.P([0, 0, 0])[1], hl = g.main.len / 2, hw = g.main.hw;
    ctx.clearRect(0, 0, W, H);
    ctx.save(); ctx.globalAlpha = .2; paintCar(ctx, g.refl, C, base); ctx.restore();
    ctx.save(); ctx.globalCompositeOperation = 'destination-out';
    var fade = ctx.createLinearGradient(0, gy, 0, gy + k * 1.05); fade.addColorStop(0, 'rgba(0,0,0,0)'); fade.addColorStop(1, 'rgba(0,0,0,1)');
    ctx.fillStyle = fade; ctx.fillRect(0, gy, W, H - gy); ctx.restore();
    ctx.save(); ctx.translate(cx, gy); ctx.scale(1, .23);
    var glow = ctx.createRadialGradient(0, 0, 0, 0, 0, k * 3.3); glow.addColorStop(0, 'rgba(227,169,60,.17)'); glow.addColorStop(1, 'rgba(227,169,60,0)');
    ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(0, 0, k * 3.3, 0, 2 * PI); ctx.fill(); ctx.restore();
    var foot = [[hl * .95, 0, hw * .9], [-hl * .95, 0, hw * .9], [-hl * .95, 0, -hw * .9], [hl * .95, 0, -hw * .9]].map(C.P);
    ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.9)'; ctx.shadowBlur = k * .32; poly(ctx, foot, 'rgba(0,0,0,.62)'); ctx.restore();
    paintCar(ctx, g.main, C, base);
  }

  /* ---------- canvas sizing ---------- */
  function fit(canvas) {
    var r = canvas.getBoundingClientRect(), dpr = Math.min(global.devicePixelRatio || 1, 2);
    var w = Math.max(1, Math.round(r.width * dpr)), h = Math.max(1, Math.round(r.height * dpr));
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
    return { w: w, h: h };
  }
  function still(canvas, model, deg) {
    var s = fit(canvas); drawModel(canvas.getContext('2d'), s.w, s.h, model, deg == null ? -32 : deg);
  }

  /* ---------- the interactive viewer ---------- */
  var VIEWS = ['Front', 'Front three-quarter', 'Side', 'Rear three-quarter', 'Rear', 'Rear three-quarter', 'Side', 'Front three-quarter'];
  var START = -32;

  function mount(el, src) {
    src = src || {};
    var frames = src.frames && src.frames.length ? src.frames : null;
    var root = doc.createElement('div');
    root.className = 's360';
    root.tabIndex = 0;
    root.setAttribute('role', 'slider');
    root.setAttribute('aria-label', '360 degree view' + (src.label ? ' of ' + src.label : '') + '. Drag, swipe or use the arrow keys to turn it.');
    root.setAttribute('aria-valuemin', '0'); root.setAttribute('aria-valuemax', '359');
    root.innerHTML =
      '<canvas class="s360-canvas" aria-hidden="true"></canvas>' +
      '<p class="s360-badge" aria-hidden="true"><svg viewBox="0 0 24 24" width="18" height="18"><path d="M4 12a8 8 0 0 1 14.3-4.9M20 12a8 8 0 0 1-14.3 4.9" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M18.6 3.6v3.8h-3.8M5.4 20.4v-3.8h3.8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg><span>360° Interactive — Drag or Swipe to Spin</span></p>' +
      (frames ? '<div class="s360-load" aria-hidden="true"><i></i></div>' : '');
    el.appendChild(root);
    var canvas = root.querySelector('canvas'), ctx = canvas.getContext('2d');
    var angle = START, vel = 0, dragging = false, lastX = 0, raf = 0, used = false, tease = null, size = fit(canvas);
    var imgs = [], loaded = 0;

    function wrap(a) { return ((a % 360) + 360) % 360; }
    function aria() {
      var v = Math.round(wrap(angle - START + 0)) % 360; /* 0 = the opening front three-quarter view */
      var face = wrap(angle + 90);                        /* 0 = nose towards the viewer */
      root.setAttribute('aria-valuenow', String(v));
      root.setAttribute('aria-valuetext', VIEWS[Math.round(face / 45) % 8] + ' view, ' + v + ' degrees');
    }
    function nearestLoaded(i) {
      for (var d = 0; d < imgs.length; d++) {
        var a = imgs[(i + d) % imgs.length], b = imgs[(i - d + imgs.length) % imgs.length];
        if (a && a.ok) return a; if (b && b.ok) return b;
      }
      return null;
    }
    function render() {
      if (!frames) { drawModel(ctx, size.w, size.h, src.model || {}, angle); return; }
      var n = imgs.length, t = wrap(src.reverse ? -(angle - START) : angle - START), im = nearestLoaded(Math.round(t / 360 * n) % n);
      ctx.clearRect(0, 0, size.w, size.h);
      if (!im) return;
      var s = Math.min(size.w / im.naturalWidth, size.h / im.naturalHeight), w = im.naturalWidth * s, h = im.naturalHeight * s;
      ctx.drawImage(im, (size.w - w) / 2, (size.h - h) / 2, w, h);
    }
    function frame() {
      raf = 0;
      if (tease) {
        var p = Math.min(1, (performance.now() - tease.t0) / tease.dur);
        angle = tease.from + Math.sin(p * PI) * tease.amp;
        if (p < 1) schedule(); else tease = null;
      } else if (!dragging && Math.abs(vel) > .04 && !RM.matches) {
        angle += vel; vel *= .93; schedule();
      }
      render(); aria();
    }
    function schedule() { if (!raf) raf = global.requestAnimationFrame(frame); }
    function markUsed() { tease = null; if (!used) { used = true; root.classList.add('is-used'); } }

    /* drag / swipe: about 300° across the full width */
    function sens() { return 300 / Math.max(240, root.clientWidth); }
    function down(x) { markUsed(); dragging = true; lastX = x; vel = 0; root.classList.add('is-dragging'); }
    function move(x) { if (!dragging) return; var d = (x - lastX) * sens(); lastX = x; angle += d; vel = vel * .5 + d * .5; schedule(); }
    function up() { if (!dragging) return; dragging = false; root.classList.remove('is-dragging'); schedule(); }

    var on = [];
    function listen(t, ev, fn, opt) { t.addEventListener(ev, fn, opt); on.push([t, ev, fn, opt]); }
    if (global.PointerEvent) {
      listen(root, 'pointerdown', function (e) { if (e.pointerType === 'mouse' && e.button !== 0) return; try { root.setPointerCapture(e.pointerId); } catch (_) {} down(e.clientX); });
      listen(root, 'pointermove', function (e) { move(e.clientX); });
      listen(root, 'pointerup', up); listen(root, 'pointercancel', up); listen(root, 'lostpointercapture', up);
    } else {
      listen(root, 'touchstart', function (e) { down(e.touches[0].clientX); }, { passive: true });
      listen(root, 'touchmove', function (e) { move(e.touches[0].clientX); }, { passive: true });
      listen(root, 'touchend', up); listen(root, 'touchcancel', up);
      listen(root, 'mousedown', function (e) { down(e.clientX); });
      listen(global, 'mousemove', function (e) { move(e.clientX); }); listen(global, 'mouseup', up);
    }
    listen(root, 'keydown', function (e) {
      var step = e.shiftKey ? 45 : 15;
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') angle += step;
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') angle -= step;
      else if (e.key === 'Home') angle = START;
      else return;
      e.preventDefault(); markUsed(); vel = 0; schedule();
    });

    var ro = global.ResizeObserver ? new global.ResizeObserver(function () { size = fit(canvas); render(); }) : null;
    if (ro) ro.observe(canvas);
    /* a single gentle turn the first time it is seen, so people know it moves */
    var io = (!RM.matches && global.IntersectionObserver) ? new global.IntersectionObserver(function (es) {
      if (es[0].isIntersecting && !used && !tease) { tease = { t0: performance.now(), dur: 2600, from: angle, amp: 34 }; io.disconnect(); global.setTimeout(schedule, 450); }
    }, { threshold: .6 }) : null;
    if (io) io.observe(root);

    if (frames) {
      var bar = root.querySelector('.s360-load i');
      imgs = frames.map(function (url, i) {
        var im = new global.Image(); im.decoding = 'async';
        im.onload = function () { im.ok = true; done(); if (i === 0) render(); };
        im.onerror = done; im.src = url; return im;
      });
      function done() { loaded++; bar.style.transform = 'scaleX(' + loaded / frames.length + ')'; if (loaded === frames.length) root.classList.add('is-loaded'); }
    }
    render(); aria();

    return {
      setAngle: function (d) { angle = START + d; render(); aria(); },
      destroy: function () {
        if (raf) global.cancelAnimationFrame(raf);
        if (ro) ro.disconnect(); if (io) io.disconnect();
        on.forEach(function (l) { l[0].removeEventListener(l[1], l[2], l[3]); });
        if (root.parentNode) root.parentNode.removeChild(root);
      }
    };
  }

  global.Spin360 = { mount: mount, still: still };
})(window);
