import DashboardLayout from '@/layouts/dashboard-layout'
import type { Auth } from '@/types'
import { Head } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'

export default function Settings({ auth }: { auth: Auth<true> }) {
  // i18n
  const { t } = useTranslation()

  return (
    <DashboardLayout
      auth={auth}
      // sidebarOpen={loaderData.sidebarOpen}
      title={t(($) => $.settings)}
    >
      <Head title={t(($) => $.pages.dashboard.settings.title)} />

      <p>We are working on this page right now.</p>
    </DashboardLayout>
  )
}
