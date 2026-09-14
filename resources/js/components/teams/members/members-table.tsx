import {
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type Row
} from '@tanstack/react-table'
import { Check } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ActionsMenu, type ActionProps } from '@/components/actions-menu'
import { NameCell } from '@/components/name-cell'
import {
  AddMemberDrawer,
  AddMemberDrawerTrigger
} from '@/components/teams/members/add-member-drawer'
import {
  LeaveTeamDialog,
  RemoveMemberDialog
} from '@/components/teams/members/destroy-member-dialog'
import {
  AfterTable,
  ColumnsVisibility,
  SortableColumnHeader,
  TableFilters,
  TableMain
} from '@/components/ui/data-table'
import UseTableStates from '@/hooks/use-table-states'
import { sortBoolean } from '@/lib/utils'
import { show } from '@/routes/members'
import type { Team, TeamMember, View, ViewStore } from '@/types'

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
  members,
  slug = 'members',
  team,
  view,
  viewStore
}: {
  canEdit?: boolean
  currentProfileId?: number
  members: TeamMember[]
  slug?: string
  team: Team
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
      pivot_admin: t(($) => $.teamPermissions.short.admin),
      pivot_can_delete_team: t(($) => $.teamPermissions.short.canDeleteTeam),
      pivot_can_edit_members: t(($) => $.teamPermissions.short.canEditMembers),
      pivot_can_edit_projects: t(
        ($) => $.teamPermissions.short.canEditProjects
      ),
      pivot_can_edit_team: t(($) => $.teamPermissions.short.canEditTeam),
      tasks_count: t(($) => $.task, { count: 2 })
    }),
    [t]
  )

  const columns = useMemo<ColumnDef<TeamMember>[]>(
    () => [
      {
        accessorKey: 'name',
        cell: ({ row }) => (
          <NameCell
            className="ps-2"
            href={show({ profile: row.original.id, team })}
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
        accessorKey: 'tasks_count',
        header: ({ column }) => (
          <SortableColumnHeader
            column={column}
            title={t(($) => $.task, { count: 2 })}
          />
        )
      },
      {
        accessorKey: 'pivot_admin',
        cell: ({ row }) =>
          row.original.pivot.admin ? <Check className="size-4" /> : null,
        header: ({ column }) => (
          <SortableColumnHeader
            column={column}
            title={t(($) => $.teamPermissions.short.admin)}
          />
        ),
        sortingFn: (rowA, rowB) =>
          sortBoolean(rowA.original.pivot.admin, rowB.original.pivot.admin)
      },
      {
        accessorKey: 'pivot_can_edit_team',
        cell: ({ row }) =>
          row.original.pivot.can_edit_team ? (
            <Check className="size-4" />
          ) : null,
        header: ({ column }) => (
          <SortableColumnHeader
            column={column}
            title={t(($) => $.teamPermissions.short.canEditTeam)}
          />
        ),
        sortingFn: (rowA, rowB) =>
          sortBoolean(
            rowA.original.pivot.can_edit_team,
            rowB.original.pivot.can_edit_team
          )
      },
      {
        accessorKey: 'pivot_can_delete_team',
        cell: ({ row }) =>
          row.original.pivot.can_delete_team ? (
            <Check className="size-4" />
          ) : null,
        header: ({ column }) => (
          <SortableColumnHeader
            column={column}
            title={t(($) => $.teamPermissions.short.canDeleteTeam)}
          />
        ),
        sortingFn: (rowA, rowB) =>
          sortBoolean(
            rowA.original.pivot.can_delete_team,
            rowB.original.pivot.can_delete_team
          )
      },
      {
        accessorKey: 'pivot_can_edit_projects',
        cell: ({ row }) =>
          row.original.pivot.can_edit_projects ? (
            <Check className="size-4" />
          ) : null,
        header: ({ column }) => (
          <SortableColumnHeader
            column={column}
            title={t(($) => $.teamPermissions.short.canEditProjects)}
          />
        ),
        sortingFn: (rowA, rowB) =>
          sortBoolean(
            rowA.original.pivot.can_edit_projects,
            rowB.original.pivot.can_edit_projects
          )
      },
      {
        accessorKey: 'pivot_can_edit_members',
        cell: ({ row }) =>
          row.original.pivot.can_edit_members ? (
            <Check className="size-4" />
          ) : null,
        header: ({ column }) => (
          <SortableColumnHeader
            column={column}
            title={t(($) => $.teamPermissions.short.canEditMembers)}
          />
        ),
        sortingFn: (rowA, rowB) =>
          sortBoolean(
            rowA.original.pivot.can_edit_members,
            rowB.original.pivot.can_edit_members
          )
      },
      {
        cell: ({ row }: { row: Row<TeamMember> }) => (
          <Actions
            canEdit={canEdit}
            currentProfileId={currentProfileId}
            member={row.original}
            team={team}
          />
        ),
        id: 'actions'
      }
    ],
    [canEdit, currentProfileId, t, team]
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
      {canEdit && (
        <AddMemberDrawer
          currentProfileId={currentProfileId}
          currentProfiles={members.map((profile) => profile.id)}
          teamId={team.id}
        />
      )}

      <div
        className="grid items-center justify-between gap-2 @5xl/main:flex"
        id={`${slug}-table-toolbar`}
      >
        <TableFilters
          className="md:flex"
          table={table}
        />

        <div className="flex gap-2">
          <ColumnsVisibility
            labels={labels}
            table={table}
          />

          {canEdit && <AddMemberDrawerTrigger />}
        </div>
      </div>

      <TableMain
        slug={slug}
        table={table}
      />

      <AfterTable
        selection={false}
        slug={slug}
        sortingLabels={labels}
        sortingState={sorting}
        table={table}
      />
    </div>
  )
}
