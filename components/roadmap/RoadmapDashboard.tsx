import Link from 'next/link';
import { paths } from '@/data/curriculum';

export default function RoadmapDashboard() {
  return (
    <div className="space-y-6">
      {paths.map((path) => (
        <div key={path.id} className="rounded-lg border border-border bg-surface p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold">{path.title}</h2>
            {path.recommended && <span className="rounded bg-cyber/20 px-2 py-1 text-xs text-cyber">Recommended</span>}
          </div>
          <Link href={`/path/${path.id}`} className="text-sm text-sky-400 hover:underline">Open path</Link>
        </div>
      ))}
    </div>
  );
}
