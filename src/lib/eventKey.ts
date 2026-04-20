import type { EventFormState } from "@/types/event";
import type { RestaurantId, VoyageHallId } from "@/types/menu";

/**
 * Cheie unică MVP pentru persistare:
 * - Tesalia: `tesalia__YYYY-MM-DD`
 * - Voyage: `voyage__isadora|oliva__YYYY-MM-DD`
 */
export function buildMvpEventKey(
  state: Pick<EventFormState, "date" | "restaurant" | "voyageHall">,
): string | null {
  if (!state.date || !state.restaurant) return null;
  if (state.restaurant === "tesalia") {
    return `tesalia__${state.date}`;
  }
  if (state.restaurant === "voyage") {
    if (!state.voyageHall) return null;
    return `voyage__${state.voyageHall}__${state.date}`;
  }
  return null;
}

export function parseMvpEventKey(key: string): {
  restaurant: RestaurantId;
  voyageHall: VoyageHallId | "";
  date: string;
} | null {
  const tes = /^tesalia__(\d{4}-\d{2}-\d{2})$/.exec(key);
  if (tes) {
    return { restaurant: "tesalia", voyageHall: "", date: tes[1] };
  }
  const voy = /^voyage__(isadora|oliva)__(\d{4}-\d{2}-\d{2})$/.exec(key);
  if (voy) {
    return {
      restaurant: "voyage",
      voyageHall: voy[1] as VoyageHallId,
      date: voy[2],
    };
  }
  return null;
}
