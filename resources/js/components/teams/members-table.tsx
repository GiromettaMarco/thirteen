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
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { NameCell } from '@/components/name-cell'
import TableMain, {
  AfterTable,
  ColumnsVisibility,
  SortableColumnHeader,
  TableToolbar
} from '@/components/ui/data-table'
import UseTableStates from '@/hooks/use-table-states'
import { show } from '@/routes/members'
import type { Profile, View, ViewStore } from '@/types'

export function MembersTable({
  members,
  // canEdit = false,
  // currentUserId,
  teamId,
  view,
  viewStore
}: {
  canEdit?: boolean
  currentUserId?: number
  members: Profile[]
  teamId: number
  view?: View
  viewStore?: ViewStore
}) {
  // i18n
  const { t } = useTranslation()

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
    setData,
    sorting
  } = UseTableStates({
    data: members,
    view,
    viewStore
  })

  // Watch for data revalidation
  useEffect(() => {
    setData(() => members)
  }, [members, setData])

  const labels = useMemo(
    () => ({
      name: t(($) => $.name),
      role: t(($) => $.role)
      // projectsCount: t('project_other'),
      // tasksCount: t('task_other')
    }),
    [t]
  )

  // const roles = useMemo(
  //   () => [
  //     { key: 1, label: t(($) => $.roles.manager), value: 'manager' },
  //     { key: 2, label: t(($) => $.roles.developer), value: 'developer' },
  //     { key: 3, label: t(($) => $.roles.designer), value: 'designer' },
  //     { key: 4, label: t(($) => $.roles.guest), value: 'guest' }
  //   ],
  //   [t]
  // )

  const columns: ColumnDef<Profile>[] = useMemo(
    () => [
      {
        accessorKey: 'name',
        cell: ({ row }) => (
          <NameCell
            className="ps-2"
            href={show({
              profile: row.original.id,
              team: teamId
            })}
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
      }
      // {
      //   accessorKey: 'role',
      //   cell: ({ row }) => (
      //     <MembersTableRole
      //       canEdit={canEdit}
      //       member={row.original}
      //       roles={roles}
      //       teamId={teamId}
      //     />
      //   ),
      //   header: ({ column }) => (
      //     <SortableColumnHeader
      //       column={column}
      //       title={t(($) => $.role)}
      //     />
      //   )
      // },
      // {
      //   accessorKey: 'projectsCount',
      //   header: ({ column }) => (
      //     <SortableColumnHeader
      //       column={column}
      //       title={t('project_other')}
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
      // {
      //   cell: ({ row }) => (
      //     <MembersTableActions
      //       canEdit={canEdit}
      //       currentUserId={currentUserId}
      //       teamId={teamId}
      //       member={row.original}
      //     />
      //   ),
      //   id: 'actions'
      // }
    ],
    [t, teamId]
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
    onSortingChange,
    state: {
      columnFilters,
      columnVisibility,
      pagination,
      sorting
    }
  })

  return (
    <section className="grid gap-3">
      <div className="grid items-center justify-between gap-2 xl:flex">
        <TableToolbar
          className="md:flex"
          table={table}
        />

        <div className="flex gap-2">
          <ColumnsVisibility
            labels={labels}
            table={table}
          />

          {/* {canEdit && (
            <MembersTableAdd
              ids={members.map((user) => user.id)}
              teamId={teamId}
            />
          )} */}
        </div>
      </div>

      <TableMain table={table} />

      <AfterTable
        selection={false}
        sortingLabels={labels}
        sortingState={sorting}
        table={table}
      />
    </section>
  )
}
