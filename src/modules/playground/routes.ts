import type { RouteRecordRaw } from 'vue-router'

const PlaygroundPage = () => import('./pages/page.vue')

export const playgroundRoute = {
  name: 'playground' as const,
  path: '/playground' as const,
  component: PlaygroundPage,
} satisfies RouteRecordRaw

export const playgroundRoutes: RouteRecordRaw[] = [playgroundRoute]
