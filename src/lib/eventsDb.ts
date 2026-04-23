import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  CandyBarFormState,
  CandyBarFourPicks,
  SavoryPlatterFormState,
} from "@/types/cateringExtras";
import type { MenuCategory } from "@/types/menu";
import type { RestaurantId, VoyageHallId } from "@/types/menu";
import type { BarPackageId, NonAlcoholPackageId } from "@/data/bar-packages";
import type {
  DecorSource,
  EventFormState,
  EventSchedule,
  NoteLine,
  ServiceMode,
} from "@/types/event";
import {
  createEmptySchedule,
  initialCandyBarState,
  initialSavoryPlatterState,
} from "@/types/event";
import { newId } from "@/lib/newId";
import { buildMvpEventKey } from "@/lib/eventKey";

export type EventsRow = {
  id: string;
  event_key: string;
  restaurant: RestaurantId;
  voyage_hall: VoyageHallId | null;
  event_date: string;
  client_name: string;
  phone: string;
  adults: number;
  kids: number;
  kids_special: number;
  staff: number;
  ten_staff_free: boolean;
  decor_source: DecorSource;
  external_table_count: number;
  advance_1: number;
  advance_2: number;
  program: EventSchedule;
  menu_categories: MenuCategory[];
  extras: EventsExtrasPayload;
  notes: NoteLine[];
  created_at: string;
  updated_at: string;
};

export type EventsExtrasPayload = {
  serviceMode: ServiceMode;
  decor: string;
  externalTableclothsFromUs: boolean;
  coffeeEnabled: boolean;
  fruitPlatterPortions: number;
  candyBar: CandyBarFormState;
  savoryPlatter: SavoryPlatterFormState;
  barEnabled: boolean;
  barPackageId: BarPackageId | "";
  nonAlcoholEnabled: boolean;
  nonAlcoholPackageId: NonAlcoholPackageId | "";
  paymentByCard: boolean;
  mainMenuServiceFeeEnabled: boolean;
  previewKids: boolean;
  previewStaff: boolean;
};

function normalizeCandyBar(raw: unknown): CandyBarFormState {
  const d = initialCandyBarState();
  if (!raw || typeof raw !== "object") return d;
  const b = raw as Partial<CandyBarFormState>;
  const picksRaw = b.picks;
  const picks: CandyBarFourPicks =
    Array.isArray(picksRaw) && picksRaw.length === 4
      ? (picksRaw as CandyBarFourPicks)
      : d.picks;
  return {
    enabled: Boolean(b.enabled),
    picks,
    totalPastriesCount: Number(b.totalPastriesCount) || 0,
  };
}

function normalizeSavory(raw: unknown): SavoryPlatterFormState {
  const d = initialSavoryPlatterState();
  if (!raw || typeof raw !== "object") return d;
  const b = raw as Partial<SavoryPlatterFormState>;
  return {
    enabled: Boolean(b.enabled),
    numberOfPortions: Number(b.numberOfPortions) || 0,
  };
}

function defaultExtras(): EventsExtrasPayload {
  return {
    serviceMode: "on_premises",
    decor: "",
    externalTableclothsFromUs: false,
    coffeeEnabled: false,
    fruitPlatterPortions: 0,
    candyBar: initialCandyBarState(),
    savoryPlatter: initialSavoryPlatterState(),
    barEnabled: false,
    barPackageId: "",
    nonAlcoholEnabled: false,
    nonAlcoholPackageId: "",
    paymentByCard: false,
    mainMenuServiceFeeEnabled: false,
    previewKids: false,
    previewStaff: false,
  };
}

