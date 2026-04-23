export type BarPackageId = "bar-1" | "bar-2" | "bar-3" | "bar-4";
export type NonAlcoholPackageId = "na-1" | "na-2" | "na-3";

export const BAR_PACKAGES: { id: BarPackageId; label: string; totalShots: number; totalPriceMdl: number }[] =
  [
    { id: "bar-1", label: "Pachet Nr. 1", totalShots: 148, totalPriceMdl: 10000 },
    { id: "bar-2", label: "Pachet Nr. 2", totalShots: 198, totalPriceMdl: 13800 },
    { id: "bar-3", label: "Pachet Nr. 3", totalShots: 250, totalPriceMdl: 17000 },
    { id: "bar-4", label: "Pachet Nr. 4", totalShots: 300, totalPriceMdl: 20000 },
  ];

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

export function getBarPackageLabel(id: string): string {
  const hit = BAR_PACKAGES.find((p) => p.id === id);
  return hit ? `${hit.label} (${hit.totalPriceMdl} MDL)` : "—";
}

export function getNonAlcoholPackageLabel(id: string): string {
  const hit = NON_ALCOHOL_PACKAGES.find((p) => p.id === id);
  return hit ? `${hit.label} (${hit.totalPriceMdl} MDL)` : "—";
}
