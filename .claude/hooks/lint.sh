#!/bin/bash
source "$(dirname "$0")/_common.sh"

# Stop hook: format and lint the workspace once Claude finishes a turn.
# Non-blocking; surfaces problems without failing the session.
hook_cd_project

pnpm format || true
pnpm lint || true
