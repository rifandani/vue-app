import type { RouteRecordRaw } from 'vue-router'
import { loginGuard } from '../../shared/guards/route.guard'
import LoginPage from '../pages/Login/LoginPage.vue'
import NotFoundPage from '../pages/NotFound/NotFoundPage.vue'

export const authRoutes: RouteRecordRaw[] = [
  {
    name: 'login',
    path: '/login',
    component: LoginPage,
    beforeEnter: [loginGuard]
  },
  {
    name: 'not-found',
    path: '/:pathMatch(.*)*',
    component: NotFoundPage
  }
]
