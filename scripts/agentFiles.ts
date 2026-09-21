/**
 * Verifies the agent files that cannot be symlinks.
 *
 * Claude and Codex share commands through symlinks. Cursor needs commands and rules in its own
 * format, so those copies are checked for parity rather than shared.
 *
 * Run with no arguments, which is what CI does.
 */
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const rules = '.agents/skills/conventions/rules'
const mirrors = 'tools/cursor/rules'

const commandDirs = ['tools/claude/commands', 'tools/cursor/commands']

const read = (...parts: Array<string>) => readFileSync(join(root, ...parts), 'utf8')

const namesIn = (dir: string, extension: string) =>
  readdirSync(join(root, dir))
    .filter((file) => file.endsWith(extension))
    .map((file) => file.slice(0, -extension.length))
    .sort()

const stripFrontmatter = (source: string) => source.replace(/^---\n[\s\S]*?\n---\n/, '').trim()

const frontmatter = (source: string) => source.match(/^---\n([\s\S]*?)\n---\n/)?.[1] ?? ''

/**
 * The globs a rule is scoped to, from either spelling: a `paths:` list in the rule or a
 * `globs:` comma list in the Cursor mirror. Empty means the rule applies to every request.
 */
const scopeOf = (source: string) => {
  const front = frontmatter(source)

  if (/^alwaysApply: true$/m.test(front)) {
    return []
  }

  const listed = [...front.matchAll(/^\s*-\s*"(.+)"$/gm)].map((match) => match[1])
  const inline = front.match(/^globs:\s*(.+)$/m)?.[1].split(',') ?? []

  return [...listed, ...inline].map((glob) => glob.trim()).filter(Boolean).sort()
}

/** Every agent has to expose the same commands, each carrying a real body. */
const checkCommands = () => {
  const [canonical, ...rest] = commandDirs
  const expected = namesIn(canonical, '.md')

  const parity = rest.flatMap((dir) => {
    const actual = namesIn(dir, '.md')

    return [
      ...expected.filter((name) => !actual.includes(name)).map((name) => `${dir} is missing ${name}`),
      ...actual.filter((name) => !expected.includes(name)).map((name) => `${dir}/${name} matches no command`),
    ]
  })

  return parity
}

/** Cursor keeps copies of the rules, so both the body and the scope have to match. */
const checkRules = () => {
  const expected = namesIn(rules, '.md')
  const actual = namesIn(mirrors, '.mdc')

  return [
    ...actual.filter((name) => !expected.includes(name)).map((name) => `${mirrors}/${name}.mdc mirrors no rule`),
    ...expected.flatMap((name) => {
      if (!actual.includes(name)) {
        return [`${mirrors} is missing the ${name} rule`]
      }

      const rule = read(rules, `${name}.md`)
      const mirror = read(mirrors, `${name}.mdc`)

      return [
        stripFrontmatter(mirror) === stripFrontmatter(rule) ? '' : `${mirrors}/${name}.mdc has drifted from the rule it mirrors`,
        scopeOf(mirror).join() === scopeOf(rule).join() ? '' : `${mirrors}/${name}.mdc is scoped differently from the rule`,
      ].filter(Boolean)
    }),
  ]
}

const problems = [...checkCommands(), ...checkRules()]

if (problems.length > 0) {
  console.error(problems.map((problem) => `- ${problem}`).join('\n'))
  process.exit(1)
}

console.log(`agent files in sync (${commandDirs.length} command sets)`)
