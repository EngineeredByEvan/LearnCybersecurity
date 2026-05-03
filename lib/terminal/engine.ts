import { createDefaultFS, deleteNode, getNode, makeDir, normalizePath, writeFile } from './filesystem';
import { parseCommand } from './parser';
import { TerminalState } from './types';

const manPages: Record<string, string> = {
  ls: 'ls: list directory contents',
  pwd: 'pwd: print current working directory',
  cd: 'cd: change directory',
  cat: 'cat: print file contents',
  grep: 'grep: print lines matching a pattern',
  head: 'head: print first lines',
  tail: 'tail: print last lines',
  wc: 'wc: print line/word/byte counts',
  echo: 'echo: display a line of text',
  mkdir: 'mkdir: make directories',
  touch: 'touch: create empty file'
};

export const createInitialState = (): TerminalState => ({
  cwd: '/home/learner', history: [], output: ['Welcome to CyberPath shell. Type man ls or ls.'], fs: createDefaultFS(), user: 'learner'
});

const applySimple = (cmd: string, args: string[], state: TerminalState, stdin = ''): string => {
  if (cmd === 'pwd') return state.cwd;
  if (cmd === 'whoami') return state.user;
  if (cmd === 'echo') return args.join(' ');
  if (cmd === 'ls') {
    const target = normalizePath(state.cwd, args[0]);
    const node = getNode(state.fs, target);
    if (!node) return `ls: cannot access '${args[0] ?? '.'}': No such file or directory`;
    if (node.type === 'file') return args[0] ?? '';
    return Object.keys(node.children).join('  ');
  }
  if (cmd === 'cat') {
    const target = normalizePath(state.cwd, args[0]);
    const node = getNode(state.fs, target);
    if (!node || node.type !== 'file') return `cat: ${args[0] ?? ''}: No such file`;
    return node.content;
  }
  if (cmd === 'grep') {
    const pattern = args[0] ?? '';
    const src = stdin || applySimple('cat', [args[1] ?? ''], state);
    return src.split('\n').filter((line) => line.includes(pattern)).join('\n') || '';
  }
  if (cmd === 'head') return (stdin || '').split('\n').slice(0, Number(args[1] ?? args[0] ?? 10)).join('\n');
  if (cmd === 'tail') return (stdin || '').split('\n').slice(-Number(args[1] ?? args[0] ?? 10)).join('\n');
  if (cmd === 'wc') {
    const src = stdin || '';
    const lines = src ? src.split('\n').length : 0;
    const words = src.trim() ? src.trim().split(/\s+/).length : 0;
    const bytes = src.length;
    return `${lines} ${words} ${bytes}`;
  }
  if (cmd === 'man') return manPages[args[0] ?? ''] ?? `No manual entry for ${args[0] ?? ''}`;
  return `bash: ${cmd}: command not found (hint: try man <command>)`;
};

export const runCommand = (state: TerminalState, input: string): TerminalState => {
  const { cmd, args, pipe } = parseCommand(input);
  const next = { ...state, history: [...state.history, input], output: [...state.output, `$ ${input}`] };
  if (!cmd) return next;

  if (cmd === 'cd') {
    const target = normalizePath(next.cwd, args[0] ?? '/home/learner');
    const node = getNode(next.fs, target);
    next.output.push(!node || node.type !== 'dir' ? `cd: ${args[0] ?? ''}: No such file or directory` : '');
    if (node && node.type === 'dir') next.cwd = target;
    return next;
  }

  if (cmd === 'mkdir') {
    const ok = makeDir(next.fs, normalizePath(next.cwd, args[0]));
    next.output.push(ok ? '' : `mkdir: cannot create directory '${args[0] ?? ''}'`);
    return next;
  }

  if (cmd === 'touch') {
    const ok = writeFile(next.fs, normalizePath(next.cwd, args[0]), '');
    next.output.push(ok ? '' : `touch: cannot touch '${args[0] ?? ''}'`);
    return next;
  }

  if (cmd === 'rm') {
    const ok = deleteNode(next.fs, normalizePath(next.cwd, args[0]));
    next.output.push(ok ? '' : `rm: cannot remove '${args[0] ?? ''}'`);
    return next;
  }

  const left = applySimple(cmd, args, next);
  if (!pipe) next.output.push(left);
  else next.output.push(applySimple(pipe.cmd, pipe.args, next, left));
  return next;
};
