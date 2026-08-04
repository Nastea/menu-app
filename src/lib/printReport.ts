import type { EventFormState } from "@/types/event";
import type { MasaId } from "@/types/menu";
import { computeTotals, getSelectedMenuItems, type SelectedMenuItem } from "@/lib/calculations";
import { getIngredients } from "@/data/menu-ingredients";

export const PRINT_SNAPSHOT_KEY = "tesalia_print_snapshot_v1";

function esc(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatRestaurant(value: EventFormState["restaurant"]): string {
  if (value === "tesalia") return "Tesalia";
  if (value === "voyage") return "Voyage";
  return "—";
}

/** Numere afișate ca „145.00” / „1420.00” (punct zecimal, 2 zecimale), fără simbol de monedă. */
function formatLei(amount: number): string {
  return (amount || 0).toFixed(2);
}

function formatEventDate(value: string): string {
  const raw = (value || "").trim();
  if (!raw) return "—";
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(raw);
  if (match) return `${match[3]}.${match[2]}.${match[1]}`;
  return raw;
}

const MASA_LABELS: Record<MasaId, string> = {
  "1": "MASA I",
  "2": "MASA A II-A",
};

const MASA_ORDER: MasaId[] = ["1", "2"];

function effectivePrice(item: SelectedMenuItem): number {
  const factor = item.portionSize === "1/2" ? 0.5 : 1;
  return (item.adultPrice || 0) * factor;
}

function menuRow(item: SelectedMenuItem): string {
  const ingredients = getIngredients(item.itemName || "");
  const nameCell = ingredients
    ? `${esc(item.itemName || "—")}<div class="ingredients">${esc(ingredients)}</div>`
    : esc(item.itemName || "—");
  return `
        <tr>
          <td>${nameCell}</td>
          <td>${esc(item.quantityOrWeight || "—")}</td>
          <td class="num">${esc(formatLei(effectivePrice(item)))}</td>
        </tr>`;
}

function masaSection(masa: MasaId, items: SelectedMenuItem[]): string {
  if (items.length === 0) return "";
  return `
  <h2>${esc(MASA_LABELS[masa])}</h2>
  <table>
    <thead>
      <tr><th>Denumire</th><th>Gramaj</th><th class="num">Preț, lei</th></tr>
    </thead>
    <tbody>${items.map(menuRow).join("")}</tbody>
  </table>`;
}

export function buildPrintHtml(state: EventFormState): string {
  const selectedMenu = getSelectedMenuItems(state);
  const totals = computeTotals(state);

  const sections = MASA_ORDER.map((masa) =>
    masaSection(
      masa,
      selectedMenu.filter((item) => (item.masa ?? "1") === masa),
    ),
  ).join("");

  const body =
    selectedMenu.length === 0
      ? `<p class="muted">Nu există feluri selectate.</p>`
      : `${sections}
  <table class="total">
    <tbody>
      <tr><td>Total pe persoană</td><td class="num">${esc(formatLei(totals.menuPerAdult))} lei</td></tr>
    </tbody>
  </table>`;

  return `<!doctype html>
<html lang="ro">
<head>
  <meta charset="utf-8" />
  <title>Meniu selectat</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 24px; color: #111; }
    header { text-align: center; margin-bottom: 18px; }
    .brand { font-size: 22px; font-weight: 700; letter-spacing: .35em; text-transform: uppercase; }
    .subtitle { font-size: 14px; margin-top: 4px; letter-spacing: .05em; }
    .date { font-size: 12px; color: #444; margin-top: 6px; }
    h2 { font-size: 13px; margin: 18px 0 6px; text-transform: uppercase; letter-spacing: .05em; }
    td, th { font-size: 12px; line-height: 1.35; }
    .muted { color: #666; }
    .ingredients { font-size: 11px; color: #666; font-style: italic; margin-top: 2px; }
    table { width: 100%; border-collapse: collapse; margin-top: 4px; table-layout: fixed; }
    th, td { padding: 6px 8px; text-align: left; vertical-align: top; }
    thead th { border-bottom: 1px solid #d9d9d9; font-weight: 700; }
    td:nth-child(2), th:nth-child(2) { width: 26%; }
    .num { text-align: right; white-space: nowrap; width: 20%; }
    .total { margin-top: 12px; }
    .total td { font-weight: 700; border-top: 1px solid #d9d9d9; }
    @page { size: A4; margin: 14mm; }
  </style>
</head>
<body>
  <header>
    <div class="brand">${esc(formatRestaurant(state.restaurant))}</div>
    <div class="subtitle">Meniu selectat</div>
    <div class="date">Data: ${esc(formatEventDate(state.date))}</div>
  </header>
  ${body}
</body>
</html>`;
}
