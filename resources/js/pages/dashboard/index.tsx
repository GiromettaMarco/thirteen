import { cn } from '@gmcode/react-ui'
import { Head, Link } from '@inertiajs/react'
import {
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef
} from '@tanstack/react-table'
import { differenceInCalendarDays } from 'date-fns'
import { OctagonX, SquareCheckBig, TriangleAlert } from 'lucide-react'
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { NameCell } from '@/components/name-cell'
import { ProjectDeadline } from '@/components/projects/project-deadline'
import { LabelBadge } from '@/components/tasks/label-badge'
import { PriorityBadge } from '@/components/tasks/priority-badge'
import { StatusBadge } from '@/components/tasks/status-badge'
import { TableToolbar } from '@/components/tasks/tasks-table'
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import TableMain, {
  AfterTable,
  ColumnsVisibility,
  SortableColumnHeader
} from '@/components/ui/data-table'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle
} from '@/components/ui/empty'
import UseTableStates from '@/hooks/use-table-states'
import DashboardLayout from '@/layouts/dashboard-layout'
import { format, parseView, sortName, sortPriority } from '@/lib/utils'
import { show as projectsShow } from '@/routes/projects'
import type { Project, RawView, Task, View, ViewStore } from '@/types'

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
          <CardTitle className="text-xl font-semibold tabular-nums @[250px]/card:text-2xl">
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
          {deadlineCountdown < 7 && <ProjectDeadline deadline={deadline} />}
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
    <div className="grid grid-cols-1 gap-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {projects.map((project) => (
        <DeadlineCard
          deadline={project.deadline}
          key={project.id}
          name={project.name}
          projectId={project.id}
          teamId={project.team_id}
        />
      ))}
    </div>
  )
}

//#region TasksTable
type TaskWithProject = Task & { project: Project }

function TasksEmptyFiller() {
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

function applyFacetFix(rawTasks: TaskWithProject[]): TaskWithProject[] {
  return rawTasks.map((rawTask) => ({
    ...rawTask,
    label: rawTask.label ?? 'none'
  }))
}

function TasksTable({
  tasks,
  view,
  viewStore
}: {
  tasks: TaskWithProject[]
  view?: View
  viewStore?: ViewStore
}) {
  // i18n
  const { i18n, t } = useTranslation()

  // Table states
  const {
    columnFilters,
    columnVisibility,
    data,
    onColumnFiltersChange,
    onColumnVisibilityChange,
    onPaginationChange,
    onSortingChange,
    pagination,
    rowSelection,
    setData,
    setRowSelection,
    sorting
  } = UseTableStates({
    data: applyFacetFix(tasks),
    view,
    viewStore
  })

  // Watch for data revalidation
  useEffect(() => {
    setData(() => applyFacetFix(tasks))
  }, [setData, tasks])

  const labels = useMemo<Record<string, string>>(
    () => ({
      created_at: t(($) => $.dateCreated),
      label: t(($) => $.tasks.label),
      name: t(($) => $.name),
      priority: t(($) => $.tasks.priority),
      project: t(($) => $.project, { count: 1 }),
      status: t(($) => $.tasks.status),
      updated_at: t(($) => $.dateModified)
    }),
    [t]
  )

  const columns = useMemo<ColumnDef<TaskWithProject>[]>(
    () => [
      {
        accessorKey: 'name',
        enableHiding: false,
        header: ({ column }) => (
          <SortableColumnHeader
            column={column}
            title={t(($) => $.name)}
          />
        )
      },
      {
        accessorKey: 'label',
        // @NOTE tanstack table filter fix
        cell: ({ row }) => <LabelBadge label={row.original.label ?? 'none'} />,
        filterFn: 'arrIncludesSome',
        header: ({ column }) => (
          <SortableColumnHeader
            column={column}
            title={t(($) => $.tasks.label)}
          />
        )
      },
      {
        accessorKey: 'priority',
        cell: ({ row }) => <PriorityBadge priority={row.original.priority} />,
        filterFn: 'arrIncludesSome',
        header: ({ column }) => (
          <SortableColumnHeader
            column={column}
            title={t(($) => $.tasks.priority)}
          />
        ),
        sortingFn: (rowA, rowB) =>
          sortPriority(rowA.original.priority, rowB.original.priority)
      },
      {
        accessorKey: 'status',
        cell: ({ row }) => <StatusBadge status={row.original.status} />,
        filterFn: 'arrIncludesSome',
        header: ({ column }) => (
          <SortableColumnHeader
            column={column}
            title={t(($) => $.tasks.status)}
          />
        )
      },
      {
        accessorKey: 'project',
        cell: ({ row }) => (
          <NameCell
            href={projectsShow({
              project: row.original.project,
              team: row.original.project.team_id
            })}
            name={row.original.project.name}
          />
        ),
        header: ({ column }) => (
          <SortableColumnHeader
            column={column}
            title={t(($) => $.project, { count: 1 })}
          />
        ),
        sortingFn: (rowA, rowB) =>
          sortName(rowA.original.project.name, rowB.original.project.name)
      },
      {
        accessorKey: 'created_at',
        cell: ({ row }) => format(row.original.created_at, i18n.language, 'Pp'),
        header: ({ column }) => (
          <SortableColumnHeader
            column={column}
            title={t(($) => $.dateCreated)}
          />
        ),
        sortingFn: 'datetime'
      },
      {
        accessorKey: 'updated_at',
        cell: ({ row }) => format(row.original.updated_at, i18n.language, 'Pp'),
        header: ({ column }) => (
          <SortableColumnHeader
            column={column}
            title={t(($) => $.dateModified)}
          />
        ),
        sortingFn: 'datetime'
      }
    ],
    [i18n.language, t]
  )

  const table = useReactTable({
    columns,
    data,
    enableRowSelection: false,
    getCoreRowModel: getCoreRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getRowId: (row) => row.id.toString(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange,
    onColumnVisibilityChange,
    onPaginationChange,
    onRowSelectionChange: setRowSelection,
    onSortingChange,
    state: {
      columnFilters,
      columnVisibility,
      pagination,
      rowSelection,
      sorting
    }
  })

  return (
    <section className={cn('grid', { 'gap-4': tasks.length == 0 })}>
      {tasks.length > 0 ? (
        <div className="grid gap-3">
          <div className="grid items-center justify-between gap-2 xl:flex">
            <TableToolbar table={table} />
            <div className="flex gap-2">
              <ColumnsVisibility
                labels={labels}
                table={table}
              />
            </div>
          </div>
          <TableMain table={table} />
          <AfterTable
            selection={false}
            sortingLabels={labels}
            sortingState={sorting}
            table={table}
          />
        </div>
      ) : (
        <TasksEmptyFiller />
      )}
    </section>
  )
}

//#region Page
export default function Dashboard({
  projects,
  tasks,
  views
}: {
  projects: Project[]
  tasks: TaskWithProject[]
  views: { tasks: RawView | null }
}) {
  // i18n
  const { t } = useTranslation()

  return (
    <DashboardLayout title={t(($) => $.dashboard)}>
      <Head title={t(($) => $.pages.dashboard.index.title)} />

      <div className="grid gap-6 px-4 lg:px-6">
        <Deadlines projects={projects} />

        <TasksTable
          tasks={tasks}
          view={parseView(views.tasks)}
          viewStore={{
            page: 'dashboard',
            table: 'tasks'
          }}
        />
      </div>
    </DashboardLayout>
  )
}
