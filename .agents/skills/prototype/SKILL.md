---
name: prototype
description: "Build a throwaway prototype to answer a single design question (logic or UI) before committing to production code. Use when a design choice is uncertain and a quick experiment would resolve it faster than discussion."
---

# Prototype

A prototype is **throwaway code that answers a question.** The question determines the shape.

## Two branches

**Logic** - validating state machines or business logic. Build a minimal interactive script that stress-tests scenarios. Print full state after every step so transitions are visible.

**UI** - exploring visual or interaction directions. Generate several distinct variations toggleable from one entry point (URL query param, env var, CLI flag).

## Rules

1. Mark prototypes clearly as temporary. Place them near the production code they relate to (e.g. `packages/<pkg>/prototypes/`).
2. One command launches it. No setup ceremony.
3. No persistence unless persistence is what you're testing. Keep state in memory.
4. Skip tests, error handling, and abstractions. They obscure the answer.
5. Show the full state after every interaction so changes stay visible.

## Resolution

Once the prototype answers its question:

- Delete it, or
- Move the validated finding into production code and delete the prototype.

Before deletion, write the question and the answer somewhere durable: a comment on the resulting code, a paragraph in an ADR or `plans/<feature>/research.md`, or a commit message. The artifact disappears; the learning shouldn't.

## Related skills

| Skill | Use for |
| --- | --- |
| [spec-driven](../spec-driven/SKILL.md) | Capture the prototype's answer in `research.md` |
| [tdd](../tdd/SKILL.md) | Build the production version with tests after the prototype answers the question |
