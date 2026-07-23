import { Head } from '@inertiajs/react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import type { BreadcrumbLink } from '@/components/breadcrumbs'
import { TasksTable } from '@/components/tasks/tasks-table'
import { Container } from '@/components/ui/container'
import { Heading } from '@/components/ui/heading'
import DashboardLayout from '@/layouts/dashboard-layout'
import { parseView } from '@/lib/utils'
import { dashboard } from '@/routes'
import { index } from '@/routes/projects'
import type {
  Profile,
  Project,
  RawView,
  TaskWithProfile,
  TeamPermissions
} from '@/types'

export default function ProjectsShow({
  permissions,
  project,
  tasks,
  team_members,
  views
}: {
  permissions: TeamPermissions
  project: Project
  tasks: TaskWithProfile[]
  team_members: Profile[]
  views: { tasks: RawView | null }
}) {
  // i18n
  const { t } = useTranslation()

  // Breadcrumbs
  const breadcrumbs = useMemo<BreadcrumbLink[]>(
    () => [
      { href: dashboard(), key: 1, label: t(($) => $.dashboard) },
      {
        href: index({ team: project.team_id }),
        key: 2,
        label: t(($) => $.project, { count: 2 })
      }
    ],
    [project.team_id, t]
  )

  return (
    <DashboardLayout
      // button={
      //   can.update ? <UpdateProjectDrawer project={project} /> : undefined
      // }
      breadcrumbs={breadcrumbs}
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
            canEdit={permissions.can_edit_projects}
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
