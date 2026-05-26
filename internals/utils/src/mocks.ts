// Mocks shared across the monorepo. Import via the "#mocks" path alias
// (configured in configs/base.json), e.g.:
//
//   import { mockUser } from '#mocks'
//
// Add common test fixtures here so they can be reused across packages
// without each package depending on each other's test files.

export const mockUser = {
  id: 'user_1',
  name: 'Stijn',
}
