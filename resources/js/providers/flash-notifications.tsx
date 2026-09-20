import { cn, flash, Toaster } from '@gmcode/react-ui'
import { router } from '@inertiajs/react'
import { useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { AppearanceContext } from '@/providers/appearance-provider'

export default function FlashNotifications() {
  // i18n
  const { t } = useTranslation()
  const { theme } = useContext(AppearanceContext)

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
      // duration={500000}
      hotkey={['ctrlKey', 'altKey', 'KeyT']}
      position="bottom-center"
      theme={theme}
      toastOptions={{
        classNames: {
          closeButton:
            'focus-visible:border-ring! focus-visible:outline-none! focus-visible:ring-2! focus-visible:ring-ring/50!',
          toast: cn(
            'outline-none! focus-visible:border-ring! focus-visible:ring-3! focus-visible:ring-ring/50!',
            'group-focus-visible:ring-3! group-focus-visible:ring-ring/50!'
          )
        },
        closeButtonAriaLabel: t(($) => $.actions.close)
      }}
    />
  )
}
