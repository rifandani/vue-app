<script setup lang="ts">
import { useLoginForm } from '@/modules/auth/components/LoginForm/useLoginForm.hook'
import { twMerge } from 'tailwind-merge'

const { LL, loginMutation, form, onSubmit } = useLoginForm()

const username = form.defineInputBinds('username')
const password = form.defineInputBinds('password')
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
            form.errors.value?.username?.length ? 'input-error' : 'input-primary'
          )
        "
        id="username"
        data-testid="input-username"
        name="username"
        type="text"
        required
      />

      <p v-if="form.errors.value?.username?.length" class="pl-5 pt-1 text-error">
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
            form.errors.value?.password?.length ? 'input-error' : 'input-primary'
          )
        "
        id="password"
        data-testid="input-password"
        type="password"
        name="password"
        required
      />

      <p v-if="form.errors.value?.password?.length" class="pl-5 pt-1 text-error">
        {{ LL.error.passwordMinLength() }}
      </p>
    </div>

    <div v-if="loginMutation.isError.value" class="alert alert-error mt-3 shadow-lg">
      <div class="flex flex-col items-start">
        <span>{{ LL.forms.error({ icon: '❌' }) }}</span>
      </div>
    </div>

    <button
      :disabled="!form.meta.value.valid || loginMutation.isLoading.value"
      type="submit"
      data-testid="button-submit"
      class="btn-primary btn mt-8 normal-case"
    >
      {{ loginMutation.isLoading ? LL.forms.loginLoading() : LL.forms.login() }}
    </button>
  </form>
</template>
