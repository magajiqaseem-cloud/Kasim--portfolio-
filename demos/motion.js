/*! Demo motion helpers: Kasim Elite Digital Global concept demos.
    Plain JS, no dependencies. Used by Aureon, Palmstone and Dunemark.

    [data-reveal]        fades and rises in once, the first time it scrolls into view.
                         Optional style="--d:2" staggers it (90ms per step).
    [data-live]          gets .is-live only while on screen and the tab is visible,
                         so CSS loops (slow zooms, light sweeps, flowing lines) pause otherwise.
    [data-count="1234"]  counts up once when first on screen. The element's width is locked
                         to its final width first, so surrounding text never shifts.
                         Optional data-prefix / data-suffix.
    DemoMotion.tween(el, from, to, format)  animates a changing number (e.g. a payment estimate).
    DemoMotion.observe(nodes)               registers elements added later (re-rendered lists).

    Reduced motion: nothing hides, nothing loops, numbers show their final value. Without JS,
    everything is visible because the hidden starting state needs html.m-on, which this file adds. */
(function (w, d) {
  'use strict';
  var mq = w.matchMedia ? w.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };
  var RM = mq.matches, IO = 'IntersectionObserver' in w;
  if (!RM) d.documentElement.classList.add('m-on');

  function fmt(n, el) {
    var s = Math.round(n).toLocaleString('en-US');
    return (el.getAttribute('data-prefix') || '') + s + (el.getAttribute('data-suffix') || '');
  }
  function ease(t) { return 1 - Math.pow(1 - t, 3); }
  function run(dur, step, done) {
    var t0 = null;
    function f(t) { if (t0 === null) t0 = t; var p = Math.min(1, (t - t0) / dur); step(ease(p)); if (p < 1) w.requestAnimationFrame(f); else if (done) done(); }
    w.requestAnimationFrame(f);
  }
  function count(el) {
    var to = parseFloat(el.getAttribute('data-count'));
    if (RM || isNaN(to)) { el.textContent = fmt(to, el); return; }
    el.textContent = fmt(to, el);
    var wpx = el.getBoundingClientRect().width;            /* lock the final width */
    el.style.display = 'inline-block'; el.style.minWidth = wpx + 'px'; el.style.textAlign = 'right';
    el.style.fontVariantNumeric = 'tabular-nums';
    run(1200, function (p) { el.textContent = fmt(to * p, el); });
  }
  function tween(el, from, to, format) {
    if (RM || from === to || isNaN(from)) { el.textContent = format(to); return; }
    run(650, function (p) { el.textContent = format(from + (to - from) * p); });
  }

  var once = IO ? new w.IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      var el = e.target; once.unobserve(el);
      if (el.hasAttribute('data-count')) count(el); else el.classList.add('is-in');
    });
  }, { threshold: .15, rootMargin: '0px 0px -6% 0px' }) : null;

  var liveEls = [];
  var live = IO ? new w.IntersectionObserver(function (es) {
    es.forEach(function (e) { e.target._vis = e.isIntersecting; sync(e.target); });
  }, { threshold: .05 }) : null;
  function sync(el) { el.classList.toggle('is-live', !RM && !d.hidden && !!el._vis); }
  d.addEventListener('visibilitychange', function () { liveEls.forEach(sync); });

  function observe(nodes) {
    [].forEach.call(nodes, function (el) {
      if (el.hasAttribute('data-live')) {
        if (live) { liveEls.push(el); live.observe(el); } else if (!RM) el.classList.add('is-live');
      }
      if (el.hasAttribute('data-reveal') || el.hasAttribute('data-count')) {
        if (once && !RM) once.observe(el);
        else if (el.hasAttribute('data-count')) count(el); else el.classList.add('is-in');
      }
    });
  }
  observe(d.querySelectorAll('[data-reveal],[data-live],[data-count]'));
  if (mq.addEventListener) mq.addEventListener('change', function (e) {
    if (!e.matches) return;
    RM = true; d.documentElement.classList.remove('m-on');
    liveEls.forEach(function (el) { el.classList.remove('is-live'); });
  });

  w.DemoMotion = { observe: observe, tween: tween, reduced: function () { return RM; } };
})(window, document);
