import { Head } from '@inertiajs/react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import type { BreadcrumbLink } from '@/components/breadcrumbs'
import { UpdateProjectDrawer } from '@/components/projects/update-project-drawer'
import { TasksTable } from '@/components/tasks/tasks-table'
import { Container } from '@/components/ui/container'
import { Heading } from '@/components/ui/heading'
import DashboardLayout from '@/layouts/dashboard-layout'
import { parseView } from '@/lib/utils'
import { dashboard } from '@/routes'
import { index as projectsIndex } from '@/routes/projects'
import { show as teamsShow, index as teamsIndex } from '@/routes/teams'
import type {
  Profile,
  Project,
  RawView,
  TaskWithProfile,
  Team,
  WithTeamPermissions
} from '@/types'

export default function ProjectsShow({
  project,
  tasks,
  team,
  team_members,
  views
}: {
  project: Project
  tasks: TaskWithProfile[]
  team: Team & WithTeamPermissions
  team_members: Profile[]
  views: { tasks: RawView | null }
}) {
  // i18n
  const { t } = useTranslation()

  // Breadcrumbs
  const breadcrumbs = useMemo<BreadcrumbLink[]>(
    () => [
      { href: dashboard(), key: 1, label: t(($) => $.dashboard) },
      { href: teamsIndex(), key: 2, label: t(($) => $.team, { count: 2 }) },
      { href: teamsShow(team), key: 3, label: team.name },
      {
        href: projectsIndex({ team }),
        key: 4,
        label: t(($) => $.project, { count: 2 })
      }
    ],
    [team, t]
  )

  return (
    <DashboardLayout
      breadcrumbs={breadcrumbs}
      button={
        team.pivot.can_edit_projects ? (
          <UpdateProjectDrawer project={project} />
        ) : undefined
      }
      title={project.name}
    >
      <Head title={project.name} />

      <Container className="grid gap-6">
        <section className="grid gap-1">
          <Heading
            h={t(($) => $.task, { count: 2 })}
            variant="small"
          />
          <TasksTable
            canEdit={team.pivot.can_edit_projects}
            projectId={project.id}
            tasks={tasks}
            teamId={project.team_id}
            teamMembers={team_members}
            view={parseView(views.tasks)}
            viewStore={{
              page: `projects.show/${project.id}`,
              table: 'tasks'
            }}
          />
        </section>
      </Container>
    </DashboardLayout>
  )
}
