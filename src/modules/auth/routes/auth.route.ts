import type { RouteRecordRaw } from 'vue-router'
import { loginGuard } from '../../shared/guards/route.guard'
import LoginPage from '../pages/Login/LoginPage.vue'
import NotFoundPage from '../pages/NotFound/NotFoundPage.vue'

export const loginRoute = {
  name: 'login' as const,
  path: '/login' as const,
  component: LoginPage,
  beforeEnter: [loginGuard]
} satisfies RouteRecordRaw

export const notFoundRoute = {
  name: 'not-found' as const,
  path: '/:pathMatch(.*)*',
  component: NotFoundPage
} satisfies RouteRecordRaw

export const authRoutes: RouteRecordRaw[] = [loginRoute, notFoundRoute]
