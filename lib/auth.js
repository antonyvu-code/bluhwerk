import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { prisma } from './db';

const secret = new TextEncoder().encode(process.env.AUTH_SECRET || 'dev-only-insecure-secret');
export const SESSION_COOKIE = 'bw_session';
const MAX_AGE = 60 * 60 * 24 * 7; // 7 Tage

export async function createSessionToken(userId) {
  return new SignJWT({ sub: userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret);
}

export async function verifySessionToken(token) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}

// Cookie im Response setzen (Route Handler): res.cookies.set(...)
export function sessionCookieOptions() {
  return {
    name: SESSION_COOKIE,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: MAX_AGE,
  };
}

// Aktuellen User aus dem Cookie lesen (Server Component / Route Handler)
export async function getSessionUser() {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const payload = await verifySessionToken(token);
  if (!payload?.sub) return null;
  try {
    return await prisma.user.findUnique({
      where: { id: payload.sub },
      select: { id: true, email: true, name: true, createdAt: true },
    });
  } catch {
    return null;
  }
}
