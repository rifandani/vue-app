<script setup lang="ts">
import { vAutoGrow } from '@shared/directives/autoGrow/autoGrow.directive'
</script>

<template>
  <section class="mt-5 flex w-full flex-col items-center rounded-md p-5 shadow-md">
    <h4>Auto grow directive</h4>

    <label for="message">
      <textarea id="message" v-auto-grow placeholder="Type your message here"></textarea>
    </label>
  </section>
</template>
