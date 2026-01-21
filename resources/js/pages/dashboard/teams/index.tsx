import { TeamsTable } from '@/components/teams/teams-table'
import { Container } from '@/components/ui/container'
import DashboardLayout from '@/layouts/dashboard-layout'
import type { UsersTeam } from '@/types'
import { Head } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'

export default function TeamsIndex({
  teams
}: {
  teams: Array<UsersTeam & { users_count: number }>
}) {
  // i18n
  const { t } = useTranslation()

  return (
    <DashboardLayout title={t(($) => $.team, { count: 2 })}>
      <Head title={t(($) => $.teams.title)} />

      <Container>
        <TeamsTable teams={teams} />
      </Container>
    </DashboardLayout>
  )
}
