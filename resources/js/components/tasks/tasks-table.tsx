import { Button } from '@gmcode/react-ui'
import {
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type Table
} from '@tanstack/react-table'
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Calendar,
  Check,
  Ellipsis,
  EllipsisVertical,
  Inbox,
  SquareCheckBig,
  X
} from 'lucide-react'
import { useContext, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NameCell } from '@/components/name-cell'
import {
  AddTaskDrawer,
  AddTaskDrawerTrigger
} from '@/components/tasks/add-task-drawer'
import { LabelBadge } from '@/components/tasks/label-badge'
import { PriorityBadge } from '@/components/tasks/priority-badge'
import { StatusBadge } from '@/components/tasks/status-badge'
import { UpdateTaskDrawer } from '@/components/tasks/update-task-drawer'
import TableMain, {
  AfterTable,
  ColumnsVisibility,
  TableToolbar as DataTableToolbar,
  FacetedFilter,
  getSelectColDef,
  SortableColumnHeader
} from '@/components/ui/data-table'
import { DestroyDialog } from '@/components/ui/destroy-dialog'
import { DestroyMany } from '@/components/ui/destroy-many'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle
} from '@/components/ui/empty'
import UseTableStates from '@/hooks/use-table-states'
import { format } from '@/lib/utils'
import { AppContext } from '@/providers/app-context-provider'
import { destroy, destroyMany } from '@/routes/tasks'
import type { Profile, Task, TaskWithProfile, View, ViewStore } from '@/types'

//#region Actions
export function Actions({
  canEdit = false,
  task,
  teamId
}: {
  canEdit?: boolean
  task: Task
  teamId: number
}) {
  // i18n
  const { t } = useTranslation()

  // Global state
  const { setActiveTask, setUpdateTaskOpen } = useContext(AppContext)

  // Delete dialog state
  const [deleteOpen, setDeleteOpen] = useState(false)

  if (canEdit) {
    return (
      <>
        <DestroyDialog
          description={t(($) => $.dialogs.deleteTask.description, {
            task: task.name
          })}
          open={deleteOpen}
          route={destroy({
            project: task.project_id,
            task: task,
            team: teamId
          })}
          setOpen={setDeleteOpen}
          title={t(($) => $.dialogs.deleteTask.title)}
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
              size="icon"
              variant="ghost"
            >
              <EllipsisVertical />
              <span className="sr-only">{t(($) => $.openMenu)}</span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-32"
          >
            <DropdownMenuItem
              onClick={() => {
                setActiveTask(task)
                setUpdateTaskOpen(true)
              }}
            >
              {t(($) => $.actions.edit)}
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => setDeleteOpen(true)}
              variant="destructive"
            >
              {t(($) => $.actions.delete)}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    )
  }

  return <div className="min-h-8" />
}

//#region TableToolbar
function TableToolbar<TData>({ table }: { table: Table<TData> }) {
  // i18n
  const { t } = useTranslation()

  const labels = [
    {
      label: t(($) => $.tasks.labels.bug),
      value: 'bug'
    },
    {
      label: t(($) => $.tasks.labels.documentation),
      value: 'documentation'
    },
    {
      label: t(($) => $.tasks.labels.feature),
      value: 'feature'
    },
    {
      label: t(($) => $.tasks.labels.none),
      value: 'none'
    }
  ]

  const statuses = [
    {
      icon: Inbox,
      label: t(($) => $.tasks.statuses.backlog),
      value: 'backlog'
    },
    {
      icon: Calendar,
      label: t(($) => $.tasks.statuses.todo),
      value: 'todo'
    },
    {
      icon: Ellipsis,
      label: t(($) => $.tasks.statuses.inProgress),
      value: 'in_progress'
    },
    {
      icon: Check,
      label: t(($) => $.tasks.statuses.done),
      value: 'done'
    },
    {
      icon: X,
      label: t(($) => $.tasks.statuses.canceled),
      value: 'canceled'
    }
  ]

  const priorities = [
    {
      icon: ArrowDown,
      label: t(($) => $.tasks.priorities.low),
      value: 'low'
    },
    {
      icon: ArrowRight,
      label: t(($) => $.tasks.priorities.medium),
      value: 'medium'
    },
    {
      icon: ArrowUp,
      label: t(($) => $.tasks.priorities.high),
      value: 'high'
    }
  ]

  return (
    <DataTableToolbar table={table}>
      <FacetedFilter
        column={table.getColumn('label')}
        options={labels}
        title={t(($) => $.tasks.label)}
      />

      <FacetedFilter
        column={table.getColumn('status')}
        options={statuses}
        title={t(($) => $.tasks.status)}
      />

      <FacetedFilter
        column={table.getColumn('priority')}
        options={priorities}
        title={t(($) => $.tasks.priority)}
      />
    </DataTableToolbar>
  )
}

