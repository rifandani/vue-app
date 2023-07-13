import { authGuard } from '@/modules/shared/guards/route.guard'
import type { RouteRecordRaw } from 'vue-router'

const TodosPage = () => import('../pages/Todos/TodosPage.vue')
const TodoPage = () => import('../pages/Todo/TodoPage.vue')

export const todosRoute: RouteRecordRaw[] = [
  {
    path: '/todos',
    component: TodosPage,
    beforeEnter: authGuard
  },
  {
    path: '/todos/:id',
    component: TodoPage,
    beforeEnter: authGuard
  }
]
