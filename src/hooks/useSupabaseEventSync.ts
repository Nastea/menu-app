"use client";

import { startTransition, useEffect, useRef, useState } from "react";
import type { RestaurantId, VoyageHallId } from "@/types/menu";
import { getNewEventFormForIdentifiers } from "@/lib/eventFormDefaults";
import { buildMvpEventKey } from "@/lib/eventKey";
import {
  canPersistEvent,
  deleteEventByKey,
  getPersistSnapshot,
  listEventDatesByRestaurant,
  loadEventByKey,
  upsertEventByKey,
} from "@/lib/eventsDb";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import type { UseEventFormReturn } from "@/hooks/useEventForm";

const LOAD_DEBOUNCE_MS = 400;
const AUTOSAVE_DEBOUNCE_MS = 5000;
const SAVED_LABEL_CLEAR_MS = 2500;

export type SupabasePersistenceApi = {
  hasClient: boolean;
  currentKey: string | null;
  markedEventDates: string[];
  saveNow: () => Promise<void>;
  deleteCurrentEvent: () => Promise<void>;
  canDeleteCurrent: boolean;
  isWorking: boolean;
  /** Linie discretă pentru încărcare (gol dacă nu e cazul). */
  loadLine: string;
  /** Autosave: „Se salvează...” / „Salvat” / „Eroare la salvare” / gol. */
  autosaveLine: string;
};

