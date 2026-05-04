# CyberPath MVP

## Local setup (required)

1. Install Node.js 20+.
2. From repo root run:
   ```bash
   npm install
   npm run dev
   ```
3. Open `http://localhost:3000`.

## Included integrations
- xterm.js terminal component (`components/terminal/XtermTerminal.tsx`) via `@xterm/xterm` + `@xterm/addon-fit`
- Monaco editor component (`components/exercises/MonacoExercise.tsx`)
- shadcn-compatible primitive foundation (`components/ui/*`, `lib/utils.ts`)

## Optional: complete shadcn install locally
```bash
npx shadcn@latest init
npx shadcn@latest add button card dialog accordion
```

## Troubleshooting
- If you previously installed deprecated `xterm` packages, remove lockfile and reinstall:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```
- If your local `lib/progress.ts` is broken from a merge conflict, reset it from this branch.

## Anthropic Tutor
- Save your API key in **Settings**.
- Tutor calls `/api/tutor`, attempts Anthropic API, and falls back to local hints if unavailable.
