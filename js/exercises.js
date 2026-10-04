/**
 * NutriCare – js/exercises.js
 * ============================================================
 * Handles logic for the Exercise Center:
 * 1. Rendering exercises and filtering
 * 2. Goal-based recommendations
 * 3. Exercise Detail Modal
 * 4. Calorie Burn Calculator
 * 5. Weekly Planner with localStorage
 * ============================================================
 */

'use strict';

// Ensure data is loaded
if (typeof exercisesData === 'undefined') {
  console.error('NutriCare: exercisesData is missing. Ensure data/exercises.js is loaded.');
}

// Global state
let currentFilteredExercises = exercisesData || [];
let weeklyPlan = {};
const PLAN_STORAGE_KEY = 'nutricare-weekly-plan';
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const DAY_KEYS = ['planMon', 'planTue', 'planWed', 'planThu', 'planFri', 'planSat', 'planSun'];

/* ============================================================
   1. RENDER & FILTER EXERCISES
   ============================================================ */
const exerciseGrid = document.getElementById('exerciseGrid');
const searchInput = document.getElementById('searchExercise');
const categoryFilter = document.getElementById('filterCategory');
const difficultyFilter = document.getElementById('filterDifficulty');
const noResults = document.getElementById('noResults');

function renderExercises(exercisesToRender) {
  if (!exerciseGrid) return;
  
  exerciseGrid.innerHTML = '';
  
  if (exercisesToRender.length === 0) {
    noResults.classList.remove('hidden');
  } else {
    noResults.classList.add('hidden');
  }

  exercisesToRender.forEach(ex => {
    const card = document.createElement('div');
    card.className = 'exercise-card';
    
    // Create card HTML. We use data-i18n attributes so the i18n engine can translate them
    card.innerHTML = `
      <div class="ex-header">
        <div class="ex-emoji">${ex.emoji}</div>
        <div>
          <h3 class="ex-title" data-i18n="exercises.ex${ex.id}Name"></h3>
          <div class="ex-badges">
            <span class="badge badge-category" data-i18n="exercises.cat${ex.category.replace(' ', '')}"></span>
            <span class="badge badge-difficulty" data-i18n="exercises.diff${ex.difficulty}"></span>
          </div>
        </div>
      </div>
      <p class="ex-desc" data-i18n="exercises.ex${ex.id}Desc"></p>
      <div class="ex-stats">
        <div class="ex-stat-item">
          <span class="ex-stat-label" data-i18n="exercises.estCalories"></span>
          <span class="ex-stat-value">~${Math.round(ex.met * 3.5 * 60 / 200)} <span data-i18n="exercises.perMinLabel" style="font-size:0.75rem; font-weight:normal;"></span></span>
        </div>
      </div>
      <button class="btn-view-details" data-id="${ex.id}" data-i18n="exercises.viewDetails"></button>
    `;
    
    exerciseGrid.appendChild(card);
  });

  // Re-apply translations for newly created elements if currentLanguage is set
  if (typeof applyTranslations === 'function' && typeof currentLanguage !== 'undefined') {
    applyTranslations(currentLanguage);
  }

  // Attach event listeners to buttons
  document.querySelectorAll('.btn-view-details').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(e.target.getAttribute('data-id'), 10);
      showExerciseDetails(id);
    });
  });
}

function filterExercises() {
  const searchTerm = searchInput.value.toLowerCase().trim();
  const category = categoryFilter.value;
  const difficulty = difficultyFilter.value;

  // We need to translate search terms to filter effectively, or just filter by English/Vietnamese if possible.
  // A simple way is to get the current translation of the name and description.
  
  const langData = (typeof translations !== 'undefined' && translations[currentLanguage]) ? translations[currentLanguage] : null;

  currentFilteredExercises = exercisesData.filter(ex => {
    // 1. Category
    if (category !== 'all' && ex.category !== category) return false;
    
    // 2. Difficulty
    if (difficulty !== 'all' && ex.difficulty !== difficulty) return false;
    
    // 3. Search Term
    if (searchTerm !== '') {
      let matchString = ex.name;
      if (langData && langData.exercises) {
        const localName = langData.exercises[`ex${ex.id}Name`] || '';
        const localDesc = langData.exercises[`ex${ex.id}Desc`] || '';
        matchString = `${localName} ${localDesc}`.toLowerCase();
      }
      if (matchString.indexOf(searchTerm) === -1) {
        return false;
      }
    }
    
    return true;
  });

  renderExercises(currentFilteredExercises);
}

