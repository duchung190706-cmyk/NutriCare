/**
 * NutriCare - js/guide.js
 * ============================================================
 * Logic for the Nutrition Guide Module
 * Handles article rendering, search, filters, modals, and
 * cross-module contextual links.
 * ============================================================
 */

'use strict';

/* ============================================================
   TRANSLATION HELPER
============================================================ */
function to(key) {
  if (typeof translations === 'undefined' || typeof currentLanguage === 'undefined') return key;
  const ld = translations[currentLanguage];
  if (!ld) return key;
  if (ld.guide && ld.guide[key] !== undefined) return ld.guide[key];
  return key;
}

function applyGuidePlaceholders() {
  if (typeof translations === 'undefined' || typeof currentLanguage === 'undefined') return;
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const path = el.getAttribute('data-i18n-ph').split('.');
    let val = translations[currentLanguage];
    for (const k of path) { if (val) val = val[k]; }
    if (val) el.setAttribute('placeholder', val);
  });
  
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const path = el.getAttribute('data-i18n-title').split('.');
    let val = translations[currentLanguage];
    for (const k of path) { if (val) val = val[k]; }
    if (val) el.setAttribute('title', val);
  });
}

function getCatLabel(cat) {
  if (cat === 'basics') return to('catBasics');
  if (cat === 'macros') return to('catMacros');
  if (cat === 'hydration') return to('catHydration');
  if (cat === 'meal-planning') return to('catMealPlanning');
  if (cat === 'habits') return to('catHabits');
  return cat;
}

/* ============================================================
   DOM ELEMENTS
============================================================ */
const guideGrid   = document.getElementById('guideGrid');
const guideSearch = document.getElementById('guideSearch');
const filterCat   = document.getElementById('filterCat');

const modalOverlay = document.getElementById('guideModalOverlay');
const modalTitle   = document.getElementById('modalTitle');
const modalCat     = document.getElementById('modalCat');
const modalContent = document.getElementById('modalContent');
const modalTags    = document.getElementById('modalTags');
const modalContextLinkContainer = document.getElementById('modalContextLinkContainer');
const btnModalClose = document.getElementById('btnModalClose');

/* ============================================================
   RENDER ARTICLES
============================================================ */
function renderArticles() {
  if (typeof guideArticles === 'undefined') return;
  
  const isEn = (typeof currentLanguage !== 'undefined' && currentLanguage === 'en');
  const q = guideSearch.value.trim().toLowerCase();
  const cat = filterCat.value;
  
  const filtered = guideArticles.filter(a => {
    // Search
    const tVI = (a.titleVI || '').toLowerCase();
    const tEN = (a.titleEN || '').toLowerCase();
    const sVI = (a.summaryVI || '').toLowerCase();
    const sEN = (a.summaryEN || '').toLowerCase();
    const tags = a.tags.join(' ').toLowerCase();
    
    if (q && !tVI.includes(q) && !tEN.includes(q) && !sVI.includes(q) && !sEN.includes(q) && !tags.includes(q)) {
      return false;
    }
    
    // Filter
    if (cat !== 'all' && a.category !== cat) return false;
    
    return true;
  });
  
  guideGrid.innerHTML = '';
  
  if (filtered.length === 0) {
    guideGrid.innerHTML = `<div class="guide-no-results">${to('noResults')}</div>`;
    return;
  }
  
  filtered.forEach(a => {
    const title = isEn ? a.titleEN : a.titleVI;
    const summary = isEn ? a.summaryEN : a.summaryVI;
    const pts = isEn ? a.keyPointsEN : a.keyPointsVI;
    
    const card = document.createElement('div');
    card.className = 'guide-card';
    
    const pointsHtml = pts.map(p => `<li>${p}</li>`).join('');
    
    card.innerHTML = `
      <span class="guide-card-cat">${getCatLabel(a.category)}</span>
      <h3 class="guide-card-title">${title}</h3>
      <p class="guide-card-summary">${summary}</p>
      <div class="guide-card-points">
        <ul>${pointsHtml}</ul>
      </div>
      <button class="btn-read-more" data-id="${a.id}">${to('btnReadMore')}</button>
    `;
    
    guideGrid.appendChild(card);
  });
  
  // Attach events
  document.querySelectorAll('.btn-read-more').forEach(btn => {
    btn.addEventListener('click', (e) => {
      openModal(e.target.dataset.id);
    });
  });
  
  updateFeaturedTopics();
}

