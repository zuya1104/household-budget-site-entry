// HomeLedger charts — small SVG builders with no library behind them.
// The dashboard donut and the reports trend bars are plain SVG strings,
// so they render identically on desktop and on a phone.

import { money, moneyShort } from './format.js';

// Donut of spending by category. Each slice is a circle with a dash gap;
// the centre label shows the total spent.
export function donut(rows, size = 190) {
  const total = rows.reduce((sum, r) => sum + r.spent, 0);
  const radius = 80;
  const circ = 2 * Math.PI * radius;
  let offset = 0;
  const slices = rows
    .filter((r) => r.spent > 0)
    .map((r) => {
      const frac = r.spent / total;
      const dash = `${Math.max(frac * circ - 2, 0)} ${circ}`;
      const el = `<circle cx="100" cy="100" r="${radius}" fill="none" stroke="${r.color}" stroke-width="26" stroke-dasharray="${dash}" stroke-dashoffset="${-offset}" />`;
      offset += frac * circ;
      return el;
    })
    .join('');
  return `<svg class="donut" width="${size}" height="${size}" viewBox="0 0 200 200" role="img" aria-label="Spending by category, total ${money(total)}">
    ${slices}
    <text x="100" y="94" text-anchor="middle" font-size="15" fill="#75806f">Spent in Nov</text>
    <text x="100" y="118" text-anchor="middle" font-size="22" font-weight="800" fill="#263024">${moneyShort(total)}</text>
  </svg>`;
}

// Grouped bars: income vs spending for each month in HISTORY plus November.
export function trendBars(months, width = 640, height = 260) {
  const max = Math.max(...months.flatMap((m) => [m.income, m.spent])) * 1.08;
  const padLeft = 52;
  const padBottom = 26;
  const plotW = width - padLeft - 8;
  const plotH = height - padBottom - 8;
  const groupW = plotW / months.length;
  const barW = Math.min(26, (groupW - 18) / 2);
  const y = (v) => 4 + plotH - (v / max) * plotH;

  const grid = [0.25, 0.5, 0.75, 1].map((f) => {
    const gy = 4 + plotH - f * plotH;
    return `<line x1="${padLeft}" y1="${gy}" x2="${width - 8}" y2="${gy}" stroke="#e6dfcb" stroke-width="1" />
      <text x="${padLeft - 8}" y="${gy + 4}" text-anchor="end" font-size="11" fill="#75806f">${moneyShort(max * f)}</text>`;
  }).join('');

  const bars = months.map((m, i) => {
    const cx = padLeft + i * groupW + groupW / 2;
    return `<rect x="${cx - barW - 3}" y="${y(m.income)}" width="${barW}" height="${4 + plotH - y(m.income)}" rx="3" fill="#2e7d4f" />
      <rect x="${cx + 3}" y="${y(m.spent)}" width="${barW}" height="${4 + plotH - y(m.spent)}" rx="3" fill="#c96f3f" />
      <text x="${cx}" y="${height - 8}" text-anchor="middle" font-size="12" fill="#4c564a">${m.month}</text>`;
  }).join('');

  return `<svg width="100%" viewBox="0 0 ${width} ${height}" role="img" aria-label="Monthly income versus spending, June to November 2026">
    ${grid}${bars}
  </svg>
  <p class="small muted"><span style="color:#2e7d4f">■</span> Income &nbsp; <span style="color:#c96f3f">■</span> Spending</p>`;
}
