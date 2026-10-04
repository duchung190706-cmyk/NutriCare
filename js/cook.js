/**
 * NutriCare - js/cook.js
 * ============================================================
 * Cook Mode – Self-contained module that adds a recipe modal
 * to the Smart Meal Planner (meals.html).
 *
 * External dependencies (must be loaded before this file):
 *  - data/translations.js  (translations object)
 *  - data/foods.js         (foodsData array)
 *  - data/recipes.js       (recipesData array)
 *  - js/main.js            (currentLanguage, applyTranslations)
 *
 * Does NOT modify nutricare-daily-meals in localStorage.
 * Does NOT break any existing meals.js functionality.
 * ============================================================
 */

'use strict';

/* ============================================================
   GUARD: make sure recipe data is present
============================================================ */
if (typeof recipesData === 'undefined') {
  console.error('NutriCare Cook: recipesData missing. Ensure data/recipes.js is loaded.');
}

/* ============================================================
   STATE
============================================================ */
let cookActiveRecipe = null;  // the current recipe object
let cookServings     = 1;     // current serving multiplier
let cookCurrentStep  = 0;     // 0-indexed step pointer
let cookStepMode     = 'all'; // 'all' | 'step'
let timerInterval    = null;
let timerSecondsLeft = 0;
let timerRunning     = false;

/* ============================================================
   TRANSLATION HELPER
============================================================ */
function tc(key) {
  if (typeof translations === 'undefined' || typeof currentLanguage === 'undefined') return key;
  const ld = translations[currentLanguage];
  if (!ld) return key;
  if (ld.cook  && ld.cook[key]  !== undefined) return ld.cook[key];
  if (ld.foods && ld.foods[key] !== undefined) return ld.foods[key];
  if (ld.calculator && ld.calculator[key] !== undefined) return ld.calculator[key];
  return key;
}

function getFoodNameCook(foodId) {
  if (typeof foodsData === 'undefined') return '—';
  const f = foodsData.find(x => x.id === foodId);
  if (!f) return '—';
  const isEn = (typeof currentLanguage !== 'undefined' && currentLanguage === 'en');
  return isEn ? f.nameEN : f.nameVI;
}

/* ============================================================
   RECIPE LOOKUP
   - Find a recipe that matches a given foodId (ingredient) OR
     a recipe whose nameVI/nameEN contains the food name.
   - Matching priority: exact foodId match in ingredients first,
     then fall back to name-based match.
============================================================ */
function findRecipeForFood(foodId, foodNameVI, foodNameEN) {
  if (typeof recipesData === 'undefined') return null;

  // 1. Direct ingredient match
  let match = recipesData.find(r =>
    r.ingredients.some(ing => ing.foodId === foodId)
  );
  if (match) return match;

  // 2. Name match (case-insensitive substring)
  const nameVI = (foodNameVI || '').toLowerCase();
  const nameEN = (foodNameEN || '').toLowerCase();
  
  if (!nameVI && !nameEN) return null;
  match = recipesData.find(r =>
    r.nameVI.toLowerCase().includes(nameVI.substring(0, 5)) ||
    r.nameEN.toLowerCase().includes(nameEN.substring(0, 5))
  );
  return match || null;
}

