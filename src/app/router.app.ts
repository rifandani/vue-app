import { authRoutes } from '@auth/routes/auth.route'
import { homeRoutes } from '@home/routes/home.route'
import { playgroundRoutes } from '@playground/routes/playground.route'
import { todoRoutes } from '@todo/routes/todo.route'
import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...homeRoutes, ...todoRoutes, ...playgroundRoutes, ...authRoutes]
})
