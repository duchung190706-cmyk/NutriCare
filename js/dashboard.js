/**
 * NutriCare - js/dashboard.js
 * ============================================================
 * Handles logic for the Personal Health Dashboard module:
 *  - Date and Summary calculation
 *  - Water tracking (saves to localStorage with daily key)
 *  - Weight tracking and history (saves to localStorage array)
 *  - Weight chart rendering using HTML5 Canvas
 * ============================================================
 */

'use strict';

// Keys for localStorage
const WATER_KEY_PREFIX = 'nutricare-water-';
const WEIGHT_HISTORY_KEY = 'nutricare-weight-history';
const GOALS_KEY = 'nutricare-goals'; // From calculator potentially
const NUTRITION_KEY = 'nutricare-nutrition'; // From calculator potentially

document.addEventListener('DOMContentLoaded', function() {
  loadDashboard();

  // Water Tracker listeners
  document.getElementById('btnWater250').addEventListener('click', () => addWater(250));
  document.getElementById('btnWater500').addEventListener('click', () => addWater(500));
  document.getElementById('btnWater750').addEventListener('click', () => addWater(750));
  document.getElementById('btnWaterReset').addEventListener('click', resetWater);

  // Weight Tracker listener
  document.getElementById('btnLogWeight').addEventListener('click', addWeight);
  document.getElementById('btnClearWeight').addEventListener('click', clearWeightHistory);

  // Trend Chart listener
  const trendSelector = document.getElementById('trendSelector');
  if (trendSelector) {
    trendSelector.addEventListener('change', function() {
      drawTrendChart(this.value);
    });
  }
});

/**
 * Main initialization function for the Dashboard.
 */
function loadDashboard() {
  // 1. Set current date dynamically
  const dateEl = document.getElementById('dashboardDate');
  const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  dateEl.textContent = today.toLocaleDateString(currentLanguage === 'vi' ? 'vi-VN' : 'en-US', options);

  // 2. Load sub-modules
  loadNutritionSummary();
  updateWaterUI();
  loadWeightData();
  loadExerciseSummary();
  loadGoals();
  loadGoalRecommendations();
  drawTrendChart('calories');
}

/**
 * Gets today's specific water key, e.g., nutricare-water-2026-09-22
 */
function getTodayWaterKey() {
  const today = new Date();
  const dateStr = today.toISOString().split('T')[0];
  return WATER_KEY_PREFIX + dateStr;
}

/**
 * Adds an amount of water (ml) to today's tracker and updates UI.
 */
function addWater(amount) {
  const key = getTodayWaterKey();
  let currentWater = parseInt(localStorage.getItem(key)) || 0;
  
  currentWater += amount;
  
  localStorage.setItem(key, currentWater);
  updateWaterUI();
}

/**
 * Resets today's water to 0.
 */
function resetWater() {
  const key = getTodayWaterKey();
  localStorage.setItem(key, 0);
  updateWaterUI();
}

/**
 * Updates the Water Tracker UI elements (text, visual fill, summary card).
 */
function updateWaterUI() {
  const key = getTodayWaterKey();
  let currentWater = parseInt(localStorage.getItem(key)) || 0;
  const targetWater = 2000; // Default target
  
  // UI in water panel
  document.getElementById('waterCurrentVal').textContent = currentWater;
  document.getElementById('waterTargetVal').textContent = targetWater;
  
  const percentage = Math.min((currentWater / targetWater) * 100, 100);
  document.getElementById('waterFill').style.height = percentage + '%';

  // Summary Card
  document.getElementById('sumWaterVal').textContent = (currentWater / 1000).toFixed(1);
  let wPercent = Math.round(percentage);
  document.getElementById('sumWaterPercent').textContent = wPercent + '%';
  document.getElementById('sumWaterRing').setAttribute('stroke-dasharray', `${(wPercent/100) * 251.2}, 251.2`);
  if (currentWater > targetWater) {
    document.getElementById('sumWaterStatus').textContent = td('statusOver');
    document.getElementById('sumWaterStatus').classList.add('over-target');
  } else {
    document.getElementById('sumWaterStatus').textContent = '';
    document.getElementById('sumWaterStatus').classList.remove('over-target');
  }
}

