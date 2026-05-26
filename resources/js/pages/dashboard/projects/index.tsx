import { ProjectsTable } from '@/components/projects/projects-table'
import { NoCurrentTeam } from '@/components/teams/no-current-team'
import { Container } from '@/components/ui/container'
import DashboardLayout from '@/layouts/dashboard-layout'
import { parseView } from '@/lib/utils'
import type { Auth, Project, RawView, Team, WithTeamPermissions } from '@/types'
import { Head } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'

export default function ProjectsIndex({
  auth,
  projects,
  team,
  views
}: {
  auth: Auth<false>
  projects: Project[]
  team: Team & WithTeamPermissions
  views: { projects: RawView | null }
}) {
  // i18n
  const { t } = useTranslation()

  const teamId = auth.user?.current_team_id

  return (
    <DashboardLayout title={t(($) => $.project, { count: 2 })}>
      <Head title={t(($) => $.pages.dashboard.projects.index.title)} />

      <Container>
        {teamId ? (
          <ProjectsTable
            canEdit={team.pivot.can_edit_projects}
            projects={projects}
            teamId={teamId}
            view={parseView(views.projects)}
            viewStore={{
              page: 'projects.index',
              table: `projects/team:${teamId}`
            }}
          />
        ) : (
          <NoCurrentTeam />
        )}
      </Container>
    </DashboardLayout>
  )
}
