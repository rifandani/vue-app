# Intro

<!-- [![DeepScan grade](https://deepscan.io/api/teams/13942/projects/25053/branches/777069/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=13942&pid=25053&bid=777069) -->

Vue 3 template built with:

- `typescript` + `eslint` + `prettier` -> dev productivity
- `vue-router` -> routing
- `vue-use` -> useful composables
- `pinia` -> state management
- `vite` + `vitest` + `@testing-library/vue` -> unit test, integration test, coverage
- `msw` -> browser and server mocking
- `tailwindcss` + `tailwind-merge` + `daisyui` -> styling
- `redaxios` + `@tanstack/vue-query` -> data fetching
- `zod` -> schema validation
- `vee-validate` + `@vee-validate/zod` -> form management
- `@iconify/vue` -> icon on demand
- `type-fest` -> useful type helpers
- `typesafe-i18n` -> typesafe i18n
- `@ark-ui/vue` -> agnostic, unstyled, accessible component library based on state machine

## Development

```bash
# install deps
$ pnpm install

# init msw
$ pnpm msw:init

# Runs the app
$ pnpm start
```

```bash
# run test
$ pnpm test

# coverage with c8
$ pnpm coverage
```

## Build

Builds the app for production to the `dist` folder.<br>
It correctly bundles Svelte in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

```bash
# build app
$ pnpm build
```

## Deployment

You can deploy the `dist` folder to any static host provider (netlify, surge, now, etc.)

## Type Support for `.vue` Imports in TS (from the `create-vue` template)

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## NOTES

- [ ] route guard
- [ ] fix all tests
- [ ] add `/docs` folder, including all my decisions or technical considerations.
- [x] tried `@zagjs/vue` + `@zagjs/toast`. Doesn't work. Not fully typed in the `BaseToast` component where we get `actor` as props. Progress state is not reactive.
