/**
 * NutriCare - js/grocery.js
 * ============================================================
 * Grocery List Module:
 *
 * 1. Import items from nutricare-daily-meals (Meal Planner)
 *    - Reads foodId + grams from each meal slot
 *    - Resolves food names and categories from foodsData
 *    - Combines duplicate ingredients (same foodId → sum grams)
 *
 * 2. Import ingredients from any recipe in recipesData
 *    - Reads recipe.ingredients[].foodId / quantity / unit
 *    - Combines duplicates automatically
 *
 * 3. Add custom items manually (name + qty + unit)
 *
 * 4. Check off items as "bought" (toggle)
 *
 * 5. Delete individual items
 *
 * 6. Clear all / Clear bought
 *
 * 7. Persist to nutricare-grocery-list (localStorage)
 *
 * 8. Summary strip (total / bought / remaining + progress bar)
 *
 * 9. Grouped by food category
 *
 * 10. Full VI/EN bilingual support
 *
 * localStorage:
 *  - READ:  nutricare-daily-meals  (from Meal Planner)
 *  - READ:  (recipesData global from data/recipes.js)
 *  - WRITE: nutricare-grocery-list (own persistence key)
 * ============================================================
 */

'use strict';

/* ============================================================
   CONSTANTS
============================================================ */
const GROCERY_KEY    = 'nutricare-grocery-list';
const DAILY_MEAL_KEY = 'nutricare-daily-meals';

/* ============================================================
   STATE
   groceryList = array of items:
   {
     id:       string  (unique – foodId_source or 'custom_timestamp')
     foodId:   number | null   (null for custom items)
     nameVI:   string
     nameEN:   string
     qty:      number  (grams for food items, raw number for custom)
     unit:     string  ('g' for food items, user-supplied for custom)
     category: string  (food category or 'Custom')
     source:   string  (e.g. 'Meal Plan', recipe name)
     bought:   boolean
   }
============================================================ */
let groceryList = [];

/* ============================================================
   DOM REFS
============================================================ */
const groceryEmpty         = document.getElementById('groceryEmpty');
const groceryListContainer = document.getElementById('groceryListContainer');
const sumTotal             = document.getElementById('sumTotal');
const sumDone              = document.getElementById('sumDone');
const sumLeft              = document.getElementById('sumLeft');
const progressFill         = document.getElementById('groceryProgressFill');

const btnImportPlan        = document.getElementById('btnImportPlan');
const btnAddRecipeToggle   = document.getElementById('btnAddRecipeToggle');
const btnClearDone         = document.getElementById('btnClearDone');
const btnClearAll          = document.getElementById('btnClearAll');

const customItemName       = document.getElementById('customItemName');
const customItemQty        = document.getElementById('customItemQty');
const customItemUnit       = document.getElementById('customItemUnit');
const btnSaveCustom        = document.getElementById('btnSaveCustom');

const recipePicker         = document.getElementById('recipePicker');
const recipePickList       = document.getElementById('recipePickList');

/* ============================================================
   TRANSLATION HELPERS
============================================================ */
function tg(key) {
  if (typeof translations === 'undefined' || typeof currentLanguage === 'undefined') return key;
  const ld = translations[currentLanguage];
  if (!ld) return key;
  if (ld.grocery   && ld.grocery[key]   !== undefined) return ld.grocery[key];
  if (ld.foods     && ld.foods[key]     !== undefined) return ld.foods[key];
  return key;
}

function applyGroceryPlaceholders() {
  if (typeof translations === 'undefined' || typeof currentLanguage === 'undefined') return;
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const path = el.getAttribute('data-i18n-ph').split('.');
    let val = translations[currentLanguage];
    for (const k of path) { if (val) val = val[k]; }
    if (val) el.setAttribute('placeholder', val);
  });
}

function getFoodNameForItem(item) {
  const isEn = (typeof currentLanguage !== 'undefined' && currentLanguage === 'en');
  return isEn ? item.nameEN : item.nameVI;
}

function getCatLabel(cat) {
  const key = 'cat' + cat.replace(/[^a-zA-Z]/g, '');
  const r = tg(key);
  return (r !== key) ? r : cat;
}

/* ============================================================
   LOCALSTORAGE
============================================================ */
function saveGroceryList() {
  try { localStorage.setItem(GROCERY_KEY, JSON.stringify(groceryList)); } catch (e) {}
}

