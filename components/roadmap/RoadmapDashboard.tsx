'use client';

import Link from 'next/link';
import { paths } from '@/data/curriculum';
import { useProgress } from '@/components/progress/ProgressProvider';

export default function RoadmapDashboard() {
  const { progress } = useProgress();

  return (
    <div className="space-y-6">
      {paths.map((path) => {
        const totalLessons = path.modules.reduce((sum, m) => sum + m.lessons.length, 0);
        const completed = path.modules.reduce(
          (sum, m) => sum + m.lessons.filter((l) => progress.lessons[l.id]?.completed).length,
          0
        );
        const percent = totalLessons ? Math.round((completed / totalLessons) * 100) : 0;

        return (
          <div key={path.id} className="rounded-lg border border-border bg-surface p-4">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold">{path.title}</h2>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-300">{percent}% complete</span>
                {path.recommended && <span className="rounded bg-cyber/20 px-2 py-1 text-xs text-cyber">Recommended</span>}
              </div>
            </div>
            <div className="mb-3 h-2 overflow-hidden rounded bg-black">
              <div className="h-full bg-cyber" style={{ width: `${percent}%` }} />
            </div>
            <Link href={`/path/${path.id}`} className="text-sm text-sky-400 hover:underline">Open path</Link>
          </div>
        );
      })}
    </div>
  );
}
