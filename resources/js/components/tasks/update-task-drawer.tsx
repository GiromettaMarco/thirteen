import {
  Form,
  NullableSelectField,
  SelectField,
  Submit,
  TextareaField,
  TextField,
  type Option
} from '@gmcode/forms'
import { Button } from '@gmcode/react-ui'
import { useContext, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from '@/components/ui/drawer'
import { UpdateDrawerTrigger } from '@/components/update-drawer-trigger'
import { AppContext } from '@/providers/app-context-provider'
import { update } from '@/routes/tasks'
import { updateTaskSchema } from '@/schemas/tasks'
import type { Profile, Task } from '@/types'

export function UpdateTaskDrawer({
  task: singleResource,
  teamId,
  teamMembers
}: {
  task?: Task
  teamId: number
  teamMembers?: Profile[]
}) {
  // i18n
  const { t } = useTranslation()

  // App context
  const {
    activeTask: task,
    setActiveTask: setActive,
    setUpdateTaskOpen: setOpen,
    updateTaskOpen: open
  } = useContext(AppContext)

  // Revert tanstack table "none" fix
  const fixedTask: Task | undefined = task
    ? {
        ...task,
        label: task?.label === 'none' ? null : task?.label
      }
    : undefined

  const labelOptions = useMemo<Option[]>(
    () => [
      { key: 1, label: t(($) => $.tasks.labels.bug), value: 'bug' },
      {
        key: 2,
        label: t(($) => $.tasks.labels.documentation),
        value: 'documentation'
      },
      { key: 3, label: t(($) => $.tasks.labels.feature), value: 'feature' }
    ],
    [t]
  )

  const priorityOptions = useMemo<Option[]>(
    () => [
      { key: 1, label: t(($) => $.tasks.priorities.low), value: 'low' },
      { key: 2, label: t(($) => $.tasks.priorities.medium), value: 'medium' },
      { key: 3, label: t(($) => $.tasks.priorities.high), value: 'high' }
    ],
    [t]
  )

  const statusOptions = useMemo<Option[]>(
    () => [
      { key: 1, label: t(($) => $.tasks.statuses.todo), value: 'todo' },
      {
        key: 2,
        label: t(($) => $.tasks.statuses.inProgress),
        value: 'in_progress'
      },
      { key: 3, label: t(($) => $.tasks.statuses.done), value: 'done' },
      { key: 4, label: t(($) => $.tasks.statuses.canceled), value: 'canceled' },
      { key: 5, label: t(($) => $.tasks.statuses.backlog), value: 'backlog' }
    ],
    [t]
  )

  const assignedToOptions = useMemo<Option[]>(
    () =>
      teamMembers
        ? teamMembers.map((profile) => ({
            key: profile.id,
            label: `${profile.name} (${profile.role})`,
            value: profile.id.toString()
          }))
        : [],
    [teamMembers]
  )

  return (
    <Drawer
      onOpenChange={setOpen}
      open={open}
    >
      {singleResource && (
        <UpdateDrawerTrigger onClick={() => setActive(singleResource)} />
      )}

      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{fixedTask?.name}</DrawerTitle>
        </DrawerHeader>

        {fixedTask && (
          <Form
            className="h-full overflow-y-auto"
            defaults={{
              description: fixedTask.description ?? '',
              label: fixedTask.label ?? '',
              name: fixedTask.name,
              priority: fixedTask.priority ?? '',
              profile_id: fixedTask.profile_id?.toString() ?? '',
              status: fixedTask.status ?? ''
            }}
            id="update-task-form"
            onSuccess={() => setOpen(false)}
            route={update({
              project: fixedTask.project_id,
              task: fixedTask.id,
              team: teamId
            })}
            schema={updateTaskSchema}
            setDefaultsOnSuccess={true}
          >
            {({ form, loading }) => (
              <>
                <div className="flex flex-col gap-6 px-4">
                  <TextField
                    control={form.control}
                    inputId="task-name"
                    inputName="name"
                    label={t(($) => $.name)}
                    placeholder={t(($) => $.tasks.namePlaceholder)}
                  />

                  <TextareaField
                    control={form.control}
                    inputId="task-description"
                    inputName="description"
                    label={t(($) => $.description)}
                    placeholder={t(($) => $.tasks.descriptionPlaceholder)}
                  />

                  <NullableSelectField
                    control={form.control}
                    inputId="task-label"
                    inputName="label"
                    label={t(($) => $.tasks.label)}
                    options={labelOptions}
                    placeholder={t(($) => $.tasks.selectLabel)}
                    setValue={form.setValue}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <SelectField
                      control={form.control}
                      inputId="task-priority"
                      inputName="priority"
                      label={t(($) => $.tasks.priority)}
                      options={priorityOptions}
                      placeholder={t(($) => $.tasks.selectPriority)}
                    />

                    <SelectField
                      control={form.control}
                      inputId="task-status"
                      inputName="status"
                      label={t(($) => $.tasks.status)}
                      options={statusOptions}
                      placeholder={t(($) => $.tasks.selectStatus)}
                    />
                  </div>

                  <NullableSelectField
                    control={form.control}
                    inputId="task-profile"
                    inputName="profile_id"
                    label={t(($) => $.tasks.assignedTo)}
                    options={assignedToOptions}
                    placeholder={t(($) => $.tasks.assignToMember)}
                    setValue={form.setValue}
                  />
                </div>

                <DrawerFooter>
                  <Submit loading={loading} />

                  <DrawerClose asChild>
                    <Button variant="outline">
                      {t(($) => $.actions.close)}
                    </Button>
                  </DrawerClose>
                </DrawerFooter>
              </>
            )}
          </Form>
        )}
      </DrawerContent>
    </Drawer>
  )
}
