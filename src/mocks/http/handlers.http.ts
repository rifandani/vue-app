import type { RequestHandler } from 'msw'
import { authHandlers } from './endpoints/auth.endpoint'
import { todoHandlers } from './endpoints/todo.endpoint'

export const handlers: RequestHandler[] = [...authHandlers, ...todoHandlers]
