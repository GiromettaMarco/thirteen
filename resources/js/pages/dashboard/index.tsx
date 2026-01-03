import DashboardLayout from '@/layouts/dashboard-layout'
import { Head } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'

export default function Dashboard() {
  // i18n
  const { t } = useTranslation()

  return (
    <DashboardLayout title={t(($) => $.dashboard)}>
      <Head title={t(($) => $.pages.dashboard.index.title)} />

      <p>We are working on this page right now.</p>
    </DashboardLayout>
  )
}
