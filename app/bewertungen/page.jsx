'use client';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

function Stars({ value, size = 16 }) {
  return (
    <span className="stars" aria-label={`${value} von 5 Sternen`} style={{ fontSize: size }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className={n <= value ? 'star on' : 'star'} aria-hidden="true">★</span>
      ))}
    </span>
  );
}

function StarInput({ value, onChange }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="starinput" role="radiogroup" aria-label="Bewertung in Sternen">
      {[1, 2, 3, 4, 5].map((n) => (
        <button type="button" key={n} role="radio" aria-checked={value === n} aria-label={`${n} Sterne`}
          className={(hover || value) >= n ? 'star on' : 'star'}
          onMouseEnter={() => setHover(n)} onMouseLeave={() => setHover(0)}
          onFocus={() => setHover(n)} onBlur={() => setHover(0)} onClick={() => onChange(n)}>★</button>
      ))}
    </div>
  );
}

export default function BewertungenPage() {
  const [reviews, setReviews] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [form, setForm] = useState({ name: '', city: '', plant: '', rating: 5, text: '' });
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/reviews', { cache: 'no-store' })
      .then((r) => r.json())
      .then((d) => setReviews(d.reviews || []))
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  const avg = useMemo(() => (reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : '—'), [reviews]);
  const dist = useMemo(() => {
    const d = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((r) => { d[r.rating] = (d[r.rating] || 0) + 1; });
    return d;
  }, [reviews]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.text.trim()) return;
    setBusy(true); setError('');
    const res = await fetch('/api/reviews', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setBusy(false);
    if (!res.ok) { setError(data.error || 'Konnte nicht gesendet werden.'); return; }
    setReviews((prev) => [{ ...data.review, mine: true }, ...prev]);
    setForm({ name: '', city: '', plant: '', rating: 5, text: '' });
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="wrap page">
      <div className="page-head">
        <nav className="breadcrumb"><Link href="/">Start</Link><span>/</span><span>Bewertungen</span></nav>
        <span className="eyebrow">Kundenstimmen</span>
        <h1>Was Pflanzeneltern sagen</h1>
        <p>Echte Erfahrungen von Menschen, die etwas Lebendiges nach Hause gebracht haben. Und Platz für deine eigene.</p>
      </div>

      <section className="rev-summary">
        <div className="rev-score">
          <div className="rev-score__num">{avg}</div>
          <Stars value={Math.round(Number(avg)) || 0} size={20} />
          <div className="rev-score__count">{reviews.length} Bewertungen</div>
        </div>
        <div className="rev-bars">
          {[5, 4, 3, 2, 1].map((n) => {
            const pct = reviews.length ? (dist[n] / reviews.length) * 100 : 0;
            return (
              <div className="rev-bar" key={n}>
                <span className="rev-bar__n">{n} ★</span>
                <span className="rev-bar__track"><span className="rev-bar__fill" style={{ width: `${pct}%` }} /></span>
                <span className="rev-bar__c">{dist[n]}</span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="rev-formwrap">
        <h2>Teile deine Erfahrung</h2>
        <p style={{ color: 'var(--soil)', margin: '.5rem 0 1.5rem', maxWidth: '52ch' }}>
          Deine Bewertung hilft anderen, das passende Wesen zu finden.
        </p>
        <form className="rev-form" onSubmit={submit}>
          <div className="rev-form__row">
            <div className="field"><label htmlFor="rname">Name</label>
              <input id="rname" value={form.name} onChange={set('name')} placeholder="Vorname" required /></div>
            <div className="field"><label htmlFor="rcity">Stadt (optional)</label>
              <input id="rcity" value={form.city} onChange={set('city')} placeholder="Berlin" /></div>
            <div className="field"><label htmlFor="rplant">Pflanze (optional)</label>
              <input id="rplant" value={form.plant} onChange={set('plant')} placeholder="Monstera" /></div>
          </div>
          <div className="field">
            <label>Deine Bewertung</label>
            <StarInput value={form.rating} onChange={(r) => setForm((f) => ({ ...f, rating: r }))} />
          </div>
          <div className="field"><label htmlFor="rtext">Deine Erfahrung</label>
            <textarea id="rtext" value={form.text} onChange={set('text')} rows={4}
              placeholder="Wie kam deine Pflanze an? Wie geht es ihr heute?" required /></div>
          {error && <p role="alert" className="auth__error">{error}</p>}
          <button className="btn" type="submit" disabled={busy}>{busy ? 'Wird gesendet…' : sent ? 'Danke ✓' : 'Bewertung senden'}</button>
          <p className="auth__note" style={{ textAlign: 'left', marginTop: '1rem' }}>
            Deine Bewertung wird in unserer Datenbank gespeichert und öffentlich angezeigt.
          </p>
        </form>
      </section>

      <section className="rev-list">
        {!loaded ? (
          <p style={{ color: 'var(--sage)' }}>Lädt…</p>
        ) : reviews.map((r) => (
          <article className={`rev-card${r.mine ? ' rev-card--mine' : ''}`} key={r.id}>
            <div className="rev-card__head">
              <div><strong>{r.name}</strong><span className="rev-card__meta">{r.city} · {r.plant}</span></div>
              <Stars value={r.rating} />
            </div>
            <p>{r.text}</p>
            <span className="rev-card__date">{new Date(r.createdAt).toLocaleDateString('de-DE')}{r.mine ? ' · deine Bewertung' : ''}</span>
          </article>
        ))}
      </section>
    </div>
  );
}
