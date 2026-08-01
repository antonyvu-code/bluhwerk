import Link from 'next/link';
import { prisma } from '@/lib/db';
import { CATEGORIES } from '@/lib/plants';
import Reveal from '@/components/Reveal';

export const metadata = { title: 'Shop — Blühwerk' };

export default async function ShopPage({ searchParams }) {
  const sp = await searchParams;
  const cat = sp?.cat || 'alle';

  const where = cat && cat !== 'alle' ? { category: cat } : {};
  const list = await prisma.product.findMany({ where, orderBy: { price: 'asc' } });
  const totalCount = await prisma.product.count();

  const filters = [{ slug: 'alle', name: 'Alle' }, ...CATEGORIES];

  return (
    <div className="wrap page">
      <div className="page-head">
        <nav className="breadcrumb"><Link href="/">Start</Link><span>/</span><span>Shop</span></nav>
        <span className="eyebrow">Sortiment</span>
        <h1>Wähle ein Wesen</h1>
        <p>Jede Pflanze bei Blühwerk hat einen Charakter, eine Herkunft und eigene Bedürfnisse. Filtere nach Kategorie.</p>
      </div>

      <div className="shop__bar" role="group" aria-label="Kategorie filtern">
        {filters.map((f) => (
          <Link
            key={f.slug}
            href={f.slug === 'alle' ? '/shop' : `/shop?cat=${f.slug}`}
            className="chip"
            aria-pressed={cat === f.slug}
          >
            {f.name}
          </Link>
        ))}
      </div>

      <div className="shop__grid">
        {list.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 4) * 60}>
            <Link className="pcard" href={`/shop/${p.category}/${p.slug}`}>
              <span className="ph" data-img={p.img} />
              <h3>{p.name}<span className="sci">{p.sci}</span></h3>
              <div className="pcard__foot"><span className="price">ab {p.price} €</span><span className="care">Pflege · {p.care}</span></div>
            </Link>
          </Reveal>
        ))}
      </div>

      {list.length === 0 && <p style={{ color: 'var(--soil)', padding: '2rem 0' }}>Für diese Kategorie kommen bald neue Wesen dazu.</p>}

      <div style={{ padding: '4rem 0 2rem', color: 'var(--sage)', fontFamily: 'var(--mono)', fontSize: '.8rem' }}>
        {totalCount} Wesen im Sortiment · weitere folgen mit der Saison
      </div>
    </div>
  );
}
