import type { EditableMenuItem } from "@/types/menu";
import { newId } from "@/lib/newId";

export function createEmptyMenuItem(): EditableMenuItem {
  return {
    id: newId("item"),
    selected: false,
    name: "",
    quantityOrWeight: "",
    portionSize: "1",
    masa: "1",
    adultPrice: 0,
    kidsIncluded: true,
    staffIncluded: true,
  };
}
