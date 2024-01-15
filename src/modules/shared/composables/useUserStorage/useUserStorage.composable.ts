import { type RemovableRef, useLocalStorage } from '@vueuse/core'
import type { LoginApiResponseSchema } from '#auth/api/auth.schema'

type UseUserStorage = RemovableRef<LoginApiResponseSchema | null>

export function useUserStorage(): UseUserStorage {
  return useLocalStorage<LoginApiResponseSchema | null>('user', null, {
    serializer: {
      read: (v: any) => (v ? JSON.parse(v) : null),
      write: (v: any) => JSON.stringify(v),
    },
  })
}
