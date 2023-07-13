import type { NavigationGuard, RouteLocationNormalized } from 'vue-router'
import { loginApiResponseSchema, type LoginApiResponseSchema } from '@/modules/auth/api/auth.schema'

/**
 * remove url query params
 *
 * @example
 *
 * ```ts
 * {
 *  beforeEnter: [removeQueryParams, removeHash],
 * }
 * ```
 */
export function removeQueryParams(to: RouteLocationNormalized) {
  if (Object.keys(to.query).length) return { path: to.path, query: {}, hash: to.hash }
}

/**
 * remove url hash
 *
 * @example
 *
 * ```ts
 * {
 *  beforeEnter: [removeQueryParams, removeHash],
 * }
 * ```
 */
export function removeHash(to: RouteLocationNormalized) {
  if (to.hash) return { path: to.path, query: to.query, hash: '' }
}

/**
 * check 'user' data in local storage
 */
export const authGuard: NavigationGuard = (_from, to) => {
  const user = localStorage.getItem('user')

  if (!user) return '/login'

  const parsedUser = JSON.parse(user) as LoginApiResponseSchema
  // will throw an Error if `parsedUser` is not correct
  // then, will trigger callback registered via `router.onError()`
  loginApiResponseSchema.parse(parsedUser)

  if (to.path === '/login') return '/'

  return true
}
