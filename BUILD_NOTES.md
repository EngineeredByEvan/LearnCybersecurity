# Build Notes

## Status
- Implemented Phase 1 scaffold + Phase 2/3 MVP features.
- Added xterm.js component wiring and Monaco editor component wiring in lesson mode switcher.
- Added shadcn-compatible primitive foundation (`components/ui`, `lib/utils.ts`) and package dependencies.
- Expanded terminal command simulation and mutable operations.
- Added Anthropic API key settings and tutor route integration with fallback mode.
- Added initial MDX lesson structure for Tier 1/Tier 2/Path A and content loader scaffold.

## Environment Limitation
- Package install is blocked in this execution environment, so runtime verification of xterm/Monaco/shadcn packages could not be executed here.

## Remaining Work
1. Complete all Tier 1/Tier 2/Path A MDX lessons and exercise sets.
2. Improve shell parser for full redirection semantics and multi-pipe behavior.
3. Expand labs into fully detailed setup guides and module-specific cheat sheet catalog.
4. Add robust code-exercise test harness for Monaco mode.
