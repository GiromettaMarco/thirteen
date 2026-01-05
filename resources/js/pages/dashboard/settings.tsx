import { AppearanceSelect } from '@/components/appearance-selector'
import { LanguageSelect } from '@/components/language-selector'
import { Container } from '@/components/ui/container'
import { Format } from '@/components/ui/format'
import DashboardLayout from '@/layouts/dashboard-layout'
import { Head } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'

export default function Settings() {
  // i18n
  const { t } = useTranslation()

  return (
    <DashboardLayout title={t(($) => $.settings)}>
      <Head title={t(($) => $.pages.dashboard.settings.title)} />

      <Container className="grid gap-6 md:gap-12">
        <Format
          description={t(($) => $.pages.dashboard.settings.languageDescription)}
          title={t(($) => $.pages.dashboard.settings.languageTitle)}
        >
          <LanguageSelect className="max-w-96" />
        </Format>

        <Format
          description={t(
            ($) => $.pages.dashboard.settings.appearanceDescription
          )}
          title={t(($) => $.pages.dashboard.settings.appearanceTitle)}
        >
          <AppearanceSelect className="max-w-96" />
        </Format>
      </Container>
    </DashboardLayout>
  )
}
