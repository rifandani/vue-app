<script setup lang="ts">
import { authApi } from '@auth/api/auth.api'
import { type LoginApiResponseSchema, type LoginSchema, loginSchema } from '@auth/api/auth.schema'
import { homeRoute } from '@home/routes/home.route'
import { typesafeI18n } from '@i18n/i18n-vue'
import { Icon } from '@iconify/vue'
import type { ErrorApiResponseSchema } from '@shared/api/error.schema'
import { useUserStorage } from '@shared/composables/useUserStorage/useUserStorage.composable'
import { useMutation } from '@tanstack/vue-query'
import { toTypedSchema } from '@vee-validate/zod'
import Button from 'primevue/button'
import InlineMessage from 'primevue/inlinemessage'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import { twJoin } from 'tailwind-merge'
import { useForm } from 'vee-validate'
import { useRouter } from 'vue-router'

const { LL } = typesafeI18n()
const user = useUserStorage()
const { push } = useRouter()

const { isPending, isError, mutate } = useMutation<
  LoginApiResponseSchema,
  ErrorApiResponseSchema,
  LoginSchema
>({
  mutationFn: creds => authApi.login(creds),
  onSuccess: async (resp) => {
    // set user data to local storage
    user.value = resp
    await push(homeRoute.path)
  },
})

const { defineComponentBinds, handleSubmit, errors } = useForm({
  validationSchema: toTypedSchema(loginSchema),
  initialValues: {
    username: '',
    password: '',
  },
})
const username = defineComponentBinds('username')
const password = defineComponentBinds('password')
const onSubmit = handleSubmit((values, context) => {
  mutate(values, {
    onError: () => {
      // reset form
      context.resetForm()
    },
  })
})
</script>

<template>
  <form data-testid="form-login" class="form-control pt-3 md:pt-8" @submit="onSubmit">
    <!-- username -->
    <label class="group/username flex flex-col items-start space-y-3 pt-4" for="username">
      <span class="label-text">{{ LL.forms.username() }}</span>

      <InputText
        v-bind="username"
        id="username"
        name="username"
        data-testid="input-username"
        aria-labelledby="#username-error"
        type="text"
        :required="true"
        :placeholder="LL.forms.usernamePlaceholder()"
        :class="twJoin('mt-1 w-full', !!errors.username && 'p-invalid')"
      />

      <small v-if="errors.username" id="username-error" class="p-error pt-1" role="alert">{{
        LL.error.minLength({ field: 'username', length: 3 })
      }}</small>
    </label>

    <!-- password -->
    <label class="group/password flex flex-col items-start space-y-3 pt-4" for="password">
      <span class="label-text">{{ LL.forms.password() }}</span>

      <Password
        v-bind="password"
        id="password"
        name="password"
        role="textbox"
        type="text"
        aria-labelledby="#password-error"
        :required="true"
        :feedback="false"
        :pt="{ input: { root: 'w-full' } }"
        :placeholder="LL.forms.passwordPlaceholder()"
        :class="twJoin('mt-1 w-full', !!errors.username && 'p-invalid')"
      />

      <small v-if="errors.password" id="password-error" class="p-error pt-1" role="alert">{{
        LL.error.passwordMinLength()
      }}</small>
    </label>

    <div v-if="isError" data-testid="login-error" class="mt-3 flex flex-col items-center">
      <InlineMessage severity="error">
        {{ LL.forms.error({ icon: '❌' }) }}:
      </InlineMessage>
    </div>

    <Button
      data-testid="button-login"
      type="submit"
      class="mt-8 w-full normal-case"
      :label="`${isPending ? LL.forms.loginLoading() : LL.forms.login()} (0lelplR)`"
      :loading="isPending"
    >
      <template #loadingicon>
        <Icon icon="svg-spinners:90-ring" />
      </template>
    </Button>
  </form>
</template>