function loadGroceryList() {
  try {
    const raw = localStorage.getItem(GROCERY_KEY);
    if (raw) groceryList = JSON.parse(raw);
  } catch (e) { groceryList = []; }
}

/* ============================================================
   COMBINE / MERGE LOGIC
   When adding items, if an item with the same foodId already
   exists and has the same unit, we add quantities together
   instead of duplicating.
============================================================ */
function mergeItemIntoList(newItem) {
  if (newItem.foodId !== null) {
    const existing = groceryList.find(
      i => i.foodId === newItem.foodId && i.unit === newItem.unit
    );
    if (existing) {
      existing.qty = parseFloat((existing.qty + newItem.qty).toFixed(1));
      // Append source if different
      if (!existing.source.includes(newItem.source)) {
        existing.source += ', ' + newItem.source;
      }
      return;
    }
  }
  groceryList.push(newItem);
}

/* ============================================================
   1. IMPORT FROM MEAL PLAN
   Logic:
     nutricare-daily-meals
     → planItem.foodId
     → find recipe whose ingredients[] include that foodId
     → if recipe found: expand recipe.ingredients[] into grocery
     → if no recipe:    fall back to adding the food itself
   Duplicate merging applies in both cases.
============================================================ */
btnImportPlan.addEventListener('click', importFromMealPlan);

function findRecipeByIngredient(foodId) {
  if (typeof recipesData === 'undefined') return null;
  return recipesData.find(r =>
    r.ingredients && r.ingredients.some(ing => ing.foodId === foodId)
  ) || null;
}

function importFromMealPlan() {
  let planData = null;
  try {
    const raw = localStorage.getItem(DAILY_MEAL_KEY);
    if (raw) planData = JSON.parse(raw);
  } catch (e) {}

  if (!planData) {
    alert(tg('noMealPlan'));
    return;
  }

  const mealSlots = ['breakfast', 'lunch', 'dinner', 'snack'];
  let importedCount = 0;
  // Track which recipe ids have already been expanded this import
  // so we don't duplicate a recipe that appears in multiple meal slots.
  const expandedRecipeIds = new Set();

  mealSlots.forEach(slot => {
    const items = planData[slot] || [];
    items.forEach(planItem => {
      const food = typeof foodsData !== 'undefined'
        ? foodsData.find(f => f.id === planItem.foodId)
        : null;
      if (!food) return;

      // 1. Try to find a recipe that has this food as an ingredient
      const recipe = findRecipeByIngredient(planItem.foodId);

      if (recipe && !expandedRecipeIds.has(recipe.id)) {
        // Recipe found — expand its full ingredient list
        expandedRecipeIds.add(recipe.id);
        const isEn = (typeof currentLanguage !== 'undefined' && currentLanguage === 'en');
        const recipeName = isEn ? recipe.nameEN : recipe.nameVI;
        const source = tg('fromRecipe') + ': ' + recipeName;

        (recipe.ingredients || []).forEach(ing => {
          const ingFood = typeof foodsData !== 'undefined'
            ? foodsData.find(f => f.id === ing.foodId)
            : null;

          const newItem = ingFood
            ? {
                id:       `food_${ingFood.id}_${Date.now()}_${Math.random()}`,
                foodId:   ingFood.id,
                nameVI:   ingFood.nameVI,
                nameEN:   ingFood.nameEN,
                qty:      ing.quantity,
                unit:     ing.unit || 'g',
                category: ingFood.category,
                source:   source,
                bought:   false
              }
            : {
                id:       `custom_${Date.now()}_${Math.random()}`,
                foodId:   null,
                nameVI:   `Nguyên liệu #${ing.foodId}`,
                nameEN:   `Ingredient #${ing.foodId}`,
                qty:      ing.quantity,
                unit:     ing.unit || 'g',
                category: 'Custom',
                source:   source,
                bought:   false
              };
          mergeItemIntoList(newItem);
        });
        importedCount++;

      } else if (!recipe) {
        // No recipe found — fall back to adding the food itself at planned grams
        const source = tg('fromPlan');
        const newItem = {
          id:       `food_${food.id}_${Date.now()}_${Math.random()}`,
          foodId:   food.id,
          nameVI:   food.nameVI,
          nameEN:   food.nameEN,
          qty:      parseFloat(planItem.grams),
          unit:     'g',
          category: food.category,
          source:   source,
          bought:   false
        };
        mergeItemIntoList(newItem);
        importedCount++;
      }
      // If recipe already expanded (expandedRecipeIds has it), skip silently
    });
  });

  saveGroceryList();
  renderList();

  if (importedCount === 0) {
    alert(tg('noMealPlan'));
  }
}

