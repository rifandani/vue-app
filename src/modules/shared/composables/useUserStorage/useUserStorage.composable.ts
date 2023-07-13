import { useLocalStorage, type RemovableRef } from '@vueuse/core'
import type { LoginApiResponseSchema } from '@/modules/auth/api/auth.schema'

type UseUserStorage = {
  user: RemovableRef<LoginApiResponseSchema | null>
}

export const useUserStorage = (): UseUserStorage => {
  const user = useLocalStorage<LoginApiResponseSchema | null>('user', null)

  return { user }
}
