// HomeLedger reports — six months of income against spending, the biggest
// expenses of November, and the insights the numbers point to. The chart
// and the insights are computed from the same data as the other pages.

import { HISTORY, HOUSEHOLD } from './data.js';
import { esc, money, pct, shortDate } from './format.js';
import { categoryRows, state, totalIncome, totalSpent } from './store.js';
import { trendBars } from './charts.js';

document.querySelectorAll('[data-month]').forEach((el) => {
  el.textContent = HOUSEHOLD.month;
});

const income = totalIncome();
const spent = totalSpent();
const months = [...HISTORY, { month: 'Nov', income, spent }];

const chartEl = document.getElementById('trend-chart');
if (chartEl) chartEl.innerHTML = trendBars(months);

const avgSpent = Math.round(months.reduce((s, m) => s + m.spent, 0) / months.length);
const avgSaved = Math.round(months.reduce((s, m) => s + (m.income - m.spent), 0) / months.length);
const bestMonth = months.reduce((best, m) => ((m.income - m.spent) > (best.income - best.spent) ? m : best), months[0]);

const insights = document.getElementById('insights');
if (insights) {
  const rows = categoryRows();
  const over = rows.filter((r) => r.spent > r.planned);
  const top = rows[0];
  insights.innerHTML = `
    <div class="insight green"><b>Saved ${money(income - spent)} in November</b> — ${pct(income - spent, income)} of income, against a six-month average of ${money(avgSaved)} a month. The household keeps more than a quarter of what it earns.</div>
    <div class="insight ${over.length ? 'red' : 'green'}"><b>${over.length ? `${over.length} categories ran over plan` : 'No category ran over plan'}</b> — ${over.length ? over.map((r) => `${esc(r.name)} by ${money(r.spent - r.planned)}`).join(', ') + '. The plan for next month should give these a little more room.' : 'every category stayed inside its November plan.'}</div>
    <div class="insight"><b>${esc(top.name)} is the biggest cost</b> at ${money(top.spent)} (${pct(top.spent, spent)} of November spending). Housing, groceries and kids &amp; school together are ${money(rows.slice(0, 3).reduce((s, r) => s + r.spent, 0))} — most of the month goes to keeping the household running.</div>
    <div class="insight green"><b>Best saving month: ${esc(bestMonth.month)}</b> — ${money(bestMonth.income - bestMonth.spent)} kept, while November's spending of ${money(spent)} sits ${spent > avgSpent ? money(spent - avgSpent) + ' above' : money(avgSpent - spent) + ' below'} the six-month average of ${money(avgSpent)}.</div>`;
}

const biggest = document.getElementById('biggest-rows');
if (biggest) {
  biggest.innerHTML = [...state.transactions]
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 8)
    .map((t) => {
      const cat = categoryRows().find((r) => r.id === t.category);
      return `<tr><td>${shortDate(t.date)}</td><td><b>${esc(t.merchant)}</b><br><span class="muted small">${esc(t.note)}</span></td><td>${esc(cat ? cat.name : t.category)}</td><td class="num money">${money(t.amount)}</td></tr>`;
    }).join('');
}

const catTable = document.getElementById('category-rows');
if (catTable) {
  catTable.innerHTML = categoryRows().map((r) => `<tr><td><span class="cat-dot" style="background:${r.color}"></span>${esc(r.name)}</td><td class="num">${money(r.planned)}</td><td class="num">${money(r.spent)}</td><td class="num ${r.left < 0 ? 'neg' : 'pos'}">${money(r.left)}</td><td class="num">${pct(r.spent, spent)}</td></tr>`).join('')
    + `<tr><td><b>Total</b></td><td class="num"><b>${money(categoryRows().reduce((s, r) => s + r.planned, 0))}</b></td><td class="num"><b>${money(spent)}</b></td><td class="num"><b>${money(categoryRows().reduce((s, r) => s + r.planned, 0) - spent)}</b></td><td class="num"><b>100%</b></td></tr>`;
}
