import type { RouteRecordRaw } from 'vue-router'
import { authGuard, unauthGuard } from '../../shared/guards/route.guard'

const HomePage = () => import('../pages/Home/HomePage.vue')

export const homeRoutes: RouteRecordRaw[] = [
  {
    name: 'home',
    path: '/',
    component: HomePage,
    beforeEnter: [unauthGuard, authGuard]
  },
  {
    path: '/home',
    redirect: '/'
  }
]
