---
name: pr
description: Prepare, open, update, or assess a pull request, including checks, changesets, title, template, and CI.
---

# PR

Take a branch to merge-ready. Work in order; disclose any unfinished step in the PR body.

## 1. Branch

Never commit to `main`. Check where you are, and branch from an up-to-date `main` when still on
it:

```bash
git status
git branch --show-current
git fetch origin main
git switch -c <category>/<ISSUE-REF>_<branch-name> origin/main
```

Use the `branch` skill's `<category>/<ISSUE-REF>_<slug>` shape. Omit the reference when none
exists.

## 2. Checks

```bash
pnpm format && pnpm lint:fix && pnpm typecheck && pnpm test
```

Also run `pnpm build` after package-source changes. Fix failures at the source; never weaken a
type or rule, or skip a test.

## 3. Changeset

Run the `changeset` skill for versioned package changes. Docs, CI, and tests alone need none.

The Claude, Cursor, and Codex plugin manifests version through Changesets, so a change
under `tools/claude`, `tools/cursor`, or `tools/codex` needs a changeset. Never hand-edit
`version` in `.claude-plugin/plugin.json`, `.cursor-plugin/plugin.json`, or
`.codex-plugin/plugin.json`.

## 4. Commit

Use one imperative Conventional Commit per logical change, under 72 characters, no period.
Review `git diff --cached`. Never commit secrets or generated output; generate lockfiles with
pnpm.

## 5. Title and body

Title: imperative Conventional Commit, under 72 characters, no period. Derive the type from the
change or issue label, not `feature`/`hotfix`. Put `Closes #123` in the body.

Fill `.github/pull_request_template.md` without deleting sections:

- **Changes:** what changed and why, in 1–3 sentences.
- **How to test:** three clean-checkout steps ending in the expected result. If the diff cannot
  supply them, use the `ask` skill. Add screenshots for visible changes.
- **Checklist:** check only what ran; explain unchecked items.
- **Release impact:** changeset, docs-only, and breaking boxes must match the diff.
- **Impact:** who is affected and any migration.

Keep the body under 150 words when practical. Run `humanizer` over user-facing prose.

## 6. Push and open

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

Use `gh`, open ready for review, and use only existing labels. One PR does one thing.

## 7. CI and review

Fix red CI before handoff. Re-run only infrastructure failures. Reply to every review comment
with what changed and how to verify it; propose before making a large requested change.

## Guardrails

- Keep the diff scoped. No drive-by refactors or force-pushes.
- Run `humanizer` on prose and `deslop` on generated code before push.
- Use USA English in the title, body, commits, and changeset.

## Related skills

| Skill                                  | Use for                                                           |
| -------------------------------------- | ----------------------------------------------------------------- |
| [branch](../branch/SKILL.md)           | Naming and cutting the branch this PR comes from                  |
| [changeset](../changeset/SKILL.md)     | The changeset layout, bump, and wording                           |
| [changelog](../changelog/SKILL.md)     | Release-note wording                                              |
| [issue](../issue/SKILL.md)             | Opening the issue this PR closes                                  |
| [deslop](../deslop/SKILL.md)           | Stripping AI tells and over-engineering from the code in the diff |
| [humanizer](../humanizer/SKILL.md)     | Stripping AI tells from the prose in the diff                     |
| [conventions](../conventions/SKILL.md) | Code style, markdown, security, plain language                    |
| [ask](../ask/SKILL.md)                 | Picker vs lettered list when test steps cannot be derived         |
