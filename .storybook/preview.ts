import { withThemeByClassName } from '@storybook/addon-themes'
import type { Preview, ReactRenderer } from '@storybook/react-vite'
import DocsWithTheme from './decorators/docs-with-theme'
import { WithI18next } from './decorators/with-i18next'

import '../resources/css/app.css'

const preview: Preview = {
  globalTypes: {
    locale: {
      name: 'Locale',
      description: 'Internationalization locale',
      toolbar: {
        title: 'locale',
        icon: 'globe',
        items: [
          { value: 'en', title: 'English', right: '🇬🇧' },
          { value: 'it', title: 'Italiano', right: '🇮🇹' }
        ]
      }
    }
  },

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    },

    docs: {
      container: DocsWithTheme
    }
  },

  decorators: [
    withThemeByClassName<ReactRenderer>({
      themes: {
        light: '',
        dark: 'dark'
      },
      defaultTheme: 'dark'
    }),

    WithI18next
  ]
}

export default preview
