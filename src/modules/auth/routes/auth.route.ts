import { authGuard } from '@/modules/shared/guards/route.guard'
import type { RouteRecordRaw } from 'vue-router'
import LoginPage from '../pages/Login/LoginPage.vue'
import NotFoundPage from '../pages/NotFound/NotFoundPage.vue'

export const authRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: LoginPage,
    beforeEnter: authGuard
  },
  {
    path: '*',
    component: NotFoundPage
  }
]
