import { useRef, useState } from 'react';
import { TEMPLATES } from '../data/templates-meta';
import { TEMPLATE_COMPONENTS } from '../templates/index';
import { EXPORT_PRESETS, capturePng } from '../lib/export';

const LF = { amber: '#F7A810', black: '#000', white: '#fff', mono: '"IBM Plex Mono", monospace', display: '"Archivo Black", sans-serif' };
const SIZE = { portrait: { w: 540, h: 675 }, square: { w: 540, h: 540 }, story: { w: 405, h: 720 } };

function triggerDownload(dataUrl, filename) {
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export default function ExportAllModal({ project, onClose }) {
  const [phase, setPhase] = useState('ready'); // 'ready' | 'running' | 'done'
  const [current, setCurrent] = useState(0);
  const [results, setResults] = useState([]);
  const artboardRefs = useRef({});

  const handleExportAll = async () => {
    setPhase('running');
    setCurrent(0);
    const log = [];

    for (let i = 0; i < TEMPLATES.length; i++) {
      const tmpl = TEMPLATES[i];
      setCurrent(i + 1);
      const el = artboardRefs.current[tmpl.id];
      if (!el) { log.push({ id: tmpl.id, label: tmpl.label, ok: false }); continue; }

      const preset = EXPORT_PRESETS[tmpl.defaultAspect] || EXPORT_PRESETS.portrait;
      const slug = project.name.replace(/\s+/g, '_').toLowerCase();
      try {
        const dataUrl = await capturePng(el, preset);
        triggerDownload(dataUrl, `lp_${tmpl.id}_${slug}_${preset.w}x${preset.h}.png`);
        log.push({ id: tmpl.id, label: tmpl.label, ok: true });
        // Brief pause so the browser registers each download separately
        await new Promise(r => setTimeout(r, 400));
      } catch (e) {
        log.push({ id: tmpl.id, label: tmpl.label, ok: false, error: e.message });
      }
    }

    setResults(log);
    setPhase('done');
  };

  const ok = results.filter(r => r.ok).length;
  const fail = results.filter(r => !r.ok).length;

  return (
    <div
      onClick={e => e.target === e.currentTarget && phase !== 'running' && onClose()}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
    >
      <div style={{ background: '#111', border: `2px solid ${LF.amber}`, width: 480, maxHeight: '90vh', overflowY: 'auto', fontFamily: LF.mono, color: LF.white }}>
        {/* Header */}
        <div style={{ padding: '18px 22px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: LF.display, fontSize: 18, letterSpacing: '-0.03em' }}>
            EXPORTAR <span style={{ color: LF.amber }}>TODO</span>
          </div>
          {phase !== 'running' && (
            <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', fontSize: 22, cursor: 'pointer' }}>×</button>
          )}
        </div>

        <div style={{ padding: '20px 22px' }}>
          {/* Ready state */}
          {phase === 'ready' && (
            <>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, letterSpacing: '0.04em', marginBottom: 20 }}>
                Exportará <strong style={{ color: LF.amber }}>{TEMPLATES.length} plantillas</strong> como PNG 2× (1080px) con las fotos y textos del proyecto <strong style={{ color: LF.white }}>"{project.name}"</strong>.
              </p>
              <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, letterSpacing: '0.04em', marginBottom: 24 }}>
                El navegador descargará cada archivo individualmente. Si bloquea descargas múltiples, permitir desde la barra de direcciones.
              </p>
              <button
                onClick={handleExportAll}
                style={{ width: '100%', background: LF.amber, color: LF.black, border: 'none', padding: '16px', fontFamily: LF.display, fontSize: 18, letterSpacing: '-0.02em', cursor: 'pointer' }}
              >
                EXPORTAR {TEMPLATES.length} PLANTILLAS ↓
              </button>
            </>
          )}

          {/* Running state */}
          {phase === 'running' && (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ fontFamily: LF.display, fontSize: 48, color: LF.amber, letterSpacing: '-0.04em', lineHeight: 1 }}>
                {current}<span style={{ fontSize: 24, color: 'rgba(255,255,255,0.3)' }}>/{TEMPLATES.length}</span>
              </div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.18em', marginTop: 12 }}>
                EXPORTANDO · {TEMPLATES[current - 1]?.label}
              </div>
              {/* Progress bar */}
              <div style={{ margin: '20px 0 0', height: 3, background: 'rgba(255,255,255,0.1)' }}>
                <div style={{ height: '100%', background: LF.amber, width: `${(current / TEMPLATES.length) * 100}%`, transition: 'width 0.3s' }} />
              </div>
            </div>
          )}

          {/* Done state */}
          {phase === 'done' && (
            <>
              <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
                <div style={{ flex: 1, padding: '12px', background: 'rgba(255,255,255,0.04)', textAlign: 'center' }}>
                  <div style={{ fontFamily: LF.display, fontSize: 32, color: LF.amber }}>{ok}</div>
                  <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.16em', marginTop: 4 }}>EXPORTADAS</div>
                </div>
                {fail > 0 && (
                  <div style={{ flex: 1, padding: '12px', background: 'rgba(255,0,0,0.08)', textAlign: 'center' }}>
                    <div style={{ fontFamily: LF.display, fontSize: 32, color: '#ff4444' }}>{fail}</div>
                    <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.16em', marginTop: 4 }}>CON ERROR</div>
                  </div>
                )}
              </div>
              {/* Result list */}
              <div style={{ maxHeight: 220, overflowY: 'auto', marginBottom: 20 }}>
                {results.map(r => (
                  <div key={r.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0', borderBottom: '1px solid rgba(255,255,255,0.06)', fontSize: 10, letterSpacing: '0.06em' }}>
                    <span style={{ color: r.ok ? LF.amber : '#ff4444', fontSize: 14, lineHeight: 1 }}>{r.ok ? '✓' : '×'}</span>
                    <span style={{ color: r.ok ? LF.white : 'rgba(255,255,255,0.4)' }}>{r.label}</span>
                    {!r.ok && r.error && <span style={{ color: '#ff4444', fontSize: 9, marginLeft: 'auto' }}>{r.error}</span>}
                  </div>
                ))}
              </div>
              <button onClick={onClose} style={{ width: '100%', background: LF.amber, color: LF.black, border: 'none', padding: '14px', fontFamily: LF.display, fontSize: 16, letterSpacing: '-0.02em', cursor: 'pointer' }}>
                CERRAR
              </button>
            </>
          )}
        </div>
      </div>

      {/* Offscreen artboards — rendered off-viewport, fully visible to html-to-image */}
      <div style={{ position: 'fixed', left: '-9999px', top: 0, pointerEvents: 'none' }}>
        {TEMPLATES.map(tmpl => {
          const Component = TEMPLATE_COMPONENTS[tmpl.id];
          const sz = SIZE[tmpl.defaultAspect] || SIZE.portrait;
          return (
            <div key={tmpl.id} ref={el => { artboardRefs.current[tmpl.id] = el; }}>
              {Component && <Component w={sz.w} h={sz.h} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
