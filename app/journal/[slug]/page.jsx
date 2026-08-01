import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticle, JOURNAL } from '@/lib/content';

export function generateStaticParams() {
  return JOURNAL.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const a = getArticle(slug);
  return { title: a ? `${a.title} — Journal` : 'Journal — Blühwerk' };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();

  const more = JOURNAL.filter((x) => x.slug !== a.slug).slice(0, 2);

  return (
    <div className="wrap page">
      <article className="article">
        <nav className="breadcrumb"><Link href="/">Start</Link><span>/</span><Link href="/journal">Journal</Link><span>/</span><span>{a.category}</span></nav>
        <span className="eyebrow">{a.category} · {a.read}</span>
        <h1>{a.title}</h1>
        <p className="article__lede">{a.excerpt}</p>
        <span className="ph article__hero" data-img={a.img} />
        <div className="article__body">
          {a.body.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </article>

      <section style={{ padding: '3rem 0 4rem', borderTop: '1px solid var(--line)' }}>
        <span className="eyebrow" style={{ display: 'block', marginBottom: '1.4rem' }}>Weiterlesen</span>
        <div className="journal">
          {more.map((x) => (
            <Link className="jcard" key={x.slug} href={`/journal/${x.slug}`}>
              <span className="ph" data-img={x.img} />
              <span className="eyebrow">{x.category} · {x.read}</span>
              <h3>{x.title}</h3>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
