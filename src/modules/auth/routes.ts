import type { RouteRecordRaw } from 'vue-router'
import { loginGuard } from '#shared/guards/route'
import LoginPage from '#auth/pages/login/page.vue'
import NotFoundPage from '#auth/pages/not-found/page.vue'

export const loginRoute = {
  name: 'login' as const,
  path: '/login' as const,
  component: LoginPage,
  beforeEnter: [loginGuard],
} satisfies RouteRecordRaw

export const notFoundRoute = {
  name: 'not-found' as const,
  path: '/:pathMatch(.*)*' as const,
  component: NotFoundPage,
} satisfies RouteRecordRaw

export const authRoutes: RouteRecordRaw[] = [loginRoute, notFoundRoute]
