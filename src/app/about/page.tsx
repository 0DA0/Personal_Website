import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hakkımda',
  description: 'Doğukan hakkında — Full Stack Web Developer. Angular, Node.js, Python ile modern ve ölçeklenebilir web uygulamaları geliştiriyorum.',
};

const interests = ['Backend Development', 'System Design', 'Machine Learning', 'Open Source', 'Cloud Computing'];

export default function AboutPage() {
  return (
    <>
      <style>{`
        .about { min-height: 100vh; padding: 140px 0 4rem; }
        .about-header { text-align: center; margin-bottom: 4rem; }
        .about-title { font-size: clamp(2rem, 5vw, 3.5rem); font-family: var(--font-mono); animation: fadeInUp 0.6s ease both; }
        .about-subtitle { margin-top: 0.8rem; font-size: 1rem; animation: fadeInUp 0.6s 0.1s ease both; }
        .about-grid { display: grid; grid-template-columns: 1fr 1.4fr; gap: 4rem; align-items: start; animation: fadeInUp 0.7s 0.2s ease both; }
        .about-card { background: var(--bg-dark); border: 1px solid var(--dark-green); border-radius: 6px; padding: 2rem; transition: border-color 0.3s, box-shadow 0.3s; }
        .about-card:hover { border-color: var(--neon-green); box-shadow: 0 0 24px rgba(0,255,65,0.1); }
        .avatar-wrap { width: 100px; height: 100px; border-radius: 50%; border: 2px solid var(--neon-green); box-shadow: 0 0 20px rgba(0,255,65,0.3); display: flex; align-items: center; justify-content: center; font-size: 2.5rem; margin-bottom: 1.5rem; background: var(--bg-darker); }
        .about-card h3 { color: var(--neon-green); font-size: 1.5rem; margin-bottom: 0.3rem; }
        .about-card .role { color: var(--accent-cyan); font-size: 0.95rem; margin-bottom: 1.2rem; }
        .info-row { display: flex; flex-direction: column; gap: 0.6rem; }
        .info-item { display: flex; gap: 0.8rem; font-size: 0.9rem; color: var(--text-secondary); }
        .info-label { color: var(--accent-cyan); min-width: 80px; }
        .bio-section h4 { color: var(--neon-green); font-size: 1.1rem; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid var(--dark-green); }
        .bio-text { color: var(--text-secondary); line-height: 1.9; font-size: 0.95rem; margin-bottom: 1.5rem; }
        .interests { display: flex; flex-wrap: wrap; gap: 0.6rem; margin-bottom: 2rem; }
        .tag { padding: 0.35rem 0.8rem; font-size: 0.82rem; font-weight: 600; border: 1px solid var(--dark-green); color: var(--neon-green); background: rgba(0,255,65,0.05); border-radius: 2px; font-family: var(--font-mono); transition: all 0.2s; }
        .tag:hover { background: rgba(0,255,65,0.12); border-color: var(--neon-green); }
        .social-links { display: flex; gap: 1rem; flex-wrap: wrap; }
        .social-btn { padding: 0.75rem 1.5rem; font-size: 0.9rem; font-weight: 600; border: 2px solid var(--neon-green); color: var(--neon-green); background: transparent; border-radius: 2px; display: inline-block; transition: all 0.3s; font-family: var(--font-mono); position: relative; overflow: hidden; }
        .social-btn::before { content: ''; position: absolute; inset: 0; background: var(--neon-green); transform: translateX(-100%); transition: transform 0.3s; z-index: -1; }
        .social-btn:hover { color: var(--bg-black); box-shadow: 0 0 16px var(--neon-green); }
        .social-btn:hover::before { transform: translateX(0); }
        .social-btn.secondary { border-color: var(--accent-cyan); color: var(--accent-cyan); }
        .social-btn.secondary::before { background: var(--accent-cyan); }
        .social-btn.secondary:hover { color: var(--bg-black); box-shadow: 0 0 16px var(--accent-cyan); }
        @media (max-width: 900px) { .about-grid { grid-template-columns: 1fr; gap: 2rem; } }
        @media (max-width: 480px) { .about { padding-top: 100px; } .social-links { flex-direction: column; } }
      `}</style>
      <div className="about">
        <div className="container">
          <div className="about-header">
            <h1 className="about-title terminal-prompt">hakkımda.json</h1>
            <p className="about-subtitle code-comment">// Beni daha yakından tanıyın</p>
          </div>
          <div className="about-grid">
            <div className="about-card">
              <div className="avatar-wrap">👨‍💻</div>
              <h3>Doğukan</h3>
              <p className="role">Full Stack Web Developer</p>
              <div className="info-row">
                {[['Konum', 'Türkiye'], ['Deneyim', '2+ Yıl'], ['Eğitim', 'Bilgisayar Mühendisliği'], ['E-posta', 'iletişim formu']].map(([label, val]) => (
                  <div key={label} className="info-item">
                    <span className="info-label">{label}:</span>
                    <span>{val}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bio-section">
              <h4 className="terminal-prompt">Hakkımda</h4>
              <p className="bio-text">Full Stack Web Developer olarak Angular, Node.js, Python ve modern web teknolojileriyle ölçeklenebilir ve güvenli web uygulamaları geliştiriyorum. Temiz kod yazmak, sistem tasarımı ve performans optimizasyonu konularında tutkuyla çalışıyorum.</p>
              <p className="bio-text">Hem frontend hem backend tarafında güçlü bir deneyime sahibim. RESTful API tasarımından veritabanı optimizasyonuna, kullanıcı arayüzü geliştirmeden DevOps pratiklerine kadar geniş bir yelpazede proje deneyimim bulunuyor.</p>
              <h4 className="terminal-prompt" style={{ marginBottom: '1rem' }}>İlgi Alanları</h4>
              <div className="interests">
                {interests.map(i => <span key={i} className="tag">{i}</span>)}
              </div>
              <div className="social-links">
                <a href="https://github.com/0DA0" target="_blank" rel="noopener noreferrer" className="social-btn">GitHub</a>
                <a href="https://www.linkedin.com/in/doğukan-aras-424184340/" target="_blank" rel="noopener noreferrer" className="social-btn secondary">LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
