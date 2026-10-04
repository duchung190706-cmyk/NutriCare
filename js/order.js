/**
 * NutriCare - js/order.js
 * ============================================================
 * Logic for Order Module (Demo)
 * Handles meal rendering, search/filter/sort, cart state,
 * modal popups, and calculator integration.
 * ============================================================
 */

'use strict';

const ORDER_KEY = 'nutricare-demo-order';
const CALORIE_GOAL_KEY = 'nutricare-calorie-goal';
const DELIVERY_FEE = 15000;

let cart = []; // { mealId: string, qty: number }

/* ============================================================
   TRANSLATION HELPER
============================================================ */
function to(key) {
  if (typeof translations === 'undefined' || typeof currentLanguage === 'undefined') return key;
  const ld = translations[currentLanguage];
  if (!ld) return key;
  if (ld.order && ld.order[key] !== undefined) return ld.order[key];
  return key;
}

function applyOrderPlaceholders() {
  if (typeof translations === 'undefined' || typeof currentLanguage === 'undefined') return;
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const path = el.getAttribute('data-i18n-ph').split('.');
    let val = translations[currentLanguage];
    for (const k of path) { if (val) val = val[k]; }
    if (val) el.setAttribute('placeholder', val);
  });
}

function formatVND(amount) {
  return amount.toLocaleString('vi-VN') + ' ' + to('unitVND');
}

/* ============================================================
   DOM ELEMENTS
============================================================ */
const orderGrid       = document.getElementById('orderGrid');
const orderSearch     = document.getElementById('orderSearch');
const filterCat       = document.getElementById('filterCat');
const filterCal       = document.getElementById('filterCal');
const sortList        = document.getElementById('sortList');
const toggleHighPro   = document.getElementById('toggleHighPro');

const cartBody        = document.getElementById('cartBody');
const cartItemsList   = document.getElementById('cartItemsList');
const cartEmpty       = document.getElementById('cartEmpty');
const cartSubtotal    = document.getElementById('cartSubtotal');
const cartDelivery    = document.getElementById('cartDelivery');
const cartTotal       = document.getElementById('cartTotal');
const cartCountHeader = document.getElementById('cartCountHeader');
const cartFabBadge    = document.getElementById('cartFabBadge');
const btnCheckout     = document.getElementById('btnCheckout');

const detailModalOverlay = document.getElementById('detailModalOverlay');
const checkoutModalOverlay = document.getElementById('checkoutModalOverlay');
let currentDetailMealId  = null;

/* ============================================================
   CART PERSISTENCE
============================================================ */
function loadCart() {
  try {
    const raw = localStorage.getItem(ORDER_KEY);
    if (raw) cart = JSON.parse(raw);
  } catch (e) { cart = []; }
}

function saveCart() {
  try {
    localStorage.setItem(ORDER_KEY, JSON.stringify(cart));
  } catch (e) {}
}

