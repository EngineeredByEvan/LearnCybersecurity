'use client';

import Link from 'next/link';
import { paths } from '@/data/curriculum';
import { useProgress } from '@/components/progress/ProgressProvider';

export default function PathPage({ params }: { params: { pathId: string } }) {
  const path = paths.find((p) => p.id === params.pathId);
  const { progress } = useProgress();

  if (!path) return <div>Path not found.</div>;

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">{path.title}</h1>
      <div className="space-y-4">
        {path.modules.map((moduleItem) => (
          <div key={moduleItem.id} className="rounded-lg border border-border bg-surface p-4">
            <h2 className="font-semibold">{moduleItem.title}</h2>
            <ul className="mt-2 list-inside list-disc text-sm text-slate-300">
              {moduleItem.lessons.map((lesson) => (
                <li key={lesson.id}>
                  <Link href={`/lesson/${lesson.id}`} className="hover:text-cyber">
                    {lesson.title} ({lesson.minutes}m, {lesson.difficulty})
                  </Link>
                  {progress.lessons[lesson.id]?.completed && <span className="ml-2 text-cyber">✔</span>}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
