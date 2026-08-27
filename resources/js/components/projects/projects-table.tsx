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
import { EllipsisVertical, Folder } from 'lucide-react'
import { useContext, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
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
import { destroy, show } from '@/routes/projects'
import type { Project, View, ViewStore } from '@/types'

//#region MassDelete
// export function MassDelete({
//   rowSelection,
//   setRowSelection,
//   teamId
// }: {
//   rowSelection: Record<number, boolean>
//   setRowSelection: Dispatch<SetStateAction<Record<number, boolean>>>
//   teamId: number
// }) {
//   // i18n
//   const { t } = useTranslation()

//   // Submit handler
//   async function submit() {
//     // Parse selection
//     const ids: number[] = []
//     for (const key in rowSelection) {
//       ids.push(parseInt(key))
//     }

//     if (ids.length > 0) {
//       // API
//       await fetcher.submit(
//         { ids },
//         {
//           action: route('projects.destroy-many', { team: teamId }),
//           method: 'POST'
//         }
//       )

//       // Reset selection
//       setRowSelection({})
//     }
//   }

//   return (
//     <Button
//       disabled={disabled}
//       onClick={submit}
//       size="sm"
//       variant="destructive"
//     >
//       {t('delete')}
//       <Trash2 />
//     </Button>
//   )
// }

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

  if (canEdit) {
    return (
      <>
        <DestroyDialog
          description={t(($) => $.projects.deleteDesc, {
            project: project.name
          })}
          open={deleteOpen}
          route={destroy({ project, team: project.team_id })}
          setOpen={setDeleteOpen}
          title={t(($) => $.projects.deleteTitle)}
          warning={t(($) => $.projects.deleteWarn)}
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
                setActiveProject(project)
                setUpdateProjectOpen(true)
              }}
            >
              {t(($) => $.edit)}
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => setDeleteOpen(true)}
              variant="destructive"
            >
              {t(($) => $.delete)}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    )
  }

  return <div className="min-h-8" />
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
  projects: Project[]
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
      // usersCount: t('user_other'),
      // tasksCount: t('task_other'),
      createdAt: t(($) => $.dateCreated),
      deadline: t(($) => $.projects.deadline),
      name: t(($) => $.name),
      updatedAt: t(($) => $.dateModified)
    }),
    [t]
  )

  const columns = useMemo<ColumnDef<Project>[]>(
    () => [
      ...(canEdit ? [getSelectColDef<Project>()] : []),
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
      // {
      //   accessorKey: 'usersCount',
      //   header: ({ column }) => (
      //     <SortableColumnHeader
      //       column={column}
      //       title={t('user_other')}
      //     />
      //   )
      // },
      // {
      //   accessorKey: 'tasksCount',
      //   header: ({ column }) => (
      //     <SortableColumnHeader
      //       column={column}
      //       title={t('task_other')}
      //     />
      //   )
      // },
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
    <section className="grid gap-3">
      {canEdit && (
        <>
          <AddProjectDrawer teamId={teamId} />
          <UpdateProjectDrawer />
        </>
      )}

      {projects.length > 0 ? (
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
                  <AddProjectDrawerTrigger />
                  {/* <ProjectsTableMassDelete
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
        <EmptyFiller canCreate={canEdit} />
      )}
    </section>
  )
}
