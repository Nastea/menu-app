import type { CandyBarFormState, SavoryPlatterFormState } from "./cateringExtras";
import type { BarPackageId, NonAlcoholPackageId } from "@/data/bar-packages";
import type { MenuCategory, RestaurantId, VoyageHallId } from "./menu";

/**
 * Eveniment la sediul restaurantului vs. catering extern.
 * Separat de `restaurant` (tesalia | voyage) — acolo alegi brandul / meniul.
 */
export type ServiceMode = "on_premises" | "external";

/** Decor: intern (reguli pe restaurant) vs. extern (mesele × tarif MDL — calcul ulterior). */
export type DecorSource = "internal" | "external";

/** Minute permise pentru program (UI + validare ulterioară). */
export type ScheduleMinute = 0 | 30;

export type ScheduleMoment = {
  hour: number;
  minute: ScheduleMinute;
};

/** Program eveniment — fiecare moment cu oră + minute (00 sau 30). */
export type EventSchedule = {
  bridalArrival: ScheduleMoment | null;
  guestsArrival: ScheduleMoment | null;
  firstMeal: ScheduleMoment | null;
  mainMeal: ScheduleMoment | null;
  cake: ScheduleMoment | null;
  /** Implicit 03:00 la inițializare. */
  eventEnd: ScheduleMoment;
};

export type NoteLine = {
  id: string;
  text: string;
};

/** Decor intern Tesalia — sumă fixă afișată (fără input liber în formular). */
export const TESALIA_INTERNAL_DECOR_EUR = 950;

/** Tarif orientativ decor extern — MDL per masă (calcul final pas ulterior). */
export const EXTERNAL_DECOR_RATE_PER_TABLE_MDL = 350;

export type EventFormState = {
  date: string;
  serviceMode: ServiceMode;
  /** Restaurant: Tesalia sau Voyage (meniu / context). */
  restaurant: RestaurantId | "";
  /**
   * Sală Voyage — obligatorie când `restaurant === "voyage"` și evenimentul e `on_premises`.
   */
  voyageHall: VoyageHallId | "";
  client: string;
  phone: string;
  adults: number;
  children: number;
  childrenSpecial: number;
  staff: number;
  staffFree10: boolean;
  /** Note opționale despre decor (text liber). */
  decor: string;
  /** Decor intern (reguli fixe pe restaurant) vs. extern (număr mese). */
  decorSource: DecorSource;
  /** Folosit când `decorSource === "external"` — calcul ulterior: × 350 MDL. */
  externalTableCount: number;
  /** Doar pentru decor extern: fețele de masă sunt furnizate de noi. */
  externalTableclothsFromUs: boolean;
  /** Avansuri în MDL (intră în calcule). */
  advance1: number;
  advance2: number;
  eventSchedule: EventSchedule;
  menuCategories: MenuCategory[];
  coffeeEnabled: boolean;
  fruitPlatterPortions: number;
  candyBar: CandyBarFormState;
  savoryPlatter: SavoryPlatterFormState;
  barEnabled: boolean;
  barPackageId: BarPackageId | "";
  nonAlcoholEnabled: boolean;
  nonAlcoholPackageId: NonAlcoholPackageId | "";
  /** +2% pentru plată cu card (din totalul curent). */
  paymentByCard: boolean;
  /** Taxă opțională meniu principal: Tesalia 10% / Voyage 5%. */
  mainMenuServiceFeeEnabled: boolean;
  previewKids: boolean;
  previewStaff: boolean;
  notes: NoteLine[];
};

export const defaultEventEnd: ScheduleMoment = { hour: 3, minute: 0 };

export function createEmptySchedule(): EventSchedule {
  return {
    bridalArrival: null,
    guestsArrival: null,
    firstMeal: null,
    mainMeal: null,
    cake: null,
    eventEnd: { ...defaultEventEnd },
  };
}

export const initialCandyBarState = (): CandyBarFormState => ({
  enabled: false,
  picks: [null, null, null, null],
  totalPastriesCount: 0,
});

export const initialSavoryPlatterState = (): SavoryPlatterFormState => ({
  enabled: false,
  numberOfPortions: 0,
});
