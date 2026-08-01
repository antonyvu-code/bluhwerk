'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PLANTS, CATEGORIES } from '@/lib/plants';
import { useSeason } from '@/components/SeasonContext';

const PETALS = 9;
const petalPath = 'M0 0 C 11 -20 7 -44 0 -52 C -7 -44 -11 -20 0 0 Z';
const petalColors = ['#E8A0B4', '#EDB1C1', '#E79AAE'];

const ECKE = {
  dunkel:      { slug: 'zamioculcas', n: 'Glücksfeder', sci: 'Zamioculcas', img: 'IMG · Prompt 8 — ZZ Pflanze', t: 'Übersteht dunkle Ecken und Vergesslichkeit — fast unzerstörbar.' },
  hell:        { slug: 'ficus-lyrata', n: 'Geigenfeige', sci: 'Ficus lyrata', img: 'IMG · Prompt 9 — helles Fenster', t: 'Liebt viel indirektes Licht und wird zum grünen Statement.' },
  vergesslich: { slug: 'sansevieria', n: 'Bogenhanf', sci: 'Sansevieria', img: 'IMG · Prompt 10 — Bogenhanf', t: 'Braucht nur selten Wasser — perfekt, wenn du oft vergisst.' },
  anfaenger:   { slug: 'monstera-deliciosa', n: 'Monstera', sci: 'Monstera deliciosa', img: 'IMG · Prompt 4 — Monstera', t: 'Wächst sichtbar, verzeiht Fehler — die ideale erste Pflanze.' },
};

const CAT_IMG = {
  pflanzen: 'IMG · Prompt 4 — Monstera im Topf',
  blumen: 'IMG · Prompt 5 — Saison-Bouquet',
  toepfe: 'IMG · Prompt 6 — Keramik-Töpfe',
  geschenke: 'IMG · Prompt 7 — Geschenkset',
};

