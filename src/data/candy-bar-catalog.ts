import type { CandyBarPastryId } from "@/types/cateringExtras";

export type CandyBarCatalogEntry = {
  id: CandyBarPastryId;
  name: string;
};

/** Lista fixă de prăjituri disponibile pentru Candy Bar (selecție în formular). */
export const CANDY_BAR_CATALOG: CandyBarCatalogEntry[] = [
  { id: "cb-eclere-crema", name: "Eclere minni cu crema" },
  { id: "cb-mousse-tropic", name: "Mini mousse Tropic" },
  { id: "cb-eclere-ciocolata", name: "Eclere minni cu ciocolata" },
  { id: "cb-mousse-zmeura", name: "Mini mousse Zmeura" },
  { id: "cb-eclere-caramel", name: "Eclere minni cu caramela" },
  { id: "cb-eskimo", name: "Eskimo (prajitura cartof)" },
  { id: "cb-mousse-fistic-zmeura", name: "Mousse Fistic si Zmeura" },
  { id: "cb-choux-fistic-zmeura", name: "Choux cu crema fistic si insert de zmeura" },
  { id: "cb-tiramisu-mini", name: "Tiramisu minni" },
  { id: "cb-choux-ciocolata-caramel", name: "Choux cu crema ciocolata si caramela" },
  { id: "cb-panna-cotta-mini", name: "Panna Cotta minni" },
  { id: "cb-choux-vanilie-capsuna", name: "Choux cu crema vanilie si capsuna" },
  { id: "cb-cheesecake-mango", name: "Cheescake Mango Maracuia mini" },
  { id: "cb-macarons", name: "Macarons assorti" },
  { id: "cb-cheesecake-capsuna", name: "Cheescake Capsuna mini" },
];

const byId = new Map(CANDY_BAR_CATALOG.map((e) => [e.id, e.name]));

export function getCandyBarPastryLabel(id: CandyBarPastryId | null): string {
  if (!id) return "—";
  return byId.get(id) ?? id;
}
