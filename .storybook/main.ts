import type { AddonOptionsVite } from '@storybook/addon-coverage'
import type { StorybookConfig } from '@storybook/vue3-vite'

const coverageConfig: AddonOptionsVite = {
  istanbul: {
    // exclude: ['**/exampleDirectory/**'],
  },
}

const config: StorybookConfig = {
  stories: ['../docs/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  staticDirs: ['../docs/assets'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    {
      name: '@storybook/addon-coverage',
      options: coverageConfig,
    },
    '@storybook/addon-themes',
    '@storybook/addon-designs',
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {
      docgen: 'vue-component-meta',
      builder: {
        viteConfigPath: './vite-storybook.config.ts',
      },
    },
  },
  docs: {
    defaultName: 'Documentation',
  },
  core: {
    disableTelemetry: true, // 👈 Disables telemetry
  },
}

export default config
