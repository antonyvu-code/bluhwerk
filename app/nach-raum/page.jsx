import Link from 'next/link';
import { ROOMS } from '@/lib/content';
import { getPlant } from '@/lib/plants';
import Reveal from '@/components/Reveal';

export const metadata = { title: 'Nach Raum — Blühwerk' };

export default function NachRaumPage() {
  return (
    <div className="wrap page">
      <div className="page-head">
        <nav className="breadcrumb"><Link href="/">Start</Link><span>/</span><span>Nach Raum</span></nav>
        <span className="eyebrow">Finde nach Ort</span>
        <h1>Wo soll es grün werden?</h1>
        <p>Jeder Raum hat sein eigenes Licht, seine eigene Luft. Wähle den Ort — wir zeigen dir die Wesen, die sich dort wohlfühlen.</p>
      </div>

      <section style={{ padding: '0 0 4rem' }}>
        <div className="rooms">
          {ROOMS.map((r, i) => (
            <Reveal key={r.slug} delay={(i % 4) * 60}>
              <article className="room">
                <span className="ph" data-img={r.img} />
                <div className="room__label">
                  <h2>{r.name}</h2>
                  <span>{r.hint}</span>
                </div>
                <div className="room__plants">
                  {r.plants.map((slug) => {
                    const p = getPlant(slug);
                    if (!p) return null;
                    return <Link key={slug} className="tagpill" href={`/shop/${p.category}/${p.slug}`}>{p.name}</Link>;
                  })}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
