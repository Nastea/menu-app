"use client";

import type { EventFormState } from "@/types/event";
import { computeTotals } from "@/lib/calculations";
import { formatEuro, formatMoney } from "@/lib/format";

type Props = {
  state: EventFormState;
};

export function TotalsCard({ state }: Props) {
  const {
    menuPerAdult,
    menuTotal,
    mainMenuServiceFeePercent,
    mainMenuServiceFeeTotal,
    coffeeTotal,
    barTotal,
    nonAlcoholTotal,
    coloredTableclothsTotal,
    decorInternalEuro,
    cardFeeTotal,
    subtotal,
    total,
    advancesTotal,
    remaining,
  } = computeTotals(state);

  return (
    <section className="flex flex-col gap-2 rounded-xl bg-zinc-50/70 p-4 dark:bg-zinc-900/40">
      <h2 className="text-sm font-semibold">Totaluri</h2>
      <dl className="grid grid-cols-2 gap-x-2 gap-y-1 text-sm">
        <dt className="text-zinc-500">Meniu / adult</dt>
        <dd className="text-right font-medium">{formatMoney(menuPerAdult)}</dd>
        <dt className="text-zinc-500">Meniu total</dt>
        <dd className="text-right font-medium">{formatMoney(menuTotal)}</dd>
        <dt className="text-zinc-500">
          Taxă meniu principal ({Math.round(mainMenuServiceFeePercent * 100)}%)
        </dt>
        <dd className="text-right">{formatMoney(mainMenuServiceFeeTotal)}</dd>
        <dt className="text-zinc-500">Cafea</dt>
        <dd className="text-right">{formatMoney(coffeeTotal)}</dd>
        <dt className="text-zinc-500">Bar</dt>
        <dd className="text-right">{formatMoney(barTotal)}</dd>
        <dt className="text-zinc-500">Non-alcoolic</dt>
        <dd className="text-right">{formatMoney(nonAlcoholTotal)}</dd>
        <dt className="text-zinc-500">Fețe de masă colorate</dt>
        <dd className="text-right">{formatMoney(coloredTableclothsTotal)}</dd>
        <dt className="text-zinc-500">Decor intern (EUR)</dt>
        <dd className="text-right">{formatEuro(decorInternalEuro)}</dd>
        <dt className="text-zinc-500">Subtotal</dt>
        <dd className="text-right font-medium">{formatMoney(subtotal)}</dd>
        <dt className="text-zinc-500">Comision card (2%)</dt>
        <dd className="text-right">{formatMoney(cardFeeTotal)}</dd>
        <dt className="text-zinc-500">Total</dt>
        <dd className="text-right font-semibold">{formatMoney(total)}</dd>
        <dt className="text-zinc-500">Avans total</dt>
        <dd className="text-right">{formatMoney(advancesTotal)}</dd>
        <dt className="text-zinc-500">Rest de achitat</dt>
        <dd className="text-right font-semibold">{formatMoney(remaining)}</dd>
      </dl>
      <p className="text-xs text-zinc-500">
        Totaluri live în MDL, calculate din selecțiile curente.
      </p>
    </section>
  );
}
