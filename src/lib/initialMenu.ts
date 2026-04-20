import { tesaliaMenuSeedCategories } from "@/data/tesalia-menu";
import { voyageMenuSeedCategories } from "@/data/voyage-menu";
import type { MenuCategory, RestaurantId } from "@/types/menu";

function cloneCategories(cats: MenuCategory[]): MenuCategory[] {
  return JSON.parse(JSON.stringify(cats)) as MenuCategory[];
}

export function getSeedMenuCategories(restaurant: RestaurantId): MenuCategory[] {
  const src = restaurant === "tesalia" ? tesaliaMenuSeedCategories : voyageMenuSeedCategories;
  return cloneCategories(src);
}
