'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { loadProgress, ProgressState } from '@/lib/progress';

const ProgressContext = createContext<{ progress: ProgressState; refresh: () => void } | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<ProgressState>(loadProgress());
  const refresh = () => setProgress(loadProgress());

  useEffect(() => {
    window.addEventListener('focus', refresh);
    return () => window.removeEventListener('focus', refresh);
  }, []);

  const value = useMemo(() => ({ progress, refresh }), [progress]);
  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export const useProgress = () => {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider');
  return ctx;
};
