import type { ErrorApiResponseSchema } from '@shared/api/error.schema'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { todoApi, todoKeys } from '@todo/api/todo.api'
import type {
  CreateTodoApiResponseSchema,
  CreateTodoSchema,
  TodoListApiResponseSchema
} from '@todo/api/todo.schema'
import { defaultLimit } from '@todo/constants/todos.constant'
import type { ComputedRef } from 'vue'

type UseTodoCreateMutationProps = {
  queryKey: ComputedRef<ReturnType<typeof todoKeys.list>>
}

export const useTodoCreateMutation = ({ queryKey }: UseTodoCreateMutationProps) => {
  const queryClient = useQueryClient()

  return useMutation<
    CreateTodoApiResponseSchema,
    ErrorApiResponseSchema,
    CreateTodoSchema,
    { previousTodosQueryResponse: TodoListApiResponseSchema }
  >({
    // Called before `mutationFn`:
    onMutate: async (newTodo) => {
      const limit = Number(queryKey.value[2]?.limit ?? defaultLimit)
      const emptyResponse: TodoListApiResponseSchema = {
        limit,
        todos: [],
        skip: 0,
        total: 0
      }
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: queryKey })

      // Snapshot the previous value
      const previousTodosQueryResponse =
        (queryClient.getQueryData(queryKey) as TodoListApiResponseSchema) ?? emptyResponse

      // Optimistically update to the new value & delete the last value
      queryClient.setQueryData(queryKey, {
        ...previousTodosQueryResponse,
        todos: [newTodo, ...previousTodosQueryResponse.todos.slice(0, limit - 1)]
      })

      // Return a context object with the snapshotted value
      return { previousTodosQueryResponse }
    },
    mutationFn: (newTodo) => todoApi.create(newTodo)
  })
}
