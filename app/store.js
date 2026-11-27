// HomeLedger store — loads the seed data, keeps the household's edits,
// and derives every total the pages show from the same transactions.
//
// Edits (a new transaction, a changed budget, a goal contribution) are kept
// in localStorage when the browser allows it and fall back to memory when
// it does not, so the site works the same on the hosted copy, where
// cookies are blocked but storage is not required to function.

import { CATEGORIES, GOALS, INCOME, TRANSACTIONS } from './data.js';

const KEY = 'homeledger-v1';

function loadStored() {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveStored(state) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // Storage unavailable (private mode, hosted sandbox): keep it in memory.
  }
}

const stored = loadStored() ?? {};

export const state = {
  transactions: stored.transactions ?? TRANSACTIONS.map((t) => ({ ...t })),
  budgets: stored.budgets ?? Object.fromEntries(CATEGORIES.map((c) => [c.id, c.planned])),
  goals: stored.goals ?? GOALS.map((g) => ({ ...g })),
};

export function save() {
  saveStored({
    transactions: state.transactions,
    budgets: state.budgets,
    goals: state.goals,
  });
}

export function resetAll() {
  state.transactions = TRANSACTIONS.map((t) => ({ ...t }));
  state.budgets = Object.fromEntries(CATEGORIES.map((c) => [c.id, c.planned]));
  state.goals = GOALS.map((g) => ({ ...g }));
  save();
}

// ---- derived figures: every page reads these, never its own sums ----

export function totalIncome() {
  return INCOME.reduce((sum, p) => sum + p.amount, 0);
}

export function totalSpent() {
  return state.transactions.reduce((sum, t) => sum + t.amount, 0);
}

export function totalPlanned() {
  return CATEGORIES.reduce((sum, c) => sum + (state.budgets[c.id] ?? c.planned), 0);
}

export function spentByCategory(id) {
  return state.transactions
    .filter((t) => t.category === id)
    .reduce((sum, t) => sum + t.amount, 0);
}

export function categoryRows() {
  return CATEGORIES.map((c) => {
    const spent = spentByCategory(c.id);
    const planned = state.budgets[c.id] ?? c.planned;
    return { ...c, spent, planned, left: planned - spent };
  }).sort((a, b) => b.spent - a.spent);
}

export function topCategory() {
  return categoryRows()[0];
}

export function addTransaction(tx) {
  state.transactions.unshift(tx);
  save();
}

export function setBudget(id, planned) {
  state.budgets[id] = planned;
  save();
}

export function contribute(goalId, amount) {
  const goal = state.goals.find((g) => g.id === goalId);
  if (!goal) return;
  goal.saved = Math.min(goal.target, goal.saved + amount);
  save();
}
