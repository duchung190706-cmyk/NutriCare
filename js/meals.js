/**
 * NutriCare - js/meals.js
 * ============================================================
 * Logic for Smart Meal Planner:
 * 1. Read targets from nutricare-calorie-goal
 * 2. Generate daily meal plan using foodsData
 * 3. Add/Change/Remove foods with gram adjustment
 * 4. Save/Restore daily plan to nutricare-daily-meals
 * 5. Rule-based recommendations
 * 6. Bilingual UI updates
 * ============================================================
 */

'use strict';

/* ============================================================
   CONSTANTS & STATE
============================================================ */
const GOAL_KEY = 'nutricare-calorie-goal';
const DAILY_MEALS_KEY = 'nutricare-daily-meals';

let userGoal = null;
let dailyPlan = {
  date: new Date().toISOString().split('T')[0],
  breakfast: [],
  lunch: [],
  dinner: [],
  snack: [],
  totals: { cal: 0, pro: 0, carb: 0, fat: 0 }
};

let currentEditingMeal = null; // 'breakfast', 'lunch', 'dinner', 'snack'
let currentEditingIndex = -1; // -1 means adding new
let selectedFoodForModal = null;

/* ============================================================
   DOM ELEMENTS
============================================================ */
const heroActions = document.getElementById('heroActions');
const noGoalPanel = document.getElementById('noGoalPanel');
const mealsLayout = document.getElementById('mealsLayout');

const btnGenerate = document.getElementById('btnGenerate');
const btnReset = document.getElementById('btnReset');
const btnUpdateGoal = document.getElementById('btnUpdateGoal');

// Macros
const valCalA = document.getElementById('valCalA');
const valCalT = document.getElementById('valCalT');
const valCalR = document.getElementById('valCalR');
const barCal = document.getElementById('barCal');

const valProA = document.getElementById('valProA');
const valProT = document.getElementById('valProT');
const valProR = document.getElementById('valProR');
const barPro = document.getElementById('barPro');

const valCarbA = document.getElementById('valCarbA');
const valCarbT = document.getElementById('valCarbT');
const valCarbR = document.getElementById('valCarbR');
const barCarb = document.getElementById('barCarb');

const valFatA = document.getElementById('valFatA');
const valFatT = document.getElementById('valFatT');
const valFatR = document.getElementById('valFatR');
const barFat = document.getElementById('barFat');

// Recommendations
const recBox = document.getElementById('recBox');
const recIcon = document.getElementById('recIcon');
const recText = document.getElementById('recText');

// Modal
const foodModal = document.getElementById('foodModal');
const btnModalClose = document.getElementById('btnModalClose');
const btnModalCancel = document.getElementById('btnModalCancel');
const btnModalSave = document.getElementById('btnModalSave');
const mmSearch = document.getElementById('mmSearch');
const mmCategory = document.getElementById('mmCategory');
const mmFoodList = document.getElementById('mmFoodList');
const mmGrams = document.getElementById('mmGrams');
const mmPreview = document.getElementById('mmPreview');

