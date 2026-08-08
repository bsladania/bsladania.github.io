const menuButton = document.getElementById('menuButton');
const mobileNav = document.getElementById('mobileNav');
if (menuButton && mobileNav) {
  menuButton.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.textContent = open ? '×' : '☰';
  });
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    menuButton.setAttribute('aria-expanded','false');
    menuButton.textContent = '☰';
  }));
}

document.getElementById('year').textContent = new Date().getFullYear();

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const sections = [...document.querySelectorAll('main section[id], header[id]')];
const navLinks = [...document.querySelectorAll('.desktop-nav a')];
const navObserver = new IntersectionObserver(entries => {
  const visible = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio-a.intersectionRatio)[0];
  if (!visible) return;
  navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${visible.target.id}`));
}, { rootMargin: '-35% 0px -55% 0px', threshold: [0, .1, .4, .8] });
sections.forEach(section => navObserver.observe(section));

// A little depth on the architecture card; intentionally subtle.
const visual = document.querySelector('.platform-card');
if (visual && window.matchMedia('(pointer:fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  visual.addEventListener('mousemove', e => {
    const r = visual.getBoundingClientRect();
    const x = (e.clientX-r.left)/r.width - .5;
    const y = (e.clientY-r.top)/r.height - .5;
    visual.style.transform = `perspective(1000px) rotateX(${(-y*1.4).toFixed(2)}deg) rotateY(${(x*1.4).toFixed(2)}deg)`;
  });
  visual.addEventListener('mouseleave', () => visual.style.transform = '');
}
