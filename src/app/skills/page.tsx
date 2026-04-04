import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Yetenekler',
  description:
    'Doğukan\'ın teknik yetenekleri — Angular, React, Node.js, Python, TensorFlow, Docker ve daha fazlası.',
};

const categories = [
  {
    name: 'Frontend Development',
    skills: [
      { name: 'Angular', level: 85 },
      { name: 'TypeScript', level: 80 },
      { name: 'HTML5 & CSS3', level: 90 },
      { name: 'JavaScript', level: 85 },
      { name: 'React', level: 75 },
    ],
  },
  {
    name: 'Backend Development',
    skills: [
      { name: 'Node.js', level: 80 },
      { name: 'Express.js', level: 85 },
      { name: 'Python', level: 75 },
      { name: 'RESTful API', level: 90 },
      { name: 'PHP / CodeIgniter', level: 70 },
    ],
  },
  {
    name: 'Database & Cloud',
    skills: [
      { name: 'MongoDB', level: 75 },
      { name: 'PostgreSQL', level: 70 },
      { name: 'MySQL', level: 75 },
      { name: 'Firebase', level: 65 },
    ],
  },
  {
    name: 'Machine Learning',
    skills: [
      { name: 'TensorFlow', level: 70 },
      { name: 'Deep Learning', level: 75 },
      { name: 'CNN', level: 70 },
      { name: 'Jupyter Notebook', level: 80 },
    ],
  },
  {
    name: 'Tools & DevOps',
    skills: [
      { name: 'Git & GitHub', level: 90 },
      { name: 'Docker', level: 65 },
      { name: 'VS Code', level: 95 },
      { name: 'Postman', level: 85 },
    ],
  },
  {
    name: 'Mobile Development',
    skills: [
      { name: 'Android (Java)', level: 70 },
      { name: 'Mobile App Design', level: 65 },
    ],
  },
];

function getColor(level: number) {
  if (level >= 80) return 'var(--neon-green)';
  if (level >= 65) return 'var(--accent-cyan)';
  return 'var(--accent-yellow)';
}

export default function SkillsPage() {
  return (
    <>
      <style>{`
        .skills { min-height: 100vh; padding: 140px 0 4rem; }
        .skills-header { text-align: center; margin-bottom: 1.5rem; }
        .skills-title {
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-family: var(--font-mono);
          animation: fadeInUp 0.6s ease both;
        }
        .skills-sub { margin-top: 0.8rem; animation: fadeInUp 0.6s 0.1s ease both; }
        .github-cta {
          display: flex; justify-content: center; margin: 2.5rem 0 3.5rem;
          animation: fadeInUp 0.6s 0.2s ease both;
        }
        .gh-btn {
          display: inline-flex; align-items: center; gap: 0.8rem;
          padding: 0.9rem 2rem; border: 2px solid var(--neon-green);
          color: var(--neon-green); font-size: 0.95rem; font-weight: 600;
          font-family: var(--font-mono); border-radius: 2px;
          transition: all 0.3s; position: relative; overflow: hidden;
        }
        .gh-btn::before {
          content: ''; position: absolute; inset: 0;
          background: var(--neon-green); transform: translateX(-100%);
          transition: transform 0.3s; z-index: -1;
        }
        .gh-btn:hover { color: var(--bg-black); box-shadow: 0 0 20px var(--neon-green); }
        .gh-btn:hover::before { transform: translateX(0); }
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.8rem;
        }
        .cat-card {
          background: var(--bg-dark); border: 1px solid var(--dark-green);
          border-radius: 6px; padding: 1.8rem;
          transition: all 0.3s;
          animation: fadeInUp 0.6s ease both;
        }
        .cat-card:hover {
          border-color: var(--neon-green);
          box-shadow: 0 8px 32px rgba(0,255,65,0.12);
          transform: translateY(-3px);
        }
        .cat-header {
          display: flex; align-items: center; gap: 0.5rem;
          margin-bottom: 1.5rem; padding-bottom: 1rem;
          border-bottom: 1px solid var(--dark-green);
        }
        .cat-icon { color: var(--accent-cyan); font-weight: 700; font-size: 1.1rem; }
        .cat-header h2 { color: var(--neon-green); font-size: 1.1rem; flex: 1; }
        .skill-list { display: flex; flex-direction: column; gap: 1.2rem; }
        .skill-row {}
        .skill-info { display: flex; justify-content: space-between; margin-bottom: 0.4rem; font-size: 0.88rem; }
        .skill-name { color: var(--text-secondary); }
        .skill-pct { color: var(--accent-cyan); font-family: var(--font-mono); }
        .bar-bg {
          width: 100%; height: 7px; background: rgba(255,255,255,0.06);
          border-radius: 4px; overflow: hidden;
        }
        .bar-fill {
          height: 100%; border-radius: 4px;
          position: relative;
        }
        .bar-fill::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
          animation: shimmer 2s infinite;
        }

        @media (max-width: 700px) { .skills-grid { grid-template-columns: 1fr; } }
        @media (max-width: 480px) { .skills { padding-top: 100px; } .gh-btn { width: 100%; justify-content: center; } }
      `}</style>

      <div className="skills">
        <div className="container">
          <div className="skills-header">
            <h1 className="skills-title terminal-prompt">yeteneklerim.json</h1>
            <p className="skills-sub code-comment">// Kullandığım teknolojiler ve yetkinlik seviyeleri</p>
          </div>

          <div className="github-cta">
            <a href="https://github.com/0DA0" target="_blank" rel="noopener noreferrer" className="gh-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub Profilimi Görüntüle &gt;&gt;
            </a>
          </div>

          <div className="skills-grid">
            {categories.map((cat, i) => (
              <div key={cat.name} className="cat-card" style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="cat-header">
                  <span className="cat-icon">{'{'}</span>
                  <h2>{cat.name}</h2>
                  <span className="cat-icon">{'}'}</span>
                </div>
                <div className="skill-list">
                  {cat.skills.map(s => (
                    <div key={s.name} className="skill-row">
                      <div className="skill-info">
                        <span className="skill-name">{s.name}</span>
                        <span className="skill-pct">{s.level}%</span>
                      </div>
                      <div className="bar-bg">
                        <div
                          className="bar-fill"
                          style={{
                            width: `${s.level}%`,
                            background: getColor(s.level),
                            boxShadow: `0 0 8px ${getColor(s.level)}`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
