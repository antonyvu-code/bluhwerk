'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/components/CartContext';

const LEVELS = ['—', 'niedrig', 'mittel', 'hoch'];

export default function ProductDetail({ product, related }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const [active, setActive] = useState(0);
  const chaptersRef = useRef(null);

  // M6 — Bild wechselt je nach sichtbarem Kapitel
  useEffect(() => {
    if (!chaptersRef.current) return;
    const secs = chaptersRef.current.querySelectorAll('[data-chapter]');
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(Number(e.target.dataset.chapter)); }),
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );
    secs.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const media = [product.img, product.imgDetail, product.imgRoom, product.img];
  const onAdd = () => { add(product); setAdded(true); setTimeout(() => setAdded(false), 2000); };

  const Meter = ({ label, val }) => (
    <div className="meter">
      <span className="meter__label">{label}</span>
      <span className="meter__track"><span className="meter__fill" style={{ width: `${(val / 3) * 100}%` }} /></span>
      <span className="meter__val">{LEVELS[val]}</span>
    </div>
  );

  return (
    <div className="wrap page">
      <nav className="breadcrumb">
        <Link href="/">Start</Link><span>/</span>
        <Link href="/shop">Shop</Link><span>/</span>
        <Link href={`/shop?cat=${product.category}`}>{product.category}</Link><span>/</span>
        <span>{product.name}</span>
      </nav>

      <div className="pdp">
        <div className="pdp__media" aria-hidden="true">
          {media.map((img, i) => (
            <span key={i} className={`ph${i === active ? ' active' : ''}`} data-img={img} />
          ))}
        </div>

        <div className="pdp__info" ref={chaptersRef}>
          <span className="eyebrow" style={{ display: 'block', marginBottom: '.8rem' }}>{product.category}</span>
          <h1>{product.name}<span className="sci">{product.sci}</span></h1>
          <div className="pdp__price">ab {product.price} €</div>
          <div className="pdp__buy">
            <button className="btn" onClick={onAdd}>{added ? 'Hinzugefügt ✓' : 'In den Warenkorb'}</button>
            <Link className="btn btn--ghost" href="/warenkorb">Warenkorb</Link>
          </div>

          <section className="chapter" data-chapter="0">
            <span className="eyebrow">Steckbrief</span>
            <h2>Wer bin ich</h2>
            <p>{product.steckbrief}</p>
            <p style={{ marginTop: '.6rem', fontFamily: 'var(--mono)', fontSize: '.8rem', color: 'var(--sage)' }}>
              Höhe {product.height} · Pflege {product.care}
            </p>
          </section>

          <section className="chapter" data-chapter="1">
            <span className="eyebrow">Bedürfnisse</span>
            <h2>Wie du für mich sorgst</h2>
            <div className="meters">
              <Meter label="Licht" val={product.light} />
              <Meter label="Wasser" val={product.water} />
              <Meter label="Anspruch" val={product.difficulty} />
            </div>
          </section>

          <section className="chapter" data-chapter="2">
            <span className="eyebrow">Persönlichkeit</span>
            <h2>Mein Charakter</h2>
            <p>{product.personality}</p>
          </section>

          <section className="chapter" data-chapter="3">
            <span className="eyebrow">Herkunft</span>
            <h2>Woher ich komme</h2>
            <p>Ursprünglich aus <strong>{product.origin}</strong>. Bei Blühwerk in Berlin aufgezogen, von Hand getopft und in kompostierbarem Kraftpapier zu dir gebracht.</p>
          </section>
        </div>
      </div>

      {related.length > 0 && (
        <section style={{ padding: '4rem 0 2rem' }}>
          <div className="section-head"><span className="eyebrow" style={{ display: 'block', marginBottom: '.6rem' }}>Passt dazu</span><h2 style={{ fontSize: 'clamp(1.6rem,3.5vw,2.4rem)' }}>Ähnliche Wesen</h2></div>
          <div className="products">
            {related.map((p) => (
              <Link className="pcard" key={p.slug} href={`/shop/${p.category}/${p.slug}`}>
                <span className="ph" data-img={p.img} />
                <h3>{p.name}<span className="sci">{p.sci}</span></h3>
                <div className="pcard__foot"><span className="price">ab {p.price} €</span><span className="care">Pflege · {p.care}</span></div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
