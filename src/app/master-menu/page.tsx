"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { MenuCategory, RestaurantId } from "@/types/menu";
import { getSeedMenuCategories } from "@/lib/initialMenu";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import { loadMasterMenu, saveMasterMenu } from "@/lib/masterMenuDb";

export default function MasterMenuPage() {
  const AUTOSAVE_MS = 1200;
  const [restaurant, setRestaurant] = useState<RestaurantId>("tesalia");
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [line, setLine] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const lastSavedSnapshotRef = useRef<string>("");
  const autosaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hasClient = useMemo(() => Boolean(getSupabaseBrowserClient()), []);

  useEffect(() => {
    const client = getSupabaseBrowserClient();
    const fallback = getSeedMenuCategories(restaurant);
    if (!client) {
      setCategories(fallback);
      setLine("Supabase indisponibil — afișez meniul local.");
      return;
    }

    let cancelled = false;
    void (async () => {
      setIsLoading(true);
      setLine("Se încarcă master menu...");
      const { categories: loaded, error } = await loadMasterMenu(client, restaurant);
      if (cancelled) return;
      if (error) {
        setCategories(fallback);
        lastSavedSnapshotRef.current = JSON.stringify(fallback);
        setLine(`Eroare la încărcare: ${error.message}`);
        setIsLoading(false);
        return;
      }
      if (!loaded || loaded.length === 0) {
        setCategories(fallback);
        lastSavedSnapshotRef.current = JSON.stringify(fallback);
        setLine("Master menu gol în DB — afișez seed-ul local.");
        setIsLoading(false);
        return;
      }
      setCategories(loaded);
      lastSavedSnapshotRef.current = JSON.stringify(loaded);
      setLine("Încărcat din master menu.");
      setIsLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [restaurant]);

  const updatePrice = (categoryId: string, itemId: string, adultPrice: number) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id !== categoryId
          ? cat
          : {
              ...cat,
              items: cat.items.map((item) => (item.id !== itemId ? item : { ...item, adultPrice })),
            },
      ),
    );
  };

  const save = async (nextCategories: MenuCategory[]) => {
    const client = getSupabaseBrowserClient();
    if (!client) {
      setLine("Supabase indisponibil. Setează variabilele de mediu.");
      return;
    }
    setIsSaving(true);
    setLine("Se salvează master menu...");
    try {
      const { error } = await saveMasterMenu(client, restaurant, nextCategories);
      if (error) {
        setLine(`Eroare la salvare: ${error.message}`);
        return;
      }
      lastSavedSnapshotRef.current = JSON.stringify(nextCategories);
      setLine("Master menu salvat.");
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    if (isLoading || !hasClient) return;
    const snapshot = JSON.stringify(categories);
    if (!snapshot || snapshot === lastSavedSnapshotRef.current) return;

    if (autosaveTimerRef.current) clearTimeout(autosaveTimerRef.current);
    setLine("Modificări detectate — salvare automată...");
    autosaveTimerRef.current = setTimeout(() => {
      void save(categories);
      autosaveTimerRef.current = null;
    }, AUTOSAVE_MS);

    return () => {
      if (autosaveTimerRef.current) clearTimeout(autosaveTimerRef.current);
    };
  }, [categories, hasClient, isLoading, restaurant]);

  return (
    <main className="mx-auto flex w-full max-w-[1400px] flex-col gap-4 px-3 py-4 sm:px-5">
      <section className="rounded-xl bg-zinc-50/70 p-4 dark:bg-zinc-900/40">
        <div className="mb-3 flex flex-wrap items-end gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Restaurant</label>
            <select
              className="rounded-md border border-zinc-300 bg-background px-2 py-1.5 text-sm dark:border-zinc-600"
              value={restaurant}
              onChange={(e) => setRestaurant(e.target.value as RestaurantId)}
            >
              <option value="tesalia">Tesalia</option>
              <option value="voyage">Voyage</option>
            </select>
          </div>
          <a className="text-sm text-zinc-600 underline dark:text-zinc-300" href="/">
            Înapoi la configurator
          </a>
        </div>
        <p className="text-xs text-zinc-500">{line}</p>
      </section>

      {categories.map((cat) => (
        <section key={cat.id} className="rounded-xl bg-zinc-50/70 p-4 dark:bg-zinc-900/40">
          <h2 className="mb-2 text-sm font-semibold">{cat.name}</h2>
          <div className="overflow-x-auto rounded-md border border-zinc-200 dark:border-zinc-700">
            <table className="min-w-full text-xs">
              <thead className="bg-zinc-100/90 text-zinc-600 dark:bg-zinc-900/70 dark:text-zinc-300">
                <tr>
                  <th className="px-2 py-2 text-left">Fel</th>
                  <th className="px-2 py-2 text-left">Gramaj</th>
                  <th className="w-36 px-2 py-2 text-left">Preț adult (MDL)</th>
                </tr>
              </thead>
              <tbody>
                {cat.items.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-zinc-200 bg-white/90 dark:border-zinc-800 dark:bg-zinc-950/40"
                  >
                    <td className="px-2 py-1.5">{item.name}</td>
                    <td className="px-2 py-1.5">{item.quantityOrWeight || "—"}</td>
                    <td className="px-2 py-1.5">
                      <input
                        type="number"
                        min={0}
                        className="w-full rounded border border-zinc-300 bg-background px-2 py-1 dark:border-zinc-600"
                        value={item.adultPrice || ""}
                        onChange={(e) =>
                          updatePrice(cat.id, item.id, Number(e.target.value) || 0)
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </main>
  );
}
