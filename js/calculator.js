/**
 * NutriCare - js/calculator.js
 * ============================================================
 * Handles all logic for the Nutrition Calculator module:
 *  1. Form validation (bilingual)
 *  2. BMI calculation  (weight / height^2)
 *  3. BMR calculation  (Mifflin-St Jeor)
 *  4. TDEE calculation (BMR x activity multiplier)
 *  5. Calorie target   (TDEE +/- goal adjustment)
 *  6. Macronutrient split (Protein / Carbs / Fat)
 *  7. Results rendering
 *  8. localStorage persistence
 *     - nutricare-calculator-profile  (profile + results)
 *     - nutricare-nutrition           (for Dashboard)
 *     - nutricare-calorie-goal        (for Meal Planner)
 *  9. Profile restore on page load
 * 10. Language-switch re-render hook
 * ============================================================
 */

'use strict';

/* ============================================================
   CONSTANTS
============================================================ */
var PROFILE_KEY     = 'nutricare-calculator-profile';
var NUTRITION_KEY   = 'nutricare-nutrition';     // read by dashboard.js
var CALORIE_GOAL_KEY = 'nutricare-calorie-goal'; // read by future meals.js

/* ============================================================
   DOM REFERENCES
============================================================ */
var form            = document.getElementById('calcForm');
var btnCalculate    = document.getElementById('btnCalculate');
var resultsEmpty    = document.getElementById('resultsEmpty');
var resultsLoaded   = document.getElementById('resultsLoaded');

// Inputs
var inputGenderMale   = document.getElementById('genderMale');
var inputGenderFemale = document.getElementById('genderFemale');
var inputAge          = document.getElementById('inputAge');
var inputHeight       = document.getElementById('inputHeight');
var inputWeight       = document.getElementById('inputWeight');
var selectActivity    = document.getElementById('selectActivity');
var selectGoal        = document.getElementById('selectGoal');

// Error spans
var errGender   = document.getElementById('errGender');
var errAge      = document.getElementById('errAge');
var errHeight   = document.getElementById('errHeight');
var errWeight   = document.getElementById('errWeight');
var errActivity = document.getElementById('errActivity');
var errGoal     = document.getElementById('errGoal');

// Result elements
var resultBmiValue     = document.getElementById('resultBmiValue');
var resultBmiCategory  = document.getElementById('resultBmiCategory');
var bmiMarker          = document.getElementById('bmiMarker');
var resultBmr          = document.getElementById('resultBmr');
var resultTdee         = document.getElementById('resultTdee');
var resultCalTarget    = document.getElementById('resultCalTarget');
var resultCalTargetBig = document.getElementById('resultCalTargetBig');
var resultGoalLabel    = document.getElementById('resultGoalLabel');
var resultCalMin       = document.getElementById('resultCalMin');
var resultCalMax       = document.getElementById('resultCalMax');
var resultProteinG     = document.getElementById('resultProteinG');
var resultProteinKcal  = document.getElementById('resultProteinKcal');
var resultProteinPct   = document.getElementById('resultProteinPct');
var resultCarbsG       = document.getElementById('resultCarbsG');
var resultCarbsKcal    = document.getElementById('resultCarbsKcal');
var resultCarbsPct     = document.getElementById('resultCarbsPct');
var resultFatG         = document.getElementById('resultFatG');
var resultFatKcal      = document.getElementById('resultFatKcal');
var resultFatPct       = document.getElementById('resultFatPct');
var barProtein         = document.getElementById('barProtein');
var barCarbs           = document.getElementById('barCarbs');
var barFat             = document.getElementById('barFat');

