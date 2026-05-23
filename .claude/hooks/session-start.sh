#!/bin/bash
set -euo pipefail

# Install workspace dependencies so tests, linters and typechecks work in
# Claude Code on the web. Only runs in remote sessions; local dev manages its own deps.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "${CLAUDE_PROJECT_DIR:-.}"

pnpm install --frozen-lockfile
