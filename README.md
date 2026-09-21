<div align="center">

[![Stars][stars-src]][stars-href]

<h4>
  <a href="https://github.com/stijnvanhulle/template/issues/">Report bug</a>
  <span> · </span>
  <a href="https://github.com/stijnvanhulle/template/issues/">Request feature</a>
</h4>

</div>

# TypeScript monorepo template

A pnpm monorepo starter with Turborepo, strict TypeScript, oxlint, oxfmt, tsdown, Vitest,
Changesets, and GitHub Actions.

## Included

- pnpm workspaces for publishable packages and internal libraries
- Turborepo task orchestration
- ESM-only strict TypeScript configuration
- tsdown builds with type declarations
- Vitest unit tests and coverage
- oxlint and oxfmt
- Changesets releases with npm provenance
- Pull request checks, preview packages, and compressed-size reporting

## Start a project

1. Select **Use this template** on GitHub.
2. Clone the new repository.
3. Enable Corepack and install dependencies:

   ```bash
   corepack enable
   pnpm install
   ```

4. Replace `packages/core` and `packages/demo` with your packages.
5. Update these repository-specific values:
   - `package.json`: name, namespace, repository, and author
   - `.changeset/config.json`: repository and package groups
   - `configs/base.json`: TypeScript path aliases
   - `.github/labeler.yml`: package labels
6. Run the checks:

   ```bash
   pnpm build
   pnpm typecheck
   pnpm test
   pnpm lint
   pnpm format
   ```

## Optional agent setup

Reusable skills, rules, commands, and subagents live in
[`stijnvanhulle/agents`](https://github.com/stijnvanhulle/agents), not in this template.

Claude Code:

```bash
claude plugin marketplace add stijnvanhulle/agents
claude plugin install agents@stijnvanhulle
```

Cursor:

```bash
agent plugin marketplace add https://github.com/stijnvanhulle/agents
agent plugin install agents@stijnvanhulle
```

Codex:

```bash
codex plugin marketplace add stijnvanhulle/agents
codex plugin add agents@stijnvanhulle
```

The local `AGENTS.md` remains specific to this monorepo. Claude hooks and permissions under
`.claude/` also stay local because they run this repository's pnpm checks.

## Commands

| Command | Purpose |
| --- | --- |
| `pnpm build` | Build publishable and internal packages |
| `pnpm typecheck` | Type-check all workspace packages |
| `pnpm test` | Run Vitest once |
| `pnpm test:watch` | Run Vitest in watch mode |
| `pnpm lint` | Check package source with oxlint |
| `pnpm lint:fix` | Fix lint findings |
| `pnpm format` | Format packages, internals, and configs |
| `pnpm changeset` | Add a release changeset |
| `pnpm clean` | Remove package build output |
| `pnpm upgrade` | Find dependency updates after a three-day soak period |

## Releases

Add and commit a changeset with a package change:

```bash
pnpm changeset
```

When changesets land on `main`, the release workflow opens a Version Packages PR. Merging it
publishes the affected packages to npm with provenance.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for the repository structure and development workflow.

## License

[MIT](LICENSE) © Stijn Van Hulle

[stars-src]: https://shieldcn.dev/github/stars/stijnvanhulle/template.svg?variant=secondary&size=xs&theme=zinc&mode=dark
[stars-href]: https://github.com/stijnvanhulle/template
