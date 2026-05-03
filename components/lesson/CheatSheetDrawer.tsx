'use client';

import { useState } from 'react';

const items = [
  '`ls` list files',
  '`pwd` show current path',
  '`cat <file>` print file',
  '`grep <pattern>` filter lines',
  '`cmd1 | cmd2` pipe output to next command'
];

export default function CheatSheetDrawer() {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed bottom-4 right-4">
      <button className="rounded bg-cyber/20 px-3 py-2 text-cyber" onClick={() => setOpen(!open)}>Cheat Sheet</button>
      {open && (
        <div className="mt-2 w-72 rounded border border-border bg-surface p-3 text-sm">
          <h3 className="mb-2 font-semibold">Linux Quick Reference</h3>
          <ul className="list-disc pl-5 text-slate-300">{items.map((i) => <li key={i}>{i}</li>)}</ul>
        </div>
      )}
    </div>
  );
}
