import type { ObjectDirective } from 'vue'

function autoGrow(evt: Event) {
  const textarea = evt.target as HTMLTextAreaElement

  textarea.style.height = 'auto'
  textarea.style.height = `${textarea.scrollHeight}px`
}

export const vAutoGrow: ObjectDirective<HTMLTextAreaElement> = {
  mounted: (el) => {
    el.addEventListener('input', autoGrow)
  },
  unmounted: (el) => {
    el.removeEventListener('input', autoGrow)
  },
}
