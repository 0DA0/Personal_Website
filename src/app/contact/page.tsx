import type { Metadata } from 'next';
import ContactClient from '@/components/ContactClient';

export const metadata: Metadata = {
  title: 'İletişim',
  description: 'Doğukan ile iletişime geçin — proje teklifi, iş birliği veya soru için.',
};

export default function ContactPage() {
  return <ContactClient />;
}
