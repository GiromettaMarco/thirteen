import { CalendarFieldI18n } from '@/components/calendar-field-i18n'
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
import { store } from '@/routes/projects'
import { createProjectSchema } from '@/schemas/projects'
import { Form, TextareaField, TextField } from '@gmcode/forms'
import { Plus } from 'lucide-react'
import { useContext, type ComponentProps } from 'react'
import { useTranslation } from 'react-i18next'

export function AddProjectDrawerTrigger(props: ComponentProps<typeof Button>) {
  // i18n
  const { t } = useTranslation()

  // App context
  const { setAddProjectOpen: setOpen } = useContext(AppContext)

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
