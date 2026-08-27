const typeOutput = document.querySelector('#type-output');
const typeSize = document.querySelector('#type-size');
const typeSizeValue = document.querySelector('#type-size-value');
const typeWeight = document.querySelector('#type-weight');
const replayReveal = document.querySelector('#replay-reveal');
const menuButton = document.querySelector('.ds-menu');
const menu = document.querySelector('#ds-nav');

menuButton?.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.querySelector('b').textContent = isOpen ? '×' : '+';
});

menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menu.classList.remove('is-open');
  menuButton?.setAttribute('aria-expanded', 'false');
  if (menuButton) menuButton.querySelector('b').textContent = '+';
}));

function updateTypePreview() {
  if (!typeOutput || !typeSize || !typeWeight) return;
  typeOutput.style.fontSize = `${typeSize.value}px`;
  typeOutput.style.fontWeight = typeWeight.value;
  typeSizeValue.textContent = `${typeSize.value}px`;
}

typeSize?.addEventListener('input', updateTypePreview);
typeWeight?.addEventListener('change', updateTypePreview);
updateTypePreview();

replayReveal?.addEventListener('click', () => {
  const card = replayReveal.closest('.motion-demo')?.querySelector('.motion-card');
  if (!card) return;
  card.style.animation = 'none';
  requestAnimationFrame(() => {
    card.style.animation = '';
  });
});
