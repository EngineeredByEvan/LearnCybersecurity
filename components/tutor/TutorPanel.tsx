'use client';

import { useState } from 'react';

export default function TutorPanel({ lessonTitle }: { lessonTitle: string }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [a, setA] = useState('');

  const ask = async () => {
    const apiKey = localStorage.getItem('anthropic_api_key') ?? '';
    const res = await fetch('/api/tutor', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ lessonTitle, question: q, apiKey })
    });
    const json = await res.json() as { answer: string; fallback?: boolean };
    setA(json.fallback ? `${json.answer} (fallback mode)` : json.answer);
  };

  return (
    <div className="fixed bottom-4 left-4 w-80">
      <button className="rounded bg-sky-500/20 px-3 py-2 text-sky-300" onClick={() => setOpen(!open)}>AI Tutor</button>
      {open && <div className="mt-2 rounded border border-border bg-surface p-3">
        <p className="text-xs text-slate-300">Ask a question about this lesson.</p>
        <textarea className="mt-2 h-20 w-full rounded bg-black p-2 text-xs" value={q} onChange={(e)=>setQ(e.target.value)} />
        <button onClick={ask} className="mt-2 rounded border border-border px-2 py-1 text-xs">Ask</button>
        {a && <p className="mt-2 text-xs text-slate-200">{a}</p>}
      </div>}
    </div>
  );
}
