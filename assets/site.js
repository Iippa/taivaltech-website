(() => {
  const nav = document.getElementById('site-nav');

  // ── Mobile hamburger ──
  const hamburger = document.getElementById('nav-hamburger');
  const drawer = document.getElementById('nav-drawer');
  if (hamburger && drawer) {
    hamburger.addEventListener('click', () => {
      const isOpen = drawer.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    // Close on link click
    drawer.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        drawer.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !drawer.contains(e.target)) {
        drawer.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  const handleNavScroll = () => {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 10);
  };

  handleNavScroll();
  window.addEventListener('scroll', handleNavScroll, { passive: true });

  // ── Nav color adapts to page background ──
  // Light sections get nav-light class; dark sections default (white text)
  if ('IntersectionObserver' in window && nav) {
    const darkSections = document.querySelectorAll('.hero, .section--dark, .execution-model, [data-nav="dark"]');
    const lightSections = document.querySelectorAll('.section--light, .section--warm, [data-nav="light"]');
    let lightCount = 0;
    const themeObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const isLight = entry.target.matches('.section--light, .section--warm, [data-nav="light"]');
        if (entry.isIntersecting) {
          if (isLight) lightCount++;
          else lightCount = Math.max(0, lightCount - 1);
        } else {
          if (isLight) lightCount = Math.max(0, lightCount - 1);
        }
        nav.classList.toggle('nav-light', lightCount > 0 && window.scrollY > 120);
      });
    }, { threshold: 0.3 });
    [...darkSections, ...lightSections].forEach((s) => themeObserver.observe(s));
    // Recalc on scroll to handle edge cases
    window.addEventListener('scroll', () => {
      if (window.scrollY <= 120) { nav.classList.remove('nav-light'); return; }
    }, { passive: true });
  }

  const revealSections = document.querySelectorAll('.reveal');
  const revealAll = () => {
    revealSections.forEach((section) => {
      section.querySelectorAll('.reveal-child').forEach((child) => child.classList.add('visible'));
    });
  };

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.querySelectorAll('.reveal-child').forEach((child) => child.classList.add('visible'));
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '-40px 0px' }
    );

    revealSections.forEach((section) => revealObserver.observe(section));
  } else {
    revealAll();
  }

  const progressSections = document.querySelectorAll('[data-progress-section]');
  const updateProgress = () => {
    progressSections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const maxDistance = rect.height - window.innerHeight;

      let progress = 0;
      if (maxDistance <= 0) {
        progress = rect.top < 0 ? 1 : 0;
      } else {
        progress = Math.min(1, Math.max(0, -rect.top / maxDistance));
      }

      section.style.setProperty('--progress', progress.toFixed(3));
    });
  };

  updateProgress();
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);

  const pagePath = window.location.pathname.replace(/index\.html$/i, '');
  document.querySelectorAll('a[href*="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;

      let targetId = null;
      if (href.startsWith('#')) {
        targetId = href.slice(1);
      } else {
        const parsed = new URL(link.href, window.location.href);
        if (!parsed.hash) return;

        const targetPath = parsed.pathname.replace(/index\.html$/i, '');
        if (targetPath !== pagePath) return;
        targetId = parsed.hash.slice(1);
      }

      if (!targetId) return;

      const target = document.getElementById(targetId);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });

      if (history.replaceState) {
        history.replaceState(null, '', `#${targetId}`);
      }
    });
  });

  const highlightMap = [
    { match: '/services', id: 'nav-services' },
    { match: '/portfolio', id: 'nav-portfolio' },
    { match: '/blog', id: 'nav-blog' },
  ];

  const activeMatch = highlightMap.find((entry) => pagePath.includes(entry.match));
  if (activeMatch) {
    const activeLink = document.getElementById(activeMatch.id);
    if (activeLink) activeLink.classList.add('active');
  }

  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  if (form) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const submitButton = form.querySelector('button[type="submit"]');
      if (!submitButton) return;

      submitButton.textContent = 'Sending...';
      submitButton.disabled = true;

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' },
        });

        if (response.ok) {
          form.innerHTML = '<p style="color:rgba(255,255,255,0.84);font-size:17px;text-align:center;padding:22px 0;">Message sent. Talk soon.</p>';
          return;
        }

        submitButton.textContent = 'Send message';
        submitButton.disabled = false;
        if (status) status.textContent = 'Something went wrong — try emailing directly.';
      } catch (_) {
        submitButton.textContent = 'Send message';
        submitButton.disabled = false;
        if (status) status.textContent = 'Something went wrong — try emailing directly.';
      }
    });
  }

  const heroVideo = document.querySelector('.hero-video');
  if (heroVideo) {
    heroVideo.addEventListener('error', () => {
      heroVideo.style.display = 'none';
    });

    const playPromise = heroVideo.play?.();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {
        // Fallback image remains visible underneath.
      });
    }
  }
})();
