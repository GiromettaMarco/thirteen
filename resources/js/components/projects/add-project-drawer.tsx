import { Form, Submit, TextareaField, TextField } from '@gmcode/forms'
import { Button } from '@gmcode/react-ui'
import { Plus } from 'lucide-react'
import { useContext, type ComponentProps } from 'react'
import { useTranslation } from 'react-i18next'
import { CalendarFieldI18n } from '@/components/calendar-field-i18n'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from '@/components/ui/drawer'
import { AppContext } from '@/providers/app-context-provider'
import { store } from '@/routes/projects'
import { createProjectSchema } from '@/schemas/projects'

export function AddProjectDrawerTrigger(props: ComponentProps<typeof Button>) {
  // i18n
  const { t } = useTranslation()

  // App context
  const { setAddProjectOpen: setOpen } = useContext(AppContext)

  return (
    <Button
      id="open-create-project-drawer"
      onClick={() => setOpen(true)}
      size="sm"
      {...props}
    >
      {t(($) => $.actions.add)}
      <Plus />
    </Button>
  )
}

export function AddProjectDrawer({ teamId }: { teamId: number }) {
  // i18n
  const { t } = useTranslation()

  // App context
  const { addProjectOpen: open, setAddProjectOpen: setOpen } =
    useContext(AppContext)

  return (
    <Drawer
      onOpenChange={setOpen}
      open={open}
    >
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{t(($) => $.projects.newProject)}</DrawerTitle>
          <DrawerDescription>
            {t(($) => $.projects.createInstructions)}
          </DrawerDescription>
        </DrawerHeader>

        <Form
          className="h-full overflow-y-auto"
          defaults={{
            deadline: '',
            description: '',
            name: t(($) => $.projects.defaultName)
          }}
          id="create-project-form"
          onSuccess={() => setOpen(false)}
          route={store({ team: teamId })}
          schema={createProjectSchema}
        >
          {({ form, loading }) => (
            <>
              <div className="flex flex-col gap-6 px-4">
                <TextField
                  control={form.control}
                  inputId="project-name"
                  inputName="name"
                  label={t(($) => $.name)}
                  placeholder={t(($) => $.projects.namePlaceholder)}
                />

                <TextareaField
                  control={form.control}
                  inputId="project-description"
                  inputName="description"
                  label={t(($) => $.description)}
                  placeholder={t(($) => $.projects.descriptionPlaceholder)}
                />

                <CalendarFieldI18n
                  control={form.control}
                  inputId="project-deadline"
                  inputName="deadline"
                  label={t(($) => $.projects.deadline)}
                />
              </div>

              <DrawerFooter>
                <Submit loading={loading} />

                <DrawerClose asChild>
                  <Button variant="outline">{t(($) => $.actions.close)}</Button>
                </DrawerClose>
              </DrawerFooter>
            </>
          )}
        </Form>
      </DrawerContent>
    </Drawer>
  )
}
