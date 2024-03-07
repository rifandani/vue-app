<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useMutation } from '@tanstack/vue-query'
import { toTypedSchema } from '@vee-validate/zod'
import Button from 'primevue/button'
import InlineMessage from 'primevue/inlinemessage'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import { twJoin } from 'tailwind-merge'
import { useForm } from 'vee-validate'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import type { ErrorApiResponseSchema } from '#shared/schemas/error'
import { useUserStorage } from '#shared/composables/use-user-storage'
import { homeRoute } from '#home/routes'
import { type LoginApiResponseSchema, type LoginSchema, authApi, loginSchema } from '#auth/apis/auth'

const { t } = useI18n()
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
      <span class="label-text">{{ t('common.username') }}</span>

      <InputText
        v-bind="username" id="username" name="username" data-testid="input-username"
        aria-labelledby="#username-error" type="text" :required="true" :placeholder="t('common.usernamePlaceholder')"
        :class="twJoin('mt-1 w-full', !!errors.username && 'p-invalid')"
      />

      <small v-if="errors.username" id="username-error" class="p-error pt-1" role="alert">{{
        t('common.errorMinLength', { field: "username", length: 3 })
      }}</small>
    </label>

    <!-- password -->
    <label class="group/password flex flex-col items-start space-y-3 pt-4" for="password">
      <span class="label-text">{{ t('common.password') }}</span>

      <Password
        v-bind="password" id="password" name="password" role="textbox" type="text" aria-labelledby="#password-error"
        :required="true" :feedback="false" :pt="{ input: { root: { 'class': 'w-full', 'data-testid': 'input-password' } } }" :placeholder="t('common.passwordPlaceholder')" :class="twJoin('mt-1 w-full', !!errors.username && 'p-invalid')"
      />

      <small v-if="errors.password" id="password-error" class="p-error pt-1" role="alert">{{
        t('common.errorMinLength', { field: "password", length: 6 })
      }}</small>
    </label>

    <div v-if="isError" data-testid="login-error" class="mt-3 flex flex-col items-center">
      <InlineMessage severity="error">
        {{ t("common.error") }}:
      </InlineMessage>
    </div>

    <Button
      data-testid="button-login" type="submit" class="mt-8 w-full normal-case"
      :label="`${isPending ? t('common.loginLoading') : t('common.login')} (0lelplR)`" :loading="isPending"
    >
      <template #loadingicon>
        <Icon icon="svg-spinners:90-ring" />
      </template>
    </Button>
  </form>
</template>
