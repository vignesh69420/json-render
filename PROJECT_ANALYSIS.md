# json-render Project Analysis

## Overview

**json-render** is a TypeScript library that enables AI models to generate safe, predictable UI components through JSON schemas. It provides guardrails for generative UI by constraining AI output to a predefined catalog of components, actions, and data bindings.

**Repository**: https://github.com/vercel-labs/json-render
**License**: Apache-2.0
**Package Manager**: pnpm 9.0.0
**Node Version**: >=18
**Current Version**: 0.2.0

## Key Value Propositions

1. **Guardrailed** - AI can only use components defined in your catalog
2. **Predictable** - JSON output always matches your schema
3. **Fast** - Progressive streaming and rendering as the model responds

## Project Architecture

### Monorepo Structure

This is a TurboRepo-based monorepo with the following structure:

```
json-render/
├── packages/              # Core library packages
│   ├── core/             # @json-render/core - Core types, schemas, validation
│   ├── react/            # @json-render/react - React renderer and hooks
│   ├── ui/               # Shared UI components
│   ├── eslint-config/    # Shared ESLint configuration
│   └── typescript-config/ # Shared TypeScript configuration
├── apps/
│   └── web/              # Documentation & Playground (Next.js)
├── examples/
│   └── dashboard/        # Example dashboard application (Next.js)
└── [config files]
```

### Workspace Configuration

**pnpm-workspace.yaml**:
```yaml
packages:
  - "apps/*"
  - "examples/*"
  - "packages/*"
```

The project uses Turborepo for build orchestration with tasks defined in `turbo.json`:
- `build` - Build all packages with dependency ordering
- `dev` - Run development servers (cached off, persistent)
- `lint` - Run linting across packages
- `check-types` - Type checking with build dependencies

## Core Packages

### @json-render/core (v0.2.0)

**Location**: `packages/core/`
**Total LOC**: ~1,600 lines of TypeScript

**Purpose**: Foundation library providing types, schemas, validation, and core logic.

**Key Modules**:

1. **types.ts** - Core type definitions
   - `UIElement` - Base element structure
   - `UITree` - Tree of UI elements
   - `DynamicValue` - Data binding types (path-based, literal)
   - `DataModel` - Data context model
   - JSON Patch operations for state updates

2. **catalog.ts** - Component catalog system
   - `createCatalog()` - Define available components and actions
   - `generateCatalogPrompt()` - Generate AI-friendly prompts from catalog
   - Component schema validation with Zod
   - Type inference for component props

3. **visibility.ts** - Conditional rendering logic
   - Logic expressions (and/or/not)
   - Path-based conditions
   - Auth state conditions
   - `evaluateVisibility()` - Runtime evaluation

4. **actions.ts** - Action system
   - Action definitions with parameters
   - Confirmation dialogs
   - Success/error callbacks
   - String interpolation with data binding
   - `executeAction()` - Action execution with context

5. **validation.ts** - Form validation
   - Built-in validation functions (required, email, minLength, etc.)
   - Custom validation functions
   - Field-level and form-level validation
   - Validation modes (blur, change, submit)

**Dependencies**:
- `zod` ^4.0.0 - Schema validation

**Build**:
- Bundler: tsup
- Output formats: CJS, ESM, TypeScript definitions
- Entry: `src/index.ts` → `dist/index.{js,mjs,d.ts}`

### @json-render/react (v0.2.0)

**Location**: `packages/react/`
**Total LOC**: ~1,600 lines of TypeScript

**Purpose**: React renderer and hooks for json-render core.

**Key Modules**:

1. **renderer.tsx** - Core rendering engine
   - `Renderer` - Main component renderer
   - `JSONUIProvider` - Context provider for all features
   - `createRendererFromCatalog()` - Type-safe renderer factory
   - Component registry system
   - Children rendering support

2. **hooks.ts** - React hooks
   - `useUIStream()` - Stream UI from AI models
   - `flatToTree()` - Convert flat array to tree structure
   - Integration with Vercel AI SDK

