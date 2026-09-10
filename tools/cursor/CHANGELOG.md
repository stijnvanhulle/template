# @stijnvanhulle/template-cursor-plugin

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
