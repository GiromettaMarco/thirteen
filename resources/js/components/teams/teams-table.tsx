import { Button } from '@gmcode/react-ui'
import { useForm, usePage } from '@inertiajs/react'
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
import { Star, UserStar } from 'lucide-react'
import { useContext, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NameCell } from '@/components/name-cell'
import {
  AddTeamDrawer,
  AddTeamDrawerTrigger
} from '@/components/teams/add-team-drawer'
import { LeaveTeamDialog } from '@/components/teams/members/destroy-member-dialog'
import UpdateTeamDrawer from '@/components/teams/update-team-drawer'
import TableMain, {
  ActionsButton,
  AfterTable,
  ColumnsVisibility,
  SortableColumnHeader,
  TableToolbar
} from '@/components/ui/data-table'
import { DestroyDialog } from '@/components/ui/destroy-dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
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
import { AppContext } from '@/providers/app-context-provider'
import { update } from '@/routes/current-team'
import { destroy, show } from '@/routes/teams'
import type {
  Team,
  TeamsTableEntry,
  View,
  ViewStore,
  WithTeamPermissions
} from '@/types'

//#region CurrentTeamCell
function CurrentTeamCell({
  currentTeamId,
  team
}: {
  currentTeamId?: number | null
  team: Team
}) {
  // i18n
  const { t } = useTranslation()

  const { submit } = useForm({
    id: team.id
  })

  function setCurrentTeam() {
    if (currentTeamId != team.id) {
      submit(update())
    }
  }

  return (
    <button
      className="flex justify-center"
      id={`set-current-team-${team.id}`}
      onClick={setCurrentTeam}
      type="button"
    >
      <Star
        className="size-4 hover:text-brand"
        fill={team.id === currentTeamId ? 'currentColor' : 'none'}
      />
      <span className="sr-only">
        {t(($) => $.teams.setCurrent, { team: team.name })}
      </span>
    </button>
  )
}

//#region Actions
function Actions({
  // userId,
  team
}: {
  // userId?: number
  team: Team & WithTeamPermissions
}) {
  // i18n
  const { t } = useTranslation()

  // Global state
  const { setActiveTeam, setUpdateTeamOpen } = useContext(AppContext)

  // Dialogs state
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [leaveOpen, setLeaveOpen] = useState(false)

  // Current team form
  const currentTeamForm = useForm({
    id: team.id
  })

  return (
    <>
      <LeaveTeamDialog
        open={leaveOpen}
        setOpen={setLeaveOpen}
        team={team}
      />
      {team.pivot.can_delete_team && (
        <DestroyDialog
          description={t(($) => $.teams.deleteDesc, { team: team.name })}
          open={deleteOpen}
          route={destroy(team.id)}
          setOpen={setDeleteOpen}
          title={t(($) => $.teams.deleteTitle)}
          warning={t(($) => $.teams.deleteWarn)}
        />
      )}

      <DropdownMenu>
        <ActionsButton
          id={`open-team-${team.id}-actions`}
          label={t(($) => $.teams.actions, { team: team.name })}
        />

        <DropdownMenuContent
          align="end"
          className="w-32"
        >
          <DropdownMenuItem asChild>
            <button
              className="w-full"
              onClick={() => currentTeamForm.submit(update())}
              type="button"
            >
              {t(($) => $.select)}
            </button>
          </DropdownMenuItem>

          {team.pivot.can_edit_team && (
            <DropdownMenuItem asChild>
              <button
                className="w-full"
                id={`open-update-team-${team.id}-drawer`}
                onClick={() => {
                  setActiveTeam(team)
                  setUpdateTeamOpen(true)
                }}
                type="button"
              >
                {t(($) => $.edit)}
              </button>
            </DropdownMenuItem>
          )}

          <DropdownMenuSeparator />

          <DropdownMenuItem
            asChild
            variant="destructive"
          >
            <button
              className="w-full"
              id={`open-leave-team-${team.id}-dialog`}
              onClick={() => setLeaveOpen(true)}
              type="button"
            >
              {t(($) => $.teams.leave)}
            </button>
          </DropdownMenuItem>

          {team.pivot.can_delete_team && (
            <DropdownMenuItem
              asChild
              variant="destructive"
            >
              <button
                className="w-full"
                id={`open-delete-team-${team.id}-dialog`}
                onClick={() => setDeleteOpen(true)}
                type="button"
              >
                {t(($) => $.delete)}
              </button>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

//#region EmptyFiller
function EmptyFiller() {
  // i18n
  const { t } = useTranslation()

  // App context
  const { setAddTeamOpen: setOpen } = useContext(AppContext)

  return (
    <Empty className="rounded-md border border-solid">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <UserStar />
        </EmptyMedia>

        <EmptyTitle>{t(($) => $.teams.emptyTitle)}</EmptyTitle>

        <EmptyDescription>
          <p>{t(($) => $.teams.emptyDesc1)}</p>
          <p>{t(($) => $.teams.emptyDesc2)}</p>
        </EmptyDescription>
      </EmptyHeader>

      <EmptyContent>
        <Button onClick={() => setOpen(true)}>
          {t(($) => $.teams.createTeam)}
        </Button>
      </EmptyContent>
    </Empty>
  )
}

//#region TeamsTable
export function TeamsTable({
  teams,
  view,
  viewStore
}: {
  teams: TeamsTableEntry[]
  view?: View
  viewStore?: ViewStore
}) {
  // i18n
  const { t } = useTranslation()

  const { user } = usePage().props.auth

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
    data: teams,
    view,
    viewStore
  })

  // Watch for data revalidation
  useEffect(() => {
    setData(() => teams)
  }, [setData, teams])

  const labels = useMemo<Record<string, string>>(
    () => ({
      profiles_count: t(($) => $.member, { count: 2 }),
      projectsCount: t(($) => $.project, { count: 2 })
    }),
    [t]
  )

  const columns = useMemo<ColumnDef<TeamsTableEntry>[]>(
    () => [
      {
        cell: ({ row }) => (
          <CurrentTeamCell
            currentTeamId={user?.current_team_id}
            team={row.original}
          />
        ),
        enableHiding: false,
        header: () => null,
        id: 'current'
      },
      {
        accessorKey: 'name',
        cell: ({ row }) => (
          <NameCell
            href={show(row.original.id)}
            name={row.original.name}
          />
        ),
        enableHiding: false,
        header: t(($) => $.name)
      },
      {
        accessorKey: 'profiles_count',
        header: ({ column }) => (
          <SortableColumnHeader
            column={column}
            title={t(($) => $.member, { count: 2 })}
          />
        )
      },
      {
        accessorKey: 'projects_count',
        header: ({ column }) => (
          <SortableColumnHeader
            column={column}
            title={t(($) => $.project, { count: 2 })}
          />
        )
      },
      {
        cell: ({ row }) => (
          <Actions
            team={row.original}
            // userId={userId}
          />
        ),
        id: 'actions'
      }
    ],
    [t, user?.current_team_id]
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
      <AddTeamDrawer />

      <UpdateTeamDrawer />

      {teams.length > 0 ? (
        <>
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

              <AddTeamDrawerTrigger />
            </div>
          </div>

          <TableMain table={table} />

          <AfterTable
            selection={false}
            sortingLabels={labels}
            sortingState={sorting}
            table={table}
          />
        </>
      ) : (
        <EmptyFiller />
      )}
    </section>
  )
}
