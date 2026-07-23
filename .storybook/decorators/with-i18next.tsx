import type { StoryContext } from '@storybook/react-vite'
import { useEffect } from 'react'
import { I18nextProvider } from 'react-i18next'
import type { PartialStoryFn } from 'storybook/internal/csf'
import i18n from '@/providers/i18n'

/**
 * Wrap stories with the I18nextProvider component.
 *
 * @see https://storybook.js.org/recipes/react-i18next
 */
export const WithI18next = (Story: PartialStoryFn, context: StoryContext) => {
  const { locale } = context.globals

  // Set the new locale in i18n when the locale global changes
  useEffect(() => {
    void i18n.changeLanguage(locale)
  }, [locale])

  return (
    <I18nextProvider i18n={i18n}>
      <Story />
    </I18nextProvider>
  )
}
