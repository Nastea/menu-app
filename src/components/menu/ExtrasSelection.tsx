"use client";

import type { EventFormState } from "@/types/event";
import type { CandyBarFourPicks } from "@/types/cateringExtras";
import { CANDY_BAR_SLOT_COUNT } from "@/types/cateringExtras";
import { CANDY_BAR_CATALOG } from "@/data/candy-bar-catalog";
import { SAVORY_PLATTER_STANDARD_LINES } from "@/data/savory-platter-standard";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Toggle } from "@/components/ui/Toggle";

type Props = {
  state: EventFormState;
  updateField: <K extends keyof EventFormState>(key: K, value: EventFormState[K]) => void;
};

const SLOT_INDEXES = [0, 1, 2, 3] as const;

export function ExtrasSelection({ state, updateField }: Props) {
  const setCandyPick = (slot: (typeof SLOT_INDEXES)[number], pastryId: string | null) => {
    const next = state.candyBar.picks.map((id, i) =>
      i === slot ? pastryId : id,
    ) as CandyBarFourPicks;
    updateField("candyBar", { ...state.candyBar, picks: next });
  };

  return (
    <section className="flex flex-col gap-6 rounded-xl bg-zinc-50/70 p-4 dark:bg-zinc-900/40">
      <h2 className="text-sm font-semibold">Extra-uri</h2>
      <p className="text-xs text-zinc-500">
        Prețuri operaționale în MDL (unde aplică). Cafea: ON/OFF (calcul ulterior: adulți × 40
        MDL). Furșet fructe: porții (formulă ulterioară).
      </p>

      <div className="flex flex-col gap-2">
        <h3 className="text-xs font-semibold">Cafea & furșet fructe</h3>
        <Toggle
          label="Cafea"
          checked={state.coffeeEnabled}
          onCheckedChange={(v) => updateField("coffeeEnabled", v)}
        />
        <Input
          type="number"
          min={0}
          label="Furșet fructe — număr porții"
          value={state.fruitPlatterPortions || ""}
          onChange={(e) =>
            updateField("fruitPlatterPortions", Number(e.target.value) || 0)
          }
        />
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold">Candy Bar</h3>
        <p className="text-xs text-zinc-500">
          Exact {CANDY_BAR_SLOT_COUNT} tipuri de mini-prăjituri + număr total prăjituri. Preț
          final: pas ulterior.
        </p>
        <Toggle
          label="Candy Bar activ"
          checked={state.candyBar.enabled}
          onCheckedChange={(v) => updateField("candyBar", { ...state.candyBar, enabled: v })}
        />
        {SLOT_INDEXES.map((slot) => (
          <Select
            key={slot}
            label={`Mini-prăjitură ${slot + 1}`}
            value={state.candyBar.picks[slot] ?? ""}
            onChange={(e) => {
              const v = e.target.value;
              setCandyPick(slot, v === "" ? null : v);
            }}
            disabled={!state.candyBar.enabled}
          >
            <option value="">— alege —</option>
            {CANDY_BAR_CATALOG.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </Select>
        ))}
        <Input
          type="number"
          min={0}
          label="Număr total prăjituri"
          value={state.candyBar.totalPastriesCount || ""}
          disabled={!state.candyBar.enabled}
          onChange={(e) =>
            updateField("candyBar", {
              ...state.candyBar,
              totalPastriesCount: Number(e.target.value) || 0,
            })
          }
        />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-xs font-semibold">Bar & non-alcool</h3>
        <Toggle
          label="Bar"
          checked={state.barEnabled}
          onCheckedChange={(v) => updateField("barEnabled", v)}
        />
        <Toggle
          label="Non-alcool"
          checked={state.nonAlcoholEnabled}
          onCheckedChange={(v) => updateField("nonAlcoholEnabled", v)}
        />
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold">Furșet sărat (standard)</h3>
        <Toggle
          label="Furșet sărat activ"
          checked={state.savoryPlatter.enabled}
          onCheckedChange={(v) =>
            updateField("savoryPlatter", { ...state.savoryPlatter, enabled: v })
          }
        />
        <Input
          type="number"
          min={0}
          label="Număr porții"
          value={state.savoryPlatter.numberOfPortions || ""}
          disabled={!state.savoryPlatter.enabled}
          onChange={(e) =>
            updateField("savoryPlatter", {
              ...state.savoryPlatter,
              numberOfPortions: Number(e.target.value) || 0,
            })
          }
        />
        <div>
          <p className="mb-1 text-xs font-medium text-zinc-600 dark:text-zinc-400">
            Listă standard (afișare)
          </p>
          <ul className="list-inside list-disc text-xs text-zinc-600 dark:text-zinc-400">
            {SAVORY_PLATTER_STANDARD_LINES.map((line) => (
              <li key={line.id}>{line.label}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