/* ============================================================
   1. PLACEHOLDER TRANSLATION HELPER
   main.js handles [data-i18n] text but NOT [data-i18n-ph]
   We handle placeholder translations ourselves.
============================================================ */
function applyPlaceholders() {
  if (typeof translations === 'undefined' || typeof currentLanguage === 'undefined') return;
  var langData = translations[currentLanguage];
  if (!langData || !langData.calculator) return;

  var els = document.querySelectorAll('[data-i18n-ph]');
  els.forEach(function(el) {
    var key = el.getAttribute('data-i18n-ph').split('.').pop();
    if (langData.calculator[key]) {
      el.setAttribute('placeholder', langData.calculator[key]);
    }
  });
}

/* ============================================================
   2. VALIDATION
============================================================ */
function t(key) {
  if (typeof translations === 'undefined' || typeof currentLanguage === 'undefined') return key;
  var langData = translations[currentLanguage];
  if (!langData || !langData.calculator) return key;
  return langData.calculator[key] || key;
}

function clearErrors() {
  [errGender, errAge, errHeight, errWeight, errActivity, errGoal].forEach(function(el) {
    if (el) { el.classList.remove('visible'); }
  });
  [inputAge, inputHeight, inputWeight, selectActivity, selectGoal].forEach(function(el) {
    if (el) { el.classList.remove('error'); }
  });
}

function showError(errEl, inputEl) {
  if (errEl) { errEl.classList.add('visible'); }
  if (inputEl) { inputEl.classList.add('error'); }
}

function validateForm() {
  clearErrors();
  var valid = true;

  // Gender
  var gender = getSelectedGender();
  if (!gender) {
    showError(errGender, null);
    valid = false;
  }

  // Age
  var age = parseFloat(inputAge.value);
  if (isNaN(age) || age < 10 || age > 100) {
    showError(errAge, inputAge);
    valid = false;
  }

  // Height
  var height = parseFloat(inputHeight.value);
  if (isNaN(height) || height < 50 || height > 250) {
    showError(errHeight, inputHeight);
    valid = false;
  }

  // Weight
  var weight = parseFloat(inputWeight.value);
  if (isNaN(weight) || weight < 20 || weight > 300) {
    showError(errWeight, inputWeight);
    valid = false;
  }

  // Activity
  var activity = parseFloat(selectActivity.value);
  if (!selectActivity.value || isNaN(activity)) {
    showError(errActivity, selectActivity);
    valid = false;
  }

  // Goal
  var goal = selectGoal.value;
  if (!goal) {
    showError(errGoal, selectGoal);
    valid = false;
  }

  return valid;
}

function getSelectedGender() {
  if (inputGenderMale && inputGenderMale.checked) return 'male';
  if (inputGenderFemale && inputGenderFemale.checked) return 'female';
  return null;
}

/* ============================================================
   3. CALCULATIONS
============================================================ */

/**
 * Calculate BMI.
 * @param {number} weightKg
 * @param {number} heightCm
 * @returns {number}
 */
function calcBMI(weightKg, heightCm) {
  var heightM = heightCm / 100;
  return weightKg / (heightM * heightM);
}

/**
 * Get BMI category key.
 * @param {number} bmi
 * @returns {object} { key, cssClass }
 */
function getBmiCategory(bmi) {
  if (bmi < 18.5) return { key: 'bmiUnderweight', cssClass: 'bmi-underweight' };
  if (bmi < 25.0) return { key: 'bmiNormal',      cssClass: 'bmi-normal' };
  if (bmi < 30.0) return { key: 'bmiOverweight',   cssClass: 'bmi-overweight' };
  return             { key: 'bmiObese',        cssClass: 'bmi-obesity' };
}

/**
 * Get BMI scale marker position as a percentage (0-100%).
 * Scale: 14 (hard left) to 40 (hard right).
 */
function getBmiMarkerPercent(bmi) {
  var minBmi = 14;
  var maxBmi = 40;
  var clamped = Math.max(minBmi, Math.min(maxBmi, bmi));
  return ((clamped - minBmi) / (maxBmi - minBmi)) * 100;
}

