import { useForm } from '@inertiajs/react'
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
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import TableMain, {
  ActionsButton,
  AfterTable,
  ColumnsVisibility,
  SortableColumnHeader,
  TableToolbar
} from '@/components/ui/data-table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import UseTableStates from '@/hooks/use-table-states'
import { format } from '@/lib/utils'
import { destroy, update } from '@/routes/invitations'
import type { Invitation, View, ViewStore } from '@/types'

//#region InvitationsTableActions
function UpdateInvitationItem({ id }: { id: number }) {
  // i18n
  const { t } = useTranslation()

  // Inertia form
  const { submit } = useForm()

  return (
    <DropdownMenuItem onClick={() => submit(update(id))}>
      {t(($) => $.pages.dashboard.invitations.renew)}
    </DropdownMenuItem>
  )
}

function DeleteInvitationItem({ id }: { id: number }) {
  // i18n
  const { t } = useTranslation()

  // Inertia form
  const { submit } = useForm()

  return (
    <DropdownMenuItem
      className="text-destructive"
      onClick={() => submit(destroy(id))}
    >
      {t(($) => $.pages.dashboard.invitations.revoke)}
    </DropdownMenuItem>
  )
}

function InvitationsTableActions({ invitation }: { invitation: Invitation }) {
  return (
    <DropdownMenu>
      <ActionsButton />

      <DropdownMenuContent
        align="end"
        className="w-32"
      >
        <UpdateInvitationItem id={invitation.id} />

        <DropdownMenuSeparator />

        <DeleteInvitationItem id={invitation.id} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

//#region InvitationsTable
export function InvitationsTable({
  invitations,
  view,
  viewStore
}: {
  invitations: Invitation[]
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
    setData,
    sorting
  } = UseTableStates({
    data: invitations,
    view,
    viewStore
  })

  // Watch for data revalidation
  useEffect(() => {
    setData(() => invitations)
  }, [invitations, setData])

  const labels = useMemo<Record<string, string>>(
    () => ({
      created_at: t(($) => $.pages.dashboard.invitations.first),
      updated_at: t(($) => $.pages.dashboard.invitations.last),
      user_email: t(($) => $.emailAddress)
    }),
    [t]
  )

  const columns = useMemo<ColumnDef<Invitation>[]>(
    () => [
      {
        accessorKey: 'user.profile.name',
        enableHiding: false,
        header: ({ column }) => (
          <SortableColumnHeader
            column={column}
            title={t(($) => $.name)}
          />
        )
      },
      {
        accessorKey: 'user.email',
        header: ({ column }) => (
          <SortableColumnHeader
            column={column}
            title={t(($) => $.emailAddress)}
          />
        )
      },
      {
        accessorKey: 'created_at',
        cell: ({ row }) => format(row.original.created_at, i18n.language, 'Pp'),
        header: ({ column }) => (
          <SortableColumnHeader
            column={column}
            title={t(($) => $.pages.dashboard.invitations.first)}
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
            title={t(($) => $.pages.dashboard.invitations.last)}
          />
        ),
        sortingFn: 'datetime'
      },
      {
        cell: ({ row }) => (
          <InvitationsTableActions invitation={row.original} />
        ),
        id: 'actions'
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
          columnId="user_profile_name"
          table={table}
        />

        <ColumnsVisibility
          labels={labels}
          table={table}
        />
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
