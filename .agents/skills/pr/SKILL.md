---
name: pr
description: Open or update a pull request in this monorepo. Covers the pre-push checks, the changeset decision, Conventional Commit titles, how to fill the PR template, and what to do once CI runs. Use when asked to open a PR, push a branch for review, fix a red PR, or judge whether a branch is ready to merge.
---

# PR skill

Take a branch from "the code is written" to "a reviewer can merge this". Work the steps in
order. When you cannot finish a step, say so in the PR body rather than skipping it quietly.

## When to use

- Opening a pull request, or pushing a branch you expect to become one.
- Updating a pull request after a review comment or a failing CI run.
- Answering whether a branch is ready to merge.

## Keep every output short

The title, the body, the commits, the review replies, and what you report back in chat all
follow one rule: lead with what changed, keep what the reader has to act on, cut the rest. Aim
for a PR body under 150 words. Run the `humanizer` skill over anything you write for a person.

## 1. Confirm the branch

Never commit to `main`. Check where you are, and branch from an up-to-date `main` if you are
still on it:

```bash
git status
git branch --show-current
git fetch origin main
git switch -c <category>/<ISSUE-REF>_<branch-name> origin/main
```

`<category>/<ISSUE-REF>_<branch-name>` is the GitLab shape the `branch` skill names and cuts for
you, so `feature/412_plugin-resolver-cache` or `hotfix/ABC-123_resolver-cache-miss`. `/branch`
does the step. `ISSUE-REF` is the issue this closes, uppercase, dropped out when there is none.

## 2. Run the checks before you push

Run the same sequence that `AGENTS.md`, `CONTRIBUTING.md`, and the PR template all name:

```bash
pnpm format && pnpm lint:fix && pnpm typecheck && pnpm test
```

Run `pnpm build` too when you changed package source, because local packages resolve through
their build output.

Everything has to pass before you push. Fix the root cause of a failure. Do not disable a lint
rule, loosen a type, or skip a test to get a green run.

## 3. Decide on a changeset

```bash
pnpm changeset
```

The `changeset` skill decides whether this branch needs one, which bump it takes, and how the
entry is laid out. `/changeset` does the step for you.

Both plugin manifests are versioned through Changesets, so a change under `tools/claude` or
`tools/cursor` needs its own changeset. Never hand-edit the `version` field in
`tools/claude/.claude-plugin/plugin.json` or `tools/cursor/.cursor-plugin/plugin.json`. A change
under `.agents/skills/` also ships in the Codex and Gemini toolkits, so bump `version` by hand in
`.codex-plugin/plugin.json` and `gemini-extension.json` in the same PR.

## 4. Commit

One Conventional Commit per logical change, in the imperative, with no trailing period:

```
feat(core): add a plugin resolver cache
```

Check `git diff --cached` before every commit. Never commit a secret, a token, a `.env` file, or
a build artifact. Regenerate a lockfile with pnpm rather than editing it.

## 5. Write the title and body

### Title

One Conventional Commit line, imperative, under 72 characters, no trailing period. It becomes
the squash-merge commit, so write it for whoever reads the changelog later.

The branch category (`feature`, `hotfix`, `release`) is too coarse for a Conventional Commit
type, so read the type the same way the `branch` skill's step 2 does, off the issue's labels or
the change itself, rather than off the branch prefix:

1. Pick the type: `feat`, `fix`, `docs`, `chore`, `refactor`, `test`, or `perf`.
2. Drop the issue reference from the branch name, then turn the kebab-case rest into a sentence,
   imperative and in the present tense.
3. Add the scope in parentheses when the change sits in one package.

`hotfix/412_resolver-cache-miss`, labeled `bug`, becomes `fix(core): resolve cache misses on
nested plugins`, closing #412.

Put the issue number in the body with `Closes #123`, not in the title.

### Body

Fill `.github/pull_request_template.md`. Keep its headings and their order, replace each HTML
comment with real content, and delete no section. Write a body a reviewer gets in one read.

Under **Changes**, write one to three sentences. Lead with what changed, then why. Name the
package or file a reviewer should open first. Add `Closes #123` when the PR closes an issue.

Under **Checklist**, tick a box only for something you actually did on this branch. An unticked
box with a one-line reason under it is honest and useful. A ticked box you did not verify costs
a reviewer their trust, so it is the one thing never to do here.

Under **Release impact**, tick the changeset box when `.changeset/` gained a file in this branch,
and the docs box when no published package changed.

Run the `humanizer` skill over the body before you open the PR, and fix the tells it surfaces.
The ones that show up most here: an opener that restates the title, a closing paragraph that
repeats the opener, words such as `comprehensive` and `robust`, bold mid-sentence, and a dash
joining two clauses. Cut background the reviewer already has, options you ruled out, and any
sentence that names no file, command, or result.

### How to test

Three lines, replacing the placeholders:

- Step 1: [Clear reproduction step]
- Step 2: [Next step]
- Step 3: [Expected result]

Use a real command or path, starting from a clean checkout. Fix the steps someone hands you
rather than pasting them as they are: add the missing prerequisite, put them in order, name the
expected result. Ask for steps when you cannot derive them from the diff. Add a screenshot for a
visible change, and a before and after when you changed something that already existed.

### Impact

One line. Say who this reaches: someone using the published package, someone consuming the
generated output, or nobody outside this repo. Name the migration step when the change breaks
someone.

## 6. Push and open the PR

```bash
git fetch origin main
git pull --ff-only
git push -u origin <branch>

gh pr create \
  --base main \
  --title "<conventional commit title>" \
  --body-file <body>.md \
  --assignee @me
```

Use the `gh` CLI rather than a GitHub MCP server or any other bot token, so the PR is authored by
whoever ran it and lands in their own list.

Open it ready for review, not draft. Mark a draft ready with `gh pr ready` once the branch is
finished and the checks pass.

Add a label the repo already uses. `gh label list` shows them, and inventing one is worse than
leaving the PR unlabeled.

Squash the commits and delete the branch on merge, which `gh pr merge --squash --delete-branch`
does in one step. When you do not have merge rights, say in the body that the PR is meant to be
squashed.

One PR does one thing. When you notice unrelated work along the way, leave it out and mention it
in the body instead.

## 7. After CI runs

A red PR is work now, whatever its review state.

Read the failing job, reproduce the failure locally, fix the cause, and push again. Re-running a
job is only worth it when the failure never reached a test body, such as a checkout or install
error, or when the same commit passed before.

Answer every review comment in a sentence or two: what you changed, and how the reviewer can
check it. Push the fix for a small, local ask. For a larger ask, reply with what you propose and
let the author decide.

## Guardrails

- Keep the diff to what was asked. Drive-by refactors belong in their own PR.
- Never force-push a branch someone else may have checked out.
- Run the `humanizer` skill over the PR body, the changeset, and any user-facing markdown in
  the diff.
- Run the `deslop` skill over generated code before you push.
- Use USA English in the title, body, commits, and changeset.

## Related skills

| Skill | Use for |
| --- | --- |
| [branch](../branch/SKILL.md) | Naming and cutting the branch this PR comes from |
| [changeset](../changeset/SKILL.md) | The changeset layout, bump, and wording |
| [changelog](../changelog/SKILL.md) | Release-note wording |
| [issue](../issue/SKILL.md) | Opening the issue this PR closes |
| [deslop](../deslop/SKILL.md) | Stripping AI tells from the code in the diff |
| [humanizer](../humanizer/SKILL.md) | Stripping AI tells from the prose in the diff |
| [conventions](../conventions/SKILL.md) | Code style, markdown, security, plain language |
