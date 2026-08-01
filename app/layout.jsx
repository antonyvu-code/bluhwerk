import './globals.css';
import Providers from '@/components/Providers';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Blühwerk — Etwas Lebendiges nach Hause bringen',
  description:
    'Blühwerk ist keine Blumen-Website, sondern eine Gärtnerei. Pflanzen mit Charakter, saisonal kuratiert, mit Liebe geliefert.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body>
        <a className="skip" href="#main">Zum Inhalt springen</a>
        <Providers>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