/**
 * Loads nutrition data (demo or from calculator) into UI.
 */
function loadNutritionSummary() {
  // Check if we have real data from the calculator
  let savedNut = localStorage.getItem(NUTRITION_KEY);
  let caloriesTarget = 2000;
  let caloriesConsumed = 1420; // Demo value
  let bmrValue = 0;
  let tdeeValue = 0;
  
  let proteinTarget = 120;
  let proteinConsumed = 86; // Demo value

  if (savedNut) {
    try {
      let nutData = JSON.parse(savedNut);
      if (nutData.tdee) caloriesTarget = nutData.tdee;
      if (nutData.protein) proteinTarget = nutData.protein;
      if (nutData.bmr) bmrValue = nutData.bmr;
      if (nutData.tdee) tdeeValue = nutData.tdee;
      // We don't have a meal logger yet, so we keep demo consumed values relative to target
      caloriesConsumed = Math.round(caloriesTarget * 0.71); 
      proteinConsumed = Math.round(proteinTarget * 0.71);
    } catch (e) {}
  }

  // Update Summary Card (top row)
  document.getElementById('sumCalVal').textContent = caloriesConsumed;
  document.getElementById('sumCalTarget').textContent = caloriesTarget;
  let calRatio = caloriesTarget > 0 ? caloriesConsumed / caloriesTarget : 0;
  let calPercent = Math.min(Math.round(calRatio * 100), 100);
  document.getElementById('sumCalPercent').textContent = calPercent + '%';
  document.getElementById('sumCalRing').setAttribute('stroke-dasharray', `${(calPercent/100) * 251.2}, 251.2`);
  if (caloriesConsumed > caloriesTarget) {
    document.getElementById('sumCalStatus').textContent = td('statusOver');
    document.getElementById('sumCalStatus').classList.add('over-target');
  } else {
    document.getElementById('sumCalStatus').textContent = '';
    document.getElementById('sumCalStatus').classList.remove('over-target');
  }

  document.getElementById('sumProteinVal').textContent = proteinConsumed;
  document.getElementById('sumProteinTarget').textContent = proteinTarget;
  let proRatio = proteinTarget > 0 ? proteinConsumed / proteinTarget : 0;
  let proPercent = Math.min(Math.round(proRatio * 100), 100);
  document.getElementById('sumProteinPercent').textContent = proPercent + '%';
  document.getElementById('sumProteinRing').setAttribute('stroke-dasharray', `${(proPercent/100) * 251.2}, 251.2`);
  if (proteinConsumed > proteinTarget) {
    document.getElementById('sumProteinStatus').textContent = td('statusOver');
    document.getElementById('sumProteinStatus').classList.add('over-target');
  } else {
    document.getElementById('sumProteinStatus').textContent = '';
    document.getElementById('sumProteinStatus').classList.remove('over-target');
  }

  // Update Donut Chart (new Energy Balance section)
  renderCalorieDonut(caloriesConsumed, caloriesTarget, bmrValue, tdeeValue);

  // Update protein progress bar in panel
  document.getElementById('panelProteinProg').style.width = Math.min((proteinConsumed/proteinTarget)*100, 100) + '%';
}

/**
 * Renders the SVG donut chart and energy detail rows.
 * Handles: normal progress, 100%, exceeded target, and no-data states.
 *
 * @param {number} consumed - Calories consumed today
 * @param {number} target   - Daily calorie target (TDEE)
 * @param {number} bmr      - Basal Metabolic Rate
 * @param {number} tdee     - Total Daily Energy Expenditure
 */
