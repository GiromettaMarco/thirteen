import type { StorybookConfig } from '@storybook/react-vite'
import alias from './alias.ts'

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-themes'
  ],
  framework: '@storybook/react-vite',
  core: {
    disableTelemetry: true
  },
  features: {
    sidebarOnboardingChecklist: false
  },
  staticDirs: ['../public'],
  viteFinal: async (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        ...alias
      }
    }
    return config
  }
}
export default config
