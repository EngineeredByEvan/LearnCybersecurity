'use client';

import { useState } from 'react';
import { exportProgress, importProgress } from '@/lib/progress';

export default function SettingsPage() {
  const [payload, setPayload] = useState('');
  const [message, setMessage] = useState('');

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Settings</h1>
      <div className="rounded border border-border bg-surface p-4">
        <h2 className="mb-2 font-semibold">Export Progress</h2>
        <button
          className="rounded bg-cyber/20 px-3 py-2 text-cyber"
          onClick={() => setPayload(exportProgress())}
        >
          Generate Export JSON
        </button>
      </div>
      <div className="rounded border border-border bg-surface p-4">
        <h2 className="mb-2 font-semibold">Import Progress</h2>
        <textarea value={payload} onChange={(e) => setPayload(e.target.value)} className="h-40 w-full rounded border border-border bg-black p-2 font-mono text-xs" />
        <button className="mt-2 rounded border border-border px-3 py-2" onClick={() => setMessage(importProgress(payload).message)}>Import</button>
        {message && <p className="mt-2 text-sm text-slate-300">{message}</p>}
      </div>
    </div>
  );
}
