---
paths:
  - "**/*.test.ts"
  - "**/*.test.tsx"
---

# Testing conventions

How to write tests in this repo (Vitest). For running the suite and debugging CI failures, use
the `testing` skill.

- Colocate tests next to source as `*.test.ts` or `*.test.tsx` in `src`
- Test one behaviour per case and name it for the expected outcome ("returns X when Y")
- Keep tests isolated and repeatable: no shared mutable state, clean up side effects in `afterEach`
- Mock external dependencies (network, filesystem, time), not internal modules
- Use `vi.useFakeTimers()` and `vi.setSystemTime()` for time-dependent logic
- Treat snapshots as intentional: review every change and update with `-u` only when expected
- Assert on public behaviour and output, not private implementation details
- Keep unit tests fast; reserve `pnpm test:bench` for performance-sensitive code
