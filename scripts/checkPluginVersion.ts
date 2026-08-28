/**
 * Fails when a plugin's shipped content changed but its manifest version did not move.
 *
 * `claude plugin update` (and the Cursor and Codex equivalents) compare the marketplace's
 * plugin.json version to decide whether there's anything new to pull. Content can change
 * without anyone touching the version field, so a user who already has the plugin installed
 * sees "already latest" and never gets the update.
 *
 * Pass the base ref to diff against, e.g. `pnpm run plugin-version origin/main`. Falls back to
 * `GITHUB_BASE_REF` (set by GitHub Actions on pull_request events) or `origin/main`.
 */
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const base = process.argv[2] ?? (process.env.GITHUB_BASE_REF ? `origin/${process.env.GITHUB_BASE_REF}` : 'origin/main')

const plugins = [
  { manifest: 'tools/claude/.claude-plugin/plugin.json', content: ['tools/claude/', '.agents/skills/'] },
  { manifest: 'tools/cursor/.cursor-plugin/plugin.json', content: ['tools/cursor/', '.agents/skills/'] },
  { manifest: '.codex-plugin/plugin.json', content: ['.agents/skills/'] },
]

const git = (...args: Array<string>) => execFileSync('git', args, { cwd: root, encoding: 'utf8' })

const changedFiles = git('diff', '--name-only', `${base}...HEAD`)
  .split('\n')
  .filter(Boolean)

const versionAt = (ref: string, path: string) => {
  try {
    return JSON.parse(git('show', `${ref}:${path}`)).version
  } catch {
    return undefined
  }
}

const problems = plugins.flatMap(({ manifest, content }) => {
  const contentChanged = changedFiles.some((file) => file !== manifest && content.some((dir) => file.startsWith(dir)))

  if (!contentChanged) {
    return []
  }

  const before = versionAt(base, manifest)
  const after = versionAt('HEAD', manifest)

  return before === after ? [`${manifest} ships changed content but its version is still ${after}`] : []
})

if (problems.length > 0) {
  console.error(problems.map((problem) => `- ${problem}`).join('\n'))
  console.error('Bump the affected version field(s) before merging.')
  process.exit(1)
}

console.log('plugin versions in sync with their content')
