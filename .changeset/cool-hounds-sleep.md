---
"@stijnvanhulle/template-claude-plugin": minor
"@stijnvanhulle/template-cursor-plugin": minor
---

Add the `branch` skill and the `/branch` command

`/branch` names and cuts the branch for you, from the issue the work belongs to.

- Reads a GitHub issue with `gh issue view`, a ClickUp task through the ClickUp MCP server, and a Jira key from the key itself, since no Jira server is connected.
- Picks the Conventional Commit type from the labels or the issue type, and falls back to the title.
- Cuts `<type>/<id>-<slug>` from an up-to-date `origin/main`, so `/pr` can read the title and the `Closes` line back off it.

```bash
/branch #412
# fix/412-resolver-cache-miss
```
