<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useMutation } from '@tanstack/vue-query'
import { toTypedSchema } from '@vee-validate/zod'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import type { ErrorApiResponseSchema } from '#shared/schemas/error'
import { useUserStorage } from '#shared/composables/use-user-storage'
import { homeRoute } from '#home/routes'
import { type LoginApiResponseSchema, type LoginSchema, authApi, loginSchema } from '#auth/apis/auth'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '#shared/components/ui/form'
import { Input } from '#shared/components/ui/input'
import { Button } from '#shared/components/ui/button'

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
</script>

<template>
  <!-- examples of using composed Form component -->
  <Form
    data-testid="form-login" class="form-control pt-3 md:pt-8"
    :validation-schema="toTypedSchema(loginSchema)" @submit="(values, context) => {
      mutate(values as LoginSchema, {
        onError: () => {
          // reset form
          context.resetForm()
        },
      })
    }"
  >
    <FormField v-slot="{ componentField }" name="username">
      <FormItem>
        <FormLabel>{{ t('common.username') }}</FormLabel>
        <FormControl>
          <Input
            id="username" data-testid="input-username" type="text" :placeholder="t('common.usernamePlaceholder')"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage id="username-error" />
        <!-- {{ t('common.errorMinLength', { field: "username", length: 3 }) }} -->
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="password">
      <FormItem>
        <FormLabel>{{ t('common.password') }}</FormLabel>
        <FormControl>
          <Input
            id="password" data-testid="input-password" type="password"
            :placeholder="t('common.passwordPlaceholder')" v-bind="componentField"
          />
        </FormControl>
        <FormMessage id="password-error" />
        <!-- {{ t('common.errorMinLength', { field: "username", length: 3 }) }} -->
      </FormItem>
    </FormField>

    <div v-if="isError" data-testid="login-error" class="mt-3 flex flex-col items-center">
      <p class="text-destructive">
        {{ t("common.error") }}:
      </p>
    </div>

    <Button data-testid="button-login" type="submit" class="flex space-x-2" :disabled="isPending">
      <p>{{ isPending ? t('common.loginLoading') : t('common.login') }} (0lelplR)</p>
      <Icon v-if="isPending" icon="svg-spinners:90-ring" />
    </Button>
  </Form>
</template>
