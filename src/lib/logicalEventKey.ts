import type { EventFormState } from "@/types/event";

/**
 * Cheie logică eveniment (unicitate DB ulterior):
 * - Tesalia + dată
 * - Voyage + sală + dată
 * - Extern: convenție locală până la clarificare Supabase
 */
export type LogicalEventKey =
  | { kind: "tesalia"; value: string }
  | { kind: "voyage"; value: string }
  | { kind: "external"; value: string }
  | { kind: "incomplete"; reason: string };

export function buildLogicalEventKey(state: EventFormState): LogicalEventKey {
  if (!state.date) {
    return { kind: "incomplete", reason: "missing_date" };
  }

  if (state.serviceMode === "external") {
    const r = state.restaurant || "unset";
    return { kind: "external", value: `external|${r}|${state.date}` };
  }

  if (state.restaurant === "tesalia") {
    return { kind: "tesalia", value: `tesalia|${state.date}` };
  }

  if (state.restaurant === "voyage") {
    if (!state.voyageHall) {
      return { kind: "incomplete", reason: "missing_voyage_hall" };
    }
    return { kind: "voyage", value: `voyage|${state.voyageHall}|${state.date}` };
  }

  return { kind: "incomplete", reason: "missing_restaurant" };
}
