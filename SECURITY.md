# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| latest  | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability, please email
[stijn.vanhulle@gmail.com](mailto:stijn.vanhulle@gmail.com) instead of opening
a public issue. We'll respond as quickly as possible.

## CI / supply-chain posture

This template ships with a CI configuration designed to resist common
GitHub Actions attack vectors — in particular [cache poisoning][cache-post]
and untrusted PR code execution.

| Mitigation | Where |
|---|---|
| All third-party actions pinned to a full commit SHA | every workflow |
| `permissions: {}` at workflow root; minimal scopes per job | every workflow |
| `persist-credentials: false` on `actions/checkout` whenever the job does not push back | `pr.yml`, `autofix.yml`, `copilot-setup-steps.yml`, `update-agents-skills.yml` |
| OIDC `id-token: write` scoped to the publish job only | `release.yml` |
| Release builds opt out of the Turbo cache (`cache: 'false'`) to avoid restoring a poisoned cache during publish | `release.yml` |
| Turbo cache keys namespaced by `runner.os` + repo name + `github.ref_name` so a PR cache cannot be restored by a `main`-branch run | `.github/setup/action.yml` |
| Same-repo guard on workflows that write back (`autofix.yml`, `changeset-format.yml`, `prerelease` in `pr.yml`) — fork PRs are skipped | those workflows |
| `update-agents-skills.yml` restricted to `push` on `main` + `workflow_dispatch` so fork PRs cannot feed `skills-to-agents` | `update-agents-skills.yml` |
| `pull_request_target` only used in `labeler.yml`, where no PR code is checked out and no dependencies are installed | `labeler.yml` |
| Concurrency groups cancel superseded runs, preventing race conditions on writable jobs | every long-running workflow |
| `pnpm install --frozen-lockfile` everywhere — lockfile drift fails CI | `.github/setup/action.yml` |
| `min-package-age=72` in `.npmrc` + `minimumReleaseAge: 4320` in `pnpm-workspace.yaml` — packages published in the last 72 h are refused | repo root |
| `npm provenance` published with releases | `release.yml` |

Note that `step-security/harden-runner` and `rharkor/caching-for-turbo`
use `pre:` lifecycle hooks which GitHub does not allow inside local
composite actions. If you want runner hardening, add the action as a
step in each workflow **before** `./.github/setup` is invoked.

[cache-post]: https://neciudan.dev/github-actions-poisoning
