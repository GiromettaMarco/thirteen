import { flash, Toaster } from '@gmcode/react-ui'
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
      position="bottom-center"
      theme={theme}
      toastOptions={{
        closeButtonAriaLabel: t(($) => $.close)
      }}
      // duration={500000}
      // richColors={true}
    />
  )
}
