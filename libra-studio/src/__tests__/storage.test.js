import { describe, it, expect, beforeEach } from 'vitest';
import { createProject, saveProjectMeta, getProjects, deleteProjectMeta } from '../lib/storage';

// idb-keyval uses IndexedDB which isn't available in jsdom — only test localStorage-backed functions here.

describe('createProject', () => {
  it('generates unique IDs for each project', () => {
    const a = createProject('A');
    const b = createProject('B');
    expect(a.id).not.toBe(b.id);
  });

  it('stores the given name', () => {
    const p = createProject('Drop Junio 2026');
    expect(p.name).toBe('Drop Junio 2026');
  });

  it('sets createdAt and updatedAt timestamps', () => {
    const before = Date.now();
    const p = createProject('Test');
    expect(p.createdAt).toBeGreaterThanOrEqual(before);
    expect(p.updatedAt).toBeGreaterThanOrEqual(before);
  });

  it('initialises content as empty object', () => {
    const p = createProject('Test');
    expect(p.content).toEqual({});
  });
});

describe('saveProjectMeta / getProjects', () => {
  beforeEach(() => localStorage.clear());

  it('returns empty array when nothing is saved', () => {
    expect(getProjects()).toEqual([]);
  });

  it('persists a project and retrieves it', () => {
    const p = createProject('Sesión A');
    saveProjectMeta(p);
    const all = getProjects();
    expect(all.some(x => x.id === p.id && x.name === 'Sesión A')).toBe(true);
  });

  it('updates an existing project without creating a duplicate', () => {
    const p = createProject('Original');
    saveProjectMeta(p);
    saveProjectMeta({ ...p, name: 'Actualizado' });
    const all = getProjects();
    const matching = all.filter(x => x.id === p.id);
    expect(matching.length).toBe(1);
    expect(matching[0].name).toBe('Actualizado');
  });

  it('prepends new projects (most recent first)', () => {
    const a = createProject('Primero');
    const b = createProject('Segundo');
    saveProjectMeta(a);
    saveProjectMeta(b);
    const all = getProjects();
    expect(all[0].id).toBe(b.id);
  });
});

describe('deleteProjectMeta', () => {
  beforeEach(() => localStorage.clear());

  it('removes the project from the list', () => {
    const p = createProject('A borrar');
    saveProjectMeta(p);
    deleteProjectMeta(p.id);
    expect(getProjects().some(x => x.id === p.id)).toBe(false);
  });

  it('leaves other projects intact', () => {
    const keep = createProject('Conservar');
    const del = createProject('Borrar');
    saveProjectMeta(keep);
    saveProjectMeta(del);
    deleteProjectMeta(del.id);
    expect(getProjects().some(x => x.id === keep.id)).toBe(true);
  });
});
