<script setup lang="ts">
import { vAutoGrow } from '@shared/directives/autoGrow/autoGrow.directive'
</script>

<template>
  <section
    class="card flex w-full flex-col items-center space-y-3 rounded-lg border bg-secondary p-5 text-secondary-content shadow-lg"
  >
    <label for="message">
      <textarea id="message" v-auto-grow placeholder="Type your message here"></textarea>
    </label>
  </section>
</template>
