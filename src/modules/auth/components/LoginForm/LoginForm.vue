<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query'
import { toTypedSchema } from '@vee-validate/zod'
import { twJoin } from 'tailwind-merge'
import { useForm } from 'vee-validate'
import { useRouter } from 'vue-router'
import { typesafeI18n } from '../../../../i18n/i18n-vue'
import type { ErrorApiResponseSchema } from '../../../shared/api/error.schema'
import { useUserStorage } from '../../../shared/composables/useUserStorage/useUserStorage.composable'
import { login } from '../../api/auth.api'
import { loginSchema, type LoginApiResponseSchema, type LoginSchema } from '../../api/auth.schema'

const { LL } = typesafeI18n()
const user = useUserStorage()
const { push } = useRouter()

const loginMutation = useMutation<LoginApiResponseSchema, ErrorApiResponseSchema, LoginSchema>({
  mutationFn: (creds) => login(creds),
  onSuccess: async (resp) => {
    // set user data to local storage
    user.value = resp
    await push('/')
  }
})

const { defineInputBinds, handleSubmit, errors, meta } = useForm({
  validationSchema: toTypedSchema(loginSchema),
  initialValues: {
    username: '',
    password: ''
  }
})
const username = defineInputBinds('username', { validateOnInput: true })
const password = defineInputBinds('password', { validateOnInput: true })
const onSubmit = handleSubmit((values, context) => {
  loginMutation.mutate(values, {
    onError: () => {
      // reset form
      context.resetForm()
    }
  })
})
</script>

<template>
  <form data-testid="login-form" class="form-control pt-3 md:pt-8" @submit="onSubmit">
    <!-- username -->
    <div class="form-control pt-4">
      <label class="label" for="username">
        <span class="label-text">{{ LL.forms.password() }}</span>
      </label>

      <input
        v-bind="username"
        id="username"
        data-testid="login-input-username"
        name="username"
        type="text"
        required
        :placeholder="LL.forms.usernamePlaceholder()"
        :class="twJoin(['input mt-1 shadow-md', errors.username ? 'input-error' : 'input-primary'])"
      />

      <p v-if="errors.username" class="pl-5 pt-1 text-error">
        {{ LL.error.minLength({ field: 'username', length: 3 }) }}
      </p>
    </div>

    <!-- password -->
    <div class="form-control pt-4">
      <label class="label" for="password">
        <span class="label-text">{{ LL.forms.password() }}</span>
      </label>

      <input
        id="password"
        v-bind="password"
        data-testid="login-input-password"
        type="password"
        name="password"
        required
        :placeholder="LL.forms.passwordPlaceholder()"
        :class="twJoin(['input mt-1 shadow-md', errors.password ? 'input-error' : 'input-primary'])"
      />

      <p v-if="errors.password" class="pl-5 pt-1 text-error">
        {{ LL.error.passwordMinLength() }}
      </p>
    </div>

    <div v-if="loginMutation.isError.value" class="alert alert-error mt-3 shadow-lg">
      <div class="flex flex-col items-start">
        <span>{{ LL.forms.error({ icon: '❌' }) }}</span>
      </div>
    </div>

    <button
      data-testid="login-button"
      type="submit"
      class="btn-primary btn mt-8 normal-case"
      :disabled="!meta.valid || loginMutation.isLoading.value"
    >
      {{ loginMutation.isLoading.value ? LL.forms.loginLoading() : LL.forms.login() }}
    </button>
  </form>
</template>
