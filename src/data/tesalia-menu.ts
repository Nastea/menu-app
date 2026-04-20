import type { MenuCategory } from "@/types/menu";

/**
 * Seed Tesalia — categorii + itemi exemplu (editabili în formular).
 * La runtime se clonează în `EventFormState.menuCategories`.
 */
export const tesaliaMenuSeedCategories: MenuCategory[] = [
  {
    id: "cat-tesalia-starters",
    name: "Aperitive / startere",
    items: [
      {
        id: "item-tesalia-1",
        selected: false,
        name: "Platou aperitive",
        quantityOrWeight: "1 platou",
        adultPrice: 0,
        kidsIncluded: true,
        staffIncluded: true,
      },
    ],
  },
  {
    id: "cat-tesalia-main",
    name: "Fel principal",
    items: [
      {
        id: "item-tesalia-2",
        selected: false,
        name: "Exemplu fel",
        quantityOrWeight: "250g",
        adultPrice: 0,
        kidsIncluded: true,
        staffIncluded: true,
      },
    ],
  },
];
