import { useState } from 'react';
import { TEMPLATES, CATEGORY_LABELS, CATEGORIES } from '../data/templates-meta';
import { TEMPLATE_COMPONENTS } from '../templates/index';
import ExportAllModal from './ExportAllModal';

const LF = { amber: '#F7A810', black: '#000', white: '#fff', mono: '"IBM Plex Mono", monospace', display: '"Archivo Black", sans-serif' };

// Aspect ratios for preview containers
const ASPECT = { portrait: { w: 160, h: 200 }, square: { w: 160, h: 160 }, story: { w: 90, h: 160 } };

export default function Gallery({ project, onSelectTemplate, onBack, onBrandSettings }) {
  const [filter, setFilter] = useState('all');
  const [showExportAll, setShowExportAll] = useState(false);
  const cats = ['all', ...CATEGORIES];
  const visible = filter === 'all' ? TEMPLATES : TEMPLATES.filter(t => t.category === filter);

  return (
    <div style={{ minHeight: '100vh', background: '#f0eee9', fontFamily: LF.mono }}>
      {/* Header */}
      <div style={{ padding: '16px 32px', background: LF.black, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', fontSize: 18, padding: '4px 8px', cursor: 'pointer' }}>←</button>
          <div>
            <div style={{ fontFamily: LF.display, fontSize: 18, color: LF.white, letterSpacing: '-0.03em' }}>
              {project.name}
            </div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.18em', marginTop: 2 }}>SELECCIONA UNA PLANTILLA</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => setShowExportAll(true)} style={{ background: LF.amber, color: LF.black, border: 'none', padding: '8px 14px', fontFamily: LF.mono, fontSize: 10, letterSpacing: '0.14em', cursor: 'pointer', fontWeight: 700 }}>
            ↓ EXPORTAR TODO
          </button>
          <button onClick={onBrandSettings} style={{ background: 'transparent', border: `1px solid rgba(255,255,255,0.3)`, color: LF.amber, padding: '8px 14px', fontFamily: LF.mono, fontSize: 10, letterSpacing: '0.14em', cursor: 'pointer' }}>
            ⚙ SESIÓN
          </button>
        </div>
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 0, padding: '0 32px', borderBottom: `1px solid rgba(0,0,0,0.1)`, background: '#f0eee9' }}>
        {cats.map(c => (
          <button key={c} onClick={() => setFilter(c)} style={{
            padding: '12px 16px', border: 'none', background: 'transparent',
            fontFamily: LF.mono, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase',
            color: filter === c ? LF.black : 'rgba(0,0,0,0.45)',
            borderBottom: filter === c ? `2px solid ${LF.amber}` : '2px solid transparent',
            cursor: 'pointer', marginBottom: -1,
          }}>
            {c === 'all' ? 'Todas' : CATEGORY_LABELS[c] || c}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div style={{ padding: '32px', display: 'flex', flexWrap: 'wrap', gap: 28 }}>
        {visible.map(tmpl => {
          const Component = TEMPLATE_COMPONENTS[tmpl.id];
          const asp = ASPECT[tmpl.defaultAspect] || ASPECT.portrait;
          const nativeW = tmpl.defaultAspect === 'story' ? 405 : tmpl.defaultAspect === 'square' ? 540 : 540;
          const nativeH = tmpl.defaultAspect === 'story' ? 720 : tmpl.defaultAspect === 'square' ? 540 : 675;
          const scale = asp.w / nativeW;

          return (
            <div key={tmpl.id} onClick={() => onSelectTemplate(tmpl.id)} style={{ cursor: 'pointer' }}>
              <div style={{ width: asp.w, height: asp.h, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.1)', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <div style={{ width: nativeW, height: nativeH, transform: `scale(${scale})`, transformOrigin: 'top left', pointerEvents: 'none' }}>
                  {Component && <Component w={nativeW} h={nativeH} />}
                </div>
              </div>
              <div style={{ marginTop: 8, fontSize: 10, letterSpacing: '0.1em', color: 'rgba(0,0,0,0.6)', textTransform: 'uppercase', maxWidth: asp.w }}>{tmpl.label}</div>
            </div>
          );
        })}
      </div>

      {showExportAll && <ExportAllModal project={project} onClose={() => setShowExportAll(false)} />}
    </div>
  );
}
