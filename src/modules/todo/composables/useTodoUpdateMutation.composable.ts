import { useToast } from '@ark-ui/vue'
import { typesafeI18n } from '@i18n/i18n-vue'
import type { ErrorApiResponseSchema } from '@shared/api/error.schema'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { todoApi, todoKeys } from '@todo/api/todo.api'
import type {
  TodoListApiResponseSchema,
  UpdateTodoApiResponseSchema,
  UpdateTodoSchema
} from '@todo/api/todo.schema'
import type { ComputedRef } from 'vue'

type CreateTodoUpdateMutationProps = {
  queryKey: ComputedRef<ReturnType<typeof todoKeys.list>>
}

export const useTodoUpdateMutation = ({ queryKey }: CreateTodoUpdateMutationProps) => {
  const queryClient = useQueryClient()
  const { LL } = typesafeI18n()
  const toast = useToast()

  return useMutation<
    UpdateTodoApiResponseSchema,
    ErrorApiResponseSchema,
    UpdateTodoSchema,
    { previousTodosQueryResponse: TodoListApiResponseSchema }
  >({
    // Called before `mutationFn`:
    onMutate: async ({ id, ...body }) => {
      const emptyResponse: TodoListApiResponseSchema = {
        limit: 10,
        todos: [],
        skip: 0,
        total: 0
      }
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey })

      // Snapshot the previous value
      const previousTodosQueryResponse =
        (queryClient.getQueryData(queryKey) as TodoListApiResponseSchema) ?? emptyResponse

      // Optimistically update to the new value
      queryClient.setQueryData(queryKey, {
        ...previousTodosQueryResponse,
        todos: previousTodosQueryResponse.todos.map((_todo) =>
          _todo.id === id ? { ..._todo, ...body } : _todo
        )
      })

      // Return a context object with the snapshotted value
      return { previousTodosQueryResponse }
    },
    mutationFn: (updateTodo) => todoApi.update(updateTodo),
    onSettled: (_updateTodo, error, _variables, context) => {
      toast.value.create({
        type: error ? 'error' : 'success',
        title: error
          ? LL.value.error.action({ module: 'Todo', action: 'update' })
          : LL.value.success.action({ module: 'Todo', action: 'updated' })
      })

      // If the mutation fails, use the context returned from `onMutate` to roll back
      if (error) queryClient.setQueryData(queryKey, context?.previousTodosQueryResponse)

      // if we want to refetch after error or success:
      // await queryClient.invalidateQueries({ queryKey });
    }
  })
}
