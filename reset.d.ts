/// <reference no-default-lib="true" />
/// <reference lib="esnext" />

/**
 * Copy of `@total-typescript/ts-reset`
 */
type NonFalsy<T> = T extends false | 0 | '' | null | undefined | 0n ? never : T

interface Array<T> {
  filter(predicate: BooleanConstructor, thisArg?: any): NonFalsy<T>[]
}

interface ReadonlyArray<T> {
  filter(predicate: BooleanConstructor, thisArg?: any): NonFalsy<T>[]
}

interface JSON {
  parse(text: string, reviver?: (this: any, key: string, value: any) => any): unknown
}
