/**
 * Zenitsu Portfolio — Main JavaScript
 * Lightweight vanilla JS, no frameworks
 */
document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. PAGE LOAD ─────────────────────────────────────────── */
  setTimeout(() => document.body.classList.add('loaded'), 100);

  /* ── 2. NAVIGATION ────────────────────────────────────────── */
  // Support all nav class variants across pages
  const nav = document.querySelector('.nav, .main-nav, .navbar, nav');
  const menuToggle = document.querySelector(
    '.menu-toggle, .nav-toggle, .nav__mobile-btn, .mobile-menu-toggle'
  );
  const desktopLinks = document.querySelector('.nav-links, .nav__links');
  const mobileOverlay = document.querySelector(
    '.mobile-menu, .nav__mobile-overlay'
  );

  // Collect all nav link anchors
  const navAnchors = document.querySelectorAll(
    '.nav-links a, .nav__links a, .mobile-menu a, .nav__mobile-links a'
  );

  // Scroll → solid background
  window.addEventListener('scroll', () => {
    if (nav) nav.classList.toggle('nav--scrolled', window.scrollY > 80);
  });

  // Active page highlighting
  const path = window.location.pathname.split('/').pop() || 'index.html';
  navAnchors.forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Mobile menu toggle
  function toggleMobileMenu(forceClose) {
    if (!menuToggle) return;
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    const shouldOpen = forceClose !== undefined ? !forceClose : !isOpen;

    menuToggle.setAttribute('aria-expanded', shouldOpen);
    if (mobileOverlay) mobileOverlay.classList.toggle('is-open', shouldOpen);
    if (desktopLinks) desktopLinks.classList.toggle('is-open', shouldOpen);
    document.body.style.overflow = shouldOpen ? 'hidden' : '';
  }

  if (menuToggle) {
    // Ensure aria-expanded exists
    if (!menuToggle.hasAttribute('aria-expanded')) {
      menuToggle.setAttribute('aria-expanded', 'false');
    }
    menuToggle.addEventListener('click', () => toggleMobileMenu());
  }

  // Close on link click
  navAnchors.forEach(a => a.addEventListener('click', () => toggleMobileMenu(true)));

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') toggleMobileMenu(true);
  });

  /* ── 3. SCROLL REVEAL ─────────────────────────────────────── */
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.delay;
        if (delay) el.style.transitionDelay = `${delay}ms`;
        // Add all reveal-active class variants
        el.classList.add('active', 'revealed', 'reveal-active');
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ── 4. WORK PAGE FILTER ──────────────────────────────────── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card[data-category]');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active', 'filter-btn--active');
      });
      btn.classList.add('active', 'filter-btn--active');

      const filter = btn.dataset.filter;
      projectCards.forEach(card => {
        const cat = card.dataset.category;
        if (filter === 'all' || cat === filter) {
          card.style.display = '';
          requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            if (card.style.opacity === '0') card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  /* ── 5. SMOOTH SCROLL (anchor links) ──────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const id = this.getAttribute('href');
      if (id === '#' || id === '#!') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const offset = nav ? nav.offsetHeight : 0;
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - offset,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ── 6. BEFORE / AFTER SLIDER ─────────────────────────────── */
  document.querySelectorAll('.comparison-slider, .before-after-container, .ba-slider').forEach(container => {
    const handle = container.querySelector('.slider-handle, .slider-divider');
    const beforeWrap = container.querySelector('.before-img-container, .image-before, .ba-overlay');
    let dragging = false;

    function update(clientX) {
      const rect = container.getBoundingClientRect();
      let x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const pct = (x / rect.width) * 100;
      if (handle) handle.style.left = pct + '%';
      if (beforeWrap) beforeWrap.style.width = pct + '%';
    }

    const start = e => {
      dragging = true;
      update(e.touches ? e.touches[0].clientX : e.clientX);
    };
    const move = e => {
      if (!dragging) return;
      e.preventDefault();
      update(e.touches ? e.touches[0].clientX : e.clientX);
    };
    const end = () => dragging = false;

    container.addEventListener('mousedown', start);
    container.addEventListener('touchstart', start, { passive: true });
    window.addEventListener('mousemove', move);
    window.addEventListener('touchmove', move, { passive: false });
    window.addEventListener('mouseup', end);
    window.addEventListener('touchend', end);

    // Keyboard a11y
    if (handle) {
      handle.setAttribute('tabindex', '0');
      handle.setAttribute('role', 'slider');
      handle.setAttribute('aria-label', 'Before and after comparison');
      handle.addEventListener('keydown', e => {
        let pos = parseFloat(handle.style.left) || 50;
        if (e.key === 'ArrowLeft') pos = Math.max(0, pos - 3);
        else if (e.key === 'ArrowRight') pos = Math.min(100, pos + 3);
        else return;
        e.preventDefault();
        handle.style.left = pos + '%';
        if (beforeWrap) beforeWrap.style.width = pos + '%';
      });
    }
  });

  /* ── 7. VIDEO HANDLING ────────────────────────────────────── */
  const videoObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const v = entry.target;
      if (entry.isIntersecting) v.play().catch(() => {});
      else v.pause();
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('video[autoplay]').forEach(v => {
    if (!v.hasAttribute('playsinline')) v.setAttribute('playsinline', '');
    videoObs.observe(v);
  });

  /* ── 8. LAZY LOAD FALLBACK ────────────────────────────────── */
  if (!('loading' in HTMLImageElement.prototype)) {
    const lazyObs = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) img.src = img.dataset.src;
          obs.unobserve(img);
        }
      });
    });
    document.querySelectorAll('img[loading="lazy"]').forEach(img => lazyObs.observe(img));
  }

  /* ── 9. FOCUS TRAP (mobile menu) ──────────────────────────── */
  if (menuToggle && mobileOverlay) {
    const focusable = mobileOverlay.querySelectorAll('a[href], button, [tabindex="0"]');
    if (focusable.length) {
      mobileOverlay.addEventListener('keydown', e => {
        if (e.key !== 'Tab' || !mobileOverlay.classList.contains('is-open')) return;
        const first = focusable[0], last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus();
        }
      });
    }
  }
});
