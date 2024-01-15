import type { RequestHandler } from 'msw'
import { authHandlers } from '#mocks/http/endpoints/auth'
import { todoHandlers } from '#mocks/http/endpoints/todo'

export const handlers: RequestHandler[] = [...authHandlers, ...todoHandlers]
