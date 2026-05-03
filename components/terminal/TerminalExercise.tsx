'use client';
import { useMemo, useState } from 'react';
import { createInitialState, runCommand } from '@/lib/terminal/engine';

type Props = { expected: (history: string[]) => boolean; onComplete: () => void };

export default function TerminalExercise({ expected, onComplete }: Props) {
  const [state, setState] = useState(createInitialState);
  const [input, setInput] = useState('');
  const passed = useMemo(() => expected(state.history), [state.history, expected]);

  const submit = () => {
    const next = runCommand(state, input);
    setState(next);
    setInput('');
    if (expected(next.history)) onComplete();
  };

  return (
    <div>
      <div className="mb-2 h-64 overflow-y-auto rounded border border-border bg-black p-3 font-mono text-sm text-cyber">
        {state.output.map((line, i) => <div key={`${line}-${i}`}>{line}</div>)}
      </div>
      <div className="flex gap-2">
        <input value={input} onChange={(e) => setInput(e.target.value)} className="flex-1 rounded border border-border bg-surface p-2 font-mono" placeholder="Type command..." />
        <button onClick={submit} className="rounded bg-cyber/20 px-3 py-2 text-cyber">Run</button>
      </div>
      {passed && <p className="mt-2 text-sm text-cyber">Exercise complete. You can move to next lesson.</p>}
    </div>
  );
}
