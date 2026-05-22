import { useState } from 'react';
import { getProjects, createProject, saveProjectMeta, deleteProjectMeta, deleteProjectPhotos } from '../lib/storage';

const LF = { amber: '#F7A810', black: '#000', white: '#fff', mono: '"IBM Plex Mono", monospace', display: '"Archivo Black", sans-serif' };

export default function ProjectList({ onOpen }) {
  const [projects, setProjects] = useState(getProjects);
  const [newName, setNewName] = useState('');
  const [creating, setCreating] = useState(false);

  const handleCreate = () => {
    const name = newName.trim() || `Proyecto ${new Date().toLocaleDateString('es-CL')}`;
    const p = createProject(name);
    saveProjectMeta(p);
    setProjects(getProjects());
    setNewName('');
    setCreating(false);
    onOpen(p);
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!confirm('¿Eliminar este proyecto?')) return;
    deleteProjectMeta(id);
    await deleteProjectPhotos(id);
    setProjects(getProjects());
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f0eee9', fontFamily: LF.mono }}>
      {/* Header */}
      <div style={{ padding: '28px 40px', borderBottom: `2px solid ${LF.black}`, background: LF.black, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontFamily: LF.display, fontSize: 28, color: LF.white, letterSpacing: '-0.03em' }}>
            LIBRA PHOTOS <span style={{ color: LF.amber }}>STUDIO</span>
          </div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.18em', marginTop: 4 }}>SISTEMA DE PLANTILLAS INSTAGRAM</div>
        </div>
        <button
          onClick={() => setCreating(true)}
          style={{ background: LF.amber, color: LF.black, border: 'none', padding: '12px 20px', fontFamily: LF.display, fontSize: 14, letterSpacing: '-0.02em', cursor: 'pointer' }}
        >+ NUEVO PROYECTO</button>
      </div>

      {/* Create form */}
      {creating && (
        <div style={{ padding: '20px 40px', borderBottom: `1px solid ${LF.amber}`, background: 'rgba(247,168,16,0.06)', display: 'flex', gap: 12, alignItems: 'center' }}>
          <input
            autoFocus
            value={newName}
            onChange={e => setNewName(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleCreate(); if (e.key === 'Escape') setCreating(false); }}
            placeholder="Nombre del proyecto (ej: Drop Junio 2026)"
            style={{ flex: 1, height: 42, padding: '0 14px', border: `1px solid ${LF.black}`, background: '#fff', fontSize: 13, letterSpacing: '0.04em', outline: 'none' }}
          />
          <button onClick={handleCreate} style={{ background: LF.black, color: LF.amber, border: 'none', padding: '12px 20px', fontFamily: LF.mono, fontSize: 11, letterSpacing: '0.14em', cursor: 'pointer' }}>CREAR ▸</button>
          <button onClick={() => setCreating(false)} style={{ background: 'transparent', color: LF.black, border: `1px solid rgba(0,0,0,0.3)`, padding: '12px 16px', fontFamily: LF.mono, fontSize: 11, cursor: 'pointer' }}>✕</button>
        </div>
      )}

      {/* Project list */}
      <div style={{ padding: '32px 40px', maxWidth: 760, margin: '0 auto' }}>
        {projects.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'rgba(0,0,0,0.35)', fontSize: 12, letterSpacing: '0.14em' }}>
            <div style={{ fontSize: 40, marginBottom: 12, opacity: 0.3 }}>LP</div>
            NO HAY PROYECTOS · CREA UNO PARA EMPEZAR
          </div>
        ) : projects.map(p => (
          <div
            key={p.id}
            onClick={() => onOpen(p)}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 22px', borderBottom: '1px solid rgba(0,0,0,0.1)', cursor: 'pointer', transition: 'background 0.12s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(247,168,16,0.08)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <div>
              <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: '0.02em', color: LF.black }}>{p.name}</div>
              <div style={{ fontSize: 10, color: 'rgba(0,0,0,0.45)', letterSpacing: '0.14em', marginTop: 4 }}>
                {new Date(p.updatedAt).toLocaleDateString('es-CL', { day: '2-digit', month: '2-digit', year: 'numeric' })}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{ fontSize: 11, color: LF.amber, letterSpacing: '0.14em' }}>ABRIR ▸</span>
              <button
                onClick={e => handleDelete(p.id, e)}
                style={{ background: 'transparent', border: 'none', color: 'rgba(0,0,0,0.3)', fontSize: 16, lineHeight: 1, padding: '4px 8px', cursor: 'pointer' }}
                title="Eliminar proyecto"
              >×</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