if (searchInput) searchInput.addEventListener('input', filterExercises);
if (categoryFilter) categoryFilter.addEventListener('change', filterExercises);
if (difficultyFilter) difficultyFilter.addEventListener('change', filterExercises);

/* ============================================================
   2. GOAL-BASED RECOMMENDATIONS
   ============================================================ */
const goalButtons = document.querySelectorAll('.btn-goal');

goalButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    // Toggle active state
    goalButtons.forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    
    const goal = e.target.getAttribute('data-goal');
    
    // Reset filters
    searchInput.value = '';
    categoryFilter.value = 'all';
    difficultyFilter.value = 'all';
    
    // Filter by goal
    currentFilteredExercises = exercisesData.filter(ex => ex.goal.includes(goal));
    renderExercises(currentFilteredExercises);
    
    // Scroll to results
    exerciseGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});


/* ============================================================
   3. EXERCISE DETAIL MODAL
   ============================================================ */
const modal = document.getElementById('exerciseModal');
const closeButtons = document.querySelectorAll('[data-close-modal]');

function showExerciseDetails(id) {
  const ex = exercisesData.find(e => e.id === id);
  if (!ex || !modal) return;
  
  // Populate standard fields
  document.getElementById('modalEmoji').textContent = ex.emoji;
  
  // Populate translated fields
  const titleEl = document.getElementById('modalTitle');
  titleEl.setAttribute('data-i18n', `exercises.ex${ex.id}Name`);
  
  const categoryEl = document.getElementById('modalCategory');
  categoryEl.setAttribute('data-i18n', `exercises.cat${ex.category.replace(' ', '')}`);
  
  const difficultyEl = document.getElementById('modalDifficulty');
  difficultyEl.setAttribute('data-i18n', `exercises.diff${ex.difficulty}`);
  
  const descEl = document.getElementById('modalDesc');
  descEl.setAttribute('data-i18n', `exercises.ex${ex.id}Desc`);
  
  // Muscles
  const musclesHtml = ex.muscleGroups.map(m => {
    const key = m.replace(' ', '');
    return `<span data-i18n="exercises.muscle${key}"></span>`;
  }).join(', ');
  document.getElementById('modalMuscles').innerHTML = musclesHtml;
  
  // Equipment (If 'None' translate, otherwise assume simple text for now, or translate)
  document.getElementById('modalEquipment').textContent = ex.equipment === 'None' ? '-' : ex.equipment;
  
  // Duration
  const durationEl = document.getElementById('modalDuration');
  durationEl.setAttribute('data-i18n', `exercises.ex${ex.id}Duration`);
  
  // Cal Burn context
  const calBurnEl = document.getElementById('modalCalBurn');
  const kcalPerMin = (ex.met * 3.5 * 60 / 200).toFixed(1);
  calBurnEl.innerHTML = `~${kcalPerMin} <span data-i18n="exercises.modalCalPerMin"></span> (60kg)`;
  
  // Instructions
  // The instructions in translation are separated by '|'
  const langData = (typeof translations !== 'undefined' && translations[currentLanguage]) ? translations[currentLanguage] : null;
  const stepsContainer = document.getElementById('modalSteps');
  stepsContainer.innerHTML = '';
  
  if (langData && langData.exercises) {
    const stepsStr = langData.exercises[`ex${ex.id}Steps`] || '';
    if (stepsStr) {
      const steps = stepsStr.split('|');
      steps.forEach(step => {
        const li = document.createElement('li');
        // Remove the "1. " part from string if it exists
        li.textContent = step.replace(/^\d+\.\s*/, '');
        stepsContainer.appendChild(li);
      });
    }
  }
  
  // Re-apply translations for modal
  if (typeof applyTranslations === 'function' && typeof currentLanguage !== 'undefined') {
    applyTranslations(currentLanguage);
  }
  
  // Show modal
  modal.classList.add('active');
  document.body.style.overflow = 'hidden'; // prevent background scrolling
}

