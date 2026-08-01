import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site">
      <div className="wrap">
        <div className="foot__grid">
          <div className="foot__brand">
            <Link className="logo" href="/">Blüh<b style={{ color: 'var(--accent)' }}>werk</b></Link>
            <p>Eine Gärtnerei für Menschen, die etwas Lebendiges nach Hause bringen wollen.</p>
          </div>
          <div>
            <h4>Entdecken</h4>
            <Link href="/shop">Shop</Link>
            <Link href="/kollektionen">Kollektionen</Link>
            <Link href="/nach-raum">Nach Raum</Link>
            <Link href="/abo">Blumen-Abo</Link>
          </div>
          <div>
            <h4>Lernen</h4>
            <Link href="/pflege">Pflege-Hub</Link>
            <Link href="/pflege/pflanzendoktor">Pflanzendoktor</Link>
            <Link href="/journal">Journal</Link>
            <Link href="/bewertungen">Bewertungen</Link>
          </div>
          <div>
            <h4>Konto</h4>
            <Link href="/konto">Übersicht</Link>
            <Link href="/konto/anmelden">Anmelden</Link>
            <Link href="/konto/meine-pflanzen">Meine Pflanzen</Link>
            <Link href="/warenkorb">Warenkorb</Link>
          </div>
        </div>
        <div className="foot__bottom">
          <span>© 2026 Blühwerk · Berlin</span>
          <span>Pflanzen mit Charakter</span>
        </div>
      </div>
    </footer>
  );
}