export default function Home() {
  const root = useRef(null);
  const { setSeason } = useSeason();
  const [ecke, setEcke] = useState('dunkel');
  const bestseller = PLANTS.slice(0, 4);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    // Lenis (falls vorhanden) mit ScrollTrigger synchronisieren
    const lenis = window.__lenis;
    if (lenis) lenis.on('scroll', ScrollTrigger.update);

    const SECTION_SEASON = [
      ['#hero', 'summer'], ['#kategorien', 'summer'],
      ['#saison', 'autumn'], ['#bestseller', 'autumn'],
      ['#gaertnerei', 'winter'], ['#abo', 'winter'],
      ['#journal', 'spring'], ['#pflegepromise', 'spring'],
    ];

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // M1 — Blüte öffnet sich beim Laden (Hommage BLOOM: elastic 0→1)
        gsap.set('.petal', { scale: 0, transformOrigin: '0px 0px' });
        gsap.set('#core', { scale: 0, transformOrigin: '0px 0px' });
        gsap.timeline({ delay: 0.25 })
          .to('.petal', { scale: 1, stagger: 0.07, duration: 1.1, ease: 'elastic.out(1,0.6)' })
          .to('#core', { scale: 1, duration: 0.5, ease: 'back.out(2)' }, 0.35);

        // M1b — sanftes Driften beim Scrollen durch Hero
        gsap.to('#bloom', {
          rotation: 14, scale: 1.08, ease: 'none',
          scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1 },
        });

        // M3 — Parallax der Blätter
        gsap.utils.toArray('.leaf').forEach((leaf) => {
          const speed = parseFloat(leaf.dataset.speed) || 0.3;
          gsap.to(leaf, {
            yPercent: -speed * 120, ease: 'none',
            scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1 },
          });
        });

        // M4 — Reveal gestaffelt
        ScrollTrigger.batch('[data-reveal]', {
          start: 'top 88%',
          onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.08, duration: 0.8, ease: 'power3.out', overwrite: true }),
        });

        // Manifest — Zeilen steigen aus dem Overflow
        gsap.set('[data-line]', { yPercent: 110 });
        gsap.to('[data-line]', {
          yPercent: 0, stagger: 0.12, duration: 0.9, ease: 'power4.out',
          scrollTrigger: { trigger: '.manifest', start: 'top 70%' },
        });

        // M5 — Saison horizontal gepinnt
        const track = root.current.querySelector('#saisonTrack');
        const dist = () => Math.max(0, track.scrollWidth - window.innerWidth + 48);
        gsap.to(track, {
          x: () => -dist(), ease: 'none',
          scrollTrigger: { trigger: '#saison', start: 'top top', end: () => '+=' + dist(), pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1 },
        });

        // M2 — Saison-Tint beim Betreten
        SECTION_SEASON.forEach(([sel, key]) => {
          ScrollTrigger.create({ trigger: sel, start: 'top 55%', onEnter: () => setSeason(key), onEnterBack: () => setSeason(key) });
        });
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(['.petal', '#core'], { scale: 1, transformOrigin: '0px 0px' });
        gsap.set(['[data-reveal]', '[data-line]'], { opacity: 1, y: 0, yPercent: 0 });
      });
    }, root);

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);
    const t = setTimeout(() => ScrollTrigger.refresh(), 400);

    return () => {
      window.removeEventListener('load', onLoad);
      clearTimeout(t);
      if (lenis) lenis.off('scroll', ScrollTrigger.update);
      ctx.revert();
    };
  }, [setSeason]);

  const e = ECKE[ecke];

  return (
    <div ref={root}>
      {/* ===== HERO ===== */}
      <section className="hero" id="hero">
        <div className="hero__bg" aria-hidden="true">
          <div className="leaf" data-speed="0.15" style={{ top: '12%', left: '-2%' }}>
            <svg width="220" height="220" viewBox="0 0 100 100"><path d="M50 6C74 26 74 74 50 94 26 74 26 26 50 6z" fill="#8A9A7B" fillOpacity="0.5" /><path d="M50 8v84" stroke="#3A2E23" strokeOpacity="0.25" /></svg>
          </div>
          <div className="leaf" data-speed="0.35" style={{ bottom: '8%', right: '4%', transform: 'rotate(200deg)' }}>
            <svg width="300" height="300" viewBox="0 0 100 100"><path d="M50 6C74 26 74 74 50 94 26 74 26 26 50 6z" fill="#C9552F" fillOpacity="0.35" /><path d="M50 8v84" stroke="#3A2E23" strokeOpacity="0.2" /></svg>
          </div>
          <div className="leaf" data-speed="0.6" style={{ top: '30%', right: '24%', transform: 'rotate(-40deg)' }}>
            <svg width="140" height="140" viewBox="0 0 100 100"><path d="M50 6C74 26 74 74 50 94 26 74 26 26 50 6z" fill="#A9B69C" fillOpacity="0.5" /></svg>
          </div>
        </div>

        <div className="wrap hero__inner">
          <div className="hero__copy">
            <p className="eyebrow reveal" data-reveal>Gärtnerei · Saison</p>
            <h1 className="reveal" data-reveal>Etwas<br />Lebendiges<br /><em>nach Hause.</em></h1>
            <p className="lede reveal" data-reveal>Keine Produkte im Raster — sondern Pflanzen mit Charakter, saisonal kuratiert und mit Liebe geliefert. Wähle ein Wesen, um das du dich kümmerst.</p>
            <div className="hero__cta reveal" data-reveal>
              <Link href="/shop" className="btn">Pflanzen entdecken</Link>
              <Link href="/pflege" className="btn btn--ghost">Pflege lernen</Link>
            </div>
          </div>

          <div className="hero__flower" aria-hidden="true">
            <svg id="bloom" viewBox="-60 -60 120 120">
              <g id="stem">
                <path d="M0 40 C -4 20 4 10 0 -2" fill="none" stroke="#6f7d5f" strokeWidth="2.4" strokeLinecap="round" />
                <path d="M0 22 C 12 16 18 22 14 30" fill="#8A9A7B" />
                <path d="M0 30 C -12 24 -18 30 -14 38" fill="#8A9A7B" />
              </g>
              <g id="petals">
                {Array.from({ length: PETALS }).map((_, i) => (
                  <path key={i} className="petal" d={petalPath} fill={petalColors[i % petalColors.length]} transform={`rotate(${(360 / PETALS) * i})`} />
                ))}
              </g>
              <circle id="core" r="7" fill="#E4B23C" />
            </svg>
          </div>
        </div>

        <div className="hero__scrollhint" aria-hidden="true"><span>Scrollen zum Blühen</span><span className="bar" /></div>
      </section>

      {/* ===== MANIFEST ===== */}
      <section className="section-pad manifest">
        <div className="wrap">
          <p>
            <span className="line"><span data-line style={{ display: 'block' }}>Andere verkaufen Transaktionen.</span></span>
            <span className="line"><span data-line style={{ display: 'block' }}>Wir verkaufen eine <em>Beziehung</em> —</span></span>
            <span className="line"><span data-line style={{ display: 'block' }}>zu etwas, das lebt und wächst.</span></span>
          </p>
        </div>
      </section>

      {/* ===== KATEGORIEN ===== */}
      <section className="section-pad" id="kategorien">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow reveal" data-reveal>Sortiment</span>
            <h2 className="reveal" data-reveal>Vier Wege, etwas Lebendiges zu finden</h2>
          </div>
          <div className="cats">
            {CATEGORIES.map((c) => (
              <Link key={c.slug} className="cat reveal" data-reveal href={`/shop?cat=${c.slug}`}>
                <span className="ph" data-img={CAT_IMG[c.slug]} />
                <span className="cat__label"><h3>{c.name}</h3><span>{c.sub}</span></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== NACH DEINER ECKE ===== */}
      <section className="section-pad">
        <div className="wrap">
          <div className="ecke">
            <div className="ecke__grid">
              <div>
                <span className="eyebrow reveal" data-reveal>Finde deine Pflanze</span>
                <h2 className="reveal" data-reveal style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', marginTop: '1rem' }}>Wie ist deine Ecke?</h2>
                <p className="reveal" data-reveal style={{ color: 'var(--soil)', marginTop: '1rem', maxWidth: '40ch' }}>Sag uns, wo die Pflanze wohnen soll — wir schlagen ein passendes Wesen vor.</p>
                <div className="chips" role="group" aria-label="Bedingung wählen">
                  {[['dunkel', 'Wenig Licht'], ['hell', 'Viel Sonne'], ['vergesslich', 'Vergesse zu gießen'], ['anfaenger', 'Erste Pflanze']].map(([k, label]) => (
                    <button key={k} className="chip" aria-pressed={ecke === k} onClick={() => setEcke(k)}>{label}</button>
                  ))}
                </div>
              </div>
              <div className="ecke__result" aria-live="polite">
                <span className="ph" data-img={e.img} />
                <h3>{e.n} <span className="sci">{e.sci}</span></h3>
                <p>{e.t}</p>
                <p style={{ marginTop: '.8rem' }}><Link href={`/shop/pflanzen/${e.slug}`} style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>Ansehen →</Link></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SAISON (M5) ===== */}
      <section className="saison" id="saison">
        <div className="wrap section-pad" style={{ paddingBottom: '2rem' }}>
          <div className="section-head">
            <span className="eyebrow reveal" data-reveal>Kollektion · Saison</span>
            <h2 className="reveal" data-reveal>Was gerade blüht</h2>
            <p className="reveal" data-reveal>Ein Spaziergang durch die Saison — kein Raster. Scrolle weiter.</p>
          </div>
        </div>
        <div className="track-viewport">
          <div className="track" id="saisonTrack">
            {[
              ['IMG · Prompt 15 — Sommer Dahlien', 'Dahlien-Bund', 'Dahlia · warm'],
              ['IMG · Prompt 13 — Feige im Raum', 'Geigenfeige', 'Ficus lyrata'],
              ['IMG · Prompt 9 — helles Fenster', 'Sonnenanbeter', 'viel Licht'],
              ['IMG · Prompt 22 — Abo Vase', 'Wochenstrauß', 'Blumen-Abo'],
              ['IMG · Prompt 12 — Wurzel-Detail', 'Wurzelwerk', 'Textur'],
            ].map(([img, h, s]) => (
              <article className="scard" key={h}><span className="ph ph--dark" data-img={img} /><h3>{h}</h3><span>{s}</span></article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BESTSELLER ===== */}
      <section className="section-pad" id="bestseller">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow reveal" data-reveal>Beliebt</span>
            <h2 className="reveal" data-reveal>Wesen, die oft ein Zuhause finden</h2>
          </div>
          <div className="products">
            {bestseller.map((p) => (
              <Link className="pcard reveal" data-reveal key={p.slug} href={`/shop/${p.category}/${p.slug}`}>
                <span className="ph" data-img={p.img} />
                <h3>{p.name}<span className="sci">{p.sci}</span></h3>
                <div className="pcard__foot"><span className="price">ab {p.price} €</span><span className="care">Pflege · {p.care}</span></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== AUS DER GÄRTNEREI ===== */}
      <section className="section-pad gaertnerei" id="gaertnerei">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow reveal" data-reveal>Hinter den Pflanzen</span>
            <h2 className="reveal" data-reveal>Von Händen, die sich kümmern</h2>
            <p className="reveal" data-reveal>Jede Pflanze wird bei uns aufgezogen, getopft und von Hand verpackt. Das ist der Unterschied zwischen einem Shop und einer Gärtnerei.</p>
          </div>
          <div className="gaertnerei__grid">
            <span className="ph reveal" data-reveal data-img="IMG · Prompt 18 — Hände topfen" />
            <span className="ph reveal" data-reveal data-img="IMG · Prompt 20 — Blätter besprühen" />
            <span className="ph reveal" data-reveal data-img="IMG · Prompt 19 — in Kraftpapier" />
          </div>
        </div>
      </section>

      {/* ===== ABO ===== */}
      <section className="section-pad" id="abo">
        <div className="wrap abo">
          <div className="abo__grid">
            <span className="ph reveal" data-reveal data-img="IMG · Prompt 22 — Wochenstrauß" />
            <div>
              <span className="eyebrow reveal" data-reveal>Blumen-Abo</span>
              <h2 className="reveal" data-reveal style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', marginTop: '1rem' }}>Jede Woche etwas Frisches</h2>
              <p className="reveal" data-reveal style={{ color: 'var(--soil)', margin: '1rem 0 1.6rem', maxWidth: '42ch' }}>Ein wechselnder Saisonstrauß, direkt an deine Tür. Pausierbar, jederzeit kündbar.</p>
              <Link href="/shop?cat=blumen" className="btn reveal" data-reveal>Abo entdecken</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== JOURNAL ===== */}
      <section className="section-pad" id="journal">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow reveal" data-reveal>Journal</span>
            <h2 className="reveal" data-reveal>Geschichten aus dem Grünen</h2>
          </div>
          <div className="journal">
            {[
              ['IMG · Prompt 23 — Schere & Notizbuch', 'Pflege', 'Wie du Monstera richtig schneidest'],
              ['IMG · Prompt 24 — Farnwedel', 'Saison', 'Was der Sommer für dein Fenster bereithält'],
              ['IMG · Prompt 25 — Fensterbank golden', 'Menschen', 'Ein Morgen in der Gärtnerei'],
            ].map(([img, cat, title]) => (
              <article className="jcard reveal" data-reveal key={title}>
                <span className="ph" data-img={img} /><span className="eyebrow">{cat}</span><h3>{title}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== VERSPRECHEN ===== */}
      <section className="section-pad" id="pflegepromise">
        <div className="wrap">
          <div className="promise">
            <div className="promise__item reveal" data-reveal>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 3C7 8 7 14 12 21 17 14 17 8 12 3z" /></svg>
              <h3>Kostenlose Beratung</h3><p>Unsicher? Unser Pflanzendoktor hilft bei jedem gelben Blatt.</p>
            </div>
            <div className="promise__item reveal" data-reveal>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 8h16v11a1 1 0 01-1 1H5a1 1 0 01-1-1z" /><path d="M9 8V5a3 3 0 016 0v3" /></svg>
              <h3>Nachhaltig verpackt</h3><p>Kraftpapier statt Plastik. Kompostierbar, mit Sorgfalt.</p>
            </div>
            <div className="promise__item reveal" data-reveal>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="9" /><path d="M9 12l2 2 4-4" /></svg>
              <h3>30-Tage-Frischegarantie</h3><p>Deiner Pflanze geht es nicht gut? Wir ersetzen sie.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== NEWSLETTER ===== */}
      <section className="section-pad">
        <div className="wrap">
          <div className="news section-pad" style={{ paddingInline: 'clamp(1.5rem,5vw,4rem)' }}>
            <h2 className="reveal" data-reveal>Bleib im Grünen</h2>
            <p className="reveal" data-reveal>Saisonale Pflege-Tipps, neue Kollektionen und stille Freude — etwa zweimal im Monat.</p>
            <form className="reveal" data-reveal onSubmit={(ev) => ev.preventDefault()}>
              <label htmlFor="nl" className="skip">E-Mail</label>
              <input id="nl" type="email" placeholder="deine@email.de" required />
              <button className="btn btn--accent" type="submit">Abonnieren</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
