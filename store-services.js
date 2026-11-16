(() => {
  const section = document.querySelector('.kedg-services');
  const button = document.getElementById('ks-motion');
  if (!section || !button) return;
  button.hidden = false;
  button.addEventListener('click', () => {
    const paused = section.classList.toggle('ks-paused');
    button.setAttribute('aria-pressed', String(paused));
    button.textContent = paused ? 'Resume visual motion' : 'Pause visual motion';
  });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.target.classList.toggle('ks-offscreen', !entry.isIntersecting));
    }, { rootMargin: '80px' });
    section.querySelectorAll('.ks-scene').forEach(scene => observer.observe(scene));
  }
})();
