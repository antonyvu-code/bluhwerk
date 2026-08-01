'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/components/CartContext';
import { useAuth } from '@/components/AuthContext';

export default function Warenkorb() {
  const { items, remove, setQty, total, count, clear, ready } = useCart();
  const { user, loading } = useAuth();
  const router = useRouter();
  const [ordered, setOrdered] = useState(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  if (!ready) return <div className="wrap page" style={{ minHeight: '50vh' }} />;

  const checkout = async () => {
    setError('');
    if (!user) { router.push('/konto/anmelden'); return; }
    setBusy(true);
    const res = await fetch('/api/orders', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: items.map((i) => ({ slug: i.slug, qty: i.qty })) }),
    });
    const data = await res.json();
    setBusy(false);
    if (!res.ok) { setError(data.error || 'Bestellung fehlgeschlagen.'); return; }
    clear();
    setOrdered(data.order);
  };

  if (ordered) {
    return (
      <div className="wrap page">
        <div className="page-head">
          <span className="eyebrow">Danke</span>
          <h1>Etwas Lebendiges ist unterwegs</h1>
          <p>Bestellung <strong>#{ordered.id.slice(-6)}</strong> über <strong>{ordered.total} €</strong> wurde gespeichert. Du findest sie in deinem Konto.</p>
          <div style={{ display: 'flex', gap: '.8rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            <Link className="btn" href="/konto">Zu meinen Bestellungen</Link>
            <Link className="btn btn--ghost" href="/shop">Weiter stöbern</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wrap page">
      <div className="page-head">
        <nav className="breadcrumb"><Link href="/">Start</Link><span>/</span><span>Warenkorb</span></nav>
        <span className="eyebrow">Warenkorb</span>
        <h1>{count > 0 ? `${count} Wesen wollen mit` : 'Noch leer'}</h1>
      </div>

      {items.length === 0 ? (
        <div style={{ padding: '0 0 5rem' }}>
          <p style={{ color: 'var(--soil)' }}>Dein Warenkorb ist noch leer. Finde ein Wesen, das zu dir passt.</p>
          <p style={{ marginTop: '1.5rem' }}><Link className="btn" href="/shop">Zum Shop</Link></p>
        </div>
      ) : (
        <section style={{ padding: '0 0 5rem' }}>
          <div className="tagebuch" style={{ marginBottom: '2rem' }}>
            {items.map((i) => (
              <div className="plant-row" key={i.slug}>
                <span className="ph thumb" data-img="" />
                <div>
                  <h3>{i.name} <span className="sci" style={{ fontSize: '.82rem' }}>{i.sci}</span></h3>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '.8rem', color: 'var(--soil)' }}>{i.price} € / Stück</span>
                </div>
                <div className="wrap-actions" style={{ display: 'flex', alignItems: 'center', gap: '.8rem' }}>
                  <label className="skip" htmlFor={`q-${i.slug}`}>Menge</label>
                  <input id={`q-${i.slug}`} type="number" min={1} value={i.qty}
                    onChange={(e) => setQty(i.slug, Number(e.target.value))}
                    style={{ width: '4rem', padding: '.5rem', borderRadius: '8px', border: '1px solid var(--line)', background: 'var(--paper)', color: 'var(--ink)' }} />
                  <span style={{ fontFamily: 'var(--mono)', minWidth: '4rem', textAlign: 'right' }}>{i.qty * i.price} €</span>
                  <button className="wbtn" onClick={() => remove(i.slug)}>Entfernen</button>
                </div>
              </div>
            ))}
          </div>

          {error && <p role="alert" className="auth__error" style={{ maxWidth: 480 }}>{error}</p>}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid var(--line)', paddingTop: '1.5rem' }}>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '1.6rem' }}>Summe: {total} €</div>
            <button className="btn" onClick={checkout} disabled={busy}>
              {busy ? 'Wird bestellt…' : user ? 'Zur Kasse' : 'Anmelden & bestellen'}
            </button>
          </div>
          <p style={{ marginTop: '1.2rem', fontFamily: 'var(--mono)', fontSize: '.78rem', color: 'var(--sage)' }}>
            {loading ? '' : user ? 'Bestellung wird sicher in deinem Konto gespeichert.' : 'Zum Bestellen musst du angemeldet sein.'} Kostenloser Versand ab 50 €.
          </p>
        </section>
      )}
    </div>
  );
}
