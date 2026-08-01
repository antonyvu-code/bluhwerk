import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';

export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: 'Nicht angemeldet' }, { status: 401 });

  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json({
    orders: orders.map((o) => ({ ...o, items: JSON.parse(o.items) })),
  });
}

export async function POST(request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: 'Bitte zuerst anmelden.' }, { status: 401 });

  let body;
  try { body = await request.json(); } catch { return NextResponse.json({ error: 'Ungültige Anfrage' }, { status: 400 }); }

  const items = Array.isArray(body.items) ? body.items : [];
  if (items.length === 0) return NextResponse.json({ error: 'Der Warenkorb ist leer.' }, { status: 400 });

  // Preise serverseitig aus der DB berechnen — nicht dem Client vertrauen
  let total = 0;
  const safeItems = [];
  for (const it of items) {
    const product = await prisma.product.findUnique({ where: { slug: it.slug } });
    if (!product) continue;
    const qty = Math.max(1, Math.min(99, Number(it.qty) || 1));
    total += product.price * qty;
    safeItems.push({ slug: product.slug, name: product.name, price: product.price, qty });
  }
  if (safeItems.length === 0) return NextResponse.json({ error: 'Keine gültigen Artikel im Warenkorb.' }, { status: 400 });

  const order = await prisma.order.create({
    data: { userId: user.id, items: JSON.stringify(safeItems), total },
  });

  return NextResponse.json({ order: { ...order, items: safeItems } }, { status: 201 });
}
