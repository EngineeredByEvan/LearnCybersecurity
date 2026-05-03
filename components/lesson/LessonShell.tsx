export default function LessonShell() {
  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <section className="rounded-lg border border-border bg-surface p-4 lg:col-span-2">
        <h2 className="mb-3 text-lg font-semibold">Lesson Content</h2>
        <p className="text-sm text-slate-300">Phase 1 placeholder for MDX lesson content, hints, and solution.</p>
      </section>
      <section className="rounded-lg border border-border bg-black p-4 lg:col-span-3">
        <h2 className="mb-3 text-lg font-semibold text-cyber">Exercise Pane</h2>
        <p className="font-mono text-sm text-slate-300">Terminal/Quiz/Code exercise panel lands here in Phase 2.</p>
      </section>
    </div>
  );
}
