import type { RouteRecordRaw } from 'vue-router'

const TodosPage = () => import('../pages/Todos/TodosPage.vue')
const TodoPage = () => import('../pages/Todo/TodoPage.vue')

export const todosRoute: RouteRecordRaw[] = [
  {
    name: 'todos',
    path: '/todos',
    component: TodosPage
    // beforeEnter: (from, to, next) => {
    //   return authGuard(from, to, next)
    // }
  },
  {
    name: 'todo',
    path: '/todos/:id',
    component: TodoPage
    // beforeEnter: (from, to, next) => {
    //   return authGuard(from, to, next)
    // }
  }
]
