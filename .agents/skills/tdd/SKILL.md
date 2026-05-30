---
name: tdd
description: "Test-driven development with vertical slices for Vitest: one test, one implementation, repeat. Use when adding a new behavior, fixing a bug with a regression test, or designing a public interface."
---

# TDD

Tests verify behavior through public interfaces, not implementation details. Code can change entirely; tests shouldn't.

## Anti-pattern: horizontal slices

**DO NOT write all tests first, then all implementation.** Bulk-written tests describe imagined behavior, not real behavior. They couple to data shapes and become insensitive to real changes.

```
WRONG (horizontal):
  RED:   test1, test2, test3
  GREEN: impl1, impl2, impl3

RIGHT (vertical):
  RED -> GREEN: test1 -> impl1
  RED -> GREEN: test2 -> impl2
```

Each test responds to what the previous cycle taught you.

## Workflow

### 1. Plan

Before any code:

- [ ] Confirm what interface changes are needed
- [ ] Confirm which behaviors to test, prioritised
- [ ] Design the interface for testability (small surface, deep implementation)
- [ ] List behaviors to test, not implementation steps

Ask: "What should the public interface look like? Which behaviors matter most?"

You cannot test everything. Focus on critical paths and complex logic.

### 2. Tracer bullet

Write ONE test that confirms ONE thing:

```
RED:   write test for first behavior -> fails
GREEN: minimal code to pass -> passes
```

Proves the path works end-to-end.

### 3. Incremental loop

For each remaining behavior:

- One test at a time
- Only enough code to pass the current test
- Don't anticipate future tests
- Keep tests focused on observable behavior

### 4. Refactor

After all tests pass, look for cleanup:

- Extract duplication
- Deepen modules (move complexity behind simple interfaces)
- Run tests after each refactor step

**Never refactor while RED.** Get to GREEN first.

## Per-cycle checklist

- [ ] Test describes behavior, not implementation
- [ ] Test uses public interface only
- [ ] Test would survive an internal refactor
- [ ] Code is minimal for this test
- [ ] No speculative features added

## Commands

```bash
pnpm test            # full suite
pnpm test --watch    # tight TDD loop
pnpm test <pattern>  # focus while iterating
```

## Related skills

| Skill | Use for |
| --- | --- |
| [diagnose](../diagnose/SKILL.md) | Reproducing a bug before writing the regression test |
| [spec-driven](../spec-driven/SKILL.md) | When the feature is large enough to need a spec first |
