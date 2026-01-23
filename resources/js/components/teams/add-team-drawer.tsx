import { Form, TextField } from '@/components/form'
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
import { store } from '@/routes/teams'
import { createTeamSchema } from '@/schemas/teams'
import { Plus } from 'lucide-react'
import { useContext, type ComponentProps } from 'react'
import { useTranslation } from 'react-i18next'

export function AddTeamDrawerTrigger(props: ComponentProps<typeof Button>) {
  // i18n
  const { t } = useTranslation()

  // App context
  const { setAddTeamOpen: setOpen } = useContext(AppContext)

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

export function AddTeamDrawer() {
  // i18n
  const { t } = useTranslation()

  // App context
  const { addTeamOpen: open, setAddTeamOpen: setOpen } = useContext(AppContext)

  return (
    <Drawer
      onOpenChange={setOpen}
      open={open}
    >
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{t(($) => $.teams.createTitle)}</DrawerTitle>
          <DrawerDescription>{t(($) => $.teams.createDesc)}</DrawerDescription>
        </DrawerHeader>

        <Form
          className="h-full"
          defaults={{
            name: t(($) => $.teams.defaultName)
          }}
          onSuccess={() => setOpen(false)}
          route={store()}
          schema={createTeamSchema}
        >
          {({ form, loading }) => (
            <>
              <div className="flex flex-col gap-6 overflow-y-auto px-4">
                <TextField
                  control={form.control}
                  inputId="name"
                  inputName="name"
                  label={t(($) => $.name)}
                  placeholder={t(($) => $.teams.namePlaceholder)}
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
