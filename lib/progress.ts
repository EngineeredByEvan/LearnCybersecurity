'use client';

export type ProgressState = {
  version: number;
  lastActive: string;
  lessons: Record<string, { completed: boolean; completedAt?: string; attempts: number }>;
  modules: Record<string, { progress: number }>;
  paths: Record<string, { progress: number; selected: boolean }>;
  resourcesViewed: string[];
  labsCompleted: string[];
};

const KEY = 'cyberpath-progress-v1';

export const defaultProgress = (): ProgressState => ({
  version: 1,
  lastActive: new Date().toISOString(),
  lessons: {},
  modules: {},
  paths: {},
  resourcesViewed: [],
  labsCompleted: []
});

export const loadProgress = (): ProgressState => {
  if (typeof window === 'undefined') return defaultProgress();
  const raw = localStorage.getItem(KEY);
  if (!raw) return defaultProgress();
  try {
    return { ...defaultProgress(), ...JSON.parse(raw) } as ProgressState;
  } catch {
    return defaultProgress();
  }
};

export const saveProgress = (state: ProgressState): void => {
  localStorage.setItem(KEY, JSON.stringify({ ...state, lastActive: new Date().toISOString() }));
export const loadProgress = (): ProgressState => {
  if (typeof window === 'undefined') return { version: 1, lastActive: new Date().toISOString(), lessons: {} };
  const raw = localStorage.getItem(KEY);
  if (!raw) return { version: 1, lastActive: new Date().toISOString(), lessons: {} };
  return JSON.parse(raw) as ProgressState;
};

export const completeLesson = (lessonId: string): ProgressState => {
  const state = loadProgress();
  state.lessons[lessonId] = {
    completed: true,
    completedAt: new Date().toISOString(),
    attempts: (state.lessons[lessonId]?.attempts ?? 0) + 1
  };
  state.lastActive = new Date().toISOString();
  saveProgress(state);
  return state;
};

export const exportProgress = (): string => JSON.stringify(loadProgress(), null, 2);

export const importProgress = (raw: string): { ok: boolean; message: string } => {
  try {
    const parsed = JSON.parse(raw) as ProgressState;
    if (!parsed || typeof parsed !== 'object' || !parsed.lessons) return { ok: false, message: 'Invalid schema' };
    saveProgress({ ...defaultProgress(), ...parsed });
    return { ok: true, message: 'Progress imported' };
  } catch {
    return { ok: false, message: 'Invalid JSON' };
  }
};
  state.lessons[lessonId] = { completed: true, completedAt: new Date().toISOString(), attempts: (state.lessons[lessonId]?.attempts ?? 0) + 1 };
  state.lastActive = new Date().toISOString();
  localStorage.setItem(KEY, JSON.stringify(state));
  return state;
};
