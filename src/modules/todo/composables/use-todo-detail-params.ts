import { type ComputedRef, computed } from 'vue'
import { todoKeys } from '#todo/apis/todo'

interface UseTodoDetailQuery {
  id: ComputedRef<number>
}

export function useTodoDetailParams({ id }: UseTodoDetailQuery) {
  const enabled = computed(() => id.value > 0)
  const queryKey = computed(() => todoKeys.detail(id.value))

  return { enabled, queryKey } as const
}
