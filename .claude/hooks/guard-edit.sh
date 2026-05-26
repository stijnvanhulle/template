#!/bin/bash
source "$(dirname "$0")/_common.sh"

# PreToolUse guard for Edit/Write: deny hand-edits to the lockfile and to
# generated build output via exit code 2.
file=$(hook_file_path)
[ -z "$file" ] && exit 0

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
