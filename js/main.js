/**
 * NutriCare – js/main.js
 * ============================================================
 * Handles:
 *  1. Language initialization & switching (VI / EN)
 *  2. localStorage persistence of the chosen language
 *  3. Applying translations to all [data-i18n] elements
 *  4. Sticky navbar shadow on scroll
 *  5. Mobile hamburger menu toggle
 *  6. Scroll-reveal animation via IntersectionObserver
 *  7. Active nav-link detection based on current page
 * ============================================================
 */

'use strict';

/* ============================================================
   SECTION 1 – TRANSLATION / I18N ENGINE
   ============================================================
   How it works:
   - The `translations` object (from data/translations.js) holds
     all strings for "vi" and "en".
   - Each HTML element that needs translating has a
       data-i18n="namespace.key"
     attribute, e.g.  data-i18n="hero.title"
   - applyTranslations() loops over every such element,
     resolves the key path inside translations[lang], and sets
     the element's textContent.
   - Special handling: keys whose value contains "\n" get their
     textContent replaced using innerHTML with <br> tags so that
     line-breaks render correctly (used by hero.title).
   ============================================================ */

/**
 * Retrieve a nested value from an object using a dot-separated key.
 * Example: getNestedValue(obj, "hero.title") → obj.hero.title
 *
 * @param {Object} obj  - The translations object for one language.
 * @param {string} path - Dot-separated key path, e.g. "hero.title".
 * @returns {string|undefined} The translation string, or undefined if not found.
 */
function getNestedValue(obj, path) {
  return path.split('.').reduce(function (current, key) {
    return current && current[key] !== undefined ? current[key] : undefined;
  }, obj);
}

/**
 * Apply all translations for the given language to the page.
 * Finds every element with [data-i18n] and sets its text.
 *
 * @param {string} lang - Language code: "vi" or "en".
 */
function applyTranslations(lang) {
  // Guard: make sure the translations object is loaded
  if (typeof translations === 'undefined') {
    console.warn('NutriCare i18n: translations.js not loaded yet.');
    return;
  }

  var langData = translations[lang];
  if (!langData) {
    console.warn('NutriCare i18n: no translations found for language "' + lang + '".');
    return;
  }

  // Update every element that has a data-i18n attribute
  var elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(function (el) {
    var key   = el.getAttribute('data-i18n');
    var value = getNestedValue(langData, key);

    if (value === undefined) {
      // Key missing – leave existing text and warn in console
      console.warn('NutriCare i18n: missing key "' + key + '" for lang "' + lang + '".');
      return;
    }

    // If it's an input and we want to translate the placeholder
    if (el.tagName === 'INPUT' && el.hasAttribute('placeholder')) {
      el.setAttribute('placeholder', value);
    }
    // If the string contains a newline, render it as <br>
    else if (value.indexOf('\n') !== -1) {
      el.innerHTML = value.replace(/\n/g, '<br>');
    } else {
      el.textContent = value;
    }
  });

  // Update <html lang="..."> for accessibility / SEO
  document.documentElement.lang = langData.meta.lang || lang;

  // Update <title>
  if (langData.meta.title) {
    document.title = langData.meta.title;
  }

  // Update <meta name="description">
  var metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && langData.meta.description) {
    metaDesc.setAttribute('content', langData.meta.description);
  }
}

/* ============================================================
   SECTION 2 – LANGUAGE SWITCHER
   ============================================================
   - Reads the saved language from localStorage on page load.
   - Defaults to "vi" (Vietnamese) if nothing is saved.
   - switchLanguage() saves the chosen language and re-applies
     all translations in one call.
   ============================================================ */

var STORAGE_KEY      = 'nutricare-language'; // localStorage key
var currentLanguage  = 'vi';                 // active language (updated by switchLanguage)

var btnVI = document.getElementById('btnVI');
var btnEN = document.getElementById('btnEN');

/**
 * Switch the active language, persist to localStorage, re-render.
 *
 * @param {string} lang - "vi" or "en"
 */
