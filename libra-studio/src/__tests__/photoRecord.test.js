// Registro de foto con encuadre (A6): normalización de formatos y límites
import { describe, it, expect } from 'vitest';
import { normalizePhoto, clampScale, clampOffset, maxOffset, clampFraming, withFraming, MIN_SCALE, MAX_SCALE } from '../lib/photoRecord';

describe('photoRecord', () => {
  it('normaliza el formato antiguo (string dataUrl)', () => {
    const rec = normalizePhoto('data:image/png;base64,xxx');
    expect(rec).toEqual({ url: 'data:image/png;base64,xxx', scale: 1, x: 0, y: 0 });
  });

  it('normaliza el formato nuevo conservando encuadre', () => {
    const rec = normalizePhoto({ url: 'u', scale: 1.5, x: 10, y: -5 });
    expect(rec).toEqual({ url: 'u', scale: 1.5, x: 10, y: -5 });
  });

  it('devuelve null si no hay foto', () => {
    expect(normalizePhoto(null)).toBeNull();
    expect(normalizePhoto(undefined)).toBeNull();
  });

  it('limita el zoom al rango permitido', () => {
    expect(clampScale(0.2)).toBe(MIN_SCALE);
    expect(clampScale(99)).toBe(MAX_SCALE);
    expect(clampScale(1.8)).toBe(1.8);
    expect(clampScale('no-numérico')).toBe(1);
  });

  it('el desplazamiento máximo crece con el zoom', () => {
    expect(maxOffset(1)).toBe(0);     // sin zoom no hay paneo (cubriría con huecos)
    expect(maxOffset(2)).toBe(50);
    expect(maxOffset(3)).toBe(100);
  });

  it('limita el paneo según el zoom actual', () => {
    expect(clampOffset(80, 2)).toBe(50);
    expect(clampOffset(-80, 2)).toBe(-50);
    expect(clampOffset(30, 2)).toBe(30);
    expect(clampOffset(30, 1)).toBe(0);
  });

  it('clampFraming valida zoom y offsets en conjunto', () => {
    expect(clampFraming({ scale: 5, x: 200, y: -200 })).toEqual({ scale: 3, x: 100, y: -100 });
  });

  it('withFraming aplica un patch parcial sobre el registro', () => {
    const rec = { url: 'u', scale: 2, x: 10, y: 10 };
    expect(withFraming(rec, { scale: 1.5 })).toEqual({ url: 'u', scale: 1.5, x: 10, y: 10 });
    // al bajar el zoom, los offsets fuera de rango se re-limitan
    expect(withFraming(rec, { scale: 1 })).toEqual({ url: 'u', scale: 1, x: 0, y: 0 });
  });
});
