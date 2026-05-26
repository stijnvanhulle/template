#!/bin/bash
source "$(dirname "$0")/_common.sh"

# Format the file Claude just edited in place with oxfmt (JS/TS only).
file=$(hook_file_path)
[ -z "$file" ] && exit 0

case "$file" in
  *.ts | *.tsx | *.js | *.jsx | *.mjs | *.cjs) ;;
  *) exit 0 ;;
esac

hook_cd_project
if [ -x node_modules/.bin/oxfmt ]; then
  node_modules/.bin/oxfmt -c oxfmt.config.ts "$file" || true
fi
