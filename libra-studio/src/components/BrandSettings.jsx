import { useState } from 'react';
import { useLP } from '../context/LPContent';

const LF = { amber: '#F7A810', black: '#000', white: '#fff', mono: '"IBM Plex Mono", monospace', display: '"Archivo Black", sans-serif' };

const SECTIONS = [
  {
    id: 'brand',
    label: 'MARCA',
    note: 'Aparece en todas las plantillas de todos los proyectos.',
    fields: [
      { key: 'brand', label: 'Nombre de marca' },
      { key: 'monogram', label: 'Monograma (2 letras)' },
      { key: 'handle', label: '@ Instagram' },
      { key: 'site', label: 'Sitio web' },
    ],
  },
  {
    id: 'session',
    label: 'SESIÓN ACTUAL',
    note: 'Campos compartidos por todas las plantillas de este proyecto. Edita aquí una vez y se propaga a todo.',
    fields: [
      { key: 'edition', label: 'Edición #' },
      { key: 'chapter', label: 'Chapter / Nombre' },
      { key: 'designer', label: 'Diseñador' },
      { key: 'collection', label: 'Colección' },
      { key: 'location', label: 'Locación' },
      { key: 'date', label: 'Fecha (ej: 14.06.26)' },
      { key: 'hour', label: 'Hora (ej: 20:00 CLT)' },
      { key: 'countdownDays', label: 'Días countdown' },
    ],
  },
  {
    id: 'camera',
    label: 'DATOS TÉCNICOS',
    note: 'Metadatos de cámara usados en plantillas de archivo y metadata card.',
    fields: [
      { key: 't01TechMeta', label: 'Strip técnico (T01)' },
      { key: 't02CamValue', label: 'Cámara + lente' },
      { key: 't02ExpValue', label: 'Exposición' },
      { key: 't02LocValue', label: 'Locación + hora exacta' },
    ],
  },
];

function Field({ fieldKey, label }) {
  const lp = useLP();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <label style={{ fontSize: 9, letterSpacing: '0.16em', color: LF.amber, textTransform: 'uppercase' }}>{label}</label>
      <input
        type="text"
        value={lp[fieldKey] ?? ''}
        onChange={e => lp.setToken(fieldKey, e.target.value)}
        style={{ border: '1px solid rgba(255,255,255,0.15)', padding: '9px 12px', fontSize: 12, fontFamily: LF.mono, background: 'rgba(255,255,255,0.05)', color: LF.white, outline: 'none', letterSpacing: '0.04em' }}
      />
    </div>
  );
}

export default function BrandSettings({ onClose }) {
  const [activeTab, setActiveTab] = useState('session');

  const active = SECTIONS.find(s => s.id === activeTab);

  return (
    <div
      onClick={e => e.target === e.currentTarget && onClose()}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
    >
      <div style={{ background: '#111', color: LF.white, border: `2px solid ${LF.amber}`, width: 500, maxHeight: '90vh', display: 'flex', flexDirection: 'column', fontFamily: LF.mono }}>
        {/* Header */}
        <div style={{ padding: '18px 22px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
          <div style={{ fontFamily: LF.display, fontSize: 18, letterSpacing: '-0.03em' }}>
            AJUSTES <span style={{ color: LF.amber }}>DE PROYECTO</span>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', fontSize: 22, cursor: 'pointer', lineHeight: 1 }}>×</button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.1)', flexShrink: 0 }}>
          {SECTIONS.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveTab(s.id)}
              style={{
                flex: 1, padding: '11px 8px', border: 'none', background: 'transparent',
                fontFamily: LF.mono, fontSize: 9, letterSpacing: '0.14em', cursor: 'pointer',
                color: activeTab === s.id ? LF.amber : 'rgba(255,255,255,0.4)',
                borderBottom: activeTab === s.id ? `2px solid ${LF.amber}` : '2px solid transparent',
                marginBottom: -1,
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Fields */}
        <div style={{ overflowY: 'auto', flex: 1 }}>
          <div style={{ padding: '16px 22px 8px' }}>
            <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.06em', lineHeight: 1.6, marginBottom: 16 }}>
              {active?.note}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {active?.fields.map(f => <Field key={f.key} fieldKey={f.key} label={f.label} />)}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '14px 22px', borderTop: '1px solid rgba(255,255,255,0.1)', flexShrink: 0 }}>
          <button
            onClick={onClose}
            style={{ width: '100%', background: LF.amber, color: LF.black, border: 'none', padding: '13px', fontFamily: LF.display, fontSize: 16, letterSpacing: '-0.02em', cursor: 'pointer' }}
          >
            GUARDAR Y CERRAR
          </button>
        </div>
      </div>
    </div>
  );
}