function renderCalorieDonut(consumed, target, bmr, tdee) {
  const CIRCUMFERENCE = 2 * Math.PI * 80; // ≈ 502.65
  const donutProgress = document.getElementById('donutProgress');
  const donutValue    = document.getElementById('donutValue');
  const donutPercent  = document.getElementById('donutPercent');

  // Determine translation strings
  const lang = (typeof currentLanguage !== 'undefined') ? currentLanguage : 'vi';
  const t = translations[lang].dashboard;

  // Safety: avoid division by zero
  if (!target || target <= 0) {
    // No data state
    donutProgress.classList.add('no-data');
    donutProgress.classList.remove('exceeded');
    donutProgress.setAttribute('stroke-dasharray', '0 ' + CIRCUMFERENCE);
    donutValue.textContent = '--';
    donutPercent.textContent = t.noData;
    donutPercent.classList.add('no-data');
    donutPercent.classList.remove('exceeded');

    document.getElementById('energyConsumedVal').textContent = '-- kcal';
    document.getElementById('energyRemainingVal').textContent = '-- kcal';
    document.getElementById('energyTargetVal').textContent = '-- kcal';
    document.getElementById('energyBmrVal').textContent = '-- kcal';
    document.getElementById('energyTdeeVal').textContent = '-- kcal';
    return;
  }

  const remaining = Math.max(target - consumed, 0);
  const percent   = (consumed / target) * 100;
  const isExceeded = consumed > target;

  // Calculate donut fill (clamp to 100% for visual)
  const visualProgress = Math.min(percent / 100, 1);
  const dashFill = visualProgress * CIRCUMFERENCE;

  // Animate donut after a brief delay for entrance effect
  requestAnimationFrame(function() {
    donutProgress.setAttribute('stroke-dasharray', dashFill + ' ' + CIRCUMFERENCE);
  });

  // Apply exceeded / normal state classes
  donutProgress.classList.toggle('exceeded', isExceeded);
  donutProgress.classList.remove('no-data');
  donutPercent.classList.toggle('exceeded', isExceeded);
  donutPercent.classList.remove('no-data');

  // Center text
  donutValue.textContent = consumed.toLocaleString();

  if (isExceeded) {
    donutPercent.textContent = t.exceededTarget;
  } else {
    donutPercent.textContent = percent.toFixed(1) + '% ' + t.targetPercent;
  }

  // Energy detail values
  document.getElementById('energyConsumedVal').textContent = consumed.toLocaleString() + ' kcal';
  document.getElementById('energyRemainingVal').textContent = (isExceeded ? '+' + (consumed - target).toLocaleString() : remaining.toLocaleString()) + ' kcal';
  document.getElementById('energyTargetVal').textContent = target.toLocaleString() + ' kcal';

  // Secondary info (BMR / TDEE)
  document.getElementById('energyBmrVal').textContent = bmr ? (bmr.toLocaleString() + ' kcal') : '-- kcal';
  document.getElementById('energyTdeeVal').textContent = tdee ? (tdee.toLocaleString() + ' kcal') : '-- kcal';
}


/**
 * Loads and displays Weight Data, History and Chart.
 */
function loadWeightData() {
  const history = getWeightHistory();

  // Read weight goal from localStorage (nutricare-goals)
  let goalWeight = null;
  try {
    const goalsData = localStorage.getItem(GOALS_KEY);
    if (goalsData) {
      const parsed = JSON.parse(goalsData);
      if (parsed.targetWeight !== undefined && !isNaN(parseFloat(parsed.targetWeight))) {
        goalWeight = parseFloat(parsed.targetWeight);
      }
    }
  } catch (e) {}

  if (history.length > 0) {
    const latest = history[history.length - 1].weight;
    const first = history[0].weight;
    
    document.getElementById('weightCurrentVal').textContent = latest.toFixed(1) + ' kg';
    document.getElementById('weightStartVal').textContent = first.toFixed(1) + ' kg';
  } else {
    document.getElementById('weightCurrentVal').textContent = '-- kg';
    document.getElementById('weightStartVal').textContent = '-- kg';
  }

  // Display weight goal from user data, or '-- kg' if not set
  document.getElementById('weightGoalVal').textContent = goalWeight !== null
    ? goalWeight.toFixed(1) + ' kg'
    : '-- kg';
  
  renderWeightHistory(history);
  renderWeightChart(history);
}

/**
 * Gets weight history from localStorage.
 */
function getWeightHistory() {
  const data = localStorage.getItem(WEIGHT_HISTORY_KEY);
  if (data) {
    try {
      return JSON.parse(data);
    } catch(e) {
      return [];
    }
  }
  return [];
}

/**
 * Adds a new weight record.
 */
