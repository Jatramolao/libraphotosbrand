import { createContext, useCallback, useContext, useState } from 'react';
import { LP_DEFAULTS } from '../data/defaults';

export const LPContext = createContext(null);

export function LPProvider({ project, onContentUpdate, children }) {
  const [content, setContent] = useState(() => ({ ...LP_DEFAULTS, ...project.content }));

  const setToken = useCallback((key, val) => {
    setContent(prev => {
      const next = { ...prev, [key]: val };
      onContentUpdate(next);
      return next;
    });
  }, [onContentUpdate]);

  return <LPContext.Provider value={{ ...content, setToken }}>{children}</LPContext.Provider>;
}

export function useLP() { return useContext(LPContext); }
