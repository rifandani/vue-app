import type { RouteRecordRaw } from 'vue-router'
import { authGuard } from '@/modules/shared/guards/route.guard'

const HomePage = () => import('../pages/Home/HomePage.vue')

export const homeRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: HomePage,
    beforeEnter: authGuard
  },
  {
    path: '/home',
    redirect: '/'
  }
]
