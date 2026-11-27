// HomeLedger budgets — the monthly plan per category against what the
// household actually spent. A budget can be edited in place; the bar, the
// remaining amount and the month totals update at once.

import { HOUSEHOLD } from './data.js';
import { esc, money, pct } from './format.js';
import { categoryRows, setBudget, totalPlanned, totalSpent } from './store.js';

document.querySelectorAll('[data-month]').forEach((el) => {
  el.textContent = HOUSEHOLD.month;
});

const listEl = document.getElementById('budget-list');
const summaryEl = document.getElementById('budget-summary');

function statusOf(row) {
  if (row.spent > row.planned) return { label: `${money(row.spent - row.planned)} over`, pill: 'over', bar: 'over' };
  if (row.spent / row.planned >= 0.9) return { label: `${money(row.left)} left — nearly there`, pill: 'warn', bar: 'warn' };
  return { label: `${money(row.left)} left`, pill: '', bar: '' };
}

function render() {
  const rows = categoryRows();
  const spent = totalSpent();
  const planned = totalPlanned();
  summaryEl.innerHTML = `<b>${money(spent)}</b> spent of <b>${money(planned)}</b> planned · <b class="${spent > planned ? 'neg' : 'pos'}">${spent > planned ? money(spent - planned) + ' over plan' : money(planned - spent) + ' under plan'}</b> · ${rows.filter((r) => r.spent > r.planned).length} of ${rows.length} categories over budget`;

  listEl.innerHTML = rows.map((r) => {
    const st = statusOf(r);
    const width = Math.min(Math.round((r.spent / r.planned) * 100), 100);
    return `<article class="card" style="margin-bottom:1rem">
      <div class="goal-head"><h3><span class="cat-dot" style="background:${r.color}"></span>${esc(r.name)}</h3><span class="pill ${st.pill}">${st.label}</span></div>
      <div class="bar-row"><span><b>${money(r.spent)}</b> spent of ${money(r.planned)} planned</span><span>${pct(r.spent, r.planned)} used</span></div>
      <div class="bar ${st.bar}"><i style="width:${width}%"></i></div>
      <form class="inline-form budget-edit" data-category="${r.id}" style="margin-top:.7rem">
        <label class="field">Monthly plan ($)<input type="number" min="0" step="5" value="${r.planned}" required></label>
        <button type="submit" class="small-btn ghost">Save plan</button>
      </form>
    </article>`;
  }).join('');

  listEl.querySelectorAll('.budget-edit').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const input = form.querySelector('input');
      const value = Number(input.value);
      if (!(value >= 0)) return;
      setBudget(form.dataset.category, value);
      render();
    });
  });
}

render();
