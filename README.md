# Intro

[![DeepScan grade](https://deepscan.io/api/teams/13942/projects/25165/branches/782515/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=13942&pid=25165&bid=782515)

Vue 3 template built with:

- `typescript` + `eslint` + `prettier` -> dev productivity
- `vue-router` -> routing
- `vue-use` -> useful composables
- `pinia` -> state management
- `vite` + `vitest` + `@testing-library/vue` -> unit test, integration test, coverage
- `msw` -> browser and server mocking
- `tailwindcss` + `tailwind-merge` + `daisyui` -> styling
- `axios` + `@tanstack/vue-query` -> data fetching
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

# init msw for browser mocking
$ pnpm msw:init

# Runs the app
$ pnpm start
```

```bash
# run test
$ pnpm test

# coverage with istanbul
$ pnpm test:coverage
```

## Build

Builds the app for production to the `dist` folder.<br>

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

## NOTES

- [ ] use prime-vue with unstyled setting
- [ ] fix all tests -> `axios` + `vue-query` + `msw` base url somehow does not works.
- [ ] add `/docs` folder, including all my decisions or technical considerations.
- [x] tried `@zagjs/vue` + `@zagjs/toast` but doesn't work well. Not fully typed in the `BaseToast` component where we get `actor` as props. Progress state also not reactive.
