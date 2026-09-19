import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { CellAction } from '@/components/data-table/components/cell-action'
import { ColumnHeader } from '@/components/data-table/components/column-header'
import { DataTable } from '@/components/data-table/data-table'
import { createColumnHelper } from '@/components/data-table/utility'
import { LabelBadge } from '@/components/tasks/label-badge'
import { PriorityBadge } from '@/components/tasks/priority-badge'
import { StatusBadge } from '@/components/tasks/status-badge'
import {
  useTaskLabelFilters,
  useTaskPriorityFilters,
  useTaskStatusFilters
} from '@/hooks/use-table-filters'
import { format, sortPriority } from '@/lib/utils'
import { show as projectsShow } from '@/routes/projects'
import type { TaskWithProject } from '@/types'

export function AssignedTasksTable({
  storage,
  tasks
}: {
  storage?: string
  tasks: TaskWithProject[]
}) {
  // i18n
  const { i18n, t } = useTranslation()

  const columnHelper = createColumnHelper<TaskWithProject>()

  const labelFilters = useTaskLabelFilters()
  const priorityFilters = useTaskPriorityFilters()
  const statusFilters = useTaskStatusFilters()

  const columns = useMemo(
    () =>
      columnHelper.columns([
        columnHelper.accessor('name', {
          cell: ({ getValue }) => getValue(),
          enableHiding: false,
          header: ({ column }) => (
            <ColumnHeader
              column={column}
              filter="search"
              sorting
            />
          ),
          meta: { label: t(($) => $.name) }
        }),
        columnHelper.accessor('label', {
          cell: ({ getValue }) => <LabelBadge label={getValue()} />,
          filterFn: 'calcSheetFilter',
          header: ({ column }) => (
            <ColumnHeader
              column={column}
              filter="defined"
              sorting
            />
          ),
          meta: {
            filters: labelFilters,
            label: t(($) => $.tasks.label)
          }
        }),
        columnHelper.accessor('priority', {
          cell: ({ getValue }) => <PriorityBadge priority={getValue()} />,
          filterFn: 'calcSheetFilter',
          header: ({ column }) => (
            <ColumnHeader
              column={column}
              filter="defined"
              sorting
            />
          ),
          meta: {
            filters: priorityFilters,
            label: t(($) => $.tasks.priority)
          },
          sortFn: (rowA, rowB) =>
            sortPriority(rowA.original.priority, rowB.original.priority)
        }),
        columnHelper.accessor('status', {
          cell: ({ getValue }) => <StatusBadge status={getValue()} />,
          filterFn: 'calcSheetFilter',
          header: ({ column }) => (
            <ColumnHeader
              column={column}
              filter="defined"
              sorting
            />
          ),
          meta: {
            filters: statusFilters,
            label: t(($) => $.tasks.status)
          }
        }),
        columnHelper.accessor('project.name', {
          cell: ({ cell, row }) => (
            <CellAction
              href={projectsShow({
                project: row.original.project,
                team: row.original.project.team_id
              })}
              value={cell.getValue()}
            />
          ),
          header: ({ column }) => (
            <ColumnHeader
              column={column}
              sorting
            />
          ),
          id: 'project',
          meta: { label: t(($) => $.project, { count: 1 }) }
        }),
        columnHelper.accessor('created_at', {
          cell: ({ cell }) => format(cell.getValue(), i18n.language, 'Pp'),
          header: ({ column }) => (
            <ColumnHeader
              column={column}
              sorting
            />
          ),
          meta: { label: t(($) => $.dateCreated) },
          sortFn: 'datetime'
        }),
        columnHelper.accessor('updated_at', {
          cell: ({ cell }) => format(cell.getValue(), i18n.language, 'Pp'),
          header: ({ column }) => (
            <ColumnHeader
              column={column}
              sorting
            />
          ),
          meta: { label: t(($) => $.dateModified) },
          sortFn: 'datetime'
        })
      ]),
    [
      columnHelper,
      i18n.language,
      labelFilters,
      priorityFilters,
      statusFilters,
      t
    ]
  )

  return (
    <DataTable
      columns={columns}
      data={tasks}
      id="your-tasks-table"
      storage={storage}
    />
  )
}
