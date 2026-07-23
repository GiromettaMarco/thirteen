import { flash, Toaster } from '@gmcode/react-ui'
import { router } from '@inertiajs/core'
import type { StoryContext } from '@storybook/react-vite'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import type { PartialStoryFn } from 'storybook/internal/csf'
import type { Theme } from '@/types'

/**
 * Mock of the FlashNotifications provider
 */
function FlashNotifications({ theme }: { theme: Theme }) {
  // i18n
  const { t } = useTranslation()

  // Flash messages
  useEffect(() => {
    return router.on('flash', (event) => {
      if (event.detail.flash.toast) {
        flash(event.detail.flash.toast)
      }
    })
  }, [])

  return (
    <Toaster
      closeButton={true}
      containerAriaLabel={t(($) => $.notifications)}
      position="bottom-center"
      theme={theme}
      toastOptions={{
        closeButtonAriaLabel: t(($) => $.close)
      }}
    />
  )
}

/**
 * Add a Toaster component to display flash messages.
 */
export function WithToaster(Story: PartialStoryFn, context: StoryContext) {
  if (context.parameters.disableToaster) {
    return <Story />
  }

  const { theme } = context.globals

  return (
    <>
      <FlashNotifications theme={theme === 'light' ? 'light' : 'dark'} />
      <Story />
    </>
  )
}
