import { createRouter, createWebHistory } from 'vue-router'
import { authRoutes } from '@/modules/auth/routes/auth.route'
import { homeRoutes } from '@/modules/home/routes/home.route'
import { todosRoute } from '@/modules/todo/routes/todo.route'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...homeRoutes, ...todosRoute, ...authRoutes]
})
