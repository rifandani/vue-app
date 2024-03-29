import type { RouteRecordRaw } from 'vue-router'
import { authGuard, unauthGuard } from '#shared/guards/route'

const HomePage = () => import('./pages/home/page.vue')

export const homeRoute = {
  name: 'home' as const,
  path: '/' as const,
  component: HomePage,
  beforeEnter: [unauthGuard, authGuard],
} satisfies RouteRecordRaw

export const homeRoutes: RouteRecordRaw[] = [
  homeRoute,
  {
    path: '/home',
    redirect: '/',
  },
]
