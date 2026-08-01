'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthContext';

export default function Registrieren() {
  const { register } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true); setError('');
    const res = await register(form.name, form.email, form.password);
    setBusy(false);
    if (res.ok) router.push('/konto');
    else setError(res.error);
  };

  return (
    <div className="wrap page">
      <div style={{ padding: '2rem 0 5rem' }}>
        <div className="auth">
          <h1>Konto erstellen</h1>
          <p className="sub">Damit deine Pflanzen ein Zuhause und ein Tagebuch bekommen.</p>

          <form onSubmit={submit}>
            <div className="field">
              <label htmlFor="name">Name</label>
              <input id="name" type="text" autoComplete="name" value={form.name}
                onChange={set('name')} placeholder="Vorname" required />
            </div>
            <div className="field">
              <label htmlFor="email">E-Mail</label>
              <input id="email" type="email" autoComplete="email" value={form.email}
                onChange={set('email')} placeholder="deine@email.de" required />
            </div>
            <div className="field">
              <label htmlFor="pw">Passwort</label>
              <input id="pw" type="password" autoComplete="new-password" value={form.password}
                onChange={set('password')} placeholder="mindestens 8 Zeichen" required minLength={8} />
            </div>
            {error && <p role="alert" className="auth__error">{error}</p>}
            <button className="btn" type="submit" disabled={busy}>{busy ? 'Wird erstellt…' : 'Konto erstellen'}</button>
            <p className="auth__alt">Schon dabei? <Link href="/konto/anmelden">Anmelden</Link></p>
            <p className="auth__note">Dein Passwort wird mit bcrypt gehasht gespeichert — im Klartext sieht es niemand.</p>
          </form>
        </div>
      </div>
    </div>
  );
}
