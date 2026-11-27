// HomeLedger transactions — the full November ledger: filter it by
// category or by typing a merchant, and add a transaction of your own.
// Adding one updates the ledger, the totals and every other page, because
// they all read the same store.

import { CATEGORIES, HOUSEHOLD } from './data.js';
import { esc, money, shortDate } from './format.js';
import { addTransaction, categoryRows, state, totalSpent } from './store.js';

document.querySelectorAll('[data-month]').forEach((el) => {
  el.textContent = HOUSEHOLD.month;
});

const rowsEl = document.getElementById('tx-rows');
const countEl = document.getElementById('tx-count');
const totalEl = document.getElementById('tx-total');
const catFilter = document.getElementById('filter-category');
const searchInput = document.getElementById('filter-search');
const form = document.getElementById('add-form');
const confirmEl = document.getElementById('add-confirm');

const catById = Object.fromEntries(categoryRows().map((r) => [r.id, r]));

function visible() {
  const cat = catFilter.value;
  const q = searchInput.value.trim().toLowerCase();
  return state.transactions.filter((t) => {
    if (cat !== 'all' && t.category !== cat) return false;
    if (q && !(t.merchant.toLowerCase().includes(q) || t.note.toLowerCase().includes(q))) return false;
    return true;
  });
}

function render() {
  const list = visible();
  rowsEl.innerHTML = list.map((t) => {
    const cat = catById[t.category];
    return `<tr><td>${shortDate(t.date)}</td><td><b>${esc(t.merchant)}</b><br><span class="muted small">${esc(t.note)}</span></td><td><span class="cat-dot" style="background:${cat ? cat.color : '#888'}"></span>${esc(cat ? cat.name : t.category)}</td><td class="num money">${money(t.amount)}</td></tr>`;
  }).join('') || `<tr><td colspan="4" class="muted">No transactions match these filters. Try clearing the search.</td></tr>`;
  countEl.textContent = `${list.length} of ${state.transactions.length} transactions`;
  totalEl.textContent = `Showing ${money(list.reduce((s, t) => s + t.amount, 0))} · month total ${money(totalSpent())}`;
}

catFilter.innerHTML = `<option value="all">All categories</option>` + CATEGORIES.map((c) => `<option value="${c.id}">${esc(c.name)}</option>`).join('');

catFilter.addEventListener('change', render);
searchInput.addEventListener('input', render);

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const date = document.getElementById('new-date').value || '2026-11-28';
  const merchant = document.getElementById('new-merchant').value.trim();
  const note = document.getElementById('new-note').value.trim() || 'Added by hand';
  const category = document.getElementById('new-category').value;
  const amount = Number(document.getElementById('new-amount').value);
  if (!merchant || !(amount > 0)) {
    confirmEl.textContent = 'Add a merchant and an amount over $0.';
    return;
  }
  addTransaction({ date, merchant, note, category, amount });
  form.reset();
  document.getElementById('new-date').value = '2026-11-28';
  render();
  confirmEl.textContent = `Added ${merchant} — ${money(amount)}. The dashboard and budgets already include it.`;
});

render();
