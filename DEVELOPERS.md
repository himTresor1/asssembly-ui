# Developing Assembly UI

This document outlines how to get started with local development in the Assembly UI monorepo.

---

## 📂 Monorepo Structure

Assembly UI uses [Turborepo](https://turborepo.org/) to manage its applications and packages:

- `apps/design-system`: Next.js-powered documentation website and interactive component playground.
- `packages/ui`: Core UI primitive component library (styled Radix primitives).
- `packages/cli`: `@assembly/cli` source code, template generators, and AI JSDoc rules injector.
- `packages/config`: Shared Tailwind/Vanilla CSS variables, colors, and global stylesheets.

---

## 🛠️ Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/himTresor1/asssembly-ui.git
cd asssembly-ui
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Run development servers

To run the design system playground locally:

```bash
pnpm dev:design-system
```

Open [http://localhost:3003](http://localhost:3003) to see the interactive design system in action.

---

## 📦 Core Tasks

### Rebuilding the Registry

The design system documents and compiles components via a static registry. If you modify or add any components or examples, you must rebuild the registry:

```bash
cd apps/design-system
pnpm build:registry
```

### Extending JSDoc / UX Rules templates

The CLI automatically reads the central UX guidelines and updates component source code JSDoc annotations when running `npx assembly-ui ai`.
If you want to modify or add new UX rules or templates:
1. Edit the core template configurations in `packages/cli/src/rules-template.ts`.
2. Run `pnpm build` in the root workspace to compile the CLI package.

---

## 🚀 Creating a Pull Request

When submitting code:
1. Ensure your changes compile successfully with `pnpm build`.
2. Run prettier formatting to ensure styling compliance.
3. Provide a clear PR description detailing your changes and their UX impacts.
