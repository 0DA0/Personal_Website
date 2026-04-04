import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    // Validation
    if (!name?.trim() || name.trim().length < 2) {
      return NextResponse.json({ message: 'Ad Soyad en az 2 karakter olmalı' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ message: 'Geçerli bir e-posta adresi giriniz' }, { status: 400 });
    }
    if (!message?.trim() || message.trim().length < 10) {
      return NextResponse.json({ message: 'Mesaj en az 10 karakter olmalı' }, { status: 400 });
    }

    // E-posta gönder (opsiyonel — Vercel'de env var ayarlanırsa çalışır)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const nodemailer = await import('nodemailer');
      const transporter = nodemailer.default.createTransport({
        service: process.env.EMAIL_SERVICE || 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_TO || process.env.EMAIL_USER,
        subject: `Portfolio İletişim: ${name}`,
        html: `
          <h3>Yeni İletişim Mesajı</h3>
          <p><strong>Ad:</strong> ${name}</p>
          <p><strong>E-posta:</strong> ${email}</p>
          <p><strong>Mesaj:</strong></p>
          <p>${message}</p>
        `,
      });
    } else {
      // E-posta ayarı yoksa logla (development)
      console.log('📧 İletişim formu:', { name, email, message });
    }

    return NextResponse.json({ message: 'Mesajınız başarıyla gönderildi!' });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json({ message: 'Sunucu hatası oluştu.' }, { status: 500 });
  }
}
