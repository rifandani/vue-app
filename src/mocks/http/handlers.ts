import type { RequestHandler } from 'msw'
import { authHandlers } from './endpoints/auth'
import { todoHandlers } from './endpoints/todo'

export const handlers: RequestHandler[] = [...authHandlers, ...todoHandlers]