/**
 * Calculate BMR using Mifflin-St Jeor equation.
 * Male:   BMR = 10*w + 6.25*h - 5*a + 5
 * Female: BMR = 10*w + 6.25*h - 5*a - 161
 * @param {number} weightKg
 * @param {number} heightCm
 * @param {number} age
 * @param {string} gender  'male' | 'female'
 * @returns {number}
 */
function calcBMR(weightKg, heightCm, age, gender) {
  var base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  return gender === 'male' ? base + 5 : base - 161;
}

/**
 * Calculate TDEE.
 * @param {number} bmr
 * @param {number} activityMultiplier
 * @returns {number}
 */
function calcTDEE(bmr, activityMultiplier) {
  return bmr * activityMultiplier;
}

/**
 * Calculate calorie target based on goal.
 * Lose:     TDEE - 400
 * Maintain: TDEE
 * Gain:     TDEE + 400
 * @param {number} tdee
 * @param {string} goal  'lose' | 'maintain' | 'gain'
 * @returns {object} { target, min, max }
 */
function calcCalorieTarget(tdee, goal) {
  if (goal === 'lose') {
    return {
      target: Math.round(tdee - 400),
      min:    Math.round(tdee - 500),
      max:    Math.round(tdee - 300)
    };
  }
  if (goal === 'gain') {
    return {
      target: Math.round(tdee + 400),
      min:    Math.round(tdee + 300),
      max:    Math.round(tdee + 500)
    };
  }
  // maintain
  return {
    target: Math.round(tdee),
    min:    Math.round(tdee - 100),
    max:    Math.round(tdee + 100)
  };
}

/**
 * Calculate macro targets.
 * Distribution varies by goal:
 *   Lose:     Protein 35%, Carbs 40%, Fat 25%
 *   Maintain: Protein 30%, Carbs 45%, Fat 25%
 *   Gain:     Protein 30%, Carbs 50%, Fat 20%
 * @param {number} calories
 * @param {string} goal
 * @returns {object} { protein: {g, kcal, pct}, carbs: {...}, fat: {...} }
 */
function calcMacros(calories, goal) {
  var pctProtein, pctCarbs, pctFat;
  if (goal === 'lose') {
    pctProtein = 0.35; pctCarbs = 0.40; pctFat = 0.25;
  } else if (goal === 'gain') {
    pctProtein = 0.30; pctCarbs = 0.50; pctFat = 0.20;
  } else {
    pctProtein = 0.30; pctCarbs = 0.45; pctFat = 0.25;
  }

  var kcalProtein = calories * pctProtein;
  var kcalCarbs   = calories * pctCarbs;
  var kcalFat     = calories * pctFat;

  return {
    protein: {
      kcal: Math.round(kcalProtein),
      g:    Math.round(kcalProtein / 4),
      pct:  Math.round(pctProtein * 100)
    },
    carbs: {
      kcal: Math.round(kcalCarbs),
      g:    Math.round(kcalCarbs / 4),
      pct:  Math.round(pctCarbs * 100)
    },
    fat: {
      kcal: Math.round(kcalFat),
      g:    Math.round(kcalFat / 9),
      pct:  Math.round(pctFat * 100)
    }
  };
}

