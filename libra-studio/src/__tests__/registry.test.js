// Integridad del registry de plantillas: cada plantilla declarada debe tener
// componente, categoría válida y todos sus tokens definidos en LP_DEFAULTS.
import { describe, it, expect } from 'vitest';
import { TEMPLATES, TEMPLATES_BY_ID, CATEGORIES, CATEGORY_LABELS } from '../data/templates-meta';
import { TEMPLATE_COMPONENTS } from '../templates/index';
import { LP_DEFAULTS } from '../data/defaults';

describe('registry de plantillas', () => {
  it('tiene 26 plantillas (set v2 completo)', () => {
    expect(TEMPLATES.length).toBe(26);
  });

  it('cada plantilla tiene un componente registrado', () => {
    for (const t of TEMPLATES) {
      expect(TEMPLATE_COMPONENTS[t.id], `componente faltante: ${t.id}`).toBeTypeOf('function');
    }
  });

  it('cada componente registrado tiene metadata', () => {
    for (const id of Object.keys(TEMPLATE_COMPONENTS)) {
      expect(TEMPLATES_BY_ID[id], `metadata faltante: ${id}`).toBeDefined();
    }
  });

  it('cada plantilla usa una categoría válida con label', () => {
    for (const t of TEMPLATES) {
      expect(CATEGORIES, `categoría inválida en ${t.id}: ${t.category}`).toContain(t.category);
      expect(CATEGORY_LABELS[t.category]).toBeTypeOf('string');
    }
  });

  it('cada plantilla usa un aspecto válido', () => {
    for (const t of TEMPLATES) {
      expect(['portrait', 'square', 'story']).toContain(t.defaultAspect);
    }
  });

  it('todos los tokens de fields existen en LP_DEFAULTS', () => {
    for (const t of TEMPLATES) {
      for (const f of t.fields) {
        expect(LP_DEFAULTS[f.key], `token sin default: ${t.id} → ${f.key}`).toBeDefined();
      }
    }
  });

  it('incluye las plantillas nuevas T18–T28', () => {
    for (const id of ['t18', 't19', 't20', 't21', 't22', 't23', 't24', 't25', 't26', 't27', 't28']) {
      expect(TEMPLATES_BY_ID[id], `falta plantilla nueva: ${id}`).toBeDefined();
    }
  });

  it('excluye T05 y T07 (descartadas en el diseño v2)', () => {
    expect(TEMPLATES_BY_ID.t05).toBeUndefined();
    expect(TEMPLATES_BY_ID.t07).toBeUndefined();
  });

  it('photoSlots es coherente con hasPhoto', () => {
    for (const t of TEMPLATES) {
      expect(Array.isArray(t.photoSlots), `photoSlots faltante: ${t.id}`).toBe(true);
      expect(t.photoSlots.length > 0, `hasPhoto/photoSlots inconsistente: ${t.id}`).toBe(t.hasPhoto);
    }
  });

  it('mainSlot (foto de sesión) siempre apunta a un slot declarado', () => {
    const withMain = TEMPLATES.filter(t => t.mainSlot);
    expect(withMain.length).toBe(10);
    for (const t of withMain) {
      expect(t.photoSlots, `mainSlot fuera de photoSlots: ${t.id}`).toContain(t.mainSlot);
    }
  });

  it('marca: defaults usan LIBRA PHOTOS / LP (identidad original)', () => {
    expect(LP_DEFAULTS.brand).toBe('LIBRA PHOTOS');
    expect(LP_DEFAULTS.monogram).toBe('LP');
    expect(LP_DEFAULTS.t17H5Glyph).toBe('LP');
    expect(LP_DEFAULTS.brand).not.toMatch(/FOTOS/);
  });
});