/* ============================================================
   BUILD & INJECT THE COOK MODAL INTO THE DOM
   (called once on DOMContentLoaded)
============================================================ */
function buildCookModal() {
  const overlay = document.createElement('div');
  overlay.className = 'cook-overlay';
  overlay.id = 'cookOverlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-labelledby', 'cookRecipeName');

  overlay.innerHTML = `
    <div class="cook-modal" id="cookModal">
      <button class="cook-modal-close" id="btnCookClose" aria-label="Close">&times;</button>

      <!-- NO RECIPE STATE -->
      <div class="cook-no-recipe" id="cookNoRecipe" style="display:none;">
        <div class="cook-no-recipe-icon">🍳</div>
        <p class="cook-no-recipe-text" id="cookNoRecipeText"></p>
      </div>

      <!-- RECIPE CONTENT -->
      <div id="cookContent" style="display:none;">

        <!-- HEADER -->
        <div class="cook-header">
          <h2 class="cook-recipe-name" id="cookRecipeName"></h2>
          <p class="cook-recipe-desc" id="cookRecipeDesc"></p>
          <div class="cook-meta" id="cookMeta"></div>
        </div>

        <!-- BODY -->
        <div class="cook-body">
          <!-- TABS -->
          <div class="cook-tabs">
            <button class="cook-tab active" data-panel="ingredients" id="tabIngredients"></button>
            <button class="cook-tab" data-panel="steps" id="tabSteps"></button>
            <button class="cook-tab" data-panel="timer" id="tabTimer"></button>
          </div>

          <!-- INGREDIENTS PANEL -->
          <div class="cook-tab-panel active" id="panelIngredients">
            <div class="cook-serving-row">
              <span class="cook-serving-label" id="cookServingLabel"></span>
              <div class="cook-serving-btns" id="cookServingBtns"></div>
            </div>
            <div class="ingredient-list" id="ingredientList"></div>

            <!-- Nutrition per serving -->
            <div class="cook-nutrition-grid" id="cookNutrGrid"></div>
          </div>

          <!-- STEPS PANEL -->
          <div class="cook-tab-panel" id="panelSteps">
            <div class="steps-view-toggle">
              <button class="steps-view-btn active" id="btnViewAll"></button>
              <button class="steps-view-btn" id="btnViewStep"></button>
            </div>

            <!-- ALL STEPS -->
            <div id="stepsAllView">
              <div class="steps-all-list" id="stepsAllList"></div>
            </div>

            <!-- STEP BY STEP -->
            <div id="stepsOneView" style="display:none;">
              <div class="step-by-step">
                <div class="step-progress" id="stepProgress"></div>
                <div class="step-progress-bar">
                  <div class="step-progress-fill" id="stepProgressFill"></div>
                </div>
                <div class="step-current-num" id="stepCurrentNum"></div>
                <p class="step-current-text" id="stepCurrentText"></p>
                <div class="step-nav">
                  <button class="btn-step-nav" id="btnStepPrev"></button>
                  <button class="btn-step-nav" id="btnStepNext"></button>
                </div>
              </div>
            </div>
          </div>

          <!-- TIMER PANEL -->
          <div class="cook-tab-panel" id="panelTimer">
            <div class="cook-timer">
              <div class="timer-display" id="timerDisplay">00:00</div>
              <div class="timer-set-row">
                <label for="timerInput" id="timerLabel"></label>
                <input type="number" id="timerInput" min="1" max="180" value="15" />
              </div>
              <div class="timer-controls">
                <button class="btn-timer btn-timer-start" id="btnTimerStart"></button>
                <button class="btn-timer btn-timer-pause" id="btnTimerPause" style="display:none;"></button>
                <button class="btn-timer btn-timer-reset" id="btnTimerReset"></button>
              </div>
              <div class="timer-done-msg" id="timerDoneMsg"></div>
            </div>
          </div>

        </div><!-- /.cook-body -->

        <!-- DONE STATE (replaces content) -->
        <div class="cook-done-state" id="cookDoneState">
          <div class="cook-done-icon">🎉</div>
          <h3 class="cook-done-title" id="cookDoneTitle"></h3>
          <p class="cook-done-text" id="cookDoneText"></p>
          <button class="btn-cook-again" id="btnCookAgain"></button>
        </div>

        <!-- FOOTER -->
        <div class="cook-footer" id="cookFooter">
          <button class="btn-done-cooking" id="btnDoneCooking"></button>
        </div>

      </div><!-- /#cookContent -->
    </div><!-- /.cook-modal -->
  `;

  document.body.appendChild(overlay);

  // Close events
  document.getElementById('btnCookClose').addEventListener('click', closeCookModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeCookModal(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) closeCookModal();
  });

  // Tab switching
  overlay.querySelectorAll('.cook-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      overlay.querySelectorAll('.cook-tab').forEach(t => t.classList.remove('active'));
      overlay.querySelectorAll('.cook-tab-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById('panel' + capitalise(tab.dataset.panel)).classList.add('active');
    });
  });

  // Step-by-step view toggle
  document.getElementById('btnViewAll').addEventListener('click', () => switchStepView('all'));
  document.getElementById('btnViewStep').addEventListener('click', () => switchStepView('step'));

  // Step navigation
  document.getElementById('btnStepPrev').addEventListener('click', () => {
    if (cookCurrentStep > 0) { cookCurrentStep--; renderCurrentStep(); }
  });
  document.getElementById('btnStepNext').addEventListener('click', () => {
    const steps = getSteps();
    if (cookCurrentStep < steps.length - 1) { cookCurrentStep++; renderCurrentStep(); }
  });

  // Timer
  document.getElementById('btnTimerStart').addEventListener('click', startTimer);
  document.getElementById('btnTimerPause').addEventListener('click', pauseTimer);
  document.getElementById('btnTimerReset').addEventListener('click', resetTimer);

  // Done cooking
  document.getElementById('btnDoneCooking').addEventListener('click', showDoneState);
  document.getElementById('btnCookAgain').addEventListener('click', hideDoneState);
}

