const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
const revealItems = document.querySelectorAll('.reveal');
const contactForm = document.querySelector('#contact-form');
const tickerTrack = document.querySelector('.ticker-track');

if (tickerTrack) {
  const tickerGroups = [...tickerTrack.querySelectorAll('.ticker-group')];
  tickerGroups.forEach((group) => {
    const clone = group.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    tickerTrack.appendChild(clone);
  });
}

menuToggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.querySelector('b').textContent = isOpen ? '×' : '+';
});

nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('is-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  if (menuToggle) menuToggle.querySelector('b').textContent = '+';
}));

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion && tickerTrack) {
  tickerTrack.style.setProperty('animation', 'none', 'important');
}

const revealImmediately = () => {
  revealItems.forEach((item) => item.classList.add('is-visible'));
};

if (prefersReducedMotion || !('IntersectionObserver' in window)) {
  revealImmediately();
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -8% 0px' });

  revealItems.forEach((item) => {
    const group = item.closest('section, .ticker') || item.parentElement;
    const groupItems = [...group.querySelectorAll('.reveal')];
    const itemIndex = Math.max(0, groupItems.indexOf(item));
    item.style.setProperty('--reveal-delay', `${Math.min(itemIndex * 75, 225)}ms`);
    revealObserver.observe(item);
  });
}

requestAnimationFrame(() => document.body.classList.add('is-loaded'));

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(contactForm);
  const message = `Olá, Guilherme. Sou ${data.get('name')} (${data.get('email')}). ${data.get('message')}`;
  const subject = encodeURIComponent(`Contato do portfólio: ${data.get('name')}`);
  const body = encodeURIComponent(message);
  contactForm.querySelector('.form-status').textContent = 'Abrindo seu aplicativo de e-mail...';
  window.location.href = `mailto:guilopes0510@gmail.com?subject=${subject}&body=${body}`;
});
