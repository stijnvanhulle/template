import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))

const manifests = [
  { packageJson: 'tools/claude/package.json', manifest: 'tools/claude/.claude-plugin/plugin.json' },
  { packageJson: 'tools/cursor/package.json', manifest: 'tools/cursor/.cursor-plugin/plugin.json' },
]

for (const { packageJson, manifest } of manifests) {
  const { version } = JSON.parse(readFileSync(`${root}${packageJson}`, 'utf-8'))
  const manifestPath = `${root}${manifest}`
  const manifestText = readFileSync(manifestPath, 'utf-8')
  const currentVersion = JSON.parse(manifestText).version

  if (currentVersion === version) {
    console.log(`${manifest} is already at ${version}`)
    continue
  }

  // A targeted replace keeps the file's existing formatting (single-line arrays, key
  // order) intact instead of re-serializing the whole document.
  const updated = manifestText.replace(/"version":\s*"[^"]*"/, `"version": "${version}"`)
  writeFileSync(manifestPath, updated)
  console.log(`Synced ${manifest} to ${version}`)
}
