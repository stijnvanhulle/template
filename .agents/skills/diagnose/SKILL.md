---
name: diagnose
description: "Disciplined debugging loop for hard bugs and performance regressions: reproduce, minimize, hypothesize, instrument, fix, regression-test. Use when the user reports a bug, says something is broken/failing, or describes a performance regression."
---

# Diagnose

A discipline for hard bugs. Skip phases only when you can justify it.

## Phase 1 - Build a feedback loop

**This is the skill.** Everything else is mechanical. If you have a fast, deterministic, agent-runnable pass/fail signal for the bug, you will find the cause. If you don't, no amount of staring at code will save you.

Ways to construct one, in roughly this order:

1. **Failing test** at whatever seam reaches the bug (Vitest unit, integration, or e2e).
2. **CLI invocation** with a fixture input, diff stdout against a known-good snapshot.
3. **Replay a captured trace.** Save a real payload/request to disk, run it through the code in isolation.
4. **Throwaway harness.** Spin up a minimal subset of the system that triggers the bug with a single function call.
5. **Property / fuzz loop.** For "sometimes wrong output" bugs, run many random inputs.
6. **Bisection harness.** If the bug appeared between two known states, automate it so `git bisect run` works.
7. **Differential loop.** Run the same input through two versions or configs and diff the output.

Iterate on the loop itself: faster, sharper, more deterministic. A 2-second deterministic loop is a debugging superpower.

For non-deterministic bugs, raise the reproduction rate (loop 100x, parallelise, add stress) until the bug is debuggable.

If you genuinely cannot build a loop, stop and say so. List what you tried. Ask the user for a captured artifact or access. Do not proceed to hypothesise without a loop.

## Phase 2 - Reproduce

Run the loop. Watch the bug appear. Confirm:

- [ ] The failure matches what the user described, not a nearby bug
- [ ] The failure reproduces across runs (or at a high enough rate)
- [ ] You captured the exact symptom so later phases can verify the fix

## Phase 3 - Hypothesise

Generate **3-5 ranked hypotheses** before testing any of them. Single-hypothesis generation anchors on the first plausible idea.

Each hypothesis must be falsifiable: state the prediction.

> Format: "If X is the cause, then changing Y will make the bug disappear / changing Z will make it worse."

Show the ranked list to the user before testing. They often have domain knowledge that re-ranks instantly. Cheap checkpoint, big time saver.

## Phase 4 - Instrument

Each probe maps to one prediction. **Change one variable at a time.**

- One breakpoint beats ten logs.
- Use targeted logs at the boundaries that distinguish hypotheses.
- **Tag every debug log** with a unique prefix like `[DEBUG-a4f2]`. Cleanup at the end is a single grep.
- For performance, logs are usually wrong: establish a baseline with `performance.now()` or a profiler, then bisect.

## Phase 5 - Fix and regression test

Write the regression test **before the fix**, but only if there is a correct seam: one that exercises the real bug pattern at the right call site. A shallow seam gives false confidence.

If no correct seam exists, that itself is the finding. The architecture is preventing the bug from being locked down. Flag it.

If a correct seam exists: failing test, fix, watch it pass, re-run the Phase 1 loop.

## Phase 6 - Cleanup

- [ ] Original repro no longer reproduces
- [ ] Regression test passes (or absence is documented)
- [ ] All `[DEBUG-...]` instrumentation removed (`grep` the prefix)
- [ ] Throwaway prototypes deleted
- [ ] The hypothesis that turned out correct is stated in the commit message

Then ask: what would have prevented this bug? If the answer is architectural, surface the specifics.
