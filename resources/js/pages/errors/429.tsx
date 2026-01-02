import { Heading } from '@/components/ui/heading'
import PublicLayout from '@/layouts/public-layout'
import { useTranslation } from 'react-i18next'

export default function Error429() {
  // i18n
  const { t } = useTranslation()

  return (
    <PublicLayout>
      <Heading
        title={t(($) => $.pages.errors.e429.title)}
        description={t(($) => $.pages.errors.e429.description)}
        Tag="h1"
        className="lg:px-24 lg:py-20"
      />
    </PublicLayout>
  )
}
