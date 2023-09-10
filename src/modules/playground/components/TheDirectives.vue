<script setup lang="ts">
import { vAutoGrow } from '@shared/directives/autoGrow/autoGrow.directive'
</script>

<template>
  <section class="card flex w-full flex-col items-center space-y-3 rounded-lg border p-5 shadow-lg">
    <label for="message">
      <textarea id="message" v-auto-grow placeholder="Type your message here"></textarea>
    </label>
  </section>
</template>
