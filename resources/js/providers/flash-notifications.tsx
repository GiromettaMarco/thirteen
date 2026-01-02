import { Toaster } from '@/components/ui/sonner'
import { flashMessages } from '@/lib/flash'
import { router } from '@inertiajs/react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export default function FlashNotifications() {
  // i18n
  const { t } = useTranslation()

  // Flash messages
  useEffect(() => {
    return router.on('flash', (event) => {
      flashMessages(event.detail.flash.toast)
    })
  }, [])

  return (
    <Toaster
      position="bottom-center"
      closeButton={true}
      containerAriaLabel={t(($) => $.notifications)}
      toastOptions={{
        closeButtonAriaLabel: t(($) => $.close)
      }}
      // duration={500000}
      // richColors={true}
    />
  )
}
