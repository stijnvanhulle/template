#!/bin/bash
source "$(dirname "$0")/_common.sh"

# Install workspace dependencies so tests, linters and typechecks work in
# Claude Code on the web. Only runs in remote sessions; local dev manages its own deps.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

hook_cd_project

# Mutable install (not --frozen-lockfile) so a forker with lockfile drift still
# gets a working session; the container caches the result after the first run.
pnpm install
