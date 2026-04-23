"use client";

import type { EventFormState } from "@/types/event";
import { Input } from "@/components/ui/Input";
import { Toggle } from "@/components/ui/Toggle";

type Props = {
  state: EventFormState;
  updateField: <K extends keyof EventFormState>(key: K, value: EventFormState[K]) => void;
};

export function AdvancesCard({ state, updateField }: Props) {
  const servicePct = state.restaurant === "voyage" ? 5 : 10;

  return (
    <section className="flex flex-col gap-2 rounded-xl bg-zinc-50/70 p-4 dark:bg-zinc-900/40">
      <h2 className="text-sm font-semibold">Avans</h2>
      <Input
        type="number"
        min={0}
        step={0.01}
        label="Avans 1 (MDL)"
        value={state.advance1 || ""}
        onChange={(e) => updateField("advance1", Number(e.target.value) || 0)}
      />
      <Input
        type="number"
        min={0}
        step={0.01}
        label="Avans 2 (MDL)"
        value={state.advance2 || ""}
        onChange={(e) => updateField("advance2", Number(e.target.value) || 0)}
      />
      <div className="mt-1 border-t border-zinc-200 pt-2 dark:border-zinc-700">
        <Toggle
          label="Plată cu card (+2%)"
          checked={state.paymentByCard}
          onCheckedChange={(v) => updateField("paymentByCard", v)}
        />
        <Toggle
          label={`Taxă meniu principal (+${servicePct}% — opțional)`}
          checked={state.mainMenuServiceFeeEnabled}
          onCheckedChange={(v) => updateField("mainMenuServiceFeeEnabled", v)}
        />
      </div>
    </section>
  );
}
