---
name: zoom-out
description: "Step up a layer of abstraction and map the relevant modules and callers, instead of diving into one file. Use when unfamiliar with an area of code, when a fix keeps growing, or before making a non-local change."
---

# Zoom out

When the next change isn't obvious from one file, stop and map the surroundings.

## What to produce

- The **module map** for the area: which packages/files own this concern, which depend on it, which it depends on.
- The **call graph** at the level that matters: who calls the function/type/feature in question, and from where.
- The **vocabulary**: name each concept using the project's existing terms. If two terms collide, flag it.
- The **constraint surface**: tests, types, ADRs, or `CONTEXT.md` entries that pin behavior in this area.

## How to do it

1. Start at the entry point the user named (a file, a function, a feature).
2. Walk **outward** one hop at a time: callers, sibling modules in the same folder, shared types.
3. Stop when you can describe the area in three to five sentences without hand-waving.
4. Report the map back **before** proposing a change. A 30-second checkpoint avoids fixing the wrong layer.

## When to skip

- Pure local edits (rename a variable, fix a typo).
- You already wrote this code in the current session.

## Related skills

| Skill | Use for |
| --- | --- |
| [diagnose](../diagnose/SKILL.md) | When the zoom-out reveals the bug is not where you thought |
| [grill](../grill/SKILL.md) | When the map shows decisions that haven't been made yet |
