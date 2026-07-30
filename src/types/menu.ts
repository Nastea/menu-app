/** Restaurante și săli (Voyage). Același meniu de bază Voyage pentru Isadora și Oliva. */

export type RestaurantId = "tesalia" | "voyage";

export type VoyageHallId = "isadora" | "oliva";

/** Runda de servire pe print („MASA I” / „MASA A II-A”). Implicit „1”. */
export type MasaId = "1" | "2";

/**
 * Item de meniu editabil.
 * Prețurile sunt în MDL (convenție proiect).
 */
export type EditableMenuItem = {
  id: string;
  selected: boolean;
  name: string;
  quantityOrWeight: string;
  portionSize: "1" | "1/2";
  /** Runda de servire pentru print; absent => „MASA I”. */
  masa?: MasaId;
  adultPrice: number;
  kidsIncluded: boolean;
  staffIncluded: boolean;
};

/** Categorie de meniu cu listă de itemi (add / edit / delete la nivel item). */
export type MenuCategory = {
  id: string;
  name: string;
  items: EditableMenuItem[];
};
