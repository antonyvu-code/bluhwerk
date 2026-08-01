'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthContext';

export default function KontoPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    if (loading) return;
    if (!user) { setLoadingOrders(false); return; }
    fetch('/api/orders', { cache: 'no-store' })
      .then((r) => r.json())
      .then((d) => setOrders(d.orders || []))
      .catch(() => {})
      .finally(() => setLoadingOrders(false));
  }, [user, loading]);

  if (loading) return <div className="wrap page" style={{ minHeight: '50vh' }} />;

  if (!user) {
    return (
      <div className="wrap page">
        <div className="page-head">
          <nav className="breadcrumb"><Link href="/">Start</Link><span>/</span><span>Konto</span></nav>
          <span className="eyebrow">Konto</span>
          <h1>Willkommen in der Gärtnerei</h1>
          <p>Melde dich an, um deine Bestellungen und dein Pflanzen-Tagebuch zu sehen.</p>
          <div style={{ display: 'flex', gap: '.8rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            <Link className="btn" href="/konto/anmelden">Anmelden</Link>
            <Link className="btn btn--ghost" href="/konto/registrieren">Konto erstellen</Link>
          </div>
        </div>
      </div>
    );
  }

  const plantCount = orders.reduce((n, o) => n + o.items.reduce((s, i) => s + i.qty, 0), 0);

  return (
    <div className="wrap page">
      <div className="page-head">
        <nav className="breadcrumb"><Link href="/">Start</Link><span>/</span><span>Konto</span></nav>
        <span className="eyebrow">Willkommen zurück</span>
        <h1>Hallo, {user.name.split(' ')[0]}</h1>
        <p>{user.email} · <button onClick={async () => { await logout(); router.push('/'); }}
          style={{ background: 'none', border: 0, color: 'var(--ink)', textDecoration: 'underline', cursor: 'pointer', font: 'inherit' }}>Abmelden</button></p>
      </div>

      <section style={{ padding: '0 0 2rem' }}>
        <div className="dash__grid">
          <div className="dash__card">
            <span className="eyebrow">Bestellungen</span>
            <div className="big">{orders.length}</div>
            <p style={{ color: 'var(--soil)', margin: '.4rem 0 .8rem', fontSize: '.9rem' }}>
              {orders.length ? `${plantCount} Wesen insgesamt` : 'noch keine Bestellung'}</p>
            <Link href="/shop">Weiter stöbern</Link>
          </div>
          <div className="dash__card">
            <span className="eyebrow">Meine Pflanzen</span>
            <div className="big">{plantCount}</div>
            <p style={{ color: 'var(--soil)', margin: '.4rem 0 .8rem', fontSize: '.9rem' }}>aus deinen Bestellungen</p>
            <Link href="/konto/meine-pflanzen">Tagebuch öffnen</Link>
          </div>
          <div className="dash__card">
            <span className="eyebrow">Blumen-Abo</span>
            <div className="big">—</div>
            <p style={{ color: 'var(--soil)', margin: '.4rem 0 .8rem', fontSize: '.9rem' }}>noch kein Abo aktiv</p>
            <Link href="/abo">Abo entdecken</Link>
          </div>
        </div>

        <div className="section-head" style={{ margin: '1rem 0 1.5rem' }}>
          <span className="eyebrow" style={{ display: 'block', marginBottom: '.5rem' }}>Verlauf</span>
          <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.2rem)' }}>Deine Bestellungen</h2>
        </div>

        {loadingOrders ? (
          <p style={{ color: 'var(--sage)' }}>Lädt…</p>
        ) : orders.length === 0 ? (
          <p style={{ color: 'var(--soil)' }}>Noch nichts bestellt. <Link href="/shop" style={{ textDecoration: 'underline' }}>Finde dein erstes Wesen →</Link></p>
        ) : (
          <div className="tagebuch">
            {orders.map((o) => (
              <div className="plant-row" key={o.id} style={{ gridTemplateColumns: '1fr auto' }}>
                <div>
                  <h3 style={{ fontSize: '1.05rem' }}>{o.items.map((i) => `${i.qty}× ${i.name}`).join(', ')}</h3>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '.72rem', color: 'var(--sage)' }}>
                    {new Date(o.createdAt).toLocaleDateString('de-DE')} · {o.status}
                  </span>
                </div>
                <span style={{ fontFamily: 'var(--mono)' }}>{o.total} €</span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