function addWeight() {
  const input = document.getElementById('weightInput');
  const val = parseFloat(input.value);
  
  if (isNaN(val) || val <= 0 || val > 300) {
    alert(currentLanguage === 'vi' ? 'Vui lòng nhập cân nặng hợp lệ.' : 'Please enter a valid weight.');
    return;
  }
  
  const history = getWeightHistory();
  const today = new Date();
  const dateStr = today.getDate() + '/' + (today.getMonth() + 1);
  
  history.push({ date: dateStr, weight: val });
  localStorage.setItem(WEIGHT_HISTORY_KEY, JSON.stringify(history));
  
  input.value = '';
  loadWeightData();
  loadGoalRecommendations();
}

/**
 * Deletes a weight record by index.
 */
function deleteWeight(index) {
  const history = getWeightHistory();
  if (index >= 0 && index < history.length) {
    history.splice(index, 1);
    localStorage.setItem(WEIGHT_HISTORY_KEY, JSON.stringify(history));
    loadWeightData();
    loadGoalRecommendations();
  }
}

/**
 * Clears entire weight history.
 */
function clearWeightHistory() {
  if (confirm(currentLanguage === 'vi' ? 'Bạn có chắc chắn muốn xóa toàn bộ lịch sử?' : 'Are you sure you want to clear all history?')) {
    localStorage.removeItem(WEIGHT_HISTORY_KEY);
    loadWeightData();
    loadGoalRecommendations();
  }
}

/**
 * Renders the weight history list in the UI.
 */
function renderWeightHistory(history) {
  const list = document.getElementById('weightHistoryList');
  list.innerHTML = '';
  
  if (history.length === 0) {
    const li = document.createElement('div');
    li.className = 'weight-history-item';
    li.textContent = currentLanguage === 'vi' ? 'Chưa có dữ liệu.' : 'No data yet.';
    list.appendChild(li);
    return;
  }
  
  // Render in reverse chronological order
  for (let i = history.length - 1; i >= 0; i--) {
    const item = history[i];
    const div = document.createElement('div');
    div.className = 'weight-history-item';
    
    const infoSpan = document.createElement('span');
    infoSpan.textContent = item.date + ' — ' + item.weight.toFixed(1) + ' kg';
    
    const delBtn = document.createElement('button');
    delBtn.className = 'weight-del-btn';
    delBtn.innerHTML = '🗑️';
    delBtn.onclick = function() { deleteWeight(i); };
    
    div.appendChild(infoSpan);
    div.appendChild(delBtn);
    list.appendChild(div);
  }
}

/**
 * Renders a simple line chart on a Canvas element.
 */
function renderWeightChart(history) {
  const canvas = document.getElementById('weightChartCanvas');
  if (!canvas) return;
  canvas.width = canvas.parentElement.clientWidth || 500;
  canvas.height = canvas.parentElement.clientHeight || 200;
  const ctx = canvas.getContext('2d');
  
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  if (history.length < 2) {
    ctx.fillStyle = '#64748b';
    ctx.font = '14px Inter, sans-serif';
    ctx.textAlign = 'center';
    const text = currentLanguage === 'vi' ? translations.vi.dashboard.weightChartEmpty : translations.en.dashboard.weightChartEmpty;
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    return;
  }
  
  // Find min and max weight for scaling
  let minW = history[0].weight;
  let maxW = history[0].weight;
  for (let item of history) {
    if (item.weight < minW) minW = item.weight;
    if (item.weight > maxW) maxW = item.weight;
  }
  
  // Add some padding to min and max
  minW = minW - 2;
  maxW = maxW + 2;
  const range = maxW - minW;
  
  const w = canvas.width;
  const h = canvas.height;
  const padding = 30;
  
  const stepX = (w - padding * 2) / (history.length - 1);
  
  // Draw axes
  ctx.beginPath();
  ctx.strokeStyle = '#e2e8f0';
  ctx.moveTo(padding, 0);
  ctx.lineTo(padding, h - padding);
  ctx.lineTo(w, h - padding);
  ctx.stroke();
  
  // Draw line
  ctx.beginPath();
  ctx.strokeStyle = '#22c55e';
  ctx.lineWidth = 3;
  
  history.forEach((item, i) => {
    const x = padding + i * stepX;
    // Calculate y position based on value and range
    const normalizedY = (item.weight - minW) / range;
    const y = (h - padding) - (normalizedY * (h - padding * 2));
    
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
    
    // Draw dot
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(x - 3, y - 3, 6, 6);
  });
  ctx.stroke();
}

