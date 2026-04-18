/* ============================================================
   Zero to Fluent — Main App Scripts
   Sticky header, scroll animations, day tabs, smooth scroll,
   countdown timer, hamburger menu, neural canvas animation
   ============================================================ */

(function () {
  'use strict';

  // ┌──────────────────────────────────────────────────────────────
  // │  Neural Network Canvas — reusable for any section
  // └──────────────────────────────────────────────────────────────
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initNeuralCanvas(canvasId) {
    var canvas = document.getElementById(canvasId);
    if (!canvas) return;

    var ctx = canvas.getContext('2d');
    var particles = [];
    var particleCount = 60;
    var connectionDist = 150;
    var mouse = { x: -9999, y: -9999 };
    var dpr = window.devicePixelRatio || 1;

    function resizeCanvas() {
      var rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function createParticles() {
      particles = [];
      var w = canvas.width / dpr;
      var h = canvas.height / dpr;
      for (var i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r: Math.random() * 2 + 1,
          brightness: Math.random() * 0.5 + 0.3
        });
      }
    }

    function drawFrame() {
      var w = canvas.width / dpr;
      var h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }

      for (var i = 0; i < particles.length; i++) {
        for (var j = i + 1; j < particles.length; j++) {
          var dx = particles[i].x - particles[j].x;
          var dy = particles[i].y - particles[j].y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDist) {
            var alpha = (1 - dist / connectionDist) * 0.15;
            ctx.strokeStyle = 'rgba(129, 140, 248, ' + alpha + ')';
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        ctx.fillStyle = 'rgba(129, 140, 248, ' + p.brightness + ')';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        var mdx = mouse.x - p.x;
        var mdy = mouse.y - p.y;
        var mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < 200) {
          p.vx += mdx * 0.00008;
          p.vy += mdy * 0.00008;
        }
      }

      requestAnimationFrame(drawFrame);
    }

    if (!prefersReducedMotion) {
      resizeCanvas();
      createParticles();
      drawFrame();

      window.addEventListener('resize', function () {
        resizeCanvas();
        createParticles();
      });

      canvas.parentElement.addEventListener('mousemove', function (e) {
        var rect = canvas.parentElement.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
      });

      canvas.parentElement.addEventListener('mouseleave', function () {
        mouse.x = -9999;
        mouse.y = -9999;
      });
    }
  }

  initNeuralCanvas('neural-canvas');
  initNeuralCanvas('who-canvas');

  // ┌──────────────────────────────────────────────────────────────
  // │  Sticky Header
  // └──────────────────────────────────────────────────────────────
  var header = document.getElementById('header');
  var hero = document.getElementById('hero');
  var lastScroll = 0;

  function updateHeader() {
    var scrollY = window.scrollY;
    var heroBottom = hero.offsetTop + hero.offsetHeight;

    if (scrollY > heroBottom - 100) {
      header.classList.add('visible');
    } else {
      header.classList.remove('visible');
    }
    lastScroll = scrollY;
  }

  // ┌──────────────────────────────────────────────────────────────
  // │  Hamburger Menu
  // └──────────────────────────────────────────────────────────────
  var hamburger = document.getElementById('hamburger');
  var headerNav = document.getElementById('header-nav');

  if (hamburger && headerNav) {
    hamburger.addEventListener('click', function () {
      var isOpen = headerNav.classList.toggle('open');
      hamburger.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    headerNav.querySelectorAll('.header-link').forEach(function (link) {
      link.addEventListener('click', function () {
        headerNav.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ┌──────────────────────────────────────────────────────────────
  // │  Countdown Timer — April 21, 2026 at 10:00 AM CDT (UTC-5)
  // └──────────────────────────────────────────────────────────────
  var targetDate = new Date('2026-04-21T10:00:00-05:00').getTime();

  var cdDays = document.getElementById('cd-days');
  var cdHours = document.getElementById('cd-hours');
  var cdMins = document.getElementById('cd-mins');
  var cdSecs = document.getElementById('cd-secs');

  function updateCountdown() {
    var now = Date.now();
    var diff = targetDate - now;

    if (diff <= 0) {
      cdDays.textContent = '0';
      cdHours.textContent = '0';
      cdMins.textContent = '0';
      cdSecs.textContent = '0';
      return;
    }

    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    var secs = Math.floor((diff % (1000 * 60)) / 1000);

    cdDays.textContent = days;
    cdHours.textContent = hours < 10 ? '0' + hours : hours;
    cdMins.textContent = mins < 10 ? '0' + mins : mins;
    cdSecs.textContent = secs < 10 ? '0' + secs : secs;
  }

  if (cdDays && cdHours && cdMins && cdSecs) {
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  // ┌──────────────────────────────────────────────────────────────
  // │  Scroll Reveal (IntersectionObserver)
  // └──────────────────────────────────────────────────────────────
  var revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  var sections = document.querySelectorAll(
    '.hero-copy, .stat-banner, .problem .section-narrow, .solution .section-narrow, .features-grid, ' +
    '.instructor .section-headline, .instructor-card, ' +
    '.curriculum .section-narrow, .day-tabs, .who .section-headline, .who-grid, ' +
    '.value .section-headline, .value-stack, ' +
    '.social-proof .section-headline, .testimonial-grid, ' +
    '.pricing-card, .community .section-narrow, ' +
    '.faq .section-headline, .faq-list, .venue .section-headline, .venue-content, ' +
    '.final-cta .section-narrow, .tools-carousel-section'
  );

  sections.forEach(function (el) {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  // ┌──────────────────────────────────────────────────────────────
  // │  Day Tabs
  // └──────────────────────────────────────────────────────────────
  var dayTabs = document.querySelectorAll('.day-tab');
  var dayContents = document.querySelectorAll('.day-content');

  dayTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var day = tab.getAttribute('data-day');
      dayTabs.forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');
      dayContents.forEach(function (c) { c.classList.remove('active'); });
      document.getElementById('day-' + day).classList.add('active');
    });
  });

  // ┌──────────────────────────────────────────────────────────────
  // │  Smooth scroll for nav links
  // └──────────────────────────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = link.getAttribute('href');
      if (href === '#') return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ┌──────────────────────────────────────────────────────────────
  // │  Throttled scroll handler
  // └──────────────────────────────────────────────────────────────
  var ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        updateHeader();
        ticking = false;
      });
      ticking = true;
    }
  });

  updateHeader();

  // ┌──────────────────────────────────────────────────────────────
  // │  Cycling Typewriter Headline
  // └──────────────────────────────────────────────────────────────
  var cycleEl = document.getElementById('type-cycle');
  if (cycleEl) {
    var phrases = [
      'AI-Fluent in 2 Days.',
      'the SMB Owner Who Gets AI.',
      'Dangerous with ChatGPT.',
      'the Smartest One in the Room.',
      'Unstoppable with AI.'
    ];
    var phraseIdx = 0;
    var charIdx = 0;
    var isDeleting = false;
    var pauseCount = 0;
    var PAUSE_FRAMES = 80; // ~2 seconds at 25ms/tick when full

    if (prefersReducedMotion) {
      // Static fallback — just show first phrase
      cycleEl.textContent = phrases[0];
    } else {
      function typeTick() {
        var phrase = phrases[phraseIdx];

        if (!isDeleting) {
          charIdx++;
          if (charIdx > phrase.length) {
            // Phrase fully typed — pause before deleting
            pauseCount++;
            if (pauseCount > PAUSE_FRAMES) {
              isDeleting = true;
              pauseCount = 0;
            }
            setTimeout(typeTick, 25);
            return;
          }
        } else {
          charIdx--;
          if (charIdx < 0) {
            charIdx = 0;
            isDeleting = false;
            phraseIdx = (phraseIdx + 1) % phrases.length;
            setTimeout(typeTick, 400); // pause between phrases
            return;
          }
        }

        cycleEl.innerHTML = phrase.substring(0, charIdx) + '<span class="type-cursor"></span>';
        setTimeout(typeTick, isDeleting ? 28 : 55);
      }
      typeTick();
    }
  }

})();
