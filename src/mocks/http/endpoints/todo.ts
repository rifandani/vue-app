import { getBaseUrl } from '@mocks/util'
import { type ResourceParamsSchema, resourceParamsSchema } from '@shared/api/resource.schema'
import type {
  CreateTodoSchema,
  DeleteTodoApiResponseSchema,
  TodoSchema,
  UpdateTodoSchema,
} from '@todo/api/todo.schema'
import type { RequestHandler } from 'msw'
import { HttpResponse, http } from 'msw'
import { mockTodo } from '../entities'

function getTodos(length: number) {
  return Array.from({ length }, (_, idx) =>
    mockTodo({
      id: idx + 1,
      userId: idx + 1,
      todo: `Todo title ${idx + 1}`,
      completed: idx % 2 === 0,
    }))
}

// mock 10 Todo entity
let todos = Array.from({ length: 10 }, (_, idx) =>
  mockTodo({
    id: idx + 1,
    userId: idx + 1,
    todo: `Todo title ${idx + 1}`,
    completed: idx % 2 === 0,
  }))

export const todoHandlers: RequestHandler[] = [
  http.get(getBaseUrl('todos'), ({ request }) => {
    const { searchParams } = new URL(request.url)
    const searchParamsObject = Object.fromEntries(searchParams) as ResourceParamsSchema
    const hasSearchParams = !!Object.keys(searchParamsObject).length

    const parsedSearchParams = resourceParamsSchema.safeParse(searchParamsObject)

    if (!hasSearchParams || !parsedSearchParams.success) {
      return HttpResponse.json(
        {
          todos: getTodos(10),
          limit: 10,
          skip: 0,
          total: 150,
        },
        { status: 200 },
      )
    }

    const limit = parsedSearchParams.data.limit ?? 10
    const skip = parsedSearchParams.data.skip ?? 0

    return HttpResponse.json(
      {
        todos: getTodos(limit),
        limit,
        skip,
        total: 150,
      },
      { status: 200 },
    )
  }),

  // @ts-expect-error ignore
  http.post(getBaseUrl('todos/add'), async ({ request }) => {
    const todoPayload = (await request.json()) as CreateTodoSchema
    const todoId = todos.at(-1)?.id

    if (todoId) {
      const newTodo: TodoSchema = todoPayload
      todos = [newTodo, ...todos]

      return HttpResponse.json(todoPayload, { status: 201 })
    }

    return HttpResponse.json(
      {
        message: `ooppss, unknown error occurred`,
      },
      { status: 400 },
    )
  }),

  // @ts-expect-error ignore
  http.put(getBaseUrl('todos/:id'), async ({ request, params }) => {
    const todoPayload = (await request.json()) as UpdateTodoSchema
    const { id } = params
    const todoId = Number.parseInt(id as string, 10)

    const todo = todos.find(_todo => _todo.id === todoId)

    if (todo) {
      todos = todos.map(_todo =>
        _todo.id === todo.id ? { ..._todo, completed: todoPayload.completed } : _todo,
      )

      return HttpResponse.json({ ...todo, completed: todoPayload.completed }, { status: 200 })
    }

    return HttpResponse.json(
      {
        message: `there is no todo with id: ${todoId}`,
      },
      { status: 404 },
    )
  }),

  // @ts-expect-error ignore
  http.delete(getBaseUrl('todos/:id'), ({ params }) => {
    const { id } = params
    const todoId = Number.parseInt(id as string, 10)

    const todo = todos.find(_todo => _todo.id === todoId)

    if (todo) {
      todos = todos.filter(_todo => _todo.id !== todo.id)

      const deleteResponse: DeleteTodoApiResponseSchema = {
        ...todo,
        isDeleted: true,
        deletedOn: new Date().toISOString(),
      }

      return HttpResponse.json(deleteResponse, { status: 200 })
    }

    return HttpResponse.json(
      {
        message: `there is no todo with id: ${todoId}`,
      },
      { status: 404 },
    )
  }),
]
