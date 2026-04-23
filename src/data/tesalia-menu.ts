import type { MenuCategory } from "@/types/menu";

/**
 * Seed Tesalia — categorii + itemi exemplu (editabili în formular).
 * La runtime se clonează în `EventFormState.menuCategories`.
 */
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

export const tesaliaMenuSeedCategories: MenuCategory[] = [
  {
    id: "cat-tesalia-antreu",
    name: "Antreu",
    items: [
      item("item-tesalia-antreu-1", "Tartar din somon", "1/50", 110),
      item(
        "item-tesalia-antreu-2",
        "Clatite cu somon si crema de branza",
        "1/50",
        75,
      ),
      item("item-tesalia-antreu-3", "Pateu cu jeleu din portocale", "1/100", 85),
      item("item-tesalia-antreu-4", "Icre rosii pe tarte", "1/7/7/20", 65),
      item("item-tesalia-antreu-5", "Icre rosii servite pe gheata", "1/10/7/30", 85),
      item("item-tesalia-antreu-6", "Pandispan din spanac", "1/70", 95),
      item(
        "item-tesalia-antreu-7",
        "Creveti pane cu sos tartar si rulouri",
        "portie",
        125,
      ),
      item("item-tesalia-antreu-8", "Legume proaspete", "1/100", 80),
      item("item-tesalia-antreu-9", "Gustare Caprese", "1/100", 90),
      item("item-tesalia-antreu-10", "Gustare Italiana", "1/100", 105),
    ],
  },
  {
    id: "cat-tesalia-cascaval",
    name: "Gustari din cascaval",
    items: [
      item(
        "item-tesalia-cascaval-1",
        "Asortat din cascaval N1",
        "1/15/15/15/15/10/10/10",
        170,
      ),
      item(
        "item-tesalia-cascaval-2",
        "Asortat din cascaval N2",
        "1/15/15/15/10/10/10",
        185,
      ),
      item(
        "item-tesalia-cascaval-3",
        "Asortat din cascaval N3",
        "1/15/15/15/10/10/10/10/10",
        160,
      ),
      item(
        "item-tesalia-cascaval-4",
        "Asortat din cascaval premium cu mezeluri italiene",
        "portie",
        0,
      ),
    ],
  },
  {
    id: "cat-tesalia-legume-coapte",
    name: "Gustari reci din legume coapte",
    items: [
      item("item-tesalia-legume-1", "Legume la gratar", "1/22/22/22/22/22", 105),
      item(
        "item-tesalia-legume-2",
        "Gustare din ardei copti si zucchini",
        "1/100/8",
        125,
      ),
      item("item-tesalia-legume-3", "Limba soacrei", "1/100", 85),
      item("item-tesalia-legume-4", "Carpaccio din ardei", "1/100", 95),
    ],
  },
  {
    id: "cat-tesalia-piftie",
    name: "Piftie",
    items: [
      item("item-tesalia-piftie-1", "Piftie din cocos", "1/50/70", 130),
      item("item-tesalia-piftie-2", "Piftie din limba", "1/20/20/5/70", 120),
    ],
  },
  {
    id: "cat-tesalia-peste-rece",
    name: "Gustari reci din peste",
    items: [
      item(
        "item-tesalia-peste-rece-1",
        "Asortat de peste cu creveti",
        "1/30/30/15/25/25/10",
        210,
      ),
      item(
        "item-tesalia-peste-rece-2",
        "Asortat de peste cu creveti si icre rosii",
        "1/30/30/15/25/7/25/10",
        255,
      ),
      item(
        "item-tesalia-peste-rece-3",
        "Asortat de peste clasic",
        "1/30/30/25/25/10",
        170,
      ),
      item("item-tesalia-peste-rece-4", "Carpaccio din somon", "1/40/7/7", 175),
      item(
        "item-tesalia-peste-rece-5",
        "Asortat cu rulouri din somon si creveti",
        "1/40/25/15/15/10",
        210,
      ),
      item(
        "item-tesalia-peste-rece-6",
        "Carpaccio din caracatita cu salsa",
        "1/50/7/7",
        185,
      ),
      item(
        "item-tesalia-peste-rece-7",
        "Asortat de peste, somon si caracatita",
        "1/25/30/10",
        195,
      ),
    ],
  },
  {
    id: "cat-tesalia-carne-rece",
    name: "Gustari din carne",
    items: [
      item(
        "item-tesalia-carne-rece-1",
        "Sortiment din mezeluri italiene",
        "1/15/15/18/18",
        210,
      ),
      item(
        "item-tesalia-carne-rece-2",
        "Sortiment din carne mixt",
        "1/30/30/15/18",
        180,
      ),
      item("item-tesalia-carne-rece-3", "Vitello tonnato", "1/80/30", 190),
      item(
        "item-tesalia-carne-rece-4",
        "Asortat de carne Trio",
        "30/30/30",
        190,
      ),
      item("item-tesalia-carne-rece-5", "Brezoala", "1/60/10/10", 185),
      item(
        "item-tesalia-carne-rece-6",
        "Asortat de carne cu rulada de porc si limba de vita",
        "1/125",
        185,
      ),
      item("item-tesalia-carne-rece-7", "Asortat de carne Duo", "1/90/10/10", 180),
      item("item-tesalia-carne-rece-8", "Mixt de antipasti", "portie", 220),
    ],
  },
  {
    id: "cat-tesalia-salate",
    name: "Salate",
    items: [
      item("item-tesalia-salate-1", "Salata Cezar cu creveti", "1/75", 90),
      item("item-tesalia-salate-2", "Salata Cezar cu piept de pui", "1/100", 75),
      item("item-tesalia-salate-3", "Salata cu carne de porc marinata", "1/80", 80),
      item("item-tesalia-salate-4", "Salata cu ton", "1/100", 95),
      item("item-tesalia-salate-5", "Salata cu produse de mare", "1/60", 120),
      item("item-tesalia-salate-6", "Salata vegetariana", "1/80", 85),
      item("item-tesalia-salate-7", "Salata calda cu piept de pui", "1/90", 85),
      item("item-tesalia-salate-8", "Salata cu somon", "portie", 115),
      item("item-tesalia-salate-9", "Salata cu piept de rata", "1/75", 105),
      item("item-tesalia-salate-10", "Salata Poiana", "1/75", 80),
    ],
  },
  {
    id: "cat-tesalia-gustari-calde",
    name: "Gustari calde",
    items: [
      item(
        "item-tesalia-calde-1",
        "Sold de rata cu pere in sirop si sos de visini",
        "1/110/50/10",
        190,
      ),
      item(
        "item-tesalia-calde-2",
        "Piept de rata cu sos de visine si pere caramelizate",
        "1/75/30/10",
        220,
      ),
      item(
        "item-tesalia-calde-3",
        "Ceafa coapta cu ananas sau muraturi",
        "1/90",
        170,
      ),
      item("item-tesalia-calde-4", "Cordon Blue", "1/80", 160),
      item(
        "item-tesalia-calde-5",
        "Sold de pui cu sos de ciuperci si parmezan",
        "1/80/30",
        160,
      ),
      item("item-tesalia-calde-6", "Piept de porc cu sos barbecue", "1/90/50", 160),
      item(
        "item-tesalia-calde-7",
        "Muschiulet de porc pe pat de polento cu salsa",
        "1/100/40",
        185,
      ),
      item("item-tesalia-calde-8", "Beef Wellington", "1/120", 190),
      item("item-tesalia-calde-9", "Placinte", "1/100", 80),
      item("item-tesalia-calde-10", "Sarmalute", "1/150", 90),
      item(
        "item-tesalia-calde-11",
        "Ardei California umpluti cu sarmale",
        "1/250/20",
        150,
      ),
      item("item-tesalia-calde-12", "Mule (clatite, branza, sos de ciocolata)", "1/80/5", 80),
    ],
  },
  {
    id: "cat-tesalia-peste-cald",
    name: "Gustari calde din peste",
    items: [
      item("item-tesalia-peste-cald-1", "Somon portionat cu legume", "1/90/70/20", 240),
      item("item-tesalia-peste-cald-2", "Somon la gratar", "1/90/20", 190),
      item(
        "item-tesalia-peste-cald-3",
        "Peste Dorado cu produse de mare in sos Dorblu",
        "1/80/33/15/3",
        210,
      ),
      item(
        "item-tesalia-peste-cald-4",
        "Peste Dorado portionat cu legume",
        "1/80/70/20/3",
        260,
      ),
      item("item-tesalia-peste-cald-5", "Peste Dorado", "1/80/20", 220),
      item("item-tesalia-peste-cald-6", "Pastrav cu bacon", "1/80/20", 180),
    ],
  },
  {
    id: "cat-tesalia-fel-principal",
    name: "Bucate fierbinti (felul principal)",
    items: [
      item(
        "item-tesalia-principal-1",
        "Friptura de iepure cu mamaliga, branza si smantana",
        "1/100/45/20/20",
        190,
      ),
      item(
        "item-tesalia-principal-2",
        "Sortiment de carne mixt",
        "1/60/70",
        230,
      ),
      item("item-tesalia-principal-3", "Piept de porc pe polento", "1/80/80/30", 185),
      item(
        "item-tesalia-principal-4",
        "Ceafa coapta cu ananas/muraturi",
        "1/80",
        170,
      ),
      item(
        "item-tesalia-principal-5",
        "Frigarui mixt cu turnulete de legume",
        "1/60/60/60",
        180,
      ),
      item("item-tesalia-principal-6", "Medalion din vitel portionat", "portie", 250),
      item("item-tesalia-principal-7", "Beef Wellington", "portie", 190),
      item(
        "item-tesalia-principal-8",
        "Sortiment din carne cu muraturi",
        "1/70/70/50",
        220,
      ),
      item(
        "item-tesalia-principal-9",
        "Rulouri din porc cu bacon si legume",
        "portie",
        180,
      ),
      item("item-tesalia-principal-10", "Platou cu carne", "portie", 180),
    ],
  },
  {
    id: "cat-tesalia-garnituri",
    name: "Garnituri",
    items: [
      item("item-tesalia-garnituri-1", "Legume coapte", "1/60", 65),
      item("item-tesalia-garnituri-2", "Legume crocante", "1/85", 65),
      item("item-tesalia-garnituri-3", "Cartofi", "1/80", 50),
      item(
        "item-tesalia-garnituri-4",
        "Mamaliga cu branza si smantana",
        "1/70/10/20",
        50,
      ),
      item("item-tesalia-garnituri-5", "Muraturi", "1/80/8/25", 60),
      item("item-tesalia-garnituri-6", "Smantana", "1/20", 15),
      item("item-tesalia-garnituri-7", "Paine", "portie", 15),
      item("item-tesalia-garnituri-8", "Chifle", "portie", 20),
    ],
  },
];
