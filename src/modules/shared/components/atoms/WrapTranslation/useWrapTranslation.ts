import type { LocalizedString } from 'typesafe-i18n'
import { type MaybeRefOrGetter, ref, toValue, watchEffect } from 'vue'

interface Props {
  message: string
}

export function useWrapTranslation(props: MaybeRefOrGetter<Props>) {
  const value = toValue(props)
  const prefix = ref(value.message.split('<>')[0])
  const infix = ref(value.message.split('<>')[1])
  const postfix = ref(value.message.split('<>')[2])

  watchEffect(() => {
    // render infix only if the message doesn't have any split characters
    if (!infix.value && !postfix.value) {
      infix.value = prefix.value
      prefix.value = '' as LocalizedString
    }
  })

  return { prefix, infix, postfix }
}
