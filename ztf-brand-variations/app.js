/* ============================================================
   Zero to Fluent — Brand Exploration
   Navigation highlight + scroll reveal
   ============================================================ */

(function () {
  'use strict';

  // --- Scroll reveal for hero sections ---
  const heroInners = document.querySelectorAll('.concept-hero-inner');
  
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );

  heroInners.forEach((el) => revealObserver.observe(el));

  // --- Active nav link tracking ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    const scrollY = window.scrollY + 100;

    let currentSection = 'intro';
    sections.forEach((section) => {
      if (section.offsetTop <= scrollY) {
        currentSection = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle(
        'active',
        link.getAttribute('data-section') === currentSection
      );
    });
  }

  // Throttle scroll handler
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateActiveNav();
        ticking = false;
      });
      ticking = true;
    }
  });

  updateActiveNav();

  // --- Smooth scroll for nav links (backup for browsers without scroll-behavior) ---
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = document.getElementById(link.getAttribute('data-section'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Intro chips smooth scroll
  document.querySelectorAll('.intro-chip').forEach((chip) => {
    chip.addEventListener('click', (e) => {
      const href = chip.getAttribute('href');
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
})();
