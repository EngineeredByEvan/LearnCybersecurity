'use client';

export type ProgressState = {
  version: number;
  lastActive: string;
  lessons: Record<string, { completed: boolean; completedAt?: string; attempts: number }>;
};

const KEY = 'cyberpath-progress-v1';

export const loadProgress = (): ProgressState => {
  if (typeof window === 'undefined') return { version: 1, lastActive: new Date().toISOString(), lessons: {} };
  const raw = localStorage.getItem(KEY);
  if (!raw) return { version: 1, lastActive: new Date().toISOString(), lessons: {} };
  return JSON.parse(raw) as ProgressState;
};

export const completeLesson = (lessonId: string): ProgressState => {
  const state = loadProgress();
  state.lessons[lessonId] = { completed: true, completedAt: new Date().toISOString(), attempts: (state.lessons[lessonId]?.attempts ?? 0) + 1 };
  state.lastActive = new Date().toISOString();
  localStorage.setItem(KEY, JSON.stringify(state));
  return state;
};
