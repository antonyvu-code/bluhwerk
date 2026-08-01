import Link from 'next/link';
import { JOURNAL } from '@/lib/content';
import Reveal from '@/components/Reveal';

export const metadata = { title: 'Journal — Blühwerk' };

export default function JournalPage() {
  const [lead, ...rest] = JOURNAL;
  return (
    <div className="wrap page">
      <div className="page-head">
        <nav className="breadcrumb"><Link href="/">Start</Link><span>/</span><span>Journal</span></nav>
        <span className="eyebrow">Journal</span>
        <h1>Geschichten aus dem Grünen</h1>
        <p>Pflege, Saison und die Menschen hinter den Pflanzen. Kein Ratgeber-Ton — eher ein Notizbuch aus der Gärtnerei.</p>
      </div>

      <section style={{ padding: '0 0 4rem' }}>
        <Reveal>
          <Link className="jlead" href={`/journal/${lead.slug}`}>
            <span className="ph" data-img={lead.img} />
            <div className="jlead__body">
              <span className="eyebrow">{lead.category} · {lead.read}</span>
              <h2>{lead.title}</h2>
              <p>{lead.excerpt}</p>
              <span className="jlead__more">Lesen →</span>
            </div>
          </Link>
        </Reveal>

        <div className="journal" style={{ marginTop: '2.5rem' }}>
          {rest.map((a, i) => (
            <Reveal key={a.slug} delay={(i % 3) * 60}>
              <Link className="jcard" href={`/journal/${a.slug}`}>
                <span className="ph" data-img={a.img} />
                <span className="eyebrow">{a.category} · {a.read}</span>
                <h3>{a.title}</h3>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
