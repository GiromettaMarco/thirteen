import { withThemeByClassName } from '@storybook/addon-themes'
import type { Preview, ReactRenderer } from '@storybook/react-vite'
import { initialize, mswLoader } from 'msw-storybook-addon'
import DocsWithTheme from './decorators/docs-with-theme'
import { WithI18next } from './decorators/with-i18next'
import { WithToaster } from './decorators/with-toaster'
import { getHandlers } from './msw'

import '../resources/css/app.css'

// @see https://github.com/mswjs/msw-storybook-addon#configuring-msw
initialize({
  onUnhandledRequest: import.meta.env.MSW_ON_UNHANDLED_REQUEST ?? 'bypass',
  quiet: import.meta.env.MSW_QUIET ?? true
})

const preview: Preview = {
  decorators: [
    withThemeByClassName<ReactRenderer>({
      defaultTheme: 'dark',
      themes: {
        dark: 'dark',
        light: ''
      }
    }),
    WithI18next,
    WithToaster
  ],
  globalTypes: {
    locale: {
      description: 'Internationalization locale',
      name: 'Locale',
      toolbar: {
        icon: 'globe',
        items: [
          { right: '🇬🇧', title: 'English', value: 'en' },
          { right: '🇮🇹', title: 'Italiano', value: 'it' }
        ],
        title: 'locale'
      }
    }
  },
  loaders: [mswLoader],
  parameters: {
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    docs: {
      container: DocsWithTheme
    },
    msw: {
      handlers: getHandlers()
    }
  }
}

export default preview
