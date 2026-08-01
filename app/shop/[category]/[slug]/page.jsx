import Link from 'next/link';
import { prisma } from '@/lib/db';
import ProductDetail from '@/components/ProductDetail';

export async function generateStaticParams() {
  const products = await prisma.product.findMany({ select: { slug: true, category: true } });
  return products.map((p) => ({ category: p.category, slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = await prisma.product.findUnique({ where: { slug }, select: { name: true, steckbrief: true } });
  return p ? { title: `${p.name} — Blühwerk`, description: p.steckbrief } : { title: 'Shop — Blühwerk' };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug } });

  if (!product) {
    return (
      <div className="wrap page" style={{ minHeight: '60vh' }}>
        <div className="page-head">
          <h1>Dieses Wesen ruht gerade</h1>
          <p>Wir konnten „{slug}“ nicht finden. Vielleicht findest du im Shop etwas anderes.</p>
          <p style={{ marginTop: '1.5rem' }}><Link className="btn" href="/shop">Zum Shop</Link></p>
        </div>
      </div>
    );
  }

  const related = await prisma.product.findMany({
    where: { category: product.category, slug: { not: product.slug } },
    take: 4,
  });

  return <ProductDetail product={product} related={related} />;
}
