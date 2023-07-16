import type { UseQueryOptions } from '@tanstack/vue-query'
import { computed, type ComputedRef } from 'vue'
import type { ErrorApiResponseSchema } from '../../shared/api/error.schema'
import { todoApi, todoKeys } from '../api/todo.api'
import type { TodoDetailApiResponseSchema } from '../api/todo.schema'

type UseTodoDetailQuery = {
  id: ComputedRef<number>
}

export const useTodoDetailParams = ({ id }: UseTodoDetailQuery) => {
  const enabled = computed(() => id.value > 0)
  const queryKey = computed(() => todoKeys.detail(id.value))
  const queryOptions = computed<
    UseQueryOptions<
      TodoDetailApiResponseSchema,
      ErrorApiResponseSchema,
      TodoDetailApiResponseSchema,
      ReturnType<typeof todoKeys.detail>
    >
  >(() => ({
    enabled,
    queryKey,
    queryFn: ({ queryKey }) => todoApi.detail(queryKey[2])
  }))

  return { queryKey, queryOptions } as const
}
