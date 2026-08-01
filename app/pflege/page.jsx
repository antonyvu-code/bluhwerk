import Link from 'next/link';
import { PLANTS } from '@/lib/plants';
import Reveal from '@/components/Reveal';

export const metadata = { title: 'Pflege — Blühwerk' };

export default function PflegePage() {
  return (
    <div className="wrap page">
      <div className="page-head">
        <nav className="breadcrumb"><Link href="/">Start</Link><span>/</span><span>Pflege</span></nav>
        <span className="eyebrow">Der Herzschlag</span>
        <h1>Pflege ist Liebe</h1>
        <p>Wir verkaufen dir keine Pflanze und verschwinden. Hier lernst du, wie du dein Wesen glücklich machst — und was zu tun ist, wenn ein Blatt gelb wird.</p>
        <p style={{ marginTop: '1.4rem' }}>
          <Link className="btn" href="/pflege/pflanzendoktor">Zum Pflanzendoktor</Link>
        </p>
      </div>

      <section style={{ padding: '1rem 0 3rem' }}>
        <div className="section-head"><span className="eyebrow" style={{ display: 'block', marginBottom: '.6rem' }}>Care-Guides</span><h2 style={{ fontSize: 'clamp(1.6rem,3.5vw,2.4rem)' }}>Pflege je Art</h2></div>
        <div className="pflege__grid">
          {PLANTS.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 60}>
              <Link className="jcard" href={`/shop/${p.category}/${p.slug}`}>
                <span className="ph" data-img={p.imgDetail} />
                <span className="eyebrow">Pflege · {p.care}</span>
                <h3>{p.name} <span className="sci" style={{ fontSize: '.85rem' }}>{p.sci}</span></h3>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
