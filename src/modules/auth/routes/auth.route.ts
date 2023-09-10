import LoginPage from '@auth/pages/Login/LoginPage.vue'
import NotFoundPage from '@auth/pages/NotFound/NotFoundPage.vue'
import { loginGuard } from '@shared/guards/route.guard'
import type { RouteRecordRaw } from 'vue-router'

export const loginRoute = {
  name: 'login' as const,
  path: '/login' as const,
  component: LoginPage,
  beforeEnter: [loginGuard]
} satisfies RouteRecordRaw

export const notFoundRoute = {
  name: 'not-found' as const,
  path: '/:pathMatch(.*)*' as const,
  component: NotFoundPage
} satisfies RouteRecordRaw

export const authRoutes: RouteRecordRaw[] = [loginRoute, notFoundRoute]
