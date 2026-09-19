import { Head } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import { TeamsTable } from '@/components/teams/teams-table'
import DashboardLayout from '@/layouts/dashboard-layout'
import type { TeamsTableEntry } from '@/types'

export default function TeamsIndex({ teams }: { teams: TeamsTableEntry[] }) {
  // i18n
  const { t } = useTranslation()

  return (
    <DashboardLayout title={t(($) => $.team, { count: 2 })}>
      <Head title={t(($) => $.teams.title)} />

      <div className="px-4 lg:px-6">
        <section>
          <TeamsTable
            storage="teams:teams"
            teams={teams}
          />
        </section>
      </div>
    </DashboardLayout>
  )
}
