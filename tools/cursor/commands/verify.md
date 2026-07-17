Write and run the closeout verification for the feature **$1** from `plans/$1/spec.md`.

1. Copy `plans/templates/verification.md` to `plans/$1/verification.md` if it does not exist yet.
2. For each acceptance criterion (`AC-N`) in the spec, write a numbered scenario with the steps a
   reviewer performs and a "pass when" condition.
3. Note prerequisites and the boot commands needed before walking the scenarios.
4. Run each scenario against the running app and report pass or fail per `AC-N`.
5. If any scenario fails, summarize the gap, and do not mark the feature done until every `AC-N`
   passes.

This is the closeout step of the `spec-driven` skill.