/* ============================================================
   2. IMPORT FROM RECIPE (sidebar picker)
============================================================ */
btnAddRecipeToggle.addEventListener('click', () => {
  const isOpen = recipePicker.style.display !== 'none';
  recipePicker.style.display = isOpen ? 'none' : 'block';
  if (!isOpen) renderRecipePicker();
});

function renderRecipePicker() {
  if (!recipePickList || typeof recipesData === 'undefined') return;
  recipePickList.innerHTML = '';
  recipesData.forEach(recipe => {
    const isEn = (typeof currentLanguage !== 'undefined' && currentLanguage === 'en');
    const name = isEn ? recipe.nameEN : recipe.nameVI;

    const row = document.createElement('div');
    row.className = 'recipe-pick-item';
    row.innerHTML = `
      <span class="recipe-pick-name">${name}</span>
      <button class="recipe-pick-add">+ ${tg('btnAddCustom').replace('Thêm thủ công','').replace('Add Custom Item','Add')}</button>
    `;
    row.querySelector('.recipe-pick-add').addEventListener('click', e => {
      e.stopPropagation();
      importFromRecipe(recipe);
    });
    row.addEventListener('click', () => importFromRecipe(recipe));
    recipePickList.appendChild(row);
  });
}

function importFromRecipe(recipe) {
  const isEn = (typeof currentLanguage !== 'undefined' && currentLanguage === 'en');
  const recipeName = isEn ? recipe.nameEN : recipe.nameVI;
  const source = tg('fromRecipe') + ': ' + recipeName;

  (recipe.ingredients || []).forEach(ing => {
    const food = typeof foodsData !== 'undefined'
      ? foodsData.find(f => f.id === ing.foodId)
      : null;

    const newItem = food
      ? {
          id:       `food_${food.id}_${Date.now()}_${Math.random()}`,
          foodId:   food.id,
          nameVI:   food.nameVI,
          nameEN:   food.nameEN,
          qty:      ing.quantity,
          unit:     ing.unit || 'g',
          category: food.category,
          source:   source,
          bought:   false
        }
      : {
          id:       `custom_${Date.now()}_${Math.random()}`,
          foodId:   null,
          nameVI:   `Nguyên liệu #${ing.foodId}`,
          nameEN:   `Ingredient #${ing.foodId}`,
          qty:      ing.quantity,
          unit:     ing.unit || 'g',
          category: 'Custom',
          source:   source,
          bought:   false
        };

    mergeItemIntoList(newItem);
  });

  saveGroceryList();
  renderList();
  recipePicker.style.display = 'none';
}

/* ============================================================
   3. ADD CUSTOM ITEM
============================================================ */
btnSaveCustom.addEventListener('click', addCustomItem);

customItemName.addEventListener('keypress', e => {
  if (e.key === 'Enter') addCustomItem();
});

function addCustomItem() {
  const name = (customItemName.value || '').trim();
  const qty  = parseFloat(customItemQty.value);
  const unit = (customItemUnit.value || '').trim() || 'pcs';

  if (!name) { customItemName.focus(); return; }
  if (isNaN(qty) || qty <= 0) { customItemQty.focus(); return; }

  const newItem = {
    id:       `custom_${Date.now()}`,
    foodId:   null,
    nameVI:   name,
    nameEN:   name,
    qty:      qty,
    unit:     unit,
    category: 'Custom',
    source:   '',
    bought:   false
  };

  groceryList.push(newItem); // custom items always new, no merging
  saveGroceryList();
  renderList();

  // Clear form
  customItemName.value = '';
  customItemQty.value  = '';
  customItemUnit.value = '';
  customItemName.focus();
}

/* ============================================================
   4. TOGGLE BOUGHT
============================================================ */
function toggleBought(itemId) {
  const item = groceryList.find(i => i.id === itemId);
  if (item) {
    item.bought = !item.bought;
    saveGroceryList();
    renderList();
  }
}

