import { addons } from '@storybook/manager-api'
import { create } from '@storybook/theming/create'

const customTheme = create({
  base: 'dark',
  brandTitle: 'Vue App Storybook',
  brandUrl: 'https://vue-app-rifandani.vercel.app',
  brandImage: 'https://www.vectorlogo.zone/logos/vuejs/vuejs-icon.svg',
  brandTarget: '_self',

  // Typography
  fontBase: '"Lato", sans-serif',
  fontCode: 'monospace',
})

addons.setConfig({
  theme: customTheme,
})
