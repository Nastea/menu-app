import type { EventFormState } from "@/types/event";

/** Rezultat sumar totaluri — logica completă vine la pasul „calcule”. */
export type TotalsSnapshot = {
  subtotal: number;
  total: number;
};

export function computeTotals(state: EventFormState): TotalsSnapshot {
  void state;
  return { subtotal: 0, total: 0 };
}
