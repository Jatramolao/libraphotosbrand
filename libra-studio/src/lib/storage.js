import { get, set, del, keys } from 'idb-keyval';

// ── Projects (localStorage) ──
export function getProjects() {
  try { return JSON.parse(localStorage.getItem('lp-projects') || '[]'); } catch { return []; }
}
export function saveProjectMeta(project) {
  const all = getProjects();
  const idx = all.findIndex(p => p.id === project.id);
  if (idx >= 0) all[idx] = project; else all.unshift(project);
  localStorage.setItem('lp-projects', JSON.stringify(all));
}
export function deleteProjectMeta(projectId) {
  localStorage.setItem('lp-projects', JSON.stringify(getProjects().filter(p => p.id !== projectId)));
}
export function createProject(name) {
  return { id: crypto.randomUUID(), name, createdAt: Date.now(), updatedAt: Date.now(), content: {} };
}

// ── Photos (IndexedDB via idb-keyval) ──
const photoKey = (pid, sid) => `photo:${pid}:${sid}`;
export const getPhoto = (pid, sid) => get(photoKey(pid, sid));
export const savePhoto = (pid, sid, dataUrl) => set(photoKey(pid, sid), dataUrl);
export const removePhoto = (pid, sid) => del(photoKey(pid, sid));
export async function getProjectPhotos(pid) {
  const all = await keys();
  const prefix = `photo:${pid}:`;
  const result = {};
  await Promise.all(
    all.filter(k => String(k).startsWith(prefix)).map(async k => {
      const sid = String(k).slice(prefix.length);
      result[sid] = await get(k);
    })
  );
  return result;
}
export async function deleteProjectPhotos(pid) {
  const all = await keys();
  const prefix = `photo:${pid}:`;
  await Promise.all(all.filter(k => String(k).startsWith(prefix)).map(k => del(k)));
}
