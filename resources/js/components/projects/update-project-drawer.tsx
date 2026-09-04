import { Form, Submit, TextareaField, TextField } from '@gmcode/forms'
import { Button } from '@gmcode/react-ui'
import { useContext } from 'react'
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
import { UpdateDrawerTrigger } from '@/components/update-drawer-trigger'
import { AppContext } from '@/providers/app-context-provider'
import { update } from '@/routes/projects'
import { updateProjectSchema } from '@/schemas/projects'
import type { Project } from '@/types'

export function UpdateProjectDrawer({
  project: singleResource
}: {
  project?: Project
}) {
  // i18n
  const { t } = useTranslation()

  // App context
  const {
    activeProject: project,
    setActiveProject: setActive,
    setUpdateProjectOpen: setOpen,
    updateProjectOpen: open
  } = useContext(AppContext)

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
          <DrawerTitle>{project?.name}</DrawerTitle>
          <DrawerDescription>
            {t(($) => $.projects.chartText)}
          </DrawerDescription>
        </DrawerHeader>

        {project && (
          <Form
            className="h-full overflow-y-auto"
            defaults={{
              deadline: project.deadline ?? '',
              description: project.description ?? '',
              name: project.name
            }}
            onSuccess={() => setOpen(false)}
            route={update({
              project: project.id,
              team: project.team_id
            })}
            schema={updateProjectSchema}
            setDefaultsOnSuccess={true}
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
