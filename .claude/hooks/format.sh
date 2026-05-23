#!/bin/bash
set -euo pipefail

# Format the file Claude just edited in place with oxfmt (JS/TS only).
# Reads the PostToolUse payload from stdin.
file=$(jq -r '.tool_input.file_path // empty')
if [ -z "$file" ]; then
  exit 0
fi

case "$file" in
  *.ts | *.tsx | *.js | *.jsx | *.mjs | *.cjs) ;;
  *) exit 0 ;;
esac

cd "${CLAUDE_PROJECT_DIR:-.}"
if [ -x node_modules/.bin/oxfmt ]; then
  node_modules/.bin/oxfmt -c oxfmt.config.ts "$file" || true
fi