function updateFeaturedTopics() {
  if (typeof guideArticles === 'undefined') return;
  const isEn = (typeof currentLanguage !== 'undefined' && currentLanguage === 'en');
  
  // Highlighted topics defined in HTML: g2 (Protein), g6 (Balanced Meal), g5 (Hydration)
  const f1 = guideArticles.find(a => a.id === 'g2');
  const f2 = guideArticles.find(a => a.id === 'g6');
  const f3 = guideArticles.find(a => a.id === 'g5');
  
  if (f1) document.getElementById('featTitle1').textContent = isEn ? f1.titleEN : f1.titleVI;
  if (f2) document.getElementById('featTitle2').textContent = isEn ? f2.titleEN : f2.titleVI;
  if (f3) document.getElementById('featTitle3').textContent = isEn ? f3.titleEN : f3.titleVI;
}

/* ============================================================
   CROSS-MODULE CONTEXT LINKS
============================================================ */
function getContextLink(articleId) {
  // Returns HTML for a contextual link based on article topic
  if (articleId === 'g1') { // Calories
    return `<a href="calculator.html" class="guide-modal-context-link">💡 ${to('ctxCalories')}</a>`;
  }
  if (articleId === 'g2') { // Protein
    return `<a href="foods.html" class="guide-modal-context-link">💡 ${to('ctxProtein')}</a>`;
  }
  if (articleId === 'g5') { // Hydration
    return `<a href="dashboard.html" class="guide-modal-context-link">💡 ${to('ctxWater')}</a>`;
  }
  if (articleId === 'g6') { // Balanced meal
    return `<a href="meals.html" class="guide-modal-context-link">💡 ${to('ctxMeals')}</a>`;
  }
  return '';
}

/* ============================================================
   MODAL LOGIC
============================================================ */
function openModal(id) {
  if (typeof guideArticles === 'undefined') return;
  const a = guideArticles.find(x => x.id === id);
  if (!a) return;
  
  const isEn = (typeof currentLanguage !== 'undefined' && currentLanguage === 'en');
  
  modalCat.textContent = getCatLabel(a.category);
  modalTitle.textContent = isEn ? a.titleEN : a.titleVI;
  modalContent.innerHTML = isEn ? a.contentEN : a.contentVI;
  
  modalTags.innerHTML = a.tags.map(t => `<span class="guide-modal-tag">#${t}</span>`).join('');
  modalContextLinkContainer.innerHTML = getContextLink(a.id);
  
  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  
  // Focus management
  btnModalClose.focus();
}

function closeModal() {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

// Events for Modal
btnModalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', e => {
  if (e.target === modalOverlay) closeModal();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
    closeModal();
  }
});

// Events for Featured Cards
document.querySelectorAll('.featured-card').forEach(card => {
  card.addEventListener('click', () => {
    openModal(card.dataset.id);
  });
});

/* ============================================================
   FILTER & SEARCH EVENTS
============================================================ */
guideSearch.addEventListener('input', renderArticles);
filterCat.addEventListener('change', renderArticles);

/* ============================================================
   LANGUAGE HOOK
============================================================ */
(function hookGuideLanguage() {
  if (typeof switchLanguage !== 'function') return;
  const _prev = window.switchLanguage;
  window.switchLanguage = function(lang) {
    _prev(lang);
    applyGuidePlaceholders();
    renderArticles();
    
    // Update currently open modal if active
    if (modalOverlay.classList.contains('active')) {
      const activeTitleStr = document.getElementById('modalTitle').textContent;
      const a = guideArticles.find(x => x.titleVI === activeTitleStr || x.titleEN === activeTitleStr);
      if (a) openModal(a.id);
    }
  };
})();

/* ============================================================
   INIT
============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  applyGuidePlaceholders();
  renderArticles();
});

// Fallback to ensure placeholders apply correctly after main translations loaded
setTimeout(applyGuidePlaceholders, 150);
