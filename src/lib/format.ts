/** Sumele operaționale în MDL; decor Tesalia în EUR folosește `formatEuro`. */

export function formatMoney(amount: number): string {
  return new Intl.NumberFormat("ro-RO", {
    style: "currency",
    currency: "MDL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatEuro(amount: number): string {
  return new Intl.NumberFormat("ro-RO", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}
