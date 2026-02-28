# Architecture Overview

## Workspace Layout

- `packages/core`: Schema primitives. Handles catalogs, visibility evaluation, actions, validation, and json patch helpers. Contains pure TypeScript logic with Vitest coverage.
- `packages/react`: React runtime. Exposes data/visibility/action/validation contexts, streaming hook, and renderer that maps catalog entries to React components.
- `packages/ui`: Simple design system primitives used in docs/playground (Next.js). Client components built with React 19.
- `apps/web`: Next.js 16 app that powers the docs and live playground. Consumes the packages above for interactive demos.
- `examples/dashboard`: Standalone Next.js example showing how to integrate @json-render/core and @json-render/react into a custom dashboard.

## Data Flow

1. Users prompt through the playground (`apps/web`) or example app. Requests hit `/api/generate` (Edge + AI SDK) which calls AI using the catalog prompt generated from `@json-render/core`.
2. The AI responds with newline-delimited JSON patches. `useUIStream` in `@json-render/react` consumes the stream, incrementally mutating a `UITree` structure.
3. The tree feeds the `<Renderer>` which looks up component implementations from the registry (user-defined React components) and renders recursively.
4. Each component can read/write data via `DataProvider`, show/hide based on `VisibilityProvider`, trigger actions via `ActionProvider` (confirm dialogs, async handlers, navigation), and validate fields via `ValidationProvider`.
5. Actions defined in the catalog resolve dynamic values (`resolveAction`) before invoking user-supplied handlers. Validation uses built-in + custom functions registered on the provider.

## Key Technologies

- **Core package**: TypeScript, Zod schemas, custom visibility/action/validation engines. Built with `tsup`, tested via Vitest.
- **React package**: React 19, Context APIs, hooks, client components. Uses the core helpers for logic; focuses on rendering & user interactions.
- **Apps/examples**: Next.js 16 (App Router), Tailwind v4, Shadcn-inspired UI in `packages/ui`, AI SDK for streaming server functions.
- **Tooling**: Turborepo orchestrates builds/tests, PNPM workspace manages dependencies, Vitest for unit testing, ESLint/Prettier for linting/formatting.

## Build & Deployment

- Run `pnpm dev` to start all dev servers via Turborepo. `apps/web` serves docs at `localhost:3000`, examples may run on other ports.
- `pnpm build` triggers `turbo run build`, building each package/app respecting dependency graphs (`packages/core` → `packages/react` → apps/examples).
- `pnpm type-check` runs `turbo run check-types`, invoking `tsc --noEmit` in every package/app to ensure shared types stay aligned.
- `pnpm test` runs Vitest suites located primarily in `packages/core/src/*.test.ts` and `packages/react/src/*.test.tsx`.
- Deployment typically targets Vercel for the Next.js apps; packages publish via standard npm workflows when versioned.

## Extensibility

- New components live in the catalog (core) and registry (react). Provide Zod prop schemas, optional visibility/validation logic, and matching React renderers.
- To add new validation functions or action handlers, extend the catalog definitions and pass functions to `JSONUIProvider`.
- For third-party AI models, plug different backends into the `/api/generate` route; the renderer remains agnostic as long as it receives valid patches.
- Shared UI primitives belong in `packages/ui` so docs/examples stay consistent without duplicating styles.
