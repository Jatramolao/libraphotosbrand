import { useLP } from '../context/LPContent';

const LF = { amber: '#F7A810', black: '#000', white: '#fff', mono: '"IBM Plex Mono", monospace', display: '"Archivo Black", sans-serif' };

const BRAND_FIELDS = [
  { key: 'brand', label: 'Nombre de marca' }, { key: 'monogram', label: 'Monograma (2 letras)' },
  { key: 'handle', label: '@ Instagram' }, { key: 'site', label: 'Sitio web' },
];
const EDITION_FIELDS = [
  { key: 'edition', label: 'Edición #' }, { key: 'chapter', label: 'Chapter' },
  { key: 'designer', label: 'Diseñador' }, { key: 'collection', label: 'Colección' },
  { key: 'location', label: 'Locación' }, { key: 'date', label: 'Fecha' },
  { key: 'hour', label: 'Hora' }, { key: 'countdownDays', label: 'Countdown días' },
];

function SettingField({ field }) {
  const lp = useLP();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ fontSize: 9, letterSpacing: '0.16em', color: LF.amber, textTransform: 'uppercase' }}>{field.label}</label>
      <input
        type="text"
        value={lp[field.key] ?? ''}
        onChange={e => lp.setToken(field.key, e.target.value)}
        style={{ border: `1px solid rgba(255,255,255,0.2)`, padding: '10px 12px', fontSize: 13, fontFamily: LF.mono, background: 'rgba(255,255,255,0.06)', color: LF.white, outline: 'none', letterSpacing: '0.04em' }}
      />
    </div>
  );
}

export default function BrandSettings({ onClose }) {
  return (
    <div onClick={e => e.target === e.currentTarget && onClose()} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ background: '#111', color: LF.white, border: `2px solid ${LF.amber}`, width: 480, maxHeight: '90vh', overflowY: 'auto', fontFamily: LF.mono }}>
        <div style={{ padding: '18px 22px', borderBottom: `1px solid rgba(255,255,255,0.1)`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: LF.display, fontSize: 20, letterSpacing: '-0.03em' }}>AJUSTES <span style={{ color: LF.amber }}>MARCA</span></div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', fontSize: 22, cursor: 'pointer', lineHeight: 1 }}>×</button>
        </div>
        <div style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ fontSize: 9, color: LF.amber, letterSpacing: '0.18em', marginBottom: 4 }}>MARCA</div>
          {BRAND_FIELDS.map(f => <SettingField key={f.key} field={f} />)}
          <div style={{ fontSize: 9, color: LF.amber, letterSpacing: '0.18em', marginTop: 8 }}>EDICIÓN ACTUAL</div>
          {EDITION_FIELDS.map(f => <SettingField key={f.key} field={f} />)}
        </div>
        <div style={{ padding: '14px 22px', borderTop: `1px solid rgba(255,255,255,0.1)` }}>
          <button onClick={onClose} style={{ width: '100%', background: LF.amber, color: LF.black, border: 'none', padding: '14px', fontFamily: LF.display, fontSize: 16, letterSpacing: '-0.02em', cursor: 'pointer' }}>GUARDAR Y CERRAR</button>
        </div>
      </div>
    </div>
  );
}
