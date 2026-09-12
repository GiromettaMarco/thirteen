import { Button } from '@gmcode/react-ui'
import type { ColumnDef } from '@tanstack/react-table'
import {
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { Folder } from 'lucide-react'
import { useContext, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ActionsMenu, type ActionProps } from '@/components/actions-menu'
import { NameCell } from '@/components/name-cell'
import {
  AddProjectDrawer,
  AddProjectDrawerTrigger
} from '@/components/projects/add-project-drawer'
import { ProjectDeadline } from '@/components/projects/project-deadline'
import { UpdateProjectDrawer } from '@/components/projects/update-project-drawer'
import TableMain, {
  AfterTable,
  ColumnsVisibility,
  getSelectColDef,
  SortableColumnHeader,
  TableToolbar
} from '@/components/ui/data-table'
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
import UseTableStates from '@/hooks/use-table-states'
import { format } from '@/lib/utils'
import { AppContext } from '@/providers/app-context-provider'
import { destroy, destroyMany, show } from '@/routes/projects'
import type { Project, ProjectWithTasksCount, View, ViewStore } from '@/types'

//#region Actions
export function Actions({
  canEdit = false,
  project
}: {
  canEdit?: boolean
  project: Project
}) {
  // i18n
  const { t } = useTranslation()

  // Global state
  const { setActiveProject, setUpdateProjectOpen } = useContext(AppContext)

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
        setActiveProject(project)
        setUpdateProjectOpen(true)
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
        description={t(($) => $.dialogs.deleteProject.description, {
          project: project.name
        })}
        open={deleteOpen}
        route={destroy({ project, team: project.team_id })}
        setOpen={setDeleteOpen}
        title={t(($) => $.dialogs.deleteProject.title)}
        warning={t(($) => $.dialogs.deleteProject.warn)}
      />
      <ActionsMenu
        actions={mainActions}
        secondary={secondaryActions}
      />
    </>
  )
}

//#region EmptyFiller
function EmptyFiller({ canCreate = false }: { canCreate?: boolean }) {
  // i18n
  const { t } = useTranslation()

  // App context
  const { setAddProjectOpen: setOpen } = useContext(AppContext)

  return (
    <Empty className="rounded-md border border-solid">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Folder />
        </EmptyMedia>

        <EmptyTitle>{t(($) => $.projects.emptyTable.title)}</EmptyTitle>

        <EmptyDescription>
          <p>{t(($) => $.projects.emptyTable.line1)}</p>
          {canCreate && <p>{t(($) => $.projects.emptyTable.line2)}</p>}
        </EmptyDescription>
      </EmptyHeader>

      {canCreate && (
        <EmptyContent>
          <Button onClick={() => setOpen(true)}>
            {t(($) => $.projects.createProject)}
          </Button>
        </EmptyContent>
      )}
    </Empty>
  )
}

//#region ProjectsTable
export function ProjectsTable({
  canEdit = false,
  projects,
  teamId,
  view,
  viewStore
}: {
  canEdit?: boolean
  projects: ProjectWithTasksCount[]
  teamId: number
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
    data: projects,
    view,
    viewStore
  })

  // Watch for data revalidation
  useEffect(() => {
    setData(() => projects)
  }, [projects, setData])

  const labels = useMemo<Record<string, string>>(
    () => ({
      created_at: t(($) => $.dateCreated),
      deadline: t(($) => $.projects.deadline),
      name: t(($) => $.name),
      tasks_count: t(($) => $.task, { count: 2 }),
      updated_at: t(($) => $.dateModified)
    }),
    [t]
  )

  const columns = useMemo<ColumnDef<ProjectWithTasksCount>[]>(
    () => [
      ...(canEdit ? [getSelectColDef<ProjectWithTasksCount>()] : []),
      {
        accessorKey: 'name',
        cell: ({ row }) => (
          <NameCell
            href={show({
              project: row.original.id,
              team: teamId
            })}
            name={row.original.name}
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
      },
      {
        accessorKey: 'deadline',
        cell: ({ row }) => <ProjectDeadline deadline={row.original.deadline} />,
        header: ({ column }) => (
          <SortableColumnHeader
            column={column}
            title={t(($) => $.projects.deadline)}
          />
        ),
        sortingFn: 'datetime'
      },
      {
        accessorKey: 'tasks_count',
        header: ({ column }) => (
          <SortableColumnHeader
            column={column}
            title={t(($) => $.task, { count: 2 })}
          />
        )
      },
      {
        cell: ({ row }) => (
          <Actions
            canEdit={canEdit}
            project={row.original}
          />
        ),
        id: 'actions'
      }
    ],
    [canEdit, i18n.language, t, teamId]
  )

  const table = useReactTable({
    columns,
    data,
    enableRowSelection: true,
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
    <div className="grid gap-3">
      {canEdit && (
        <>
          <AddProjectDrawer teamId={teamId} />
          <UpdateProjectDrawer />
        </>
      )}

      {projects.length > 0 ? (
        <>
          <div className="grid items-center justify-between gap-2 @5xl/main:flex">
            <TableToolbar table={table} />

            <div className="flex gap-2">
              <ColumnsVisibility
                labels={labels}
                table={table}
              />

              {canEdit && (
                <>
                  <AddProjectDrawerTrigger />
                  <DestroyMany
                    route={destroyMany({ team: teamId })}
                    table={table}
                    title={t(($) => $.projects.deleteManyDialog.title)}
                  />
                </>
              )}
            </div>
          </div>

          <TableMain
            id="projects-table"
            table={table}
          />

          <AfterTable
            selection={canEdit}
            sortingLabels={labels}
            sortingState={sorting}
            table={table}
          />
        </>
      ) : (
        <EmptyFiller canCreate={canEdit} />
      )}
    </div>
  )
}
