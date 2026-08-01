'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSeason } from './SeasonContext';
import { useCart } from './CartContext';
import { useAuth } from './AuthContext';

export default function Header() {
  const { name } = useSeason();
  const { count } = useCart();
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`topbar${scrolled ? ' scrolled' : ''}`}>
      <Link className="logo" href="/">Blüh<b>werk</b></Link>
      <nav className="nav" aria-label="Hauptnavigation">
        <Link className="hide-sm" href="/shop">Shop</Link>
        <Link className="hide-sm" href="/kollektionen">Kollektionen</Link>
        <Link className="hide-sm" href="/pflege">Pflege</Link>
        <Link className="hide-sm" href="/journal">Journal</Link>
        <Link className="hide-sm" href="/abo">Abo</Link>
        <span className="season-pill" aria-hidden="true"><span className="dot" />{name}</span>
        <Link href="/konto">{user ? user.name.split(' ')[0] : 'Konto'}</Link>
        <Link className="cart" href="/warenkorb" aria-label={`Warenkorb, ${count} Artikel`}>
          Warenkorb ({count})
        </Link>
      </nav>
    </header>
  );
}
