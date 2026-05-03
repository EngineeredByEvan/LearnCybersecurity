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
  const [left, right] = input.split('|').map((s) => s.trim());
  const lt = tokenize(left);
  const parsed = { cmd: lt[0] ?? '', args: lt.slice(1) };
  if (!right) return parsed;
  const rt = tokenize(right);
  return { ...parsed, pipe: { cmd: rt[0] ?? '', args: rt.slice(1) } };
export const parseCommand = (input: string): { cmd: string; args: string[] } => {
  const tokens = input.trim().split(/\s+/).filter(Boolean);
  return { cmd: tokens[0] ?? '', args: tokens.slice(1) };
};
