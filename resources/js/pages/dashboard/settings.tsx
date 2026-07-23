import { Head } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import { AppearanceSelect } from '@/components/appearance-selector'
import { LanguageSelect } from '@/components/language-selector'
import { Container } from '@/components/ui/container'
import { Format } from '@/components/ui/format'
import DashboardLayout from '@/layouts/dashboard-layout'

export default function Settings() {
  // i18n
  const { t } = useTranslation()

  return (
    <DashboardLayout title={t(($) => $.settings)}>
      <Head title={t(($) => $.pages.dashboard.settings.title)} />

      <Container className="grid gap-6 md:gap-12">
        <Format
          h2={t(($) => $.pages.dashboard.settings.language.h2)}
          p={t(($) => $.pages.dashboard.settings.language.p)}
        >
          <LanguageSelect className="max-w-96" />
        </Format>

        <Format
          h2={t(($) => $.pages.dashboard.settings.appearance.h2)}
          p={t(($) => $.pages.dashboard.settings.appearance.p)}
        >
          <AppearanceSelect className="max-w-96" />
        </Format>
      </Container>
    </DashboardLayout>
  )
}
