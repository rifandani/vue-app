import { authGuard, unauthGuard } from '@shared/guards/route.guard'
import type { RouteRecordRaw } from 'vue-router'

const TodosPage = () => import('../pages/Todos/TodosPage.vue')
const TodoPage = () => import('../pages/Todo/TodoPage.vue')

export const todosRoute = {
  name: 'todos' as const,
  path: '/todos' as const,
  component: TodosPage,
  beforeEnter: [unauthGuard, authGuard]
} satisfies RouteRecordRaw

export const todosDetailRoute = {
  name: 'todo' as const,
  path: '/todos/:id' as const,
  component: TodoPage,
  beforeEnter: [unauthGuard, authGuard]
} satisfies RouteRecordRaw

export const todoRoutes: RouteRecordRaw[] = [todosRoute, todosDetailRoute]
