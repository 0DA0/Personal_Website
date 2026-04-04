# Vercel Deploy Rehberi

## Proje Yapısı
```
nextjs-portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx          ← Root layout + SEO metadata
│   │   ├── page.tsx            ← Ana sayfa
│   │   ├── about/page.tsx
│   │   ├── projects/page.tsx
│   │   ├── skills/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── sitemap.ts          ← Otomatik sitemap
│   │   └── api/
│   │       └── contact/route.ts ← Serverless API (e-posta)
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── HomeClient.tsx
│   │   └── ContactClient.tsx
│   └── styles/globals.css
├── public/
│   └── robots.txt
├── .env.example
├── next.config.js
├── package.json
└── tsconfig.json
```

---

## Adım 1 — Kişisel Bilgileri Güncelle

Aşağıdaki dosyalarda kendi bilgilerini gir:

| Dosya | Değiştirilecek yer |
|-------|--------------------|
| `src/app/layout.tsx` | `metadataBase` URL'ini (dogukan.dev → kendi domain'in) |
| `src/app/sitemap.ts` | `base` URL'ini |
| `src/app/about/page.tsx` | İsim, bio, konum, e-posta |
| `src/app/projects/page.tsx` | Proje başlıkları, açıklamaları, GitHub linkleri |
| `src/components/Footer.tsx` | Sosyal medya linkleri |
| `public/robots.txt` | Sitemap URL'i |

---

## Adım 2 — Local Test

```bash
cd nextjs-portfolio
npm install
npm run dev
# → http://localhost:3000
```

---

## Adım 3 — GitHub'a Push

```bash
git init
git add .
git commit -m "Initial Next.js portfolio"
git remote add origin https://github.com/KULLANICI_ADI/portfolio.git
git push -u origin main
```

---

## Adım 4 — Vercel Deploy

1. [vercel.com](https://vercel.com) → **Add New Project**
2. GitHub reposunu seç
3. Framework: **Next.js** (otomatik algılar)
4. **Deploy** butonuna bas → bitti!

---

## Adım 5 — E-posta Ayarı (Opsiyonel)

Contact formu şu an çalışıyor ama e-posta göndermez (sadece loglar).
E-posta aktif etmek için:

1. Vercel Dashboard → Settings → **Environment Variables**
2. Şunları ekle:
   ```
   EMAIL_SERVICE = gmail
   EMAIL_USER    = senin@gmail.com
   EMAIL_PASS    = xxxx-xxxx-xxxx-xxxx   ← Gmail App Password
   EMAIL_TO      = hedef@email.com
   ```
3. Gmail App Password almak için:
   - Google Hesabı → Güvenlik → 2FA aç
   - "Uygulama şifreleri" → "Diğer" → Oluştur

---

## SEO Özellikleri

- ✅ Her sayfa için özel `<title>` ve `<description>`
- ✅ Open Graph meta tags
- ✅ Otomatik `sitemap.xml` (`/sitemap.xml`)
- ✅ `robots.txt`
- ✅ Server-side rendering (Google içeriği tam okur)
- ✅ `canonical` URL
- ✅ Türkçe `lang="tr"` attribute

---

## Domain Bağlama

Vercel Dashboard → Domains → kendi domain'ini ekle.
DNS ayarları otomatik gösterilir (A veya CNAME record).
