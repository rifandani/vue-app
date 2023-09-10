import { useToast } from '@ark-ui/vue'
import { typesafeI18n } from '@i18n/i18n-vue'
import type { ErrorApiResponseSchema } from '@shared/api/error.schema'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { todoApi, todoKeys } from '@todo/api/todo.api'
import type {
  DeleteTodoApiResponseSchema,
  DeleteTodoSchema,
  TodoListApiResponseSchema
} from '@todo/api/todo.schema'
import type { ComputedRef } from 'vue'

type CreateTodoDeleteMutationProps = {
  queryKey: ComputedRef<ReturnType<typeof todoKeys.list>>
}

export const useTodoDeleteMutation = ({ queryKey }: CreateTodoDeleteMutationProps) => {
  const queryClient = useQueryClient()
  const { LL } = typesafeI18n()
  const toast = useToast()

  return useMutation<
    DeleteTodoApiResponseSchema,
    ErrorApiResponseSchema,
    DeleteTodoSchema['id'],
    { previousTodosQueryResponse: TodoListApiResponseSchema }
  >({
    // Called before `mutationFn`:
    onMutate: async (id) => {
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
        todos: previousTodosQueryResponse.todos.filter((_todo) => _todo.id !== id)
      })

      // Return a context object with the snapshotted value
      return { previousTodosQueryResponse }
    },
    mutationFn: (id) => todoApi.delete(id),
    onSettled: (_id, error, _variables, context) => {
      toast.value.create({
        type: error ? 'error' : 'success',
        title: error
          ? LL.value.error.action({ module: 'Todo', action: 'delete' })
          : LL.value.success.action({ module: 'Todo', action: 'deleted' })
      })

      // If the mutation fails, use the context returned from `onMutate` to roll back
      if (error) queryClient.setQueryData(queryKey, context?.previousTodosQueryResponse)

      // if we want to refetch after error or success:
      // await queryClient.invalidateQueries({ queryKey });
    }
  })
}
