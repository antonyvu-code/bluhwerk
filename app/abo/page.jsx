'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ABO_PLANS } from '@/lib/content';

export default function AboPage() {
  const [plan, setPlan] = useState('mittel');
  const [done, setDone] = useState(false);
  const selected = ABO_PLANS.find((p) => p.slug === plan);

  return (
    <div className="wrap page">
      <div className="page-head">
        <nav className="breadcrumb"><Link href="/">Start</Link><span>/</span><span>Blumen-Abo</span></nav>
        <span className="eyebrow">Blumen-Abo</span>
        <h1>Jede Woche etwas Frisches</h1>
        <p>Ein wechselnder Saisonstrauß, direkt an deine Tür — von Hand gebunden aus dem, was gerade blüht. Pausierbar und jederzeit kündbar.</p>
      </div>

      <section style={{ padding: '0 0 3rem' }}>
        <div className="tiers" role="radiogroup" aria-label="Abo-Größe wählen">
          {ABO_PLANS.map((p) => (
            <button
              key={p.slug}
              role="radio"
              aria-checked={plan === p.slug}
              className={`tier${plan === p.slug ? ' tier--on' : ''}${p.highlight ? ' tier--pop' : ''}`}
              onClick={() => setPlan(p.slug)}
            >
              {p.highlight && <span className="tier__badge">Beliebt</span>}
              <span className="eyebrow">{p.name}</span>
              <span className="tier__price">{p.price} €<small>/ Lieferung</small></span>
              <span className="tier__freq">{p.freq}</span>
              <span className="tier__desc">{p.desc}</span>
            </button>
          ))}
        </div>

        <div className="abo__cta">
          {done ? (
            <div className="dash__card" role="status" style={{ maxWidth: 520 }}>
              <span className="eyebrow">Demo</span>
              <p style={{ marginTop: '.5rem' }}>Schön! In dieser Konzept-Version wird noch kein echtes Abo abgeschlossen und keine Zahlung ausgelöst. Die Anbindung folgt mit dem Commerce-Backend.</p>
              <p style={{ marginTop: '1rem' }}><Link className="btn" href="/shop?cat=blumen">Blumen ansehen</Link></p>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: '1.4rem' }}>
                {selected.name} · {selected.price} € {selected.freq}
              </div>
              <button className="btn" onClick={() => setDone(true)}>Abo starten</button>
            </div>
          )}
        </div>
      </section>

      <section style={{ padding: '0 0 4rem' }}>
        <div className="promise">
          <div className="promise__item"><h3>Flexibel</h3><p>Jederzeit pausieren, ändern oder kündigen — ohne Kleingedrucktes.</p></div>
          <div className="promise__item"><h3>Saisonal</h3><p>Immer das, was gerade regional blüht. Nie zweimal derselbe Strauß.</p></div>
          <div className="promise__item"><h3>Nachhaltig</h3><p>In Kraftpapier statt Plastik, mit kurzen Wegen aus der Region.</p></div>
        </div>
      </section>
    </div>
  );
}
