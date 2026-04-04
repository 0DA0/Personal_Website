import type { Metadata } from 'next';
import '../styles/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default: 'Doğukan | Full Stack Web Developer',
    template: '%s | Doğukan Portfolio',
  },
  description:
    'Full Stack Web Developer — Angular, Node.js, Python ve modern web teknolojileriyle ölçeklenebilir uygulamalar geliştiriyorum.',
  keywords: [
    'web developer', 'full stack developer', 'angular developer',
    'node.js developer', 'python developer', 'Doğukan', 'portfolio',
    'frontend developer', 'backend developer', 'türk yazılımcı',
  ],
  authors: [{ name: 'Doğukan' }],
  creator: 'Doğukan',
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://dogukan.dev',
    title: 'Doğukan | Full Stack Web Developer',
    description:
      'Full Stack Web Developer — Angular, Node.js ve Python ile ölçeklenebilir web uygulamaları.',
    siteName: 'Doğukan Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Doğukan | Full Stack Web Developer',
    description: 'Full Stack Web Developer portfolyosu.',
  },
  robots: { index: true, follow: true },
  metadataBase: new URL('https://dogukan.dev'),
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
