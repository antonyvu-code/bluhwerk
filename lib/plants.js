// Mock-Datensatz — Pflanzen mit "Charakter". Später durch Headless-Commerce ersetzbar.

export const PLANTS = [
  {
    slug: 'monstera-deliciosa',
    category: 'pflanzen',
    name: 'Monstera',
    sci: 'Monstera deliciosa',
    price: 39,
    care: 'leicht',
    light: 3, water: 2, difficulty: 1,
    height: '60–80 cm',
    origin: 'Mittelamerika',
    img: 'IMG · Prompt 11 — Monstera Studio',
    imgDetail: 'IMG · Prompt 12 — Wurzel/Erde Detail',
    imgRoom: 'IMG · Prompt 13 — Monstera im Raum',
    personality:
      'Ein großzügiges Wesen: sie wächst sichtbar, verzeiht Fehler und liebt es, wenn du ihr beim Entfalten zusiehst. Dreh sie nicht zu oft — sie mag ihren Platz.',
    steckbrief: 'Die Klassikerin. Ihre gefensterten Blätter machen jeden Raum zum Dschungel.',
  },
  {
    slug: 'sansevieria',
    category: 'pflanzen',
    name: 'Bogenhanf',
    sci: 'Sansevieria trifasciata',
    price: 24,
    care: 'sehr leicht',
    light: 2, water: 1, difficulty: 1,
    height: '40–70 cm',
    origin: 'Westafrika',
    img: 'IMG · Prompt 10 — Bogenhanf',
    imgDetail: 'IMG · Prompt 12 — Erde Detail',
    imgRoom: 'IMG · Prompt 13 — im Raum',
    personality:
      'Die Stoische. Sie braucht dich kaum — vergisst du das Gießen, ist ihr das lieber als zu viel Fürsorge. Perfekt für Anfänger und Reisende.',
    steckbrief: 'Fast unzerstörbar, reinigt nebenbei die Luft. Der ideale Einstieg.',
  },
  {
    slug: 'zamioculcas',
    category: 'pflanzen',
    name: 'Glücksfeder',
    sci: 'Zamioculcas zamiifolia',
    price: 29,
    care: 'leicht',
    light: 1, water: 1, difficulty: 1,
    height: '45–60 cm',
    origin: 'Ostafrika',
    img: 'IMG · Prompt 8 — ZZ Pflanze',
    imgDetail: 'IMG · Prompt 12 — Detail',
    imgRoom: 'IMG · Prompt 13 — im Raum',
    personality:
      'Die Schattengängerin. Sie glänzt selbst in der dunkelsten Ecke und trägt ihren Namen zu Recht — sie bringt Ruhe ins Zuhause.',
    steckbrief: 'Übersteht dunkle Ecken und Vergesslichkeit. Glänzendes, sattes Grün.',
  },
  {
    slug: 'ficus-lyrata',
    category: 'pflanzen',
    name: 'Geigenfeige',
    sci: 'Ficus lyrata',
    price: 49,
    care: 'mittel',
    light: 3, water: 2, difficulty: 2,
    height: '80–120 cm',
    origin: 'Westafrika',
    img: 'IMG · Prompt 9 — helles Fenster',
    imgDetail: 'IMG · Prompt 12 — Blatt Detail',
    imgRoom: 'IMG · Prompt 13 — im Raum',
    personality:
      'Die Diva mit Stil. Sie liebt viel indirektes Licht und feste Gewohnheiten — belohnt dich dafür mit einer Silhouette wie aus einem Magazin.',
    steckbrief: 'Ein grünes Statement. Große, geigenförmige Blätter mit Charakter.',
  },
  {
    slug: 'nephrolepis',
    category: 'pflanzen',
    name: 'Schwertfarn',
    sci: 'Nephrolepis exaltata',
    price: 22,
    care: 'mittel',
    light: 2, water: 3, difficulty: 2,
    height: '30–50 cm',
    origin: 'Tropen weltweit',
    img: 'IMG · Prompt 24 — Farn Detail',
    imgDetail: 'IMG · Prompt 24 — Wedel Detail',
    imgRoom: 'IMG · Prompt 25 — Fensterbank',
    personality:
      'Die Sensible. Sie mag es feucht und gleichmäßig — ein Bad mit Fenster ist ihr Lieblingsort. Dafür schenkt sie dir üppiges, weiches Grün.',
    steckbrief: 'Weiche, verspielte Wedel. Liebt Luftfeuchtigkeit und Gesellschaft.',
  },
  {
    slug: 'sommerstrauss',
    category: 'blumen',
    name: 'Sommerstrauß',
    sci: 'Saison-Mischung',
    price: 34,
    care: 'schnittblumen',
    light: 2, water: 3, difficulty: 1,
    height: '~45 cm',
    origin: 'Regionale Gärtnerei',
    img: 'IMG · Prompt 15 — Sommer Dahlien',
    imgDetail: 'IMG · Prompt 14 — Blüten Detail',
    imgRoom: 'IMG · Prompt 22 — in Vase',
    personality:
      'Ein flüchtiges Glück. Jede Woche anders, immer der Saison entsprechend — für alle, die das Vergängliche lieben.',
    steckbrief: 'Handgebunden aus dem, was gerade blüht. Wechselnd, regional, frisch.',
  },
];

export const CATEGORIES = [
  { slug: 'pflanzen', name: 'Pflanzen', sub: 'Zimmerpflanzen mit Charakter' },
  { slug: 'blumen', name: 'Blumen', sub: 'Sträuße der Saison' },
  { slug: 'toepfe', name: 'Töpfe', sub: 'Handgemacht, erdig' },
  { slug: 'geschenke', name: 'Geschenke', sub: 'Verpackt mit Sorgfalt' },
];

export function getPlant(slug) {
  return PLANTS.find((p) => p.slug === slug) || null;
}

export function plantsByCategory(cat) {
  if (!cat || cat === 'alle') return PLANTS;
  return PLANTS.filter((p) => p.category === cat);
}