function capitalise(str) { return str.charAt(0).toUpperCase() + str.slice(1); }

/* ============================================================
   OPEN COOK MODAL
============================================================ */
window.openCookModal = function(foodId, foodNameVI, foodNameEN, exactRecipeId) {
  const overlay = document.getElementById('cookOverlay');
  if (!overlay) return;

  // Reset state
  cookServings     = 1;
  cookCurrentStep  = 0;
  cookStepMode     = 'all';
  stopTimer();

  let recipe = null;
  if (exactRecipeId && typeof recipesData !== 'undefined') {
    recipe = recipesData.find(r => r.id === exactRecipeId);
  }
  if (!recipe) {
    recipe = findRecipeForFood(foodId, foodNameVI, foodNameEN);
  }

  // Apply translations to static elements each time (language may have changed)
  applyTabLabels();

  if (!recipe) {
    // No recipe state
    document.getElementById('cookNoRecipe').style.display = 'block';
    document.getElementById('cookContent').style.display  = 'none';
    document.getElementById('cookNoRecipeText').textContent = tc('noRecipe');
  } else {
    cookActiveRecipe = recipe;
    document.getElementById('cookNoRecipe').style.display = 'none';
    document.getElementById('cookContent').style.display  = 'block';

    // Reset to ingredients tab
    overlay.querySelectorAll('.cook-tab').forEach(t => t.classList.remove('active'));
    overlay.querySelectorAll('.cook-tab-panel').forEach(p => p.classList.remove('active'));
    overlay.querySelector('[data-panel="ingredients"]').classList.add('active');
    document.getElementById('panelIngredients').classList.add('active');

    // Hide done state
    hideDoneState(true);

    renderRecipeHeader(recipe);
    renderIngredients();
    renderAllSteps();
    renderCurrentStep();
    renderNutrition();
  }

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
};

function closeCookModal() {
  const overlay = document.getElementById('cookOverlay');
  if (overlay) overlay.classList.remove('active');
  document.body.style.overflow = '';
  stopTimer();
}

