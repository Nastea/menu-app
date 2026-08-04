/**
 * Ingrediente per fel de mâncare (din „Tesalia meniu 2026 FINAL").
 * Cheia este numele exact al felului din seed (Tesalia și Voyage folosesc aceleași
 * denumiri, deci harta acoperă ambele restaurante). Se rezolvă la momentul printării,
 * așa că apare și pentru evenimentele deja salvate — fără modificări la tip/persistență.
 * Felurile fără ingrediente listate (denumirea e autoexplicativă) sunt omise intenționat.
 */
export const MENU_INGREDIENTS: Record<string, string> = {
  // Antreu
  "Clatite cu somon si crema de branza": "clătite, somon, cremă de brânză",
  "Pateu cu jeleu din portocale": "pateu de ficat, jeleu din portocală",
  "Icre rosii pe tarte": "icre roșii, unt, tarte",
  "Icre rosii servite pe gheata": "icre roșii, unt, toast",
  "Gustare Caprese": "roșii, mozarella, pesto",
  "Gustare Italiana": "prosciutto, castraveți, mozarella, cherry, cașcaval, olive, măsline",

  // Gustări din cașcaval
  "Asortat din cascaval N1": "Brie, Cheddar, Masdamer, Dorblue Noir, miere, nuci, struguri",
  "Asortat din cascaval N2": "Dor-Blue, Cheddar, Brie, prosciutto, struguri, dulceață, nuci",
  "Asortat din cascaval N3": "Brie, Cheddar, Dor-Blue, struguri, miere, fructe uscate, grisine, nuci",

  // Gustări reci din legume coapte
  "Legume la gratar": "vânătă, dovlecel, ardei, ciuperci, roșii",
  "Gustare din ardei copti si zucchini": "brânză moale, stafide, nuci, dressing de vin",
  "Carpaccio din ardei": "ardei copt, brânză feta, pesto",

  // Piftie
  "Piftie din cocos": "cocoș, bulion, verdeață",
  "Piftie din limba": "limbă de bovină, piept de pui, ou de prepeliță, bulion",

  // Gustări reci din pește
  "Asortat de peste cu creveti":
    "somon slab sărat, escolar afumat, creveți, măsline, olive, lămâie",
  "Asortat de peste cu creveti si icre rosii":
    "somon slab sărat, escolar afumat, creveți, icre roșii, măsline, olive, lămâie",
  "Asortat de peste clasic": "somon slab sărat, escolar afumat, măsline, olive, lămâie",
  "Carpaccio din somon": "somon, cherry, mixt salată, capere",
  "Asortat cu rulouri din somon si creveti":
    "somon slab sărat, cremă de brânză, creveți, ou de prepeliță, ananas",

  // Gustări din carne
  "Sortiment din mezeluri italiene": "prosciutto crudo, bresaola, salam Milano, pepene galben",
  "Sortiment din carne mixt": "ruladă bavareză, pastramă țărănească, bacon, salam italian",
  "Vitello tonnato": "mușchiuleț de vițel, sos de ton, salată verde",
  "Asortat de carne Trio": "cotlet de vițel, mușchiuleț de porc, piept de pui",
  Brezoala: "cotlet de vițel, cherry, rucola",
  "Asortat de carne cu rulada de porc si limba de vita": "ruladă de porc, limbă de vită, fructe",
  "Asortat de carne Duo": "ceafă de porc, antricot de vită",
  "Mixt de antipasti": "parmezan, Dorblue Noir, Cheddar, prosciutto, salamuri italiene, fructe",

  // Salate
  "Salata Cezar cu creveti": "mix salată, creveți, pesmeți, cherry, sos Cezar",
  "Salata Cezar cu piept de pui": "mix salată, piept de pui, cașcaval, pesmeți, cherry, sos",
  "Salata cu carne de porc marinata": "carne de porc, mix salată, ciuperci, ardei, păstăi, morcov",
  "Salata cu ton": "mix salată, cherry, ton, păstăi, ouă de prepeliță, tulpină de țelină",
  "Salata cu produse de mare": "creveți, caracatiță, midii, ardei",
  "Salata vegetariana": "fenicul, avocado, mix salată, daikon, castraveți, cherry, ardei, morcov",
  "Salata calda cu piept de pui":
    "piept de pui, broccoli, morcov, ardei, ceapă, ciuperci, rădăcină de țelină, sos barbecue",
  "Salata cu somon": "calmar, ardei, ciuperci, morcov, tulpină de țelină, cherry",
  "Salata cu piept de rata":
    "piept de rață afumat, mix salată, struguri, roșii cherry, fulgi de migdale, sos din portocale",
  "Salata Poiana": "ciuperci marinate, ananas, piept de pui, dressing",

  // Gustări calde
  "Sold de rata cu pere in sirop si sos de visini": "șold de rață, pere, sos vișini",
  "Piept de rata cu sos de visine si pere caramelizate": "piept de rață, sos vișini, pere",
  "Ceafa coapta cu ananas sau muraturi": "ceafă de porc, ananas/murături",
  "Cordon Blue": "piept de pui, bacon, cașcaval",
  "Sold de pui cu sos de ciuperci si parmezan": "șold de pui, sos",
  "Muschiulet de porc pe pat de polento cu salsa": "mușchiuleț de porc, polento, salsa",
  "Beef Wellington": "mușchiuleț de vită, prosciutto, ciuperci, aluat foietaj",

  // Gustări calde din pește
  "Peste Dorado cu produse de mare in sos Dorblu": "Dorado, produse de mare, sos Dorblu, lămâie",

  // Bucate fierbinți (felul principal)
  "Sortiment de carne mixt": "prepeliță, ceafă, murături, cartofi",
  "Piept de porc pe polento": "mușchiuleț de porc, polento, salsa",
  "Ceafa coapta cu ananas/muraturi": "ceafă de porc, ananas",
  "Frigarui mixt cu turnulete de legume": "carne de pui, ceafă de porc, legume",
  "Sortiment din carne cu muraturi":
    "costițe de porc, rulouri din șold de curcan, cartofi copți, murături",
  "Platou cu carne": "frigărui mixt, carne, murături",

  // Garnituri
  "Legume coapte": "vânătă, dovlecei, ardei, morcov, ciuperci",
  "Legume crocante": "morcov, broccoli, conopidă, dovlecei, ardei",
  Muraturi: "roșii cherry, cornișoni, ardei cu varză, ceapă, ciuperci, patișoni",
};

/** Ingredientele unui fel după denumire (trimmed), sau `undefined` dacă nu sunt listate. */
export function getIngredients(name: string): string | undefined {
  return MENU_INGREDIENTS[(name || "").trim()];
}
