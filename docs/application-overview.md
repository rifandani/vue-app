# Application Overview

The application built with:

- `vite` + `typescript` + `eslint` + `prettier` -> development productivity
- `vitest` + `@testing-library/vue` -> unit test, integration test, coverage
- `msw` -> browser and server mocking
- `tailwindcss` + `tailwind-merge` -> easy styling
- `axios` + `@tanstack/vue-query` -> server state management + data fetching
- `zod` -> runtime schema validation
- `@iconify/vue` -> icon on demand
- `primevue` -> styled/unstyled, responsive, accessible, and feature-rich UI component library
- `vee-validate` + `@vee-validate/zod` -> form management
- `pinia` -> performant global state management
- `type-fest` -> useful type helpers
- `vue-router` -> client routing
- `@vueuse/core` -> useful composables
- `typesafe-i18n` -> typesafe i18n

[Demo App](https://vue-app-rifandani.vercel.app)

## Get Started

Prerequisites:

- Node 18+
- PNPM 8.x+ (i'll keep updating it)

To set up the app execute the following commands:

```bash
# clone the template OR you can click "Use this template" in https://github.com/rifandani/vue-app.com
$ git clone https://github.com/rifandani/vue-app.git

$ cd vue-app

# rename the example env files
$ cp .env.development.example .env.development
$ cp .env.staging.example .env.staging
$ cp .env.production.example .env.production

# install deps
$ pnpm install
```

## Development

```bash
# Runs the app + i18n + PWA
$ pnpm dev
```

## Testing

We are using MSW v2 which utilize Node v18+. Make sure you install Node v18+, because it has a built-in fetch.

```bash
# run test
$ pnpm test

# coverage with istanbul
$ pnpm test:coverage
```

## Build

```bash
# build app in "staging" mode
$ pnpm build:staging

# build app in "production" mode
$ pnpm build
```

## Deployment

For now only supports deployment to Vercel.
Check out `vercel.json` file fo further details.

## Type Support for `.vue` Imports in TS (from the `create-vue` template)

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).
