"use client";

import { useMemo, useState } from "react";
import type { EventFormState } from "@/types/event";
import type { EditableMenuItem } from "@/types/menu";
import { Input } from "@/components/ui/Input";
import { Toggle } from "@/components/ui/Toggle";
import { Button } from "@/components/ui/Button";

type Props = {
  state: EventFormState;
  addMenuItem: (categoryId: string) => void;
  updateMenuItem: (
    categoryId: string,
    itemId: string,
    patch: Partial<EditableMenuItem>,
  ) => void;
  removeMenuItem: (categoryId: string, itemId: string) => void;
};

export function MenuSelection({ state, addMenuItem, updateMenuItem, removeMenuItem }: Props) {
  const [expandedCategoryIds, setExpandedCategoryIds] = useState<Record<string, boolean>>({});
  const effectiveExpanded = useMemo(
    () =>
      state.menuCategories.reduce<Record<string, boolean>>((acc, cat) => {
        acc[cat.id] = expandedCategoryIds[cat.id] ?? true;
        return acc;
      }, {}),
    [expandedCategoryIds, state.menuCategories],
  );

  const toggleCategory = (categoryId: string) => {
    setExpandedCategoryIds((prev) => ({
      ...prev,
      [categoryId]: !(prev[categoryId] ?? true),
    }));
  };

  return (
    <section className="flex flex-col gap-4 rounded-xl bg-zinc-50/70 p-4 dark:bg-zinc-900/40">
      <div>
        <h2 className="text-sm font-semibold">Meniu (itemi editabili, prețuri MDL)</h2>
        <p className="text-xs text-zinc-500">
          Alege <strong>restaurant</strong> (Tesalia / Voyage) în „Date generale”. Fiecare
          categorie permite <strong>+ Item</strong>: poți adăuga orice fel în categorie, cu
          editare / ștergere inline. Itemii nu sunt limitați la seed — seed-ul doar
          preîncarcă exemple. Meniul Voyage e același pentru Isadora și Oliva.
        </p>
      </div>

      {!state.restaurant ? (
        <p className="text-xs text-zinc-500">Selectează mai întâi restaurantul.</p>
      ) : state.menuCategories.length === 0 ? (
        <p className="text-xs text-zinc-500">Nu există categorii în seed — adaugă în `data/`.</p>
      ) : (
        state.menuCategories.map((cat) => (
          <div
            key={cat.id}
            className="flex flex-col gap-2 rounded-lg bg-white/80 p-3 dark:bg-zinc-950/40"
          >
            <button
              type="button"
              className="flex items-center justify-between gap-2 rounded-md px-1 py-1 text-left hover:bg-zinc-100 dark:hover:bg-zinc-900/60"
              onClick={() => toggleCategory(cat.id)}
            >
              <h3 className="text-xs font-semibold uppercase text-zinc-600 dark:text-zinc-400">
                {cat.name}
              </h3>
              <span className="text-xs text-zinc-500">
                {effectiveExpanded[cat.id] ? "Ascunde" : "Arată"} ({cat.items.length})
              </span>
            </button>

            <div className={effectiveExpanded[cat.id] ? "flex flex-col gap-3" : "hidden"}>
              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="secondary"
                  className="shrink-0 py-1 text-xs"
                  onClick={() => addMenuItem(cat.id)}
                >
                  + Item în categorie
                </Button>
              </div>
              {cat.items.length === 0 ? (
                <p className="text-xs text-zinc-500">Niciun item — folosește „+ Item”.</p>
              ) : (
                cat.items.map((item) => (
                  <div
                    key={item.id}
                    className="grid gap-2 rounded-lg bg-zinc-100/70 p-2 sm:grid-cols-2 dark:bg-zinc-900/60"
                  >
                    <div className="flex items-center gap-2 sm:col-span-2">
                      <Toggle
                        label="Selectat"
                        checked={item.selected}
                        onCheckedChange={(v) => updateMenuItem(cat.id, item.id, { selected: v })}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        className="ml-auto text-xs text-red-600 dark:text-red-400"
                        onClick={() => removeMenuItem(cat.id, item.id)}
                      >
                        Șterge item
                      </Button>
                    </div>
                    <Input
                      label="Denumire"
                      value={item.name}
                      onChange={(e) => updateMenuItem(cat.id, item.id, { name: e.target.value })}
                    />
                    <Input
                      label="Gramaj / cantitate"
                      value={item.quantityOrWeight}
                      onChange={(e) =>
                        updateMenuItem(cat.id, item.id, { quantityOrWeight: e.target.value })
                      }
                    />
                    <Input
                      type="number"
                      min={0}
                      label="Preț adult (MDL)"
                      value={item.adultPrice || ""}
                      onChange={(e) =>
                        updateMenuItem(cat.id, item.id, {
                          adultPrice: Number(e.target.value) || 0,
                        })
                      }
                    />
                    <div className="flex flex-wrap gap-4 sm:col-span-2">
                      <Toggle
                        label="KIDS"
                        checked={item.kidsIncluded}
                        onCheckedChange={(v) =>
                          updateMenuItem(cat.id, item.id, { kidsIncluded: v })
                        }
                      />
                      <Toggle
                        label="STAFF"
                        checked={item.staffIncluded}
                        onCheckedChange={(v) =>
                          updateMenuItem(cat.id, item.id, { staffIncluded: v })
                        }
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ))
      )}
    </section>
  );
}