function parseExtras(raw: unknown): EventsExtrasPayload {
  if (!raw || typeof raw !== "object") return defaultExtras();
  const x = raw as Record<string, unknown>;
  return {
    serviceMode: x.serviceMode === "external" ? "external" : "on_premises",
    decor: typeof x.decor === "string" ? x.decor : "",
    externalTableclothsFromUs: Boolean(x.externalTableclothsFromUs),
    coffeeEnabled: Boolean(x.coffeeEnabled),
    fruitPlatterPortions: Number(x.fruitPlatterPortions) || 0,
    candyBar: normalizeCandyBar(x.candyBar),
    savoryPlatter: normalizeSavory(x.savoryPlatter),
    barEnabled: Boolean(x.barEnabled),
    barPackageId: typeof x.barPackageId === "string" ? (x.barPackageId as BarPackageId) : "",
    nonAlcoholEnabled: Boolean(x.nonAlcoholEnabled),
    nonAlcoholPackageId:
      typeof x.nonAlcoholPackageId === "string"
        ? (x.nonAlcoholPackageId as NonAlcoholPackageId)
        : "",
    paymentByCard: Boolean(x.paymentByCard),
    mainMenuServiceFeeEnabled: Boolean(x.mainMenuServiceFeeEnabled),
    previewKids: Boolean(x.previewKids),
    previewStaff: Boolean(x.previewStaff),
  };
}

function parseProgram(raw: unknown): EventSchedule {
  if (!raw || typeof raw !== "object") return createEmptySchedule();
  const p = raw as EventSchedule;
  if (!p.eventEnd) return createEmptySchedule();
  return {
    bridalArrival: p.bridalArrival ?? null,
    guestsArrival: p.guestsArrival ?? null,
    firstMeal: p.firstMeal ?? null,
    mainMeal: p.mainMeal ?? null,
    cake: p.cake ?? null,
    eventEnd: p.eventEnd,
  };
}

function parseMenuCategories(raw: unknown): MenuCategory[] {
  if (!Array.isArray(raw)) return [];
  return raw as MenuCategory[];
}

function parseDbNumeric(value: unknown): number {
  if (value === null || value === undefined) return 0;
  if (typeof value === "number" && !Number.isNaN(value)) return value;
  const n = Number.parseFloat(String(value));
  return Number.isFinite(n) ? n : 0;
}

function parseNotes(raw: unknown): NoteLine[] {
  if (!Array.isArray(raw) || raw.length === 0) {
    return [{ id: newId("note"), text: "" }];
  }
  return raw.map((n, i) => ({
    id: typeof n?.id === "string" ? n.id : `note-${i}`,
    text: typeof n?.text === "string" ? n.text : "",
  }));
}

export function eventFormStateToUpsertRow(
  state: EventFormState,
  eventKey: string,
): Omit<EventsRow, "id" | "created_at" | "updated_at"> {
  const extras: EventsExtrasPayload = {
    serviceMode: state.serviceMode,
    decor: state.decor,
    externalTableclothsFromUs: state.externalTableclothsFromUs,
    coffeeEnabled: state.coffeeEnabled,
    fruitPlatterPortions: state.fruitPlatterPortions,
    candyBar: state.candyBar,
    savoryPlatter: state.savoryPlatter,
    barEnabled: state.barEnabled,
    barPackageId: state.barPackageId,
    nonAlcoholEnabled: state.nonAlcoholEnabled,
    nonAlcoholPackageId: state.nonAlcoholPackageId,
    paymentByCard: state.paymentByCard,
    mainMenuServiceFeeEnabled: state.mainMenuServiceFeeEnabled,
    previewKids: state.previewKids,
    previewStaff: state.previewStaff,
  };

  return {
    event_key: eventKey,
    restaurant: state.restaurant as RestaurantId,
    voyage_hall: state.restaurant === "voyage" ? (state.voyageHall as VoyageHallId) : null,
    event_date: state.date,
    client_name: state.client,
    phone: state.phone,
    adults: state.adults,
    kids: state.children,
    kids_special: state.childrenSpecial,
    staff: state.staff,
    ten_staff_free: state.staffFree10,
    decor_source: state.decorSource,
    external_table_count: state.externalTableCount,
    advance_1: state.advance1,
    advance_2: state.advance2,
    program: state.eventSchedule,
    menu_categories: state.menuCategories,
    extras,
    notes: state.notes,
  };
}

