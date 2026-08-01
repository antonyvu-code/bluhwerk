'use client';
import { useState } from 'react';
import Link from 'next/link';

const DIAGNOSES = {
  gelb: {
    label: 'Gelbe Blätter',
    img: 'IMG · Prompt 29 — gelbes Blatt',
    title: 'Meist zu viel Wasser',
    text: 'Gelbe, weiche Blätter deuten fast immer auf Staunässe hin. Lass die oberen 3 cm Erde abtrocknen, bevor du erneut gießt, und prüfe, ob der Topf ein Abzugsloch hat.',
  },
  braun: {
    label: 'Braune Spitzen',
    img: 'IMG · Prompt 30 — Blattspitze',
    title: 'Trockene Luft oder zu wenig Wasser',
    text: 'Braune, knusprige Spitzen entstehen bei niedriger Luftfeuchtigkeit. Sprühe die Blätter, stelle die Pflanze weg von der Heizung, und gieße etwas regelmäßiger.',
  },
  fallen: {
    label: 'Blätter fallen ab',
    img: 'IMG · Prompt 29 — fallendes Blatt',
    title: 'Ein Schock — meist ein Standortwechsel',
    text: 'Viele Pflanzen werfen Blätter ab, wenn sich Licht oder Temperatur plötzlich ändern. Gib ihr zwei Wochen an einem festen Platz, ohne zu düngen.',
  },
  laus: {
    label: 'Kleine Tierchen',
    img: 'IMG · Prompt 30 — Blatt Unterseite',
    title: 'Schädlinge — früh handeln',
    text: 'Prüfe die Blattunterseiten. Bei Läusen hilft Abduschen und eine milde Schmierseifen-Lösung. Isoliere die Pflanze, bis alles weg ist.',
  },
};

export default function Pflanzendoktor() {
  const [key, setKey] = useState('gelb');
  const d = DIAGNOSES[key];

  return (
    <div className="wrap page">
      <div className="page-head">
        <nav className="breadcrumb"><Link href="/">Start</Link><span>/</span><Link href="/pflege">Pflege</Link><span>/</span><span>Pflanzendoktor</span></nav>
        <span className="eyebrow">Beratung</span>
        <h1>Pflanzendoktor</h1>
        <p>Deiner Pflanze geht es nicht gut? Wähle das Symptom — wir sagen dir, was meist dahintersteckt.</p>
      </div>

      <section style={{ padding: '0 0 4rem' }}>
        <div className="doktor">
          <div>
            <div className="doktor__q">
              <p>Was beobachtest du?</p>
              <div className="chips" role="group" aria-label="Symptom wählen">
                {Object.entries(DIAGNOSES).map(([k, v]) => (
                  <button key={k} className="chip" aria-pressed={key === k} onClick={() => setKey(k)}>{v.label}</button>
                ))}
              </div>
            </div>
            <p style={{ color: 'var(--sage)', fontSize: '.85rem', fontFamily: 'var(--mono)', marginTop: '1.5rem' }}>
              Kein Ersatz für persönliche Beratung — schreib uns bei jedem Zweifel.
            </p>
          </div>

          <div className="doktor__out" aria-live="polite">
            <span className="ph" data-img={d.img} />
            <h3>{d.title}</h3>
            <p>{d.text}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