/**
 * Loads exercise summary logic (mock logic for dashboard demo)
 */
function loadExerciseSummary() {
  const valEl = document.getElementById('sumExerciseVal');
  if (valEl) valEl.textContent = '320';
  
  const progEl = document.getElementById('sumExerciseProg');
  if (progEl) progEl.style.width = '65%';
}

/**
 * Loads goals logic
 */
function loadGoals() {
  // Mock logic to show goals connected to Calculator
  const goalText = document.getElementById('panelGoalType');
  if(goalText) {
      goalText.textContent = currentLanguage === 'vi' ? 'Giảm Cân' : 'Lose Weight';
  }
}

/* ============================================================
   PERSONALIZED GOAL RECOMMENDATIONS
   ============================================================
   Reads current weight from weight history and weight goal from
   nutricare-goals. Calculates direction (lose/gain/maintain)
   and renders exercise + meal recommendations from existing
   data modules (exercisesData, recipesData, foodsData).
============================================================ */

/**
 * Dashboard translation helper.
 */
function td(key) {
  if (typeof translations === 'undefined' || typeof currentLanguage === 'undefined') return key;
  const ld = translations[currentLanguage];
  if (!ld || !ld.dashboard) return key;
  return ld.dashboard[key] !== undefined ? ld.dashboard[key] : key;
}

/**
 * Calculates total calories for a recipe from its ingredients.
 */
function calcRecipeCalories(recipe) {
  if (typeof foodsData === 'undefined' || !recipe || !recipe.ingredients) return 0;
  let total = 0;
  recipe.ingredients.forEach(function(ing) {
    const food = foodsData.find(function(f) { return f.id === ing.foodId; });
    if (food) {
      // foodsData calories are per 100g
      total += (food.calories * ing.quantity) / 100;
    }
  });
  return Math.round(total);
}

/**
 * Saves weight goal to localStorage.
 */
function saveWeightGoal(goalVal) {
  if (isNaN(goalVal) || goalVal <= 0 || goalVal > 300) return;
  let goalsData = {};
  try {
    const existing = localStorage.getItem(GOALS_KEY);
    if (existing) goalsData = JSON.parse(existing);
  } catch(e) {}
  
  goalsData.targetWeight = goalVal;
  
  // Cleanup legacy number in weightGoal if exists
  if (typeof goalsData.weightGoal === 'number') {
    delete goalsData.weightGoal;
  }
  
  localStorage.setItem(GOALS_KEY, JSON.stringify(goalsData));
}

/**
 * Main function: loads and renders goal section + recommendations.
 */
