import type { SetRequired } from 'type-fest'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { defaultLimit } from '#todo/constants/todos'
import { todoKeys } from '#todo/apis/todo'
import { createSearchParamsFromObject } from '#shared/utils/helper'
import type { ResourceParamsSchema } from '#shared/schemas/resource'

export function useTodoListParams() {
  const route = useRoute()

  const searchParams = computed(() => createSearchParamsFromObject(route.query))
  const queryParams = computed<SetRequired<ResourceParamsSchema, 'limit'>>(() => ({
    ...route.query,
    limit: Number(route.query.limit ?? defaultLimit),
  }))
  const queryKey = computed(() =>
    todoKeys.list({
      ...route.query,
      limit: Number(route.query.limit ?? defaultLimit),
    }),
  )

  return { searchParams, queryParams, queryKey } as const
}
