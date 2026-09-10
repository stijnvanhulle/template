# @stijnvanhulle/template-cursor-plugin

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
