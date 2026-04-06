import type { Metadata } from 'next';
import HomeClient from '@/components/HomeClient';

export const metadata: Metadata = {
  title: 'Doğukan | Full Stack Web Developer',
  description: 'Merhaba! Ben Doğukan — Angular, Node.js ve Python ile ölçeklenebilir web uygulamaları geliştiren bir Full Stack Web Developer.',
};

export default function HomePage() {
  return <HomeClient />;
}
