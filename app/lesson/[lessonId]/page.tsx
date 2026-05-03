import LessonShell from '@/components/lesson/LessonShell';

export default function LessonPage({ params }: { params: { lessonId: string } }) {
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Lesson: {params.lessonId}</h1>
      <LessonShell lessonId={params.lessonId} />
    </div>
  );
}
