import { Button } from '@gmcode/react-ui'
import { Folder } from 'lucide-react'
import { useContext, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ActionsMenu, type ActionProps } from '@/components/actions-menu'
import { CellAction } from '@/components/data-table/components/cell-action'
import { ColumnHeader } from '@/components/data-table/components/column-header'
import {
  SelectionHeader,
  SelectionRow
} from '@/components/data-table/components/selection'
import { DataTable } from '@/components/data-table/data-table'
import { createColumnHelper } from '@/components/data-table/utility'
import {
  AddProjectDrawer,
  AddProjectDrawerTrigger
} from '@/components/projects/add-project-drawer'
import { ProjectDeadline } from '@/components/projects/project-deadline'
import { UpdateProjectDrawer } from '@/components/projects/update-project-drawer'
import { DestroyDialog } from '@/components/ui/destroy-dialog'
import { DestroyMany } from '@/components/ui/destroy-many'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle
} from '@/components/ui/empty'
import { format } from '@/lib/utils'
import { AppContext } from '@/providers/app-context-provider'
import { destroy, destroyMany, show } from '@/routes/projects'
import type { Project, ProjectWithTasksCount } from '@/types'

//#region Actions
export function Actions({
  canEdit = false,
  project
}: {
  canEdit?: boolean
  project: Project
}) {
  // i18n
  const { t } = useTranslation()

  // Global state
  const { setActiveProject, setUpdateProjectOpen } = useContext(AppContext)

  // Delete dialog state
  const [deleteOpen, setDeleteOpen] = useState(false)

  if (!canEdit) {
    return <div className="min-h-8" />
  }

  const mainActions: ActionProps[] = [
    {
      label: t(($) => $.actions.edit),
      name: 'open-update-drawer',
      onClick: () => {
        setActiveProject(project)
        setUpdateProjectOpen(true)
      }
    }
  ]

  const secondaryActions: ActionProps[] = [
    {
      label: t(($) => $.actions.delete),
      name: 'open-delete-dialog',
      onClick: () => setDeleteOpen(true),
      variant: 'destructive'
    }
  ]

  return (
    <>
      <DestroyDialog
        description={t(($) => $.dialogs.deleteProject.description, {
          project: project.name
        })}
        open={deleteOpen}
        route={destroy({ project, team: project.team_id })}
        setOpen={setDeleteOpen}
        title={t(($) => $.dialogs.deleteProject.title)}
        warning={t(($) => $.dialogs.deleteProject.warn)}
      />
      <ActionsMenu
        actions={mainActions}
        secondary={secondaryActions}
      />
    </>
  )
}

//#region EmptyFiller
function EmptyFiller({ canCreate = false }: { canCreate?: boolean }) {
  // i18n
  const { t } = useTranslation()

  // App context
  const { setAddProjectOpen: setOpen } = useContext(AppContext)

  return (
    <Empty
      className="rounded-md border border-solid"
      id="projects-table-filler"
    >
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Folder />
        </EmptyMedia>

        <EmptyTitle>{t(($) => $.projects.emptyTable.title)}</EmptyTitle>

        <EmptyDescription>
          <p>{t(($) => $.projects.emptyTable.line1)}</p>
          {canCreate && <p>{t(($) => $.projects.emptyTable.line2)}</p>}
        </EmptyDescription>
      </EmptyHeader>

      {canCreate && (
        <EmptyContent>
          <Button
            id="open-create-project-drawer"
            onClick={() => setOpen(true)}
          >
            {t(($) => $.projects.createProject)}
          </Button>
        </EmptyContent>
      )}
    </Empty>
  )
}

//#region ProjectsTable
export function ProjectsTable({
  canEdit = false,
  id = 'project-table',
  projects,
  storage,
  teamId,
  title
}: {
  canEdit?: boolean
  id?: string
  projects: ProjectWithTasksCount[]
  storage?: string
  teamId: number
  title?: string
}) {
  // i18n
  const { i18n, t } = useTranslation()

  const columnHelper = createColumnHelper<ProjectWithTasksCount>()

  const columns = useMemo(
    () =>
      columnHelper.columns([
        ...(canEdit
          ? [
              columnHelper.display({
                cell: ({ row }) => <SelectionRow row={row} />,
                enableHiding: false,
                header: ({ table }) => <SelectionHeader table={table} />,
                id: 'select'
              })
            ]
          : []),
        columnHelper.accessor('name', {
          cell: ({ cell, row }) => (
            <CellAction
              href={show({ project: row.original.id, team: teamId })}
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
        columnHelper.accessor('created_at', {
          cell: ({ cell }) => format(cell.getValue(), i18n.language, 'Pp'),
          header: ({ column }) => (
            <ColumnHeader
              column={column}
              sorting
            />
          ),
          meta: { label: t(($) => $.dateCreated) },
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
          meta: { label: t(($) => $.dateModified) },
          sortFn: 'datetime'
        }),
        columnHelper.accessor('deadline', {
          cell: ({ cell }) => <ProjectDeadline deadline={cell.getValue()} />,
          header: ({ column }) => (
            <ColumnHeader
              column={column}
              sorting
            />
          ),
          meta: { label: t(($) => $.projects.deadline) },
          sortFn: 'datetime'
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
        columnHelper.display({
          cell: ({ row }) => (
            <Actions
              canEdit={canEdit}
              project={row.original}
            />
          ),
          enableHiding: false,
          id: 'actions'
        })
      ]),
    [canEdit, columnHelper, i18n.language, t, teamId]
  )

  return (
    <section className="grid gap-3">
      {canEdit && (
        <>
          <AddProjectDrawer teamId={teamId} />
          <UpdateProjectDrawer />
        </>
      )}

      {projects.length > 0 ? (
        <DataTable
          actions={(table) =>
            canEdit && (
              <>
                <AddProjectDrawerTrigger />
                <DestroyMany
                  route={destroyMany({ team: teamId })}
                  table={table}
                  title={t(($) => $.projects.deleteManyDialog.title)}
                />
              </>
            )
          }
          columns={columns}
          data={projects}
          id={id}
          macros={{
            selectionMonitor: canEdit
          }}
          storage={storage}
          title={title}
        />
      ) : (
        <EmptyFiller canCreate={canEdit} />
      )}
    </section>
  )
}
