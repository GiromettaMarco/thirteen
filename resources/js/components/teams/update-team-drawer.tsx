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
import { UpdateDrawerTrigger } from '@/components/update-drawer-trigger'
import { AppContext } from '@/providers/app-context-provider'
import { update } from '@/routes/teams'
import { updateTeamSchema } from '@/schemas/teams'
import type { Team } from '@/types'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'

export default function UpdateTeamDrawer({
  team: singleResource
}: {
  team?: Team
}) {
  // i18n
  const { t } = useTranslation()

  // App context
  const {
    activeTeam: team,
    setActiveTeam: setActive,
    setUpdateTeamOpen: setOpen,
    updateTeamOpen: open
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
          <DrawerTitle>{team?.name}</DrawerTitle>
          <DrawerDescription>{t(($) => $.teams.updateDesc)}</DrawerDescription>
        </DrawerHeader>

        {team && (
          <Form
            className="h-full"
            defaults={{
              name: team.name
            }}
            onSuccess={() => setOpen(false)}
            route={update(team.id)}
            schema={updateTeamSchema}
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
        )}
      </DrawerContent>
    </Drawer>
  )
}
