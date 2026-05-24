# Draft: roll the template AI setup out to the other repos

Status: draft, tracked in the template repo for now. The `template` repo is the reference (the
target state). This document lists the changes needed in `kubb`, `plugins`, and `platform` to
match it. Nothing here is applied yet.

## Target state (what template has)

- `AGENTS.md` canonical, with `CLAUDE.md`, `GEMINI.md`, and `.github/copilot-instructions.md` as
  git symlinks to it (mode 120000).
- Skills in `.agents/skills/` (open `SKILL.md` format), with `.claude/skills` symlinked there.
- `.claude/rules/` (always-on or path-scoped): `code-style`, `jsdoc`, `markdown`, `testing`,
  `security`.
- `.claude/commands/`: `changeset`, `spec`, `plan`, `verify`.
- `.claude/agents/code-reviewer.md` (read-only reviewer).
- `.claude/output-styles/`: `house` (default, set in settings), `plan`, `diagrams-first`.
- `.claude/hooks/`: `session-start.sh` (install deps), `format.sh` (oxfmt on edit).
- `.claude/settings.json`: permissions (allow, deny, ask), hooks, `outputStyle: house`.
- `plans/`: spec-driven workflow (`templates/` plus per-feature folders).
- `codecov.yml`, `.github/CODEOWNERS`, and a `.gitignore` rule `codecov.*` + `!codecov.yml`.
- Writing conventions: no dashes or clause-joining semicolons, sentence-case headings, no emoji,
  no marketing words (centralized in `house` + `humanizer`).

## Shared changes (all three repos)

- [ ] Move `.skills/` to `.agents/skills/` with `git mv`, then retarget the `.claude/skills`
      symlink to `../.agents/skills`. Keep symlinks as mode 120000.
- [ ] Add `GEMINI.md` symlink to `AGENTS.md`.
- [ ] Replace the standalone `.github/copilot-instructions.md` with a symlink to `../AGENTS.md`,
      moving any unique content into `AGENTS.md` first (as template did).
- [ ] Convert the `coding-style` skill to a `code-style` rule and the `jsdoc` skill to a lean
      `jsdoc` rule plus a full `jsdoc` skill (humanizer/jsdoc split pattern). Add `markdown`,
      `testing`, and `security` rules.
- [ ] Add the `humanizer` skill (lean index plus `references/`).
- [ ] Add `.claude/commands/` (`changeset`, and the `spec`/`plan`/`verify` trio if adopting the
      spec-driven workflow), `.claude/agents/code-reviewer.md`, and `.claude/output-styles/`
      (`house`, `plan`, `diagrams-first`).
- [ ] Add `.claude/hooks/` (`session-start.sh`, `format.sh`) and wire them in `settings.json`.
- [ ] Extend `settings.json` permissions (deny destructive git and secret reads, ask before
      push, allow the workflow commands) and set `outputStyle: house`.
- [ ] Optionally add the `plans/` spec-driven workflow (`templates/` plus per-feature folders).
- [ ] Apply the writing conventions to `AGENTS.md` and other docs, and dedupe so always-on
      context stays small.
- [ ] Validate skills with `skill-creator` `quick_validate.py`, run `pnpm lint:spell`, and
      confirm every symlink resolves.

## kubb

- Real plugin-generation project. Keep the project-specific `AGENTS.md` sections (High-Level
  Architecture, Plugin Ecosystem) and just apply the conventions and the structural changes
  above.
- Skills today: `changelog`, `coding-style`, `documentation`, `jsdoc`, `pr`, `testing`. After:
  `changelog`, `documentation`, `humanizer`, `jsdoc`, `pr` as skills, with `code-style`, `jsdoc`,
  `markdown`, `testing`, `security` as rules.
- Already has `codecov.yml`, `.github/CODEOWNERS`, and `.github/copilot-instructions.md`.
- Confirm Node and pnpm versions before writing the `code-style` rule facts.

## plugins

- Same shape and skill set as kubb, so the kubb changes apply directly.
- Fix first: the repo has committed Codecov uploader artifacts (`codecov`, `codecov.SHA256SUM`,
  `codecov.SHA256SUM.sig`). Remove them and add the template's `.gitignore` rule
  (`codecov.*` plus `!codecov.yml`) so only the config is tracked.

## platform

- Nuxt and Vue monorepo (docs site plus Kubb Studio). Node 24+, pnpm 10+, so adapt the
  `code-style` rule facts accordingly.
- Keep the framework skills (`nuxt`, `nuxt-ui`, `nuxthub`, `vue`, `vueuse`, `vitest`). They are
  valuable and stay as skills.
- Convert `coding-style` to a rule and `jsdoc` to rule plus skill, as elsewhere. `documentation`
  stays a skill. Add `markdown`, `testing`, `security` rules.
- It has no `.claude/settings.json` today, so add one (permissions, hooks, `outputStyle`).
- `AGENTS.md` is the largest (167 lines), so apply the conventions and trim where it duplicates
  the README.

## Per-repo verification

- [ ] `readlink` shows `CLAUDE.md`, `GEMINI.md`, `.github/copilot-instructions.md`, and
      `.claude/skills` resolving correctly (mode 120000).
- [ ] All skills pass `skill-creator` `quick_validate.py`.
- [ ] `settings.json` is valid JSON and the hooks run.
- [ ] `pnpm lint:spell` is clean and no dashes-as-punctuation or clause-joining semicolons remain
      in the touched docs.
- [ ] A fresh session lists the skills, agent, commands, output styles, and loads the rules.

## Rollout notes

- Do one repo at a time on its `claude/claude-directory-structure-UFGMC` branch, smallest first
  (plugins or kubb), then platform.
- The `house`, `plan`, `diagrams-first`, `humanizer`, and `spec-driven` files are generic and can
  be copied from the template with minimal edits. The rules need the per-repo facts (Node and
  pnpm versions, framework notes).
