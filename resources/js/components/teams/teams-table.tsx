import { Button } from '@gmcode/react-ui'
import { useForm, usePage } from '@inertiajs/react'
import { Star, UserStar } from 'lucide-react'
import { useContext, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ActionsMenu, type ActionProps } from '@/components/actions-menu'
import { CellAction } from '@/components/data-table/components/cell-action'
import { ColumnHeader } from '@/components/data-table/components/column-header'
import { DataTable } from '@/components/data-table/data-table'
import { createColumnHelper } from '@/components/data-table/utility'
import {
  AddTeamDrawer,
  AddTeamDrawerTrigger
} from '@/components/teams/add-team-drawer'
import { LeaveTeamDialog } from '@/components/teams/members/destroy-member-dialog'
import UpdateTeamDrawer from '@/components/teams/update-team-drawer'
import { DestroyDialog } from '@/components/ui/destroy-dialog'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle
} from '@/components/ui/empty'
import { AppContext } from '@/providers/app-context-provider'
import { update } from '@/routes/current-team'
import { destroy, show } from '@/routes/teams'
import type { Team, TeamsTableEntry, WithTeamPermissions } from '@/types'

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

  const { submit } = useForm({ id: team.id })

  function setCurrentTeam() {
    if (currentTeamId != team.id) {
      submit(update())
    }
  }

  return (
    <button
      className="flex justify-center"
      data-action="set-current-team"
      data-team-id={team.id}
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
function Actions({ team }: { team: Team & WithTeamPermissions }) {
  // i18n
  const { t } = useTranslation()

  // Global state
  const { setActiveTeam, setUpdateTeamOpen } = useContext(AppContext)

  // Dialogs state
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [leaveOpen, setLeaveOpen] = useState(false)

  // Current team form
  const { submit: updateCurrentTeam } = useForm({ id: team.id })

  const mainActions: ActionProps[] = [
    {
      label: t(($) => $.actions.select),
      name: 'select',
      onClick: () => updateCurrentTeam(update())
    }
  ]

  const secondaryActions: ActionProps[] = [
    {
      label: t(($) => $.actions.leave),
      name: 'open-leave-dialog',
      onClick: () => setLeaveOpen(true),
      variant: 'destructive'
    }
  ]

  if (team.pivot.can_edit_team) {
    mainActions.push({
      label: t(($) => $.actions.edit),
      name: 'open-update-drawer',
      onClick: () => {
        setActiveTeam(team)
        setUpdateTeamOpen(true)
      }
    })
  }

  if (team.pivot.can_delete_team) {
    secondaryActions.push({
      label: t(($) => $.actions.delete),
      name: 'open-delete-dialog',
      onClick: () => setDeleteOpen(true),
      variant: 'destructive'
    })
  }

  return (
    <>
      <LeaveTeamDialog
        open={leaveOpen}
        setOpen={setLeaveOpen}
        team={team}
      />
      {team.pivot.can_delete_team && (
        <DestroyDialog
          description={t(($) => $.dialogs.deleteTeam.description, {
            team: team.name
          })}
          open={deleteOpen}
          route={destroy(team.id)}
          setOpen={setDeleteOpen}
          title={t(($) => $.dialogs.deleteTeam.title)}
          warning={t(($) => $.dialogs.deleteTeam.warn)}
        />
      )}
      <ActionsMenu
        actions={mainActions}
        secondary={secondaryActions}
      />
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
    <Empty
      className="rounded-md border border-solid"
      id="teams-table-filler"
    >
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <UserStar />
        </EmptyMedia>

        <EmptyTitle>{t(($) => $.teams.empty.title)}</EmptyTitle>

        <EmptyDescription>
          <p>{t(($) => $.teams.empty.line1)}</p>
          <p>{t(($) => $.teams.empty.line2)}</p>
        </EmptyDescription>
      </EmptyHeader>

      <EmptyContent>
        <Button
          id="open-create-team-drawer"
          onClick={() => setOpen(true)}
        >
          {t(($) => $.teams.createTeam)}
        </Button>
      </EmptyContent>
    </Empty>
  )
}

//#region TeamsTable
export function TeamsTable({
  id = 'teams-table',
  storage,
  teams,
  title
}: {
  id?: string
  storage?: string
  teams: TeamsTableEntry[]
  title?: string
}) {
  // i18n
  const { t } = useTranslation()

  const { user } = usePage().props.auth

  const columnHelper = createColumnHelper<TeamsTableEntry>()

  const columns = useMemo(
    () =>
      columnHelper.columns([
        columnHelper.display({
          cell: ({ row }) => (
            <CurrentTeamCell
              currentTeamId={user?.current_team_id}
              team={row.original}
            />
          ),
          enableHiding: false,
          id: 'current'
        }),
        columnHelper.accessor('name', {
          cell: ({ cell, row }) => (
            <CellAction
              href={show(row.original.id)}
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
        columnHelper.accessor('profiles_count', {
          header: ({ column }) => (
            <ColumnHeader
              column={column}
              sorting
            />
          ),
          meta: { label: t(($) => $.member, { count: 2 }) }
        }),
        columnHelper.accessor('projects_count', {
          header: ({ column }) => (
            <ColumnHeader
              column={column}
              sorting
            />
          ),
          meta: { label: t(($) => $.project, { count: 2 }) }
        }),
        columnHelper.display({
          cell: ({ row }) => <Actions team={row.original} />,
          enableHiding: false,
          id: 'actions'
        })
      ]),
    [columnHelper, t, user?.current_team_id]
  )

  return (
    <section className="grid gap-3">
      <AddTeamDrawer />
      <UpdateTeamDrawer />

      {teams.length > 0 ? (
        <DataTable
          actions={() => <AddTeamDrawerTrigger />}
          columns={columns}
          data={teams}
          id={id}
          storage={storage}
          title={title}
        />
      ) : (
        <EmptyFiller />
      )}
    </section>
  )
}
