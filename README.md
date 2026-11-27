[![best-household-budget-site-20261126-1457](https://make.fun/badge/best-household-budget-site-20261126-1457.svg)](https://make.fun/bounty/best-household-budget-site-20261126-1457?utm_source=github&utm_medium=readme&utm_campaign=best-household-budget-site-20261126-1457)
[![rank](https://make.fun/badge/best-household-budget-site-20261126-1457/zuya1104/household-budget-site-entry/rank.svg)](https://make.fun/bounty/best-household-budget-site-20261126-1457/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-household-budget-site-20261126-1457)
[![reward](https://make.fun/badge/best-household-budget-site-20261126-1457/zuya1104/household-budget-site-entry/reward.svg)](https://make.fun/bounty/best-household-budget-site-20261126-1457?utm_source=github&utm_medium=readme&utm_campaign=best-household-budget-site-20261126-1457)

# HomeLedger — Household Budget Site

A working household budget site for the Alvarez family, November 2026.
Five pages, all linked from the header, all with real figures and working
controls — nothing empty, broken or placeholder:

- **Dashboard** — income, spending, savings and plan-remaining tiles; a
  spending-by-category donut; the newest transactions; December bills coming
  up; savings goals at a glance.
- **Transactions** — the full 49-transaction November ledger, filterable by
  category or merchant search, with a working add-transaction form.
- **Budgets** — the monthly plan per category against actual spending, with
  progress bars and editable plans that update the whole site.
- **Goals** — emergency fund, family vacation and car down payment, with
  working contribute buttons and months-to-go at the current saving pace.
- **Reports** — six months of income vs spending as a chart, the biggest
  expenses of November, and insights computed from the numbers.

Every figure comes from one seed file (`app/data.js`) and is derived by
`app/store.js`, so the dashboard, budgets, ledger and reports can never
disagree. Edits are kept in localStorage (with an in-memory fallback) so
the site works the same when hosted.

## Run it

```sh
node serve.ts   # serves app/ at http://localhost:8080
```

Open `app/index.html` in desktop Chrome or on a phone. No build step, no
network requests: every script, stylesheet and image is a file under `app/`.

## Hand in

`main.ts` (Node 22, standard library only) copies `app/` and `screenshots/`
to `/output` and writes `/output/dossier.json` with the vendored make.fun
library (`vendor/makefun-frontend.ts`, unchanged from the kit):

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

Screenshots are real renders of the site's own code: the dashboard, the
transaction ledger, the budgets page, and the dashboard at a phone's size.

## Layout

- `main.ts` — hand-in program
- `serve.ts` — tiny static server for local testing
- `app/index.html`, `app/transactions.html`, `app/budgets.html`,
  `app/goals.html`, `app/reports.html` — the five pages
- `app/style.css` — the whole design system
- `app/data.js` — the household's seed data (one source of truth)
- `app/store.js` — state, persistence and every derived total
- `app/format.js` — money and date formatting
- `app/charts.js` — SVG donut and trend-bar builders
- `app/dashboard.js`, `app/transactions.js`, `app/budgets.js`,
  `app/goals.js`, `app/reports.js` — one script per page
- `screenshots/` — 4 real renders of the site
- `vendor/makefun-frontend.ts` — make.fun dossier library (kit copy)

License: MIT. Built for the make.fun bounty
[best-household-budget-site-20261126-1457](https://make.fun/bounty/best-household-budget-site-20261126-1457).
