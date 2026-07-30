import { tesaliaMenuSeedCategories } from "@/data/tesalia-menu";
import { voyageMenuSeedCategories } from "@/data/voyage-menu";
import type { MenuCategory, RestaurantId } from "@/types/menu";

function cloneCategories(cats: MenuCategory[]): MenuCategory[] {
  return JSON.parse(JSON.stringify(cats)) as MenuCategory[];
}

function withBreadSelected(categories: MenuCategory[]): MenuCategory[] {
  return categories.map((category) => ({
    ...category,
    items: category.items.map((item) => ({
      ...item,
      selected: /paine/i.test(item.name) ? true : item.selected,
    })),
  }));
}

export function getSeedMenuCategories(restaurant: RestaurantId): MenuCategory[] {
  const src = restaurant === "tesalia" ? tesaliaMenuSeedCategories : voyageMenuSeedCategories;
  return withBreadSelected(cloneCategories(src));
}

export function ensureBreadIsSelected(categories: MenuCategory[]): MenuCategory[] {
  return withBreadSelected(cloneCategories(categories));
}
