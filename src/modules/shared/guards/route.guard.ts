import { loginApiResponseSchema, type LoginApiResponseSchema } from '@auth/api/auth.schema'
import type { NavigationGuard, RouteLocationNormalized } from 'vue-router'

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
 * before enter guard
 */
export const loginGuard: NavigationGuard = (_to, _from, next) => {
  const user = localStorage.getItem('user')

  // there is NO "user" data in local storage
  if (!user) return next()

  const parsedUser = JSON.parse(user as string) as LoginApiResponseSchema
  // will throw an Error if `parsedUser` is not correct
  // then, will trigger callback registered via `router.onError()`
  const response = loginApiResponseSchema.safeParse(parsedUser)

  // valid "user" data in local storage, but still going to /login
  if (response.success) return next({ path: '/' })

  return next()
}

/**
 * for authorized user
 */
export const authGuard: NavigationGuard = (to, _from, next) => {
  const user = localStorage.getItem('user')

  const parsedUser = JSON.parse(user as string) as LoginApiResponseSchema
  // will throw an Error if `parsedUser` is not correct
  // then, will trigger callback registered via `router.onError()`
  const response = loginApiResponseSchema.safeParse(parsedUser)

  // NOT valid "user" data in local storage
  if (!response.success) return next({ path: '/login' })
  // valid "user" data in local storage, but still going to /login
  if (to.path === '/login') return next({ path: '/' })

  return next()
}

/**
 * for unauthorized user
 */
export const unauthGuard: NavigationGuard = (_to, _from, next) => {
  const user = localStorage.getItem('user')

  // there is NO "user" data in local storage
  if (!user) return next({ path: '/login' })

  return next()
}
