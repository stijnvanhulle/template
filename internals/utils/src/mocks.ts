// Mocks shared across the monorepo. Import via the "#mocks" subpath import
// (configured in the root package.json "imports" field), e.g.:
//
//   import { mockUser } from '#mocks'
//
// Add common test fixtures here so they can be reused across packages
// without each package depending on each other's test files.

export const mockUser = {
  id: 'user_1',
  name: 'Stijn',
}
