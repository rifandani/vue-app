<script setup lang="ts">
const props = defineProps<{ seconds: number, minutes: number, hours: number }>()
</script>

<template>
  <section data-testid="clock-section-timer" class="mt-8">
    <svg class="size-full" viewBox="-50 -50 100 100">
      <circle class="fill-white stroke-zinc-900" r="48" />

      <!-- markers -->
      <template v-for="minute in [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]" :key="minute">
        <line class="stroke-zinc-300 stroke-1" y1="35" y2="45" :transform="`rotate(${30 * minute})`" />

        <line
          v-for="offset in [1, 2, 3, 4]" :key="offset" class="stroke-zinc-500 stroke-1" y1="42" y2="45"
          :transform="`rotate(${6 * (minute + offset)})`"
        />
      </template>

      <!-- hour hand -->
      <line class="stroke-zinc-500" y1="2" y2="-20" :transform="`rotate(${30 * hours + minutes / 2})`" />

      <!-- minute hand -->
      <line class="stroke-zinc-500" y1="4" y2="-30" :transform="`rotate(${6 * minutes + seconds / 10})`" />

      <!-- second hand -->
      <g :transform="`rotate(${6 * props.seconds})`">
        <line class="stroke-zinc-700" y1="10" y2="-38" />
        <line class="stroke-zinc-700 stroke-2" y1="10" y2="2" />
      </g>
    </svg>
  </section>
</template>
