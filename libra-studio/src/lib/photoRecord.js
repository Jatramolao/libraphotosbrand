// Registro de foto por slot.
// Formato antiguo: string (dataUrl). Formato nuevo: { url, scale, x, y }
// donde scale ∈ [1, 3] y x/y son % de translate CSS (limitados según scale
// para que la imagen siempre cubra el slot).
export const MIN_SCALE = 1;
export const MAX_SCALE = 3;

export function normalizePhoto(value) {
  if (!value) return null;
  if (typeof value === 'string') return { url: value, scale: 1, x: 0, y: 0 };
  return {
    url: value.url,
    scale: clampScale(value.scale ?? 1),
    x: value.x ?? 0,
    y: value.y ?? 0,
  };
}

export function clampScale(scale) {
  return Math.min(MAX_SCALE, Math.max(MIN_SCALE, Number(scale) || 1));
}

// Con object-fit: cover y transform: translate(%) scale(s), el desplazamiento
// máximo sin dejar bordes vacíos es (s − 1) · 50% del tamaño del slot.
export function maxOffset(scale) {
  return (clampScale(scale) - 1) * 50;
}

export function clampOffset(offset, scale) {
  const m = maxOffset(scale);
  return Math.min(m, Math.max(-m, Number(offset) || 0));
}

// Devuelve un encuadre { scale, x, y } válido (zoom y offsets dentro de rango)
export function clampFraming({ scale, x, y }) {
  const s = clampScale(scale);
  return { scale: s, x: clampOffset(x, s), y: clampOffset(y, s) };
}

// Aplica un cambio de encuadre devolviendo un registro válido
export function withFraming(record, patch) {
  return {
    ...record,
    ...clampFraming({
      scale: patch.scale ?? record.scale,
      x: patch.x ?? record.x,
      y: patch.y ?? record.y,
    }),
  };
}
