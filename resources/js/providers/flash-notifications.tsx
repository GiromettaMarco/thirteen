import { Toaster } from '@/components/ui/sonner'
import { useTranslation } from 'react-i18next'

export default function FlashNotifications() {
  // i18n
  const { t } = useTranslation()

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
