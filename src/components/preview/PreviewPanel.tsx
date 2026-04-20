"use client";

import type { EventFormState } from "@/types/event";
import { Toggle } from "@/components/ui/Toggle";
import { getCandyBarPastryLabel } from "@/data/candy-bar-catalog";
import { SAVORY_PLATTER_STANDARD_LINES } from "@/data/savory-platter-standard";
import { getDecorSummaryLines } from "@/lib/decorSummary";

type Props = {
  state: EventFormState;
  updateField: <K extends keyof EventFormState>(key: K, value: EventFormState[K]) => void;
};

export function PreviewPanel({ state, updateField }: Props) {
  const decorLines = getDecorSummaryLines(state);

  return (
    <section className="flex flex-col gap-3 rounded-xl bg-zinc-50/70 p-4 dark:bg-zinc-900/40">
      <h2 className="text-sm font-semibold">Preview / document</h2>
      <div className="flex flex-wrap gap-4">
        <Toggle
          label="KIDS"
          checked={state.previewKids}
          onCheckedChange={(v) => updateField("previewKids", v)}
        />
        <Toggle
          label="STAFF"
          checked={state.previewStaff}
          onCheckedChange={(v) => updateField("previewStaff", v)}
        />
      </div>

      <div className="space-y-3 rounded-lg bg-white/80 p-3 text-xs text-zinc-700 dark:bg-zinc-950/40 dark:text-zinc-300">
        <div>
          <p className="font-semibold text-zinc-900 dark:text-zinc-100">Restaurant & sală</p>
          <p className="text-zinc-600 dark:text-zinc-400">
            restaurant:{" "}
            <span className="font-medium text-zinc-800 dark:text-zinc-200">
              {state.restaurant || "—"}
            </span>
            {state.restaurant === "voyage" && state.serviceMode === "on_premises" ? (
              <>
                {" "}
                · voyageHall:{" "}
                <span className="font-medium text-zinc-800 dark:text-zinc-200">
                  {state.voyageHall || "—"}
                </span>
              </>
            ) : null}
          </p>
        </div>

        <div>
          <p className="font-semibold text-zinc-900 dark:text-zinc-100">Decor</p>
          <p className="text-zinc-600 dark:text-zinc-400">
            decorSource:{" "}
            <span className="font-medium text-zinc-800 dark:text-zinc-200">
              {state.decorSource}
            </span>
          </p>
          {decorLines.map((line, i) => (
            <p key={i} className="text-zinc-600 dark:text-zinc-400">
              {line}
            </p>
          ))}
          {state.decor ? (
            <p className="mt-1 text-zinc-600 dark:text-zinc-400">Note: {state.decor}</p>
          ) : null}
        </div>

        <div>
          <p className="font-semibold text-zinc-900 dark:text-zinc-100">Candy Bar</p>
          {state.candyBar.enabled ? (
            <div className="mt-1 space-y-1 text-zinc-600 dark:text-zinc-400">
              <ol className="list-inside list-decimal">
                {state.candyBar.picks.map((id, i) => (
                  <li key={i}>{getCandyBarPastryLabel(id)}</li>
                ))}
              </ol>
              <p>
                Total prăjituri:{" "}
                <span className="font-medium text-zinc-800 dark:text-zinc-200">
                  {state.candyBar.totalPastriesCount || "—"}
                </span>
              </p>
            </div>
          ) : (
            <p className="text-zinc-500">Inactiv</p>
          )}
        </div>

        <div>
          <p className="font-semibold text-zinc-900 dark:text-zinc-100">Furșet sărat</p>
          {state.savoryPlatter.enabled ? (
            <div className="mt-1 space-y-1 text-zinc-600 dark:text-zinc-400">
              <p>
                Porții:{" "}
                <span className="font-medium text-zinc-800 dark:text-zinc-200">
                  {state.savoryPlatter.numberOfPortions || "—"}
                </span>
              </p>
              <p className="font-medium text-zinc-800 dark:text-zinc-200">Conținut standard:</p>
              <ul className="list-inside list-disc">
                {SAVORY_PLATTER_STANDARD_LINES.map((line) => (
                  <li key={line.id}>{line.label}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-zinc-500">Inactiv</p>
          )}
        </div>

        <div>
          <p className="font-semibold text-zinc-900 dark:text-zinc-100">Bar & non-alcool</p>
          <p className="text-zinc-600 dark:text-zinc-400">
            Bar: {state.barEnabled ? "DA" : "NU"} · Non-alcool:{" "}
            {state.nonAlcoholEnabled ? "DA" : "NU"}
          </p>
        </div>

        <div>
          <p className="font-semibold text-zinc-900 dark:text-zinc-100">Cafeă & furșet fructe</p>
          <p className="text-zinc-600 dark:text-zinc-400">
            Cafea: {state.coffeeEnabled ? "DA" : "NU"} · Furșet fructe porții:{" "}
            {state.fruitPlatterPortions || "—"}
          </p>
        </div>
      </div>
    </section>
  );
}
