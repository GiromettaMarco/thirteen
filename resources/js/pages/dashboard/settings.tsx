import DashboardLayout from '@/layouts/dashboard-layout'
import { Head } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'

export default function Settings() {
  // i18n
  const { t } = useTranslation()

  return (
    <DashboardLayout title={t(($) => $.settings)}>
      <Head title={t(($) => $.pages.dashboard.settings.title)} />

      <p>We are working on this page right now.</p>
    </DashboardLayout>
  )
}
