import { useRef, useState } from 'react';
import { TEMPLATES_BY_ID } from '../data/templates-meta';
import { TEMPLATE_COMPONENTS } from '../templates/index';
import { EXPORT_PRESETS, exportAsPng } from '../lib/export';
import TextPanel from './TextPanel';
import { useLP } from '../context/LPContent';

const LF = { amber: '#F7A810', black: '#000', white: '#fff', mono: '"IBM Plex Mono", monospace', display: '"Archivo Black", sans-serif' };

const SIZE = { portrait: { w: 540, h: 675 }, square: { w: 540, h: 540 }, story: { w: 405, h: 720 } };

export default function Editor({ templateId, project, onBack, onBrandSettings }) {
  const tmpl = TEMPLATES_BY_ID[templateId];
  const Component = TEMPLATE_COMPONENTS[templateId];
  const [aspect, setAspect] = useState(tmpl?.defaultAspect || 'portrait');
  const [exporting, setExporting] = useState(false);
  const [exportDone, setExportDone] = useState(false);
  const previewRef = useRef(null);
  const lp = useLP();

  const sz = SIZE[aspect] || SIZE.portrait;
  const preset = EXPORT_PRESETS[aspect] || EXPORT_PRESETS.portrait;

  const handleExport = async () => {
    if (!previewRef.current) return;
    setExporting(true);
    setExportDone(false);
    try {
      const fname = `lp_${templateId}_${project.name.replace(/\s+/g, '_').toLowerCase()}`;
      await exportAsPng(previewRef.current, preset, fname);
      setExportDone(true);
      setTimeout(() => setExportDone(false), 2500);
    } catch (e) {
      alert('Export failed: ' + e.message);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#f0eee9', fontFamily: LF.mono }}>
      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '12px 20px', background: LF.black, flexShrink: 0, borderBottom: `1px solid rgba(255,255,255,0.1)` }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', fontSize: 18, padding: '4px 8px', cursor: 'pointer' }}>←</button>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: LF.display, fontSize: 16, color: LF.white, letterSpacing: '-0.03em' }}>{tmpl?.label || templateId}</div>
          <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.14em', marginTop: 2 }}>{project.name}</div>
        </div>
        {/* Format selector */}
        <div style={{ display: 'flex', gap: 4 }}>
          {Object.entries(EXPORT_PRESETS).map(([key, p]) => (
            <button key={key} onClick={() => setAspect(key)} style={{
              background: aspect === key ? LF.amber : 'rgba(255,255,255,0.08)',
              color: aspect === key ? LF.black : 'rgba(255,255,255,0.7)',
              border: 'none', padding: '6px 12px', fontFamily: LF.mono,
              fontSize: 9, letterSpacing: '0.12em', cursor: 'pointer',
            }}>
              {p.label}
            </button>
          ))}
        </div>
        <button onClick={onBrandSettings} style={{ background: 'transparent', border: `1px solid rgba(255,255,255,0.2)`, color: LF.amber, padding: '8px 12px', fontFamily: LF.mono, fontSize: 9, letterSpacing: '0.14em', cursor: 'pointer' }}>⚙ MARCA</button>
      </div>

      {/* Body: sidebar + preview */}
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        {/* Left: text panel */}
        <div style={{ width: 280, borderRight: '1px solid rgba(0,0,0,0.12)', display: 'flex', flexDirection: 'column', background: '#faf9f7', overflowY: 'hidden' }}>
          <div style={{ padding: '12px 14px', borderBottom: '1px solid rgba(0,0,0,0.08)', fontSize: 9, letterSpacing: '0.16em', color: 'rgba(0,0,0,0.4)' }}>TEXTOS</div>
          <TextPanel templateMeta={tmpl} />
        </div>

        {/* Center: preview */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40, overflow: 'auto' }}>
          {Component ? (
            <div ref={previewRef} style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.18)', flexShrink: 0 }}>
              <Component w={sz.w} h={sz.h} />
            </div>
          ) : (
            <div style={{ color: 'rgba(0,0,0,0.3)', fontSize: 12, letterSpacing: '0.1em' }}>PLANTILLA NO ENCONTRADA: {templateId}</div>
          )}
        </div>
      </div>

      {/* Bottom: export bar */}
      <div style={{ padding: '14px 20px', background: LF.black, borderTop: `1px solid ${LF.amber}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em' }}>
          {preset.hint} · PNG
        </div>
        <button
          onClick={handleExport}
          disabled={exporting}
          style={{
            background: exportDone ? '#2a7a2a' : LF.amber,
            color: LF.black, border: 'none', padding: '12px 28px',
            fontFamily: LF.display, fontSize: 16, letterSpacing: '-0.02em',
            cursor: exporting ? 'wait' : 'pointer',
            transition: 'background 0.2s',
          }}
        >
          {exporting ? 'EXPORTANDO…' : exportDone ? '✓ DESCARGADO' : 'EXPORTAR PNG ↓'}
        </button>
      </div>
    </div>
  );
}
