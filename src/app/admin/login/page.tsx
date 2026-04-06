'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();

      if (res.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        setError(data.message || 'Hatalı şifre');
      }
    } catch {
      setError('Sunucuya bağlanılamadı');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #080808; font-family: 'JetBrains Mono', monospace; }
        :root {
          --neon-green: #00ff41; --dark-green: #003d1a;
          --bg-black: #080808; --bg-dark: #0f0f0f; --bg-darker: #0a0a0a;
          --text-secondary: #b8d7a3; --text-dim: #5a7a5a;
          --accent-red: #ff3864; --font-mono: 'JetBrains Mono', monospace;
        }
        .login-page {
          min-height: 100vh; display: flex; align-items: center; justify-content: center;
          background: var(--bg-black); padding: 2rem;
        }
        .login-box {
          width: 100%; max-width: 400px;
          background: var(--bg-dark); border: 1px solid var(--dark-green);
          border-radius: 8px; padding: 2.5rem;
          box-shadow: 0 0 40px rgba(0,255,65,0.08);
        }
        .login-logo { text-align: center; margin-bottom: 2rem; }
        .login-logo h1 {
          font-size: 1.8rem; color: var(--neon-green);
          text-shadow: 0 0 15px var(--neon-green); font-family: var(--font-mono);
        }
        .login-logo p { color: var(--text-dim); font-size: 0.85rem; margin-top: 0.4rem; }
        .login-form { display: flex; flex-direction: column; gap: 1.2rem; }
        .login-form label { font-size: 0.88rem; color: var(--text-secondary); display: block; margin-bottom: 0.4rem; }
        .login-form input {
          width: 100%; padding: 0.85rem 1rem;
          background: var(--bg-darker); border: 2px solid var(--dark-green);
          color: var(--text-secondary); font-family: var(--font-mono);
          font-size: 0.95rem; border-radius: 4px; outline: none;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .login-form input:focus {
          border-color: var(--neon-green);
          box-shadow: 0 0 0 3px rgba(0,255,65,0.1);
        }
        .login-btn {
          width: 100%; padding: 1rem; font-family: var(--font-mono);
          font-size: 0.95rem; font-weight: 700; cursor: pointer;
          background: transparent; border: 2px solid var(--neon-green);
          color: var(--neon-green); border-radius: 4px; transition: all 0.3s;
          margin-top: 0.5rem; position: relative; overflow: hidden;
        }
        .login-btn:hover:not(:disabled) { background: var(--neon-green); color: var(--bg-black); box-shadow: 0 0 20px var(--neon-green); }
        .login-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .login-error {
          padding: 0.8rem 1rem; background: rgba(255,56,100,0.1);
          border-left: 3px solid var(--accent-red); color: var(--accent-red);
          font-size: 0.88rem; border-radius: 2px; margin-bottom: 1rem;
        }
        .login-note { text-align: center; margin-top: 1.5rem; color: var(--text-dim); font-size: 0.78rem; }
      `}</style>

      <div className="login-page">
        <div className="login-box">
          <div className="login-logo">
            <h1>// admin</h1>
            <p>Portfolio Yönetim Paneli</p>
          </div>

          {error && <div className="login-error">❌ {error}</div>}

          <form className="login-form" onSubmit={handleSubmit}>
            <div>
              <label>Şifre</label>
              <input
                type="password" placeholder="••••••••"
                value={password} onChange={e => setPassword(e.target.value)}
                disabled={loading} autoFocus
              />
            </div>
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? 'Giriş yapılıyor...' : '> Giriş Yap'}
            </button>
          </form>

          <p className="login-note">// Bu sayfa arama motorlarında görünmez</p>
        </div>
      </div>
    </>
  );
}
