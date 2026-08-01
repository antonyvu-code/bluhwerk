import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/db';
import { createSessionToken, sessionCookieOptions } from '@/lib/auth';

export async function POST(request) {
  let body;
  try { body = await request.json(); } catch { return NextResponse.json({ error: 'Ungültige Anfrage' }, { status: 400 }); }

  const email = (body.email || '').trim().toLowerCase();
  const password = body.password || '';
  if (!email || !password) return NextResponse.json({ error: 'Bitte E-Mail und Passwort angeben.' }, { status: 400 });

  const user = await prisma.user.findUnique({ where: { email } });
  // Gleiche Antwort bei falscher Mail/Passwort — keine Account-Enumeration
  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    return NextResponse.json({ error: 'E-Mail oder Passwort ist falsch.' }, { status: 401 });
  }

  const token = await createSessionToken(user.id);
  const res = NextResponse.json({ user: { id: user.id, email: user.email, name: user.name } });
  res.cookies.set({ ...sessionCookieOptions(), value: token });
  return res;
}
