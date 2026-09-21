# @stijnvanhulle/template-claude-plugin

## 1.1.0

### Minor Changes

- [#229](https://github.com/stijnvanhulle/template/pull/229) [`a257779`](https://github.com/stijnvanhulle/template/commit/a257779fce73ecd4dd9d4ecb256ede3d48a9690f) Thanks [@stijnvanhulle](https://github.com/stijnvanhulle)! - Drop the `backlog`, `deslop`, and `humanizer` commands, which showed up twice in the slash menu next to the skills of the same name.
  
  - Reach all three through their skills, which the slash menu already lists.
  - Keep the four `create-*` commands, and stop on the `ask` skill instead of guessing a bump,
    tracker, type, or dirty working tree.
  - Remove the Gemini CLI and OpenCode integrations. The toolkit now supports Claude Code,
    Cursor, and Codex.

## 1.0.0

### Major Changes

- [#226](https://github.com/stijnvanhulle/template/pull/226) [`e0639c2`](https://github.com/stijnvanhulle/template/commit/e0639c2936bad332a9fd7d95aa80bca796a85bab) Thanks [@stijnvanhulle](https://github.com/stijnvanhulle)! - Fold the `ponytail` skill and its `/ponytail` command into `deslop`, so one skill and one
  `/deslop` command run both checks in a single pass.
  
  - Runs the reuse-first decision ladder (over-engineering: unneeded deps, wrappers, config)
    alongside the existing AI style-tell checklist (needless comments, defensive checks, `any`
    casts).
  - Lists every finding with the file, what it violates, and the proposed fix, then asks before
    changing anything, using a native picker where the client has one and a lettered list
    otherwise. `deslop` used to apply its fixes directly; it now asks first, matching how
    `ponytail` already worked.
  - Applies only the findings you confirm.
  
  To upgrade, run `/deslop` where you used to run `/ponytail`.

### Minor Changes

- [#226](https://github.com/stijnvanhulle/template/pull/226) [`e0639c2`](https://github.com/stijnvanhulle/template/commit/e0639c2936bad332a9fd7d95aa80bca796a85bab) Thanks [@stijnvanhulle](https://github.com/stijnvanhulle)! - The `user-questions` rule now says to always reach for the native picker (`AskUserQuestion` or
  a client's equivalent) when a task is blocked on information only the user can supply, instead
  of reserving it for a fixed-choice fork.
  
  - Covers open-ended requests too: offer your best-guess options and let `Other` carry the real
    answer, rather than falling back to a plain question.
  - The one carve-out is a secret or credential (an API key, a token, a password), which stays a
    plain question and is never echoed back or offered as a guessable option.

- [#226](https://github.com/stijnvanhulle/template/pull/226) [`e0639c2`](https://github.com/stijnvanhulle/template/commit/e0639c2936bad332a9fd7d95aa80bca796a85bab) Thanks [@stijnvanhulle](https://github.com/stijnvanhulle)! - `code-reviewer` now folds `deslop`'s reuse-first ladder and AI style tells, `jsdoc`'s
  conventions, `humanizer`'s pattern list, and `documentation`'s style guide into its review, in
  that order, then asks which findings to hand off for fixing.
  
  - Stays read-only: it reports findings by these skills' criteria instead of applying their
    fixes, then follows the `user-questions` rule to ask which of `deslop`, `jsdoc`, `humanizer`,
    or `documentation` you want run next.
  - A pass with nothing in its category (no exported symbols touched, no prose changed) is
    skipped rather than forced.

- [#226](https://github.com/stijnvanhulle/template/pull/226) [`e0639c2`](https://github.com/stijnvanhulle/template/commit/e0639c2936bad332a9fd7d95aa80bca796a85bab) Thanks [@stijnvanhulle](https://github.com/stijnvanhulle)! - `deslop` now runs the `humanizer` pattern list as a third pass over any changed README, doc,
  comment block, or other user-facing markdown in the diff, alongside its existing reuse-first
  ladder and code style-tell checks.
  
  - One `/deslop` run now covers over-engineering, code style tells, and AI writing tells in
    prose, instead of needing a separate `/humanizer` pass for prose changes.
  - `humanizer` still works standalone for prose review outside a code diff.

### Patch Changes

- [#226](https://github.com/stijnvanhulle/template/pull/226) [`e0639c2`](https://github.com/stijnvanhulle/template/commit/e0639c2936bad332a9fd7d95aa80bca796a85bab) Thanks [@stijnvanhulle](https://github.com/stijnvanhulle)! - Cut the token cost of the `jsdoc` and `pr` skills without dropping any guidance.
  
  - Moved the `jsdoc` skill's full `@example` gallery and documentation patterns into
    `references/examples.md`, so the default load only carries the tag tables, guidelines, and tag
    order.
  - Shortened the `jsdoc` skill's frontmatter description, since it stays in context in every
    `<skills>` listing whether or not the skill loads.
  - Tightened repetitive prose across the `pr` skill's steps, keeping every check and guardrail.

## 0.6.0

### Minor Changes

- [#223](https://github.com/stijnvanhulle/template/pull/223) [`2a33c3c`](https://github.com/stijnvanhulle/template/commit/2a33c3c271c1d56d42a58a8126831c16fab5675f) Thanks [@stijnvanhulle](https://github.com/stijnvanhulle)! - The `issue` skill now files Jira tickets alongside GitHub issues, and its templates move into the
  skill itself.
  
  - Adds a story, bug, and epic template for Jira, using `createJiraIssue`, `editJiraIssue`, and
    `searchJiraIssuesUsingJql`.
  - Adds a "pick the tracker" table so the skill routes GitHub issues and Jira tickets to the right
    template.
  - Moves the GitHub bug and feature bodies from `.github/ISSUE_TEMPLATE/` into
    `.agents/skills/issue/templates/`, so every consuming repo gets a body shape even without its
    own issue forms.

- [#223](https://github.com/stijnvanhulle/template/pull/223) [`2a33c3c`](https://github.com/stijnvanhulle/template/commit/2a33c3c271c1d56d42a58a8126831c16fab5675f) Thanks [@stijnvanhulle](https://github.com/stijnvanhulle)! - Adds a `user-questions` convention rule so every skill asks the user a short, concrete question
  instead of an open paragraph when a task has a few known paths.
  
  - Uses the native multiple-choice tool (`AskUserQuestion` in Claude Code and Claude Desktop)
    where the client supports it, and falls back to a lettered list in plain text for Codex,
    Cursor, Gemini CLI, and OpenCode.
  - Applies to every request, alongside `plain-language`, `security`, and `usa-english`.
  - Updates the `backlog` skill's per-issue confirmation to point at the fallback for clients
    without a native picker.

## 0.5.0

### Minor Changes

- [#217](https://github.com/stijnvanhulle/template/pull/217) [`586ad8c`](https://github.com/stijnvanhulle/template/commit/586ad8ca2b1f264a59573a6624d598079b15d3f7) Thanks [@stijnvanhulle](https://github.com/stijnvanhulle)! - Add the `branch` skill and the `/branch` command
  
  `/branch` names and cuts the branch for you, from the issue the work belongs to.
  
  - Reads a GitHub issue with `gh issue view`, a ClickUp task through the ClickUp MCP server, and a Jira key from the key itself, since no Jira server is connected.
  - Picks the Conventional Commit type from the labels or the issue type, and falls back to the title.
  - Cuts `<type>/<id>-<slug>` from an up-to-date `origin/main`, so `/pr` can read the title and the `Closes` line back off it.
  
  ```bash
  /branch [#412](https://github.com/stijnvanhulle/template/issues/412)
  # fix/412-resolver-cache-miss
  ```

- [#219](https://github.com/stijnvanhulle/template/pull/219) [`1b18c7f`](https://github.com/stijnvanhulle/template/commit/1b18c7ff464758e15b4f0c88e01be96f56e4696d) Thanks [@stijnvanhulle](https://github.com/stijnvanhulle)! - Rename the `/issue` command to `/create-issue`
  
  The command name now reads as an action rather than a noun, matching how a
  user would ask for it. The `issue` skill it invokes keeps its name, so
  `.agents/skills/issue/SKILL.md` is unaffected.

- [#219](https://github.com/stijnvanhulle/template/pull/219) [`1b18c7f`](https://github.com/stijnvanhulle/template/commit/1b18c7ff464758e15b4f0c88e01be96f56e4696d) Thanks [@stijnvanhulle](https://github.com/stijnvanhulle)! - Rename the `/pr` command to `/create-pr`
  
  Matches the `/create-issue` rename: a verb-first name consistent with the
  rest of the command set. The `pr` skill it invokes keeps its name.

- [#219](https://github.com/stijnvanhulle/template/pull/219) [`1b18c7f`](https://github.com/stijnvanhulle/template/commit/1b18c7ff464758e15b4f0c88e01be96f56e4696d) Thanks [@stijnvanhulle](https://github.com/stijnvanhulle)! - Rename `/branch` and `/changeset` to `/create-branch` and `/create-changeset`
  
  Completes the verb-first rename started with `/create-issue` and
  `/create-pr`: every command in the set now reads as an action. The
  `branch` and `changeset` skills they invoke keep their names.

- [#219](https://github.com/stijnvanhulle/template/pull/219) [`1b18c7f`](https://github.com/stijnvanhulle/template/commit/1b18c7ff464758e15b4f0c88e01be96f56e4696d) Thanks [@stijnvanhulle](https://github.com/stijnvanhulle)! - Add the `backlog` skill and a new branch naming shape
  
  `backlog` works through the latest open issues one by one: run `/backlog github 10` or
  `/backlog jira` to load that many latest issues, confirm scope per issue, then implement each
  confirmed issue in its own git worktree with its own subagent.
  
  The `branch` and `pr` skills now name every branch `<category>/<ISSUE-REF>_<branch-name>`
  (`feature/DEV-2048_add-dark-mode-toggle`): category in lowercase, issue reference in uppercase,
  branch name in kebab-case, joined by an underscore. This replaces the previous
  `<type>/<id>-<slug>` shape.

## 0.4.0

### Minor Changes

- [#213](https://github.com/stijnvanhulle/template/pull/213) [`927d062`](https://github.com/stijnvanhulle/template/commit/927d062a1d4398ac3a085187560dbe8ce44dfaea) Thanks [@stijnvanhulle](https://github.com/stijnvanhulle)! - Add an `issue` skill and a `changeset` skill, both reachable as slash commands.
  
  - Adds `/issue`, which opens a GitHub issue with its type, labels, Priority, and Effort set, and says which values it guessed.
  - Adds a `changeset` skill with the layout a changeset follows: frontmatter, a one-sentence summary, bullets per user-visible change, and a before and after example.
  - Points `/changeset` at that layout, and moves the version-bump table out of the `changelog` skill.

## 0.3.1

### Patch Changes

- [#210](https://github.com/stijnvanhulle/template/pull/210) [`3e38c16`](https://github.com/stijnvanhulle/template/commit/3e38c16ea4bac4d8fbbc99e1047bea6b3b441635) Thanks [@stijnvanhulle](https://github.com/stijnvanhulle)! - The `pr` skill now runs the `humanizer` skill over the PR body and holds every output it writes
  to what a reader has to act on, so descriptions stay short and specific.

## 0.3.0

### Minor Changes

- [#206](https://github.com/stijnvanhulle/template/pull/206) [`40c5cf8`](https://github.com/stijnvanhulle/template/commit/40c5cf8bb776c3ad5b3ac5934756b6582dc029af) Thanks [@stijnvanhulle](https://github.com/stijnvanhulle)! - Add the `ponytail` skill and its `/ponytail` command, which audits a diff against a reuse-first decision ladder to catch unneeded dependencies, wrappers, and config surface before they land.

- [#205](https://github.com/stijnvanhulle/template/pull/205) [`db8c007`](https://github.com/stijnvanhulle/template/commit/db8c007dc6c54646aa64e1bf4a09bcbf091f3f5d) Thanks [@stijnvanhulle](https://github.com/stijnvanhulle)! - Remove the spec-driven workflow tryout: the `spec-driven` skill, `plans/`, and the `/spec`,
  `/plan`, `/implement`, and `/verify` commands. The `plan` output style stays for a quick, inline
  implementation plan with no file scaffolding. This drops slash commands and a skill that shipped
  in the plugin, so treat it as breaking if you relied on them.

- [#205](https://github.com/stijnvanhulle/template/pull/205) [`db8c007`](https://github.com/stijnvanhulle/template/commit/db8c007dc6c54646aa64e1bf4a09bcbf091f3f5d) Thanks [@stijnvanhulle](https://github.com/stijnvanhulle)! - Add a `/pr` command and rewrite the `pr` skill so an agent can take a branch from written code to
  an open pull request: the pre-push checks, the changeset decision, the commit and title format,
  how to fill each section of the PR template, and what to do when CI turns red.
