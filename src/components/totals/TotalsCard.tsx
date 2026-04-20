"use client";

import type { EventFormState } from "@/types/event";
import { computeTotals } from "@/lib/calculations";
import { formatMoney } from "@/lib/format";

type Props = {
  state: EventFormState;
};

export function TotalsCard({ state }: Props) {
  const { subtotal, total } = computeTotals(state);

  return (
    <section className="flex flex-col gap-2 rounded-xl bg-zinc-50/70 p-4 dark:bg-zinc-900/40">
      <h2 className="text-sm font-semibold">Totaluri</h2>
      <dl className="grid grid-cols-2 gap-x-2 gap-y-1 text-sm">
        <dt className="text-zinc-500">Subtotal</dt>
        <dd className="text-right font-medium">{formatMoney(subtotal)}</dd>
        <dt className="text-zinc-500">Total</dt>
        <dd className="text-right font-semibold">{formatMoney(total)}</dd>
      </dl>
      <p className="text-xs text-zinc-500">
        Totaluri în MDL (stub). Decor: vezi regulile în preview (decorSource + restaurant).
      </p>
    </section>
  );
}
