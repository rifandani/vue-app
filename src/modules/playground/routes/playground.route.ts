import type { RouteRecordRaw } from 'vue-router'

const PlaygroundPage = () => import('../pages/PlaygroundPage.vue')

export const playgroundRoute: RouteRecordRaw[] = [
  {
    name: 'playground',
    path: '/playground',
    component: PlaygroundPage
  }
]
