// src/scripts/menu.js
const menu = document.querySelector('.menu');
const navLinks = document.querySelector('.nav-links');

menu?.addEventListener('click', () => {
  const isExpanded = menu.getAttribute('aria-expanded') === 'true';
  menu.setAttribute('aria-expanded', `${!isExpanded}`);
  
  // Esto es lo que faltaba: mostrar u ocultar los enlaces
  navLinks?.classList.toggle('expanded');
});