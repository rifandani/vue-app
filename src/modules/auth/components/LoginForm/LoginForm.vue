<script setup lang="ts">
import { login } from '@auth/api/auth.api'
import { loginSchema, type LoginApiResponseSchema, type LoginSchema } from '@auth/api/auth.schema'
import { typesafeI18n } from '@i18n/i18n-vue'
import type { ErrorApiResponseSchema } from '@shared/api/error.schema'
import { useUserStorage } from '@shared/composables/useUserStorage/useUserStorage.composable'
import { useMutation } from '@tanstack/vue-query'
import { toTypedSchema } from '@vee-validate/zod'
import { twJoin } from 'tailwind-merge'
import { useForm } from 'vee-validate'
import { useRouter } from 'vue-router'

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
  <form aria-label="form-login" class="form-control pt-3 md:pt-8" @submit="onSubmit">
    <!-- username -->
    <fieldset class="form-control pt-4">
      <label class="label flex-col items-start space-y-3" for="username">
        <span class="label-text">{{ LL.forms.username() }}</span>

        <input
          v-bind="username"
          id="username"
          name="username"
          type="text"
          aria-label="textbox-username"
          aria-labelledby="#username"
          :aria-invalid="errors.username ? 'true' : 'false'"
          required
          :placeholder="LL.forms.usernamePlaceholder()"
          :class="
            twJoin([
              'input mt-1 w-full shadow-md',
              errors.username ? 'input-error' : 'input-primary'
            ])
          "
        />
      </label>

      <p v-if="errors.username" role="alert" class="pl-5 pt-1 text-error">
        {{ LL.error.minLength({ field: 'username', length: 3 }) }}
      </p>
    </fieldset>

    <!-- password -->
    <fieldset class="form-control pt-4">
      <label class="label flex-col items-start space-y-3" for="password">
        <span class="label-text">{{ LL.forms.password() }}</span>

        <input
          v-bind="password"
          id="password"
          name="password"
          role="textbox"
          type="password"
          aria-label="textbox-password"
          aria-labelledby="#password"
          :aria-invalid="errors.password ? 'true' : 'false'"
          required
          :placeholder="LL.forms.passwordPlaceholder()"
          :class="
            twJoin([
              'input mt-1 w-full shadow-md',
              errors.password ? 'input-error' : 'input-primary'
            ])
          "
        />
      </label>

      <p v-if="errors.password" role="alert" class="pl-5 pt-1 text-error">
        {{ LL.error.passwordMinLength() }}
      </p>
    </fieldset>

    <div v-if="loginMutation.isError.value" class="alert alert-error mt-3 shadow-lg">
      <p>{{ LL.forms.error({ icon: '❌' }) }}</p>
    </div>

    <button
      id="button-submit"
      type="submit"
      class="btn btn-primary mt-8 normal-case disabled:btn-disabled"
      :disabled="!meta.valid || loginMutation.isLoading.value"
    >
      {{ loginMutation.isLoading.value ? LL.forms.loginLoading() : LL.forms.login() }}
    </button>
  </form>
</template>
