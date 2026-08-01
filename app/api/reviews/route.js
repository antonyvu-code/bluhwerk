import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';

export async function GET() {
  const reviews = await prisma.review.findMany({
    orderBy: { createdAt: 'desc' },
    select: { id: true, name: true, city: true, plant: true, rating: true, text: true, createdAt: true, userId: true },
  });
  return NextResponse.json({ reviews });
}

export async function POST(request) {
  let body;
  try { body = await request.json(); } catch { return NextResponse.json({ error: 'Ungültige Anfrage' }, { status: 400 }); }

  const name = (body.name || '').trim();
  const text = (body.text || '').trim();
  const rating = Number(body.rating);
  if (!name || !text) return NextResponse.json({ error: 'Name und Text sind erforderlich.' }, { status: 400 });
  if (!(rating >= 1 && rating <= 5)) return NextResponse.json({ error: 'Bewertung muss 1–5 Sterne sein.' }, { status: 400 });

  const user = await getSessionUser();
  const review = await prisma.review.create({
    data: {
      name,
      city: (body.city || '').trim() || 'Deutschland',
      plant: (body.plant || '').trim() || '—',
      rating,
      text,
      userId: user?.id ?? null,
    },
    select: { id: true, name: true, city: true, plant: true, rating: true, text: true, createdAt: true, userId: true },
  });

  return NextResponse.json({ review }, { status: 201 });
}
