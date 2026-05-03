'use client';

import Editor from '@monaco-editor/react';
import { useState } from 'react';

export default function MonacoExercise() {
  const [code, setCode] = useState('echo "hello"');
  return (
    <div className="space-y-2">
      <Editor height="240px" defaultLanguage="shell" value={code} onChange={(v) => setCode(v ?? '')} theme="vs-dark" />
      <p className="text-xs text-slate-300">Code mode placeholder: wire test harness in next iteration.</p>
    </div>
  );
}
