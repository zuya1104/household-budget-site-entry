// HomeLedger dashboard — the month at a glance: income, spending, what is
// left, where the money went, the newest transactions, the bills coming up
// and how the savings goals stand. Every number comes from store.js.

import { BILLS, HOUSEHOLD } from './data.js';
import { esc, money, pct, shortDate } from './format.js';
import { donut } from './charts.js';
import { categoryRows, state, totalIncome, totalPlanned, totalSpent } from './store.js';

const income = totalIncome();
const spent = totalSpent();
const saved = income - spent;
const planned = totalPlanned();
const rows = categoryRows();

document.querySelectorAll('[data-month]').forEach((el) => {
  el.textContent = HOUSEHOLD.month;
});

const set = (id, text) => {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
};

set('stat-income', money(income));
set('stat-spent', money(spent));
set('stat-saved', money(saved));
set('stat-saved-sub', `${pct(saved, income)} of income kept — plan was ${money(planned)} of spending`);
set('stat-plan', money(planned - spent));
const planNote = document.getElementById('stat-plan-note');
if (planNote) {
  planNote.textContent = spent <= planned
    ? `${money(planned - spent)} under the monthly plan`
    : `${money(spent - planned)} over the monthly plan`;
}

// Where the money went.
const donutEl = document.getElementById('donut');
if (donutEl) donutEl.innerHTML = donut(rows);
const legend = document.getElementById('legend');
if (legend) {
  legend.innerHTML = rows.map((r) => `<li><span><span class="cat-dot" style="background:${r.color}"></span>${esc(r.name)}</span><span class="amt">${money(r.spent)} · ${pct(r.spent, spent)}</span></li>`).join('');
}

// Newest transactions.
const recent = document.getElementById('recent-rows');
if (recent) {
  recent.innerHTML = state.transactions.slice(0, 8).map((t) => {
    const cat = rows.find((r) => r.id === t.category);
    return `<tr><td>${shortDate(t.date)}</td><td><b>${esc(t.merchant)}</b><br><span class="muted small">${esc(t.note)}</span></td><td><span class="cat-dot" style="background:${cat ? cat.color : '#888'}"></span>${esc(cat ? cat.name : t.category)}</td><td class="num money">${money(t.amount)}</td></tr>`;
  }).join('');
}

// Bills coming up in December.
const bills = document.getElementById('bill-list');
if (bills) {
  bills.innerHTML = BILLS.map((b) => `<div class="bill"><div><b>${esc(b.name)}</b><br><span class="due">Due ${esc(b.due)}</span></div><span class="money"><b>${money(b.amount)}</b></span></div>`).join('')
    + `<p class="small muted" style="margin-top:.6rem">December bills total <b class="money">${money(BILLS.reduce((s, b) => s + b.amount, 0))}</b> — already covered by November's savings.</p>`;
}

// Goals at a glance.
const goalsEl = document.getElementById('goal-snapshot');
if (goalsEl) {
  goalsEl.innerHTML = state.goals.map((g) => {
    const p = Math.round((g.saved / g.target) * 100);
    return `<div style="margin-bottom:.9rem"><div class="bar-row"><span><b>${esc(g.name)}</b></span><span>${money(g.saved)} of ${money(g.target)} · ${p}%</span></div><div class="bar"><i style="width:${p}%"></i></div></div>`;
  }).join('') + `<p><a href="goals.html">Open savings goals →</a></p>`;
}
