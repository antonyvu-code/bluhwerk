'use client';
import { createContext, useContext, useEffect, useState, useCallback } from 'react';

const SEASONS = {
  spring: { c: '#E8A0B4', name: 'Frühling' },
  summer: { c: '#E4B23C', name: 'Sommer' },
  autumn: { c: '#C9552F', name: 'Herbst' },
  winter: { c: '#6E8B9E', name: 'Winter' },
};

function seasonFromDate(d = new Date()) {
  const m = d.getMonth(); // 0-11
  if (m <= 1 || m === 11) return 'winter';
  if (m <= 4) return 'spring';
  if (m <= 7) return 'summer';
  return 'autumn';
}

const SeasonCtx = createContext(null);

export function SeasonProvider({ children }) {
  const initial = seasonFromDate();
  const [key, setKey] = useState(initial);

  useEffect(() => {
    document.documentElement.style.setProperty('--accent', SEASONS[key].c);
  }, [key]);

  const setSeason = useCallback((k) => {
    if (SEASONS[k]) setKey(k);
  }, []);

  return (
    <SeasonCtx.Provider value={{ key, ...SEASONS[key], setSeason, SEASONS, initial }}>
      {children}
    </SeasonCtx.Provider>
  );
}

export function useSeason() {
  const ctx = useContext(SeasonCtx);
  if (!ctx) throw new Error('useSeason must be inside SeasonProvider');
  return ctx;
}

export { SEASONS, seasonFromDate };
