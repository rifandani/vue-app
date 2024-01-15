const forms = require('@tailwindcss/forms')
const typography = require('@tailwindcss/typography')
const animate = require('tailwindcss-animate')
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/primevue/**/*.{vue,js,ts,jsx,tsx}',
  ],
  darkMode: 'class', // default 'media'
  theme: {
    extend: {
      colors: {
        surface: {
          a: 'var(--surface-a)',
          b: 'var(--surface-b)',
          c: 'var(--surface-c)',
          d: 'var(--surface-d)',
          e: 'var(--surface-e)',
          f: 'var(--surface-f)',
          0: 'var(--surface-0)',
          50: 'var(--surface-50)',
          100: 'var(--surface-100)',
          200: 'var(--surface-200)',
          300: 'var(--surface-300)',
          400: 'var(--surface-400)',
          500: 'var(--surface-500)',
          600: 'var(--surface-600)',
          700: 'var(--surface-700)',
          800: 'var(--surface-800)',
          900: 'var(--surface-900)',
        },
        color: {
          'DEFAULT': 'var(--text-color)',
          'secondary': 'var(--text-color-secondary)',
          'primary': 'var(--primary-color)',
          'primary-text': 'var(--primary-color-text)',
        },
        primary: {
          0: 'var(--primary-0)',
          50: 'var(--primary-50)',
          100: 'var(--primary-100)',
          200: 'var(--primary-200)',
          300: 'var(--primary-300)',
          400: 'var(--primary-400)',
          500: 'var(--primary-500)',
          600: 'var(--primary-600)',
          700: 'var(--primary-700)',
          800: 'var(--primary-800)',
          900: 'var(--primary-900)',
        },
      },
      lineClamp: {
        7: '7',
        8: '8',
        9: '9',
        10: '10',
      },
      keyframes: {
        'progressbar-indeterminate': {
          from: { transform: 'translate(0)' },
          to: { transform: 'translate(175%)' },
        },
      },
      animation: {
        'progressbar-indeterminate':
          'progressbar-indeterminate 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [
    typography,
    forms,
    animate,
    plugin(({ matchUtilities, addUtilities }) => {
      matchUtilities({
        vg: value => ({
          [`@apply ${value.replaceAll(',', ' ')}`]: {},
        }),
      })

      addUtilities({
        '.content-v-auto': {
          'content-visibility': 'auto',
        },
        '.content-v-hidden': {
          'content-visibility': 'hidden',
        },
        '.content-v-visible': {
          'content-visibility': 'visible',
        },
      })
    }),
  ],
}
