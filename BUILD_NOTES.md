# Build Notes

## Status
- Implemented Phase 1 skeleton and Phase 2 terminal engine prototype.
- Added structured Tier 1 Linux lesson content plus MDX content folder scaffolding for Tier 1, Tier 2, and Path A.
- Expanded terminal command set with mutable operations and additional command simulation (`cp`, `mv`, `find`, `awk`, `sed`, `chmod`, `chown`).
- Added Settings page API key storage and tutor route integration with Anthropic API fallback behavior.
- Added Settings page with progress export/import, Labs page, and AI Tutor panel.

## Deviations
- Could not run `npm install` in this environment due to registry access restrictions.
- xterm.js/Monaco/shadcn package installs are still blocked in this environment.
- Full MDX curriculum corpus for Tier 1/Tier 2/Path A is still in progress.

## Remaining Work
1. Install and wire xterm.js + Monaco + shadcn once dependency access works.
2. Complete all Tier 1/Tier 2/Path A lesson bodies in MDX.
3. Improve parser for redirection and richer shell semantics.
4. Add robust exercise validator framework for multiple valid command solutions.
5. Expand labs into full setup guides and add module-specific cheat-sheet catalog.
