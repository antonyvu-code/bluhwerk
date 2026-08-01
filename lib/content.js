// Kuratierter Content: Kollektionen, Räume, Journal, Kundenstimmen.

export const COLLECTIONS = [
  {
    slug: 'erste-pflanze',
    title: 'Erste Pflanze',
    sub: 'Für alle, die noch nie eine Pflanze überlebt haben',
    img: 'IMG · Prompt 10 — robuste Anfängerpflanze',
    plants: ['sansevieria', 'zamioculcas', 'monstera-deliciosa'],
    text: 'Fast unzerstörbar, verzeihend, dankbar. Diese Wesen begleiten dich beim Lernen — ohne dir Schuldgefühle zu machen.',
  },
  {
    slug: 'dunkle-ecken',
    title: 'Dunkle Ecken',
    sub: 'Grün auch dort, wo kaum Licht hinkommt',
    img: 'IMG · Prompt 8 — Pflanze in dunkler Ecke',
    plants: ['zamioculcas', 'sansevieria'],
    text: 'Nicht jede Wohnung ist ein Lichtdurchfluteter Altbau. Diese Pflanzen glänzen auch im Schatten.',
  },
  {
    slug: 'gruene-statements',
    title: 'Grüne Statements',
    sub: 'Große Wesen, die einen Raum verwandeln',
    img: 'IMG · Prompt 9 — große Statement-Pflanze',
    plants: ['ficus-lyrata', 'monstera-deliciosa'],
    text: 'Manchmal braucht ein Raum nur eine einzige, großzügige Geste aus Grün.',
  },
];

export const ROOMS = [
  { slug: 'wohnzimmer', name: 'Wohnzimmer', img: 'IMG · Prompt 13 — Wohnzimmer', hint: 'Große Wesen für den Mittelpunkt', plants: ['monstera-deliciosa', 'ficus-lyrata'] },
  { slug: 'bad', name: 'Bad', img: 'IMG · Prompt 24 — Bad mit Farn', hint: 'Lieben Feuchtigkeit', plants: ['nephrolepis'] },
  { slug: 'buero', name: 'Büro', img: 'IMG · Prompt 8 — Schreibtischpflanze', hint: 'Pflegeleicht, konzentriert', plants: ['zamioculcas', 'sansevieria'] },
  { slug: 'schlafzimmer', name: 'Schlafzimmer', img: 'IMG · Prompt 10 — Schlafzimmer', hint: 'Ruhig, luftreinigend', plants: ['sansevieria'] },
];

export const JOURNAL = [
  {
    slug: 'monstera-schneiden',
    category: 'Pflege',
    title: 'Wie du Monstera richtig schneidest',
    excerpt: 'Ein Schnitt zur richtigen Zeit macht aus einer Pflanze zwei — und hält deine Monstera buschig.',
    img: 'IMG · Prompt 23 — Schere & Notizbuch',
    read: '4 Min',
    body: [
      'Die Monstera ist großzügig: Fast jeder gesunde Trieb lässt sich vermehren. Der beste Zeitpunkt ist das Frühjahr, wenn die Pflanze in die Wachstumsphase geht.',
      'Setze den Schnitt immer knapp unter einem Nodium — der kleinen Verdickung, aus der Luftwurzeln entstehen. Ein sauberes, scharfes Messer verhindert Quetschungen.',
      'Stelle den Steckling in ein Glas Wasser an einen hellen Ort ohne pralle Sonne. Nach zwei bis vier Wochen zeigen sich Wurzeln — dann darf er in Erde.',
    ],
  },
  {
    slug: 'sommer-fensterbank',
    category: 'Saison',
    title: 'Was der Sommer für dein Fenster bereithält',
    excerpt: 'Längere Tage, mehr Licht, mehr Durst. So passt du deine Pflege an die warme Jahreszeit an.',
    img: 'IMG · Prompt 24 — Farnwedel',
    read: '3 Min',
    body: [
      'Im Sommer verdunsten Pflanzen deutlich mehr Wasser. Prüfe die Erde häufiger — aber gieße erst, wenn die oberen Zentimeter abgetrocknet sind.',
      'Direkte Mittagssonne hinter Glas kann Blätter verbrennen. Ein leichter Vorhang wirkt wie ein Sonnenschutz und streut das Licht angenehm.',
      'Die Wachstumsphase ist auch die Zeit zum Düngen — alle zwei Wochen ein milder Flüssigdünger reicht den meisten Zimmerpflanzen.',
    ],
  },
  {
    slug: 'morgen-in-der-gaertnerei',
    category: 'Menschen',
    title: 'Ein Morgen in der Gärtnerei',
    excerpt: 'Bevor die erste Bestellung rausgeht, beginnt der Tag mit Licht, Gießkannen und ruhigen Händen.',
    img: 'IMG · Prompt 25 — Fensterbank golden',
    read: '5 Min',
    body: [
      'Um sieben Uhr ist das Gewächshaus noch kühl. Das erste Licht fällt schräg durch die Glasdächer und lässt den Dunst über den Beeten sichtbar werden.',
      'Jede Pflanze wird von Hand geprüft: ein gelbes Blatt hier, ein durstiger Topf dort. Erst wenn ein Wesen wirklich bereit ist, wird es für den Versand vorbereitet.',
      'Verpackt wird in Kraftpapier, nicht in Plastik. Es dauert länger — aber es ist der Unterschied, den man in den Händen spürt.',
    ],
  },
];

export function getArticle(slug) {
  return JOURNAL.find((a) => a.slug === slug) || null;
}

export const ABO_PLANS = [
  { slug: 'klein', name: 'Klein', price: 24, freq: 'alle 2 Wochen', desc: 'Ein kleiner Saisonstrauß für die Fensterbank.', highlight: false },
  { slug: 'mittel', name: 'Mittel', price: 34, freq: 'wöchentlich', desc: 'Der Klassiker — jede Woche frisch gebunden.', highlight: true },
  { slug: 'gross', name: 'Groß', price: 54, freq: 'wöchentlich', desc: 'Ein üppiger Strauß, der einen Raum trägt.', highlight: false },
];

export const REVIEWS = [
  { id: 1, name: 'Lena M.', city: 'Berlin', rating: 5, plant: 'Monstera', date: '2026-06-28', text: 'Kam größer und gesünder an, als ich dachte. Die Verpackung aus Kraftpapier war so liebevoll, dass ich sie fast aufgehoben hätte.' },
  { id: 2, name: 'Jonas K.', city: 'Hamburg', rating: 5, plant: 'Bogenhanf', date: '2026-06-15', text: 'Ich bringe normalerweise jede Pflanze um. Diese lebt seit Monaten glücklich in meinem dunklen Flur. Der Pflanzendoktor hat mir einmal wirklich geholfen.' },
  { id: 3, name: 'Sophie R.', city: 'Leipzig', rating: 4, plant: 'Geigenfeige', date: '2026-05-30', text: 'Wunderschöne Pflanze, hat nach dem Umzug ein paar Blätter verloren — aber der Care-Guide hat erklärt, warum. Jetzt treibt sie wieder aus.' },
  { id: 4, name: 'Amir T.', city: 'Berlin', rating: 5, plant: 'Blumen-Abo', date: '2026-05-12', text: 'Das wöchentliche Abo ist das kleine Highlight meiner Woche geworden. Jedes Mal eine Überraschung, immer der Saison entsprechend.' },
];
