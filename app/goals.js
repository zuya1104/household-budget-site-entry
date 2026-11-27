// HomeLedger goals — what the household is saving toward. The "add"
// buttons move money into a goal at once and the progress bar, the amount
// saved and the months-to-go figure all update with it.

import { HOUSEHOLD } from './data.js';
import { esc, money } from './format.js';
import { contribute, state, totalIncome, totalSpent } from './store.js';

document.querySelectorAll('[data-month]').forEach((el) => {
  el.textContent = HOUSEHOLD.month;
});

const listEl = document.getElementById('goal-list');
const summaryEl = document.getElementById('goal-summary');

function render() {
  const monthlySave = Math.max(totalIncome() - totalSpent(), 0);
  const totalSaved = state.goals.reduce((s, g) => s + g.saved, 0);
  const totalTarget = state.goals.reduce((s, g) => s + g.target, 0);
  summaryEl.innerHTML = `<b>${money(totalSaved)}</b> saved toward <b>${money(totalTarget)}</b> of goals · at November's pace of <b>${money(monthlySave)}</b> a month, the next goal lands in about <b>${Math.max(Math.ceil((state.goals.find((g) => g.saved < g.target)?.target - state.goals.find((g) => g.saved < g.target)?.saved ?? 0) / Math.max(monthlySave, 1)), 0)} month(s)</b>`;

  listEl.innerHTML = state.goals.map((g) => {
    const p = Math.round((g.saved / g.target) * 100);
    const left = g.target - g.saved;
    const months = left <= 0 ? 0 : Math.ceil(left / Math.max(monthlySave, 1));
    return `<article class="card" style="margin-bottom:1rem">
      <div class="goal-head"><h3>${esc(g.name)}</h3><span class="pill ${left <= 0 ? '' : 'neutral'}">${left <= 0 ? 'Reached' : money(left) + ' to go'}</span></div>
      <p class="muted">${esc(g.note)}</p>
      <div class="bar-row"><span><b>${money(g.saved)}</b> of ${money(g.target)}</span><span>${p}% · about ${months} month${months === 1 ? '' : 's'} left at this pace</span></div>
      <div class="bar"><i style="width:${Math.min(p, 100)}%"></i></div>
      <div class="goal-actions">
        <span class="small muted" style="align-self:center">Add to this goal:</span>
        ${[50, 100, 250].map((a) => `<button type="button" class="small-btn" data-goal="${g.id}" data-amount="${a}">+$${a}</button>`).join('')}
      </div>
    </article>`;
  }).join('');

  listEl.querySelectorAll('button[data-goal]').forEach((btn) => {
    btn.addEventListener('click', () => {
      contribute(btn.dataset.goal, Number(btn.dataset.amount));
      render();
    });
  });
}

render();
