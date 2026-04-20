import type { MenuCategory } from "@/types/menu";

/** Seed Voyage — același meniu de bază pentru Isadora și Oliva. */
export const voyageMenuSeedCategories: MenuCategory[] = [
  {
    id: "cat-voyage-starters",
    name: "Startere",
    items: [
      {
        id: "item-voyage-1",
        selected: false,
        name: "Exemplu starter",
        quantityOrWeight: "150g",
        adultPrice: 0,
        kidsIncluded: true,
        staffIncluded: true,
      },
    ],
  },
];
