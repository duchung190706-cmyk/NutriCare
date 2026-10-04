/**
 * NutriCare - js/foods.js
 * ============================================================
 * Handles logic for the Foods Database module:
 *  1. Rendering food cards
 *  2. Search and Filtering (Category, tags like high-protein)
 *  3. Tab Navigation (All Foods / Favorites)
 *  4. Favorites system (localStorage)
 *  5. Food Detail Modal & Serving Calculator
 *  6. Bilingual support via main.js translations
 * ============================================================
 */

'use strict';

if (typeof foodsData === 'undefined') {
  console.error('NutriCare: foodsData is missing. Ensure data/foods.js is loaded.');
}

/* ============================================================
   CONSTANTS & STATE
============================================================ */
const FAV_STORAGE_KEY = 'nutricare-favorite-foods';

let currentFoods = foodsData || [];
let favoriteIds = [];
let currentTab = 'all'; // 'all' or 'favs'
let currentTagFilter = null; // 'high-protein', 'low-calorie', 'high-fiber'

/* ============================================================
   DOM ELEMENTS
============================================================ */
const foodGrid = document.getElementById('foodGrid');
const noResults = document.getElementById('noResults');

// Toolbar
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');

// Tabs & Tags
const tabAll = document.getElementById('tabAll');
const tabFavs = document.getElementById('tabFavs');
const filterTagBtns = document.querySelectorAll('.filter-tag-btn');

// Modal
const modal = document.getElementById('foodModal');
const btnModalClose = document.getElementById('btnModalClose');

// Modal content
const modalCat = document.getElementById('modalCat');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalTags = document.getElementById('modalTags');

const mCal = document.getElementById('mCal');
const mPro = document.getElementById('mPro');
const mCarb = document.getElementById('mCarb');
const mFat = document.getElementById('mFat');
const mFib = document.getElementById('mFib');
const mServ = document.getElementById('mServ');

// Modal calculator
const calcGrams = document.getElementById('calcGrams');
const btnCalcServing = document.getElementById('btnCalcServing');
const rcCal = document.getElementById('rcCal');
const rcPro = document.getElementById('rcPro');
const rcCarb = document.getElementById('rcCarb');
const rcFat = document.getElementById('rcFat');
const rcFib = document.getElementById('rcFib');

let currentActiveFoodId = null;

/* ============================================================
   1. TRANSLATION HELPERS
============================================================ */
function t(key) {
  if (typeof translations === 'undefined' || typeof currentLanguage === 'undefined') return key;
  const langData = translations[currentLanguage];
  if (!langData) return key;
  
  // Try foods namespace first, then calculator for macros
  if (langData.foods && langData.foods[key]) return langData.foods[key];
  if (langData.calculator && langData.calculator[key]) return langData.calculator[key];
  return key;
}

function applyPlaceholders() {
  if (typeof translations === 'undefined' || typeof currentLanguage === 'undefined') return;
  const els = document.querySelectorAll('[data-i18n-ph]');
  els.forEach(el => {
    const keyPath = el.getAttribute('data-i18n-ph').split('.');
    let val = translations[currentLanguage];
    for (let k of keyPath) {
      if (val) val = val[k];
    }
    if (val) el.setAttribute('placeholder', val);
  });
}

// Get translated food string based on current language
function getFoodString(food, field) {
  const isEn = (typeof currentLanguage !== 'undefined' && currentLanguage === 'en');
  if (field === 'name') return isEn ? food.nameEN : food.nameVI;
  if (field === 'desc') return isEn ? food.descEN : food.descVI;
  if (field === 'category') {
    // try translation map
    const catKey = 'cat' + food.category.replace(/[^a-zA-Z]/g, '');
    return t(catKey) !== catKey ? t(catKey) : food.category;
  }
  return food[field] || '';
}

/* ============================================================
   2. FAVORITES MANAGEMENT
============================================================ */
function loadFavorites() {
  try {
    const stored = localStorage.getItem(FAV_STORAGE_KEY);
    if (stored) {
      favoriteIds = JSON.parse(stored);
    }
  } catch (e) {
    favoriteIds = [];
  }
}

function saveFavorites() {
  try {
    localStorage.setItem(FAV_STORAGE_KEY, JSON.stringify(favoriteIds));
  } catch (e) {
    console.error('NutriCare: Could not save favorites.', e);
  }
}

