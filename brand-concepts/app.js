// Scroll reveal for hero content
const heroContents = document.querySelectorAll('.hero-content');
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

heroContents.forEach(el => revealObserver.observe(el));

// Active nav link tracking
const navLinks = document.querySelectorAll('[data-nav]');
const sections = document.querySelectorAll('.intro-section, .concept-section');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
      });
    }
  });
}, { threshold: 0.2, rootMargin: '-80px 0px -40% 0px' });

sections.forEach(section => navObserver.observe(section));

// Nav dark/light mode based on which section is at the top
const stickyNav = document.getElementById('stickyNav');
const darkHeroes = document.querySelectorAll('.hero-promptlab, .hero-zero');

function updateNavTheme() {
  const navBottom = stickyNav.getBoundingClientRect().bottom;
  let isDark = false;
  
  darkHeroes.forEach(hero => {
    const rect = hero.getBoundingClientRect();
    // If the nav overlaps a dark hero section
    if (rect.top < navBottom && rect.bottom > 0) {
      isDark = true;
    }
  });
  
  stickyNav.classList.toggle('nav-dark', isDark);
}

window.addEventListener('scroll', updateNavTheme, { passive: true });
updateNavTheme();

// Mobile menu toggle
const mobileToggle = document.getElementById('mobileToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileToggle && mobileMenu) {
  mobileToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });

  // Close mobile menu when a link is clicked
  mobileMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
    });
  });
}

// Close mobile menu on scroll
window.addEventListener('scroll', () => {
  if (mobileMenu) mobileMenu.classList.remove('open');
}, { passive: true });
