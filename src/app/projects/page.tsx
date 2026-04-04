import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Projeler',
  description:
    'Doğukan\'ın geliştirdiği projeler — Angular, Node.js, React, Python ve daha fazlasıyla yapılmış web uygulamaları.',
};

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'Angular ve Node.js ile oluşturulmuş tam özellikli e-ticaret platformu. JWT auth, Stripe entegrasyonu ve admin paneli içeriyor.',
    technologies: ['Angular', 'Node.js', 'MongoDB', 'Stripe', 'JWT'],
    github: 'https://github.com/0DA0',
    demo: '#',
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'React ve Firebase ile yapılmış gerçek zamanlı görev yönetimi. Takım çalışması ve bildirim özellikleri mevcut.',
    technologies: ['React', 'Firebase', 'Tailwind CSS'],
    github: 'https://github.com/0DA0',
    demo: '#',
  },
  {
    id: 3,
    title: 'Portfolio Website',
    description: 'Next.js ile geliştirilmiş SEO optimizasyonlu kişisel portfolio sitesi. Vercel\'de yayında.',
    technologies: ['Next.js', 'TypeScript', 'CSS'],
    github: 'https://github.com/0DA0',
    demo: '#',
  },
  {
    id: 4,
    title: 'REST API Backend',
    description: 'Express.js ile geliştirilmiş, Docker ile containerize edilmiş ölçeklenebilir REST API. PostgreSQL ve Redis kullanılıyor.',
    technologies: ['Node.js', 'Express', 'PostgreSQL', 'Docker', 'Redis'],
    github: 'https://github.com/0DA0',
    demo: null,
  },
  {
    id: 5,
    title: 'ML Image Classifier',
    description: 'TensorFlow ve CNN kullanılarak geliştirilmiş görüntü sınıflandırma modeli. Jupyter Notebook ile analiz.',
    technologies: ['Python', 'TensorFlow', 'CNN', 'Jupyter'],
    github: 'https://github.com/0DA0',
    demo: null,
  },
  {
    id: 6,
    title: 'Android Mobile App',
    description: 'Java ile geliştirilmiş Android uygulaması. Material Design prensipleriyle tasarlanmış modern arayüz.',
    technologies: ['Java', 'Android', 'Firebase'],
    github: 'https://github.com/0DA0',
    demo: '#',
  },
];

export default function ProjectsPage() {
  return (
    <>
      <style>{`
        .projects { min-height: 100vh; padding: 140px 0 4rem; }
        .projects-header { text-align: center; margin-bottom: 4rem; }
        .projects-title {
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-family: var(--font-mono);
          animation: fadeInUp 0.6s ease both;
        }
        .projects-sub { margin-top: 0.8rem; animation: fadeInUp 0.6s 0.1s ease both; }
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.8rem;
        }
        .project-card {
          background: var(--bg-dark); border: 1px solid var(--dark-green);
          border-radius: 6px; padding: 1.8rem;
          transition: all 0.3s; display: flex; flex-direction: column;
          animation: fadeInUp 0.6s ease both;
        }
        .project-card:hover {
          transform: translateY(-4px); border-color: var(--neon-green);
          box-shadow: 0 12px 36px rgba(0,255,65,0.15);
        }
        .project-card h3 {
          color: var(--neon-green); font-size: 1.3rem;
          margin-bottom: 0.8rem; font-family: var(--font-mono);
        }
        .project-desc { color: var(--text-secondary); font-size: 0.9rem; line-height: 1.7; flex: 1; }
        .tech-list { display: flex; flex-wrap: wrap; gap: 0.5rem; margin: 1.2rem 0; }
        .tech-tag {
          padding: 0.28rem 0.7rem; font-size: 0.78rem; font-weight: 600;
          border: 1px solid var(--dark-green); color: var(--neon-green);
          background: rgba(0,255,65,0.05); border-radius: 2px;
          font-family: var(--font-mono);
        }
        .project-links { display: flex; gap: 0.8rem; margin-top: auto; padding-top: 1rem; }
        .plink {
          flex: 1; padding: 0.65rem 1rem; text-align: center;
          border: 2px solid; border-radius: 2px; font-size: 0.85rem; font-weight: 600;
          font-family: var(--font-mono); transition: all 0.3s;
          position: relative; overflow: hidden;
        }
        .plink::before {
          content: ''; position: absolute; inset: 0;
          transform: translateX(-100%); transition: transform 0.3s; z-index: -1;
        }
        .plink.demo { border-color: var(--neon-green); color: var(--neon-green); }
        .plink.demo::before { background: var(--neon-green); }
        .plink.demo:hover { color: var(--bg-black); box-shadow: 0 0 14px var(--neon-green); }
        .plink.demo:hover::before { transform: translateX(0); }
        .plink.gh { border-color: var(--accent-cyan); color: var(--accent-cyan); }
        .plink.gh::before { background: var(--accent-cyan); }
        .plink.gh:hover { color: var(--bg-black); box-shadow: 0 0 14px var(--accent-cyan); }
        .plink.gh:hover::before { transform: translateX(0); }
        .plink.disabled { border-color: var(--text-dim); color: var(--text-dim); cursor: not-allowed; opacity: 0.5; }

        @media (max-width: 700px) { .projects-grid { grid-template-columns: 1fr; } }
        @media (max-width: 480px) { .projects { padding-top: 100px; } .project-links { flex-direction: column; } }
      `}</style>

      <div className="projects">
        <div className="container">
          <div className="projects-header">
            <h1 className="projects-title terminal-prompt">projelerim.json</h1>
            <p className="projects-sub code-comment">// Geliştirdiğim projeler ve uygulamalar</p>
          </div>

          <div className="projects-grid">
            {projects.map((p, i) => (
              <article
                key={p.id}
                className="project-card"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <h3>{p.title}</h3>
                <p className="project-desc">{p.description}</p>
                <div className="tech-list">
                  {p.technologies.map(t => <span key={t} className="tech-tag">{t}</span>)}
                </div>
                <div className="project-links">
                  {p.demo ? (
                    <a href={p.demo} className="plink demo" target="_blank" rel="noopener noreferrer">Demo</a>
                  ) : (
                    <span className="plink disabled">Demo Yok</span>
                  )}
                  <a href={p.github} className="plink gh" target="_blank" rel="noopener noreferrer">GitHub</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
