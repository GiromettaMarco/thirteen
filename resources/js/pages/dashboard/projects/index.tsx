import { Head } from '@inertiajs/react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import type { BreadcrumbLink } from '@/components/breadcrumbs'
import { ProjectsTable } from '@/components/projects/projects-table'
import { Container } from '@/components/ui/container'
import DashboardLayout from '@/layouts/dashboard-layout'
import { parseView } from '@/lib/utils'
import { dashboard } from '@/routes'
import { show as teamsShow, index as teamsIndex } from '@/routes/teams'
import type {
  Auth,
  ProjectWithTasksCount,
  RawView,
  Team,
  WithTeamPermissions
} from '@/types'

export default function ProjectsIndex({
  projects,
  team,
  views
}: {
  auth: Auth<false>
  projects: ProjectWithTasksCount[]
  team: Team & WithTeamPermissions
  views: { projects: RawView | null }
}) {
  // i18n
  const { t } = useTranslation()

  // Breadcrumbs
  const breadcrumbs = useMemo<BreadcrumbLink[]>(
    () => [
      { href: dashboard(), key: 1, label: t(($) => $.dashboard) },
      { href: teamsIndex(), key: 2, label: t(($) => $.team, { count: 2 }) },
      { href: teamsShow(team), key: 3, label: team.name }
    ],
    [team, t]
  )

  return (
    <DashboardLayout
      breadcrumbs={breadcrumbs}
      title={t(($) => $.project, { count: 2 })}
    >
      <Head title={t(($) => $.pages.dashboard.projects.index.title)} />

      <Container>
        <ProjectsTable
          canEdit={team.pivot.can_edit_projects}
          projects={projects}
          teamId={team.id}
          view={parseView(views.projects)}
          viewStore={{
            page: 'projects.index',
            table: `projects/team:${team.id}`
          }}
        />
      </Container>
    </DashboardLayout>
  )
}
