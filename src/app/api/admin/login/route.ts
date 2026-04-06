import { NextRequest, NextResponse } from 'next/server';
import { signToken } from '@/lib/auth';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    if (!password) {
      return NextResponse.json({ message: 'Şifre gerekli' }, { status: 400 });
    }

    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

    if (adminPasswordHash) {
      const isValid = await bcrypt.compare(password, adminPasswordHash);
      if (!isValid) {
        return NextResponse.json({ message: 'Hatalı şifre' }, { status: 401 });
      }
    } else {
      // Development fallback
      const isValid = password === process.env.ADMIN_PASSWORD;
      if (!isValid) {
        return NextResponse.json({ message: 'Hatalı şifre' }, { status: 401 });
      }
    }

    const token = await signToken({ role: 'admin' });

    const response = NextResponse.json({ message: 'Giriş başarılı' });
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
      path: '/',
    });

    return response;
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json({ message: 'Sunucu hatası' }, { status: 500 });
  }
}
