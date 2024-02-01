import { type RemovableRef, useLocalStorage } from '@vueuse/core'
import type { LoginApiResponseSchema } from '#auth/apis/auth'

type UseUserStorage = RemovableRef<LoginApiResponseSchema | null>

/**
 * hooks to sync with local storage state with key "user"
 */
export function useUserStorage(): UseUserStorage {
  return useLocalStorage<LoginApiResponseSchema | null>('user', null, {
    serializer: {
      read: (v: any) => (v ? JSON.parse(v) : null),
      write: (v: any) => JSON.stringify(v),
    },
  })
}
