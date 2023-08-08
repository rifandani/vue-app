import type { SetRequired } from 'type-fest'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import type { ResourceParamsSchema } from '../../shared/api/resource.schema'
import { createSearchParamsFromObject } from '../../shared/utils/helper.util'
import { todoKeys } from '../api/todo.api'
import { defaultLimit } from '../constants/todos.constant'

export const useTodoListParams = () => {
  const route = useRoute()

  const searchParams = computed(() => createSearchParamsFromObject(route.query))
  const queryParams = computed<SetRequired<ResourceParamsSchema, 'limit'>>(() => ({
    ...route.query,
    limit: Number(route.query.limit ?? defaultLimit)
  }))
  const queryKey = computed(() =>
    todoKeys.list({
      ...route.query,
      limit: Number(route.query.limit ?? defaultLimit)
    })
  )

  return { searchParams, queryParams, queryKey } as const
}
