---
name: grill
description: "Interview the user about a plan or design one question at a time, with a recommended answer for each, until every branch of the decision tree is resolved. Use when the user asks to stress-test a plan, says 'grill me', or before committing to a non-trivial design."
---

# Grill

A structured interview that resolves a design before any code is written.

## How it works

- Ask **one question at a time** and wait for the answer before continuing.
- For each question, **propose your recommended answer** with the reasoning. The user can accept, adjust, or override.
- Walk down each branch of the decision tree. Resolve dependencies between decisions in order, so later questions assume the earlier answers.
- When a question can be answered by reading the code, read the code instead of asking.

## Things to probe

- **Vocabulary** - call out terms that are vague, overloaded, or conflict with how the codebase already uses them. "You said 'account' - do you mean the Customer or the User?"
- **Edge cases** - invent concrete scenarios that force precision about boundaries. Empty input, concurrent writes, partial failure, the long-tail user.
- **Contradictions** - if the user's description disagrees with the code, surface it. "Your code cancels whole orders, but you said partial cancellation works - which is right?"
- **Trade-offs** - when there are real alternatives, name them and ask which trade-off we're accepting.

## When to stop

When the next question is no longer changing anything: answers are predictable from earlier ones, and you and the user agree on the shape of the thing.

## After the session

- If the result is large enough to warrant a paper trail, hand off to `spec-driven` and capture the decisions in `plans/<feature>/spec.md` and `research.md`.
- If it's a small change, summarise the decisions in the commit or PR description so the reasoning is preserved.

## Related skills

| Skill | Use for |
| --- | --- |
| [spec-driven](../spec-driven/SKILL.md) | Capture the grilled plan as a spec + slices |
| [prototype](../prototype/SKILL.md) | When a question is faster to answer with code than with discussion |
