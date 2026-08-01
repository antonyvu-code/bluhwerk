import Link from 'next/link';
import { COLLECTIONS } from '@/lib/content';
import { getPlant } from '@/lib/plants';
import Reveal from '@/components/Reveal';

export const metadata = { title: 'Kollektionen — Blühwerk' };

export default function KollektionenPage() {
  return (
    <div className="wrap page">
      <div className="page-head">
        <nav className="breadcrumb"><Link href="/">Start</Link><span>/</span><span>Kollektionen</span></nav>
        <span className="eyebrow">Kuratiert</span>
        <h1>Kollektionen</h1>
        <p>Nicht nach Kategorie, sondern nach Gefühl und Situation zusammengestellt. Für Momente, in denen du nicht weißt, wo du anfangen sollst.</p>
      </div>

      <section style={{ padding: '0 0 4rem' }}>
        <div className="coll">
          {COLLECTIONS.map((c, i) => (
            <Reveal key={c.slug} delay={(i % 2) * 80}>
              <article className="coll__card">
                <span className="ph" data-img={c.img} />
                <div className="coll__body">
                  <span className="eyebrow">{c.plants.length} Wesen</span>
                  <h2>{c.title}</h2>
                  <p className="coll__sub">{c.sub}</p>
                  <p>{c.text}</p>
                  <div className="coll__plants">
                    {c.plants.map((slug) => {
                      const p = getPlant(slug);
                      if (!p) return null;
                      return <Link key={slug} className="tagpill" href={`/shop/${p.category}/${p.slug}`}>{p.name}</Link>;
                    })}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
