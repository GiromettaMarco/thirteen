import { Heading } from '@/components/ui/heading'
import PublicLayout from '@/layouts/public-layout'
import { useTranslation } from 'react-i18next'

export default function Error403({ message }: { message?: string | null }) {
  // i18n
  const { t } = useTranslation()

  return (
    <PublicLayout>
      <Heading
        title={t(($) => $.pages.errors.e403.title)}
        description={message ?? t(($) => $.pages.errors.e403.description)}
        Tag="h1"
        className="lg:px-24 lg:py-20"
      />
    </PublicLayout>
  )
}
