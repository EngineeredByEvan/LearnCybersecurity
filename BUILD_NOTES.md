# Build Notes

## Status
- Implemented Phase 1 skeleton and Phase 2 terminal engine prototype.
- Added four Linux terminal exercises for Module 1.2 (`ls`, `pwd`, `cat`, `grep` with pipes) with structured lesson content and a cheat-sheet drawer.
- Added mutable filesystem operations in terminal prototype (`mkdir`, `touch`, `rm`).
- Added Settings page with progress export/import, Labs page, and optional AI Tutor panel backed by `/api/tutor`.
- Added Tier 2 and SOC Path A content scaffolding data for planned module rollout.

## Deviations
- Could not run `npm install` in this environment due to registry access restrictions.
- xterm.js/Monaco/shadcn packages are not yet integrated because dependencies could not be fetched.
- Full MDX curriculum corpus for Tier 1/Tier 2/Path A is still in progress.

## Remaining Work
1. Integrate `xterm.js`, `Monaco`, and UI primitives once package installation is available.
2. Convert lesson content storage to MDX and complete all Tier 1 modules.
3. Expand command coverage to full target set (`cp`, `mv`, `chmod`, `chown`, `find`, `awk`, `sed`, etc.).
4. Fully author Tier 2 + SOC Path A lesson bodies and exercises.
5. Add full labs setup guides, expanded cheat sheets, and Anthropic-backed tutor mode.
- Added four Linux terminal exercises for Module 1.2 (`ls`, `pwd`, `cat`, `grep` with pipes) with structured lesson content (concept/example/exercise/solution/resources) and a cheat-sheet drawer.
- Added Settings page with progress export/import.
- Added progress indicators/checkmarks on roadmap and path pages.
- Reconciled repository after repeated merge-conflict cycles and revalidated the current branch as the canonical conflict-resolution snapshot.

## Deviations
- Could not run `npm install` in this environment due to registry access restrictions.
- xterm.js is not yet integrated because dependencies could not be fetched; current terminal UI uses a lightweight custom renderer with a command engine.
- Remaining Tier 1+ content and full 20-command set are pending next iterations.

## Remaining Work
1. Integrate `xterm.js` once package installation is available.
2. Implement full Tier 1 content (all modules) with MDX lessons.
3. Expand terminal engine to full command target set with better filesystem mutability.
4. Implement Tier 2 content and SOC Path A content.
5. Add Labs library, cheat sheets, and optional AI tutor API route/settings.
- Implemented Phase 1 skeleton only (scaffold, roadmap, path page, lesson shell, localStorage progress utility).

## Deviations
- Could not run `npm install` in this environment due to registry access restrictions.
- Terminal engine (Phase 2+) and curriculum content (Phase 3+) not yet implemented.
