const tabs = document.querySelectorAll('.case-tab');
const panels = document.querySelectorAll('.case-panel');
tabs.forEach(tab => tab.addEventListener('click', () => {
  const key = tab.dataset.case;
  tabs.forEach(t => { t.classList.toggle('active', t === tab); t.setAttribute('aria-selected', t === tab ? 'true' : 'false'); });
  panels.forEach(p => p.classList.toggle('active', p.dataset.panel === key));
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
}, { threshold: 0.08, rootMargin: '0px 0px -35px 0px' });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const menuButton = document.getElementById('menuButton');
const mobileNav = document.getElementById('mobileNav');
if (menuButton) menuButton.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.textContent = open ? '×' : '☰';
});
mobileNav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  mobileNav.classList.remove('open'); menuButton.setAttribute('aria-expanded','false'); menuButton.textContent='☰';
}));

window.addEventListener('pointermove', e => {
  document.documentElement.style.setProperty('--mx', `${e.clientX}px`);
  document.documentElement.style.setProperty('--my', `${e.clientY}px`);
}, { passive:true });
