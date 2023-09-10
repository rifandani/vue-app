import type { ErrorApiResponseSchema } from '@shared/api/error.schema'
import type { ResourceParamsSchema } from '@shared/api/resource.schema'
import { http } from '@shared/services/api/http.api'
import {
  createTodoApiResponseSchema,
  deleteTodoApiResponseSchema,
  todoDetailApiResponseSchema,
  todoListApiResponseSchema,
  updateTodoApiResponseSchema,
  type CreateTodoApiResponseSchema,
  type CreateTodoSchema,
  type DeleteTodoApiResponseSchema,
  type DeleteTodoSchema,
  type TodoDetailApiResponseSchema,
  type TodoListApiResponseSchema,
  type TodoSchema,
  type UpdateTodoApiResponseSchema,
  type UpdateTodoSchema
} from './todo.schema'

export const todoKeys = {
  all: ['todos'] as const,
  lists: () => [...todoKeys.all, 'list'] as const,
  list: (params: ResourceParamsSchema) => [...todoKeys.lists(), params] as const,
  details: () => [...todoKeys.all, 'detail'] as const,
  detail: (id: TodoSchema['id']) => [...todoKeys.details(), id] as const
}

export const todoApi = {
  list: async (params: ResourceParamsSchema) => {
    const resp = await http.get<TodoListApiResponseSchema | ErrorApiResponseSchema>('todos', {
      params
    })

    // `parse` will throw if `resp.data` is not correct
    return todoListApiResponseSchema.parse(resp.data)
  },
  detail: async (id: TodoSchema['id']) => {
    const resp = await http.get<TodoDetailApiResponseSchema | ErrorApiResponseSchema>(`todos/${id}`)

    return todoDetailApiResponseSchema.parse(resp.data)
  },
  create: async (todo: CreateTodoSchema) => {
    const resp = await http.post<CreateTodoApiResponseSchema | ErrorApiResponseSchema>(
      `todos/add`,
      todo
    )

    return createTodoApiResponseSchema.parse(resp.data)
  },
  update: async ({ id, ...body }: UpdateTodoSchema) => {
    const resp = await http.put<UpdateTodoApiResponseSchema | ErrorApiResponseSchema>(
      `todos/${id}`,
      body
    )

    return updateTodoApiResponseSchema.parse(resp.data)
  },
  delete: async (id: DeleteTodoSchema['id']) => {
    const resp = await http.delete<DeleteTodoApiResponseSchema | ErrorApiResponseSchema>(
      `todos/${id}`
    )

    return deleteTodoApiResponseSchema.parse(resp.data)
  }
} as const
