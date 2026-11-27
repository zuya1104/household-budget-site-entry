// HomeLedger seed data — the Alvarez household, November 2026.
//
// Every figure on the site is computed from this file: the dashboard totals,
// the budget bars, the transaction ledger and the reports chart all read
// the same transactions, so the numbers can never disagree with each other.
// Amounts are US dollars. Editing a budget or adding a transaction in the
// browser updates the stored copy (see store.js); this file is the reset.

export const HOUSEHOLD = {
  name: 'The Alvarez Family',
  members: 'Maya & Daniel Alvarez, Sofia (9) and Leo (6)',
  month: 'November 2026',
  monthShort: 'Nov 2026',
  currency: 'USD',
};

export const INCOME = [
  { date: '2026-11-01', source: 'Maya Alvarez — teaching salary', amount: 2300 },
  { date: '2026-11-08', source: 'Daniel Alvarez — electrician pay', amount: 1625 },
  { date: '2026-11-15', source: 'Maya Alvarez — teaching salary', amount: 2300 },
  { date: '2026-11-22', source: 'Daniel Alvarez — electrician pay', amount: 1625 },
];

// Monthly plan per category. "spent" is computed from TRANSACTIONS below.
export const CATEGORIES = [
  { id: 'housing', name: 'Housing', planned: 1950, color: '#2e7d4f' },
  { id: 'groceries', name: 'Groceries', planned: 800, color: '#d9a441' },
  { id: 'dining', name: 'Dining Out', planned: 320, color: '#c96f3f' },
  { id: 'transport', name: 'Transport', planned: 380, color: '#3a6ea5' },
  { id: 'utilities', name: 'Utilities', planned: 300, color: '#7a5fa0' },
  { id: 'health', name: 'Health', planned: 210, color: '#4a9e8f' },
  { id: 'kids', name: 'Kids & School', planned: 650, color: '#b3402e' },
  { id: 'entertainment', name: 'Entertainment', planned: 160, color: '#8a6d3b' },
  { id: 'shopping', name: 'Shopping', planned: 380, color: '#5b7a3a' },
  { id: 'personal', name: 'Personal & Other', planned: 260, color: '#8a8f98' },
];

