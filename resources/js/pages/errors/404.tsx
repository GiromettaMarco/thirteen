import { Head } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import { Heading } from '@/components/ui/heading'
import PublicLayout from '@/layouts/public-layout'

export default function Error404() {
  // i18n
  const { t } = useTranslation()

  return (
    <PublicLayout>
      <Head title={t(($) => $.pages.errors.e404.title)} />

      <Heading
        className="lg:px-24 lg:py-20"
        h={t(($) => $.pages.errors.e404.h1)}
        p={t(($) => $.pages.errors.e404.p)}
        tag="h1"
      />
    </PublicLayout>
  )
}
