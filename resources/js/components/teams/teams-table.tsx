import { Form } from '@/components/form'
import {
  AddTeamDrawer,
  AddTeamDrawerTrigger
} from '@/components/teams/add-team-drawer'
import UpdateTeamDrawer from '@/components/teams/update-team-drawer'
import { Button } from '@/components/ui/button'
import TableMain, {
  AfterTable,
  ColumnsVisibility,
  SortableColumnHeader,
  TableToolbar
} from '@/components/ui/data-table'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle
} from '@/components/ui/dialog'
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
import { Submit } from '@/components/ui/submit'
import UseTableStates from '@/hooks/use-table-states'
import { Schema } from '@/lib/tsv/schema'
import { AppContext } from '@/providers/app-context-provider'
import { update } from '@/routes/current-team'
import { destroy, show } from '@/routes/teams'
import type { Team, WithTeamPermissions } from '@/types'
import { Link, useForm, usePage } from '@inertiajs/react'
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
import { EllipsisVertical, Star, UserStar } from 'lucide-react'
import { useContext, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

//#region TeamsTableCurrent
function TeamsTableCurrent({
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
      data-test={`set-current-team-${team.id}`}
      onClick={setCurrentTeam}
      type="button"
    >
      <Star
        className="hover:text-brand size-4"
        fill={team.id === currentTeamId ? 'currentColor' : 'none'}
      />
      <span className="sr-only">
        {t(($) => $.teams.setCurrent, { team: team.name })}
      </span>
    </button>
  )
}
//#endregion

//#region TeamsTableActions
const deleteSchema = new Schema({})

function TeamsTableActions({
  // userId,
  team
}: {
  // userId?: number
  team: Team & WithTeamPermissions
}) {
  // i18n
  const { t } = useTranslation()

  // Global state
  const { setUpdateTeamOpen, setActiveTeam } = useContext(AppContext)

  // Delete dialog state
  const [deleteOpen, setDeleteOpen] = useState(false)

  // Current team form
  const currentTeamForm = useForm({
    id: team.id
  })

  // ======================================================================
  // REMOVE TEAM MEMBER (leave team)
  // ======================================================================

  // /** Fetcher for remove user action */
  // const { fetcher: removeFetcher } = useAutoFetcher<typeof removeAction>()

  // // Remove api
  // function removeMember() {
  //   if (userId) {
  //     removeFetcher.submit(
  //       {},
  //       {
  //         action: route('members.destroy', { member: userId, team }),
  //         method: 'DELETE'
  //       }
  //     )
  //   }
  // }

  return (
    <>
      <Dialog
        onOpenChange={(open) => setDeleteOpen(open)}
        open={deleteOpen}
      >
        <DialogContent
          onOpenAutoFocus={(event) => (event.target as HTMLElement).blur()}
        >
          <DialogTitle>{t(($) => $.teams.deleteTitle)}</DialogTitle>

          <DialogDescription>
            {t(($) => $.teams.deleteDesc1, { team: team.name })}
            <br />
            {t(($) => $.teams.deleteDesc2)}
          </DialogDescription>

          <Form
            onSuccess={() => setDeleteOpen(false)}
            route={destroy(team.id)}
            schema={deleteSchema}
          >
            {({ loading }) => (
              <>
                <DialogFooter className="items-center">
                  <DialogClose asChild>
                    <Button variant="secondary">{t(($) => $.cancel)}</Button>
                  </DialogClose>

                  <Submit
                    label={t(($) => $.delete)}
                    loading={loading}
                    variant="destructive"
                  />
                </DialogFooter>
              </>
            )}
          </Form>
        </DialogContent>
      </Dialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
            data-test={`team-${team.id}-actions`}
            size="icon"
            variant="ghost"
          >
            <EllipsisVertical />
            <span className="sr-only">
              {t(($) => $.teams.actions, { team: team.name })}
            </span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-32"
        >
          <DropdownMenuItem onClick={() => currentTeamForm.submit(update())}>
            {t(($) => $.select)}
          </DropdownMenuItem>

          {team.pivot.can_edit && (
            <DropdownMenuItem
              onClick={() => {
                setActiveTeam(team)
                setUpdateTeamOpen(true)
              }}
            >
              {t(($) => $.edit)}
            </DropdownMenuItem>
          )}

          {team.pivot.can_delete && (
            <>
              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => setDeleteOpen(true)}
                variant="destructive"
              >
                {t(($) => $.delete)}
              </DropdownMenuItem>
            </>
          )}

          {/* {userId && (
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={removeMember}
            variant="destructive"
          >
            {t('teams.leave')}
          </DropdownMenuItem>
        )}*/}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
//#endregion

//#region TeamsTableEmpty
function TeamsTableEmpty() {
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
//#endregion

//#region TeamsTable
type TeamRow = Team & WithTeamPermissions & { profiles_count: number }

export function TeamsTable({
  teams
  // view
}: {
  teams: TeamRow[]
  // view?: View
}) {
  // i18n
  const { t } = useTranslation()

  const { user } = usePage().props.auth

  // /**
  //  * Update user's "teams view" action path.
  //  */
  // const action = useMemo(
  //   () => route('users.update-teams-view', { user: userId }),
  //   [userId]
  // )

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
    // action,
    data: teams
    // submit: updateViewFetcher.submit,
    // view
  })

  // Watch for data revalidation
  useEffect(() => {
    setData(() => teams)
  }, [setData, teams])

  const labels = useMemo<Record<string, string>>(
    () => ({
      users_count: t(($) => $.user, { count: 2 })
      // projectsCount: t(($) => $.project, { count: 2 })
    }),
    [t]
  )

  const columns = useMemo<ColumnDef<TeamRow>[]>(
    () => [
      {
        id: 'current',
        header: () => null,
        cell: ({ row }) => (
          <TeamsTableCurrent
            currentTeamId={user?.current_team_id}
            team={row.original}
          />
        ),
        enableHiding: false
      },

      {
        accessorKey: 'name',
        header: t(($) => $.name),
        cell: ({ row }) => (
          <Button
            asChild
            variant="link"
            className="text-foreground w-fit px-0 text-left"
          >
            <Link href={show(row.original.id)}>{row.original.name}</Link>
          </Button>
        ),
        enableHiding: false
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

      // {
      //   accessorKey: 'projectsCount',
      //   header: ({ column }) => (
      //     <SortableColumnHeader
      //       column={column}
      //       title={t(($) => $.project, { count: 2 })}
      //     />
      //   )
      // }

      {
        id: 'actions',
        cell: ({ row }) => (
          <TeamsTableActions
            team={row.original}
            // userId={userId}
          />
        )
      }
    ],
    [t, user?.current_team_id]
  )

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      columnFilters,
      pagination
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: false,
    onSortingChange,
    onColumnFiltersChange,
    onColumnVisibilityChange,
    onPaginationChange,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues()
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
                table={table}
                labels={labels}
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
        <TeamsTableEmpty />
      )}
    </section>
  )
}
//#endregion
