/*! DemoGallery: cinematic detail gallery for the Aureon and Palmstone concept demos.
    Kasim Elite Digital Global. Plain JS, no dependencies.

    Aureon-only edition: a view may supply its own src/srcset/alt for an interior
    concept reveal. Existing single-photo tours retain their original behavior.

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
    '.gx-stage .gx-img{opacity:1}.gx-stage .gx-img.gx-back{opacity:0}.gx-replay{position:absolute;right:12px;top:12px;z-index:2;min-height:44px;padding:0 14px;border:1px solid #ffffff66;border-radius:999px;background:#05070acc;color:#fff;cursor:pointer;font:500 13px system-ui}',
    '.gx-toolbar{position:absolute;top:0;left:0;width:100%;aspect-ratio:16/9;pointer-events:none}.gx-toolbar button{pointer-events:auto}.gx-reset{display:none}',
    '@media(max-width:760px){.gx-mobile-clear .gx-toolbar{position:static;aspect-ratio:auto;pointer-events:auto;display:flex;flex-wrap:wrap;align-items:center;gap:6px;padding:10px 8px;background:#0c1016;border-bottom:1px solid #ffffff1a}.gx-mobile-clear .gx-toolbar button{position:static;inset:auto;transform:none;margin:0;min-height:44px;min-width:44px;border:1px solid #ffffff40;border-radius:8px;background:#151b24;color:#fff;font:500 12px system-ui;opacity:1;padding:0 10px}.gx-mobile-clear .gx-toolbar .gx-arrow{font-size:24px;width:44px;height:44px}.gx-mobile-clear .gx-reset{display:block}.gx-mobile-clear .gx-toolbar .gx-label{position:static;flex-basis:100%;margin:4px 0 0;padding:4px 0;background:none;backdrop-filter:none;text-align:center;font-size:11px}.gx-mobile-clear .gx-stage .gx-img{object-fit:contain}.gx-mobile-clear .gx-stage:after{display:none}}',
    '@media(max-width:760px){.gx-mobile-clear .gx-toolbar{display:grid;grid-template-columns:44px minmax(0,1fr) minmax(0,1fr) 44px}.gx-mobile-clear .gx-prev{grid-column:1;grid-row:1}.gx-mobile-clear .gx-play{grid-column:2;grid-row:1}.gx-mobile-clear .gx-replay{grid-column:3;grid-row:1}.gx-mobile-clear .gx-next{grid-column:4;grid-row:1}.gx-mobile-clear .gx-reset{grid-column:1/-1;grid-row:2}.gx-mobile-clear .gx-toolbar .gx-label{grid-column:1/-1;grid-row:3}}',
    '.gx-play{position:absolute;top:12px;left:12px;z-index:2;min-height:44px;padding:0 14px;border:1px solid #ffffff66;border-radius:999px;background:#05070acc;color:#fff;cursor:pointer;font:500 13px inherit}',
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
    var id = 'gx' + Math.random().toString(36).slice(2, 7), i = 0, timer = 0, vis = false, user = !o.auto, request = 0, destroyed = false;
    el.innerHTML =
      '<div class="gx" role="group" aria-roledescription="gallery" aria-label="' + (o.label || 'Photo gallery') + '">' +
      '<div class="gx-stage' + (o.stageClass ? ' ' + o.stageClass : '') + '"><img class="gx-img" src="' + o.src + '"' + (o.srcset ? ' srcset="' + o.srcset + '"' : '') + (o.sizes ? ' sizes="' + o.sizes + '"' : '') +
      ' width="1600" height="900" alt="' + (o.alt || '') + '" decoding="async">' +
      (views.length > 1 ? '<button type="button" class="gx-arrow gx-prev" aria-label="Previous view">&#8249;</button><button type="button" class="gx-arrow gx-next" aria-label="Next view">&#8250;</button>' : '') +
      (views.length > 1 ? '<button type="button" class="gx-play" aria-pressed="false">Pause tour</button><button type="button" class="gx-replay">Replay tour</button>' : '') +
      '<span class="gx-label" aria-live="polite"></span>' + (o.badge || '') + '</div>' +
      (views.length > 1 ? '<div class="gx-thumbs">' + views.map(function (v, k) {
        return '<button type="button" class="gx-thumb" id="' + id + k + '" aria-label="' + v.label + '" style="background-image:url(\'' + (v.thumb || v.src || o.thumb || o.src) + '\');background-size:' + ((v.s || 1) * 100) + '% auto;background-position:' + thumbPos(v) + '"></button>';
      }).join('') + '</div>' : '') +
      (views.length > 1 && o.note !== false ? '<p class="gx-note">' + (o.note || 'Close-ups are details of the same image.') + '</p>' : '') +
      '</div>';
    var img = el.querySelector('.gx-img'), label = el.querySelector('.gx-label'), thumbs = [].slice.call(el.querySelectorAll('.gx-thumb')), stage = el.querySelector('.gx-stage');
    var back = img.cloneNode(); back.classList.add('gx-back'); back.alt = ''; back.setAttribute('aria-hidden','true'); stage.insertBefore(back,img);
    var currentSource = o.src;
    function showView(v) {
      var src = v.src || o.src, ticket = ++request;
      if(src === currentSource){img.style.transform=place(v);return;}
      var next = new Image();
      next.onload = function(){
        if(destroyed || ticket !== request)return;
        back.srcset=img.srcset;back.sizes=img.sizes;back.src=img.src;back.style.transform=img.style.transform;
        back.style.transition='none';back.style.opacity='1';
        img.style.transition='none';img.style.opacity='0';
        img.srcset=v.srcset||(!v.src?o.srcset:'')||'';img.sizes=o.sizes||'100vw';img.src=src;img.alt=v.alt||o.alt||'';
        img.style.transform=place(v);void img.offsetWidth;
        img.style.transition=RM.matches?'none':'opacity 1s ease, transform 1.5s ease';
        back.style.transition=RM.matches?'none':'opacity 1s ease';img.style.opacity='1';back.style.opacity='0';currentSource=src;
      };
      next.onerror=function(){if(!destroyed&&ticket===request){user=true;clearTimeout(timer);label.textContent='View unavailable — choose another detail';updatePlay();}};
      next.src=src;
    }

    // Keep the photograph unobstructed on phones; desktop controls retain their positions.
    if (o.mobileToolbar) {
      el.classList.add('gx-mobile-clear');
      var bar = d.createElement('div'); bar.className = 'gx-toolbar';
      bar.setAttribute('role', 'group'); bar.setAttribute('aria-label', 'Photo tour controls');
      stage.insertAdjacentElement('afterend', bar);
      ['.gx-prev', '.gx-play', '.gx-replay', '.gx-next', '.gx-label'].forEach(function(sel) {
        var control = el.querySelector(sel); if(control) bar.appendChild(control);
      });
      var reset = d.createElement('button'); reset.type = 'button'; reset.className = 'gx-reset';
      reset.textContent = 'Full view'; reset.addEventListener('click', function(){go(0,true);});
      bar.insertBefore(reset, bar.querySelector('.gx-next'));
    }
    var play = el.querySelector('.gx-play');
    function updatePlay(){if(play){play.hidden=RM.matches;var paused=user||RM.matches;play.textContent=paused?'Play tour':'Pause tour';play.setAttribute('aria-pressed',String(!paused));}}
    if(play)play.addEventListener('click',function(){user=!user;schedule();updatePlay();});
    var replay=el.querySelector('.gx-replay');
    if(replay)replay.addEventListener('click',function(){user=false;go(0);});
    function go(n, byUser) {
      i = (n + views.length) % views.length;
      showView(views[i]);
      label.textContent = views[i].label;
      thumbs.forEach(function (t, k) { if (k === i) t.setAttribute('aria-current', 'true'); else t.removeAttribute('aria-current'); });
      if (byUser) { user = true; clearTimeout(timer); }
      else schedule();
      updatePlay();
    }
    function schedule() {
      clearTimeout(timer);
      if (o.auto && !user && vis && !RM.matches && !d.hidden && views.length > 1) timer = setTimeout(function () { go(i + 1); }, o.interval || 4800);
    }
    thumbs.forEach(function (t, k) { t.addEventListener('click', function () { go(k, true); }); });
    var pv = el.querySelector('.gx-prev'), nx = el.querySelector('.gx-next');
    if (pv) pv.addEventListener('click', function (e) { e.stopPropagation(); go(i - 1, true); });
    if (nx) nx.addEventListener('click', function (e) { e.stopPropagation(); go(i + 1, true); });
    var onKey = function (e) {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      if (/^(INPUT|SELECT|TEXTAREA)$/.test(e.target.tagName)) return;
      e.preventDefault(); e.stopPropagation();
      go(i + (e.key === 'ArrowRight' ? 1 : -1), true);
      if (thumbs[i] && el.contains(d.activeElement) && d.activeElement.classList.contains('gx-thumb')) thumbs[i].focus();
    };
    el.addEventListener('keydown', onKey);
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
    var onMotion=function(){schedule();updatePlay();};
    if(RM.addEventListener)RM.addEventListener('change',onMotion);
    go(0);
    return { go: function (n) { go(n, true); }, destroy: function () { destroyed=true;request++;el.removeEventListener('keydown', onKey); if(RM.removeEventListener)RM.removeEventListener('change',onMotion); clearTimeout(timer); if (io) io.disconnect(); d.removeEventListener('visibilitychange', onVis); } };
  }
  w.DemoGallery = { mount: mount };
})(window, document);
