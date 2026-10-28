/**
 * ===================================================================
 * MAIN CONTROLLER - ALBERTO FERRARI
 * - Theme Switcher (Light / Dark) with Top-Right Floating Bar
 * - Custom Trailing Magnetic Cursor
 * - Precise Section-to-Section Smooth Snapping
 * - One-Scroll-Per-Card Stepper for Journey Section (#esperienze)
 * - Pill Navigation Scroll-Spy with Contact section fix
 * - Scroll Reveal with IntersectionObserver
 * ===================================================================
 */

(function () {
  'use strict';

  const SECTIONS = ['home', 'esperienze', 'progetti', 'github', 'skills', 'contatti'];

  // ===================================================================
  // 1. THEME SWITCHER
  // ===================================================================
  const THEME_KEY = 'portfolio-theme-preference';

  function initTheme() {
    const root = document.documentElement;
    const themeBtn = document.getElementById('theme-toggle-btn');

    function getPreferredTheme() {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved) return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function applyTheme(theme) {
      if (theme === 'dark') {
        root.setAttribute('data-theme', 'dark');
      } else {
        root.removeAttribute('data-theme');
      }
      localStorage.setItem(THEME_KEY, theme);

      if (themeBtn) {
        themeBtn.textContent = theme === 'dark' ? '☼ Chiaro' : '☾ Scuro';
        themeBtn.setAttribute('title', theme === 'dark' ? 'Passa al tema chiaro' : 'Passa al tema scuro');
      }

      window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
    }

    function toggleTheme() {
      const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    }

    applyTheme(getPreferredTheme());

    if (themeBtn) {
      themeBtn.addEventListener('click', toggleTheme);
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(THEME_KEY)) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });

    window.PortfolioTheme = {
      getTheme: () => root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light',
      setTheme: applyTheme,
      toggle: toggleTheme,
    };
  }

  // ===================================================================
  // 2. CUSTOM TRAILING CURSOR
  // ===================================================================
  function initCursor() {
    const cur = document.querySelector('.cur');
    if (!cur) return;

    if (window.matchMedia('(pointer: coarse)').matches) {
      cur.style.display = 'none';
      return;
    }

    const STORAGE_X = 'portfolio_cursor_x';
    const STORAGE_Y = 'portfolio_cursor_y';

    const savedX = sessionStorage.getItem(STORAGE_X);
    const savedY = sessionStorage.getItem(STORAGE_Y);

    let hasPosition = false;
    let mouseX = 0;
    let mouseY = 0;
    let curX = 0;
    let curY = 0;
    let isHovering = false;
    let lastSaveTime = 0;

    // Pre-align cursor coordinates from previous session (no jump from center)
    if (savedX !== null && savedY !== null) {
      const parsedX = parseFloat(savedX);
      const parsedY = parseFloat(savedY);
      if (!isNaN(parsedX) && !isNaN(parsedY)) {
        mouseX = Math.min(Math.max(0, parsedX), window.innerWidth);
        mouseY = Math.min(Math.max(0, parsedY), window.innerHeight);
        curX = mouseX;
        curY = mouseY;
        cur.style.transform = `translate(${curX.toFixed(1)}px, ${curY.toFixed(1)}px)`;
      }
    }

    function savePosition() {
      if (hasPosition) {
        try {
          sessionStorage.setItem(STORAGE_X, String(mouseX));
          sessionStorage.setItem(STORAGE_Y, String(mouseY));
        } catch (_) {}
      }
    }

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!hasPosition) {
        curX = mouseX;
        curY = mouseY;
        hasPosition = true;
        cur.style.transform = `translate(${curX.toFixed(1)}px, ${curY.toFixed(1)}px)`;
        cur.classList.add('visible');
      }

      const now = performance.now();
      if (now - lastSaveTime > 80) {
        savePosition();
        lastSaveTime = now;
      }

      const target = e.target;
      isHovering = !!(target.closest && target.closest('a, button, input, .pj, .ic, .chip, .jc, .stat-box, .btn, .deck-control-btn'));
    });

    document.addEventListener('mouseleave', () => {
      cur.classList.remove('visible');
    });

    document.addEventListener('mouseenter', () => {
      if (hasPosition) {
        cur.classList.add('visible');
      }
    });

    window.addEventListener('beforeunload', savePosition);

    function renderCursor() {
      if (hasPosition) {
        curX += (mouseX - curX) * 0.28;
        curY += (mouseY - curY) * 0.28;
        cur.style.transform = `translate(${curX.toFixed(1)}px, ${curY.toFixed(1)}px)`;
        cur.classList.toggle('big', isHovering);
      }
      requestAnimationFrame(renderCursor);
    }

    requestAnimationFrame(renderCursor);
  }

  // ===================================================================
  // 3. HORIZONTAL TIMELINE TRACK & FILTERS (#esperienze)
  // ===================================================================
  function initHorizontalTimeline() {
    const track = document.getElementById('timeline-track');
    const filterBtns = document.querySelectorAll('.timeline-filter-btn');
    const prevBtn = document.getElementById('timeline-scroll-prev');
    const nextBtn = document.getElementById('timeline-scroll-next');
    const counter = document.getElementById('job-counter');
    const cards = document.querySelectorAll('.timeline-horizontal-track .jc');

    if (!track || !cards.length) return;

    let activeFilter = 'all';

    function updateCounter() {
      const visibleCount = Array.from(cards).filter(c => !c.classList.contains('is-hidden')).length;
      const total = cards.length;
      if (counter) {
        const lang = window.PortfolioI18n ? window.PortfolioI18n.getLang() : 'it';
        counter.textContent = lang === 'it' 
          ? `${visibleCount} / ${total} visibili` 
          : `${visibleCount} / ${total} visible`;
      }
    }

    function applyFilter(filter) {
      activeFilter = filter;

      filterBtns.forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-filter') === filter);
      });

      cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.classList.remove('is-hidden');
        } else {
          card.classList.add('is-hidden');
        }
      });

      track.scrollTo({ left: 0, behavior: 'smooth' });
      updateCounter();
    }

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        applyFilter(btn.getAttribute('data-filter') || 'all');
      });
    });

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        track.scrollBy({ left: -400, behavior: 'smooth' });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        track.scrollBy({ left: 400, behavior: 'smooth' });
      });
    }

    // Drag to scroll for mouse users
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    track.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
    });

    window.addEventListener('mouseup', () => {
      isDown = false;
    });

    track.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 1.5;
      track.scrollLeft = scrollLeft - walk;
    });

    updateCounter();
  }

  // ===================================================================
  // 4. CV LANGUAGE SELECTION POPOVER
  // ===================================================================
  function initCvPopover() {
    const triggerBtn = document.getElementById('cv-main-btn');
    const popover = document.getElementById('cv-popover');
    if (!triggerBtn || !popover) return;

    function openPopover() {
      popover.classList.add('open');
      triggerBtn.setAttribute('aria-expanded', 'true');
    }

    function closePopover() {
      popover.classList.remove('open');
      triggerBtn.setAttribute('aria-expanded', 'false');
    }

    function togglePopover(e) {
      e.stopPropagation();
      if (popover.classList.contains('open')) {
        closePopover();
      } else {
        openPopover();
      }
    }

    triggerBtn.addEventListener('click', togglePopover);

    popover.querySelectorAll('.cv-popover-item').forEach(item => {
      item.addEventListener('click', () => {
        setTimeout(closePopover, 150);
      });
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.cv-dropdown-wrapper')) {
        closePopover();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closePopover();
    });
  }

  // ===================================================================
  // 5. RIGID SECTION-BY-SECTION SCROLL SNAPPING (NO HALFWAY STOPS)
  // Cross-browser: Chrome, Firefox (deltaMode normalized), Safari, Edge
  // ===================================================================
  function initStrictSectionSnapping() {
    let isSnapping = false;
    let lastSnapTime = 0;
    let currentAnimId = null;

    function getActiveIndex() {
      const vh = window.innerHeight;
      const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight;

      if (scrollY + vh >= docHeight - 80) {
        return SECTIONS.length - 1;
      }

      let active = 0;
      SECTIONS.forEach((id, idx) => {
        const sec = document.getElementById(id);
        if (sec) {
          const rect = sec.getBoundingClientRect();
          if (rect.top <= vh * 0.45) {
            active = idx;
          }
        }
      });
      return active;
    }

    function smoothScrollTo(targetY, duration = 520, callback) {
      if (currentAnimId) {
        cancelAnimationFrame(currentAnimId);
        currentAnimId = null;
      }

      const startY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      const diff = targetY - startY;

      if (Math.abs(diff) < 2) {
        if (callback) callback();
        return;
      }

      // Check if user prefers reduced motion
      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.scrollTo(0, targetY);
        if (callback) callback();
        return;
      }

      const startTime = performance.now();

      function step(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Smooth easeInOutCubic
        const ease = progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        window.scrollTo(0, Math.round(startY + diff * ease));

        if (progress < 1) {
          currentAnimId = requestAnimationFrame(step);
        } else {
          window.scrollTo(0, targetY);
          currentAnimId = null;
          if (callback) callback();
        }
      }

      currentAnimId = requestAnimationFrame(step);
    }

    function snapToSection(index) {
      if (index < 0 || index >= SECTIONS.length) return;
      const targetId = SECTIONS[index];
      const targetEl = document.getElementById(targetId);
      if (!targetEl) return;

      isSnapping = true;
      lastSnapTime = performance.now();

      const startY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      const rect = targetEl.getBoundingClientRect();
      const targetY = Math.round(rect.top + startY);

      smoothScrollTo(targetY, 520, () => {
        isSnapping = false;
      });
    }

    // Expose for navbar links and terminal cd command
    window.PortfolioSnap = {
      snapToSection,
      smoothScrollTo,
      getActiveIndex
    };

    window.addEventListener('wheel', (e) => {
      const now = performance.now();

      // Check if mouse is over an element with independent horizontal/vertical scrolling
      const target = e.target;
      const timelineTrack = target && target.closest('#timeline-track');
      const projectsTrack = target && target.closest('#projects-container');
      if (timelineTrack || projectsTrack) {
        // If user is scrolling horizontally inside horizontal track, let track scroll
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
          return;
        }
      }

      const terminalBody = target && target.closest('.tb');
      if (terminalBody) {
        // If scrolling inside terminal buffer
        return;
      }

      // Normalize delta across browsers:
      // Chrome/Edge/Safari send DOM_DELTA_PIXEL (0), deltaY ~ 100
      // Firefox sends DOM_DELTA_LINE (1), deltaY ~ 3
      // DOM_DELTA_PAGE (2) sends deltaY ~ 1
      let dy = e.deltaY;
      if (e.deltaMode === 1) {
        dy *= 32; // Convert lines to pixels for Firefox
      } else if (e.deltaMode === 2) {
        dy *= window.innerHeight;
      }

      // Ignore minuscule vibrations
      if (Math.abs(dy) < 5) return;

      e.preventDefault();

      if (isSnapping || now - lastSnapTime < 520) {
        return;
      }

      const currentIndex = getActiveIndex();
      if (dy > 0) {
        // Scroll Down -> Next Section
        if (currentIndex < SECTIONS.length - 1) {
          snapToSection(currentIndex + 1);
        }
      } else {
        // Scroll Up -> Previous Section
        if (currentIndex > 0) {
          snapToSection(currentIndex - 1);
        }
      }
    }, { passive: false });

    // Keyboard Arrow navigation between sections
    window.addEventListener('keydown', (e) => {
      if (['input', 'textarea'].includes(document.activeElement?.tagName?.toLowerCase())) {
        return;
      }

      const currentIndex = getActiveIndex();
      if (e.key === 'PageDown' || e.key === 'ArrowDown') {
        if (currentIndex < SECTIONS.length - 1) {
          e.preventDefault();
          snapToSection(currentIndex + 1);
        }
      } else if (e.key === 'PageUp' || e.key === 'ArrowUp') {
        if (currentIndex > 0) {
          e.preventDefault();
          snapToSection(currentIndex - 1);
        }
      }
    });
  }

  // ===================================================================
  // 4. PILL NAVIGATION & SCROLL SPY (WITH CONTACT HIGHLIGHT FIX)
  // ===================================================================
  function initNavScrollSpy() {
    const navLinks = document.querySelectorAll('.pill a[href^="#"]');
    if (!navLinks.length) return;

    function onScrollSpy() {
      const scrollPos = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      const vh = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      let activeId = 'home';

      // 1. If at or near page bottom, immediately activate 'contatti'
      if (scrollPos + vh >= docHeight - 90) {
        activeId = 'contatti';
      } else {
        // 2. Otherwise detect section in central focus
        SECTIONS.forEach((id) => {
          const sec = document.getElementById(id);
          if (sec) {
            const top = sec.getBoundingClientRect().top;
            if (top <= vh * 0.45) {
              activeId = id;
            }
          }
        });
      }

      navLinks.forEach((link) => {
        const href = link.getAttribute('href').replace('#', '');
        if (href === activeId) {
          link.classList.add('on');
        } else {
          link.classList.remove('on');
        }
      });
    }

    window.addEventListener('scroll', onScrollSpy, { passive: true });
    onScrollSpy();

    // Smooth scroll on click with precise landing
    navLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (!href || href === '#') return;
        const targetId = href.replace('#', '');
        const targetIdx = SECTIONS.indexOf(targetId);
        if (targetIdx !== -1 && window.PortfolioSnap) {
          e.preventDefault();
          window.PortfolioSnap.snapToSection(targetIdx);
        } else {
          const target = document.querySelector(href);
          if (target && window.PortfolioSnap) {
            e.preventDefault();
            const startY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
            window.PortfolioSnap.smoothScrollTo(Math.round(target.getBoundingClientRect().top + startY));
          }
        }
      });
    });
  }

  // ===================================================================
  // 5. SCROLL REVEAL OBSERVER
  // ===================================================================
  function initScrollReveal() {
    const reveals = document.querySelectorAll('.rv');
    if (!reveals.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -8% 0px',
      threshold: 0.1
    });

    reveals.forEach(el => observer.observe(el));
  }

  // DOMContentLoaded bootstrap
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initCursor();
    initHorizontalTimeline();
    initCvPopover();
    initStrictSectionSnapping();
    initNavScrollSpy();
    initScrollReveal();

    const yearEl = document.getElementById('current-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    const hash = window.location.hash.replace('#', '');
    if (hash && SECTIONS.includes(hash)) {
      setTimeout(() => {
        if (window.PortfolioSnap) {
          window.PortfolioSnap.snapToSection(SECTIONS.indexOf(hash));
        }
      }, 100);
    }
  });
})();