function switchLanguage(lang) {
  if (lang !== 'vi' && lang !== 'en') return;

  currentLanguage = lang;

  // 1. Persist choice
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch (e) {
    // localStorage may be blocked in some browsers/contexts; fail silently
  }

  // 2. Apply all translations
  applyTranslations(lang);

  // 3. Update button active states & aria-pressed
  if (btnVI) {
    btnVI.classList.toggle('active', lang === 'vi');
    btnVI.setAttribute('aria-pressed', String(lang === 'vi'));
  }
  if (btnEN) {
    btnEN.classList.toggle('active', lang === 'en');
    btnEN.setAttribute('aria-pressed', String(lang === 'en'));
  }
}

/**
 * Initialize the language system when the page loads.
 * Reads localStorage; defaults to "vi" if no value found.
 */
function initLanguage() {
  var saved = 'vi'; // default
  try {
    var stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'vi' || stored === 'en') {
      saved = stored;
    }
  } catch (e) {
    // localStorage blocked – use default
  }
  switchLanguage(saved);
}

// Wire up the language buttons
if (btnVI) {
  btnVI.addEventListener('click', function () { switchLanguage('vi'); });
}
if (btnEN) {
  btnEN.addEventListener('click', function () { switchLanguage('en'); });
}

/* ============================================================
   SECTION 3 – STICKY NAVBAR SHADOW ON SCROLL
   ============================================================ */

var navbar = document.getElementById('navbar');

function handleNavbarScroll() {
  if (window.scrollY > 10) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleNavbarScroll, { passive: true });

/* ============================================================
   SECTION 4 – HAMBURGER MENU (mobile)
   ============================================================ */

var hamburger = document.getElementById('hamburger');
var navLinks  = document.getElementById('navLinks');

function toggleMenu() {
  var isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

function closeMenu() {
  navLinks.classList.remove('open');
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

if (hamburger) {
  hamburger.addEventListener('click', toggleMenu);
}

// Close menu when any nav link (not a lang button) is clicked
if (navLinks) {
  navLinks.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });
}

// Close menu when clicking outside
document.addEventListener('click', function (event) {
  if (
    navLinks &&
    navLinks.classList.contains('open') &&
    !navLinks.contains(event.target) &&
    !hamburger.contains(event.target)
  ) {
    closeMenu();
  }
});

// Close menu on window resize to desktop width
window.addEventListener('resize', function () {
  if (window.innerWidth >= 1024) {
    closeMenu();
  }
}, { passive: true });

/* ============================================================
   SECTION 5 – SCROLL REVEAL ANIMATION
   ============================================================
   Adds a subtle fade-in + slide-up effect to cards and sections
   as they enter the viewport. Uses IntersectionObserver for
   good performance (no scroll event listeners needed).
   ============================================================ */

var revealElements = document.querySelectorAll(
  '.benefit-card, .step-item, .cook-card, .meal-card, .cta-card'
);

if ('IntersectionObserver' in window && revealElements.length > 0) {

  // Set initial hidden state via JS (avoids CSS flash before JS loads)
  revealElements.forEach(function (el) {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  var revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          // Stagger siblings so they animate in sequence
          var siblings = Array.from(entry.target.parentElement.children);
          var delay    = siblings.indexOf(entry.target) * 80;

          setTimeout(function () {
            entry.target.style.opacity   = '1';
            entry.target.style.transform = 'translateY(0)';
          }, delay);

          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach(function (el) {
    revealObserver.observe(el);
  });

} else {
  // Fallback: show everything immediately
  revealElements.forEach(function (el) {
    el.style.opacity   = '1';
    el.style.transform = 'translateY(0)';
  });
}

/* ============================================================
   SECTION 6 – ACTIVE NAV LINK DETECTION
   ============================================================
   Highlights the correct nav link based on the current page
   filename. Runs once on load.
   ============================================================ */
(function setActiveNavLink() {
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-link').forEach(function (link) {
    var href     = link.getAttribute('href') || '';
    var linkPage = href.split('/').pop();

    var isActive =
      linkPage === currentPage ||
      (currentPage === '' && linkPage === 'index.html');

    link.classList.toggle('active', isActive);
  });
})();

/* ============================================================
   INIT – Run language system last, after everything is wired up
   ============================================================ */
initLanguage();
