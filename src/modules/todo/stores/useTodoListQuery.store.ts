import { useRoute } from 'vue-router'

export const useTodoListQuery = () => {
  const route = useRoute()

  // const queryOptions = {
  //   queryKey: todoKeys.list($queryParams),
  //   queryFn: () => todoApi.list($queryParams)
  // }

  return { route } as const
}
