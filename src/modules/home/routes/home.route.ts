import type { RouteRecordRaw } from 'vue-router'

const HomePage = () => import('../pages/Home/HomePage.vue')

export const homeRoutes: RouteRecordRaw[] = [
  {
    name: 'home',
    path: '/',
    component: HomePage
    // beforeEnter: (from, to, next) => {
    //   return authGuard(from, to, next)
    // }
  },
  {
    path: '/home',
    redirect: '/'
  }
]
