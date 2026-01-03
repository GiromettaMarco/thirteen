import DashboardLayout from '@/layouts/dashboard-layout'
import type { Auth } from '@/types'
import { Head } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'

export default function ProjectsIndex({ auth }: { auth: Auth<true> }) {
  // i18n
  const { t } = useTranslation()

  return (
    <DashboardLayout
      auth={auth}
      // sidebarOpen={loaderData.sidebarOpen}
      title={t(($) => $.project, { count: 2 })}
    >
      <Head title={t(($) => $.pages.dashboard.projects.index.title)} />

      <p>We are working on this page right now.</p>
    </DashboardLayout>
  )
}
