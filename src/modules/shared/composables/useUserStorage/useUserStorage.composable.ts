import type { LoginApiResponseSchema } from '@auth/api/auth.schema'
import { useLocalStorage, type RemovableRef } from '@vueuse/core'

type UseUserStorage = RemovableRef<LoginApiResponseSchema | null>

export const useUserStorage = (): UseUserStorage => {
  return useLocalStorage<LoginApiResponseSchema | null>('user', null, {
    serializer: {
      read: (v: any) => (v ? JSON.parse(v) : null),
      write: (v: any) => JSON.stringify(v)
    }
  })
}
