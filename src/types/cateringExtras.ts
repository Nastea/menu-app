/**
 * Candy Bar — 4 sloturi de tipuri + cantitate totală.
 * Formula de preț finală: pas ulterior.
 */

export type CandyBarPastryId = string;

/** Exact 4 alegeri (null = slot neales încă). */
export type CandyBarFourPicks = [
  CandyBarPastryId | null,
  CandyBarPastryId | null,
  CandyBarPastryId | null,
  CandyBarPastryId | null,
];

export type CandyBarFormState = {
  enabled: boolean;
  picks: CandyBarFourPicks;
  /** Număr total de prăjituri (introdus de utilizator). */
  totalPastriesCount: number;
};

export const CANDY_BAR_SLOT_COUNT = 4 as const;

/** Furșet sărat — un singur tip standard; listă fixă doar pentru afișare. */
export type SavoryPlatterFormState = {
  enabled: boolean;
  numberOfPortions: number;
};

/** Linie din lista standard (catalog static). */
export type SavoryPlatterLine = {
  id: string;
  label: string;
};
