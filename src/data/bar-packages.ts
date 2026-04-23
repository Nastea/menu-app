export type BarPackageId = "bar-1" | "bar-2" | "bar-3" | "bar-4";
export type NonAlcoholPackageId = "na-1" | "na-2" | "na-3";

export const BAR_PACKAGES: { id: BarPackageId; label: string; totalShots: number; totalPriceMdl: number }[] =
  [
    { id: "bar-1", label: "Pachet Nr. 1", totalShots: 148, totalPriceMdl: 10000 },
    { id: "bar-2", label: "Pachet Nr. 2", totalShots: 198, totalPriceMdl: 13800 },
    { id: "bar-3", label: "Pachet Nr. 3", totalShots: 250, totalPriceMdl: 17000 },
    { id: "bar-4", label: "Pachet Nr. 4", totalShots: 300, totalPriceMdl: 20000 },
  ];

const BAR_PACKAGE_CONTENT: Record<BarPackageId, string[]> = {
  "bar-1": [
    "Citrus Spritz × 20",
    "Aperol Spritz × 20",
    "Mojito × 20",
    "Tequila Sunrise × 20",
    "Pink Malibu × 20",
    "Green Apple Cooler × 0",
    "B-52 × 12",
    "Green Mexican × 12",
    "Red Mexican × 12",
    "Bazooka Joe × 12",
  ],
  "bar-2": [
    "Citrus Spritz × 26",
    "Aperol Spritz × 26",
    "Mojito × 26",
    "Tequila Sunrise × 26",
    "Pink Malibu × 26",
    "Green Apple Cooler × 0",
    "B-52 × 17",
    "Green Mexican × 17",
    "Red Mexican × 17",
    "Bazooka Joe × 17",
  ],
  "bar-3": [
    "Citrus Spritz × 30",
    "Aperol Spritz × 30",
    "Mojito × 30",
    "Tequila Sunrise × 30",
    "Pink Malibu × 30",
    "Green Apple Cooler × 20",
    "B-52 × 20",
    "Green Mexican × 20",
    "Red Mexican × 20",
    "Bazooka Joe × 20",
  ],
  "bar-4": [
    "Citrus Spritz × 35",
    "Aperol Spritz × 35",
    "Mojito × 35",
    "Tequila Sunrise × 35",
    "Pink Malibu × 35",
    "Green Apple Cooler × 25",
    "B-52 × 25",
    "Green Mexican × 25",
    "Red Mexican × 25",
    "Bazooka Joe × 25",
  ],
};

export const NON_ALCOHOL_PACKAGES: {
  id: NonAlcoholPackageId;
  label: string;
  totalLiters: number;
  totalPriceMdl: number;
}[] = [
  { id: "na-1", label: "Pachet Nr. 1", totalLiters: 100, totalPriceMdl: 2400 },
  { id: "na-2", label: "Pachet Nr. 2", totalLiters: 150, totalPriceMdl: 3240 },
  { id: "na-3", label: "Pachet Nr. 3", totalLiters: 200, totalPriceMdl: 4080 },
];

const NON_ALCOHOL_CONTENT: Record<NonAlcoholPackageId, string[]> = {
  "na-1": ["Limonadă × 50", "Orangiadă × 50"],
  "na-2": ["Limonadă × 100", "Orangiadă × 50"],
  "na-3": ["Limonadă × 100", "Orangiadă × 100"],
};

export function getBarPackageLabel(id: string): string {
  const hit = BAR_PACKAGES.find((p) => p.id === id);
  return hit ? `${hit.label} (${hit.totalPriceMdl} MDL)` : "—";
}

export function getNonAlcoholPackageLabel(id: string): string {
  const hit = NON_ALCOHOL_PACKAGES.find((p) => p.id === id);
  return hit ? `${hit.label} (${hit.totalPriceMdl} MDL)` : "—";
}

export function getBarPackageContents(id: BarPackageId | ""): string[] {
  if (!id) return [];
  return BAR_PACKAGE_CONTENT[id] ?? [];
}

export function getNonAlcoholPackageContents(id: NonAlcoholPackageId | ""): string[] {
  if (!id) return [];
  return NON_ALCOHOL_CONTENT[id] ?? [];
}
