'use client';

import Link from 'next/link';
import { paths } from '@/data/curriculum';
import { useProgress } from '@/components/progress/ProgressProvider';

export default function PathPage({ params }: { params: { pathId: string } }) {
  const path = paths.find((p) => p.id === params.pathId);
  const { progress } = useProgress();
import Link from 'next/link';
import { paths } from '@/data/curriculum';

export default function PathPage({ params }: { params: { pathId: string } }) {
  const path = paths.find((p) => p.id === params.pathId);
  if (!path) return <div>Path not found.</div>;

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">{path.title}</h1>
      <div className="space-y-4">
        {path.modules.map((m) => (
          <div key={m.id} className="rounded-lg border border-border bg-surface p-4">
            <h2 className="font-semibold">{m.title}</h2>
            <ul className="mt-2 list-inside list-disc text-sm text-slate-300">
              {m.lessons.map((l) => (
                <li key={l.id}>
                  <Link href={`/lesson/${l.id}`} className="hover:text-cyber">{l.title} ({l.minutes}m, {l.difficulty})</Link>
                  {progress.lessons[l.id]?.completed && <span className="ml-2 text-cyber">✔</span>}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
