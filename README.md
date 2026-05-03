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
- xterm.js terminal component (`components/terminal/XtermTerminal.tsx`)
- Monaco editor component (`components/exercises/MonacoExercise.tsx`)
- shadcn-compatible primitive foundation (`components/ui/*`, `lib/utils.ts`)

## Optional: complete shadcn install locally
If you want full shadcn scaffolding:
```bash
npx shadcn@latest init
npx shadcn@latest add button card dialog accordion
```

## Required local packages
These are already declared in `package.json`:
- `xterm`, `xterm-addon-fit`
- `@monaco-editor/react`
- `@radix-ui/react-*`, `class-variance-authority`, `clsx`, `tailwind-merge`

## Anthropic Tutor
- Save your API key in **Settings**.
- Tutor calls `/api/tutor`, which attempts Anthropic API and falls back to local hints if unavailable.
