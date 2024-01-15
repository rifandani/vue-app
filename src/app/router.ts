import { createRouter, createWebHistory } from 'vue-router'
import { authRoutes } from '#auth/routes'
import { homeRoutes } from '#home/routes'
import { playgroundRoutes } from '#playground/routes'
import { todoRoutes } from '#todo/routes'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...homeRoutes, ...todoRoutes, ...playgroundRoutes, ...authRoutes],
})
