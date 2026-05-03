'use client';

import { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';
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
        state = runCommand(state, buffer.trim());
        term.writeln('');
        const latest = state.output[state.output.length - 1];
        if (latest) term.writeln(latest);
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
