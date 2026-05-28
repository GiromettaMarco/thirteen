import { NameCell } from '@/components/name-cell'
import {
  AddTaskDrawer,
  AddTaskDrawerTrigger
} from '@/components/tasks/add-task-drawer'
import { LabelBadge } from '@/components/tasks/label-badge'
import { PriorityBadge } from '@/components/tasks/priority-badge'
import { StatusBadge } from '@/components/tasks/status-badge'
import { Button } from '@/components/ui/button'
import TableMain, {
  AfterTable,
  ColumnsVisibility,
  TableToolbar as DataTableToolbar,
  FacetedFilter,
  getSelectColDef,
  SortableColumnHeader
} from '@/components/ui/data-table'
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
import type { Profile, TaskWithProfile, View, ViewStore } from '@/types'
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
  Inbox,
  SquareCheckBig,
  X
} from 'lucide-react'
import { useContext, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

//#region TableToolbar
function TableToolbar<TData>({ table }: { table: Table<TData> }) {
  // i18n
  const { t } = useTranslation()

  const labels = [
    {
      value: 'bug',
      label: t(($) => $.tasks.labels.bug)
    },
    {
      value: 'documentation',
      label: t(($) => $.tasks.labels.documentation)
    },
    {
      value: 'feature',
      label: t(($) => $.tasks.labels.feature)
    },
    {
      value: 'none',
      label: t(($) => $.tasks.labels.none)
    }
  ]

  const statuses = [
    {
      value: 'backlog',
      label: t(($) => $.tasks.statuses.backlog),
      icon: Inbox
    },
    {
      value: 'todo',
      label: t(($) => $.tasks.statuses.todo),
      icon: Calendar
    },
    {
      value: 'in_progress',
      label: t(($) => $.tasks.statuses.inProgress),
      icon: Ellipsis
    },
    {
      value: 'done',
      label: t(($) => $.tasks.statuses.done),
      icon: Check
    },
    {
      value: 'canceled',
      label: t(($) => $.tasks.statuses.canceled),
      icon: X
    }
  ]

  const priorities = [
    {
      value: 'low',
      label: t(($) => $.tasks.priorities.low),
      icon: ArrowDown
    },
    {
      value: 'medium',
      label: t(($) => $.tasks.priorities.medium),
      icon: ArrowRight
    },
    {
      value: 'high',
      label: t(($) => $.tasks.priorities.high),
      icon: ArrowUp
    }
  ]

  return (
    <DataTableToolbar table={table}>
      <FacetedFilter
        column={table.getColumn('label')}
        title={t(($) => $.tasks.label)}
        options={labels}
      />

      <FacetedFilter
        column={table.getColumn('status')}
        title={t(($) => $.tasks.status)}
        options={statuses}
      />

      <FacetedFilter
        column={table.getColumn('priority')}
        title={t(($) => $.tasks.priority)}
        options={priorities}
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
      name: t(($) => $.name),
      label: t(($) => $.tasks.label),
      priority: t(($) => $.tasks.priority),
      status: t(($) => $.tasks.status),
      profile: t(($) => $.tasks.assignedTo),
      createdAt: t(($) => $.dateCreated),
      updatedAt: t(($) => $.dateModified)
    }),
    [t]
  )

  const columns = useMemo<ColumnDef<TaskWithProfile>[]>(
    () => [
      ...(canEdit ? [getSelectColDef<TaskWithProfile>()] : []),
      {
        accessorKey: 'name',
        cell: ({ row }) => (
          <NameCell
            className="ps-2"
            name={row.original.name}
          />
        ),
        enableHiding: false,
        header: ({ column }) => (
          <SortableColumnHeader
            className="ps-2"
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
      }
      // @TODO add actions
      // ...(canEdit ? [getTaskActionsColDef(teamId)] : [])
    ],
    [canEdit, i18n.language, t]
  )

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: canEdit,
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange,
    onPaginationChange,
    onSortingChange,
    onColumnVisibilityChange,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues()
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
          {/* <UpdateTaskDrawer
            projectId={projectId}
            teamId={teamId}
            employees={teamMembers}
          /> */}
        </>
      )}

      {tasks.length > 0 ? (
        <>
          <div className="grid items-center justify-between gap-2 xl:flex">
            <TableToolbar table={table} />

            <div className="flex gap-2">
              <ColumnsVisibility
                table={table}
                labels={labels}
              />

              {canEdit && (
                <>
                  <AddTaskDrawerTrigger />
                  {/* <TasksTableMassDelete
                    projectId={projectId}
                    rowSelection={rowSelection}
                    setRowSelection={setRowSelection}
                    teamId={teamId}
                  /> */}
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
