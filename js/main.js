/* ============================================
   WANG XIUGANG PORTFOLIO — main.js
   Modules: I18N | Nav | ScrollSpy | Animations
   ============================================ */

/* ============================================
   1. I18N — BILINGUAL LANGUAGE SWITCHER
   ============================================ */
const I18N = (() => {
  const STORAGE_KEY = 'wxg-lang';
  const html = document.documentElement;
  const toggleBtn = document.getElementById('langToggle');

  function getLang() {
    return localStorage.getItem(STORAGE_KEY) || 'en';
  }

  function applyLang(lang) {
    html.setAttribute('data-lang', lang);

    // Update all translatable elements
    document.querySelectorAll('[data-en]').forEach(el => {
      const text = el.getAttribute(`data-${lang}`);
      if (text) el.textContent = text;
    });

    // Button shows the language you can SWITCH TO
    if (toggleBtn) {
      toggleBtn.textContent = lang === 'en' ? '中文' : 'EN';
      toggleBtn.setAttribute('aria-label', lang === 'en' ? 'Switch to Chinese' : 'Switch to English');
    }

    // Update page lang attribute for accessibility
    html.setAttribute('lang', lang === 'zh' ? 'zh-CN' : 'en');
  }

  function toggle() {
    const current = getLang();
    const next = current === 'en' ? 'zh' : 'en';
    localStorage.setItem(STORAGE_KEY, next);
    applyLang(next);
  }

  function init() {
    if (!toggleBtn) return;
    toggleBtn.addEventListener('click', toggle);
    applyLang(getLang());
  }

  return { init };
})();


/* ============================================
   2. NAV — SCROLLED STATE + HAMBURGER MENU
   ============================================ */
const Nav = (() => {
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  function handleScroll() {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 10);
  }

  function toggleMenu() {
    if (!hamburger || !navLinks) return;
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function closeMenu() {
    if (!navLinks) return;
    navLinks.classList.remove('open');
    if (hamburger) {
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
    document.body.style.overflow = '';
  }

  function init() {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // run once on load

    if (hamburger) hamburger.addEventListener('click', toggleMenu);

    // Close menu when a nav link is clicked
    if (navLinks) {
      navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMenu);
      });
    }

    // Close menu on outside click
    document.addEventListener('click', e => {
      if (navLinks && navLinks.classList.contains('open')) {
        if (!navbar.contains(e.target)) closeMenu();
      }
    });
  }

  return { init };
})();


/* ============================================
   3. SCROLL SPY — HIGHLIGHT ACTIVE NAV LINK
   ============================================ */
const ScrollSpy = (() => {
  const sections   = [];
  const navLinkMap = {};

  function build() {
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      const id = href.slice(1);
      const section = document.getElementById(id);
      if (section) {
        sections.push(section);
        navLinkMap[id] = link;
      }
    });
  }

  function update() {
    const scrollY = window.scrollY + 80; // offset for nav height
    let current = sections[0]?.id || '';

    for (const section of sections) {
      if (section.offsetTop <= scrollY) {
        current = section.id;
      }
    }

    Object.entries(navLinkMap).forEach(([id, link]) => {
      link.classList.toggle('active', id === current);
    });
  }

  function init() {
    build();
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  return { init };
})();


/* ============================================
   4. ANIMATIONS — INTERSECTION OBSERVER
   ============================================ */
const Animations = (() => {
  let observer;

  function init() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    if (!elements.length) return;

    observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Stagger delay based on position among siblings
            const parent = entry.target.parentElement;
            const siblings = Array.from(parent.querySelectorAll('.animate-on-scroll'));
            const index = siblings.indexOf(entry.target);
            entry.target.style.transitionDelay = `${index * 80}ms`;

            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // animate once
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach(el => observer.observe(el));
  }

  return { init };
})();


/* ============================================
   5. INIT — DOMCONTENTLOADED
   ============================================ */
function init() {
  I18N.init();
  Nav.init();
  ScrollSpy.init();
  Animations.init();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
