import { Check } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ActionsMenu, type ActionProps } from '@/components/actions-menu'
import { CellAction } from '@/components/data-table/components/cell-action'
import { ColumnHeader } from '@/components/data-table/components/column-header'
import { DataTable } from '@/components/data-table/data-table'
import { createColumnHelper } from '@/components/data-table/utility'
import {
  AddMemberDrawer,
  AddMemberDrawerTrigger
} from '@/components/teams/members/add-member-drawer'
import {
  LeaveTeamDialog,
  RemoveMemberDialog
} from '@/components/teams/members/destroy-member-dialog'
import { show } from '@/routes/members'
import type { Team, TeamMember } from '@/types'

//#region Actions
function Actions({
  canEdit,
  currentProfileId,
  member,
  team
}: {
  canEdit: boolean
  currentProfileId?: number
  member: TeamMember
  team: Team
}) {
  // i18n
  const { t } = useTranslation()

  // Delete dialog state
  const [deleteOpen, setDeleteOpen] = useState(false)

  const mainActions: ActionProps[] = [
    {
      href: show({ profile: member.id, team }),
      label: canEdit ? t(($) => $.actions.edit) : t(($) => $.actions.show),
      name: 'show'
    }
  ]

  const secondaryActions: ActionProps[] = []

  if (canEdit || currentProfileId === member.id) {
    secondaryActions.push({
      label:
        currentProfileId === member.id
          ? t(($) => $.actions.leave)
          : t(($) => $.actions.remove),
      name: 'open-delete-dialog',
      onClick: () => setDeleteOpen(true),
      variant: 'destructive'
    })
  }

  return (
    <>
      {currentProfileId === member.id ? (
        <LeaveTeamDialog
          open={deleteOpen}
          setOpen={setDeleteOpen}
          team={team}
        />
      ) : canEdit ? (
        <RemoveMemberDialog
          member={member}
          open={deleteOpen}
          setOpen={setDeleteOpen}
          team={team}
        />
      ) : null}

      <ActionsMenu
        actions={mainActions}
        secondary={secondaryActions}
      />
    </>
  )
}

//#region MembersTable
export function MembersTable({
  canEdit = false,
  currentProfileId,
  id = 'members-table',
  members,
  storage,
  team,
  title
}: {
  canEdit?: boolean
  currentProfileId?: number
  id?: string
  members: TeamMember[]
  storage?: string
  team: Team
  title?: string
}) {
  // i18n
  const { t } = useTranslation()

  const columnHelper = createColumnHelper<TeamMember>()

  const columns = useMemo(
    () =>
      columnHelper.columns([
        columnHelper.accessor('name', {
          cell: ({ cell, row }) => (
            <CellAction
              href={show({ profile: row.original.id, team })}
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
        columnHelper.accessor('tasks_count', {
          header: ({ column }) => (
            <ColumnHeader
              column={column}
              sorting
            />
          ),
          meta: { label: t(($) => $.task, { count: 2 }) }
        }),
        columnHelper.accessor('pivot.admin', {
          cell: ({ cell }) =>
            cell.getValue() ? <Check className="size-4" /> : null,
          header: ({ column }) => (
            <ColumnHeader
              column={column}
              sorting
            />
          ),
          id: 'admin',
          meta: { label: t(($) => $.teamPermissions.short.admin) }
        }),
        columnHelper.accessor('pivot.can_edit_team', {
          cell: ({ cell }) =>
            cell.getValue() ? <Check className="size-4" /> : null,
          header: ({ column }) => (
            <ColumnHeader
              column={column}
              sorting
            />
          ),
          id: 'can-edit-team',
          meta: { label: t(($) => $.teamPermissions.short.canEditTeam) }
        }),
        columnHelper.accessor('pivot.can_delete_team', {
          cell: ({ cell }) =>
            cell.getValue() ? <Check className="size-4" /> : null,
          header: ({ column }) => (
            <ColumnHeader
              column={column}
              sorting
            />
          ),
          id: 'can-delete-team',
          meta: { label: t(($) => $.teamPermissions.short.canDeleteTeam) }
        }),
        columnHelper.accessor('pivot.can_edit_projects', {
          cell: ({ cell }) =>
            cell.getValue() ? <Check className="size-4" /> : null,
          header: ({ column }) => (
            <ColumnHeader
              column={column}
              sorting
            />
          ),
          id: 'can-edit-projects',
          meta: { label: t(($) => $.teamPermissions.short.canEditProjects) }
        }),
        columnHelper.accessor('pivot.can_edit_members', {
          cell: ({ cell }) =>
            cell.getValue() ? <Check className="size-4" /> : null,
          header: ({ column }) => (
            <ColumnHeader
              column={column}
              sorting
            />
          ),
          id: 'can-edit-members',
          meta: { label: t(($) => $.teamPermissions.short.canEditMembers) }
        }),
        columnHelper.display({
          cell: ({ row }) => (
            <Actions
              canEdit={canEdit}
              currentProfileId={currentProfileId}
              member={row.original}
              team={team}
            />
          ),
          enableHiding: false,
          id: 'actions'
        })
      ]),
    [columnHelper, canEdit, currentProfileId, t, team]
  )

  return (
    <section className="grid gap-3">
      {canEdit && (
        <AddMemberDrawer
          currentProfileId={currentProfileId}
          currentProfiles={members.map((profile) => profile.id)}
          teamId={team.id}
        />
      )}

      <DataTable
        actions={() => canEdit && <AddMemberDrawerTrigger />}
        columns={columns}
        data={members}
        id={id}
        storage={storage}
        title={title}
      />
    </section>
  )
}
