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

function initAiAssistant() {
  const fab = document.querySelector('.ai-fab');
  const chatbox = document.querySelector('#ai-chatbox');
  const close = document.querySelector('.ai-close');
  const form = document.querySelector('.ai-input');
  if (!fab || !chatbox || !close) return;

  const setOpen = (isOpen) => {
    chatbox.classList.toggle('open', isOpen);
    fab.setAttribute('aria-expanded', String(isOpen));
  };

  fab.addEventListener('click', () => setOpen(!chatbox.classList.contains('open')));
  close.addEventListener('click', () => setOpen(false));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      setOpen(true);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initMenu();
  initSmoothScroll();
  initAiAssistant();
});
