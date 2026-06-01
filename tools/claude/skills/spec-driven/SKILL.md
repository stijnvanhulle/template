---
name: spec-driven
description: "Drive a spec-driven workflow for a larger feature: specify requirements and acceptance criteria, research decisions, plan numbered slices, implement, then verify. Use for multi-step features that need a reviewable paper trail. Skip it for small, obvious changes."
---

# Spec-driven development

A structured workflow for features big enough to warrant a paper trail. Each feature gets its
own folder `plans/<feature>/`. Blank templates live in `plans/templates/`. For small, obvious
changes, use the lightweight `plan` output style instead (a single inline plan, no files).

Claude Code users have slash-command shortcuts (`/spec`, `/plan`, `/implement`, `/verify`) that
copy the right template into place. Every other agent runs the same workflow by copying the
template file by hand. The phases below give both forms.

## Phases

1. **Specify** (`plans/<feature>/spec.md`): capture requirements (`FR-N`) and acceptance
   criteria (`AC-N`). Describe behavior and outcomes, not code.
   - Claude: `/spec <feature>`.
   - Other agents: `cp plans/templates/spec.md plans/<feature>/spec.md`, then fill it in.
2. **Research** (`plans/<feature>/research.md`): record decisions with their reasoning, open
   questions, and operating constraints.
   - All agents: `cp plans/templates/research.md plans/<feature>/research.md`, then fill it in.
3. **Plan** (`plans/<feature>/plan.md`): the architecture and a breakdown into numbered slices,
   each demonstrable on its own.
   - Claude: `/plan <feature>`.
   - Other agents: `cp plans/templates/plan.md plans/<feature>/plan.md`, then for each slice
     copy `plans/templates/slice.md` to `plans/<feature>/NNN-<slug>.md`.
4. **Execute** (`plans/<feature>/NNN-<slug>.md`): implement one slice at a time, ticking each
   slice's Done criteria as its verification passes, and keep each slice runnable.
   - Claude: `/implement <feature>`.
   - Other agents: open the lowest-numbered unchecked slice, follow its Steps, run its
     Verification, then tick its Done criteria.
5. **Verify** (`plans/<feature>/verification.md`): walk end-to-end scenarios, each mapped back
   to an `AC-N`.
   - Claude: `/verify <feature>`.
   - Other agents: `cp plans/templates/verification.md plans/<feature>/verification.md`,
     write one scenario per `AC-N`, then run them against the live app.

## Rules

- Write the spec before the plan, and the plan before code.
- Every acceptance criterion (`AC-N`) must have a matching verification scenario.
- Keep slices small and independently demonstrable, one concern each.
- See `plans/README.md` for the file roles and the per-feature layout.

## Resuming an in-progress feature

1. `ls plans/` to find the active feature folder (the one with unchecked Done criteria).
2. Read `spec.md` for intent, then `plan.md` for the slice list.
3. Open the lowest-numbered `NNN-<slug>.md` slice that still has unchecked Done items.
4. Run that slice's Verification commands first, to confirm where the previous agent stopped,
   before changing anything.
5. When you end the session, leave a short note in the slice or `verification.md` so the next
   agent knows the current state.
