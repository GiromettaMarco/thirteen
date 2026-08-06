import type { StorybookConfig } from '@storybook/react-vite'
import alias from './alias.ts'

const config: StorybookConfig = {
  addons: [
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-themes'
  ],
  core: {
    disableTelemetry: true
  },
  features: {
    sidebarOnboardingChecklist: false
  },
  framework: '@storybook/react-vite',
  staticDirs: ['../public'],
  stories: [
    '../tests/stories/**/*.mdx',
    '../tests/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  viteFinal: async (config) => {
    if (config.resolve) {
      if (Array.isArray(config.resolve.alias)) {
        config.resolve.alias.push(alias)
      } else {
        config.resolve.alias = {
          // oxlint-disable-next-line typescript/no-misused-spread
          ...config.resolve.alias,
          ...alias
        }
      }
    }
    return config
  }
}
export default config