function closeModal() {
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

closeButtons.forEach(btn => btn.addEventListener('click', closeModal));

// Close on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
    closeModal();
  }
});


/* ============================================================
   4. CALORIE BURN CALCULATOR
   ============================================================ */
const calcWeight = document.getElementById('calcWeight');
const calcExercise = document.getElementById('calcExercise');
const calcDuration = document.getElementById('calcDuration');
const btnCalculateBurn = document.getElementById('btnCalculateBurn');
const calcResultContainer = document.getElementById('calcResultContainer');
const calcResultValue = document.getElementById('calcResultValue');
const calcError = document.getElementById('calcError');

// Populate exercise select
function populateCalcSelect() {
  if (!calcExercise) return;
  exercisesData.forEach(ex => {
    const option = document.createElement('option');
    option.value = ex.id;
    // We use data-i18n-calc to avoid colliding with main text if needed, 
    // but data-i18n is fine as long as we run applyTranslations
    option.setAttribute('data-i18n', `exercises.ex${ex.id}Name`);
    calcExercise.appendChild(option);
  });
}

function calculateCalories() {
  calcError.classList.add('hidden');
  calcResultContainer.classList.add('hidden');
  
  const weight = parseFloat(calcWeight.value);
  const exId = parseInt(calcExercise.value, 10);
  const duration = parseFloat(calcDuration.value);
  
  const langData = (typeof translations !== 'undefined' && translations[currentLanguage]) ? translations[currentLanguage] : null;
  const t = (key) => langData ? langData.exercises[key] || key : key;
  
  if (isNaN(weight) || weight <= 0 || weight > 300) {
    calcError.textContent = t('calcErrorWeight');
    calcError.classList.remove('hidden');
    return;
  }
  if (isNaN(exId)) {
    calcError.textContent = t('calcErrorExercise');
    calcError.classList.remove('hidden');
    return;
  }
  if (isNaN(duration) || duration <= 0 || duration > 600) {
    calcError.textContent = t('calcErrorDuration');
    calcError.classList.remove('hidden');
    return;
  }
  
  const ex = exercisesData.find(e => e.id === exId);
  if (!ex) return;
  
  // Formula: MET x 3.5 x bodyweight(kg) / 200 x duration(minutes)
  const calories = (ex.met * 3.5 * weight) / 200 * duration;
  
  calcResultValue.textContent = Math.round(calories) + ' kcal';
  calcResultContainer.classList.remove('hidden');
}

if (btnCalculateBurn) {
  btnCalculateBurn.addEventListener('click', calculateCalories);
}


/* ============================================================
   5. WEEKLY EXERCISE PLANNER
   ============================================================ */
const weeklyPlanGrid = document.getElementById('weeklyPlanGrid');
const btnSavePlan = document.getElementById('btnSavePlan');
const btnResetPlan = document.getElementById('btnResetPlan');
const planSaveMsg = document.getElementById('planSaveMsg');

function loadPlan() {
  try {
    const stored = localStorage.getItem(PLAN_STORAGE_KEY);
    if (stored) {
      weeklyPlan = JSON.parse(stored);
    } else {
      // Default empty plan
      DAYS.forEach(day => weeklyPlan[day] = null);
    }
  } catch(e) {
    DAYS.forEach(day => weeklyPlan[day] = null);
  }
}

function savePlan() {
  try {
    localStorage.setItem(PLAN_STORAGE_KEY, JSON.stringify(weeklyPlan));
    if (planSaveMsg) {
      planSaveMsg.classList.remove('hidden');
      setTimeout(() => planSaveMsg.classList.add('hidden'), 3000);
    }
  } catch(e) {
    console.error('Could not save plan to localStorage');
  }
}

