# Intro

[![DeepScan grade](https://deepscan.io/api/teams/13942/projects/25165/branches/782515/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=13942&pid=25165&bid=782515)

Bulletproof Vue 3 template built with:

- `typescript` + `eslint` + `prettier` -> dev productivity
- `vue-router` -> routing
- `@vueuse/core` -> useful composables
- `pinia` -> state management
- `vite` + `vitest` + `@testing-library/vue` -> unit test, integration test, coverage
- `msw` -> browser and server mocking
- `tailwindcss` + `tailwind-merge` -> styling
- `axios` + `@tanstack/vue-query` -> data fetching
- `zod` -> schema validation
- `vee-validate` + `@vee-validate/zod` -> form management
- `@iconify/vue` -> icon on demand
- `type-fest` -> useful type helpers
- `typesafe-i18n` -> typesafe i18n
- `primevue` -> styled/unstyled, responsive, accessible, and feature-rich UI component library

## Development

Rename `.env.development.example` to `.env.development`.
Rename `.env.staging.example` to `.env.staging`.
Rename `.env.production.example` to `.env.production`.

```bash
# install deps
$ pnpm install

# init msw for browser mocking
$ pnpm msw:init

# Runs the app
$ pnpm start
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

## Notes

- [ ] fix all tests -> `axios` + `vue-query` + `msw` base url somehow does not works.
- [ ] add `/docs` folder, including all my decisions or technical considerations.
