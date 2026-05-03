export const parseCommand = (input: string): { cmd: string; args: string[] } => {
  const tokens = input.trim().split(/\s+/).filter(Boolean);
  return { cmd: tokens[0] ?? '', args: tokens.slice(1) };
};
