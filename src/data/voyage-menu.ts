import type { MenuCategory } from "@/types/menu";

/** Seed Voyage — același meniu de bază pentru Isadora și Oliva. */
function item(
  id: string,
  name: string,
  quantityOrWeight: string,
  adultPrice: number,
): MenuCategory["items"][number] {
  return {
    id,
    selected: false,
    name,
    quantityOrWeight,
    adultPrice,
    kidsIncluded: true,
    staffIncluded: true,
  };
}

export const voyageMenuSeedCategories: MenuCategory[] = [
  {
    id: "cat-voyage-antreu",
    name: "Antreu",
    items: [
      item("item-voyage-antreu-1", "Tartar din somon", "1/50", 110),
      item("item-voyage-antreu-2", "Clatite cu somon si crema de branza", "1/50", 75),
      item("item-voyage-antreu-3", "Pateu cu jeleu din portocale", "1/100", 70),
      item("item-voyage-antreu-4", "Icre rosii pe tarte", "1/7/7/20", 70),
      item("item-voyage-antreu-5", "Icre rosii servite pe gheata", "1/10/7/30", 75),
      item("item-voyage-antreu-6", "Pandispan din spanac", "1/70", 95),
      item("item-voyage-antreu-7", "Creveti pane cu sos tartar si rulouri", "portie", 95),
      item("item-voyage-antreu-8", "Legume proaspete", "1/100", 70),
      item("item-voyage-antreu-9", "Gustare Caprese", "1/100", 80),
      item("item-voyage-antreu-10", "Gustare Italiana", "1/100", 85),
    ],
  },
  {
    id: "cat-voyage-cascaval",
    name: "Gustari din cascaval",
    items: [
      item("item-voyage-cascaval-1", "Asortat din cascaval N1", "1/15/15/15/15/10/10/10", 135),
      item("item-voyage-cascaval-2", "Asortat din cascaval N2", "1/15/15/15/10/10/10", 145),
      item("item-voyage-cascaval-3", "Asortat din cascaval N3", "1/15/15/15/10/10/10/10/10", 120),
    ],
  },
  {
    id: "cat-voyage-legume-coapte",
    name: "Gustari reci din legume coapte",
    items: [
      item("item-voyage-legume-1", "Legume la gratar", "1/22/22/22/22/22", 60),
      item("item-voyage-legume-2", "Gustare din ardei copti si zucchini", "1/100/8", 90),
      item("item-voyage-legume-3", "Limba soacrei", "1/100", 75),
      item("item-voyage-legume-4", "Carpaccio din ardei", "1/100", 80),
    ],
  },
  {
    id: "cat-voyage-piftie",
    name: "Piftie",
    items: [
      item("item-voyage-piftie-1", "Piftie din cocos", "1/50/70", 95),
      item("item-voyage-piftie-2", "Piftie din limba", "1/20/20/5/70", 90),
    ],
  },
  {
    id: "cat-voyage-peste-rece",
    name: "Gustari reci din peste",
    items: [
      item("item-voyage-peste-rece-1", "Asortat de peste cu creveti", "1/30/30/15/25/25/10", 180),
      item("item-voyage-peste-rece-2", "Asortat de peste cu creveti si icre rosii", "1/30/30/15/25/7/25/10", 210),
      item("item-voyage-peste-rece-3", "Asortat de peste clasic", "1/30/30/25/25/10", 140),
      item("item-voyage-peste-rece-4", "Carpaccio din somon", "1/40/7/7", 150),
      item("item-voyage-peste-rece-5", "Asortat cu rulouri din somon si creveti", "1/40/25/15/15/10", 150),
      item("item-voyage-peste-rece-6", "Carpaccio din caracatita cu salsa", "1/50/7/7", 170),
      item("item-voyage-peste-rece-7", "Asortat de peste, somon si caracatita", "1/25/30/10", 180),
    ],
  },
  {
    id: "cat-voyage-carne-rece",
    name: "Gustari din carne",
    items: [
      item("item-voyage-carne-rece-1", "Sortiment din mezeluri italiene", "1/15/15/18/18", 180),
      item("item-voyage-carne-rece-2", "Sortiment din carne mixt", "1/30/30/15/18", 125),
      item("item-voyage-carne-rece-3", "Vitello tonnato", "1/80/30", 165),
      item("item-voyage-carne-rece-4", "Asortat de carne Trio", "30/30/30", 140),
      item("item-voyage-carne-rece-5", "Brezoala", "1/60/10/10", 175),
      item("item-voyage-carne-rece-6", "Asortat de carne cu piept de porc si rulada de curcan", "1/125", 160),
      item("item-voyage-carne-rece-7", "Asortat de carne Duo", "1/90/10/10", 125),
    ],
  },
  {
    id: "cat-voyage-salate",
    name: "Salate",
    items: [
      item("item-voyage-salate-1", "Salata Cezar cu creveti", "1/75", 80),
      item("item-voyage-salate-2", "Salata Cezar cu piept de pui", "1/100", 60),
      item("item-voyage-salate-3", "Salata cu carne de porc marinata", "1/80", 70),
      item("item-voyage-salate-4", "Salata cu ton", "1/100", 85),
      item("item-voyage-salate-5", "Salata cu produse de mare", "1/60", 105),
      item("item-voyage-salate-6", "Salata vegetariana", "1/80", 75),
      item("item-voyage-salate-7", "Salata calda cu piept de pui", "1/90", 70),
      item("item-voyage-salate-8", "Salata cu somon", "portie", 85),
      item("item-voyage-salate-9", "Salata cu piept de rata", "1/75", 80),
      item("item-voyage-salate-10", "Salata Poiana", "1/75", 70),
    ],
  },
  {
    id: "cat-voyage-gustari-calde",
    name: "Gustari calde",
    items: [
      item("item-voyage-calde-1", "Sold de rata cu pere in sirop si sos de visini", "1/110/50/10", 170),
      item("item-voyage-calde-2", "Piept de rata cu sos de visine si pere caramelizate", "1/75/30/10", 180),
      item("item-voyage-calde-3", "Ceafa coapta cu ananas sau muraturi", "1/90", 130),
      item("item-voyage-calde-4", "Piept de porc cu sos barbecue", "1/90/50", 160),
      item("item-voyage-calde-5", "Cordon Blue", "1/80", 145),
      item("item-voyage-calde-6", "Sold de pui cu sos de ciuperci si parmezan", "1/80/30", 120),
      item("item-voyage-calde-7", "Muschiulet de porc pe pat de polento cu salsa", "1/100/40", 150),
      item("item-voyage-calde-8", "Beef Wellington", "1/120", 170),
      item("item-voyage-calde-9", "Placinte", "1/100", 70),
      item("item-voyage-calde-10", "Sarmalute", "1/150", 80),
      item("item-voyage-calde-11", "Ardei California umpluti cu sarmale", "1/250/20", 120),
      item("item-voyage-calde-12", "Mule (clatite, branza, sos de ciocolata)", "1/80/5", 70),
    ],
  },
  {
    id: "cat-voyage-peste-cald",
    name: "Gustari calde din peste",
    items: [
      item("item-voyage-peste-cald-1", "Somon portionat cu legume", "1/90/70/20", 210),
      item("item-voyage-peste-cald-2", "Somon la gratar", "1/90/20", 170),
      item("item-voyage-peste-cald-3", "Peste Dorado cu produse de mare in sos Dorblu", "1/80/33/15/3", 180),
      item("item-voyage-peste-cald-4", "Peste Dorado portionat cu legume", "1/80/70/20/3", 230),
      item("item-voyage-peste-cald-5", "Peste Dorado", "1/80/20", 190),
      item("item-voyage-peste-cald-6", "Pastrav cu bacon", "1/80/20", 180),
    ],
  },
  {
    id: "cat-voyage-fel-principal",
    name: "Bucate fierbinti (felul principal)",
    items: [
      item("item-voyage-principal-1", "Friptura de iepure cu mamaliga, branza si smantana", "1/100/45/20/20", 150),
      item("item-voyage-principal-2", "Sortiment de carne mixt", "1/60/70", 180),
      item("item-voyage-principal-3", "Piept de porc pe polento", "1/80/80/30", 140),
      item("item-voyage-principal-4", "Ceafa coapta cu ananas/muraturi", "1/80", 130),
      item("item-voyage-principal-5", "Frigarui mixt cu turnulete de legume", "1/60/60/60", 140),
      item("item-voyage-principal-6", "Medalion din vitel portionat", "portie", 210),
      item("item-voyage-principal-7", "Beef Wellington", "portie", 170),
      item("item-voyage-principal-8", "Sortiment din carne cu muraturi", "1/70/70/50", 180),
      item("item-voyage-principal-9", "Rulouri din porc cu becon si legume", "portie", 160),
      item("item-voyage-principal-10", "Platou cu carne", "portie", 180),
    ],
  },
  {
    id: "cat-voyage-garnituri",
    name: "Garnituri",
    items: [
      item("item-voyage-garnituri-1", "Legume coapte", "1/60", 65),
      item("item-voyage-garnituri-2", "Legume crocante", "1/85", 65),
      item("item-voyage-garnituri-3", "Cartofi", "1/80", 55),
      item("item-voyage-garnituri-4", "Mamaliga cu branza si smantana", "1/70/10/20", 50),
      item("item-voyage-garnituri-5", "Muraturi", "1/80/8/25", 60),
      item("item-voyage-garnituri-6", "Smantana", "1/20", 15),
      item("item-voyage-garnituri-7", "Paine", "portie", 15),
      item("item-voyage-garnituri-8", "Chifle", "portie", 20),
    ],
  },
];
