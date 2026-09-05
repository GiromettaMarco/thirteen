import { Head } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import { TeamsTable } from '@/components/teams/teams-table'
import DashboardLayout from '@/layouts/dashboard-layout'
import { parseView } from '@/lib/utils'
import type { RawView, TeamsTableEntry } from '@/types'

export default function TeamsIndex({
  teams,
  views
}: {
  teams: TeamsTableEntry[]
  views: { teams: RawView | null }
}) {
  // i18n
  const { t } = useTranslation()

  return (
    <DashboardLayout title={t(($) => $.team, { count: 2 })}>
      <Head title={t(($) => $.teams.title)} />

      <div className="px-4 lg:px-6">
        <section>
          <TeamsTable
            teams={teams}
            view={parseView(views.teams)}
            viewStore={{
              page: 'teams.index',
              table: 'teams'
            }}
          />
        </section>
      </div>
    </DashboardLayout>
  )
}
