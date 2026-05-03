'use client';

import { useState } from 'react';
import TerminalExercise from '@/components/terminal/TerminalExercise';
import { lessonExercises } from '@/data/lessons';
import { lessonContent } from '@/data/lessonContent';
import { completeLesson } from '@/lib/progress';
import { useProgress } from '@/components/progress/ProgressProvider';
import CheatSheetDrawer from './CheatSheetDrawer';

export default function LessonShell({ lessonId }: { lessonId: string }) {
  const [showHint, setShowHint] = useState(0);
  const [completed, setCompleted] = useState(false);
  const exercise = lessonExercises[lessonId];
  const content = lessonContent[lessonId];
  const { refresh } = useProgress();

  if (!exercise || !content) {
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
    <>
      <div className="grid gap-4 lg:grid-cols-5">
        <section className="space-y-4 rounded-lg border border-border bg-surface p-4 lg:col-span-2">
          <div>
            <h2 className="mb-2 text-lg font-semibold">Concept</h2>
            <p className="text-sm text-slate-200">{content.intro}</p>
          </div>
          <div>
            <h3 className="mb-1 font-semibold">Worked Example</h3>
            <pre className="whitespace-pre-wrap rounded bg-black p-2 text-xs text-slate-200">{content.workedExample}</pre>
          </div>
          <div>
            <h3 className="mb-1 font-semibold">Exercise</h3>
            <p className="text-sm text-slate-200">{content.exercise}</p>
            <button onClick={() => setShowHint((h) => Math.min(h + 1, exercise.hints.length))} className="mt-2 rounded border border-border px-2 py-1 text-xs">Reveal Hint</button>
            <ul className="mt-2 list-disc pl-5 text-xs text-slate-400">{exercise.hints.slice(0, showHint).map((hint) => <li key={hint}>{hint}</li>)}</ul>
          </div>
          <div>
            <h3 className="mb-1 font-semibold">Solution</h3>
            <p className="text-xs text-slate-300">{content.solution}</p>
          </div>
          <div>
            <h3 className="mb-1 font-semibold">Resources</h3>
            <ul className="list-disc pl-5 text-xs text-sky-300">
              {content.resources.map((r) => <li key={r.url}><a href={r.url} target="_blank" rel="noreferrer">{r.title}</a></li>)}
            </ul>
          </div>
        </section>
        <section className="rounded-lg border border-border bg-black p-4 lg:col-span-3">
          <h2 className="mb-3 text-lg font-semibold text-cyber">Terminal Mode</h2>
          <TerminalExercise expected={exercise.validator} onComplete={() => { completeLesson(lessonId); refresh(); setCompleted(true); }} />
          <button disabled={!completed} className="mt-4 rounded px-3 py-2 text-sm disabled:bg-slate-700 disabled:text-slate-400 bg-cyber/20 text-cyber">Next Lesson</button>
        </section>
      </div>
      <CheatSheetDrawer />
    </>
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