/* ============================================================
   4. RENDER RESULTS
============================================================ */
function renderResults(data) {
  // --- BMI ---
  resultBmiValue.textContent = data.bmi.toFixed(1);

  var cat = getBmiCategory(data.bmi);
  resultBmiCategory.textContent = t(cat.key);
  resultBmiCategory.className   = 'bmi-category-badge ' + cat.cssClass;

  // BMI scale marker
  var markerPct = getBmiMarkerPercent(data.bmi);
  bmiMarker.style.left = markerPct + '%';

  // --- Stat cards ---
  resultBmr.textContent       = Math.round(data.bmr).toLocaleString();
  resultTdee.textContent      = Math.round(data.tdee).toLocaleString();
  resultCalTarget.textContent = data.calTarget.target.toLocaleString();

  // --- Calorie target card ---
  resultCalTargetBig.textContent = data.calTarget.target.toLocaleString();
  resultCalMin.textContent       = data.calTarget.min.toLocaleString() + ' kcal';
  resultCalMax.textContent       = data.calTarget.max.toLocaleString() + ' kcal';

  // Goal label
  var goalLabelKey = data.goal === 'lose' ? 'calGoalLose'
                   : data.goal === 'gain' ? 'calGoalGain'
                   : 'calGoalMaintain';
  resultGoalLabel.textContent = t(goalLabelKey);

  // --- Macros ---
  var m = data.macros;
  resultProteinG.textContent    = m.protein.g;
  resultProteinKcal.textContent = m.protein.kcal;
  resultProteinPct.textContent  = m.protein.pct;
  barProtein.style.width        = m.protein.pct + '%';

  resultCarbsG.textContent    = m.carbs.g;
  resultCarbsKcal.textContent = m.carbs.kcal;
  resultCarbsPct.textContent  = m.carbs.pct;
  barCarbs.style.width        = m.carbs.pct + '%';

  resultFatG.textContent    = m.fat.g;
  resultFatKcal.textContent = m.fat.kcal;
  resultFatPct.textContent  = m.fat.pct;
  barFat.style.width        = m.fat.pct + '%';

  // Show results, hide empty state
  resultsEmpty.style.display  = 'none';
  resultsLoaded.classList.add('visible');

  // Re-apply i18n to newly visible elements
  if (typeof applyTranslations === 'function' && typeof currentLanguage !== 'undefined') {
    applyTranslations(currentLanguage);
    applyPlaceholders();
    // Re-render goal label after language switch (it's set programmatically)
    resultGoalLabel.textContent = t(goalLabelKey);
    // Re-render BMI category
    resultBmiCategory.textContent = t(cat.key);
  }

  // Scroll results into view on mobile
  if (window.innerWidth < 1024) {
    resultsLoaded.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/* ============================================================
   5. LOCALSTORAGE
============================================================ */
function saveToStorage(profile, results) {
  var data = {
    profile: profile,
    results: results,
    savedAt: new Date().toISOString()
  };

  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(data));
  } catch(e) {
    console.warn('NutriCare: Could not save calculator profile.', e);
  }

  // Save for Dashboard (nutricare-nutrition)
  try {
    var nutritionData = {
      tdee:    Math.round(results.tdee),
      protein: results.macros.protein.g,
      carbs:   results.macros.carbs.g,
      fat:     results.macros.fat.g,
      bmi:     parseFloat(results.bmi.toFixed(1)),
      bmr:     Math.round(results.bmr),
      goal:    profile.goal,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(NUTRITION_KEY, JSON.stringify(nutritionData));
  } catch(e) {
    console.warn('NutriCare: Could not save nutrition data.', e);
  }

  // Save for Meal Planner (nutricare-calorie-goal)
  try {
    var calorieGoalData = {
      calories:  results.calTarget.target,
      protein:   results.macros.protein.g,
      carbs:     results.macros.carbs.g,
      fat:       results.macros.fat.g,
      goal:      profile.goal,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(CALORIE_GOAL_KEY, JSON.stringify(calorieGoalData));
  } catch(e) {
    console.warn('NutriCare: Could not save calorie goal.', e);
  }
}

function loadFromStorage() {
  try {
    var stored = localStorage.getItem(PROFILE_KEY);
    if (!stored) return null;
    return JSON.parse(stored);
  } catch(e) {
    return null;
  }
}

function restoreProfile(saved) {
  if (!saved || !saved.profile) return;
  var p = saved.profile;

  // Gender
  if (p.gender === 'male' && inputGenderMale)   inputGenderMale.checked   = true;
  if (p.gender === 'female' && inputGenderFemale) inputGenderFemale.checked = true;

  // Numeric fields
  if (p.age    && inputAge)    inputAge.value    = p.age;
  if (p.height && inputHeight) inputHeight.value = p.height;
  if (p.weight && inputWeight) inputWeight.value = p.weight;

  // Selects
  if (p.activity && selectActivity) selectActivity.value = p.activity;
  if (p.goal     && selectGoal)     selectGoal.value     = p.goal;

  // Show previous results
  if (saved.results) {
    renderResults(saved.results);
  }
}

/* ============================================================
   6. MAIN CALCULATE HANDLER
============================================================ */
function handleCalculate(e) {
  if (e) e.preventDefault();

  if (!validateForm()) return;

  var gender   = getSelectedGender();
  var age      = parseFloat(inputAge.value);
  var height   = parseFloat(inputHeight.value);
  var weight   = parseFloat(inputWeight.value);
  var activity = parseFloat(selectActivity.value);
  var goal     = selectGoal.value;

  var bmi       = calcBMI(weight, height);
  var bmr       = calcBMR(weight, height, age, gender);
  var tdee      = calcTDEE(bmr, activity);
  var calTarget = calcCalorieTarget(tdee, goal);
  var macros    = calcMacros(calTarget.target, goal);

  var profile = { gender: gender, age: age, height: height, weight: weight, activity: activity, goal: goal };
  var results = { bmi: bmi, bmr: bmr, tdee: tdee, calTarget: calTarget, macros: macros, goal: goal };

  renderResults(results);
  saveToStorage(profile, results);
}

/* ============================================================
   7. EVENT LISTENERS
============================================================ */
if (form) {
  form.addEventListener('submit', handleCalculate);
}

// Clear field error on input change
function clearFieldError(inputEl, errEl) {
  if (inputEl) {
    inputEl.addEventListener('input', function() {
      inputEl.classList.remove('error');
      if (errEl) errEl.classList.remove('visible');
    });
  }
}

clearFieldError(inputAge,    errAge);
clearFieldError(inputHeight, errHeight);
clearFieldError(inputWeight, errWeight);
clearFieldError(selectActivity, errActivity);
clearFieldError(selectGoal,     errGoal);

// Gender radio – clear error on selection
[inputGenderMale, inputGenderFemale].forEach(function(radio) {
  if (radio) {
    radio.addEventListener('change', function() {
      if (errGender) errGender.classList.remove('visible');
    });
  }
});

/* ============================================================
   8. LANGUAGE SWITCH INTEGRATION
   When the user switches language, re-render results if visible,
   so BMI category label and goal label update correctly.
============================================================ */
(function hookLanguageSwitch() {
  var originalSwitch = typeof switchLanguage === 'function' ? switchLanguage : null;
  if (!originalSwitch) return;

  // Wrap switchLanguage to also apply placeholders + re-render dynamic text
  var _orig = switchLanguage;
  window.switchLanguage = function(lang) {
    _orig(lang);
    applyPlaceholders();
    // If results are visible, update the programmatic text
    if (resultsLoaded && resultsLoaded.classList.contains('visible')) {
      var saved = loadFromStorage();
      if (saved && saved.results) {
        // Re-render only the translatable dynamic parts
        var cat = getBmiCategory(saved.results.bmi);
        if (resultBmiCategory) {
          resultBmiCategory.textContent = t(cat.key);
          resultBmiCategory.className = 'bmi-category-badge ' + cat.cssClass;
        }
        var goalLabelKey = saved.results.goal === 'lose' ? 'calGoalLose'
                         : saved.results.goal === 'gain' ? 'calGoalGain'
                         : 'calGoalMaintain';
        if (resultGoalLabel) resultGoalLabel.textContent = t(goalLabelKey);
      }
    }
  };
})();

/* ============================================================
   9. INIT
============================================================ */
document.addEventListener('DOMContentLoaded', function() {
  applyPlaceholders();
  var saved = loadFromStorage();
  if (saved) {
    restoreProfile(saved);
  }
});

// Also apply placeholders after the main i18n engine runs
// (in case DOMContentLoaded already fired before this script loads)
setTimeout(function() {
  applyPlaceholders();
}, 150);
