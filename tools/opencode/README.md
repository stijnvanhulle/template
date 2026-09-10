# stijnvanhulle OpenCode toolkit

A reusable toolkit for TypeScript monorepos: writing-voice skills and
the conventions (code style, JSDoc, markdown, plain language, security, testing, USA English).

OpenCode reads `AGENTS.md` natively and uses a command syntax with `description` frontmatter,
`$ARGUMENTS`, `` !`command` ``, and `@file`, so `commands/` is a symlink to `../claude/commands`
rather than a copy, and the two can never drift. Only the subagent needed its own file, because
OpenCode expects `mode: subagent` and a `permission` block instead of a `tools` list.

## What you get

Slash commands:

- `/branch [issue or description]` cuts a Conventional Commit branch from the issue it belongs to.
- `/changeset [patch|minor|major]` creates Changesets for affected packages.
- `/deslop [path]` removes AI-generated code slop from the branch's changes.
- `/humanizer [path]` removes AI writing patterns from the prose the branch changed.
- `/issue [what it is about]` opens a GitHub issue with the type, labels, and fields filled in.
- `/pr [note]` runs the pre-push checks, adds a changeset when one is needed, and opens the
  pull request.

A read-only `code-reviewer` subagent reviews TypeScript changes for correctness, security, and
maintainability. Invoke it by name with `@code-reviewer`.

Skills load from `.agents/skills/`.

## Install

OpenCode reads `opencode.json` from the project root and discovers commands, agents, and skills
under `.opencode/`, so cloning the repo is the whole install:

```bash
git clone https://github.com/stijnvanhulle/template.git
```

To use it in another project, copy the repo's root `opencode.json` to that project's root and
symlink the pieces you want:

```bash
mkdir -p .opencode
ln -s ../path/to/template/tools/opencode/commands .opencode/commands
ln -s ../path/to/template/tools/opencode/agents .opencode/agents
ln -s ../path/to/template/.agents/skills .opencode/skills
```

OpenCode accepts both plural and singular directory names, but plural is the current standard
and what this repo uses.

## Usage

```text
/deslop                    # strip AI code slop from the whole branch diff
/deslop apps/web           # limit it to one path
/humanizer docs            # rewrite the prose the branch changed under docs/
/changeset minor           # add a changeset for the current changes
/pr                        # get the branch ready for review and open the PR
@code-reviewer             # hand the current diff to the review subagent
```

## Scope

The toolkit ships generic, project-agnostic content. Workspace-specific pieces (hooks and the
template repo's permissions) stay in this repo's `.claude/` and do not ship here.