/* ============================================================
   5. DELETE ITEM
============================================================ */
function deleteItem(itemId) {
  groceryList = groceryList.filter(i => i.id !== itemId);
  saveGroceryList();
  renderList();
}

/* ============================================================
   6. CLEAR ALL / CLEAR BOUGHT
============================================================ */
btnClearAll.addEventListener('click', () => {
  if (confirm(tg('confirmClearAll'))) {
    groceryList = [];
    saveGroceryList();
    renderList();
  }
});

btnClearDone.addEventListener('click', () => {
  if (groceryList.some(i => i.bought)) {
    if (confirm(tg('confirmClearDone'))) {
      groceryList = groceryList.filter(i => !i.bought);
      saveGroceryList();
      renderList();
    }
  }
});

/* ============================================================
   7. RENDER LIST
   Groups items by category, sorts bought to bottom within each group.
============================================================ */
const CATEGORY_ORDER = ['Grains', 'Protein', 'Dairy', 'Fruits', 'Vegetables', 'Nuts & Seeds', 'Legumes', 'Custom'];

function renderList() {
  groceryListContainer.innerHTML = '';

  const total = groceryList.length;
  const done  = groceryList.filter(i => i.bought).length;
  const left  = total - done;
  const pct   = total > 0 ? Math.round((done / total) * 100) : 0;

  // Summary
  sumTotal.textContent = total;
  sumDone.textContent  = done;
  sumLeft.textContent  = left;
  progressFill.style.width = pct + '%';

  // Empty state
  if (total === 0) {
    groceryEmpty.style.display = 'block';
    return;
  }
  groceryEmpty.style.display = 'none';

  // Group by category
  const groups = {};
  groceryList.forEach(item => {
    const cat = item.category || 'Custom';
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push(item);
  });

  // Render in category order
  const orderedCats = [
    ...CATEGORY_ORDER.filter(c => groups[c]),
    ...Object.keys(groups).filter(c => !CATEGORY_ORDER.includes(c))
  ];

  orderedCats.forEach(cat => {
    const items = groups[cat];
    // Sort: not-bought first, then bought
    items.sort((a, b) => Number(a.bought) - Number(b.bought));

    const groupEl = document.createElement('div');
    groupEl.className = 'grocery-category-group';

    const catLabel = document.createElement('div');
    catLabel.className = 'grocery-cat-label';
    catLabel.textContent = getCatLabel(cat);
    groupEl.appendChild(catLabel);

    items.forEach(item => {
      const row = document.createElement('div');
      row.className = 'grocery-item' + (item.bought ? ' bought' : '');
      row.setAttribute('data-id', item.id);

      const displayName = getFoodNameForItem(item);
      const sourceText  = item.source ? item.source : '';

      row.innerHTML = `
        <div class="grocery-checkbox" aria-label="${item.bought ? tg('itemBought') : displayName}">
          ${item.bought ? '✓' : ''}
        </div>
        <div class="grocery-item-info">
          <div class="grocery-item-name">${displayName}</div>
          ${sourceText ? `<div class="grocery-item-source">${sourceText}</div>` : ''}
        </div>
        <span class="grocery-item-qty">${item.qty}${item.unit}</span>
        <button class="grocery-item-del" aria-label="Remove ${displayName}" data-id="${item.id}">✕</button>
      `;

      // Toggle bought on row click (except delete btn)
      row.addEventListener('click', e => {
        if (e.target.closest('.grocery-item-del')) return;
        toggleBought(item.id);
      });

      // Delete button
      row.querySelector('.grocery-item-del').addEventListener('click', e => {
        e.stopPropagation();
        deleteItem(item.id);
      });

      groupEl.appendChild(row);
    });

    groceryListContainer.appendChild(groupEl);
  });
}

/* ============================================================
   8. LANGUAGE HOOK
============================================================ */
(function hookGroceryLanguage() {
  if (typeof switchLanguage !== 'function') return;
  const _prev = window.switchLanguage;
  window.switchLanguage = function(lang) {
    _prev(lang);
    applyGroceryPlaceholders();
    renderList();
    if (recipePicker.style.display !== 'none') renderRecipePicker();
  };
})();

/* ============================================================
   INIT
============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  loadGroceryList();
  applyGroceryPlaceholders();
  renderList();
});

setTimeout(() => { applyGroceryPlaceholders(); }, 150);
