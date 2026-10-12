// Animação de entrada do design system: elementos com [data-reveal] sobem e aparecem ao entrar na tela.
// O atraso escalonado vem do estilo inline --d (ex.: style="--d:.1s").
const items = document.querySelectorAll<HTMLElement>('[data-reveal]');

if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) {
  items.forEach((el) => el.classList.add('is-in'));
} else {
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in');
      io.unobserve(e.target);
    }),
    { rootMargin: '0px 0px -8% 0px' },
  );
  items.forEach((el) => io.observe(el));
}
