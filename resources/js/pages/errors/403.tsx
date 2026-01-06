import { Heading } from '@/components/ui/heading'
import PublicLayout from '@/layouts/public-layout'
import { Head } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'

export default function Error403({ message }: { message?: string | null }) {
  // i18n
  const { t } = useTranslation()

  return (
    <PublicLayout>
      <Head title={t(($) => $.pages.errors.e403.title)} />

      <Heading
        className="lg:px-24 lg:py-20"
        h={t(($) => $.pages.errors.e403.h1)}
        p={message ?? t(($) => $.pages.errors.e403.p)}
        tag="h1"
      />
    </PublicLayout>
  )
}
