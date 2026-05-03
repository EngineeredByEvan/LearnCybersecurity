import { createDefaultFS, getNode, normalizePath } from './filesystem';
import { parseCommand } from './parser';
import { TerminalState } from './types';

const manPages: Record<string, string> = {
  ls: 'ls: list directory contents',
  pwd: 'pwd: print current working directory',
  cd: 'cd: change directory'
};

export const createInitialState = (): TerminalState => ({
  cwd: '/home/learner',
  history: [],
  output: ['Welcome to CyberPath shell. Type man ls or ls.'],
  fs: createDefaultFS(),
  user: 'learner'
});

export const runCommand = (state: TerminalState, input: string): TerminalState => {
  const { cmd, args } = parseCommand(input);
  const next = { ...state, history: [...state.history, input], output: [...state.output, `$ ${input}`] };
  const write = (line: string) => next.output.push(line);

  if (!cmd) return next;

  if (cmd === 'pwd') write(next.cwd);
  else if (cmd === 'whoami') write(next.user);
  else if (cmd === 'ls') {
    const target = normalizePath(next.cwd, args[0]);
    const node = getNode(next.fs, target);
    if (!node) write(`ls: cannot access '${args[0] ?? '.'}': No such file or directory`);
    else if (node.type === 'file') write(args[0] ?? '');
    else write(Object.keys(node.children).join('  '));
  } else if (cmd === 'cd') {
    const target = normalizePath(next.cwd, args[0] ?? '/home/learner');
    const node = getNode(next.fs, target);
    if (!node || node.type !== 'dir') write(`cd: ${args[0] ?? ''}: No such file or directory`);
    else next.cwd = target;
  } else if (cmd === 'cat') {
    const target = normalizePath(next.cwd, args[0]);
    const node = getNode(next.fs, target);
    if (!node || node.type !== 'file') write(`cat: ${args[0] ?? ''}: No such file`);
    else write(node.content);
  } else if (cmd === 'man') {
    write(manPages[args[0] ?? ''] ?? `No manual entry for ${args[0] ?? ''}`);
  } else {
    write(`bash: ${cmd}: command not found (hint: try man <command>)`);
  }

  return next;
};