/* ============================================================
   CALCULATOR INTEGRATION
============================================================ */
function initGoalIntegration() {
  const goalStrip = document.getElementById('orderGoalStrip');
  const goalDesc  = document.getElementById('orderGoalDesc');
  const goalStats = document.getElementById('orderGoalStats');
  
  let targetCal = 0;
  try {
    const raw = localStorage.getItem(CALORIE_GOAL_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    targetCal =
      parsed &&
      typeof parsed.calories === 'number' &&
      Number.isFinite(parsed.calories)
        ? parsed.calories
        : 0;
  } catch(e) {
    targetCal = 0;
  }

  if (targetCal > 0) {
    goalStrip.style.display = 'flex';
    goalDesc.textContent = to('goalSuggest');
    
    // Estimate a per-meal target (assuming 3 meals + 1 snack roughly, so about 30% per meal)
    const mealTarget = Math.round(targetCal * 0.3);
    
    goalStats.innerHTML = `
      <div class="order-goal-stat">
        <strong>${targetCal}</strong>
        <span>${to('labelCal')} / Ngày</span>
      </div>
      <div class="order-goal-stat">
        <strong>~${mealTarget}</strong>
        <span>${to('labelCal')} / Bữa</span>
      </div>
    `;
    
    // Suggest one meal closest to mealTarget
    suggestMealForGoal(mealTarget);
  } else {
    goalStrip.style.display = 'flex';
    goalDesc.textContent = to('goalNoGoal');
    goalStats.innerHTML = `<a href="calculator.html" class="btn-goal-calc">${to('goalBtnCalc')}</a>`;
  }
}

function suggestMealForGoal(target) {
  if (!orderMeals || orderMeals.length === 0) return;
  
  const verifiedMeals = orderMeals.filter(m => m.nutritionVerified === true && typeof m.calories === 'number' && Number.isFinite(m.calories));
  if (verifiedMeals.length === 0) return;

  // Find meal with calories closest to target
  let best = verifiedMeals[0];
  let minDiff = Math.abs(best.calories - target);
  
  verifiedMeals.forEach(m => {
    const diff = Math.abs(m.calories - target);
    if (diff < minDiff) {
      minDiff = diff;
      best = m;
    }
  });
  
  // Create a small suggestion chip next to stats
  const goalStats = document.getElementById('orderGoalStats');
  const chip = document.createElement('div');
  chip.style.cssText = 'padding:0.5rem 1rem; background:var(--color-primary-light); color:var(--color-primary-dark); border-radius:var(--radius-md); font-size:0.875rem; font-weight:600; display:flex; align-items:center; gap:0.5rem; cursor:pointer;';
  
  const isEn = (typeof currentLanguage !== 'undefined' && currentLanguage === 'en');
  const bestName = isEn ? best.nameEN : best.nameVI;
  chip.innerHTML = `💡 Thử: ${bestName}`;
  chip.addEventListener('click', () => openDetailModal(best.id));
  
  goalStats.appendChild(chip);
}

/* ============================================================
   RENDER MEALS (Filter & Sort)
============================================================ */
function renderMeals() {
  if (typeof orderMeals === 'undefined' || typeof orderProviders === 'undefined') return;

  const isEn = (typeof currentLanguage !== 'undefined' && currentLanguage === 'en');
  const q = orderSearch.value.trim().toLowerCase();
  const cat = filterCat.value;
  const cal = filterCal.value;
  const sort = sortList.value;
  const hp = toggleHighPro.checked;

  let filtered = orderMeals.filter(m => {
    // Search
    const nameVI = (m.nameVI || '').toLowerCase();
    const nameEN = (m.nameEN || '').toLowerCase();
    const descVI = (m.descriptionVI || '').toLowerCase();
    const descEN = (m.descriptionEN || '').toLowerCase();
    const prov   = orderProviders.find(p => p.id === m.providerId);
    const provName = prov ? prov.name.toLowerCase() : '';
    
    if (q && !nameVI.includes(q) && !nameEN.includes(q) && !descVI.includes(q) && !descEN.includes(q) && !provName.includes(q)) return false;
    
    // Category
    if (cat !== 'all' && m.category !== cat) return false;
    
    // Calorie range
    if (cal !== 'all') {
      if (m.nutritionVerified !== true || typeof m.calories !== 'number' || !Number.isFinite(m.calories)) return false;
      if (cal === 'low' && m.calories >= 400) return false;
      if (cal === 'mid' && (m.calories < 400 || m.calories > 600)) return false;
      if (cal === 'high' && m.calories <= 600) return false;
    }
    
    // High protein
    if (hp) {
      if (m.nutritionVerified !== true || typeof m.protein !== 'number' || !Number.isFinite(m.protein) || m.protein < 30) return false;
    }
    
    return true;
  });

  // Sort
  if (sort === 'price-asc')  filtered.sort((a,b) => a.price - b.price);
  if (sort === 'price-desc') filtered.sort((a,b) => b.price - a.price);
  if (sort === 'cal-asc')    filtered.sort((a,b) => a.calories - b.calories);
  if (sort === 'cal-desc')   filtered.sort((a,b) => b.calories - a.calories);
  // default: keep original order

  orderGrid.innerHTML = '';
  
  if (filtered.length === 0) {
    orderGrid.innerHTML = `<div class="order-no-results">${to('noResults')}</div>`;
    return;
  }

  filtered.forEach(m => {
    const prov = orderProviders.find(p => p.id === m.providerId);
    const name = isEn ? m.nameEN : m.nameVI;
    
    const calText = (m.nutritionVerified === true && typeof m.calories === 'number' && Number.isFinite(m.calories)) ? m.calories : '--';
    const proText = (m.nutritionVerified === true && typeof m.protein === 'number' && Number.isFinite(m.protein)) ? `${m.protein}g` : '--';
    
    const card = document.createElement('div');
    card.className = 'meal-card';
    card.innerHTML = `
      <div class="meal-card-img">
        ${m.imageUrl ? `<img src="${m.imageUrl}" alt="${name}">` : (m.image || '')}
        <div class="meal-card-tags">
          <span class="meal-card-tag">${to(getCatKey(m.category))}</span>
        </div>
      </div>
      <div class="meal-card-body">
        <div class="meal-card-provider">${prov ? prov.name : to('labelProvider')}</div>
        <h3 class="meal-card-title">${name}</h3>
        <div class="meal-card-meta">
          <span class="meal-card-rating">⭐ ${m.rating}</span>
          <span>🛵 ${m.deliveryTime} ${to('unitMin')}</span>
        </div>
        <div class="meal-card-nutr">
          <div class="meal-card-nutr-item">
            <span class="meal-card-nutr-val">${calText}</span>
            <span class="meal-card-nutr-lbl">${to('labelCal')}</span>
          </div>
          <div class="meal-card-nutr-item">
            <span class="meal-card-nutr-val">${proText}</span>
            <span class="meal-card-nutr-lbl">${to('labelProtein')}</span>
          </div>
        </div>
        <div class="meal-card-footer">
          <div class="meal-card-price">${formatVND(m.price)}</div>
          <button class="btn-card-add" data-id="${m.id}">${to('btnAddOrder')}</button>
        </div>
        <button class="btn-card-detail" data-id="${m.id}">${to('btnViewDetail')}</button>
      </div>
    `;
    
    orderGrid.appendChild(card);
  });

  // Attach events
  document.querySelectorAll('.btn-card-add').forEach(btn => {
    btn.addEventListener('click', (e) => {
      addToCart(e.target.dataset.id, 1);
    });
  });
  
  document.querySelectorAll('.btn-card-detail').forEach(btn => {
    btn.addEventListener('click', (e) => {
      openDetailModal(e.target.dataset.id);
    });
  });
}

function getCatKey(cat) {
  if (cat === 'balanced') return 'catBalanced';
  if (cat === 'high-protein') return 'catHighProtein';
  if (cat === 'low-calorie') return 'catLowCal';
  if (cat === 'salad') return 'catSalad';
  if (cat === 'drink') return 'catDrink';
  return 'catBalanced';
}

/* ============================================================
   CART LOGIC
============================================================ */
function addToCart(mealId, qty) {
  const existing = cart.find(i => i.mealId === mealId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ mealId, qty });
  }
  saveCart();
  renderCart();
}

