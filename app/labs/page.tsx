import { labs } from '@/data/labs';

export default function LabsPage() {
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Project Labs</h1>
      <div className="space-y-3">
        {labs.map((lab) => (
          <div key={lab.id} className="rounded border border-border bg-surface p-4">
            <h2 className="font-semibold">{lab.title}</h2>
            <p className="text-sm text-slate-300">Outcome: {lab.outcome}</p>
            <p className="text-xs text-slate-400">Cost: {lab.cost} · Time: {lab.time}</p>
            <a className="text-sm text-sky-300" href={lab.link} target="_blank" rel="noreferrer">Reference</a>
          </div>
        ))}
      </div>
    </div>
  );
}
