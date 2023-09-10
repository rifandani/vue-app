import { authApi } from '@auth/api/auth.api'
import { loginSchema, type LoginApiResponseSchema, type LoginSchema } from '@auth/api/auth.schema'
import { homeRoute } from '@home/routes/home.route'
import { typesafeI18n } from '@i18n/i18n-vue'
import type { ErrorApiResponseSchema } from '@shared/api/error.schema'
import { useUserStorage } from '@shared/composables/useUserStorage/useUserStorage.composable'
import { useMutation } from '@tanstack/vue-query'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { useRouter } from 'vue-router'

// NOTE: not used due to weird type error
// "The inferred type of useLoginForm cannot be named without a reference to..."
export const useLoginForm = () => {
  const { LL } = typesafeI18n()
  const user = useUserStorage()
  const { push } = useRouter()

  const loginMutation = useMutation<LoginApiResponseSchema, ErrorApiResponseSchema, LoginSchema>({
    mutationFn: (creds) => authApi.login(creds),
    onSuccess: async (resp) => {
      // set user data to local storage
      user.value = resp
      await push(homeRoute.path)
    }
  })

  const form = useForm({
    validationSchema: toTypedSchema(loginSchema),
    initialValues: {
      username: '',
      password: ''
    }
  })

  const onSubmit = form.handleSubmit((values, context) => {
    loginMutation.mutate(values, {
      onError: () => {
        // reset form
        context.resetForm()
      }
    })
  })

  return { LL, loginMutation, form, onSubmit }
}
