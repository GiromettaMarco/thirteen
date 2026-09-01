import { Link } from '@inertiajs/react'
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
import { NameCell } from '@/components/name-cell'
import {
  AddMemberDrawer,
  AddMemberDrawerTrigger
} from '@/components/teams/members/add-member-drawer'
import {
  LeaveTeamDialog,
  RemoveMemberDialog
} from '@/components/teams/members/destroy-member-dialog'
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

      <DropdownMenu>
        <ActionsButton
          id={`open-team-${team.id}-member-${member.id}-actions`}
          label={t(($) => $.teams.members.actions, { member: member.name })}
        />
        <DropdownMenuContent
          align="end"
          className="w-32"
        >
          <DropdownMenuItem asChild>
            <Link href={show({ profile: member.id, team })}>
              {canEdit ? t(($) => $.edit) : t(($) => $.show)}
            </Link>
          </DropdownMenuItem>

          {(canEdit || currentProfileId === member.id) && (
            <>
              <DropdownMenuSeparator />

              <DropdownMenuItem
                asChild
                variant="destructive"
              >
                <button
                  className="w-full"
                  id={`open-team-${team.id}-delete-member-${member.id}-dialog`}
                  onClick={() => setDeleteOpen(true)}
                  type="button"
                >
                  {currentProfileId === member.id
                    ? t(($) => $.teams.leave)
                    : t(($) => $.remove)}
                </button>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

//#region MembersTable
export function MembersTable({
  canEdit = false,
  currentProfileId,
  members,
  team,
  view,
  viewStore
}: {
  canEdit?: boolean
  currentProfileId?: number
  members: TeamMember[]
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

  function sortBoolean(a: boolean, b: boolean) {
    return a === b ? 0 : a === true ? 1 : -1
  }

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
    <section className="grid gap-3">
      {canEdit && (
        <AddMemberDrawer
          currentProfileId={currentProfileId}
          currentProfiles={members.map((profile) => profile.id)}
          teamId={team.id}
        />
      )}

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

          {canEdit && <AddMemberDrawerTrigger />}
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
