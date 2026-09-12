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
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ActionsMenu, type ActionProps } from '@/components/actions-menu'
import TableMain, {
  AfterTable,
  ColumnsVisibility,
  SortableColumnHeader,
  TableToolbar
} from '@/components/ui/data-table'
import { DestroyDialog } from '@/components/ui/destroy-dialog'
import UseTableStates from '@/hooks/use-table-states'
import { format } from '@/lib/utils'
import { destroy, update } from '@/routes/invitations'
import type { Invitation, View, ViewStore } from '@/types'

function Actions({ invitation }: { invitation: Invitation }) {
  // i18n
  const { t } = useTranslation()

  // Delete dialog state
  const [deleteOpen, setDeleteOpen] = useState(false)

  // Update invitation form
  const { submit: renewInvitation } = useForm()

  const mainActions: ActionProps[] = [
    {
      label: t(($) => $.pages.dashboard.invitations.renew),
      name: 'renew',
      onClick: () => renewInvitation(update(invitation.id))
    }
  ]

  const secondaryActions: ActionProps[] = [
    {
      label: t(($) => $.pages.dashboard.invitations.revoke),
      name: 'open-delete-dialog',
      onClick: () => setDeleteOpen(true),
      variant: 'destructive'
    }
  ]

  return (
    <>
      <DestroyDialog
        description={t(($) => $.dialogs.deleteInvitation.description, {
          email: invitation.user.email
        })}
        open={deleteOpen}
        route={destroy(invitation)}
        setOpen={setDeleteOpen}
        title={t(($) => $.dialogs.deleteInvitation.title)}
      />
      <ActionsMenu
        actions={mainActions}
        secondary={secondaryActions}
      />
    </>
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
        cell: ({ row }) => <Actions invitation={row.original} />,
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
    <div className="grid gap-3">
      <div className="grid items-center justify-between gap-2 @5xl/main:flex">
        <TableToolbar
          columnId="user_profile_name"
          table={table}
        />

        <ColumnsVisibility
          labels={labels}
          table={table}
        />
      </div>

      <TableMain
        id="invitations-table"
        table={table}
      />

      <AfterTable
        selection={false}
        sortingLabels={labels}
        sortingState={sorting}
        table={table}
      />
    </div>
  )
}
