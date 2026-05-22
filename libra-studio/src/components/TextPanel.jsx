import { useState } from 'react';
import { useLP } from '../context/LPContent';

const LF = { amber: '#F7A810', black: '#000', mono: '"IBM Plex Mono", monospace' };

function Field({ field }) {
  const lp = useLP();
  const val = lp[field.key] ?? '';
  const onChange = v => lp.setToken(field.key, v);

  if (field.multiline) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <label style={{ fontSize: 9, letterSpacing: '0.16em', color: LF.amber, textTransform: 'uppercase' }}>{field.label}</label>
        <textarea
          value={val}
          onChange={e => onChange(e.target.value)}
          rows={3}
          style={{ border: '1px solid rgba(0,0,0,0.15)', padding: '8px 10px', fontSize: 12, fontFamily: LF.mono, background: '#fff', resize: 'vertical', outline: 'none', lineHeight: 1.4 }}
        />
      </div>
    );
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <label style={{ fontSize: 9, letterSpacing: '0.16em', color: LF.amber, textTransform: 'uppercase' }}>{field.label}</label>
      <input
        type="text"
        value={val}
        onChange={e => onChange(e.target.value)}
        style={{ border: '1px solid rgba(0,0,0,0.15)', padding: '8px 10px', fontSize: 12, fontFamily: LF.mono, background: '#fff', outline: 'none', height: 34 }}
      />
    </div>
  );
}

// Global brand fields always shown
const BRAND_FIELDS = [
  { key: 'brand', label: 'Marca' }, { key: 'monogram', label: 'Monograma' },
  { key: 'handle', label: '@ handle' }, { key: 'site', label: 'Sitio' },
  { key: 'edition', label: 'Edición #' }, { key: 'chapter', label: 'Chapter' },
  { key: 'designer', label: 'Diseñador' }, { key: 'date', label: 'Fecha' },
];

function Section({ title, fields, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ width: '100%', textAlign: 'left', background: open ? 'rgba(247,168,16,0.1)' : 'transparent', border: 'none', padding: '10px 14px', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: LF.mono, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: LF.black }}
      >
        <span>{title}</span>
        <span style={{ opacity: 0.5 }}>{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {fields.map(f => <Field key={f.key} field={f} />)}
        </div>
      )}
    </div>
  );
}

export default function TextPanel({ templateMeta }) {
  return (
    <div style={{ fontFamily: LF.mono, overflowY: 'auto', flex: 1, minHeight: 0 }}>
      {templateMeta && <Section title={`${templateMeta.label}`} fields={templateMeta.fields} />}
      <Section title="Marca / Edición" fields={BRAND_FIELDS} defaultOpen={false} />
    </div>
  );
}