export function eventsRowToEventFormState(row: EventsRow): EventFormState {
  const extras = parseExtras(row.extras);
  return {
    date: row.event_date,
    serviceMode: extras.serviceMode,
    restaurant: row.restaurant,
    voyageHall: row.voyage_hall ?? "",
    client: row.client_name,
    phone: row.phone,
    adults: row.adults,
    children: row.kids,
    childrenSpecial: row.kids_special,
    staff: row.staff,
    staffFree10: row.ten_staff_free,
    decor: extras.decor,
    decorSource: row.decor_source,
    externalTableCount: row.external_table_count,
    externalTableclothsFromUs: extras.externalTableclothsFromUs,
    advance1: parseDbNumeric(row.advance_1),
    advance2: parseDbNumeric(row.advance_2),
    eventSchedule: parseProgram(row.program),
    menuCategories: parseMenuCategories(row.menu_categories),
    coffeeEnabled: extras.coffeeEnabled,
    fruitPlatterPortions: extras.fruitPlatterPortions,
    candyBar: extras.candyBar ?? initialCandyBarState(),
    savoryPlatter: extras.savoryPlatter ?? initialSavoryPlatterState(),
    barEnabled: extras.barEnabled,
    barPackageId: extras.barPackageId,
    nonAlcoholEnabled: extras.nonAlcoholEnabled,
    nonAlcoholPackageId: extras.nonAlcoholPackageId,
    paymentByCard: extras.paymentByCard,
    mainMenuServiceFeeEnabled: extras.mainMenuServiceFeeEnabled,
    previewKids: extras.previewKids,
    previewStaff: extras.previewStaff,
    notes: parseNotes(row.notes),
  };
}

export async function loadEventByKey(
  client: SupabaseClient,
  eventKey: string,
): Promise<EventFormState | null> {
  const { data, error } = await client
    .from("events")
    .select("*")
    .eq("event_key", eventKey)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;
  return eventsRowToEventFormState(data as EventsRow);
}

export async function upsertEventByKey(
  client: SupabaseClient,
  state: EventFormState,
): Promise<{ error: Error | null }> {
  if (state.restaurant === "voyage" && !state.voyageHall) {
    return {
      error: new Error(
        "Pentru restaurantul Voyage trebuie să selectezi sală (Isadora sau Oliva) înainte de salvare.",
      ),
    };
  }

  const key = buildMvpEventKey(state);
  if (!key) {
    return {
      error: new Error(
        "Nu se poate genera event_key: verifică data și restaurantul (pentru Voyage e obligatorie și sală).",
      ),
    };
  }
  if (state.restaurant !== "tesalia" && state.restaurant !== "voyage") {
    return { error: new Error("Restaurant invalid.") };
  }

  const row = eventFormStateToUpsertRow(state, key);
  const { error } = await client.from("events").upsert(row, { onConflict: "event_key" });
  if (error) return { error: new Error(error.message) };
  return { error: null };
}

export async function deleteEventByKey(
  client: SupabaseClient,
  eventKey: string,
): Promise<{ error: Error | null }> {
  const { error } = await client.from("events").delete().eq("event_key", eventKey);
  if (error) return { error: new Error(error.message) };
  return { error: null };
}

export async function listEventDatesByRestaurant(
  client: SupabaseClient,
  restaurant: RestaurantId,
): Promise<{ dates: string[]; error: Error | null }> {
  const { data, error } = await client
    .from("events")
    .select("event_date")
    .eq("restaurant", restaurant)
    .order("event_date", { ascending: true });
  if (error) return { dates: [], error: new Error(error.message) };

  const unique = Array.from(new Set((data ?? []).map((row) => String(row.event_date))));
  return { dates: unique, error: null };
}

/** Minim pentru autosave: dată, restaurant, sală dacă e Voyage. */
export function canPersistEvent(state: EventFormState): boolean {
  if (!state.date?.trim()) return false;
  if (state.restaurant !== "tesalia" && state.restaurant !== "voyage") return false;
  if (state.restaurant === "voyage" && !state.voyageHall) return false;
  return buildMvpEventKey(state) !== null;
}

/** Snapshot stabil al rândului de upsert — pentru comparații fără resave inutil. */
export function getPersistSnapshot(state: EventFormState): string | null {
  if (!canPersistEvent(state)) return null;
  const key = buildMvpEventKey(state);
  if (!key) return null;
  const row = eventFormStateToUpsertRow(state, key);
  return JSON.stringify(row);
}
