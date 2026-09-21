# @stijnvanhulle/template-codex-plugin

## 1.1.0

### Minor Changes

- [#229](https://github.com/stijnvanhulle/template/pull/229) [`a257779`](https://github.com/stijnvanhulle/template/commit/a257779fce73ecd4dd9d4ecb256ede3d48a9690f) Thanks [@stijnvanhulle](https://github.com/stijnvanhulle)! - Drop the `backlog`, `deslop`, and `humanizer` commands, which showed up twice in the slash menu next to the skills of the same name.
  
  - Reach all three through their skills, which the slash menu already lists.
  - Keep the four `create-*` commands, and stop on the `ask` skill instead of guessing a bump,
    tracker, type, or dirty working tree.
  - Remove the Gemini CLI and OpenCode integrations. The toolkit now supports Claude Code,
    Cursor, and Codex.
