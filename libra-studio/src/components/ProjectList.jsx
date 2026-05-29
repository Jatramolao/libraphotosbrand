import { useState } from 'react';
import { getProjects, createProject, saveProjectMeta, deleteProjectMeta, deleteProjectPhotos } from '../lib/storage';

const LF = { amber: '#F7A810', black: '#000', white: '#fff', mono: '"IBM Plex Mono", monospace', display: '"Archivo Black", sans-serif' };

export default function ProjectList({ onOpen }) {
  const [projects, setProjects] = useState(getProjects);
  const [newName, setNewName] = useState('');
  const [creating, setCreating] = useState(false);
  const [renamingId, setRenamingId] = useState(null);
  const [renameValue, setRenameValue] = useState('');

  const refresh = () => setProjects(getProjects());

  const handleCreate = () => {
    const name = newName.trim() || `Proyecto ${new Date().toLocaleDateString('es-CL')}`;
    const p = createProject(name);
    saveProjectMeta(p);
    refresh();
    setNewName('');
    setCreating(false);
    onOpen(p);
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!confirm('¿Eliminar este proyecto y todas sus fotos?')) return;
    deleteProjectMeta(id);
    await deleteProjectPhotos(id);
    refresh();
  };

  const startRename = (p, e) => {
    e.stopPropagation();
    setRenamingId(p.id);
    setRenameValue(p.name);
  };

  const confirmRename = (p) => {
    const name = renameValue.trim();
    if (name && name !== p.name) {
      saveProjectMeta({ ...p, name, updatedAt: Date.now() });
      refresh();
    }
    setRenamingId(null);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f0eee9', fontFamily: LF.mono }}>
      {/* Header */}
      <div style={{ padding: '28px 40px', background: LF.black, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
            style={{ flex: 1, height: 42, padding: '0 14px', border: `1px solid ${LF.black}`, background: '#fff', fontSize: 13, letterSpacing: '0.04em', outline: 'none', fontFamily: LF.mono }}
          />
          <button onClick={handleCreate} style={{ background: LF.black, color: LF.amber, border: 'none', padding: '12px 20px', fontFamily: LF.mono, fontSize: 11, letterSpacing: '0.14em', cursor: 'pointer' }}>CREAR ▸</button>
          <button onClick={() => setCreating(false)} style={{ background: 'transparent', color: LF.black, border: `1px solid rgba(0,0,0,0.3)`, padding: '12px 16px', fontFamily: LF.mono, fontSize: 11, cursor: 'pointer' }}>✕</button>
        </div>
      )}

      {/* Project list */}
      <div style={{ padding: '32px 40px', maxWidth: 760, margin: '0 auto' }}>
        {projects.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'rgba(0,0,0,0.35)', fontSize: 12, letterSpacing: '0.14em' }}>
            <div style={{ fontFamily: LF.display, fontSize: 40, marginBottom: 12, opacity: 0.3 }}>LP</div>
            NO HAY PROYECTOS · CREA UNO PARA EMPEZAR
          </div>
        ) : projects.map(p => (
          <div
            key={p.id}
            onClick={() => renamingId !== p.id && onOpen(p)}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 22px', borderBottom: '1px solid rgba(0,0,0,0.1)', cursor: renamingId === p.id ? 'default' : 'pointer' }}
            onMouseEnter={e => renamingId !== p.id && (e.currentTarget.style.background = 'rgba(247,168,16,0.08)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              {renamingId === p.id ? (
                <input
                  autoFocus
                  value={renameValue}
                  onChange={e => setRenameValue(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') confirmRename(p); if (e.key === 'Escape') setRenamingId(null); }}
                  onBlur={() => confirmRename(p)}
                  onClick={e => e.stopPropagation()}
                  style={{ fontSize: 15, fontFamily: LF.mono, border: `1px solid ${LF.amber}`, padding: '4px 8px', outline: 'none', background: 'rgba(247,168,16,0.06)', width: '100%', maxWidth: 360 }}
                />
              ) : (
                <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: '0.02em', color: LF.black }}>{p.name}</div>
              )}
              <div style={{ fontSize: 10, color: 'rgba(0,0,0,0.4)', letterSpacing: '0.14em', marginTop: 4 }}>
                {new Date(p.updatedAt).toLocaleDateString('es-CL', { day: '2-digit', month: '2-digit', year: 'numeric' })}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexShrink: 0, marginLeft: 16 }}>
              {renamingId !== p.id && <span style={{ fontSize: 11, color: LF.amber, letterSpacing: '0.14em' }}>ABRIR ▸</span>}
              <button
                onClick={e => startRename(p, e)}
                title="Renombrar"
                style={{ background: 'transparent', border: 'none', color: 'rgba(0,0,0,0.3)', fontSize: 13, padding: '4px 8px', cursor: 'pointer', lineHeight: 1 }}
              >✎</button>
              <button
                onClick={e => handleDelete(p.id, e)}
                title="Eliminar proyecto"
                style={{ background: 'transparent', border: 'none', color: 'rgba(0,0,0,0.3)', fontSize: 16, padding: '4px 8px', cursor: 'pointer', lineHeight: 1 }}
              >×</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