function loadGoalRecommendations() {
  const noWeightState = document.getElementById('goalNoWeightState');
  const noTargetState = document.getElementById('goalNoTargetState');
  const summaryBlock  = document.getElementById('goalSummaryBlock');
  const recExPanel    = document.getElementById('recExercisePanel');
  const recMealPanel  = document.getElementById('recMealPanel');

  if (!noWeightState || !noTargetState || !summaryBlock) return;

  // Hide all states first
  noWeightState.style.display = 'none';
  noTargetState.style.display = 'none';
  summaryBlock.style.display  = 'none';
  if (recExPanel) recExPanel.style.display = 'none';
  if (recMealPanel) recMealPanel.style.display = 'none';

  // 1. Get current weight from weight history
  const history = getWeightHistory();
  const currentWeight = history.length > 0 ? history[history.length - 1].weight : null;

  // 2. Get weight goal from localStorage
  let weightGoal = null; // target kg
  let explicitGoalType = null;
  
  try {
    const goalsData = localStorage.getItem(GOALS_KEY);
    if (goalsData) {
      const parsed = JSON.parse(goalsData);
      
      if (parsed.weightGoal !== undefined && typeof parsed.weightGoal === 'string') {
        const s = parsed.weightGoal.toLowerCase();
        if (['lose', 'gain', 'maintain'].includes(s)) {
          explicitGoalType = s;
        }
      }
      
      if (parsed.targetWeight !== undefined && !isNaN(parseFloat(parsed.targetWeight))) {
        weightGoal = parseFloat(parsed.targetWeight);
      }
    }
  } catch(e) {}

  // 3. Handle empty states
  if (currentWeight === null) {
    noWeightState.style.display = 'block';
    return;
  }

  if (weightGoal === null && explicitGoalType === null) {
    noTargetState.style.display = 'block';
    return;
  }

  // 4. Calculate goal direction
  let goalType = explicitGoalType;
  let difference = 0;

  if (weightGoal !== null && currentWeight !== null) {
    if (currentWeight > weightGoal + 0.05) {
      if (!goalType) goalType = 'lose';
      difference = currentWeight - weightGoal;
    } else if (currentWeight < weightGoal - 0.05) {
      if (!goalType) goalType = 'gain';
      difference = weightGoal - currentWeight;
    } else {
      if (!goalType) goalType = 'maintain';
      difference = 0;
    }
  } else if (!goalType) {
    goalType = 'maintain';
  }

  // 5. Render goal summary
  summaryBlock.style.display = 'block';
  
  const mainTitleEl = document.getElementById('goalMainTitle');
  const targetDisplayEl = document.getElementById('goalTargetDisplay');
  
  if (goalType === 'lose') {
    mainTitleEl.textContent = td('goalTitleLose');
  } else if (goalType === 'gain') {
    mainTitleEl.textContent = td('goalTitleGain');
  } else {
    mainTitleEl.textContent = td('goalTitleMaintain');
  }
  
  if (weightGoal !== null) {
    targetDisplayEl.style.display = 'block';
    targetDisplayEl.textContent = td('goalTargetText').replace('{target}', weightGoal.toFixed(1));
  } else {
    targetDisplayEl.style.display = 'none';
  }

  // Pre-fill edit input with current goal
  const editInput = document.getElementById('weightGoalEditInput');
  if (editInput) editInput.value = weightGoal !== null ? weightGoal : '';

  // 6. Render exercise recommendations
  renderExerciseRecommendations(goalType);

  // 7. Render meal recommendations
  renderMealRecommendations(goalType);

  // Re-apply translations for dynamically created elements
  if (typeof applyTranslations === 'function' && typeof currentLanguage !== 'undefined') {
    applyTranslations(currentLanguage);
  }
}

/**
 * Renders exercise recommendation cards based on goal type.
 * Maps: lose → 'lose-weight', gain → 'build-muscle', maintain → 'stay-active'
 */
function renderExerciseRecommendations(goalType) {
  const panel = document.getElementById('recExercisePanel');
  const grid  = document.getElementById('recExerciseGrid');
  if (!panel || !grid || typeof exercisesData === 'undefined') return;

  // Map dashboard goal to exercisesData goal tags
  const goalMap = {
    'lose':     'lose-weight',
    'gain':     'build-muscle',
    'maintain': 'stay-active'
  };
  const targetGoal = goalMap[goalType] || 'stay-active';

  // Filter exercises by goal, take up to 3
  const matched = exercisesData.filter(function(ex) {
    return ex.goal.includes(targetGoal);
  }).slice(0, 3);

  if (matched.length === 0) return;

  panel.style.display = 'block';
  grid.innerHTML = '';

  const lang = (typeof currentLanguage !== 'undefined') ? currentLanguage : 'vi';
  const t = translations[lang];

  matched.forEach(function(ex) {
    const name = (t && t.exercises && t.exercises['ex' + ex.id + 'Name'])
      ? t.exercises['ex' + ex.id + 'Name']
      : 'Exercise #' + ex.id;

    const calPerMin = Math.round(ex.met * 3.5 * 60 / 200);
    const metaText = ex.category + ' · ~' + calPerMin + ' kcal/min';

    const card = document.createElement('div');
    card.className = 'rec-card';
    card.innerHTML =
      '<div class="rec-card-emoji">' + ex.emoji + '</div>' +
      '<div class="rec-card-info">' +
        '<p class="rec-card-name">' + name + '</p>' +
        '<p class="rec-card-meta">' + metaText + '</p>' +
      '</div>' +
      '<div class="rec-card-actions">' +
        '<a href="exercises.html" class="btn btn-secondary btn-sm">' + td('recViewExercise') + '</a>' +
      '</div>';

    grid.appendChild(card);
  });
}

