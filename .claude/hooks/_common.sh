# Shared helpers for Claude Code hooks. Source this, do not execute it.
# shellcheck shell=bash
set -euo pipefail

# cd into the repo root the hook runs against.
hook_cd_project() {
  cd "${CLAUDE_PROJECT_DIR:-.}"
}

# Echo the edited file path from the tool payload on stdin (empty if absent).
# Consumes stdin, so call it once per hook.
hook_file_path() {
  jq -r '.tool_input.file_path // empty' 2>/dev/null || true
}
