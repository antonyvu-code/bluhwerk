'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/AuthContext';

// Gieß-Rhythmus je Pflanze (Tage). Fallback 10.
const RHYTHM = { Monstera: 7, Bogenhanf: 21, Glücksfeder: 14, Geigenfeige: 7, Schwertfarn: 4, Sommerstrauß: 3 };

export default function MeinePflanzen() {
  const { user, loading } = useAuth();
  const [plants, setPlants] = useState([]);
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    if (loading) return;
    if (!user) { setBusy(false); return; }
    fetch('/api/orders', { cache: 'no-store' })
      .then((r) => r.json())
      .then((d) => {
        // Bestellte Artikel zu eindeutigen Pflanzen zusammenfassen
        const map = new Map();
        (d.orders || []).forEach((o) => o.items.forEach((i) => {
          if (!map.has(i.slug)) {
            const every = RHYTHM[i.name] || 10;
            map.set(i.slug, { slug: i.slug, name: i.name, everyDays: every, lastDays: Math.floor(Math.random() * (every + 2)) });
          }
        }));
        setPlants([...map.values()]);
      })
      .catch(() => {})
      .finally(() => setBusy(false));
  }, [user, loading]);

  const water = (slug) => setPlants((prev) => prev.map((p) => (p.slug === slug ? { ...p, lastDays: 0 } : p)));

  if (loading || busy) return <div className="wrap page" style={{ minHeight: '50vh' }} />;

  if (!user) {
    return (
      <div className="wrap page">
        <div className="page-head">
          <nav className="breadcrumb"><Link href="/">Start</Link><span>/</span><span>Meine Pflanzen</span></nav>
          <span className="eyebrow">Pflanzen-Tagebuch</span>
          <h1>Erst anmelden</h1>
          <p>Dein Pflanzen-Tagebuch entsteht aus deinen Bestellungen. Melde dich an, um es zu sehen.</p>
          <p style={{ marginTop: '1.4rem' }}><Link className="btn" href="/konto/anmelden">Anmelden</Link></p>
        </div>
      </div>
    );
  }

  const dueCount = plants.filter((p) => p.lastDays >= p.everyDays).length;

  return (
    <div className="wrap page">
      <div className="page-head">
        <nav className="breadcrumb"><Link href="/">Start</Link><span>/</span><Link href="/konto">Konto</Link><span>/</span><span>Meine Pflanzen</span></nav>
        <span className="eyebrow">Pflanzen-Tagebuch</span>
        <h1>Deine Wesen</h1>
        <p>{plants.length === 0
          ? 'Noch keine Pflanzen — sie erscheinen hier, sobald du bestellt hast.'
          : dueCount > 0 ? `${dueCount} Pflanze${dueCount > 1 ? 'n' : ''} braucht heute Wasser.` : 'Alles gut versorgt — deine Pflanzen sind glücklich.'}</p>
      </div>

      <section style={{ padding: '0 0 4rem' }}>
        {plants.length === 0 ? (
          <p style={{ color: 'var(--soil)' }}><Link href="/shop" style={{ textDecoration: 'underline' }}>Finde dein erstes Wesen →</Link></p>
        ) : (
          <div className="tagebuch">
            {plants.map((p) => {
              const due = p.lastDays >= p.everyDays;
              const inDays = Math.max(0, p.everyDays - p.lastDays);
              return (
                <div className="plant-row" key={p.slug}>
                  <span className="ph thumb" data-img="" />
                  <div>
                    <h3>{p.name}</h3>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '.72rem', color: 'var(--sage)' }}>Gießen alle {p.everyDays} Tage</span>
                  </div>
                  <div className="wrap-actions" style={{ display: 'flex', alignItems: 'center' }}>
                    <span className={`water ${due ? 'due' : 'ok'}`}>{due ? 'Heute gießen' : `in ${inDays} Tag${inDays === 1 ? '' : 'en'}`}</span>
                    <button className="wbtn" onClick={() => water(p.slug)}>Gegossen</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
