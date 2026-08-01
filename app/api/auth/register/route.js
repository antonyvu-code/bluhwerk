import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/db';
import { createSessionToken, sessionCookieOptions } from '@/lib/auth';

export async function POST(request) {
  let body;
  try { body = await request.json(); } catch { return NextResponse.json({ error: 'Ungültige Anfrage' }, { status: 400 }); }

  const name = (body.name || '').trim();
  const email = (body.email || '').trim().toLowerCase();
  const password = body.password || '';

  if (!name || !email || !password) return NextResponse.json({ error: 'Bitte alle Felder ausfüllen.' }, { status: 400 });
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return NextResponse.json({ error: 'Bitte eine gültige E-Mail angeben.' }, { status: 400 });
  if (password.length < 8) return NextResponse.json({ error: 'Passwort muss mindestens 8 Zeichen haben.' }, { status: 400 });

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return NextResponse.json({ error: 'Diese E-Mail ist bereits registriert.' }, { status: 409 });

  const passwordHash = bcrypt.hashSync(password, 10);
  const user = await prisma.user.create({
    data: { name, email, passwordHash },
    select: { id: true, email: true, name: true },
  });

  const token = await createSessionToken(user.id);
  const res = NextResponse.json({ user });
  res.cookies.set({ ...sessionCookieOptions(), value: token });
  return res;
}
