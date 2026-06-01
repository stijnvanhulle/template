# Plans

A spec-driven workflow for larger features: write down what you are building and how you will
know it works before you write code, then implement in small, demonstrable slices. For small,
obvious changes, skip this and use the lightweight `plan` output style instead (a single inline
plan, no files).

## Layout

Each feature gets its own folder. Shared blank templates live in `templates/`.

```
plans/
├── README.md
├── templates/            # blank templates, copied per feature
│   ├── spec.md
│   ├── research.md
│   ├── plan.md
│   ├── verification.md
│   └── slice.md
└── <feature>/            # one folder per plan
    ├── spec.md
    ├── research.md
    ├── plan.md
    ├── verification.md
    └── NNN-<slug>.md      # one per slice, copied from templates/slice.md
```

## Phases

| Phase | File | Role |
| ----- | ---- | ---- |
| 0 Specify | `<feature>/spec.md` | Requirements (`FR-N`) and acceptance criteria (`AC-N`). Behavior, not code. |
| 1 Research | `<feature>/research.md` | Decisions with reasoning, open questions, operating constraints. |
| 2 Plan | `<feature>/plan.md` | Architecture and the breakdown into numbered slices. |
| Execute | `<feature>/NNN-<slug>.md` | One file per slice, copied from `templates/slice.md`. Implement one at a time, ticking Done criteria as each passes. |
| Verify | `<feature>/verification.md` | End-to-end scenarios, each mapped back to an `AC-N`. |

## How to use it

Claude Code users have slash-command shortcuts. Every other agent runs the same workflow by
copying the template files by hand.

| Phase | Claude Code | Any other agent |
| --- | --- | --- |
| Specify | `/spec <feature>` | `cp plans/templates/spec.md plans/<feature>/spec.md` and fill it in |
| Research | (manual) | `cp plans/templates/research.md plans/<feature>/research.md` and fill it in |
| Plan | `/plan <feature>` | `cp plans/templates/plan.md plans/<feature>/plan.md`, then `cp plans/templates/slice.md plans/<feature>/NNN-<slug>.md` per slice |
| Execute | `/implement <feature>` | Open the lowest-numbered unchecked slice, follow its Steps, tick its Done criteria as Verification passes |
| Verify | `/verify <feature>` | `cp plans/templates/verification.md plans/<feature>/verification.md`, then run each scenario |

The `spec-driven` skill explains the same flow and when to reach for it.

## Resuming an in-progress feature

Picking up someone else's plan:

1. `ls plans/` to find the active feature folder (the one with unchecked Done criteria).
2. Read `spec.md` for intent, then `plan.md` for the slice list.
3. Open the lowest-numbered `NNN-<slug>.md` slice that still has unchecked Done items.
4. Run that slice's Verification first to confirm the current state before changing anything.
5. When ending the session, leave a short note in the slice or `verification.md` so the next
   agent knows where you stopped.

## Credit

The structure is adapted from [GitHub Spec Kit](https://github.com/github/spec-kit). The
`verification.md` role is Spec Kit's `quickstart.md`.
