import type { RouteRecordRaw } from 'vue-router'
import LoginPage from '../pages/Login/LoginPage.vue'
import NotFoundPage from '../pages/NotFound/NotFoundPage.vue'

export const authRoutes: RouteRecordRaw[] = [
  {
    name: 'login',
    path: '/login',
    component: LoginPage
    // beforeEnter: (to, from, next) => {
    //   return authGuard(from, to, next)
    // }
  },
  {
    name: 'not-found',
    path: '/:pathMatch(.*)*',
    component: NotFoundPage
  }
]
