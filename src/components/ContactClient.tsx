'use client';

import { useState } from 'react';
import styles from './ContactClient.module.css';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function ContactClient() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [serverMsg, setServerMsg] = useState('');

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim() || form.name.length < 2) e.name = 'Ad Soyad en az 2 karakter olmalı';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Geçerli bir e-posta adresi giriniz';
    if (!form.message.trim() || form.message.length < 10) e.message = 'Mesaj en az 10 karakter olmalı';
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setServerMsg(data.message || 'Mesajınız başarıyla gönderildi!');
        setForm({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 6000);
      } else {
        setStatus('error');
        setServerMsg(data.message || 'Mesaj gönderilirken hata oluştu.');
      }
    } catch {
      setStatus('error');
      setServerMsg('Sunucuya bağlanılamadı. Lütfen tekrar deneyin.');
    }
  };

  return (
    <div className={styles.contact}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.header}>
            <h1 className={`${styles.title} terminal-prompt`}>iletisim.init()</h1>
            <p className={`${styles.sub} code-comment`}>// Benimle iletişime geçin</p>
          </div>

          {status === 'success' && <div className={styles.alertSuccess}>✅ {serverMsg}</div>}
          {status === 'error'   && <div className={styles.alertError}>❌ {serverMsg}</div>}

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.field}>
              <label>Ad Soyad <span className={styles.req}>*</span></label>
              <input
                type="text"
                placeholder="Ad soyad"
                className={errors.name ? styles.fieldErr : ''}
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                disabled={status === 'loading'}
              />
              {errors.name && <span className={styles.errMsg}>{errors.name}</span>}
            </div>

            <div className={styles.field}>
              <label>E-posta <span className={styles.req}>*</span></label>
              <input
                type="email"
                placeholder="ornek@email.com"
                className={errors.email ? styles.fieldErr : ''}
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                disabled={status === 'loading'}
              />
              {errors.email && <span className={styles.errMsg}>{errors.email}</span>}
            </div>

            <div className={styles.field}>
              <label>Mesaj <span className={styles.req}>*</span></label>
              <textarea
                rows={5}
                placeholder="Mesajınızı yazınız..."
                className={errors.message ? styles.fieldErr : ''}
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                disabled={status === 'loading'}
              />
              {errors.message && <span className={styles.errMsg}>{errors.message}</span>}
            </div>

            <button type="submit" className={styles.submitBtn} disabled={status === 'loading'}>
              {status === 'loading'
                ? <><span className={styles.spinner} /> Gönderiliyor...</>
                : 'Gönder'}
            </button>
          </form>

          <p className={styles.note}>
            // Sorularınız veya iş birliği teklifleri için formu doldurunuz.
          </p>
        </div>
      </div>
    </div>
  );
}
