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
import { ListSlideTransition } from '@shared/components/atoms'

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
        <ListSlideTransition>
          <Toast
            v-for="toast in toasts"
            :key="toast.id"
            :toast="toast"
            :class="`alert alert-${toast.state.context.type} relative block overflow-hidden p-0 shadow-lg min-w-[20rem] max-w-[20rem]`"
          >
            <div class="flex items-center justify-between p-3">
              <ToastTitle :class="`font-bold text-${toast.state.context.type}-content`" />

              <ToastCloseTrigger>
                <button class="btn btn-ghost btn-xs">
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
        </ListSlideTransition>
      </ToastGroup>
    </ToastPlacements>

    <slot></slot>
  </ToastProvider>
</template>
