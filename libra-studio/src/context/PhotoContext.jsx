import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { getProjectPhotos, savePhoto, removePhoto } from '../lib/storage';

export const PhotoContext = createContext(null);

export function PhotoProvider({ projectId, children }) {
  const [photos, setPhotos] = useState({});

  useEffect(() => {
    setPhotos({});
    getProjectPhotos(projectId).then(setPhotos);
  }, [projectId]);

  const setPhoto = useCallback(async (slotId, dataUrl) => {
    await savePhoto(projectId, slotId, dataUrl);
    setPhotos(p => ({ ...p, [slotId]: dataUrl }));
  }, [projectId]);

  const deletePhoto = useCallback(async (slotId) => {
    await removePhoto(projectId, slotId);
    setPhotos(p => { const n = { ...p }; delete n[slotId]; return n; });
  }, [projectId]);

  return <PhotoContext.Provider value={{ photos, setPhoto, deletePhoto }}>{children}</PhotoContext.Provider>;
}

export function usePhotos() { return useContext(PhotoContext); }
