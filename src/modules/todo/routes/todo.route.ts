import type { RouteRecordRaw } from 'vue-router'
import { authGuard, unauthGuard } from '../../shared/guards/route.guard'

const TodosPage = () => import('../pages/Todos/TodosPage.vue')
const TodoPage = () => import('../pages/Todo/TodoPage.vue')

export const todosRoute: RouteRecordRaw[] = [
  {
    name: 'todos',
    path: '/todos',
    component: TodosPage,
    beforeEnter: [unauthGuard, authGuard]
  },
  {
    name: 'todo',
    path: '/todos/:id',
    component: TodoPage,
    beforeEnter: [unauthGuard, authGuard]
  }
]
