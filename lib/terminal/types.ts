export type FSNode = { type: 'file'; content: string } | { type: 'dir'; children: Record<string, FSNode> };

export type TerminalState = {
  cwd: string;
  history: string[];
  output: string[];
  fs: FSNode;
  user: string;
};

export type CommandContext = {
  state: TerminalState;
  args: string[];
  raw: string;
};

export type CommandResult = {
  output?: string;
  error?: string;
};
