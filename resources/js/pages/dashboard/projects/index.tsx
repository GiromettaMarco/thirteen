import { Head } from '@inertiajs/react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import type { BreadcrumbLink } from '@/components/breadcrumbs'
import { ProjectsTable } from '@/components/projects/projects-table'
import DashboardLayout from '@/layouts/dashboard-layout'
import { dashboard } from '@/routes'
import { show as teamsShow, index as teamsIndex } from '@/routes/teams'
import type { ProjectWithTasksCount, Team, WithTeamPermissions } from '@/types'

export default function ProjectsIndex({
  projects,
  team
}: {
  projects: ProjectWithTasksCount[]
  team: Team & WithTeamPermissions
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

      <div className="px-4 lg:px-6">
        <section>
          <ProjectsTable
            canEdit={team.pivot.can_edit_projects}
            projects={projects}
            storage={`team-${team.id}-projects:projects`}
            teamId={team.id}
          />
        </section>
      </div>
    </DashboardLayout>
  )
}
