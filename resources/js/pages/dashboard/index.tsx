import { Head, Link } from '@inertiajs/react'
import { differenceInCalendarDays } from 'date-fns'
import { OctagonX, SquareCheckBig, TriangleAlert } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { AssignedTasksTable } from '@/components/dashboard/assigned-tasks-table'
import { ProjectDeadline } from '@/components/projects/project-deadline'
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle
} from '@/components/ui/empty'
import DashboardLayout from '@/layouts/dashboard-layout'
import { format } from '@/lib/utils'
import { show as projectsShow } from '@/routes/projects'
import type { Project, TaskWithProject } from '@/types'

//#region Deadlines
function DeadlineCard({
  deadline,
  name,
  projectId,
  teamId
}: {
  deadline: string | null
  name: string
  projectId: number
  teamId: number
}) {
  // i18n
  const { i18n } = useTranslation()

  const parsedDeadline = new Date(deadline ?? '')

  const deadlineCountdown = parsedDeadline
    ? differenceInCalendarDays(parsedDeadline, new Date())
    : 0

  return (
    <Link
      href={projectsShow({
        project: projectId,
        team: teamId
      })}
      title={name}
    >
      <Card className="@container/card bg-linear-to-t from-primary/5 to-card shadow-xs transition-all hover:-translate-y-2 dark:from-background">
        <CardHeader>
          <CardDescription>{name}</CardDescription>
          <CardTitle className="text-sm font-semibold tabular-nums @[250px]/card:text-base @[300px]/card:text-lg @[350px]/card:text-xl @[400px]/card:text-2xl">
            {format(parsedDeadline, i18n.language)}
          </CardTitle>
          <CardAction>
            {deadlineCountdown <= 1 ? (
              <OctagonX className="size-5 text-error-foreground" />
            ) : (
              deadlineCountdown < 7 && (
                <TriangleAlert className="size-5 text-warning-foreground" />
              )
            )}
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          {deadlineCountdown < 7 ? (
            <ProjectDeadline deadline={deadline} />
          ) : (
            <p>&nbsp;</p>
          )}
        </CardFooter>
      </Card>
    </Link>
  )
}

function Deadlines({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return null
  }

  return (
    <section className="grid grid-cols-1 gap-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {projects.map((project) => (
        <DeadlineCard
          deadline={project.deadline}
          key={project.id}
          name={project.name}
          projectId={project.id}
          teamId={project.team_id}
        />
      ))}
    </section>
  )
}

//#region TasksTable
function EmptyFiller() {
  // i18n
  const { t } = useTranslation()

  return (
    <Empty className="rounded-md border border-solid">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SquareCheckBig />
        </EmptyMedia>
        <EmptyTitle>
          {t(($) => $.pages.dashboard.index.tasks.empty.title)}
        </EmptyTitle>
        <EmptyDescription>
          {t(($) => $.pages.dashboard.index.tasks.empty.description)}
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}

//#region Page
export default function Dashboard({
  projects,
  tasks
}: {
  projects: Project[]
  tasks: TaskWithProject[]
}) {
  // i18n
  const { t } = useTranslation()

  return (
    <DashboardLayout title={t(($) => $.dashboard)}>
      <Head title={t(($) => $.pages.dashboard.index.title)} />

      <div className="grid gap-6 px-4 lg:px-6">
        <Deadlines projects={projects} />

        <section>
          {tasks.length > 0 ? (
            <AssignedTasksTable
              storage="dashboard:tasks"
              tasks={tasks}
            />
          ) : (
            <EmptyFiller />
          )}
        </section>
      </div>
    </DashboardLayout>
  )
}
