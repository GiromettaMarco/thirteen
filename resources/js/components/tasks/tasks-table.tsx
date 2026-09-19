import { Button } from '@gmcode/react-ui'
import { SquareCheckBig } from 'lucide-react'
import { useContext, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ActionsMenu, type ActionProps } from '@/components/actions-menu'
import { CellAction } from '@/components/data-table/components/cell-action'
import { ColumnHeader } from '@/components/data-table/components/column-header'
import {
  SelectionHeader,
  SelectionRow
} from '@/components/data-table/components/selection'
import { DataTable } from '@/components/data-table/data-table'
import { createColumnHelper } from '@/components/data-table/utility'
import {
  AddTaskDrawer,
  AddTaskDrawerTrigger
} from '@/components/tasks/add-task-drawer'
import { LabelBadge } from '@/components/tasks/label-badge'
import { PriorityBadge } from '@/components/tasks/priority-badge'
import { StatusBadge } from '@/components/tasks/status-badge'
import { UpdateTaskDrawer } from '@/components/tasks/update-task-drawer'
import { DestroyDialog } from '@/components/ui/destroy-dialog'
import { DestroyMany } from '@/components/ui/destroy-many'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle
} from '@/components/ui/empty'
import {
  useTaskLabelFilters,
  useTaskPriorityFilters,
  useTaskStatusFilters
} from '@/hooks/use-table-filters'
import { format, sortPriority } from '@/lib/utils'
import { AppContext } from '@/providers/app-context-provider'
import { show as memberShow } from '@/routes/members'
import { destroy, destroyMany } from '@/routes/tasks'
import type { Profile, Task, TaskWithProfile } from '@/types'

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

  if (!canEdit) {
    return <div className="min-h-8" />
  }

  const mainActions: ActionProps[] = [
    {
      label: t(($) => $.actions.edit),
      name: 'open-update-drawer',
      onClick: () => {
        setActiveTask(task)
        setUpdateTaskOpen(true)
      }
    }
  ]

  const secondaryActions: ActionProps[] = [
    {
      label: t(($) => $.actions.delete),
      name: 'open-delete-dialog',
      onClick: () => setDeleteOpen(true),
      variant: 'destructive'
    }
  ]

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
      <ActionsMenu
        actions={mainActions}
        secondary={secondaryActions}
      />
    </>
  )
}

//#region EmptyFiller
function EmptyFiller() {
  // i18n
  const { t } = useTranslation()

  // App context
  const { setAddTaskOpen: setOpen } = useContext(AppContext)

  return (
    <Empty
      className="rounded-md border border-solid"
      id="tasks-table-filler"
    >
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
        <Button
          id="open-create-task-drawer"
          onClick={() => setOpen(true)}
        >
          {t(($) => $.tasks.createTask)}
        </Button>
      </EmptyContent>
    </Empty>
  )
}

//#region TasksTable
export function TasksTable({
  canEdit = false,
  id = 'tasks-table',
  projectId,
  storage,
  tasks,
  teamId,
  teamMembers,
  title
}: {
  canEdit?: boolean
  id?: string
  projectId: number
  storage?: string
  tasks: TaskWithProfile[]
  teamId: number
  teamMembers?: Profile[]
  title?: string
}) {
  // i18n
  const { i18n, t } = useTranslation()

  // Global state
  const { setActiveTask, setUpdateTaskOpen } = useContext(AppContext)

  const openUpdateTaskDrawer = useMemo(() => {
    return (task: Task) => {
      setActiveTask(task)
      setUpdateTaskOpen(true)
    }
  }, [setActiveTask, setUpdateTaskOpen])

  const columnHelper = createColumnHelper<TaskWithProfile>()

  const labelFilters = useTaskLabelFilters()
  const priorityFilters = useTaskPriorityFilters()
  const statusFilters = useTaskStatusFilters()

  const columns = useMemo(
    () =>
      columnHelper.columns([
        ...(canEdit
          ? [
              columnHelper.display({
                cell: ({ row }) => <SelectionRow row={row} />,
                enableHiding: false,
                header: ({ table }) => <SelectionHeader table={table} />,
                id: 'select'
              })
            ]
          : []),
        columnHelper.accessor('name', {
          cell: ({ cell, row }) => (
            <CellAction
              onClick={
                canEdit ? () => openUpdateTaskDrawer(row.original) : undefined
              }
              value={cell.getValue()}
            />
          ),
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
        columnHelper.accessor('profile', {
          cell: ({ row }) =>
            row.original.profile ? (
              <CellAction
                href={memberShow({
                  profile: row.original.profile,
                  team: teamId
                })}
                value={row.original.profile.name}
              />
            ) : null,
          header: ({ column }) => (
            <ColumnHeader
              column={column}
              sorting
            />
          ),
          meta: { label: t(($) => $.tasks.assignedTo) }
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
        }),
        columnHelper.display({
          cell: ({ row }) => (
            <Actions
              canEdit={canEdit}
              task={row.original}
              teamId={teamId}
            />
          ),
          enableHiding: false,
          id: 'actions'
        })
      ]),
    [
      canEdit,
      columnHelper,
      i18n.language,
      labelFilters,
      openUpdateTaskDrawer,
      priorityFilters,
      statusFilters,
      t,
      teamId
    ]
  )

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
        <DataTable
          actions={(table) =>
            canEdit && (
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
            )
          }
          columns={columns}
          data={tasks}
          id={id}
          macros={{
            selectionMonitor: canEdit
          }}
          storage={storage}
          title={title}
        />
      ) : (
        <EmptyFiller />
      )}
    </section>
  )
}
