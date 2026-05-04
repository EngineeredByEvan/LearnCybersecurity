import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { lessonTitle, question, apiKey } = await req.json();

  if (apiKey) {
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-latest',
          max_tokens: 250,
          system: 'You are a cybersecurity tutor. Provide hints, not full answers. Stay scoped to lesson context.',
          messages: [{ role: 'user', content: `Lesson: ${lessonTitle}\nQuestion: ${question}` }]
        })
      });

      if (response.ok) {
        const json = (await response.json()) as { content?: Array<{ text?: string }> };
        return NextResponse.json({ answer: json.content?.[0]?.text ?? 'No response content.' });
      }
    } catch {
      // fallback below
    }
  }

  const answer = `Hint for ${lessonTitle}: Break the task into smaller steps. Start by identifying the command category, check man pages, and test incrementally. Your question was: ${question}`;
  return NextResponse.json({ answer, fallback: true });
}
