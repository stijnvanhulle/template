# stijnvanhulle Claude Code plugin

A reusable toolkit for TypeScript monorepos: writing-voice skills and
the conventions (code style, JSDoc, markdown, plain language, security, testing, USA English).

It is published under the plugin name `toolkit` from the `stijnvanhulle` marketplace, so the
install reads as `toolkit@stijnvanhulle`.

## What you get

Slash commands for release and review housekeeping:

- `/branch [issue or description]` cuts a Conventional Commit branch from the issue it belongs to.
- `/changeset [patch|minor|major]` creates Changesets for affected packages.
- `/deslop [path]` removes AI-generated code slop from the branch's changes.
- `/humanizer [path]` removes AI writing patterns from the prose the branch changed.
- `/issue [what it is about]` opens a GitHub issue with the type, labels, and fields filled in.
- `/pr [note]` runs the pre-push checks, adds a changeset when one is needed, and opens the
  pull request.

Skills loaded on demand from their descriptions:

- `branch` names and cuts a branch from a GitHub, ClickUp, or Jira issue.
- `changelog` turns commit history into a user-facing changelog.
- `changeset` is the layout and wording for a changeset that reads as a release note.
- `deslop` strips AI-generated code slop from a diff, the code counterpart to `humanizer`.
- `documentation` is the writing style guide for blog posts and docs.
- `humanizer` removes AI tells from user-facing markdown.
- `issue` fills in an issue's type, labels, priority, and effort.
- `jsdoc` covers JSDoc tags and examples for TypeScript.
- `pr` is the PR-prep and release checklist for a Changesets monorepo.
- `conventions` bundles the seven rules (code style, JSDoc, markdown, plain language,
  security, testing, USA English).

A `code-reviewer` subagent reviews TypeScript changes for correctness, security,
and maintainability. Three output styles set the writing voice (`house`),
inline implementation planning (`plan`), and a diagrams-first layout (`diagrams-first`).

## Install

Install from any shell, without opening a session:

```bash
claude plugin marketplace add stijnvanhulle/template && claude plugin install toolkit@stijnvanhulle
```

That installs to user scope. Pass `--scope project` to share it with everyone who clones the
repository, or `--scope local` to keep it to yourself in one repository. Restart Claude Code to
load it, or run `/reload-plugins` in a session that is already open.

The same two steps inside a session:

```bash
/plugin marketplace add stijnvanhulle/template
/plugin install toolkit@stijnvanhulle
```

To try it locally before publishing:

```bash
claude --plugin-dir ./tools/claude
```

## Usage

Slash commands run when you type them. In Claude Code, name the command and pass any
argument:

```bash
/deslop                    # strip AI code slop from the whole branch diff
/deslop apps/web           # limit it to one path
/humanizer docs            # rewrite the prose the branch changed under docs/
/changeset minor           # add a changeset for the current changes
/pr                        # get the branch ready for review and open the PR
```

Skills load on their own. Each carries a description, and the agent reads the matching one when
the task fits, so writing release notes pulls in `changelog` and cleaning prose pulls in
`humanizer` without being asked. To force one, name it: "use the deslop skill on this diff."

Rules need no trigger. `plain-language`, `security`, and `usa-english` apply on every request,
and the rest attach when you open a matching file. The guiding split: rules apply on their own,
skills are optional expertise loaded when relevant, and commands are actions you trigger yourself.

## Output styles

Installing the plugin already registers the three output styles (`house`, `plan`,
`diagrams-first`) for every session. Switch between them from inside a session:

```bash
/output-style house
/output-style plan
/output-style diagrams-first
```

To use `house` without installing the plugin, copy the file into your user-wide output
styles folder:

```bash
mkdir -p ~/.claude/output-styles
curl -fsSL https://raw.githubusercontent.com/stijnvanhulle/template/main/tools/claude/output-styles/house.md \
  -o ~/.claude/output-styles/house.md
```

Then set it as your default in `~/.claude/settings.json`:

```json
{
  "outputStyle": "house"
}
```

Restart Claude Code, or run `/output-style house` in an open session, to pick it up.

## Scope

The plugin ships generic, project-agnostic content. Workspace-specific pieces
(format and lint hooks, `pnpm install` session-start hook, edit guards, and the
template repo's `settings.json` permissions) stay in this repo's `.claude/` and
do not ship with the plugin.
