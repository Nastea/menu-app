import type { SupabaseClient } from "@supabase/supabase-js";
import type { MenuCategory, RestaurantId } from "@/types/menu";

type MasterMenuRow = {
  restaurant: RestaurantId;
  category_id: string;
  category_name: string;
  item_id: string;
  item_name: string;
  quantity_or_weight: string;
  adult_price: number;
  kids_included: boolean;
  staff_included: boolean;
  sort_order: number;
};

function toRows(restaurant: RestaurantId, categories: MenuCategory[]): MasterMenuRow[] {
  return categories.flatMap((category, categoryIndex) =>
    category.items.map((item, itemIndex) => ({
      restaurant,
      category_id: category.id,
      category_name: category.name,
      item_id: item.id,
      item_name: item.name,
      quantity_or_weight: item.quantityOrWeight,
      adult_price: item.adultPrice,
      kids_included: item.kidsIncluded,
      staff_included: item.staffIncluded,
      sort_order: categoryIndex * 1000 + itemIndex,
    })),
  );
}

function rowsToCategories(rows: MasterMenuRow[]): MenuCategory[] {
  const sorted = [...rows].sort((a, b) => a.sort_order - b.sort_order);
  const map = new Map<string, MenuCategory>();

  for (const row of sorted) {
    if (!map.has(row.category_id)) {
      map.set(row.category_id, { id: row.category_id, name: row.category_name, items: [] });
    }
    const cat = map.get(row.category_id);
    if (!cat) continue;
    cat.items.push({
      id: row.item_id,
      selected: false,
      name: row.item_name,
      quantityOrWeight: row.quantity_or_weight,
      adultPrice: Number(row.adult_price) || 0,
      kidsIncluded: Boolean(row.kids_included),
      staffIncluded: Boolean(row.staff_included),
    });
  }

  return Array.from(map.values());
}

export async function loadMasterMenu(
  client: SupabaseClient,
  restaurant: RestaurantId,
): Promise<{ categories: MenuCategory[] | null; error: Error | null }> {
  const { data, error } = await client
    .from("master_menu_items")
    .select("*")
    .eq("restaurant", restaurant)
    .order("sort_order", { ascending: true });

  if (error) return { categories: null, error: new Error(error.message) };
  if (!data || data.length === 0) return { categories: null, error: null };

  return { categories: rowsToCategories(data as MasterMenuRow[]), error: null };
}

export async function saveMasterMenu(
  client: SupabaseClient,
  restaurant: RestaurantId,
  categories: MenuCategory[],
): Promise<{ error: Error | null }> {
  const rows = toRows(restaurant, categories);

  const del = await client.from("master_menu_items").delete().eq("restaurant", restaurant);
  if (del.error) return { error: new Error(del.error.message) };

  if (rows.length === 0) return { error: null };

  const ins = await client.from("master_menu_items").insert(rows);
  if (ins.error) return { error: new Error(ins.error.message) };

  return { error: null };
}
