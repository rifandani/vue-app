# Application Overview

The application built with:

- `vite` + `typescript` + `eslint` -> development productivity
- `vitest` + `@testing-library/vue` -> unit test, integration test, coverage
- `msw` -> browser and server mocking
- `tailwindcss` + `tailwind-merge` + `class-variance-authority` -> easy styling
- `radix-vue` + `vue-sonner` + `vaul-vue` + `v-calendar` + `@tanstack/vue-table` -> UI component library
- `ky` + `@tanstack/vue-query` -> server state management + data fetching
- `zod` -> runtime schema validation
- `@iconify/vue` -> icon on demand
- `vee-validate` + `@vee-validate/zod` -> form management
- `pinia` -> performant global state management
- `type-fest` -> useful type helpers
- `vue-router` -> client routing
- `@vueuse/core` -> useful composables
- `vue-i18n` -> i18n

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
