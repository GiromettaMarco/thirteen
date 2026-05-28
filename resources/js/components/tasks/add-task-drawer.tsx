import {
  Form,
  NullableSelectField,
  SelectField,
  TextareaField,
  TextField,
  type SelectOption
} from '@/components/form'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from '@/components/ui/drawer'
import { Submit } from '@/components/ui/submit'
import { AppContext } from '@/providers/app-context-provider'
import { store } from '@/routes/tasks'
import { createTaskSchema } from '@/schemas/tasks'
import type { Profile } from '@/types'
import { Plus } from 'lucide-react'
import { useContext, useMemo, type ComponentProps } from 'react'
import { useTranslation } from 'react-i18next'

export function AddTaskDrawerTrigger(props: ComponentProps<typeof Button>) {
  // i18n
  const { t } = useTranslation()

  // App context
  const { setAddTaskOpen: setOpen } = useContext(AppContext)

  return (
    <Button
      onClick={() => setOpen(true)}
      size="sm"
      {...props}
    >
      {t(($) => $.add)}
      <Plus />
    </Button>
  )
}

export function AddTaskDrawer({
  projectId,
  teamId,
  teamMembers
}: {
  projectId: number
  teamId: number
  teamMembers?: Profile[]
}) {
  // i18n
  const { t } = useTranslation()

  // App context
  const { addTaskOpen: open, setAddTaskOpen: setOpen } = useContext(AppContext)

  const labelOptions = useMemo<SelectOption[]>(
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

  const priorityOptions = useMemo<SelectOption[]>(
    () => [
      { key: 1, label: t(($) => $.tasks.priorities.low), value: 'low' },
      { key: 2, label: t(($) => $.tasks.priorities.medium), value: 'medium' },
      { key: 3, label: t(($) => $.tasks.priorities.high), value: 'high' }
    ],
    [t]
  )

  const statusOptions = useMemo<SelectOption[]>(
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

  const assignedToOptions = useMemo<SelectOption[]>(
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
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{t(($) => $.tasks.newTask)}</DrawerTitle>
          <DrawerDescription>
            {t(($) => $.tasks.createInstructions)}
          </DrawerDescription>
        </DrawerHeader>

        <Form
          className="h-full overflow-y-auto"
          defaults={{
            description: '',
            label: '',
            name: t(($) => $.tasks.defaultName),
            priority: 'medium',
            profile_id: '',
            status: 'todo'
          }}
          onSuccess={() => setOpen(false)}
          route={store({ project: projectId, team: teamId })}
          schema={createTaskSchema}
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
                  placeholder={t(($) => $.tasks.selectLabel)}
                  setValue={form.setValue}
                  options={labelOptions}
                />

                <div className="grid grid-cols-2 gap-4">
                  <SelectField
                    control={form.control}
                    inputId="task-priority"
                    inputName="priority"
                    label={t(($) => $.tasks.priority)}
                    placeholder={t(($) => $.tasks.selectPriority)}
                    options={priorityOptions}
                  />

                  <SelectField
                    control={form.control}
                    inputId="task-status"
                    inputName="status"
                    label={t(($) => $.tasks.status)}
                    placeholder={t(($) => $.tasks.selectStatus)}
                    options={statusOptions}
                  />
                </div>

                <NullableSelectField
                  control={form.control}
                  inputId="task-profile"
                  inputName="profile_id"
                  label={t(($) => $.tasks.assignedTo)}
                  placeholder={t(($) => $.tasks.assignToMember)}
                  setValue={form.setValue}
                  options={assignedToOptions}
                />
              </div>

              <DrawerFooter>
                <Submit
                  label={t(($) => $.submit)}
                  loading={loading}
                />

                <DrawerClose asChild>
                  <Button variant="outline">{t(($) => $.close)}</Button>
                </DrawerClose>
              </DrawerFooter>
            </>
          )}
        </Form>
      </DrawerContent>
    </Drawer>
  )
}