export function useSupabaseEventSync(form: UseEventFormReturn): SupabasePersistenceApi {
  const { state, setState } = form;
  const stateRef = useRef(state);
  const [loadLine, setLoadLine] = useState("");
  const [autosaveLine, setAutosaveLine] = useState("");
  const [markedEventDates, setMarkedEventDates] = useState<string[]>([]);
  const [isWorking, setIsWorking] = useState(false);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const lastFetchedKeyRef = useRef<string | null>(null);
  const lastPersistedSnapshotRef = useRef<string | null>(null);
  const loadDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autosaveDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const loadInProgressRef = useRef(false);
  const saveInFlightRef = useRef(false);
  const savedClearTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const client = getSupabaseBrowserClient();

  const saveNow = async () => {
    if (!client) return;
    const live = stateRef.current;
    if (!canPersistEvent(live)) {
      startTransition(() => setAutosaveLine("Completează restaurant + dată (+ sală Voyage)."));
      return;
    }
    if (saveInFlightRef.current) return;

    saveInFlightRef.current = true;
    setIsWorking(true);
    startTransition(() => setAutosaveLine("Se salvează..."));
    try {
      const { error } = await upsertEventByKey(client, live);
      if (error) {
        startTransition(() => setAutosaveLine("Eroare la salvare"));
        return;
      }
      const snap = getPersistSnapshot(stateRef.current);
      lastPersistedSnapshotRef.current = snap;
      startTransition(() => setAutosaveLine("Salvat"));

      if (stateRef.current.restaurant) {
        const listed = await listEventDatesByRestaurant(client, stateRef.current.restaurant);
        if (!listed.error) {
          startTransition(() => setMarkedEventDates(listed.dates));
        }
      }
    } finally {
      saveInFlightRef.current = false;
      setIsWorking(false);
    }
  };

  const deleteCurrentEvent = async () => {
    if (!client) return;
    const live = stateRef.current;
    const key = buildMvpEventKey(live);
    if (!key) {
      startTransition(() => setAutosaveLine("Nu există event_key complet pentru ștergere."));
      return;
    }

    setIsWorking(true);
    startTransition(() => setAutosaveLine("Se șterge..."));
    try {
      const { error } = await deleteEventByKey(client, key);
      if (error) {
        startTransition(() => setAutosaveLine("Eroare la ștergere"));
        return;
      }

      const blank = getNewEventFormForIdentifiers({
        date: live.date,
        restaurant: live.restaurant as RestaurantId,
        voyageHall: live.voyageHall as VoyageHallId | "",
      });
      const blankSnap = getPersistSnapshot(blank);
      lastPersistedSnapshotRef.current = blankSnap;
      lastFetchedKeyRef.current = key;
      startTransition(() => {
        setState(blank);
        setLoadLine("Eveniment șters.");
        setAutosaveLine("");
      });

      if (live.restaurant) {
        const listed = await listEventDatesByRestaurant(client, live.restaurant);
        if (!listed.error) {
          startTransition(() => setMarkedEventDates(listed.dates));
        }
      }
    } finally {
      setIsWorking(false);
    }
  };

  /* -------- Load automat (debounce scurt pe cheie) -------- */
  useEffect(() => {
    if (!client) {
      startTransition(() => setLoadLine(""));
      return;
    }

    const { date, restaurant, voyageHall } = state;
    const key = buildMvpEventKey({ date, restaurant, voyageHall });

    if (!key) {
      lastFetchedKeyRef.current = null;
      lastPersistedSnapshotRef.current = null;
      startTransition(() => setLoadLine(""));
      return;
    }

    if (lastFetchedKeyRef.current === key) {
      return;
    }

    if (loadDebounceRef.current) clearTimeout(loadDebounceRef.current);

    startTransition(() => {
      setLoadLine("Se încarcă datele...");
    });

    loadDebounceRef.current = setTimeout(async () => {
      const liveKey = buildMvpEventKey({ date, restaurant, voyageHall });
      if (liveKey !== key) return;

      loadInProgressRef.current = true;
      try {
        const loaded = await loadEventByKey(client, key);
        if (buildMvpEventKey({ date, restaurant, voyageHall }) !== key) return;

        if (loaded) {
          const snap = getPersistSnapshot(loaded);
          if (snap !== null) {
            lastPersistedSnapshotRef.current = snap;
          }
          startTransition(() => {
            setState(loaded);
            lastFetchedKeyRef.current = key;
            setLoadLine("Încărcat din Supabase.");
          });
        } else {
          const blank = getNewEventFormForIdentifiers({
            date,
            restaurant: restaurant as RestaurantId,
            voyageHall: voyageHall as VoyageHallId | "",
          });
          const snap = getPersistSnapshot(blank);
          if (snap !== null) {
            lastPersistedSnapshotRef.current = snap;
          }
          startTransition(() => {
            setState(blank);
            lastFetchedKeyRef.current = key;
            setLoadLine("Nu există înregistrare — formular nou.");
          });
        }
      } catch (e) {
        lastFetchedKeyRef.current = null;
        lastPersistedSnapshotRef.current = null;
        startTransition(() => {
          setLoadLine(
            e instanceof Error ? `Eroare la încărcare: ${e.message}` : "Eroare la încărcare.",
          );
        });
      } finally {
        loadInProgressRef.current = false;
      }
    }, LOAD_DEBOUNCE_MS);

    return () => {
      if (loadDebounceRef.current) clearTimeout(loadDebounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- doar cheia logică declanșează load
  }, [client, state.date, state.restaurant, state.voyageHall, setState]);

  useEffect(() => {
    const restaurant = state.restaurant;
    if (!client || !restaurant) {
      startTransition(() => setMarkedEventDates([]));
      return;
    }

    let cancelled = false;
    void (async () => {
      const listed = await listEventDatesByRestaurant(client, restaurant);
      if (cancelled || listed.error) return;
      startTransition(() => setMarkedEventDates(listed.dates));
    })();

    return () => {
      cancelled = true;
    };
  }, [client, state.restaurant]);

  /* -------- Autosave (debounce 5s pe întreg formularul) -------- */
  useEffect(() => {
    if (!client) {
      startTransition(() => setAutosaveLine(""));
      return;
    }

    if (!canPersistEvent(state)) {
      if (autosaveDebounceRef.current) clearTimeout(autosaveDebounceRef.current);
      startTransition(() => setAutosaveLine(""));
      return;
    }

    if (autosaveDebounceRef.current) clearTimeout(autosaveDebounceRef.current);

    autosaveDebounceRef.current = setTimeout(() => {
      void (async () => {
        if (loadInProgressRef.current) return;

        const live = stateRef.current;
        if (!canPersistEvent(live)) return;
        if (saveInFlightRef.current) return;

        const snap = getPersistSnapshot(live);
        if (snap === null) return;
        if (snap === lastPersistedSnapshotRef.current) return;

        saveInFlightRef.current = true;
        startTransition(() => setAutosaveLine("Se salvează..."));

        const latest = stateRef.current;
        const snapNow = getPersistSnapshot(latest);
        if (snapNow === null || snapNow !== snap) {
          saveInFlightRef.current = false;
          return;
        }

        try {
          const { error } = await upsertEventByKey(client, latest);

          if (error) {
            startTransition(() => setAutosaveLine("Eroare la salvare"));
            return;
          }

          const after = getPersistSnapshot(stateRef.current);
          if (after !== snapNow) {
            return;
          }

          lastPersistedSnapshotRef.current = after;
          startTransition(() => setAutosaveLine("Salvat"));

          if (savedClearTimerRef.current) clearTimeout(savedClearTimerRef.current);
          savedClearTimerRef.current = setTimeout(() => {
            startTransition(() => setAutosaveLine((prev) => (prev === "Salvat" ? "" : prev)));
            savedClearTimerRef.current = null;
          }, SAVED_LABEL_CLEAR_MS);
        } finally {
          saveInFlightRef.current = false;
        }
      })();
    }, AUTOSAVE_DEBOUNCE_MS);

    return () => {
      if (autosaveDebounceRef.current) clearTimeout(autosaveDebounceRef.current);
    };
  }, [client, state]);

  useEffect(() => {
    return () => {
      if (savedClearTimerRef.current) clearTimeout(savedClearTimerRef.current);
    };
  }, []);

  const currentKey = buildMvpEventKey(state);

  return {
    hasClient: Boolean(client),
    currentKey,
    markedEventDates,
    saveNow,
    deleteCurrentEvent,
    canDeleteCurrent: Boolean(client && currentKey),
    isWorking: isWorking || saveInFlightRef.current || loadInProgressRef.current,
    loadLine: client ? loadLine : "",
    autosaveLine: client ? autosaveLine : "",
  };
}
