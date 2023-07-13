<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query'
import { toTypedSchema } from '@vee-validate/zod'
import { useLocalStorage } from '@vueuse/core'
import { twMerge } from 'tailwind-merge'
import { useForm } from 'vee-validate'
import { useRouter } from 'vue-router'
import { typesafeI18n } from '../../../../i18n/i18n-vue'
import type { ErrorApiResponseSchema } from '../../../shared/api/error.schema'
import { login } from '../../api/auth.api'
import { loginSchema, type LoginApiResponseSchema, type LoginSchema } from '../../api/auth.schema'

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

const { meta, errors, handleSubmit, defineInputBinds } = useForm({
  validationSchema: toTypedSchema(loginSchema),
  initialValues: {
    username: '',
    password: ''
  }
})

const onSubmit = handleSubmit((values, context) => {
  loginMutation.mutate(values, {
    onError: () => {
      // reset form
      context.resetForm()
    }
  })
})

const username = defineInputBinds('username')
const password = defineInputBinds('password')
</script>

<template>
  <form data-testid="form" class="form-control pt-3 md:pt-8" @submit="onSubmit">
    <!-- username -->
    <div class="form-control pt-4">
      <label class="label" for="username">
        <span class="label-text">{{ LL.forms.password() }}</span>
      </label>

      <input
        v-bind="username"
        :placeholder="LL.forms.usernamePlaceholder()"
        :class="
          twMerge(
            'input mt-1 shadow-md'
            errors?.username?.length ? 'input-error' : 'input-primary'
          )
        "
        id="username"
        data-testid="input-username"
        name="username"
        type="text"
        required
      />

      <p v-if="errors?.username?.length" class="pl-5 pt-1 text-error">
        {{ LL.error.minLength({ field: 'username', length: 3 }) }}
      </p>
    </div>

    <!-- password -->
    <div class="form-control pt-4">
      <label class="label" for="password">
        <span class="label-text">{{ LL.forms.password() }}</span>
      </label>

      <input
        v-bind="password"
        :placeholder="LL.forms.passwordPlaceholder()"
        :class="
          twMerge(
            'input mt-1 shadow-md'
            errors?.password?.length ? 'input-error' : 'input-primary'
          )
        "
        id="password"
        data-testid="input-password"
        type="password"
        name="password"
        required
      />

      <p v-if="errors?.password?.length" class="pl-5 pt-1 text-error">
        {{ LL.error.passwordMinLength() }}
      </p>
    </div>

    <div v-if="loginMutation.isError.value" class="alert alert-error mt-3 shadow-lg">
      <div class="flex flex-col items-start">
        <span>{{ LL.forms.error({ icon: '❌' }) }}</span>
      </div>
    </div>

    <button
      :disabled="!meta.valid || loginMutation.isLoading.value"
      type="submit"
      data-testid="button-submit"
      class="btn-primary btn mt-8 normal-case"
    >
      {{ loginMutation.isLoading ? LL.forms.loginLoading() : LL.forms.login() }}
    </button>
  </form>
</template>