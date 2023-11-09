import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'
import daisyui from 'daisyui'
import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'
import plugin from 'tailwindcss/plugin'
const animate = require('tailwindcss-animate')

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class', // default 'media'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Josefin Sans', ...defaultTheme.fontFamily.sans]
      },
      lineClamp: {
        7: '7',
        8: '8',
        9: '9',
        10: '10'
      },
      keyframes: {
        'swipe-right': {
          '0%': {
            '-webkit-transform': 'translateX(var(--kb-toast-swipe-end-x))',
            transform: 'translateX(var(--kb-toast-swipe-end-x))'
          },
          '100%': {
            '-webkit-transform': 'translateX(var(--kb-toast-swipe-end-x))',
            transform: 'translateX(var(--kb-toast-swipe-end-x))'
          }
        }
      },
      animation: {
        'swipe-right': 'swipe-right 0.5s ease-out both'
      }
    }
  },
  plugins: [
    typography,
    forms,
    daisyui,
    animate,
    plugin(({ matchUtilities }) => {
      matchUtilities({
        vg: (value) => ({
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          [`@apply ${value.replaceAll(',', ' ')}`]: {}
        })
      })
    })
  ],
  daisyui: {
    logs: false,
    themes: [
      'light',
      'dark',
      'cupcake',
      'bumblebee',
      'emerald',
      'corporate',
      'synthwave',
      'retro',
      'cyberpunk',
      'valentine',
      'halloween',
      'garden',
      'forest',
      'aqua',
      'lofi',
      'pastel',
      'fantasy',
      'wireframe',
      'black',
      'luxury',
      'dracula',
      'cmyk',
      'autumn',
      'business',
      'acid',
      'lemonade',
      'night',
      'coffee',
      'winter'
    ]
  }
} satisfies Config
