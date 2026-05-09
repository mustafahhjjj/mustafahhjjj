function initMenu() {
  const button = document.querySelector('.menu-toggle');
  const menu = document.querySelector('#main-menu');
  const actions = document.querySelector('.nav-actions');
  if (!button || !menu || !actions) return;

  const closeMenu = () => {
    menu.classList.remove('open');
    actions.classList.remove('open');
    button.setAttribute('aria-expanded', 'false');
  };

  button.addEventListener('click', () => {
    const isOpen = !menu.classList.contains('open');
    menu.classList.toggle('open', isOpen);
    actions.classList.toggle('open', isOpen);
    button.setAttribute('aria-expanded', String(isOpen));
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  actions.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initMenu();
  initSmoothScroll();
});
