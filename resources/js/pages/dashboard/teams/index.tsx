import { TeamsTable } from '@/components/teams/teams-table'
import { Container } from '@/components/ui/container'
import DashboardLayout from '@/layouts/dashboard-layout'
import { parseView } from '@/lib/utils'
import type { RawView, Team, WithTeamPermissions } from '@/types'
import { Head } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'

export default function TeamsIndex({
  teams,
  views
}: {
  teams: Array<Team & WithTeamPermissions & { profiles_count: number }>
  views: { teams: RawView | null }
}) {
  // i18n
  const { t } = useTranslation()

  return (
    <DashboardLayout title={t(($) => $.team, { count: 2 })}>
      <Head title={t(($) => $.teams.title)} />

      <Container>
        <TeamsTable
          teams={teams}
          view={parseView(views.teams)}
        />
      </Container>
    </DashboardLayout>
  )
}