function toggleFavorite(id) {
  const index = favoriteIds.indexOf(id);
  if (index === -1) {
    favoriteIds.push(id);
  } else {
    favoriteIds.splice(index, 1);
  }
  saveFavorites();
  
  // If we are currently in favorites tab, re-filter
  if (currentTab === 'favs') {
    applyFilters();
  } else {
    // Otherwise just update the button visually
    renderFoods(currentFoods);
  }
}

/* ============================================================
   3. RENDER FOODS
============================================================ */
function renderFoods(foodsToRender) {
  if (!foodGrid) return;
  
  foodGrid.innerHTML = '';
  
  if (foodsToRender.length === 0) {
    noResults.classList.remove('hidden');
  } else {
    noResults.classList.add('hidden');
  }

  foodsToRender.forEach(food => {
    const isFav = favoriteIds.includes(food.id);
    const card = document.createElement('div');
    card.className = 'food-card';
    
    // Translated strings
    const nameStr = getFoodString(food, 'name');
    const catStr = getFoodString(food, 'category');
    
    // Label translations
    const per100gStr = t('per100g');
    const proLbl = t('macroProtein');
    const carbLbl = t('macroCarbs');
    const fatLbl = t('macroFat');
    const viewDetailsStr = t('viewDetails');

    card.innerHTML = `
      <div class="food-card-header">
        <div>
          <div class="food-card-category">${catStr}</div>
          <h3 class="food-card-title">${nameStr}</h3>
        </div>
        <button class="btn-fav ${isFav ? 'active' : ''}" data-id="${food.id}" aria-label="Favorite">
          ${isFav ? '❤️' : '🤍'}
        </button>
      </div>
      
      <div class="food-card-macros">
        <div class="calc-result-item">
          <span class="mini-macro-val">${food.calories}</span>
          <span class="mini-macro-lbl">kcal</span>
          <span class="mini-macro-unit">${per100gStr}</span>
        </div>
        <div class="calc-result-item">
          <span class="mini-macro-val">${food.protein}</span>
          <span class="mini-macro-lbl">${proLbl}</span>
          <span class="mini-macro-unit">g</span>
        </div>
        <div class="calc-result-item">
          <span class="mini-macro-val">${food.carbs}</span>
          <span class="mini-macro-lbl">${carbLbl}</span>
          <span class="mini-macro-unit">g</span>
        </div>
        <div class="calc-result-item">
          <span class="mini-macro-val">${food.fat}</span>
          <span class="mini-macro-lbl">${fatLbl}</span>
          <span class="mini-macro-unit">g</span>
        </div>
      </div>
      
      <button class="btn-view-food" data-id="${food.id}">${viewDetailsStr}</button>
    `;
    
    foodGrid.appendChild(card);
  });

  // Attach event listeners for dynamic buttons
  document.querySelectorAll('.btn-fav').forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Find closest button in case they clicked inner span
      const targetBtn = e.target.closest('.btn-fav');
      const id = parseInt(targetBtn.getAttribute('data-id'), 10);
      toggleFavorite(id);
    });
  });

  document.querySelectorAll('.btn-view-food').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(e.target.getAttribute('data-id'), 10);
      openFoodModal(id);
    });
  });
}

/* ============================================================
   4. FILTER & SEARCH LOGIC
============================================================ */
function applyFilters() {
  const searchTerm = searchInput.value.toLowerCase().trim();
  const category = categoryFilter.value;
  
  currentFoods = foodsData.filter(food => {
    // 1. Tab filter
    if (currentTab === 'favs' && !favoriteIds.includes(food.id)) {
      return false;
    }
    
    // 2. Category
    if (category !== 'all' && food.category !== category) {
      return false;
    }
    
    // 3. Tag Filter
    if (currentTagFilter && !food.tags.includes(currentTagFilter)) {
      return false;
    }
    
    // 4. Search
    if (searchTerm !== '') {
      const nameVi = food.nameVI.toLowerCase();
      const nameEn = food.nameEN.toLowerCase();
      if (!nameVi.includes(searchTerm) && !nameEn.includes(searchTerm)) {
        return false;
      }
    }
    
    return true;
  });

  renderFoods(currentFoods);
}

// Event Listeners for Filters
if (searchInput) searchInput.addEventListener('input', applyFilters);
if (categoryFilter) categoryFilter.addEventListener('change', applyFilters);

