# Gold Ops Console

[![CI](https://github.com/roman3672/gold-ops-console/actions/workflows/ci.yml/badge.svg)](https://github.com/roman3672/gold-ops-console/actions/workflows/ci.yml)

**Repository:** [github.com/roman3672/gold-ops-console](https://github.com/roman3672/gold-ops-console)

A **monorepo** for a schema-driven internal control plane: a minimal B2B product surface (**Gold Workspace**), an operator console (**Ops**), a shared **HTTP API** (Fastify), a workspace **SDK** for contracts, and a small shared **UI library**.

This repository is a work-in-progress demonstration of multi-tenant SaaS operations tooling (RBAC, audit-first flows, action pipelines—see the design notes linked below).

## Prerequisites

| Tool        | Notes                                                                                                                                   |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Node.js** | `>=22.16.0` (see [`.nvmrc`](./.nvmrc) for the pinned version)                                                                           |
| **pnpm**    | `10.x`; enable via `corepack enable` then `corepack prepare pnpm@10.30.3 --activate` (or match `packageManager` in root `package.json`) |

## Quick start

```bash
pnpm install
pnpm build
pnpm dev
```

- **API:** [http://localhost:3000/health](http://localhost:3000/health) — JSON health check (includes SDK version string from `@gold-ops/sdk`).
- **Product UI (SaaS):** Vite dev server on port **5173**.
- **Ops UI:** Vite dev server on port **5174**.

`pnpm dev` runs [Turborepo](https://turbo.build) tasks in parallel. Dependency packages are built first (`^build`), so `@gold-ops/sdk` and `@gold-ops/ui` are compiled to `dist/` before apps that import them start.

## Root scripts

| Script              | Purpose                                                                     |
| ------------------- | --------------------------------------------------------------------------- |
| `pnpm build`        | Production-oriented builds for all packages (ordered by dependency graph).  |
| `pnpm dev`          | Long-running dev processes (API watch, Vite, SDK `tsc --watch`).            |
| `pnpm typecheck`    | Root `tsc --noEmit`, then Turbo `typecheck` in workspaces (after `^build`). |
| `pnpm lint`         | ESLint (flat config) across Node, Vite config, and React sources.           |
| `pnpm format`       | Prettier, write.                                                            |
| `pnpm format:check` | Prettier, check only.                                                       |
| `pnpm clean`        | Turbo `clean` tasks plus removal of `.turbo/` at the repo root.             |

## Repository layout

```
apps/
  api/    # @gold-ops/api   — Fastify backend
  ops/    # @gold-ops/ops   — operator-facing React app
  saas/   # @gold-ops/saas — product-facing React app (Gold Workspace)
packages/
  sdk/    # @gold-ops/sdk  — shared types/helpers, built to dist/
  ui/     # @gold-ops/ui   — shared React UI primitives
```

Turborepo caches task outputs under `.turbo/`; build artifacts live in each package’s `dist/` where applicable.

**TypeScript:** shared strict options live in [`tsconfig.base.json`](./tsconfig.base.json). Node targets extend [`tsconfig.node.json`](./tsconfig.node.json); Vite + React apps extend [`tsconfig.react.json`](./tsconfig.react.json). The repo root [`tsconfig.json`](./tsconfig.json) only typechecks [`repo.config.ts`](./repo.config.ts) so the root project is valid for editors and `tsc -p .`.

## Continuous integration

Workflow: [`.github/workflows/ci.yml`](./.github/workflows/ci.yml) — [view runs on GitHub](https://github.com/roman3672/gold-ops-console/actions/workflows/ci.yml). It runs on **push** and **pull requests** to `main`:

1. `pnpm install --frozen-lockfile`
2. `pnpm run format:check`
3. `pnpm run lint`
4. `pnpm run typecheck`
5. `pnpm run build`

Node uses [`.nvmrc`](./.nvmrc); pnpm is pinned to match `packageManager` in root `package.json`. Concurrent runs on the same branch/PR cancel older jobs (`concurrency`).

## Design specification

Authoritative domain and architecture notes (entities, ops scenarios, action pipeline, audit model): [`описание проекта.txt`](./описание%20проекта.txt) _(working specification; currently in Russian)_.

## License

See [LICENSE](./LICENSE).
