'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthContext';

export default function Anmelden() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true); setError('');
    const res = await login(email, password);
    setBusy(false);
    if (res.ok) router.push('/konto');
    else setError(res.error);
  };

  return (
    <div className="wrap page">
      <div style={{ padding: '2rem 0 5rem' }}>
        <div className="auth">
          <h1>Anmelden</h1>
          <p className="sub">Schön, dich wiederzusehen.</p>

          <form onSubmit={submit}>
            <div className="field">
              <label htmlFor="email">E-Mail</label>
              <input id="email" type="email" autoComplete="email" value={email}
                onChange={(e) => setEmail(e.target.value)} placeholder="deine@email.de" required />
            </div>
            <div className="field">
              <label htmlFor="pw">Passwort</label>
              <input id="pw" type="password" autoComplete="current-password" value={password}
                onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
            </div>
            {error && <p role="alert" className="auth__error">{error}</p>}
            <button className="btn" type="submit" disabled={busy}>{busy ? 'Wird angemeldet…' : 'Anmelden'}</button>
            <p className="auth__alt">Noch kein Konto? <Link href="/konto/registrieren">Jetzt registrieren</Link></p>
            <p className="auth__note">Demo-Konto: <strong>demo@bluhwerk.de</strong> · Passwort <strong>gaertnerei</strong></p>
          </form>
        </div>
      </div>
    </div>
  );
}