// Tabs
if (tabAll && tabFavs) {
  tabAll.addEventListener('click', () => {
    currentTab = 'all';
    tabAll.classList.add('active');
    tabFavs.classList.remove('active');
    applyFilters();
  });
  
  tabFavs.addEventListener('click', () => {
    currentTab = 'favs';
    tabFavs.classList.add('active');
    tabAll.classList.remove('active');
    applyFilters();
  });
}

// Quick Tag Filters
filterTagBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    const tag = e.target.getAttribute('data-tag');
    
    // Toggle logic
    if (currentTagFilter === tag) {
      // Deactivate
      currentTagFilter = null;
      btn.classList.remove('active');
    } else {
      // Activate
      currentTagFilter = tag;
      filterTagBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    }
    
    applyFilters();
  });
});


/* ============================================================
   5. FOOD MODAL & SERVING CALCULATOR
============================================================ */
function openFoodModal(id) {
  const food = foodsData.find(f => f.id === id);
  if (!food || !modal) return;
  
  currentActiveFoodId = id;
  
  modalTitle.textContent = getFoodString(food, 'name');
  modalCat.textContent = getFoodString(food, 'category');
  modalDesc.textContent = getFoodString(food, 'desc');
  
  // Table per 100g
  mCal.textContent = food.calories;
  mPro.textContent = food.protein;
  mCarb.textContent = food.carbs;
  mFat.textContent = food.fat;
  mFib.textContent = food.fiber;
  mServ.textContent = food.serving;
  
  // Render tags
  modalTags.innerHTML = '';
  food.tags.forEach(tag => {
    const span = document.createElement('span');
    span.className = `tag-pill tag-${tag}`;
    
    // Basic translation mapping for tags
    let tagStr = tag;
    if (tag === 'high-protein') tagStr = t('filterHighProtein');
    if (tag === 'low-calorie') tagStr = t('filterLowCal');
    if (tag === 'high-fiber') tagStr = t('filterHighFiber');
    if (tag === 'low-fat') tagStr = (typeof currentLanguage !== 'undefined' && currentLanguage === 'en') ? 'Low Fat' : 'Ít béo';
    
    span.textContent = tagStr;
    modalTags.appendChild(span);
  });
  
  // Reset calculator
  calcGrams.value = '';
  rcCal.textContent = '--';
  rcPro.textContent = '--';
  rcCarb.textContent = '--';
  rcFat.textContent = '--';
  rcFib.textContent = '--';
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden'; // prevent bg scroll
}

function closeFoodModal() {
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

if (btnModalClose) btnModalClose.addEventListener('click', closeFoodModal);

// Close on background click or Escape
if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeFoodModal();
  });
}
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
    closeFoodModal();
  }
});

// Calculator
if (btnCalcServing && calcGrams) {
  btnCalcServing.addEventListener('click', calculateServing);
  // Also calculate on Enter
  calcGrams.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') calculateServing();
  });
}

function calculateServing() {
  if (!currentActiveFoodId) return;
  const food = foodsData.find(f => f.id === currentActiveFoodId);
  if (!food) return;
  
  const grams = parseFloat(calcGrams.value);
  if (isNaN(grams) || grams <= 0) {
    return; // Don't calc if invalid
  }
  
  const ratio = grams / 100;
  
  rcCal.textContent = Math.round(food.calories * ratio);
  rcPro.textContent = (food.protein * ratio).toFixed(1);
  rcCarb.textContent = (food.carbs * ratio).toFixed(1);
  rcFat.textContent = (food.fat * ratio).toFixed(1);
  rcFib.textContent = (food.fiber * ratio).toFixed(1);
}


/* ============================================================
   6. LANGUAGE HOOK
============================================================ */
(function hookLanguageSwitch() {
  const originalSwitch = typeof switchLanguage === 'function' ? switchLanguage : null;
  if (!originalSwitch) return;

  const _orig = switchLanguage;
  window.switchLanguage = function(lang) {
    _orig(lang);
    applyPlaceholders();
    
    // Re-render foods list with new language strings
    renderFoods(currentFoods);
    
    // Update modal if it is open
    if (modal && modal.classList.contains('active') && currentActiveFoodId) {
      openFoodModal(currentActiveFoodId);
    }
  };
})();

/* ============================================================
   INIT
============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  loadFavorites();
  applyPlaceholders();
  applyFilters(); // Renders initial list
});

// Backup run for dynamic placeholders if DOMContentLoaded missed
setTimeout(() => {
  applyPlaceholders();
}, 150);