// Every household expense in November 2026, newest first in the ledger.
export const TRANSACTIONS = [
  { date: '2026-11-28', merchant: 'Tech Outlet', note: 'Headphones, Black Friday', category: 'shopping', amount: 189.99 },
  { date: '2026-11-27', merchant: 'Olive Garden', note: 'Family dinner', category: 'dining', amount: 84.5 },
  { date: '2026-11-26', merchant: 'GreenMart', note: 'Thanksgiving shop', category: 'groceries', amount: 168.4 },
  { date: '2026-11-25', merchant: 'Car insurance — Beacon Auto', note: 'Monthly premium', category: 'transport', amount: 112 },
  { date: '2026-11-25', merchant: 'Science Museum', note: 'School field trip', category: 'kids', amount: 28 },
  { date: '2026-11-24', merchant: 'The Hollow Notes', note: 'Concert tickets', category: 'entertainment', amount: 65 },
  { date: '2026-11-24', merchant: 'Daily Grind', note: 'Coffee & bagels', category: 'dining', amount: 18.4 },
  { date: '2026-11-23', merchant: 'Shell', note: 'Gas', category: 'transport', amount: 48 },
  { date: '2026-11-23', merchant: 'Corner Store', note: 'Batteries, tape, odds & ends', category: 'personal', amount: 37.25 },
  { date: '2026-11-22', merchant: 'FreshCo Market', note: 'Weekly shop', category: 'groceries', amount: 74.9 },
  { date: '2026-11-21', merchant: 'Thai Orchid', note: 'Takeout dinner', category: 'dining', amount: 64.8 },
  { date: '2026-11-21', merchant: 'Toy Chest', note: 'Board game for family night', category: 'entertainment', amount: 24.95 },
  { date: '2026-11-20', merchant: 'NorthTel', note: 'Mobile plan', category: 'utilities', amount: 52 },
  { date: '2026-11-20', merchant: 'Gift Corner', note: 'Holiday gifts, first batch', category: 'personal', amount: 120 },
  { date: '2026-11-19', merchant: 'Stride Footwear', note: 'Leo’s winter shoes', category: 'shopping', amount: 89.99 },
  { date: '2026-11-19', merchant: 'Rideshare', note: 'Ride home from downtown', category: 'transport', amount: 18.5 },
  { date: '2026-11-18', merchant: 'GreenMart', note: 'Weekly shop', category: 'groceries', amount: 121.55 },
  { date: '2026-11-18', merchant: 'FixIt Plumbing', note: 'Leaky kitchen tap', category: 'housing', amount: 145 },
  { date: '2026-11-18', merchant: 'Youth Soccer League', note: 'Sofia’s winter season fee', category: 'kids', amount: 85 },
  { date: '2026-11-17', merchant: 'FitLife Gym', note: 'Monthly membership', category: 'health', amount: 45 },
  { date: '2026-11-16', merchant: 'Sharp Looks Salon', note: 'Daniel’s haircut', category: 'personal', amount: 20 },
  { date: '2026-11-16', merchant: 'Downtown Garage', note: 'Parking', category: 'transport', amount: 24 },
  { date: '2026-11-15', merchant: 'Nest & Nook', note: 'Curtains, kitchen towels', category: 'shopping', amount: 54.3 },
  { date: '2026-11-15', merchant: 'Burger Joint', note: 'Lunch with the kids', category: 'dining', amount: 29.9 },
  { date: '2026-11-14', merchant: 'Corner Market', note: 'Weekly shop', category: 'groceries', amount: 87.3 },
  { date: '2026-11-14', merchant: 'School Bookstore', note: 'Workbooks for Sofia', category: 'kids', amount: 42.9 },
  { date: '2026-11-14', merchant: 'Cineplex', note: 'Movie night, four tickets', category: 'entertainment', amount: 38 },
  { date: '2026-11-13', merchant: 'Bright Smile Dental', note: 'Leo’s checkup', category: 'health', amount: 120 },
  { date: '2026-11-12', merchant: 'City Water', note: 'Water bill', category: 'utilities', amount: 46.2 },
  { date: '2026-11-12', merchant: 'Sushi Yama', note: 'Dinner out', category: 'dining', amount: 56.2 },
  { date: '2026-11-12', merchant: 'Pet Pantry', note: 'Dog food & treats', category: 'personal', amount: 52.4 },
  { date: '2026-11-11', merchant: 'Shell', note: 'Gas', category: 'transport', amount: 52 },
  { date: '2026-11-10', merchant: 'GreenMart', note: 'Weekly shop', category: 'groceries', amount: 132.75 },
  { date: '2026-11-10', merchant: 'Bright Kids Club', note: 'After-school care, November', category: 'kids', amount: 420 },
  { date: '2026-11-09', merchant: 'Sharp Looks Salon', note: 'Maya’s haircut', category: 'personal', amount: 48 },
  { date: '2026-11-09', merchant: 'City Transit', note: 'Monthly bus passes', category: 'transport', amount: 85 },
  { date: '2026-11-08', merchant: 'FiberNet', note: 'Internet bill', category: 'utilities', amount: 65 },
  { date: '2026-11-08', merchant: 'Thread & Co.', note: 'Winter coats for the kids', category: 'shopping', amount: 68 },
  { date: '2026-11-07', merchant: 'Pizza Napoli', note: 'Friday pizza night', category: 'dining', amount: 38.75 },
  { date: '2026-11-07', merchant: 'StreamFlix', note: 'Monthly streaming', category: 'entertainment', amount: 15.99 },
  { date: '2026-11-06', merchant: 'FreshCo Market', note: 'Weekly shop', category: 'groceries', amount: 96.4 },
  { date: '2026-11-06', merchant: 'Riverside Pharmacy', note: 'Prescriptions & vitamins', category: 'health', amount: 34.6 },
  { date: '2026-11-05', merchant: 'City Power', note: 'Electricity bill', category: 'utilities', amount: 128.4 },
  { date: '2026-11-04', merchant: 'Shell', note: 'Gas', category: 'transport', amount: 45 },
  { date: '2026-11-04', merchant: 'Lincoln Elementary', note: 'School lunches, November', category: 'kids', amount: 65 },
  { date: '2026-11-03', merchant: 'Beacon Home Insurance', note: 'Monthly premium', category: 'housing', amount: 95 },
  { date: '2026-11-03', merchant: 'Taqueria Luna', note: 'Taco Tuesday', category: 'dining', amount: 42.5 },
  { date: '2026-11-02', merchant: 'GreenMart', note: 'Weekly shop', category: 'groceries', amount: 148.2 },
  { date: '2026-11-01', merchant: 'Maple Court Apartments', note: 'November rent', category: 'housing', amount: 1750 },
];

// Bills already scheduled for December, so nothing slips past.
export const BILLS = [
  { name: 'Rent — Maple Court Apartments', due: 'Dec 1', amount: 1750 },
  { name: 'Electricity — City Power', due: 'Dec 5', amount: 128.4 },
  { name: 'Internet — FiberNet', due: 'Dec 8', amount: 65 },
  { name: 'Water — City Water', due: 'Dec 12', amount: 46.2 },
  { name: 'Gym — FitLife', due: 'Dec 15', amount: 45 },
  { name: 'Mobile — NorthTel', due: 'Dec 18', amount: 52 },
  { name: 'Home insurance — Beacon', due: 'Dec 20', amount: 95 },
];

// What the household is saving toward.
export const GOALS = [
  { id: 'emergency', name: 'Emergency fund', note: 'Six months of essentials, for peace of mind.', target: 12000, saved: 8450 },
  { id: 'vacation', name: 'Family vacation — Lake Tahoe', note: 'A week by the lake next summer.', target: 3500, saved: 2100 },
  { id: 'car', name: 'New car down payment', note: 'Replacing the old sedan in 2027.', target: 8000, saved: 3200 },
];

// Past months for the trend chart (income and spending per month).
export const HISTORY = [
  { month: 'Jun', income: 7700, spent: 5280 },
  { month: 'Jul', income: 7850, spent: 5610 },
  { month: 'Aug', income: 7850, spent: 5490 },
  { month: 'Sep', income: 7850, spent: 5175 },
  { month: 'Oct', income: 7700, spent: 5340 },
];