/* ============================================================
   APPLY UI TEXT (bilingual)
============================================================ */
function applyTabLabels() {
  const overlay = document.getElementById('cookOverlay');
  if (!overlay) return;

  overlay.querySelector('[data-panel="ingredients"]').textContent = tc('ingredients');
  overlay.querySelector('[data-panel="steps"]').textContent      = tc('steps');
  overlay.querySelector('[data-panel="timer"]').textContent      = tc('timer');

  const btnViewAll  = document.getElementById('btnViewAll');
  const btnViewStep = document.getElementById('btnViewStep');
  if (btnViewAll)  btnViewAll.textContent  = tc('viewAll');
  if (btnViewStep) btnViewStep.textContent = tc('viewStep');

  const btnStepPrev = document.getElementById('btnStepPrev');
  const btnStepNext = document.getElementById('btnStepNext');
  if (btnStepPrev) btnStepPrev.textContent = tc('prev');
  if (btnStepNext) btnStepNext.textContent = tc('next');

  const timerLabel = document.getElementById('timerLabel');
  if (timerLabel) timerLabel.textContent = tc('timerMin') + ':';

  const btnTimerStart = document.getElementById('btnTimerStart');
  const btnTimerPause = document.getElementById('btnTimerPause');
  const btnTimerReset = document.getElementById('btnTimerReset');
  if (btnTimerStart) btnTimerStart.textContent = tc('timerStart');
  if (btnTimerPause) btnTimerPause.textContent = timerRunning ? tc('timerPause') : tc('timerResume');
  if (btnTimerReset) btnTimerReset.textContent = tc('timerReset');

  const timerDoneMsg = document.getElementById('timerDoneMsg');
  if (timerDoneMsg) timerDoneMsg.textContent = tc('timerDone');

  const btnDoneCooking = document.getElementById('btnDoneCooking');
  if (btnDoneCooking) btnDoneCooking.textContent = tc('btnDone');

  const cookServingLabel = document.getElementById('cookServingLabel');
  if (cookServingLabel) cookServingLabel.textContent = tc('adjustServing');

  const cookDoneTitle = document.getElementById('cookDoneTitle');
  if (cookDoneTitle) cookDoneTitle.textContent = tc('doneTitle');
  const cookDoneText = document.getElementById('cookDoneText');
  if (cookDoneText) cookDoneText.textContent = tc('doneText');
  const btnCookAgain = document.getElementById('btnCookAgain');
  if (btnCookAgain) btnCookAgain.textContent = tc('doneBtn');
}

