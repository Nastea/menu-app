import type { EventFormState } from "@/types/event";
import { computeTotals, getSelectedMenuItems } from "@/lib/calculations";
import { formatEuro, formatMoney } from "@/lib/format";
import {
  getBarPackageContents,
  getBarPackageLabel,
  getNonAlcoholPackageContents,
  getNonAlcoholPackageLabel,
} from "@/data/bar-packages";
import { getCandyBarPastryLabel } from "@/data/candy-bar-catalog";
import { SAVORY_PLATTER_STANDARD_LINES } from "@/data/savory-platter-standard";

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

export function buildPrintHtml(state: EventFormState): string {
  const selectedMenu = getSelectedMenuItems(state);
  const totals = computeTotals(state);
  const createdAt = new Date().toLocaleString("ro-RO");
  const servicePct = Math.round(totals.mainMenuServiceFeePercent * 100);

  const menuRows = selectedMenu
    .map(
      (item) => `
        <tr>
          <td>${esc(item.categoryName)}</td>
          <td>${esc(item.itemName || "—")}</td>
          <td>${esc(item.quantityOrWeight || "—")}</td>
          <td class="num">${esc(formatMoney(item.adultPrice || 0))}</td>
          <td class="num">${item.kidsIncluded ? "DA" : "NU"}</td>
          <td class="num">${item.staffIncluded ? "DA" : "NU"}</td>
        </tr>
      `,
    )
    .join("");
  const specialKidsRow =
    (state.childrenSpecial || 0) > 0
      ? `<tr>
          <td><strong>Copii special</strong></td>
          <td><strong>Meniu special copii</strong></td>
          <td><strong>${state.childrenSpecial} porții</strong></td>
          <td class="num"><strong>${esc(formatMoney(totals.childrenSpecialTotal))}</strong></td>
          <td class="num"><strong>DA</strong></td>
          <td class="num"><strong>NU</strong></td>
        </tr>`
      : "";

  const notesRows = state.notes
    .map((n) => n.text.trim())
    .filter(Boolean)
    .map((line) => `<li>${esc(line)}</li>`)
    .join("");

  const barContentsRows = getBarPackageContents(state.barPackageId)
    .map((line) => `<li>${esc(line)}</li>`)
    .join("");
  const nonAlcoholContentsRows = getNonAlcoholPackageContents(state.nonAlcoholPackageId)
    .map((line) => `<li>${esc(line)}</li>`)
    .join("");
  const candyContentsRows = state.candyBar.picks
    .map((id) => getCandyBarPastryLabel(id))
    .filter((name) => name !== "—")
    .map((name) => `<li>${esc(name)}</li>`)
    .join("");
  const savoryContentsRows = SAVORY_PLATTER_STANDARD_LINES.map((line) => `<li>${esc(line.label)}</li>`).join("");

  return `<!doctype html>
<html lang="ro">
<head>
  <meta charset="utf-8" />
  <title>Ofertă eveniment</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 24px; color: #111; }
    h1 { font-size: 20px; margin: 0 0 12px; }
    h2 { font-size: 14px; margin: 16px 0 6px; text-transform: uppercase; letter-spacing: .03em; }
    p, li, td, th { font-size: 12px; line-height: 1.35; }
    .muted { color: #666; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; }
    .card { border: 1px solid #ddd; border-radius: 8px; padding: 10px; }
    table { width: 100%; border-collapse: collapse; margin-top: 6px; }
    th, td { border-bottom: 1px solid #eee; padding: 6px; text-align: left; vertical-align: top; }
    th { background: #f7f7f7; }
    .num { text-align: right; white-space: nowrap; }
    .totals td { border-bottom: none; padding: 3px 0; }
    @page { size: A4; margin: 14mm; }
  </style>
</head>
<body>
  <h1>Ofertă eveniment</h1>
  <p class="muted">Generat la: ${esc(createdAt)}</p>
  <div class="grid">
    <div class="card">
      <h2>Date principale</h2>
      <p><strong>Restaurant:</strong> ${esc(formatRestaurant(state.restaurant))}</p>
      <p><strong>Sală:</strong> ${esc(state.voyageHall || "—")}</p>
      <p><strong>Data:</strong> ${esc(state.date || "—")}</p>
      <p><strong>Client:</strong> ${esc(state.client || "—")}</p>
      <p><strong>Telefon:</strong> ${esc(state.phone || "—")}</p>
      <p><strong>Adulți:</strong> ${state.adults || 0} · <strong>Copii:</strong> ${state.children || 0}</p>
      <p><strong>Staff:</strong> ${state.staff || 0}</p>
    </div>
    <div class="card">
      <h2>Servicii extra</h2>
      <p><strong>Cafea:</strong> ${state.coffeeEnabled ? "Da" : "Nu"}</p>
      <p><strong>Furșet fructe:</strong> ${state.fruitPlatterPortions || 0} porții</p>
      <p><strong>Bar:</strong> ${state.barEnabled ? esc(getBarPackageLabel(state.barPackageId)) : "Nu"}</p>
      <p><strong>Non-alcoolic:</strong> ${state.nonAlcoholEnabled ? esc(getNonAlcoholPackageLabel(state.nonAlcoholPackageId)) : "Nu"}</p>
      <p><strong>Candy Bar:</strong> ${state.candyBar.enabled ? "Da" : "Nu"}</p>
      <p><strong>Furșet sărat:</strong> ${
        state.savoryPlatter.enabled ? `${state.savoryPlatter.numberOfPortions || 0} porții` : "Nu"
      }</p>
      <p><strong>Decor:</strong> ${esc(state.decorSource === "external" ? "Extern" : "Intern")}</p>
      ${
        state.decorSource === "external"
          ? `<p><strong>Mese decor extern:</strong> ${state.externalTableCount || 0}</p>`
          : ""
      }
    </div>
  </div>

  <h2>Meniu selectat</h2>
  ${
    selectedMenu.length === 0
      ? `<p class="muted">Nu există feluri selectate.</p>`
      : `<table>
          <thead>
            <tr><th>Categorie</th><th>Fel</th><th>Gramaj</th><th class="num">Preț adult</th><th class="num">Copii</th><th class="num">Staff</th></tr>
          </thead>
          <tbody>${menuRows}${specialKidsRow}</tbody>
        </table>`
  }

  <h2>Totaluri</h2>
  <div class="card">
    <table class="totals">
      <tr><td>Meniu / adult</td><td class="num">${esc(formatMoney(totals.menuPerAdult))}</td></tr>
      <tr><td>Meniu total</td><td class="num">${esc(formatMoney(totals.menuTotal))}</td></tr>
      <tr><td>Meniu / copil (50%)</td><td class="num">${esc(formatMoney(totals.menuPerChild))}</td></tr>
      <tr><td>Copii total</td><td class="num">${esc(formatMoney(totals.childrenTotal))}</td></tr>
      <tr><td>Meniu / staff (50%)</td><td class="num">${esc(formatMoney(totals.menuPerStaff))}</td></tr>
      <tr><td>Staff total</td><td class="num">${esc(formatMoney(totals.staffTotal))}</td></tr>
      <tr><td>Copii special (350 MDL)</td><td class="num">${esc(formatMoney(totals.childrenSpecialTotal))}</td></tr>
      <tr><td>Taxă meniu principal (${servicePct}%)</td><td class="num">${esc(formatMoney(totals.mainMenuServiceFeeTotal))}</td></tr>
      <tr><td>Extra-uri</td><td class="num">${esc(formatMoney(totals.extrasTotal))}</td></tr>
      <tr><td>Fețe de masă colorate</td><td class="num">${esc(formatMoney(totals.coloredTableclothsTotal))}</td></tr>
      <tr><td>Decor intern (EUR)</td><td class="num">${esc(formatEuro(totals.decorInternalEuro))}</td></tr>
      <tr><td>Subtotal</td><td class="num">${esc(formatMoney(totals.subtotal))}</td></tr>
      <tr><td>Comision card (2%)</td><td class="num">${esc(formatMoney(totals.cardFeeTotal))}</td></tr>
      <tr><td><strong>Total</strong></td><td class="num"><strong>${esc(formatMoney(totals.total))}</strong></td></tr>
      <tr><td>Avans total</td><td class="num">${esc(formatMoney(totals.advancesTotal))}</td></tr>
        <tr><td><strong>Rest de achitat</strong></td><td class="num"><strong>${esc(formatMoney(totals.remaining))}${totals.decorInternalEuro > 0 ? ` + ${esc(formatEuro(totals.decorInternalEuro))}` : ""}</strong></td></tr>
    </table>
  </div>

  <h2>Detalii servicii extra</h2>
  <div class="grid-3">
    <div class="card">
      <p><strong>Bar</strong></p>
      ${
        state.barEnabled && barContentsRows
          ? `<ul>${barContentsRows}</ul>`
          : `<p class="muted">Fără conținut selectat.</p>`
      }
    </div>
    <div class="card">
      <p><strong>Candy Bar</strong></p>
      ${
        state.candyBar.enabled && candyContentsRows
          ? `<ul>${candyContentsRows}</ul>`
          : `<p class="muted">Fără selecții.</p>`
      }
    </div>
    <div class="card">
      <p><strong>Furșet sărat</strong></p>
      ${
        state.savoryPlatter.enabled
          ? `<ul>${savoryContentsRows}</ul>`
          : `<p class="muted">Inactiv.</p>`
      }
    </div>
  </div>
  ${
    state.nonAlcoholEnabled
      ? `<div class="card" style="margin-top:12px;">
          <p><strong>Non-alcoolic</strong></p>
          ${nonAlcoholContentsRows ? `<ul>${nonAlcoholContentsRows}</ul>` : `<p class="muted">Fără conținut selectat.</p>`}
        </div>`
      : ""
  }

  <div class="card">
    <h2>Note</h2>
    ${notesRows ? `<ul>${notesRows}</ul>` : `<p class="muted">Fără note.</p>`}
  </div>
</body>
</html>`;
}
