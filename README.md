<div align="center">
  <h1>Template</h1>

<p>
    Modern monorepo template with Turborepo, PNPM, and Changesets
  </p>

<!-- Badges -->
<p>
  <a href="https://www.npmjs.com/package/@stijnvanhulle/template-demo">
    <img alt="npm verssion" src="https://img.shields.io/npm/v/@stijnvanhulle/template-demo?style=for-the-badge"/>
  </a>

<a href="https://www.npmjs.com/package/@stijnvanhulle/template-demo">
    <img alt="npm downloads" src="https://img.shields.io/bundlephobia/min/@stijnvanhulle/template-demo?style=for-the-badge"/>
  </a>

<a href="https://www.npmjs.com/package/@stijnvanhulle/template-demo">
    <img alt="npm downloads" src="https://img.shields.io/npm/dm/@stijnvanhulle/template-demo?style=for-the-badge"/>
  </a>
</p>

<h4>
    <a href="https://github.com/stijnvanhulle/template/">View Demo</a>
  <span> · </span>
    <a href="https://github.com/stijnvanhulle/template">Documentation</a>
  <span> · </span>
    <a href="https://github.com/stijnvanhulle/template/issues/">Report Bug</a>
  <span> · </span>
    <a href="https://github.com/stijnvanhulle/template/issues/">Request Feature</a>
  </h4>
</div>

<br />

<!-- Table of Contents -->
## :notebook_with_decorative_cover: Table of Contents

- [About the Project](#star2-about-the-project)
  - [Features](#dart-features)
  - [Tech Stack](#space_invader-tech-stack)
  - [Package Structure](#package-package-structure)
- [Getting Started](#toolbox-getting-started)
  - [Prerequisites](#bangbang-prerequisites)
  - [Installation](#gear-installation)
  - [Running Locally](#running-running-locally)
- [Usage](#eyes-usage)
  - [Available Scripts](#available-scripts)
  - [Development Workflow](#development-workflow)
- [Contributing](#wave-contributing)
- [License](#warning-license)

<!-- About the Project -->
## :star2: About the Project

A production-ready monorepo template built with modern tooling and best practices. This template is designed to help you quickly bootstrap TypeScript libraries and applications with a scalable, maintainable structure.

<!-- Features -->
### :dart: Features

- **🚀 Turborepo v2** - High-performance build system with intelligent caching and parallel execution
- **📦 PNPM Workspaces** - Fast, disk-efficient package manager with workspace support
- **🎨 Biome** - Fast, modern linter and formatter (replacing ESLint + Prettier)
- **🔷 TypeScript 5.9+** - Latest TypeScript with strict type checking
- **⚡ Vitest** - Lightning-fast unit testing with native ESM support
- **📦 tsdown** - Modern TypeScript bundler for ESM and CommonJS builds
- **📋 Changesets** - Automated versioning and changelog generation
- **🔄 Nx Graph** - Visualize your monorepo dependency graph
- **🎯 Type-safe** - End-to-end type safety across all packages
- **📝 Shared Configs** - Centralized TypeScript, Biome, and tsdown configurations

<!-- Tech Stack -->
### :space_invader: Tech Stack

<details>
  <summary>Build Tools</summary>
  <ul>
    <li><a href="https://turbo.build/">Turborepo</a> - v2.7.3</li>
    <li><a href="https://pnpm.io/">PNPM</a> - v10.24.0</li>
    <li><a href="https://tsdown.vercel.app/">tsdown</a> - TypeScript bundler</li>
  </ul>
</details>

<details>
  <summary>Language & Runtime</summary>
  <ul>
    <li><a href="https://www.typescriptlang.org/">TypeScript</a> - v5.9.3</li>
    <li><a href="https://nodejs.org/">Node.js</a> - >=20</li>
  </ul>
</details>

<details>
  <summary>Code Quality</summary>
  <ul>
    <li><a href="https://biomejs.dev/">Biome</a> - v2.3.11 - Linting & Formatting</li>
    <li><a href="https://vitest.dev/">Vitest</a> - v4.0.16 - Testing</li>
  </ul>
</details>

<details>
  <summary>Versioning & Release</summary>
  <ul>
    <li><a href="https://github.com/changesets/changesets">Changesets</a> - v2.29.8</li>
  </ul>
</details>

<!-- Package Structure -->
### :package: Package Structure

```
packages/
├── config/              # Shared configuration packages
│   ├── biome-config/   # Biome linting & formatting config
│   ├── eslint-config/  # Legacy ESLint config (if needed)
│   ├── ts-config/      # Shared TypeScript configurations
│   └── tsdown-config/  # Shared tsdown build configurations
├── core/               # Core library package
└── demo/               # Demo/example package
```

<!-- Getting Started -->
## :toolbox: Getting Started

<!-- Prerequisites -->
### :bangbang: Prerequisites

This project requires the following to be installed on your system:

- **Node.js** >= 20.0.0
- **PNPM** >= 10.0.0

You can enable PNPM using Corepack (comes with Node.js):

```bash
corepack enable
corepack prepare pnpm@10.24.0 --activate
```

<!-- Installation -->
### :gear: Installation

Clone the repository and install dependencies:

```bash
# Clone the repository
git clone https://github.com/stijnvanhulle/template.git

# Navigate to the directory
cd template

# Install dependencies
pnpm install
```

<!-- Running Locally -->
### :running: Running Locally

Build all packages:

```bash
pnpm run build
```

Watch mode for development:

```bash
pnpm run start
```

<!-- Usage -->
## :eyes: Usage

### Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm run build` | Build all packages in the monorepo |
| `pnpm run clean` | Remove all build artifacts |
| `pnpm run start` | Start all packages in watch mode |
| `pnpm run test` | Run all tests with coverage |
| `pnpm run test:watch` | Run tests in watch mode |
| `pnpm run typecheck` | Type-check all packages |
| `pnpm run lint` | Lint all files with Biome |
| `pnpm run lint:fix` | Auto-fix linting issues |
| `pnpm run format` | Format all files with Biome |
| `pnpm run graph` | Visualize monorepo dependency graph with Nx |
| `pnpm run changeset` | Create a new changeset for versioning |
| `pnpm run version` | Version packages based on changesets |
| `pnpm run release` | Publish packages to npm |

### Development Workflow

1. **Create a new package**: Add a new directory under `packages/`
2. **Make changes**: Develop your features
3. **Test**: Run `pnpm run test` to ensure everything works
4. **Type-check**: Run `pnpm run typecheck` to verify types
5. **Lint**: Run `pnpm run lint:fix` to fix any linting issues
6. **Create changeset**: Run `pnpm run changeset` to document your changes
7. **Build**: Run `pnpm run build` to build all packages
8. **Version**: Run `pnpm run version` to bump versions
9. **Release**: Run `pnpm run release` to publish

#### Adding a Changeset

When you make changes that should be published, create a changeset:

```bash
pnpm run changeset
```

Follow the prompts to:
1. Select which packages have changed
2. Specify the type of change (major, minor, patch)
3. Write a summary of the changes

#### Visualizing Dependencies

View your monorepo's dependency graph:

```bash
pnpm run graph
```

This opens an interactive visualization of how your packages depend on each other.

<!-- Contributing -->
## :wave: Contributing

Contributions are always welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

<!-- License -->
## :warning: License

Distributed under the MIT License. See `LICENSE` for more information.
