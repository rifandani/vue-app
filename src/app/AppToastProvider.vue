<script setup lang="ts">
import {
  Toast,
  ToastCloseTrigger,
  ToastDescription,
  ToastGroup,
  ToastPlacements,
  ToastProvider,
  ToastTitle
} from '@ark-ui/vue'
import { Icon } from '@iconify/vue'
import { twMerge } from 'tailwind-merge'

const max = 5
</script>

<template>
  <ToastProvider :max="max">
    <ToastPlacements v-slot="{ placements }">
      <ToastGroup
        v-for="(placement, placementIdx) in placements"
        :key="placementIdx"
        v-slot="{ toasts }"
        :placement="placement"
      >
        <Toast
          v-for="toast in toasts"
          :key="toast.id"
          :toast="toast"
          :class="`alert alert-${toast.state.context.type} relative block overflow-hidden p-0 shadow-lg min-w-[20rem] max-w-[20rem]`"
        >
          <div
            :class="
              twMerge([
                'flex items-center justify-between p-3',
                !toast.state.context?.description && 'pb-5'
              ])
            "
          >
            <ToastTitle :class="`font-bold text-${toast.state.context.type}-content`" />

            <ToastCloseTrigger>
              <button class="btn-ghost btn-xs btn">
                <Icon icon="lucide:x" height="1.5em" />
              </button>
            </ToastCloseTrigger>
          </div>

          <ToastDescription
            class="line-clamp-3 max-w-[90%] whitespace-pre-wrap break-words px-3 pb-5 text-sm"
          />

          <!-- NOTE: not reactive -->
          <progress
            :class="`progress progress-${toast.state.context.type} absolute bottom-0`"
            :value="toast.state.context.remaining"
            :max="toast.state.context.duration"
          />
        </Toast>
      </ToastGroup>
    </ToastPlacements>

    <slot></slot>
  </ToastProvider>
</template>
