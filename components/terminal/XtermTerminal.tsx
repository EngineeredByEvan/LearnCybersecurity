'use client';

import { useEffect, useRef } from 'react';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import '@xterm/xterm/css/xterm.css';
import { createInitialState, runCommand } from '@/lib/terminal/engine';

export default function XtermTerminal({ onComplete }: { onComplete?: (history: string[]) => void }) {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hostRef.current) return;
    const term = new Terminal({ convertEol: true, theme: { background: '#000000', foreground: '#00ff9c' } });
    const fit = new FitAddon();
    term.loadAddon(fit);
    term.open(hostRef.current);
    fit.fit();

    let state = createInitialState();
    state.output.forEach((line) => term.writeln(line));
    term.write('$ ');
    let buffer = '';

    const sub = term.onData((d) => {
      if (d === '\r') {
        const command = buffer.trim();
        state = runCommand(state, command);
        term.writeln('');
        const previousLen = Math.max(0, state.output.length - 2);
        const lines = state.output.slice(previousLen);
        lines.forEach((line) => line && term.writeln(line));
        onComplete?.(state.history);
        buffer = '';
        term.write('$ ');
        return;
      }
      if (d === '\u007f') {
        if (buffer.length > 0) {
          buffer = buffer.slice(0, -1);
          term.write('\b \b');
        }
        return;
      }
      buffer += d;
      term.write(d);
    });

    return () => {
      sub.dispose();
      term.dispose();
    };
  }, [onComplete]);

  return <div ref={hostRef} className="h-72 w-full rounded border border-border" />;
}
