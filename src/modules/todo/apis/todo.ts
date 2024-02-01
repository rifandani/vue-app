import { z } from 'zod'
import type { ErrorApiResponseSchema } from '#shared/schemas/error'
import type { ResourceParamsSchema } from '#shared/schemas/resource'
import { http } from '#shared/services/http'
import { resourceListSchema } from '#shared/schemas/resource'

// #region MODEL SCHEMA
export const todoSchema = z.object({
  id: z.number().positive(),
  todo: z.string(),
  completed: z.boolean(),
  userId: z.number().positive(),
})
export const detailTodoSchema = todoSchema.pick({ id: true })
export const createTodoSchema = todoSchema
export const updateTodoSchema = todoSchema.omit({ userId: true })
export const deleteTodoSchema = detailTodoSchema
// #endregion

// #region API SCHEMA
export const todoListApiResponseSchema = resourceListSchema.extend({
  todos: z.array(todoSchema),
})
export const todoDetailApiResponseSchema = todoSchema
export const createTodoApiResponseSchema = todoSchema
export const updateTodoApiResponseSchema = todoSchema
export const deleteTodoApiResponseSchema = todoSchema.extend({
  isDeleted: z.literal(true),
  deletedOn: z.string().datetime(),
})
// #endregion

export type TodoSchema = z.infer<typeof todoSchema>
export type DetailTodoSchema = z.infer<typeof detailTodoSchema>
export type CreateTodoSchema = z.infer<typeof createTodoSchema>
export type UpdateTodoSchema = z.infer<typeof updateTodoSchema>
export type DeleteTodoSchema = z.infer<typeof deleteTodoSchema>
export type TodoListApiResponseSchema = z.infer<typeof todoListApiResponseSchema>
export type TodoDetailApiResponseSchema = z.infer<typeof todoDetailApiResponseSchema>
export type CreateTodoApiResponseSchema = z.infer<typeof createTodoApiResponseSchema>
export type UpdateTodoApiResponseSchema = z.infer<typeof updateTodoApiResponseSchema>
export type DeleteTodoApiResponseSchema = z.infer<typeof deleteTodoApiResponseSchema>

export const todoKeys = {
  all: ['todos'] as const,
  lists: () => [...todoKeys.all, 'list'] as const,
  list: (params: ResourceParamsSchema) => [...todoKeys.lists(), params] as const,
  details: () => [...todoKeys.all, 'detail'] as const,
  detail: (id: TodoSchema['id']) => [...todoKeys.details(), id] as const,
}

export const todoApi = {
  list: async (params: ResourceParamsSchema) => {
    const resp = await http.get<TodoListApiResponseSchema | ErrorApiResponseSchema>('todos', {
      params,
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
      todo,
    )

    return createTodoApiResponseSchema.parse(resp.data)
  },
  update: async ({ id, ...body }: UpdateTodoSchema) => {
    const resp = await http.put<UpdateTodoApiResponseSchema | ErrorApiResponseSchema>(
      `todos/${id}`,
      body,
    )

    return updateTodoApiResponseSchema.parse(resp.data)
  },
  delete: async (id: DeleteTodoSchema['id']) => {
    const resp = await http.delete<DeleteTodoApiResponseSchema | ErrorApiResponseSchema>(
      `todos/${id}`,
    )

    return deleteTodoApiResponseSchema.parse(resp.data)
  },
} as const
