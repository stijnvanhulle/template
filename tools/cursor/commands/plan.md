Produce the Phase 2 plan for the feature **$1** from `plans/$1/spec.md` and `plans/$1/research.md`.

1. Confirm the spec exists and its acceptance criteria (`AC-N`) are clear. If not, run `/spec` first.
2. If `plans/$1/research.md` is missing, copy it from `plans/templates/research.md` and record the
   key decisions first.
3. Copy `plans/templates/plan.md` to `plans/$1/plan.md` and fill it: overview, architecture (layers
   and responsibilities), and a breakdown into ordered, independently demonstrable slices.
4. For each slice, copy `plans/templates/slice.md` to `plans/$1/NNN-<slug>.md` and fill its Context,
   Goal, Prerequisites, Steps, Files touched, Verification, and Done criteria.
5. List the success criteria (all `AC-N` verified, docs updated, changeset added if needed).

This is the Phase 2 step of the `spec-driven` skill.