//#region EmptyFiller
function EmptyFiller() {
  // i18n
  const { t } = useTranslation()

  // App context
  const { setAddTaskOpen: setOpen } = useContext(AppContext)

  return (
    <Empty className="rounded-md border border-solid">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SquareCheckBig />
        </EmptyMedia>

        <EmptyTitle>{t(($) => $.tasks.emptyTable.title)}</EmptyTitle>

        <EmptyDescription>
          <p>{t(($) => $.tasks.emptyTable.line1)}</p>
          <p>{t(($) => $.tasks.emptyTable.line2)}</p>
        </EmptyDescription>
      </EmptyHeader>

      <EmptyContent>
        <Button onClick={() => setOpen(true)}>
          {t(($) => $.tasks.createTask)}
        </Button>
      </EmptyContent>
    </Empty>
  )
}

//#region TasksTable
export function TasksTable({
  canEdit = false,
  projectId,
  tasks,
  teamId,
  teamMembers,
  view,
  viewStore
}: {
  canEdit?: boolean
  projectId: number
  tasks: TaskWithProfile[]
  teamId: number
  teamMembers?: Profile[]
  view?: View
  viewStore?: ViewStore
}) {
  // i18n
  const { i18n, t } = useTranslation()

  // Global state
  const { setActiveTask, setUpdateTaskOpen } = useContext(AppContext)

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
    data: tasks,
    view,
    viewStore
  })

  // Watch for data revalidation
  useEffect(() => {
    setData(() => tasks)
  }, [setData, tasks])

  const labels = useMemo<Record<string, string>>(
    () => ({
      createdAt: t(($) => $.dateCreated),
      label: t(($) => $.tasks.label),
      name: t(($) => $.name),
      priority: t(($) => $.tasks.priority),
      profile: t(($) => $.tasks.assignedTo),
      status: t(($) => $.tasks.status),
      updatedAt: t(($) => $.dateModified)
    }),
    [t]
  )

  const openUpdateTaskDrawer = useMemo(() => {
    return (task: Task) => {
      setActiveTask(task)
      setUpdateTaskOpen(true)
    }
  }, [setActiveTask, setUpdateTaskOpen])

  const columns = useMemo<ColumnDef<TaskWithProfile>[]>(
    () => [
      ...(canEdit ? [getSelectColDef<TaskWithProfile>()] : []),
      {
        accessorKey: 'name',
        cell: ({ row }) => (
          <NameCell
            name={row.original.name}
            onClick={
              canEdit
                ? () => {
                    openUpdateTaskDrawer(row.original)
                  }
                : undefined
            }
          />
        ),
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
        )
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
        accessorKey: 'profile',
        cell: ({ row }) => row.original.profile?.name,
        header: ({ column }) => (
          <SortableColumnHeader
            column={column}
            title={t(($) => $.tasks.assignedTo)}
          />
        )
      },
      {
        accessorKey: 'createdAt',
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
        accessorKey: 'updatedAt',
        cell: ({ row }) => format(row.original.updated_at, i18n.language, 'Pp'),
        header: ({ column }) => (
          <SortableColumnHeader
            column={column}
            title={t(($) => $.dateModified)}
          />
        ),
        sortingFn: 'datetime'
      },
      {
        cell: ({ row }) => (
          <Actions
            canEdit={canEdit}
            task={row.original}
            teamId={teamId}
          />
        ),
        id: 'actions'
      }
    ],
    [canEdit, i18n.language, openUpdateTaskDrawer, t, teamId]
  )

  const table = useReactTable({
    columns,
    data,
    enableRowSelection: canEdit,
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
    <section className="grid gap-3">
      {canEdit && (
        <>
          <AddTaskDrawer
            projectId={projectId}
            teamId={teamId}
            teamMembers={teamMembers}
          />
          <UpdateTaskDrawer
            teamId={teamId}
            teamMembers={teamMembers}
          />
        </>
      )}

      {tasks.length > 0 ? (
        <>
          <div className="grid items-center justify-between gap-2 xl:flex">
            <TableToolbar table={table} />

            <div className="flex gap-2">
              <ColumnsVisibility
                labels={labels}
                table={table}
              />

              {canEdit && (
                <>
                  <AddTaskDrawerTrigger />
                  <DestroyMany
                    route={destroyMany({
                      project: projectId,
                      team: teamId
                    })}
                    table={table}
                    title={t(($) => $.dialogs.deleteManyTasks.title)}
                  />
                </>
              )}
            </div>
          </div>

          <TableMain table={table} />

          <AfterTable
            selection={canEdit}
            sortingLabels={labels}
            sortingState={sorting}
            table={table}
          />
        </>
      ) : (
        <EmptyFiller />
      )}
    </section>
  )
}