3. **contexts/** - React contexts
   - `data.tsx` - Data binding context
     - `DataProvider` - Provide data to components
     - `useDataValue()` - Resolve dynamic values
     - `useDataBinding()` - Two-way data binding

   - `visibility.tsx` - Visibility evaluation context
     - `VisibilityProvider` - Auth state and visibility logic
     - `useIsVisible()` - Check element visibility

   - `actions.tsx` - Action handling context
     - `ActionProvider` - Register action handlers
     - `useAction()` - Execute actions with confirmation
     - `ConfirmDialog` - Built-in confirmation UI

   - `validation.tsx` - Form validation context
     - `ValidationProvider` - Custom validation functions
     - `useFieldValidation()` - Field-level validation state

**Dependencies**:
- `@json-render/core` (workspace)
- Peer: `react` ^19.0.0

**Build**:
- Bundler: tsup
- Output formats: CJS, ESM, TypeScript definitions

## Applications & Examples

### apps/web (Documentation & Playground)

**Location**: `apps/web/`
**Port**: 3000
**Framework**: Next.js 16.1.1 (App Router)

**Purpose**: Marketing site, documentation, and interactive playground.

**Key Features**:
- Interactive code playground
- Documentation pages
- Syntax highlighting (Shiki)
- Dark mode support (next-themes)
- Tailwind CSS 4.x styling
- API routes for AI generation

**Dependencies**:
- `ai` ^6.0.33 - Vercel AI SDK
- `@ai-sdk/gateway` ^3.0.13 - AI Gateway integration
- `next` 16.1.1 - Next.js framework
- `react` 19.2.3 - React
- `zod` ^4.0.0 - Schema validation
- `shiki` ^3.21.0 - Syntax highlighting
- `lucide-react` - Icons
- `sonner` - Toast notifications
- `@vercel/analytics` & `@vercel/speed-insights` - Analytics

**Key Pages**:
- `/` - Homepage
- `/docs` - Documentation
- `/playground` - Interactive playground
- `/api/*` - API routes for AI generation

### examples/dashboard

**Location**: `examples/dashboard/`
**Port**: 3001
**Framework**: Next.js 16.1.1

**Purpose**: Example implementation showing real-world usage of json-render.

**Features**:
- Dashboard generation from natural language
- Component catalog demonstration
- Data binding examples
- Action handling patterns

**Dependencies**:
- `@json-render/core` (workspace)
- `@json-render/react` (workspace)
- `ai` ^6.0.33
- `next` 16.1.1
- `react` 19.2.3

## Development Workflow

### Scripts (Root Level)

```bash
pnpm dev              # Start all dev servers (concurrency 15)
pnpm build            # Build all packages
pnpm lint             # Lint all packages
pnpm type-check       # Type check all packages
pnpm test             # Run tests
pnpm test:watch       # Run tests in watch mode
pnpm test:coverage    # Generate coverage report
pnpm format           # Format code with Prettier
```

### CI/CD Pipeline

**Workflow**: `.github/workflows/ci.yml`

**Jobs**:
1. Checkout repository
2. Install pnpm 9.0.0
3. Setup Node.js 20
4. Install dependencies (frozen lockfile)
5. Lint
6. Type check
7. Test
8. Build

**Triggers**:
- Push to `main` branch
- Pull requests to `main`
- Concurrency: Cancel in-progress runs

### Git Hooks

**Husky** integration with `lint-staged`:
- Pre-commit: Format TypeScript files with Prettier
- Configuration in `package.json` lint-staged field

### Testing

**Framework**: Vitest 4.0.17
**Test Environment**: jsdom
**Libraries**:
- `@testing-library/react` ^16.3.1
- `@testing-library/dom` ^10.4.1

**Test Files**:
- `packages/core/src/*.test.ts` - Core logic tests
- `packages/react/src/*.test.tsx` - React component tests

**Configuration**: `vitest.config.ts` (root level)

## Code Quality Tools

### TypeScript

**Version**: 5.9.2
**Config**: Shared via `@repo/typescript-config` workspace package
**Strict Mode**: Enabled across all packages

### ESLint

**Version**: 9.39.1
**Config**: Shared via `@repo/eslint-config` workspace package
**Max Warnings**: 0 (strict enforcement)

### Prettier

**Version**: 3.7.4
**Formatting**: All `*.{ts,tsx}` files
**Integration**: Pre-commit hook via lint-staged

## Key Concepts

### 1. Catalog-Driven Generation

Developers define a catalog of allowed components:

```typescript
const catalog = createCatalog({
  components: {
    Card: {
      props: z.object({ title: z.string() }),
      hasChildren: true,
    },
    Metric: {
      props: z.object({
        label: z.string(),
        valuePath: z.string(),
        format: z.enum(['currency', 'percent', 'number']),
      }),
    },
  },
  actions: {
    export_report: { description: 'Export dashboard to PDF' },
  },
});
```

### 2. Data Binding

Components bind to data via paths:

```json
{
  "type": "Metric",
  "props": {
    "label": "Revenue",
    "valuePath": "/metrics/revenue",
    "format": "currency"
  }
}
```

The `DataProvider` supplies the data context, and components use `useDataValue()` to resolve paths.

### 3. Conditional Visibility

Elements can have visibility conditions:

```json
{
  "type": "AdminPanel",
  "visible": {
    "and": [
      { "auth": "signedIn" },
      { "path": "/user/isAdmin" }
    ]
  }
}
```

### 4. Actions with Confirmation

Actions can trigger with confirmation dialogs:

```json
{
  "type": "Button",
  "props": {
    "label": "Delete",
    "action": {
      "name": "delete_item",
      "params": { "id": { "path": "/selected/id" } },
      "confirm": {
        "title": "Confirm Deletion",
        "message": "This cannot be undone",
        "variant": "danger"
      }
    }
  }
}
```

### 5. Streaming UI

The `useUIStream()` hook enables progressive rendering:

```tsx
const { tree, send } = useUIStream({ api: '/api/generate' });

// Send prompt
send("Create a dashboard");

// tree updates as AI streams JSON
<Renderer tree={tree} components={registry} />
```

## Technical Highlights

### Type Safety

- Full TypeScript coverage
- Zod schema validation at runtime
- Type inference for component props
- Generic types for custom catalogs

### Performance

- Progressive streaming support
- Lazy component rendering
- Efficient tree diffing
- Minimal re-renders via context optimization

### Security

- Catalog-based guardrails prevent arbitrary code execution
- Schema validation ensures type safety
- Action confirmation prevents accidental operations
- Path-based data access prevents injection

### Extensibility

- Custom validation functions
- Custom action handlers
- Custom visibility conditions
- Pluggable component registry

## Dependencies Summary

### Production Dependencies

**Core**:
- `zod` ^4.0.0 - Runtime type validation

**React**:
- `react` ^19.0.0 (peer)
- `@json-render/core` (workspace)

**Web App**:
- `ai` ^6.0.33 - Vercel AI SDK
- `next` 16.1.1 - Framework
- `react` 19.2.3
- UI libraries (Radix UI, Lucide, etc.)

### Development Dependencies

- `typescript` 5.9.2
- `turbo` ^2.7.4 - Monorepo build system
- `vitest` ^4.0.17 - Testing
- `prettier` ^3.7.4 - Code formatting
- `husky` ^9.1.7 - Git hooks
- `lint-staged` ^16.2.7 - Pre-commit formatting
- `tsup` ^8.0.2 - Package bundler

## Agent Guidelines (from AGENTS.md)

### Code Style
- No emojis in code or UI

### Workflow
- Run `pnpm type-check` after each code change to ensure type safety

### Source Code Reference
- Source code for dependencies available in `opensrc/` directory
- Use `npx opensrc <package>` to fetch additional package source code
- Consult source when needing implementation details beyond types

## Getting Started

### Prerequisites
- Node.js >=18
- pnpm 9.0.0

### Installation

```bash
git clone https://github.com/vercel-labs/json-render
cd json-render
pnpm install
```

### Development

```bash
# Start all dev servers
pnpm dev

# Apps will be available at:
# - http://localhost:3000 (docs & playground)
# - http://localhost:3001 (dashboard example)
```

### Building

```bash
# Build all packages
pnpm build

# Packages will be built to dist/ folders
# - packages/core/dist/
# - packages/react/dist/
```

### Testing

```bash
# Run all tests
pnpm test

# Watch mode
pnpm test:watch

# With coverage
pnpm test:coverage
```

## Use Cases

1. **User-Generated Dashboards** - Let users describe dashboards in natural language
2. **Dynamic Forms** - Generate forms from user requirements
3. **Data Visualizations** - Create charts and graphs from prompts
4. **Admin Panels** - Generate CRUD interfaces on demand
5. **Report Builders** - Allow users to customize report layouts
6. **Widget Libraries** - Enable widget configuration via AI

## Architecture Decisions

### Why JSON?
- Language agnostic
- Streamable
- Validatable
- Debuggable
- LLM-friendly format

### Why Zod?
- Runtime validation
- Type inference
- Composable schemas
- Excellent error messages

### Why Monorepo?
- Shared dependencies
- Coordinated releases
- Easy cross-package changes
- Single CI/CD pipeline

### Why React Context?
- Avoid prop drilling
- Flexible provider composition
- Works with streaming updates
- Standard React pattern

## Future Considerations

Based on the codebase structure, potential areas for expansion:

1. **More Framework Support** - Vue, Svelte, Angular renderers
2. **More Built-in Components** - Common UI patterns
3. **More Validation Functions** - Extended form validation
4. **Server Components** - React Server Component support
5. **DevTools** - Browser extension for debugging
6. **Testing Utilities** - Test helpers for consumers

## License

Apache-2.0 - See LICENSE file for full text

## Contributing

This appears to be a Vercel Labs project. Check the repository for contribution guidelines.

---

**Last Updated**: 2026-02-11
**Analyzed Version**: 0.2.0
**Analysis Tool**: Claude Code
