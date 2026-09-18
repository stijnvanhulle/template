# JSDoc examples and patterns

Full examples for the `@example` formats and the documentation patterns the `jsdoc` skill
summarizes.

## `@example` format

### Short one-liner: label on the `@example` line, code as inline backtick on the next line

```typescript
/**
 * @example Required parameter
 * `name: Type`
 *
 * @example Optional parameter
 * `name?: Type`
 */
```

### Multi-line: fenced code block immediately after `@example`

````typescript
/**
 * @example
 * ```ts
 * const result = buildParams(node, {
 *   paramsType: 'inline',
 * })
 * ```
 */
````

### Multiple variants: use multiple `@example` blocks

```typescript
/**
 * @example Object mode
 * `{ id, data, params }: { id: string; data: Data; params?: QueryParams }`
 *
 * @example Inline mode
 * `id: string, data: Data, params?: QueryParams`
 */
```

### Rules

| Rule                    | Correct                             | Incorrect                                    |
| ----------------------- | ----------------------------------- | -------------------------------------------- |
| Label + inline code     | `@example Required\n\`name: Type\`` | `@example \`name: Type\`` (code on tag line) |
| Multi-line code         | Fenced ` ```ts ``` ` block          | Bare code lines without a fence              |
| Short examples          | Inline backtick                     | Triple-backtick fence (too heavy)            |
| One concern per example | Separate `@example` blocks          | One example covering all cases               |

## Documentation patterns

### Simple property: always multi-line

```typescript
/**
 * Output directory for generated files.
 */
outDir?: string
```

Never use single-line `/** description */`. Always expand to multi-line.

### Property with a non-obvious default

```typescript
/**
 * Maximum number of concurrent callbacks during traversal.
 * Higher values overlap I/O-bound work, lower values save memory.
 *
 * @default 30
 */
concurrency?: number
```

Do not add `@default false` or `@default undefined` when the TypeScript type already makes the
default obvious.

### Enum or union with options

```typescript
/**
 * How path parameters are emitted in the function signature.
 * - `'object'` groups them as a single destructured parameter
 * - `'inline'` spreads them as individual parameters
 * - `'inlineSpread'` emits a single rest parameter
 */
pathParamsType: 'object' | 'inline' | 'inlineSpread'
```

### Nested properties: every field gets its own multi-line JSDoc

```typescript
names?: {
  /**
   * Name for the request body parameter.
   * @default 'data'
   */
  data?: string
  /**
   * Name for the query parameters group parameter.
   * @default 'params'
   */
  params?: string
}
```

### Function documentation

Only add JSDoc when it adds value beyond the signature:

```typescript
// No JSDoc needed: the signature is self-explanatory
function camelCase(str: string): string { ... }

// JSDoc adds value: it explains behavior and non-obvious edge cases
/**
 * Returns `true` when the schema resolves to a plain string output.
 *
 * - `string`, `uuid`, `email`, `url`, `datetime` are always plain strings.
 * - `date` and `time` are plain strings when their `representation` is `'string'`.
 */
function isStringType(node: SchemaNode): boolean { ... }
```
