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
# CyberPath

Personal-use cyber security learning roadmap app (Next.js + TypeScript).

## Current Status
- Phase 1 scaffold complete (roadmap, path pages, lesson pages, settings page).
- Phase 2 prototype in progress (simulated terminal with foundational Linux exercises).
- Progress persistence implemented with localStorage + import/export in Settings.
- Current branch has been re-reviewed as the post-conflict canonical baseline.
Phase 1 scaffold for a personal cyber security learning platform.

## Run

```bash
npm install
npm run dev
```

## What’s Next
- xterm.js integration
- Tier 1 full curriculum content
- Tier 2 + SOC Analyst path content
- Labs library + cheat sheets + AI tutor toggle
