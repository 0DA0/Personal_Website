import type { Metadata } from 'next';
import '../styles/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default: 'Doğukan Aras | Full Stack Web Developer',
    template: '%s | Doğukan Aras',
  },
  description:
    'Doğukan Aras — Full Stack Web Developer. Angular, Node.js, Python ve modern web teknolojileriyle ölçeklenebilir uygulamalar geliştiriyorum.',
  keywords: [
    'Doğukan Aras', 'Dogukan Aras', 'Doğukan', 'web developer',
    'full stack developer', 'angular developer', 'node.js developer',
    'python developer', 'portfolio', 'frontend developer',
    'backend developer', 'türk yazılımcı', 'türk developer',
  ],
  authors: [{ name: 'Doğukan Aras' }],
  creator: 'Doğukan Aras',
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://dogukanaras.dev',
    title: 'Doğukan Aras | Full Stack Web Developer',
    description:
      'Doğukan Aras — Full Stack Web Developer. Angular, Node.js ve Python ile ölçeklenebilir web uygulamaları.',
    siteName: 'Doğukan Aras Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Doğukan Aras | Full Stack Web Developer',
    description: 'Doğukan Aras Full Stack Web Developer portfolyosu.',
  },
  robots: { index: true, follow: true },
  metadataBase: new URL('https://dogukanaras.dev'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>
        <div className="grid-bg" />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