/* ============================================================
   RENDER RECIPE HEADER
============================================================ */
function renderRecipeHeader(recipe) {
  const isEn  = (typeof currentLanguage !== 'undefined' && currentLanguage === 'en');
  const name  = isEn ? recipe.nameEN  : recipe.nameVI;
  const desc  = isEn ? recipe.descriptionEN : recipe.descriptionVI;
  const diff  = isEn
    ? (recipe.difficulty === 'easy' ? 'Easy' : recipe.difficulty === 'medium' ? 'Medium' : 'Hard')
    : (recipe.difficulty === 'easy' ? 'Dễ'   : recipe.difficulty === 'medium' ? 'Vừa'   : 'Khó');

  document.getElementById('cookRecipeName').textContent = name;
  document.getElementById('cookRecipeDesc').textContent = desc;

  const totalTime = recipe.prepTime + recipe.cookTime;
  const minLabel  = tc('min');
  const meta      = document.getElementById('cookMeta');
  meta.innerHTML  = `
    <span class="cook-meta-chip">⏱ ${tc('prep')}: <strong>${recipe.prepTime}${minLabel}</strong></span>
    <span class="cook-meta-chip">🔥 ${tc('cook')}: <strong>${recipe.cookTime}${minLabel}</strong></span>
    <span class="cook-meta-chip">⏱ ${tc('total')}: <strong>${totalTime}${minLabel}</strong></span>
    <span class="cook-meta-chip">👥 ${recipe.servings} ${tc('serving')}</span>
    <span class="cook-meta-chip diff-${recipe.difficulty}">⭐ ${tc('difficulty')}: <strong>${diff}</strong></span>
  `;

  // Pre-fill timer to cookTime
  const timerInput = document.getElementById('timerInput');
  if (timerInput && recipe.cookTime > 0) timerInput.value = recipe.cookTime;

  // Render serving buttons
  const btnContainer = document.getElementById('cookServingBtns');
  btnContainer.innerHTML = '';
  [1, 2, 3, 4].forEach(n => {
    const btn = document.createElement('button');
    btn.className = 'cook-serving-btn' + (n === cookServings ? ' active' : '');
    btn.textContent = n;
    btn.setAttribute('aria-label', `${n} ${tc('serving')}`);
    btn.addEventListener('click', () => {
      cookServings = n;
      btnContainer.querySelectorAll('.cook-serving-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderIngredients();
      renderNutrition();
    });
    btnContainer.appendChild(btn);
  });
}

/* ============================================================
   RENDER INGREDIENTS
============================================================ */
function renderIngredients() {
  if (!cookActiveRecipe) return;
  const list = document.getElementById('ingredientList');
  list.innerHTML = '';

  cookActiveRecipe.ingredients.forEach(ing => {
    const scaledQty = (ing.quantity * cookServings).toFixed(0);
    const name = getFoodNameCook(ing.foodId);
    const row  = document.createElement('div');
    row.className = 'ingredient-row';
    row.innerHTML = `
      <span class="ingredient-name">
        ${name}
        ${ing.optional ? `<span class="ingredient-optional">(optional)</span>` : ''}
      </span>
      <span class="ingredient-qty">${scaledQty} ${ing.unit}</span>
    `;
    list.appendChild(row);
  });
}

/* ============================================================
   RENDER NUTRITION (calculated dynamically from foodsData)
============================================================ */
function renderNutrition() {
  if (!cookActiveRecipe || typeof foodsData === 'undefined') return;

  let totCal = 0, totPro = 0, totCarb = 0, totFat = 0;

  cookActiveRecipe.ingredients.forEach(ing => {
    const f = foodsData.find(x => x.id === ing.foodId);
    if (!f) return;
    const ratio = ing.quantity / 100;
    totCal  += f.calories * ratio * cookServings;
    totPro  += f.protein  * ratio * cookServings;
    totCarb += f.carbs    * ratio * cookServings;
    totFat  += f.fat      * ratio * cookServings;
  });

  // Per serving
  totCal  = Math.round(totCal  / cookServings);
  totPro  = (totPro  / cookServings).toFixed(1);
  totCarb = (totCarb / cookServings).toFixed(1);
  totFat  = (totFat  / cookServings).toFixed(1);

  const grid = document.getElementById('cookNutrGrid');
  grid.innerHTML = `
    <div class="cook-nut-item">
      <div class="cook-nut-val">${Math.round(totCal * cookServings)}</div>
      <div class="cook-nut-lbl">kcal</div>
    </div>
    <div class="cook-nut-item">
      <div class="cook-nut-val">${(parseFloat(totPro) * cookServings).toFixed(1)}g</div>
      <div class="cook-nut-lbl">${tc('macroProtein')}</div>
    </div>
    <div class="cook-nut-item">
      <div class="cook-nut-val">${(parseFloat(totCarb) * cookServings).toFixed(1)}g</div>
      <div class="cook-nut-lbl">${tc('macroCarbs')}</div>
    </div>
    <div class="cook-nut-item">
      <div class="cook-nut-val">${(parseFloat(totFat) * cookServings).toFixed(1)}g</div>
      <div class="cook-nut-lbl">${tc('macroFat')}</div>
    </div>
  `;

  // Add "per serving" label above the grid
  const existingLabel = document.getElementById('cookNutrLabel');
  if (!existingLabel) {
    const label = document.createElement('div');
    label.id = 'cookNutrLabel';
    label.style.cssText = 'font-size:0.875rem;font-weight:700;color:var(--color-text);margin-top:1.5rem;margin-bottom:0.5rem;padding-top:1rem;border-top:1px dashed var(--color-border);';
    label.textContent = tc('nutrition');
    grid.parentNode.insertBefore(label, grid);
  } else {
    existingLabel.textContent = tc('nutrition');
  }
}

/* ============================================================
   STEPS
============================================================ */
function getSteps() {
  if (!cookActiveRecipe) return [];
  const isEn = (typeof currentLanguage !== 'undefined' && currentLanguage === 'en');
  return isEn ? cookActiveRecipe.stepsEN : cookActiveRecipe.stepsVI;
}

function renderAllSteps() {
  const steps = getSteps();
  const list  = document.getElementById('stepsAllList');
  list.innerHTML = '';
  steps.forEach((step, i) => {
    const div = document.createElement('div');
    div.className = 'step-all-item';
    div.innerHTML = `
      <div class="step-num">${i + 1}</div>
      <div class="step-text">${step}</div>
    `;
    list.appendChild(div);
  });
}

function renderCurrentStep() {
  const steps = getSteps();
  if (!steps.length) return;

  const total  = steps.length;
  const cur    = cookCurrentStep;
  const pct    = ((cur + 1) / total) * 100;

  const progress = document.getElementById('stepProgress');
  if (progress) progress.textContent = `${tc('stepOf')} ${cur + 1} / ${total}`;

  const fill = document.getElementById('stepProgressFill');
  if (fill) fill.style.width = pct + '%';

  const numEl = document.getElementById('stepCurrentNum');
  if (numEl) numEl.textContent = cur + 1;

  const textEl = document.getElementById('stepCurrentText');
  if (textEl) textEl.textContent = steps[cur];

  const btnPrev = document.getElementById('btnStepPrev');
  const btnNext = document.getElementById('btnStepNext');
  if (btnPrev) btnPrev.disabled = (cur === 0);
  if (btnNext) btnNext.disabled = (cur === total - 1);
}

function switchStepView(mode) {
  cookStepMode = mode;
  document.getElementById('stepsAllView').style.display  = mode === 'all'  ? 'block' : 'none';
  document.getElementById('stepsOneView').style.display  = mode === 'step' ? 'block' : 'none';

  document.getElementById('btnViewAll').classList.toggle('active',  mode === 'all');
  document.getElementById('btnViewStep').classList.toggle('active', mode === 'step');
}

/* ============================================================
   TIMER
============================================================ */
function startTimer() {
  const input = document.getElementById('timerInput');
  if (!timerRunning) {
    if (timerSecondsLeft <= 0) {
      const mins = parseInt(input.value) || 15;
      timerSecondsLeft = mins * 60;
    }
    timerRunning = true;
    timerInterval = setInterval(tickTimer, 1000);
    document.getElementById('btnTimerStart').style.display = 'none';
    document.getElementById('btnTimerPause').style.display = 'inline-flex';
    document.getElementById('btnTimerPause').textContent   = tc('timerPause');
    updateTimerDisplay();
  }
}

function pauseTimer() {
  if (timerRunning) {
    timerRunning = false;
    clearInterval(timerInterval);
    timerInterval = null;
    document.getElementById('btnTimerPause').textContent = tc('timerResume');
  } else {
    startTimer();
  }
}

function resetTimer() {
  stopTimer();
  timerSecondsLeft = 0;
  document.getElementById('timerDisplay').textContent = '00:00';
  document.getElementById('timerDisplay').classList.remove('done');
  document.getElementById('timerDoneMsg').classList.remove('visible');
  document.getElementById('btnTimerStart').style.display = 'inline-flex';
  document.getElementById('btnTimerPause').style.display = 'none';
  document.getElementById('btnTimerStart').textContent   = tc('timerStart');
}

function stopTimer() {
  timerRunning = false;
  if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
}

function tickTimer() {
  if (timerSecondsLeft <= 0) {
    stopTimer();
    document.getElementById('timerDisplay').classList.add('done');
    document.getElementById('timerDoneMsg').classList.add('visible');
    document.getElementById('btnTimerPause').style.display = 'none';
    document.getElementById('btnTimerStart').style.display = 'inline-flex';
    document.getElementById('btnTimerStart').textContent   = tc('timerStart');
    return;
  }
  timerSecondsLeft--;
  updateTimerDisplay();
}

function updateTimerDisplay() {
  const mins = Math.floor(timerSecondsLeft / 60);
  const secs = timerSecondsLeft % 60;
  document.getElementById('timerDisplay').textContent =
    String(mins).padStart(2, '0') + ':' + String(secs).padStart(2, '0');
}

/* ============================================================
   DONE STATE
============================================================ */
function showDoneState() {
  document.getElementById('cookDoneState').classList.add('visible');
  // Hide the rest of the body
  document.querySelector('.cook-body').style.display  = 'none';
  document.getElementById('cookFooter').style.display = 'none';
  stopTimer();
}

function hideDoneState(silent) {
  document.getElementById('cookDoneState').classList.remove('visible');
  document.querySelector('.cook-body').style.display  = 'flex';
  document.getElementById('cookFooter').style.display = 'flex';
  if (!silent) resetTimer();
}

/* ============================================================
   LANGUAGE HOOK — re-render when user switches language
============================================================ */
(function hookCookLanguage() {
  // We hook AFTER meals.js may have already hooked switchLanguage,
  // so we chain it safely.
  const _origSL = typeof switchLanguage === 'function' ? switchLanguage : null;
  if (!_origSL) return;

  const _prevHook = window.switchLanguage;
  window.switchLanguage = function(lang) {
    _prevHook(lang);

    // If cook modal is open, re-render bilingual content
    const overlay = document.getElementById('cookOverlay');
    if (!overlay || !overlay.classList.contains('active')) return;

    applyTabLabels();
    if (cookActiveRecipe) {
      renderRecipeHeader(cookActiveRecipe);
      renderIngredients();
      renderAllSteps();
      renderCurrentStep();
      renderNutrition();
    }
  };
})();

/* ============================================================
   INJECT COOK BUTTONS INTO MEAL FOOD ROWS
   Called by meals.js after it renders each food row, OR we
   patch renderMealList via a MutationObserver to auto-inject.
============================================================ */
function injectCookButtons() {
  document.querySelectorAll('.food-item-row').forEach(row => {
    if (row.querySelector('.btn-cook-meal')) return; // already added

    const actions = row.querySelector('.food-actions');
    if (!actions) return;

    // Extract the food name from the .food-name element
    const nameEl = row.querySelector('.food-name');
    if (!nameEl) return;

    // Parse "FoodName — 150g"
    const rawText = nameEl.textContent || '';
    const parts   = rawText.split('—');
    const foodName = (parts[0] || '').trim();

    // Find the food in foodsData by matching name
    const food = typeof foodsData !== 'undefined'
      ? foodsData.find(f =>
          f.nameVI.trim() === foodName ||
          f.nameEN.trim() === foodName
        )
      : null;

    const foodId    = food ? food.id    : -1;
    const foodVI    = food ? food.nameVI : foodName;
    const foodEN    = food ? food.nameEN : foodName;

    const cookBtn = document.createElement('button');
    cookBtn.className = 'btn-food-act btn-cook-meal';
    cookBtn.textContent = tc('btnCookShort');
    cookBtn.addEventListener('click', () => {
      openCookModal(foodId, foodVI, foodEN);
    });

    actions.appendChild(cookBtn);
  });
}

/* ============================================================
   MUTATION OBSERVER — watch #foodGrid-like containers and
   inject Cook buttons whenever the meal lists re-render.
============================================================ */
function watchMealLists() {
  const mealIds = ['list-breakfast', 'list-lunch', 'list-dinner', 'list-snack'];
  mealIds.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    const obs = new MutationObserver(() => injectCookButtons());
    obs.observe(el, { childList: true });
  });
}

/* ============================================================
   INIT
============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  buildCookModal();
  watchMealLists();
  // Initial injection in case foods already rendered
  setTimeout(injectCookButtons, 500);

  // Auto-open Cook Mode if URL has #cook-{id}
  if (window.location.hash && window.location.hash.startsWith('#cook-')) {
    const idParam = window.location.hash.replace('#cook-', '');
    const recipeId = parseInt(idParam, 10);
    if (!isNaN(recipeId)) {
      // Small timeout to ensure everything is ready
      setTimeout(() => {
        if (typeof window.openCookModal === 'function') {
          // Pass null for foodId since we use exactRecipeId
          window.openCookModal(null, null, null, recipeId);
          // Remove hash without reloading
          if (history && typeof history.replaceState === 'function') {
            history.replaceState(null, null, window.location.pathname + window.location.search);
          } else {
            window.location.hash = '';
          }
        }
      }, 100);
    }
  }
});
