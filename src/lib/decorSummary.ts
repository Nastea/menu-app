import type { EventFormState } from "@/types/event";
import { EXTERNAL_DECOR_RATE_PER_TABLE_MDL, TESALIA_INTERNAL_DECOR_EUR } from "@/types/event";
import { formatEuro } from "@/lib/format";

/** Rezumat decor pentru formular / preview (fără calcule finale de total). */
export function getDecorSummaryLines(state: EventFormState): string[] {
  if (state.decorSource === "external") {
    const n = state.externalTableCount;
    const hint =
      n > 0
        ? `Decor extern: ${n} mese × ${EXTERNAL_DECOR_RATE_PER_TABLE_MDL} MDL (total la pasul calcule).`
        : `Introdu numărul de mese; formula: externalTableCount × ${EXTERNAL_DECOR_RATE_PER_TABLE_MDL} MDL.`;
    const tableclothsLine = state.externalTableclothsFromUs
      ? "Fețe de masă: furnizate de noi."
      : "Fețe de masă: nu sunt furnizate de noi.";
    return ["Decor: sursă externă (fără sumă EUR manuală).", hint, tableclothsLine];
  }

  if (state.restaurant === "tesalia") {
    return [
      "Decor: sursă internă, restaurant Tesalia.",
      `Afișat separat: ${formatEuro(TESALIA_INTERNAL_DECOR_EUR)} (fix) — nu introduce sumă EUR în formular.`,
    ];
  }

  if (state.restaurant === "voyage") {
    return [
      "Decor: sursă internă, restaurant Voyage.",
      "Inclus gratuit — nu introduce sumă EUR în formular.",
    ];
  }

  return [
    "Decor: sursă internă.",
    "Alege restaurant (Tesalia / Voyage) pentru a afișa regula aplicabilă.",
  ];
}