function renderWeeklyPlan() {
  if (!weeklyPlanGrid) return;
  weeklyPlanGrid.innerHTML = '';
  
  DAYS.forEach((day, index) => {
    const col = document.createElement('div');
    col.className = 'day-column';
    
    // Header
    const header = document.createElement('div');
    header.className = 'day-header';
    header.setAttribute('data-i18n', `exercises.${DAY_KEYS[index]}`);
    col.appendChild(header);
    
    // Content
    const content = document.createElement('div');
    content.className = 'day-content';
    
    const dayData = weeklyPlan[day];
    
    if (dayData && dayData.id) {
      const ex = exercisesData.find(e => e.id === dayData.id);
      if (ex) {
        content.innerHTML = `
          <div class="plan-item">
            <div class="plan-item-info">
              <span class="plan-item-title" data-i18n="exercises.ex${ex.id}Name"></span>
              <span class="plan-item-duration">${dayData.duration} <span data-i18n="exercises.planMin"></span></span>
            </div>
            <button class="btn-remove-item" data-day="${day}" aria-label="Remove" title="Remove">&times;</button>
          </div>
        `;
      }
    } else {
      // Add form
      content.innerHTML = `
        <select class="form-control plan-select-ex" data-day="${day}" style="font-size:0.75rem; padding:0.25rem;">
          <option value="" disabled selected data-i18n="exercises.planSelectEx"></option>
          ${exercisesData.map(e => `<option value="${e.id}" data-i18n="exercises.ex${e.id}Name"></option>`).join('')}
        </select>
        <input type="number" class="form-control plan-input-dur" data-day="${day}" placeholder="Min" data-i18n="exercises.planSelectDur" min="1" max="300" style="font-size:0.75rem; padding:0.25rem;">
        <button class="add-plan-btn" data-day="${day}" data-i18n="exercises.planAdd"></button>
      `;
    }
    
    col.appendChild(content);
    weeklyPlanGrid.appendChild(col);
  });
  
  // Re-apply translations for planner
  if (typeof applyTranslations === 'function' && typeof currentLanguage !== 'undefined') {
    applyTranslations(currentLanguage);
  }
  
  // Attach listeners
  document.querySelectorAll('.add-plan-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const day = e.target.getAttribute('data-day');
      const select = document.querySelector(`.plan-select-ex[data-day="${day}"]`);
      const input = document.querySelector(`.plan-input-dur[data-day="${day}"]`);
      
      const exId = parseInt(select.value, 10);
      const dur = parseInt(input.value, 10);
      
      if (!isNaN(exId) && !isNaN(dur) && dur > 0) {
        weeklyPlan[day] = { id: exId, duration: dur };
        renderWeeklyPlan();
      }
    });
  });
  
  document.querySelectorAll('.btn-remove-item').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const day = e.target.getAttribute('data-day');
      weeklyPlan[day] = null;
      renderWeeklyPlan();
    });
  });
}

if (btnSavePlan) {
  btnSavePlan.addEventListener('click', savePlan);
}

if (btnResetPlan) {
  btnResetPlan.addEventListener('click', () => {
    if (confirm('Are you sure you want to reset your plan?')) {
      DAYS.forEach(day => weeklyPlan[day] = null);
      savePlan();
      renderWeeklyPlan();
    }
  });
}

/* ============================================================
   INIT
   ============================================================ */
renderExercises(exercisesData);
populateCalcSelect();
loadPlan();
renderWeeklyPlan();

// Give translations a small moment to apply to dynamically created elements 
// on first load, since main.js might have run before this file.
setTimeout(() => {
  if (typeof applyTranslations === 'function' && typeof currentLanguage !== 'undefined') {
    applyTranslations(currentLanguage);
  }
}, 100);

// Hook into switchLanguage from main.js if needed to re-render complex dynamic lists 
// like the planner or filters that might contain inner text, but our use of data-i18n 
// makes it mostly automatic.
