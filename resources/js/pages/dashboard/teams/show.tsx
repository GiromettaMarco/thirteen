import type { BreadcrumbLink } from '@/components/breadcrumbs'
import DashboardLayout from '@/layouts/dashboard-layout'
import { dashboard } from '@/routes'
import { index } from '@/routes/teams'
import type { Auth } from '@/types'
import { Head } from '@inertiajs/react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

export default function TeamsShow({ auth }: { auth: Auth<true> }) {
  // i18n
  const { t } = useTranslation()

  // Breadcrumbs
  const breadcrumbs: BreadcrumbLink[] = useMemo(
    () => [
      { key: 1, href: dashboard(), label: t(($) => $.dashboard) },
      { key: 2, href: index(), label: t(($) => $.team, { count: 2 }) }
    ],
    [t]
  )

  return (
    <DashboardLayout
      auth={auth}
      breadcrumbs={breadcrumbs}
      // button={<UpdateTeamDrawer team={team} />}
      // sidebarOpen={loaderData.sidebarOpen}
      title="Team name goes here"
    >
      <Head title="Team name goes here" />

      <p>We are working on this page right now.</p>
    </DashboardLayout>
  )
}
