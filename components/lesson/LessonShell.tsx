'use client';

import { useState } from 'react';
import TerminalExercise from '@/components/terminal/TerminalExercise';
import XtermTerminal from '@/components/terminal/XtermTerminal';
import MonacoExercise from '@/components/exercises/MonacoExercise';
import { lessonExercises } from '@/data/lessons';
import { lessonContent } from '@/data/lessonContent';
import { completeLesson } from '@/lib/progress';
import { useProgress } from '@/components/progress/ProgressProvider';
import CheatSheetDrawer from './CheatSheetDrawer';
import TutorPanel from '@/components/tutor/TutorPanel';

export default function LessonShell({ lessonId }: { lessonId: string }) {
  const [showHint, setShowHint] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [mode, setMode] = useState<'sim' | 'xterm' | 'code'>('sim');
  const exercise = lessonExercises[lessonId];
  const content = lessonContent[lessonId];
  const { refresh } = useProgress();

  if (!exercise || !content) return <div className="rounded border border-border bg-surface p-4">This lesson will be added in later phases.</div>;

  return (
    <>
      <div className="grid gap-4 lg:grid-cols-5">
        <section className="space-y-4 rounded-lg border border-border bg-surface p-4 lg:col-span-2">
          <h2 className="text-lg font-semibold">Concept</h2><p className="text-sm text-slate-200">{content.intro}</p>
          <h3 className="font-semibold">Worked Example</h3><pre className="whitespace-pre-wrap rounded bg-black p-2 text-xs text-slate-200">{content.workedExample}</pre>
          <h3 className="font-semibold">Exercise</h3><p className="text-sm text-slate-200">{content.exercise}</p>
          <button onClick={() => setShowHint((h) => Math.min(h + 1, exercise.hints.length))} className="rounded border border-border px-2 py-1 text-xs">Reveal Hint</button>
          <ul className="list-disc pl-5 text-xs text-slate-400">{exercise.hints.slice(0, showHint).map((hint) => <li key={hint}>{hint}</li>)}</ul>
          <h3 className="font-semibold">Solution</h3><p className="text-xs text-slate-300">{content.solution}</p>
        </section>
        <section className="rounded-lg border border-border bg-black p-4 lg:col-span-3 space-y-3">
          <div className="flex gap-2 text-xs">
            <button className="rounded border border-border px-2 py-1" onClick={() => setMode('sim')}>Sim Terminal</button>
            <button className="rounded border border-border px-2 py-1" onClick={() => setMode('xterm')}>xterm.js</button>
            <button className="rounded border border-border px-2 py-1" onClick={() => setMode('code')}>Monaco</button>
          </div>
          {mode === 'sim' && <TerminalExercise expected={exercise.validator} onComplete={() => { completeLesson(lessonId); refresh(); setCompleted(true); }} />}
          {mode === 'xterm' && <XtermTerminal onComplete={(history) => { if (exercise.validator(history)) { completeLesson(lessonId); refresh(); setCompleted(true); } }} />}
          {mode === 'code' && <MonacoExercise />}
          <button disabled={!completed} className="rounded px-3 py-2 text-sm disabled:bg-slate-700 disabled:text-slate-400 bg-cyber/20 text-cyber">Next Lesson</button>
        </section>
      </div>
      <CheatSheetDrawer />
      <TutorPanel lessonTitle={lessonId} />
    </>
  );
}