/**
 * Renders meal/recipe recommendation cards based on goal type.
 * Sorts recipes by calorie suitability for the goal.
 */
function renderMealRecommendations(goalType) {
  const panel = document.getElementById('recMealPanel');
  const grid  = document.getElementById('recMealGrid');
  if (!panel || !grid || typeof recipesData === 'undefined' || typeof foodsData === 'undefined') return;

  // Calculate calories for all recipes
  const recipesWithCal = recipesData.map(function(r) {
    return { recipe: r, calories: calcRecipeCalories(r) };
  });

  // Sort based on goal
  if (goalType === 'lose') {
    // Low calorie first
    recipesWithCal.sort(function(a, b) { return a.calories - b.calories; });
  } else if (goalType === 'gain') {
    // High calorie first
    recipesWithCal.sort(function(a, b) { return b.calories - a.calories; });
  } else {
    // Maintain: mid-range calories (closest to median)
    const allCals = recipesWithCal.map(function(r) { return r.calories; });
    const median = allCals.sort(function(a, b) { return a - b; })[Math.floor(allCals.length / 2)];
    recipesWithCal.sort(function(a, b) {
      return Math.abs(a.calories - median) - Math.abs(b.calories - median);
    });
  }

  const top = recipesWithCal.slice(0, 3);
  if (top.length === 0) return;

  panel.style.display = 'block';
  grid.innerHTML = '';

  const isEN = (typeof currentLanguage !== 'undefined' && currentLanguage === 'en');

  top.forEach(function(item) {
    const r = item.recipe;
    const name = isEN ? r.nameEN : r.nameVI;
    const calText = item.calories + ' ' + td('recCalPerServing');

    const card = document.createElement('div');
    card.className = 'rec-card';

    let actionsHTML =
      '<a href="meals.html" class="btn btn-secondary btn-sm">' + td('recViewMeals') + '</a>';

    // Cook Mode button – links to meals.html where Cook Mode lives
    actionsHTML +=
      '<a href="meals.html#cook-' + r.id + '" class="btn btn-primary btn-sm">' + td('recCookThis') + '</a>';

    card.innerHTML =
      '<div class="rec-card-emoji">🍽️</div>' +
      '<div class="rec-card-info">' +
        '<p class="rec-card-name">' + name + '</p>' +
        '<p class="rec-card-meta">' + calText + '</p>' +
      '</div>' +
      '<div class="rec-card-actions">' + actionsHTML + '</div>';

    grid.appendChild(card);
  });
}

/* ============================================================
   GOAL EVENT LISTENERS
============================================================ */
document.addEventListener('DOMContentLoaded', function() {
  // "Log Weight" button in empty state → scroll to weight input
  const btnLogWeight = document.getElementById('btnGoalLogWeight');
  if (btnLogWeight) {
    btnLogWeight.addEventListener('click', function() {
      const weightInput = document.getElementById('weightInput');
      if (weightInput) {
        weightInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        weightInput.focus();
      }
    });
  }

  // "Save Goal" button in empty state
  const btnSaveGoal = document.getElementById('btnSaveWeightGoal');
  if (btnSaveGoal) {
    btnSaveGoal.addEventListener('click', function() {
      const input = document.getElementById('weightGoalInput');
      if (!input) return;
      const val = parseFloat(input.value);
      if (isNaN(val) || val <= 0 || val > 300) {
        alert(currentLanguage === 'vi' ? 'Vui lòng nhập mục tiêu hợp lệ.' : 'Please enter a valid goal.');
        return;
      }
      saveWeightGoal(val);
      input.value = '';
      loadWeightData();         // refresh weight display
      loadGoalRecommendations(); // refresh recommendations
    });
  }

  // "Update Goal" button in summary state
  const btnUpdateGoal = document.getElementById('btnUpdateWeightGoal');
  if (btnUpdateGoal) {
    btnUpdateGoal.addEventListener('click', function() {
      const input = document.getElementById('weightGoalEditInput');
      if (!input) return;
      const val = parseFloat(input.value);
      if (isNaN(val) || val <= 0 || val > 300) {
        alert(currentLanguage === 'vi' ? 'Vui lòng nhập mục tiêu hợp lệ.' : 'Please enter a valid goal.');
        return;
      }
      saveWeightGoal(val);
      loadWeightData();
      loadGoalRecommendations();
    });
  }

  // Apply placeholder translations for data-i18n-placeholder
  applyGoalPlaceholders();
});

