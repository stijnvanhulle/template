#!/bin/bash
source "$(dirname "$0")/_common.sh"

# Render the Claude Code status line: model, git branch, and pnpm workspace dir.
# Reads the status-line payload from stdin.
payload=$(cat)

model=$(printf '%s' "$payload" | jq -r '.model.display_name // "Claude"' 2>/dev/null || echo "Claude")
cwd=$(printf '%s' "$payload" | jq -r '.workspace.current_dir // empty' 2>/dev/null || true)
cwd="${cwd:-$PWD}"

dir=$(basename "$cwd")
branch=$(git -C "$cwd" rev-parse --abbrev-ref HEAD 2>/dev/null || true)

if [ -n "$branch" ]; then
  printf '%s · %s · %s' "$model" "$dir" "$branch"
else
  printf '%s · %s' "$model" "$dir"
fi
