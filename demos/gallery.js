/*! DemoGallery: cinematic detail gallery for the Aureon and Palmstone concept demos.
    Kasim Elite Digital Global. Plain JS, no dependencies.

    Every view is the SAME image: the full shot, then close-ups the camera glides into.
    It never mixes in pictures of a different car or building, and it is not a 360° view.

    DemoGallery.mount(el, {
      src, srcset, sizes, alt,
      views: [{label:'Full view'}, {label:'Grille', x:.78, y:.6, s:2.1}, ...],  // x/y = focus point 0-1, s = zoom
      auto: true,          // glide through the views while on screen (off with reduced motion)
      note: 'Close-ups are details of the same image.'
    }) -> {go(i), destroy()}
*/
(function (w, d) {
  'use strict';
  var RM = w.matchMedia ? w.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };
  var css = d.createElement('style');
  css.textContent = [
    '.gx{position:relative}',
    '.gx-stage{position:relative;aspect-ratio:16/9;overflow:hidden;background:#07090C;border-radius:inherit;touch-action:pan-y}',
    '.gx-stage .gx-img{position:absolute;animation:none!important;inset:0;width:100%;height:100%;object-fit:cover;transform-origin:50% 50%;will-change:transform;transition:transform 1.5s cubic-bezier(.65,0,.25,1),filter 1.5s}',
        '.gx-label{position:absolute;left:14px;bottom:14px;z-index:2;padding:6px 12px;border-radius:999px;font-family:inherit;font-size:12px;font-weight:600;line-height:1.2;letter-spacing:.06em;text-transform:uppercase;color:#fff;background:rgba(5,7,10,.62);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);transition:opacity .4s}',
    '.gx-arrow{position:absolute;top:50%;z-index:2;width:44px;height:44px;margin-top:-22px;border-radius:50%;border:1px solid rgba(255,255,255,.35);background:rgba(5,7,10,.5);color:#fff;font-family:inherit;font-size:22px;line-height:1;cursor:pointer;display:grid;place-items:center;opacity:.85;transition:opacity .2s,background .2s}',
    '.gx-arrow:hover{opacity:1;background:rgba(5,7,10,.75)}',
    '.gx-prev{left:12px}.gx-next{right:12px}',
    '.gx-thumbs{display:flex;gap:8px;margin-top:10px;overflow-x:auto;scrollbar-width:none;padding:2px}',
    '.gx-thumbs::-webkit-scrollbar{display:none}',
    '.gx-thumb{flex:0 0 auto;width:88px;aspect-ratio:16/9;border-radius:8px;border:2px solid transparent;background-repeat:no-repeat;cursor:pointer;padding:0;opacity:.62;transition:opacity .25s,border-color .25s,transform .25s}',
    '.gx-thumb:hover{opacity:.9}',
    '.gx-thumb[aria-current="true"]{opacity:1;border-color:var(--gx-accent,#E3A93C)}',
    '.gx-note{margin:8px 0 0;font-size:12px;line-height:1.4;opacity:.7}',
    '@media (max-width:640px){.gx-thumb{width:72px}.gx-arrow{width:40px;height:40px;margin-top:-20px}}',
    '@media (prefers-reduced-motion:reduce){.gx-stage .gx-img{transition:none}}'
  ].join('');
  d.head.appendChild(css);

  function place(v) {
    var s = v.s || 1, x = v.x == null ? .5 : v.x, y = v.y == null ? .5 : v.y;
    var lim = (s - 1) * 50, tx = Math.max(-lim, Math.min(lim, -s * (x - .5) * 100)), ty = Math.max(-lim, Math.min(lim, -s * (y - .5) * 100));
    return 'translate(' + tx.toFixed(2) + '%,' + ty.toFixed(2) + '%) scale(' + s + ')';
  }
  function thumbPos(v) {
    var s = v.s || 1; if (s <= 1) return '50% 50%';
    var px = Math.max(0, Math.min(100, ((v.x == null ? .5 : v.x) * s - .5) / (s - 1) * 100)),
        py = Math.max(0, Math.min(100, ((v.y == null ? .5 : v.y) * s - .5) / (s - 1) * 100));
    return px.toFixed(1) + '% ' + py.toFixed(1) + '%';
  }

  function mount(el, o) {
    var views = o.views && o.views.length ? o.views : [{ label: 'Full view' }];
    var id = 'gx' + Math.random().toString(36).slice(2, 7), i = 0, timer = 0, vis = false, user = false;
    el.innerHTML =
      '<div class="gx" role="group" aria-roledescription="gallery" aria-label="' + (o.label || 'Photo gallery') + '">' +
      '<div class="gx-stage' + (o.stageClass ? ' ' + o.stageClass : '') + '"><img class="gx-img" src="' + o.src + '"' + (o.srcset ? ' srcset="' + o.srcset + '"' : '') + (o.sizes ? ' sizes="' + o.sizes + '"' : '') +
      ' width="1600" height="900" alt="' + (o.alt || '') + '" decoding="async">' +
      (views.length > 1 ? '<button type="button" class="gx-arrow gx-prev" aria-label="Previous view">&#8249;</button><button type="button" class="gx-arrow gx-next" aria-label="Next view">&#8250;</button>' : '') +
      '<span class="gx-label" aria-live="polite"></span>' + (o.badge || '') + '</div>' +
      (views.length > 1 ? '<div class="gx-thumbs">' + views.map(function (v, k) {
        return '<button type="button" class="gx-thumb" id="' + id + k + '" aria-label="' + v.label + '" style="background-image:url(\'' + (o.thumb || o.src) + '\');background-size:' + ((v.s || 1) * 100) + '% auto;background-position:' + thumbPos(v) + '"></button>';
      }).join('') + '</div>' : '') +
      (views.length > 1 && o.note !== false ? '<p class="gx-note">' + (o.note || 'Close-ups are details of the same image.') + '</p>' : '') +
      '</div>';
    var img = el.querySelector('.gx-img'), label = el.querySelector('.gx-label'), thumbs = [].slice.call(el.querySelectorAll('.gx-thumb')), stage = el.querySelector('.gx-stage');

    function go(n, byUser) {
      i = (n + views.length) % views.length;
      img.style.transform = place(views[i]);
      label.textContent = views[i].label;
      thumbs.forEach(function (t, k) { if (k === i) t.setAttribute('aria-current', 'true'); else t.removeAttribute('aria-current'); });
      if (byUser) { user = true; clearTimeout(timer); }
      else schedule();
    }
    function schedule() {
      clearTimeout(timer);
      if (o.auto && !user && vis && !RM.matches && !d.hidden && views.length > 1) timer = setTimeout(function () { go(i + 1); }, o.interval || 4800);
    }
    thumbs.forEach(function (t, k) { t.addEventListener('click', function () { go(k, true); }); });
    var pv = el.querySelector('.gx-prev'), nx = el.querySelector('.gx-next');
    if (pv) pv.addEventListener('click', function (e) { e.stopPropagation(); go(i - 1, true); });
    if (nx) nx.addEventListener('click', function (e) { e.stopPropagation(); go(i + 1, true); });
    el.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      if (/^(INPUT|SELECT|TEXTAREA)$/.test(e.target.tagName)) return;
      e.preventDefault(); e.stopPropagation();
      go(i + (e.key === 'ArrowRight' ? 1 : -1), true);
      if (thumbs[i] && el.contains(d.activeElement) && d.activeElement.classList.contains('gx-thumb')) thumbs[i].focus();
    });
    var sx = 0, sy = 0, on = false;
    stage.addEventListener('pointerdown', function (e) { if (e.pointerType === 'mouse') return; on = true; sx = e.clientX; sy = e.clientY; }, { passive: true });
    stage.addEventListener('pointerup', function (e) {
      if (!on) return; on = false;
      var dx = e.clientX - sx, dy = e.clientY - sy;
      if (Math.abs(dx) > 44 && Math.abs(dx) > Math.abs(dy) * 1.4) { go(i + (dx < 0 ? 1 : -1), true); if (o.onSwipe) o.onSwipe(); }
    }, { passive: true });
    stage.addEventListener('pointercancel', function () { on = false; }, { passive: true });

    var io = 'IntersectionObserver' in w ? new w.IntersectionObserver(function (es) { vis = es[0].isIntersecting; schedule(); }, { threshold: .35 }) : null;
    if (io) io.observe(stage); else vis = true;
    var onVis = function () { schedule(); };
    d.addEventListener('visibilitychange', onVis);
    go(0);
    return { go: function (n) { go(n, true); }, destroy: function () { clearTimeout(timer); if (io) io.disconnect(); d.removeEventListener('visibilitychange', onVis); } };
  }
  w.DemoGallery = { mount: mount };
})(window, document);
