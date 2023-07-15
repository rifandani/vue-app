import { useRouter } from 'vue-router'
import { typesafeI18n } from '../../../../../i18n/i18n-vue'
import { useUserStorage } from '../../../composables/useUserStorage/useUserStorage.composable'

export const useNavBar = () => {
  // #region VALUES
  const { replace } = useRouter()
  const { LL } = typesafeI18n()
  const user = useUserStorage()
  // #endregion

  //#region HANDLERS
  const logout = (): void => {
    user.value = null // reset `user` store
    replace('/login') // back to login
  }
  //#endregion

  return { LL, logout }
}
