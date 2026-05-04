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
  touch: 'touch: create empty file',
  cp: 'cp: copy files',
  mv: 'mv: move/rename files',
  find: 'find: search for files in a directory hierarchy',
  chmod: 'chmod: change file mode bits',
  chown: 'chown: change file owner and group',
  sed: 'sed: stream editor',
  awk: 'awk: pattern scanning and processing language'
};

export const createInitialState = (): TerminalState => ({
  cwd: '/home/learner',
  history: [],
  output: ['Welcome to CyberPath shell. Type man ls or ls.'],
  fs: createDefaultFS(),
  user: 'learner'
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

  if (cmd === 'find') {
    const root = args[0] ?? state.cwd;
    const needle = (args[2] ?? '').replaceAll('*', '');
    const walk = (node: any, base: string, out: string[]) => {
      if (node.type === 'file') {
        if (!needle || base.includes(needle)) out.push(base);
        return;
      }
      for (const [name, child] of Object.entries(node.children)) {
        walk(child, `${base}/${name}`.replace('//', '/'), out);
      }
    };

    const node = getNode(state.fs, normalizePath(state.cwd, root));
    if (!node) return `find: '${root}': No such file or directory`;
    const out: string[] = [];
    walk(node, normalizePath(state.cwd, root), out);
    return out.join('\n');
  }

  if (cmd === 'sed') {
    const expr = args[0] ?? '';
    const src = stdin || '';
    const match = expr.match(/^s\/(.*)\/(.*)\/$/);
    if (!match) return src;
    return src.replace(new RegExp(match[1], 'g'), match[2]);
  }

  if (cmd === 'awk') {
    const src = stdin || '';
    if ((args[0] ?? '').includes('{print $1}')) return src.split('\n').map((line) => line.split(/\s+/)[0] ?? '').join('\n');
    return src;
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

  if (cmd === 'cp' || cmd === 'mv') {
    const from = getNode(next.fs, normalizePath(next.cwd, args[0]));
    const toPath = normalizePath(next.cwd, args[1]);
    if (!from || from.type !== 'file') {
      next.output.push(`${cmd}: cannot stat '${args[0] ?? ''}'`);
      return next;
    }
    writeFile(next.fs, toPath, from.content);
    if (cmd === 'mv') deleteNode(next.fs, normalizePath(next.cwd, args[0]));
    next.output.push('');
    return next;
  }

  if (cmd === 'chmod' || cmd === 'chown') {
    next.output.push(`${cmd}: simulated (no permission model in prototype)`);
    return next;
  }

  const left = applySimple(cmd, args, next);
  next.output.push(!pipe ? left : applySimple(pipe.cmd, pipe.args, next, left));
  return next;
};
