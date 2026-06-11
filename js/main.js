/* Dayane Bueno Gomes · Psicóloga Clínica
   Interações leves: header, menu mobile, animações de entrada */

(function () {
  'use strict';

  /* A classe .js ativa o estado inicial oculto das animações de entrada.
     Se este arquivo não carregar, o site renderiza 100% visível. */
  document.documentElement.classList.add('js');

  /* ---------- Header com fundo ao rolar ---------- */
  const header = document.querySelector('.site-header');

  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 24);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Menu mobile ---------- */
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');

  function closeMenu() {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menu');
    onScroll();
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
      if (open) {
        header.classList.add('scrolled');
      } else {
        onScroll();
      }
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && nav.classList.contains('open')) {
        closeMenu();
        toggle.focus();
      }
    });
  }

  /* ---------- Animações de entrada ---------- */
  const revealItems = document.querySelectorAll('.reveal, .reveal-photo');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach(function (item) {
      item.classList.add('visible');
    });
  } else {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    revealItems.forEach(function (item) {
      observer.observe(item);
    });
  }

  /* ---------- Ano dinâmico no rodapé ---------- */
  const yearEl = document.getElementById('ano');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
})();