/**
 * Applies placeholder translations for goal inputs.
 */
function applyGoalPlaceholders() {
  document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el) {
    const key = el.getAttribute('data-i18n-placeholder');
    const parts = key.split('.');
    if (parts.length === 2 && typeof translations !== 'undefined' && typeof currentLanguage !== 'undefined') {
      const section = translations[currentLanguage];
      if (section && section[parts[0]] && section[parts[0]][parts[1]]) {
        el.placeholder = section[parts[0]][parts[1]];
      }
    }
  });
}


/**
 * Retrieves 7-day trend data for a specific metric.
 */
function getTrendData(metric) {
  const data = [];
  const today = new Date();
  
  if (metric === 'weight') {
    const history = getWeightHistory();
    if (history.length > 0) {
      return history.slice(-7).map(item => ({ label: item.date.substring(5, 10), value: item.weight }));
    }
    return [];
  }
  
  if (metric === 'water') {
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
      const key = WATER_KEY_PREFIX + dateStr;
      const val = parseInt(localStorage.getItem(key));
      if (!isNaN(val) && val > 0) {
        data.push({ label: dateStr.substring(5, 10), value: val / 1000 });
      }
    }
    return data;
  }
  
  return [];
}

/**
 * Draws the trend line chart on the canvas.
 */
function drawTrendChart(metric) {
  const canvas = document.getElementById('trendChartCanvas');
  const emptyState = document.getElementById('trendEmptyState');
  if (!canvas || !emptyState) return;
  
  canvas.width = canvas.parentElement.clientWidth || 800;
  canvas.height = canvas.parentElement.clientHeight || 250;
  
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;
  
  ctx.clearRect(0, 0, w, h);
  
  const data = getTrendData(metric);
  
  if (data.length < 2) {
    emptyState.style.display = 'flex';
    return;
  } else {
    emptyState.style.display = 'none';
  }
  
  const padding = 40;
  let minV = data[0].value;
  let maxV = data[0].value;
  for (let item of data) {
    if (item.value < minV) minV = item.value;
    if (item.value > maxV) maxV = item.value;
  }
  
  let diff = maxV - minV;
  if (diff === 0) diff = maxV * 0.2;
  if (diff === 0) diff = 1;
  minV = Math.max(0, minV - diff * 0.2);
  maxV = maxV + diff * 0.2;
  const range = maxV - minV;
  
  const stepX = (w - padding * 2) / (data.length - 1);
  
  ctx.beginPath();
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 1;
  ctx.moveTo(padding, padding / 2);
  ctx.lineTo(padding, h - padding);
  ctx.lineTo(w - padding / 2, h - padding);
  ctx.stroke();
  
  ctx.beginPath();
  ctx.strokeStyle = '#3b82f6';
  if (metric === 'calories') ctx.strokeStyle = '#f59e0b';
  if (metric === 'protein') ctx.strokeStyle = '#ef4444';
  if (metric === 'exercise') ctx.strokeStyle = '#10b981';
  ctx.lineWidth = 3;
  
  data.forEach((item, i) => {
    const x = padding + i * stepX;
    const normalizedY = (item.value - minV) / range;
    const y = (h - padding) - (normalizedY * (h - padding * 1.5));
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();
  
  ctx.fillStyle = ctx.strokeStyle;
  ctx.font = '12px Inter, sans-serif';
  ctx.textAlign = 'center';
  
  data.forEach((item, i) => {
    const x = padding + i * stepX;
    const normalizedY = (item.value - minV) / range;
    const y = (h - padding) - (normalizedY * (h - padding * 1.5));
    
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, 2 * Math.PI);
    ctx.fill();
    
    ctx.fillText(item.value.toFixed(1), x, y - 10);
    ctx.fillStyle = '#64748b';
    ctx.fillText(item.label, x, h - padding + 20);
    ctx.fillStyle = ctx.strokeStyle;
  });
}

