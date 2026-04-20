import { newId } from "@/lib/newId";
import { getSeedMenuCategories } from "@/lib/initialMenu";
import type { RestaurantId, VoyageHallId } from "@/types/menu";
import type { EventFormState } from "@/types/event";
import {
  createEmptySchedule,
  initialCandyBarState,
  initialSavoryPlatterState,
} from "@/types/event";

/** Stare inițială goală — sursă unică pentru formular și pentru template după load fără rând. */
export function getBlankEventFormState(): EventFormState {
  return {
    date: "",
    serviceMode: "on_premises",
    restaurant: "",
    voyageHall: "",
    client: "",
    phone: "",
    adults: 0,
    children: 0,
    childrenSpecial: 0,
    staff: 0,
    staffFree10: false,
    decor: "",
    decorSource: "internal",
    externalTableCount: 0,
    externalTableclothsFromUs: false,
    advance1: 0,
    advance2: 0,
    eventSchedule: createEmptySchedule(),
    menuCategories: [],
    coffeeEnabled: false,
    fruitPlatterPortions: 0,
    candyBar: initialCandyBarState(),
    savoryPlatter: initialSavoryPlatterState(),
    barEnabled: false,
    nonAlcoholEnabled: false,
    previewKids: false,
    previewStaff: false,
    notes: [{ id: newId("note"), text: "" }],
  };
}

/** Formular „nou” pentru combinația restaurant + dată (+ sală Voyage), cu seed meniu. */
export function getNewEventFormForIdentifiers(params: {
  date: string;
  restaurant: RestaurantId;
  voyageHall: VoyageHallId | "";
}): EventFormState {
  const base = getBlankEventFormState();
  return {
    ...base,
    date: params.date,
    restaurant: params.restaurant,
    voyageHall: params.restaurant === "voyage" ? params.voyageHall : "",
    menuCategories: getSeedMenuCategories(params.restaurant),
    eventSchedule: createEmptySchedule(),
    candyBar: initialCandyBarState(),
    savoryPlatter: initialSavoryPlatterState(),
    notes: [{ id: newId("note"), text: "" }],
  };
}
