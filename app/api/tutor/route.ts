import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { lessonTitle, question } = await req.json();
  const answer = `Hint for ${lessonTitle}: Break the task into smaller steps. Start by identifying the command category, check man pages, and test incrementally. Your question was: ${question}`;
  return NextResponse.json({ answer });
}
