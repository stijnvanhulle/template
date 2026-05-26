---
'@stijnvanhulle/template-core': patch
'@stijnvanhulle/template-demo': patch
---

Resolve workspace imports from source during development and from `dist` after build, using the
`development` export condition plus tsconfig `customConditions`. The published `exports` (via
`publishConfig`) still point at `dist`, so consumers are unaffected.
