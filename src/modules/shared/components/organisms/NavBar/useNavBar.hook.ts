import { useLocalStorage } from '@vueuse/core'
import { themeChange } from 'theme-change'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { typesafeI18n } from '@/i18n/i18n-vue'
import type { LoginApiResponseSchema } from '@/modules/auth/api/auth.schema'

export const useNavBar = () => {
  // #region VALUES
  const { LL } = typesafeI18n()
  const user = useLocalStorage<LoginApiResponseSchema | null>('user', null)
  const { replace } = useRouter()
  // #endregion

  //#region HANDLERS
  const logout = () => {
    user.value = null // reset `user` store
    void replace('/login') // back to login
  }
  //#endregion

  onMounted(() => themeChange(false))

  return { LL, logout }
}
