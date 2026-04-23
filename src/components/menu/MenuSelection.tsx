"use client";

import { useMemo, useState } from "react";
import type { EventFormState } from "@/types/event";
import type { EditableMenuItem } from "@/types/menu";
import { Button } from "@/components/ui/Button";

type Props = {
  state: EventFormState;
  addMenuItem: (categoryId: string) => void;
  updateMenuItem: (
    categoryId: string,
    itemId: string,
    patch: Partial<EditableMenuItem>,
  ) => void;
};

export function MenuSelection({ state, addMenuItem, updateMenuItem }: Props) {
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
        <p className="mt-1 text-xs text-zinc-500">
          Copii special: preț fix <strong>350 MDL / porție</strong> · porții setate:{" "}
          <strong>{state.childrenSpecial || 0}</strong>.
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
                <div className="overflow-x-auto rounded-md border border-zinc-200 dark:border-zinc-700">
                  <table className="min-w-full text-xs">
                    <thead className="bg-zinc-100/90 text-zinc-600 dark:bg-zinc-900/70 dark:text-zinc-300">
                      <tr>
                        <th className="w-12 px-2 py-2 text-center">Sel.</th>
                        <th className="min-w-[16rem] px-2 py-2 text-left">Fel</th>
                        <th className="min-w-[8rem] px-2 py-2 text-left">Gramaj</th>
                        <th className="w-28 px-2 py-2 text-left">Preț MDL</th>
                        <th className="w-16 px-2 py-2 text-center">K</th>
                        <th className="w-16 px-2 py-2 text-center">S</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cat.items.map((item) => (
                        <tr
                          key={item.id}
                          className="border-t border-zinc-200 bg-white/90 dark:border-zinc-800 dark:bg-zinc-950/40"
                        >
                          <td className="px-2 py-1.5 text-center">
                            <input
                              type="checkbox"
                              checked={item.selected}
                              aria-label={`Selectează ${item.name || "fel"}`}
                              onChange={(e) =>
                                updateMenuItem(cat.id, item.id, { selected: e.target.checked })
                              }
                            />
                          </td>
                          <td className="px-2 py-1.5">
                            <input
                              className="w-full rounded border border-zinc-300 bg-background px-2 py-1 dark:border-zinc-600"
                              value={item.name}
                              onChange={(e) =>
                                updateMenuItem(cat.id, item.id, { name: e.target.value })
                              }
                            />
                          </td>
                          <td className="px-2 py-1.5">
                            <input
                              className="w-full rounded border border-zinc-300 bg-background px-2 py-1 dark:border-zinc-600"
                              value={item.quantityOrWeight}
                              onChange={(e) =>
                                updateMenuItem(cat.id, item.id, { quantityOrWeight: e.target.value })
                              }
                            />
                          </td>
                          <td className="px-2 py-1.5">
                            <input
                              type="number"
                              min={0}
                              className="w-full rounded border border-zinc-300 bg-background px-2 py-1 dark:border-zinc-600"
                              value={item.adultPrice || ""}
                              onChange={(e) =>
                                updateMenuItem(cat.id, item.id, {
                                  adultPrice: Number(e.target.value) || 0,
                                })
                              }
                            />
                          </td>
                          <td className="px-2 py-1.5 text-center">
                            <input
                              type="checkbox"
                              checked={item.kidsIncluded}
                              aria-label={`Kids pentru ${item.name || "fel"}`}
                              onChange={(e) =>
                                updateMenuItem(cat.id, item.id, { kidsIncluded: e.target.checked })
                              }
                            />
                          </td>
                          <td className="px-2 py-1.5 text-center">
                            <input
                              type="checkbox"
                              checked={item.staffIncluded}
                              aria-label={`Staff pentru ${item.name || "fel"}`}
                              onChange={(e) =>
                                updateMenuItem(cat.id, item.id, { staffIncluded: e.target.checked })
                              }
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </section>
  );
}
