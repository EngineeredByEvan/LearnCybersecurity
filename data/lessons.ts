export const lessonExercises: Record<string, { prompt: string; hints: string[]; validator: (history: string[]) => boolean }> = {
  'l-linux-1': {
    prompt: 'List files in your current directory.',
    hints: ['Use a command that lists directory contents.', 'Try: man ls'],
    validator: (h) => h.some((c) => c.trim() === 'ls')
  },
  'l-linux-2': {
    prompt: 'Print your current working directory.',
    hints: ['There is a command with three letters.', 'Try: pwd'],
    validator: (h) => h.some((c) => c.trim() === 'pwd')
  },
  'l-linux-3': {
    prompt: 'Display the content of notes.txt in your home folder.',
    hints: ['Use cat with a relative or absolute path.', 'You can run ls first.'],
    validator: (h) => h.some((c) => c.includes('cat') && c.includes('notes.txt'))
  }
};
