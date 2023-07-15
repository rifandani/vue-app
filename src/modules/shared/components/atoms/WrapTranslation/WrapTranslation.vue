<script setup lang="ts">
import type { LocalizedString } from 'typesafe-i18n'
import { useWrapTranslation } from './useWrapTranslation'

type Props = {
  message: LocalizedString
}

const props = defineProps<Props>()

const { prefix, infix, postfix } = useWrapTranslation(() => props)
</script>

<template>
  {{ prefix }}
  <slot :infix="infix"></slot>
  {{ postfix }}
</template>
