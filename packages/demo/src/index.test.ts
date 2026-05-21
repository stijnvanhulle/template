import { expect, test } from 'vitest'
import { helloWorld } from './index.ts'

test('Demo', () => {
  expect(helloWorld).toBe('Hello World Core!')
})
