export const tokenize = (input: string): string[] => {
  const out: string[] = [];
  let cur = '';
  let quote: '"' | "'" | '' = '';

  for (const ch of input.trim()) {
    if ((ch === '"' || ch === "'") && !quote) {
      quote = ch as '"' | "'";
      continue;
    }
    if (ch === quote) {
      quote = '';
      continue;
    }
    if (ch === ' ' && !quote) {
      if (cur) out.push(cur);
      cur = '';
      continue;
    }
    cur += ch;
  }

  if (cur) out.push(cur);
  return out;
};

export const parseCommand = (input: string): { cmd: string; args: string[]; pipe?: { cmd: string; args: string[] } } => {
  const [left, right] = input.split('|').map((segment) => segment.trim());
  const leftTokens = tokenize(left);
  const parsed = { cmd: leftTokens[0] ?? '', args: leftTokens.slice(1) };

  if (!right) return parsed;

  const rightTokens = tokenize(right);
  return { ...parsed, pipe: { cmd: rightTokens[0] ?? '', args: rightTokens.slice(1) } };
};
