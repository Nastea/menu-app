import type { EventFormState } from "@/types/event";
import { EXTERNAL_DECOR_RATE_PER_TABLE_MDL, TESALIA_INTERNAL_DECOR_EUR } from "@/types/event";
import { BAR_PACKAGES, NON_ALCOHOL_PACKAGES } from "@/data/bar-packages";

export type TotalsSnapshot = {
  menuPerAdult: number;
  menuTotal: number;
  mainMenuServiceFeePercent: number;
  mainMenuServiceFeeTotal: number;
  coffeeTotal: number;
  barTotal: number;
  nonAlcoholTotal: number;
  coloredTableclothsTotal: number;
  decorInternalEuro: number;
  cardFeeTotal: number;
  extrasTotal: number;
  advancesTotal: number;
  remaining: number;
  subtotal: number;
  total: number;
};

export type SelectedMenuItem = {
  categoryId: string;
  categoryName: string;
  itemId: string;
  itemName: string;
  quantityOrWeight: string;
  adultPrice: number;
};

export function getSelectedMenuItems(state: EventFormState): SelectedMenuItem[] {
  return state.menuCategories.flatMap((cat) =>
    cat.items
      .filter((item) => item.selected)
      .map((item) => ({
        categoryId: cat.id,
        categoryName: cat.name,
        itemId: item.id,
        itemName: item.name,
        quantityOrWeight: item.quantityOrWeight,
        adultPrice: item.adultPrice,
      })),
  );
}

export function computeTotals(state: EventFormState): TotalsSnapshot {
  const selectedMenuItems = getSelectedMenuItems(state);
  const menuPerAdult = selectedMenuItems.reduce((acc, item) => acc + (item.adultPrice || 0), 0);
  const menuTotal = menuPerAdult * (state.adults || 0);

  const coffeeTotal = state.coffeeEnabled ? (state.adults || 0) * 40 : 0;
  const barTotal = state.barEnabled
    ? (BAR_PACKAGES.find((p) => p.id === state.barPackageId)?.totalPriceMdl ?? 0)
    : 0;
  const nonAlcoholTotal = state.nonAlcoholEnabled
    ? (NON_ALCOHOL_PACKAGES.find((p) => p.id === state.nonAlcoholPackageId)?.totalPriceMdl ?? 0)
    : 0;
  const coloredTableclothsTotal =
    state.decorSource === "external"
      ? (state.externalTableCount || 0) * EXTERNAL_DECOR_RATE_PER_TABLE_MDL
      : 0;
  const decorInternalEuro =
    state.decorSource === "internal" && state.restaurant === "tesalia"
      ? TESALIA_INTERNAL_DECOR_EUR
      : 0;

  const mainMenuServiceFeePercent =
    state.mainMenuServiceFeeEnabled ? (state.restaurant === "voyage" ? 0.05 : 0.1) : 0;
  const mainMenuServiceFeeTotal = menuTotal * mainMenuServiceFeePercent;
  const extrasTotal = coffeeTotal + barTotal + nonAlcoholTotal + coloredTableclothsTotal;
  const subtotal = menuTotal + mainMenuServiceFeeTotal + extrasTotal;
  const cardFeeTotal = state.paymentByCard ? subtotal * 0.02 : 0;
  const advancesTotal = (state.advance1 || 0) + (state.advance2 || 0);
  const total = subtotal + cardFeeTotal;
  const remaining = Math.max(total - advancesTotal, 0);

  return {
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
    extrasTotal,
    advancesTotal,
    remaining,
    subtotal,
    total,
  };
}