function updateCartQty(mealId, delta) {
  const item = cart.find(i => i.mealId === mealId);
  if (item) {
    item.qty += delta;
    if (item.qty <= 0) {
      cart = cart.filter(i => i.mealId !== mealId);
    }
    saveCart();
    renderCart();
  }
}

function removeFromCart(mealId) {
  cart = cart.filter(i => i.mealId !== mealId);
  saveCart();
  renderCart();
}

function renderCart() {
  if (typeof orderMeals === 'undefined') return;
  const isEn = (typeof currentLanguage !== 'undefined' && currentLanguage === 'en');
  
  cartItemsList.innerHTML = '';
  
  let totalQty = 0;
  
  const cartFooter = document.querySelector('.cart-footer');
  if (cartFooter) cartFooter.style.display = 'none';

  if (cart.length === 0) {
    cartEmpty.style.display = 'block';
    cartItemsList.style.display = 'none';
    cartCountHeader.textContent = 0;
    cartFabBadge.textContent = 0;
    return;
  }

  cartEmpty.style.display = 'none';
  cartItemsList.style.display = 'block';

  // Group items
  const groups = {};
  cart.forEach(item => {
    const meal = orderMeals.find(m => m.id === item.mealId);
    if (!meal) return;
    
    totalQty += item.qty;
    
    if (!groups[meal.providerId]) {
      groups[meal.providerId] = {
        items: [],
        subtotal: 0
      };
    }
    groups[meal.providerId].items.push({ meal, qty: item.qty });
    groups[meal.providerId].subtotal += meal.price * item.qty;
  });

  cartCountHeader.textContent = totalQty;
  cartFabBadge.textContent = totalQty;
  
  Object.keys(groups).forEach(provId => {
    const group = groups[provId];
    const prov = (typeof orderProviders !== 'undefined') ? orderProviders.find(p => p.id === provId) : null;
    const provName = prov ? prov.name : to('labelProvider');
    const extUrl = prov ? prov.externalOrderUrl : null;
    
    const groupEl = document.createElement('div');
    groupEl.className = 'cart-provider-group';
    
    let html = `<h4 class="cart-provider-name">${provName}</h4>`;
    
    group.items.forEach(i => {
      const meal = i.meal;
      const qty = i.qty;
      html += `
        <div class="cart-item">
          <div class="cart-item-name">${isEn ? meal.nameEN : meal.nameVI}</div>
          <div class="cart-item-controls">
            <div class="cart-item-price">${formatVND(meal.price)}</div>
            <div class="cart-qty">
              <button class="btn-qty" data-id="${meal.id}" data-d="-1">-</button>
              <div class="cart-qty-val">${qty}</div>
              <button class="btn-qty" data-id="${meal.id}" data-d="1">+</button>
            </div>
            <button class="btn-cart-remove" data-id="${meal.id}">✕</button>
          </div>
        </div>
      `;
    });
    
    const orderBtnText = `${to('btnOrderAt')} ${provName}`;
    const noLinkText = to('msgNoExtLink');

    html += `
      <div class="cart-provider-summary">
        <div style="display:flex; justify-content:space-between; font-weight:800; font-size:1.125rem; margin-bottom:1rem;">
          <span>${to('labelTotal')}</span>
          <span style="color:var(--color-primary);">${formatVND(group.subtotal)}</span>
        </div>
        ${extUrl 
          ? `<button class="btn-checkout" onclick="window.open('${extUrl}', '_blank')">${orderBtnText}</button>`
          : `<div style="text-align:center; font-size:0.875rem; color:var(--color-text-secondary); font-style:italic;">${noLinkText}</div>`
        }
      </div>
    `;
    
    groupEl.innerHTML = html;
    cartItemsList.appendChild(groupEl);
  });
  
  // Attach events
  cartItemsList.querySelectorAll('.btn-qty').forEach(btn => {
    btn.addEventListener('click', (e) => {
      updateCartQty(e.target.dataset.id, parseInt(e.target.dataset.d));
    });
  });
  
  cartItemsList.querySelectorAll('.btn-cart-remove').forEach(btn => {
    btn.addEventListener('click', (e) => {
      removeFromCart(e.target.dataset.id);
    });
  });
}

