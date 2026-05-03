'use client';

import { useState } from 'react';
import TerminalExercise from '@/components/terminal/TerminalExercise';
import { lessonExercises } from '@/data/lessons';
import { completeLesson } from '@/lib/progress';
import { useProgress } from '@/components/progress/ProgressProvider';

export default function LessonShell({ lessonId }: { lessonId: string }) {
  const [showHint, setShowHint] = useState(0);
  const exercise = lessonExercises[lessonId];
  const { refresh } = useProgress();

  if (!exercise) {
    return <div className="rounded border border-border bg-surface p-4">This lesson will be added in later phases.</div>;
  }

  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <section className="rounded-lg border border-border bg-surface p-4 lg:col-span-2">
        <h2 className="mb-3 text-lg font-semibold">Exercise Brief</h2>
        <p className="text-sm text-slate-200">{exercise.prompt}</p>
        <button onClick={() => setShowHint((h) => Math.min(h + 1, exercise.hints.length))} className="mt-4 rounded border border-border px-2 py-1 text-xs">Reveal Hint</button>
        <ul className="mt-2 list-disc pl-5 text-xs text-slate-400">
          {exercise.hints.slice(0, showHint).map((hint) => <li key={hint}>{hint}</li>)}
        </ul>
      </section>
      <section className="rounded-lg border border-border bg-black p-4 lg:col-span-3">
        <h2 className="mb-3 text-lg font-semibold text-cyber">Terminal Mode</h2>
        <TerminalExercise expected={exercise.validator} onComplete={() => { completeLesson(lessonId); refresh(); }} />
export default function LessonShell() {
  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <section className="rounded-lg border border-border bg-surface p-4 lg:col-span-2">
        <h2 className="mb-3 text-lg font-semibold">Lesson Content</h2>
        <p className="text-sm text-slate-300">Phase 1 placeholder for MDX lesson content, hints, and solution.</p>
      </section>
      <section className="rounded-lg border border-border bg-black p-4 lg:col-span-3">
        <h2 className="mb-3 text-lg font-semibold text-cyber">Exercise Pane</h2>
        <p className="font-mono text-sm text-slate-300">Terminal/Quiz/Code exercise panel lands here in Phase 2.</p>
      </section>
    </div>
  );
}
