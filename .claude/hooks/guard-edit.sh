#!/bin/bash
set -euo pipefail

# PreToolUse guard for Edit/Write: block hand-edits to the lockfile and to
# generated build output. Reads the tool payload from stdin and denies via
# exit code 2 when the target is off-limits.
file=$(jq -r '.tool_input.file_path // empty' 2>/dev/null || true)
if [ -z "$file" ]; then
  exit 0
fi

case "$file" in
  *pnpm-lock.yaml)
    echo "Refusing to edit pnpm-lock.yaml directly; change package.json and run pnpm install." >&2
    exit 2
    ;;
  */dist/* | */node_modules/*)
    echo "Refusing to edit generated output ($file); edit the source instead." >&2
    exit 2
    ;;
esac

exit 0
