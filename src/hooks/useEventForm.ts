"use client";

import { useCallback, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { EditableMenuItem } from "@/types/menu";
import type { RestaurantId } from "@/types/menu";
import type { EventFormState, EventSchedule, NoteLine } from "@/types/event";
import { getBlankEventFormState } from "@/lib/eventFormDefaults";
import { getSeedMenuCategories } from "@/lib/initialMenu";
import { createEmptyMenuItem } from "@/lib/menuItemFactory";
import { newId } from "@/lib/newId";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import { loadMasterMenu } from "@/lib/masterMenuDb";

export type UseEventFormReturn = {
  state: EventFormState;
  setState: Dispatch<SetStateAction<EventFormState>>;
  reset: () => void;
  updateField: <K extends keyof EventFormState>(key: K, value: EventFormState[K]) => void;
  setRestaurantAndSeedMenu: (restaurant: RestaurantId | "") => void;
  updateEventSchedule: (patch: Partial<EventSchedule>) => void;
  addMenuItem: (categoryId: string) => void;
  updateMenuItem: (
    categoryId: string,
    itemId: string,
    patch: Partial<EditableMenuItem>,
  ) => void;
  removeMenuItem: (categoryId: string, itemId: string) => void;
  addNoteLine: () => void;
  removeNoteLine: (id: string) => void;
  updateNoteLineText: (id: string, text: string) => void;
};

export function useEventForm(): UseEventFormReturn {
  const [state, setState] = useState<EventFormState>(() => getBlankEventFormState());

  const updateField = useCallback(
    <K extends keyof EventFormState>(key: K, value: EventFormState[K]) => {
      setState((prev) => {
        const next = { ...prev, [key]: value } as EventFormState;
        if (key === "serviceMode" && value === "external") {
          next.voyageHall = "";
        }
        if (key === "adults") {
          const nextAdults = Number(value) || 0;
          const fruitWasAutoSynced =
            prev.fruitPlatterPortions === prev.adults || prev.fruitPlatterPortions === 0;
          if (fruitWasAutoSynced) {
            next.fruitPlatterPortions = nextAdults;
          }
        }
        return next;
      });
    },
    [],
  );

  const setRestaurantAndSeedMenu = useCallback((restaurant: RestaurantId | "") => {
    setState((prev) => ({
      ...prev,
      restaurant,
      voyageHall: restaurant === "voyage" ? prev.voyageHall : "",
      menuCategories: restaurant ? getSeedMenuCategories(restaurant) : [],
    }));

    if (!restaurant) return;

    void (async () => {
      const client = getSupabaseBrowserClient();
      if (!client) return;
      const { categories, error } = await loadMasterMenu(client, restaurant);
      if (error || !categories || categories.length === 0) return;

      setState((prev) => {
        if (prev.restaurant !== restaurant) return prev;
        return { ...prev, menuCategories: categories };
      });
    })();
  }, []);

  const updateEventSchedule = useCallback((patch: Partial<EventSchedule>) => {
    setState((prev) => ({
      ...prev,
      eventSchedule: { ...prev.eventSchedule, ...patch },
    }));
  }, []);

  const addMenuItem = useCallback((categoryId: string) => {
    setState((prev) => ({
      ...prev,
      menuCategories: prev.menuCategories.map((cat) =>
        cat.id !== categoryId
          ? cat
          : { ...cat, items: [...cat.items, createEmptyMenuItem()] },
      ),
    }));
  }, []);

  const updateMenuItem = useCallback(
    (categoryId: string, itemId: string, patch: Partial<EditableMenuItem>) => {
      setState((prev) => ({
        ...prev,
        menuCategories: prev.menuCategories.map((cat) =>
          cat.id !== categoryId
            ? cat
            : {
                ...cat,
                items: cat.items.map((item) =>
                  item.id !== itemId ? item : { ...item, ...patch },
                ),
              },
        ),
      }));
    },
    [],
  );

  const removeMenuItem = useCallback((categoryId: string, itemId: string) => {
    setState((prev) => ({
      ...prev,
      menuCategories: prev.menuCategories.map((cat) =>
        cat.id !== categoryId
          ? cat
          : { ...cat, items: cat.items.filter((i) => i.id !== itemId) },
      ),
    }));
  }, []);

  const addNoteLine = useCallback(() => {
    setState((prev) => ({
      ...prev,
      notes: [...prev.notes, { id: newId("note"), text: "" } satisfies NoteLine],
    }));
  }, []);

  const removeNoteLine = useCallback((id: string) => {
    setState((prev) => {
      const filtered = prev.notes.filter((n) => n.id !== id);
      return {
        ...prev,
        notes: filtered.length > 0 ? filtered : [{ id: newId("note"), text: "" }],
      };
    });
  }, []);

  const updateNoteLineText = useCallback((id: string, text: string) => {
    setState((prev) => ({
      ...prev,
      notes: prev.notes.map((n) => (n.id === id ? { ...n, text } : n)),
    }));
  }, []);

  const reset = useCallback(() => {
    setState(getBlankEventFormState());
  }, []);

  return {
    state,
    setState,
    reset,
    updateField,
    setRestaurantAndSeedMenu,
    updateEventSchedule,
    addMenuItem,
    updateMenuItem,
    removeMenuItem,
    addNoteLine,
    removeNoteLine,
    updateNoteLineText,
  };
}
