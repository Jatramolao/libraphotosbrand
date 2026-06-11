import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { getProjectPhotos, savePhoto, removePhoto } from '../lib/storage';

export const PhotoContext = createContext(null);

export function PhotoProvider({ projectId, children }) {
  const [photos, setPhotos] = useState({});

  useEffect(() => {
    setPhotos({});
    getProjectPhotos(projectId).then(setPhotos);
  }, [projectId]);

  const setPhoto = useCallback(async (slotId, value) => {
    await savePhoto(projectId, slotId, value);
    setPhotos(p => ({ ...p, [slotId]: value }));
  }, [projectId]);

  // Escritura masiva — usada por "Foto de sesión" para llenar varios slots a la vez
  const setManyPhotos = useCallback(async (map) => {
    await Promise.all(Object.entries(map).map(([sid, value]) => savePhoto(projectId, sid, value)));
    setPhotos(p => ({ ...p, ...map }));
  }, [projectId]);

  const deletePhoto = useCallback(async (slotId) => {
    await removePhoto(projectId, slotId);
    setPhotos(p => { const n = { ...p }; delete n[slotId]; return n; });
  }, [projectId]);

  return <PhotoContext.Provider value={{ photos, setPhoto, setManyPhotos, deletePhoto }}>{children}</PhotoContext.Provider>;
}

export function usePhotos() { return useContext(PhotoContext); }
