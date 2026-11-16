(() => {
  const slides = [...document.querySelectorAll('.cinema-slide')];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const motion = document.getElementById('motion-toggle');
  const hero = document.querySelector('.hero');
  const labels = ['01 / Ocean passage', '02 / Port operations', '03 / Connected terminals', '04 / Global cargo'];
  let index = 0, paused = reduce.matches, visible = true, timer, sequence = 0;
  function sync() {
    clearInterval(timer);
    document.body.classList.toggle('dm-paused', paused || reduce.matches);
    motion.textContent = reduce.matches ? 'Reduced motion enabled' : paused ? 'Resume motion' : 'Pause motion';
    motion.disabled = reduce.matches;
    motion.setAttribute('aria-pressed', String(paused || reduce.matches));
    if (!paused && !reduce.matches && visible && !document.hidden) timer = setInterval(() => show(index + 1), 7500);
  }
  async function show(next) {
    const token = ++sequence;
    const target = (next + slides.length) % slides.length;
    const img = slides[target];
    if (!img.getAttribute('src')) {
      img.src = img.dataset.src;
      img.srcset = img.dataset.src.replace('.webp', '-mobile.webp') + ' 800w, ' + img.dataset.src + ' 1600w';
      img.sizes = '100vw';
    }
    try { await img.decode(); } catch { return; }
    if (token !== sequence) return;
    slides[index].classList.remove('active');
    index = target;
    img.classList.add('active');
    document.getElementById('scene-label').textContent = labels[index];
  }
  document.getElementById('prev-scene').addEventListener('click', () => { show(index - 1); sync(); });
  document.getElementById('next-scene').addEventListener('click', () => { show(index + 1); sync(); });
  motion.addEventListener('click', () => { paused = !paused; sync(); });
  reduce.addEventListener('change', () => { paused = reduce.matches; sync(); });
  document.addEventListener('visibilitychange', sync);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync(); }).observe(hero);
    const observer = new IntersectionObserver(entries => entries.forEach(e => e.target.classList.toggle('dm-offscreen', !e.isIntersecting)));
    observer.observe(document.querySelector('.network'));
  }
  document.querySelectorAll('[data-port]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-port]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    document.querySelectorAll('[data-lane]').forEach(lane => lane.classList.toggle('selected', lane.dataset.lane === button.dataset.port));
    document.getElementById('route-detail').textContent = 'Jebel Ali → ' + button.textContent + ' · Illustrative ocean freight connection';
  }));
  sync();
})();