/* ============================================================
   MODALS
============================================================ */
function openDetailModal(mealId) {
  if (typeof orderMeals === 'undefined' || typeof orderProviders === 'undefined') return;
  const m = orderMeals.find(x => x.id === mealId);
  if (!m) return;
  
  const isEn = (typeof currentLanguage !== 'undefined' && currentLanguage === 'en');
  const prov = orderProviders.find(p => p.id === m.providerId);
  currentDetailMealId = m.id;
  
  document.getElementById('detailImg').innerHTML = m.imageUrl ? `<img src="${m.imageUrl}" alt="Meal Image" style="width:100%; height:100%; object-fit:cover;">` : (m.image || '');
  document.getElementById('detailProv').textContent = prov ? prov.name : to('labelProvider');
  document.getElementById('detailTitle').textContent = isEn ? m.nameEN : m.nameVI;
  document.getElementById('detailDesc').textContent = isEn ? m.descriptionEN : m.descriptionVI;
  
  document.getElementById('detailRating').textContent = '⭐ ' + m.rating;
  document.getElementById('detailDelivery').textContent = '🛵 ' + m.deliveryTime + ' ' + to('unitMin');
  
  const isVerified = m.nutritionVerified === true;
  document.getElementById('detailCal').textContent = (isVerified && typeof m.calories === 'number' && Number.isFinite(m.calories)) ? m.calories : '--';
  document.getElementById('detailPro').textContent = (isVerified && typeof m.protein === 'number' && Number.isFinite(m.protein)) ? m.protein + 'g' : '--';
  document.getElementById('detailCarb').textContent = (isVerified && typeof m.carbs === 'number' && Number.isFinite(m.carbs)) ? m.carbs + 'g' : '--';
  document.getElementById('detailFat').textContent = (isVerified && typeof m.fat === 'number' && Number.isFinite(m.fat)) ? m.fat + 'g' : '--';
  
  document.getElementById('detailPrice').textContent = formatVND(m.price);
  
  // Tags
  const tagsEl = document.getElementById('detailTags');
  tagsEl.innerHTML = m.tags.map(t => `<span class="meal-card-tag" style="background:var(--color-border);">${t}</span>`).join('');
  
  detailModalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeDetailModal() {
  detailModalOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

document.getElementById('btnDetailClose').addEventListener('click', closeDetailModal);
document.getElementById('btnDetailAdd').addEventListener('click', () => {
  if (currentDetailMealId) addToCart(currentDetailMealId, 1);
  closeDetailModal();
});
detailModalOverlay.addEventListener('click', e => { if(e.target === detailModalOverlay) closeDetailModal(); });

// Checkout Modal
btnCheckout.addEventListener('click', () => {
  if (cart.length === 0) return;
  
  const isEn = (typeof currentLanguage !== 'undefined' && currentLanguage === 'en');
  const list = document.getElementById('checkoutItemsList');
  list.innerHTML = '';
  
  let subtotal = 0;
  cart.forEach(item => {
    const meal = orderMeals.find(m => m.id === item.mealId);
    if (!meal) return;
    subtotal += meal.price * item.qty;
    
    list.innerHTML += `
      <div style="display:flex; justify-content:space-between; margin-bottom:0.25rem; font-size:0.9375rem;">
        <span>${item.qty}x ${isEn ? meal.nameEN : meal.nameVI}</span>
        <span>${formatVND(meal.price * item.qty)}</span>
      </div>
    `;
  });
  
  document.getElementById('checkoutTotalVal').textContent = formatVND(subtotal + DELIVERY_FEE);
  
  checkoutModalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
});

document.getElementById('btnCheckoutClose').addEventListener('click', () => {
  checkoutModalOverlay.classList.remove('active');
  document.body.style.overflow = '';
  // Optional: clear cart after checkout
  cart = [];
  saveCart();
  renderCart();
});

/* ============================================================
   EVENTS
============================================================ */
orderSearch.addEventListener('input', renderMeals);
filterCat.addEventListener('change', renderMeals);
filterCal.addEventListener('change', renderMeals);
sortList.addEventListener('change', renderMeals);
toggleHighPro.addEventListener('change', renderMeals);

// Mobile cart toggle
document.getElementById('mobileCartFab').addEventListener('click', () => {
  document.getElementById('orderCart').classList.toggle('open');
});
document.getElementById('btnCartClose').addEventListener('click', () => {
  document.getElementById('orderCart').classList.remove('open');
});

/* ============================================================
   LANGUAGE HOOK
============================================================ */
(function hookOrderLanguage() {
  if (typeof switchLanguage !== 'function') return;
  const _prev = window.switchLanguage;
  window.switchLanguage = function(lang) {
    _prev(lang);
    applyOrderPlaceholders();
    renderMeals();
    renderCart();
    initGoalIntegration();
  };
})();

/* ============================================================
   INIT
============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  loadCart();
  applyOrderPlaceholders();
  initGoalIntegration();
  renderMeals();
  renderCart();
});

// Extra pass to ensure placeholders are applied after main.js translates the page
setTimeout(applyOrderPlaceholders, 150);