/* ============================================================
   TRANSLATION HELPERS
============================================================ */
function t(key) {
  if (typeof translations === 'undefined' || typeof currentLanguage === 'undefined') return key;
  const langData = translations[currentLanguage];
  if (!langData) return key;
  if (langData.meals && langData.meals[key]) return langData.meals[key];
  if (langData.calculator && langData.calculator[key]) return langData.calculator[key];
  if (langData.foods && langData.foods[key]) return langData.foods[key];
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

function getFoodName(food) {
  if (!food) return '';
  const isEn = (typeof currentLanguage !== 'undefined' && currentLanguage === 'en');
  return isEn ? food.nameEN : food.nameVI;
}

/* ============================================================
   1. INIT & LOAD GOALS
============================================================ */
function init() {
  loadGoals();
  if (userGoal) {
    loadDailyPlan();
    heroActions.style.display = 'flex';
    noGoalPanel.style.display = 'none';
    mealsLayout.style.display = 'grid';
  } else {
    heroActions.style.display = 'none';
    noGoalPanel.style.display = 'block';
    mealsLayout.style.display = 'none';
  }
}

function loadGoals() {
  try {
    const stored = localStorage.getItem(GOAL_KEY);
    if (stored) {
      userGoal = JSON.parse(stored);
      // fallback safety
      if (!userGoal.calories) userGoal = null;
    }
  } catch(e) {
    userGoal = null;
  }
}

btnUpdateGoal.addEventListener('click', () => {
  init();
  updateUI();
});

/* ============================================================
   2. DAILY PLAN STORAGE
============================================================ */
function loadDailyPlan() {
  try {
    const stored = localStorage.getItem(DAILY_MEALS_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      const today = new Date().toISOString().split('T')[0];
      if (parsed.date === today) {
        dailyPlan = parsed;
      }
    }
  } catch(e) {}
  updateUI();
}

function saveDailyPlan() {
  try {
    localStorage.setItem(DAILY_MEALS_KEY, JSON.stringify(dailyPlan));
  } catch(e) {}
}

btnReset.addEventListener('click', () => {
  if (confirm(t('confirmReset'))) {
    dailyPlan.breakfast = [];
    dailyPlan.lunch = [];
    dailyPlan.dinner = [];
    dailyPlan.snack = [];
    updateUI();
  }
});

/* ============================================================
   3. GENERATOR LOGIC
============================================================ */
btnGenerate.addEventListener('click', () => {
  if (!userGoal || typeof foodsData === 'undefined') return;
  
  // Clear current plan
  dailyPlan.breakfast = [];
  dailyPlan.lunch = [];
  dailyPlan.dinner = [];
  dailyPlan.snack = [];

  const targetCal = userGoal.calories;
  const breakCal = targetCal * 0.25;
  const lunchCal = targetCal * 0.30;
  const dinnerCal = targetCal * 0.30;
  const snackCal = targetCal * 0.15;

  generateMeal('breakfast', breakCal, ['Grains', 'Fruits', 'Dairy', 'Protein']);
  generateMeal('lunch', lunchCal, ['Protein', 'Grains', 'Vegetables', 'Legumes']);
  generateMeal('dinner', dinnerCal, ['Protein', 'Vegetables', 'Grains', 'Legumes']);
  generateMeal('snack', snackCal, ['Fruits', 'Nuts & Seeds', 'Dairy']);

  updateUI();
});

function generateMeal(mealType, targetCalories, preferredCats) {
  let remaining = targetCalories;
  
  // Pick 2-3 items
  preferredCats.forEach(cat => {
    if (remaining < 50) return;
    
    // Filter foods by category
    const catFoods = foodsData.filter(f => f.category === cat);
    if (catFoods.length === 0) return;
    
    // Pick random food
    const food = catFoods[Math.floor(Math.random() * catFoods.length)];
    
    // Determine grams to hit a portion of remaining calories (approx 40-60%)
    const targetFoodCals = remaining * (Math.random() * 0.2 + 0.4);
    
    // grams = (targetFoodCals / food.calories_per_100) * 100
    let grams = Math.round((targetFoodCals / food.calories) * 100);
    
    // Clamp reasonable grams
    if (grams < 20) grams = 20;
    if (grams > 250) grams = 250;
    
    const cals = (food.calories * grams) / 100;
    
    dailyPlan[mealType].push({
      foodId: food.id,
      grams: grams
    });
    
    remaining -= cals;
  });
}

/* ============================================================
   4. UI UPDATER
============================================================ */
function updateUI() {
  if (!userGoal) return;
  
  // 1. Calculate Totals
  let tCal = 0, tPro = 0, tCarb = 0, tFat = 0;
  
  ['breakfast', 'lunch', 'dinner', 'snack'].forEach(meal => {
    let mCal = 0, mPro = 0, mCarb = 0, mFat = 0;
    
    dailyPlan[meal].forEach(item => {
      const f = foodsData.find(x => x.id === item.foodId);
      if (f) {
        const ratio = item.grams / 100;
        mCal += f.calories * ratio;
        mPro += f.protein * ratio;
        mCarb += f.carbs * ratio;
        mFat += f.fat * ratio;
      }
    });
    
    tCal += mCal; tPro += mPro; tCarb += mCarb; tFat += mFat;
    
    document.getElementById(`tot-${meal}`).textContent = Math.round(mCal);
    renderMealList(meal, dailyPlan[meal]);
  });
  
  dailyPlan.totals = { cal: Math.round(tCal), pro: Math.round(tPro), carb: Math.round(tCarb), fat: Math.round(tFat) };
  saveDailyPlan();

  // 2. Update Progress Bars
  valCalT.textContent = userGoal.calories;
  valCalA.textContent = dailyPlan.totals.cal;
  valCalR.textContent = Math.max(0, userGoal.calories - dailyPlan.totals.cal);
  barCal.style.width = Math.min((dailyPlan.totals.cal / userGoal.calories) * 100, 100) + '%';

  valProT.textContent = userGoal.protein;
  valProA.textContent = dailyPlan.totals.pro;
  valProR.textContent = Math.max(0, userGoal.protein - dailyPlan.totals.pro);
  barPro.style.width = Math.min((dailyPlan.totals.pro / userGoal.protein) * 100, 100) + '%';

  valCarbT.textContent = userGoal.carbs;
  valCarbA.textContent = dailyPlan.totals.carb;
  valCarbR.textContent = Math.max(0, userGoal.carbs - dailyPlan.totals.carb);
  barCarb.style.width = Math.min((dailyPlan.totals.carb / userGoal.carbs) * 100, 100) + '%';

  valFatT.textContent = userGoal.fat;
  valFatA.textContent = dailyPlan.totals.fat;
  valFatR.textContent = Math.max(0, userGoal.fat - dailyPlan.totals.fat);
  barFat.style.width = Math.min((dailyPlan.totals.fat / userGoal.fat) * 100, 100) + '%';

  updateRecommendations();
}

function renderMealList(mealType, items) {
  const container = document.getElementById(`list-${mealType}`);
  container.innerHTML = '';
  
  if (items.length === 0) {
    container.innerHTML = `<div class="empty-meal-msg">${t('emptyMeal')}</div>`;
    return;
  }
  
  items.forEach((item, index) => {
    const f = foodsData.find(x => x.id === item.foodId);
    if (!f) return;
    
    const ratio = item.grams / 100;
    const cal = Math.round(f.calories * ratio);
    const pro = (f.protein * ratio).toFixed(1);
    const carb = (f.carbs * ratio).toFixed(1);
    const fat = (f.fat * ratio).toFixed(1);
    
    const row = document.createElement('div');
    row.className = 'food-item-row';
    row.innerHTML = `
      <div class="food-info">
        <div class="food-name">${getFoodName(f)} — ${item.grams}g</div>
        <div class="food-macros">${cal} kcal | ${pro}g Pro | ${carb}g Carb | ${fat}g Fat</div>
      </div>
      <div class="food-actions">
        <button class="btn-food-act" onclick="openFoodSelector('${mealType}', ${index})">${t('btnChange')}</button>
        <button class="btn-food-act remove" onclick="removeFood('${mealType}', ${index})">${t('btnRemove')}</button>
      </div>
    `;
    container.appendChild(row);
  });
}

window.removeFood = function(mealType, index) {
  dailyPlan[mealType].splice(index, 1);
  updateUI();
};

/* ============================================================
   5. RECOMMENDATIONS
============================================================ */
function updateRecommendations() {
  if (!userGoal) return;
  
  const cals = dailyPlan.totals.cal;
  const pro = dailyPlan.totals.pro;
  const carb = dailyPlan.totals.carb;
  const fat = dailyPlan.totals.fat;
  
  // if completely empty
  if (cals === 0) {
    recBox.className = 'recommendation-box';
    recIcon.textContent = '💡';
    recText.textContent = t('emptyMeal'); // "Chưa có thực phẩm nào..."
    return;
  }

  let msgs = [];
  let isWarning = false;

  if (cals < userGoal.calories * 0.8) msgs.push(t('recLowCal'));
  else if (cals > userGoal.calories * 1.1) { msgs.push(t('recHighCal')); isWarning = true; }
  
  if (pro < userGoal.protein * 0.8) msgs.push(t('recLowPro'));
  if (fat > userGoal.fat * 1.1) { msgs.push(t('recHighFat')); isWarning = true; }
  if (carb < userGoal.carbs * 0.8) msgs.push(t('recLowCarb'));

  if (msgs.length === 0) {
    recBox.className = 'recommendation-box';
    recIcon.textContent = '✅';
    recText.textContent = t('recGood');
  } else {
    recBox.className = 'recommendation-box' + (isWarning ? ' alert' : '');
    recIcon.textContent = isWarning ? '⚠️' : '💡';
    recText.innerHTML = msgs.join('<br>');
  }
}

/* ============================================================
   6. MODAL & FOOD SELECTION
============================================================ */
window.openFoodSelector = function(mealType, index = -1) {
  currentEditingMeal = mealType;
  currentEditingIndex = index;
  selectedFoodForModal = null;
  
  mmSearch.value = '';
  mmCategory.value = 'all';
  mmGrams.value = 100;
  
  if (index !== -1) {
    const existing = dailyPlan[mealType][index];
    selectedFoodForModal = foodsData.find(f => f.id === existing.foodId);
    mmGrams.value = existing.grams;
  }
  
  filterModalFoods();
  updateModalPreview();
  
  foodModal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

function closeModal() {
  foodModal.classList.remove('active');
  document.body.style.overflow = '';
}
btnModalClose.addEventListener('click', closeModal);
btnModalCancel.addEventListener('click', closeModal);

function filterModalFoods() {
  const search = mmSearch.value.toLowerCase().trim();
  const cat = mmCategory.value;
  
  mmFoodList.innerHTML = '';
  
  const filtered = foodsData.filter(f => {
    if (cat !== 'all' && f.category !== cat) return false;
    if (search) {
      const nameVI = f.nameVI.toLowerCase();
      const nameEN = f.nameEN.toLowerCase();
      if (!nameVI.includes(search) && !nameEN.includes(search)) return false;
    }
    return true;
  });
  
  filtered.forEach(f => {
    const div = document.createElement('div');
    div.className = 'mm-food-item' + (selectedFoodForModal && selectedFoodForModal.id === f.id ? ' selected' : '');
    div.innerHTML = `
      <span class="mm-food-item-name">${getFoodName(f)}</span>
      <span class="mm-food-item-cat">${t('cat' + f.category.replace(/[^a-zA-Z]/g, '')) !== 'cat' + f.category.replace(/[^a-zA-Z]/g, '') ? t('cat' + f.category.replace(/[^a-zA-Z]/g, '')) : f.category}</span>
    `;
    div.addEventListener('click', () => {
      selectedFoodForModal = f;
      // Re-render list to show selection
      filterModalFoods();
      updateModalPreview();
    });
    mmFoodList.appendChild(div);
  });
  
  btnModalSave.disabled = !selectedFoodForModal;
}

mmSearch.addEventListener('input', filterModalFoods);
mmCategory.addEventListener('change', filterModalFoods);

mmGrams.addEventListener('input', updateModalPreview);

function updateModalPreview() {
  btnModalSave.disabled = !selectedFoodForModal;
  
  if (!selectedFoodForModal) {
    mmPreview.textContent = '';
    return;
  }
  
  const grams = parseFloat(mmGrams.value) || 0;
  if (grams <= 0) {
    mmPreview.textContent = 'Invalid amount';
    btnModalSave.disabled = true;
    return;
  }
  
  const ratio = grams / 100;
  const c = Math.round(selectedFoodForModal.calories * ratio);
  const p = (selectedFoodForModal.protein * ratio).toFixed(1);
  const cb = (selectedFoodForModal.carbs * ratio).toFixed(1);
  const f = (selectedFoodForModal.fat * ratio).toFixed(1);
  
  // e.g. "150 kcal | 10g Pro | 5g Carb | 2g Fat"
  mmPreview.innerHTML = `<strong>${c}</strong> kcal | <strong>${p}</strong>g Pro | <strong>${cb}</strong>g Carb | <strong>${f}</strong>g Fat`;
}

btnModalSave.addEventListener('click', () => {
  if (!selectedFoodForModal) return;
  const grams = parseFloat(mmGrams.value) || 100;
  
  if (currentEditingIndex === -1) {
    // Add new
    dailyPlan[currentEditingMeal].push({
      foodId: selectedFoodForModal.id,
      grams: grams
    });
  } else {
    // Update existing
    dailyPlan[currentEditingMeal][currentEditingIndex] = {
      foodId: selectedFoodForModal.id,
      grams: grams
    };
  }
  
  closeModal();
  updateUI();
});

/* ============================================================
   7. LANGUAGE HOOK
============================================================ */
(function hookLanguageSwitch() {
  const originalSwitch = typeof switchLanguage === 'function' ? switchLanguage : null;
  if (!originalSwitch) return;

  const _orig = switchLanguage;
  window.switchLanguage = function(lang) {
    _orig(lang);
    applyPlaceholders();
    
    // Re-render strings inside JS
    if (document.getElementById('btnModalCancel')) {
      document.getElementById('btnModalCancel').textContent = lang === 'en' ? 'Cancel' : 'Hủy';
    }
    
    updateUI();
    if (foodModal && foodModal.classList.contains('active')) {
      filterModalFoods();
    }
  };
})();

/* ============================================================
   STARTUP
============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  applyPlaceholders();
  init();
});

// Fallback for placeholders
setTimeout(() => {
  applyPlaceholders();
}, 150);
