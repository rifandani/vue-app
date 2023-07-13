import { useMutation } from '@tanstack/vue-query'
import { toTypedSchema } from '@vee-validate/zod'
import { useLocalStorage } from '@vueuse/core'
import { useForm } from 'vee-validate'
import { useRouter } from 'vue-router'
import { typesafeI18n } from '../../../../i18n/i18n-vue'
import type { ErrorApiResponseSchema } from '../../../shared/api/error.schema'
import { login } from '../../api/auth.api'
import { loginSchema, type LoginApiResponseSchema, type LoginSchema } from '../../api/auth.schema'

export const useLoginForm = () => {
  const { LL } = typesafeI18n()
  const user = useLocalStorage<LoginApiResponseSchema | null>('user', null)
  const { push } = useRouter()

  const loginMutation = useMutation<LoginApiResponseSchema, ErrorApiResponseSchema, LoginSchema>({
    mutationFn: (creds) => login(creds),
    onSuccess: async (resp) => {
      // set user data to local storage
      user.value = resp
      await push('/')
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
    console.log('🚀 ~ file: LoginForm.vue:52 ~ onSubmit ~ values:', { values, context })
    loginMutation.mutate(values, {
      onError: () => {
        // reset form
        context.resetForm()
      }
    })
  })

  return { LL, loginMutation, form, onSubmit }
}
