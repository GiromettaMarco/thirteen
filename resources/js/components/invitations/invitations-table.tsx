import { useForm } from '@inertiajs/react'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ActionsMenu, type ActionProps } from '@/components/actions-menu'
import { ColumnHeader } from '@/components/data-table/components/column-header'
import { DataTable } from '@/components/data-table/data-table'
import { createColumnHelper } from '@/components/data-table/utility'
import { DestroyDialog } from '@/components/ui/destroy-dialog'
import { format } from '@/lib/utils'
import { destroy, update } from '@/routes/invitations'
import type { Invitation } from '@/types'

//#region Actions
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
  id = 'invitations-table',
  invitations,
  storage,
  title
}: {
  id?: string
  invitations: Invitation[]
  storage?: string
  title?: string
}) {
  // i18n
  const { i18n, t } = useTranslation()

  const columnHelper = createColumnHelper<Invitation>()

  const columns = useMemo(
    () =>
      columnHelper.columns([
        columnHelper.accessor('user.profile.name', {
          enableHiding: false,
          header: ({ column }) => (
            <ColumnHeader
              column={column}
              sorting
            />
          ),
          id: 'name',
          meta: { label: t(($) => $.name) }
        }),
        columnHelper.accessor('user.email', {
          header: ({ column }) => (
            <ColumnHeader
              column={column}
              sorting
            />
          ),
          id: 'email',
          meta: { label: t(($) => $.emailAddress) }
        }),
        columnHelper.accessor('created_at', {
          cell: ({ cell }) => format(cell.getValue(), i18n.language, 'Pp'),
          header: ({ column }) => (
            <ColumnHeader
              column={column}
              sorting
            />
          ),
          meta: { label: t(($) => $.pages.dashboard.invitations.first) },
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
          meta: { label: t(($) => $.pages.dashboard.invitations.last) },
          sortFn: 'datetime'
        }),
        columnHelper.display({
          cell: ({ row }) => <Actions invitation={row.original} />,
          enableHiding: false,
          id: 'actions'
        })
      ]),
    [columnHelper, i18n.language, t]
  )

  return (
    <DataTable
      columns={columns}
      data={invitations}
      id={id}
      storage={storage}
      title={title}
    />
  )
}
