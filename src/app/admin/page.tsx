'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Project {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  github: string;
  demo: string;
  order: number;
}

const emptyForm = { title: '', description: '', technologies: '', github: '', demo: '', order: 99 };

export default function AdminPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      setProjects(await res.json());
    } catch { showMsg('err', 'Projeler yüklenemedi'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchProjects(); }, []);

  const showMsg = (type: 'ok' | 'err', text: string) => {
    setMsg({ type, text });
    setTimeout(() => setMsg(null), 4000);
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const openNew = () => { setForm(emptyForm); setEditingId(null); setShowForm(true); };

  const openEdit = (p: Project) => {
    setForm({ title: p.title, description: p.description, technologies: p.technologies.join(', '), github: p.github, demo: p.demo, order: p.order });
    setEditingId(p._id);
    setShowForm(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const body = { ...form, technologies: form.technologies.split(',').map(t => t.trim()).filter(Boolean) };
    try {
      const url = editingId ? `/api/projects/${editingId}` : '/api/projects';
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      if (res.ok) {
        showMsg('ok', editingId ? 'Proje güncellendi ✅' : 'Proje eklendi ✅');
        setShowForm(false); setForm(emptyForm); setEditingId(null); fetchProjects();
      } else {
        const data = await res.json();
        showMsg('err', data.message || 'Hata oluştu');
      }
    } catch { showMsg('err', 'Sunucu hatası'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`"${title}" projesini silmek istediğinize emin misiniz?`)) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      if (res.ok) { showMsg('ok', 'Proje silindi ✅'); fetchProjects(); }
      else showMsg('err', 'Silinemedi');
    } catch { showMsg('err', 'Sunucu hatası'); }
  };

  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        :root {
          --neon-green: #00ff41; --accent-cyan: #00ffff; --accent-red: #ff3864;
          --dark-green: #003d1a; --bg-black: #080808; --bg-dark: #0f0f0f; --bg-darker: #0a0a0a;
          --text-secondary: #b8d7a3; --text-dim: #5a7a5a; --font-mono: 'JetBrains Mono', monospace;
        }
        body { background: var(--bg-black); color: var(--text-secondary); font-family: var(--font-mono); }
        @keyframes fadeInUp { from { opacity:0; transform:translateY(16px);} to { opacity:1; transform:translateY(0);} }
        .admin { min-height: 100vh; background: var(--bg-black); }
        .admin-header {
          background: var(--bg-darker); border-bottom: 1px solid var(--dark-green);
          padding: 1rem 2rem; display: flex; align-items: center; justify-content: space-between;
          position: sticky; top: 0; z-index: 100;
        }
        .admin-header h1 { font-size: 1.1rem; color: var(--neon-green); }
        .admin-header p { font-size: 0.8rem; color: var(--text-dim); margin-top: 2px; }
        .logout-btn {
          padding: 0.5rem 1.2rem; font-family: var(--font-mono); font-size: 0.85rem;
          background: transparent; border: 1px solid var(--accent-red); color: var(--accent-red);
          border-radius: 4px; cursor: pointer; transition: all 0.2s;
        }
        .logout-btn:hover { background: var(--accent-red); color: white; }
        .admin-body { max-width: 1000px; margin: 0 auto; padding: 2rem; }
        .section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; }
        .section-header h2 { font-size: 1.3rem; color: var(--neon-green); }
        .add-btn {
          padding: 0.65rem 1.4rem; font-family: var(--font-mono); font-size: 0.88rem;
          background: transparent; border: 2px solid var(--neon-green); color: var(--neon-green);
          border-radius: 4px; cursor: pointer; transition: all 0.3s;
        }
        .add-btn:hover { background: var(--neon-green); color: var(--bg-black); }
        .alert { padding: 0.9rem 1.2rem; border-radius: 4px; margin-bottom: 1.5rem; font-size: 0.9rem; animation: fadeInUp 0.3s ease both; }
        .alert-ok { background: rgba(0,255,65,0.08); border-left: 3px solid var(--neon-green); color: var(--neon-green); }
        .alert-err { background: rgba(255,56,100,0.08); border-left: 3px solid var(--accent-red); color: var(--accent-red); }
        .modal-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.85);
          display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 1rem;
        }
        .modal {
          background: var(--bg-dark); border: 1px solid var(--dark-green);
          border-radius: 8px; padding: 2rem; width: 100%; max-width: 600px;
          max-height: 90vh; overflow-y: auto; box-shadow: 0 0 60px rgba(0,255,65,0.1);
        }
        .modal h3 { color: var(--neon-green); margin-bottom: 1.5rem; }
        .form-grid { display: flex; flex-direction: column; gap: 1.2rem; }
        .form-group { display: flex; flex-direction: column; gap: 0.4rem; }
        .form-group label { font-size: 0.85rem; color: var(--accent-cyan); }
        .form-group input, .form-group textarea {
          padding: 0.75rem 1rem; background: var(--bg-darker);
          border: 1.5px solid var(--dark-green); color: var(--text-secondary);
          font-family: var(--font-mono); font-size: 0.9rem; border-radius: 4px; outline: none;
          transition: border-color 0.3s;
        }
        .form-group input:focus, .form-group textarea:focus { border-color: var(--neon-green); }
        .form-group textarea { resize: vertical; min-height: 90px; }
        .form-hint { font-size: 0.75rem; color: var(--text-dim); }
        .form-actions { display: flex; gap: 1rem; margin-top: 0.5rem; }
        .save-btn {
          flex: 1; padding: 0.85rem; font-family: var(--font-mono); font-size: 0.9rem; font-weight: 700;
          background: transparent; border: 2px solid var(--neon-green); color: var(--neon-green);
          border-radius: 4px; cursor: pointer; transition: all 0.3s;
        }
        .save-btn:hover:not(:disabled) { background: var(--neon-green); color: var(--bg-black); }
        .save-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .cancel-btn {
          padding: 0.85rem 1.5rem; font-family: var(--font-mono); font-size: 0.9rem;
          background: transparent; border: 1.5px solid var(--dark-green); color: var(--text-dim);
          border-radius: 4px; cursor: pointer; transition: all 0.3s;
        }
        .cancel-btn:hover { border-color: var(--accent-red); color: var(--accent-red); }
        .projects-table { width: 100%; border-collapse: collapse; }
        .projects-table th {
          text-align: left; padding: 0.75rem 1rem; font-size: 0.8rem;
          color: var(--accent-cyan); border-bottom: 1px solid var(--dark-green); background: var(--bg-darker);
        }
        .projects-table td { padding: 1rem; border-bottom: 1px solid rgba(0,61,26,0.5); vertical-align: top; }
        .projects-table tr:hover td { background: rgba(0,255,65,0.02); }
        .proj-title { color: var(--neon-green); font-weight: 700; font-size: 0.95rem; }
        .proj-desc { color: var(--text-secondary); font-size: 0.82rem; line-height: 1.5; max-width: 300px; }
        .tech-chips { display: flex; flex-wrap: wrap; gap: 0.3rem; margin-top: 0.4rem; }
        .chip { padding: 0.2rem 0.5rem; font-size: 0.72rem; border: 1px solid var(--dark-green); color: var(--text-dim); border-radius: 2px; }
        .actions { display: flex; gap: 0.5rem; }
        .edit-btn {
          padding: 0.4rem 0.9rem; font-family: var(--font-mono); font-size: 0.78rem;
          background: transparent; border: 1px solid var(--accent-cyan); color: var(--accent-cyan);
          border-radius: 3px; cursor: pointer; transition: all 0.2s;
        }
        .edit-btn:hover { background: var(--accent-cyan); color: var(--bg-black); }
        .del-btn {
          padding: 0.4rem 0.9rem; font-family: var(--font-mono); font-size: 0.78rem;
          background: transparent; border: 1px solid var(--accent-red); color: var(--accent-red);
          border-radius: 3px; cursor: pointer; transition: all 0.2s;
        }
        .del-btn:hover { background: var(--accent-red); color: white; }
        .empty-state { text-align: center; padding: 4rem 2rem; color: var(--text-dim); }
        .empty-state p { margin-bottom: 1rem; }
        .loading-state { text-align: center; padding: 3rem; color: var(--text-dim); }
      `}</style>

      <div className="admin">
        <div className="admin-header">
          <div>
            <h1>// Portfolio Admin</h1>
            <p>Yönetim Paneli</p>
          </div>
          <button className="logout-btn" onClick={handleLogout}>Çıkış Yap</button>
        </div>

        <div className="admin-body">
          {msg && <div className={`alert ${msg.type === 'ok' ? 'alert-ok' : 'alert-err'}`}>{msg.text}</div>}

          <div className="section-header">
            <h2>Projeler ({projects.length})</h2>
            <button className="add-btn" onClick={openNew}>+ Yeni Proje</button>
          </div>

          {loading ? (
            <div className="loading-state">// Yükleniyor...</div>
          ) : projects.length === 0 ? (
            <div className="empty-state">
              <p>// Henüz proje yok</p>
              <button className="add-btn" onClick={openNew}>İlk projeyi ekle</button>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table className="projects-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Proje</th>
                    <th>Teknolojiler</th>
                    <th>İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((p, i) => (
                    <tr key={p._id}>
                      <td style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>{i + 1}</td>
                      <td>
                        <div className="proj-title">{p.title}</div>
                        <div className="proj-desc">{p.description.slice(0, 100)}{p.description.length > 100 ? '...' : ''}</div>
                      </td>
                      <td>
                        <div className="tech-chips">
                          {p.technologies.map(t => <span key={t} className="chip">{t}</span>)}
                        </div>
                      </td>
                      <td>
                        <div className="actions">
                          <button className="edit-btn" onClick={() => openEdit(p)}>Düzenle</button>
                          <button className="del-btn" onClick={() => handleDelete(p._id, p.title)}>Sil</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) setShowForm(false); }}>
          <div className="modal">
            <h3>{editingId ? '// Proje Düzenle' : '// Yeni Proje'}</h3>
            <form className="form-grid" onSubmit={handleSave}>
              <div className="form-group">
                <label>Başlık *</label>
                <input type="text" placeholder="E-Commerce Platform" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required disabled={saving} />
              </div>
              <div className="form-group">
                <label>Açıklama *</label>
                <textarea placeholder="Proje hakkında kısa açıklama..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required disabled={saving} />
              </div>
              <div className="form-group">
                <label>Teknolojiler</label>
                <input type="text" placeholder="React, Node.js, MongoDB" value={form.technologies} onChange={e => setForm({ ...form, technologies: e.target.value })} disabled={saving} />
                <span className="form-hint">// Virgülle ayırın</span>
              </div>
              <div className="form-group">
                <label>GitHub URL</label>
                <input type="url" placeholder="https://github.com/..." value={form.github} onChange={e => setForm({ ...form, github: e.target.value })} disabled={saving} />
              </div>
              <div className="form-group">
                <label>Demo URL (opsiyonel)</label>
                <input type="url" placeholder="https://..." value={form.demo} onChange={e => setForm({ ...form, demo: e.target.value })} disabled={saving} />
              </div>
              <div className="form-group">
                <label>Sıralama</label>
                <input type="number" placeholder="1" value={form.order} onChange={e => setForm({ ...form, order: Number(e.target.value) })} disabled={saving} />
                <span className="form-hint">// Küçük numara = önce gösterilir</span>
              </div>
              <div className="form-actions">
                <button type="submit" className="save-btn" disabled={saving}>{saving ? 'Kaydediliyor...' : (editingId ? 'Güncelle' : 'Ekle')}</button>
                <button type="button" className="cancel-btn" onClick={() => setShowForm(false)} disabled={saving}>İptal</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
