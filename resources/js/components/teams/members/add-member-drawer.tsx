import {
  CheckboxField,
  ErrorMonitor,
  Form,
  Submit,
  useTsvResolver,
  type InferSchema
} from '@gmcode/forms'
import {
  Button,
  cn,
  Field,
  FieldLabel,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  Spinner
} from '@gmcode/react-ui'
import { Plus, Search, UserPlus } from 'lucide-react'
import { useContext, useState, type ComponentProps } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from '@/components/ui/drawer'
import { UserInfo } from '@/components/ui/user-info'
import { AppContext } from '@/providers/app-context-provider'
import { store } from '@/routes/members'
import { search } from '@/routes/profile'
import { searchProfileSchema } from '@/schemas/misc'
import { addTeamMemberSchema } from '@/schemas/teams'

//#region AddMemberDrawerTrigger
export function AddMemberDrawerTrigger(props: ComponentProps<typeof Button>) {
  // i18n
  const { t } = useTranslation()

  // App context
  const { setAddMemberOpen: setOpen } = useContext(AppContext)

  return (
    <Button
      id="open-add-team-member"
      onClick={() => setOpen(true)}
      size="sm"
      {...props}
    >
      {t(($) => $.add)}
      <Plus />
    </Button>
  )
}

//#region AddProfileList
interface ProfileEntry {
  email: string
  id: number
  name: string
}

function AddProfileList({
  buttonType = 'button',
  className,
  disable = [],
  hide = [],
  invalid = false,
  onChange,
  profiles
}: {
  buttonType?: 'button' | 'submit'
  className?: string
  /** Array of profile ids to show as disabled entries */
  disable?: number[]
  /** Array of profile ids to hide from search results */
  hide?: number[]
  invalid?: boolean
  onChange?: (profile: ProfileEntry) => void
  profiles: ProfileEntry[]
}) {
  const [selected, setSelected] = useState<ProfileEntry | undefined>(undefined)

  function onProfileClick(profileClicked: ProfileEntry) {
    if (selected?.id != profileClicked.id) {
      setSelected(profileClicked)

      if (onChange) {
        onChange(profileClicked)
      }
    }
  }

  return (
    <ul
      className={cn(
        'space-y-0.5 rounded-md py-1',
        { 'border border-destructive': invalid },
        className
      )}
    >
      {profiles.map((profile) => (
        <li
          className={cn({ hidden: hide.includes(profile.id) })}
          key={profile.id}
        >
          <Button
            className={cn(
              'flex h-auto w-full justify-between gap-2 px-2 align-middle',
              {
                'border-l-8 border-brand focus-visible:border-brand':
                  selected?.id === profile.id
              }
            )}
            disabled={disable.includes(profile.id)}
            onClick={() => onProfileClick(profile)}
            type={buttonType}
            variant="ghost"
          >
            <UserInfo
              email={profile.email}
              name={profile.name}
            />

            {!disable.includes(profile.id) && (
              <div className="flex size-8">
                <UserPlus className="m-auto" />
              </div>
            )}
          </Button>
        </li>
      ))}
    </ul>
  )
}

//#region AddMemberDrawer
export function AddMemberDrawer({
  currentProfileId,
  currentProfiles,
  teamId
}: {
  currentProfileId?: number
  /** Ids of profiles currently related to the team */
  currentProfiles: number[]
  teamId: number
}) {
  // i18n
  const { t } = useTranslation()

  // App context
  const { addMemberOpen: open, setAddMemberOpen: setOpen } =
    useContext(AppContext)

  const searchForm = useForm<InferSchema<typeof searchProfileSchema>>({
    defaultValues: { s: '' },
    resolver: useTsvResolver(searchProfileSchema)
  })

  const [isAdmin, setIsAdmin] = useState(false)
  const [searchLoading, setSearchLoading] = useState(false)
  const [profileEntries, setProfileEntries] = useState<ProfileEntry[]>([])

  async function onSearchSubmit(values: { s: string }) {
    setSearchLoading(true)
    await axios
      .get(search.url({ query: { s: values.s } }))
      .then((value) => setProfileEntries(value.data))
      .catch(() => setProfileEntries([]))
      .finally(() => setSearchLoading(false))
  }

  return (
    <Drawer
      onOpenChange={setOpen}
      open={open}
    >
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{t(($) => $.teams.members.add.title)}</DrawerTitle>
          <DrawerDescription>
            {t(($) => $.teams.members.add.description)}
          </DrawerDescription>
        </DrawerHeader>

        <form
          className="flex items-end gap-2 px-4 pb-2"
          id="search-profile-form"
          method="GET"
          onSubmit={searchForm.handleSubmit(onSearchSubmit)}
        >
          <Controller
            control={searchForm.control}
            name="s"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="search-profile">
                  {t(($) => $.search)}
                </FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    id="search-profile"
                    placeholder={t(($) => $.teams.members.add.nameOrEmail)}
                    type="text"
                    {...field}
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      className="disabled:opacity-100"
                      disabled={searchLoading}
                      type="submit"
                    >
                      {searchLoading ? (
                        <Spinner
                          aria-label={t(($) => $.loading)}
                          className="size-3.5"
                        />
                      ) : (
                        <Search aria-label={t(($) => $.search)} />
                      )}
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
                <ErrorMonitor error={fieldState.error} />
              </Field>
            )}
          />
        </form>

        <Form
          className="flex h-full flex-col overflow-y-auto"
          defaults={{
            admin: '',
            can_delete_team: '',
            can_edit_members: '',
            can_edit_projects: '',
            can_edit_team: '',
            profile_id: ''
          }}
          id="add-team-member-form"
          onSuccess={() => setOpen(false)}
          route={store({ team: teamId })}
          schema={addTeamMemberSchema}
        >
          {({ form, loading }) => (
            <>
              <AddProfileList
                className="min-h-15 px-4"
                disable={currentProfiles}
                hide={currentProfileId ? [currentProfileId] : []}
                onChange={(profile) =>
                  form.setValue('profile_id', profile.id.toString())
                }
                profiles={profileEntries}
              />

              <div className="mt-auto flex h-full items-end px-4">
                <div className="space-y-2">
                  <div className="text-sm font-bold">
                    {t(($) => $.teamPermission, { count: 2 })}
                  </div>
                  <CheckboxField
                    control={form.control}
                    inputId="admin"
                    inputName="admin"
                    label={t(($) => $.teamPermissions.admin)}
                    onCheckedChange={(checked) => {
                      setIsAdmin(Boolean(checked))
                      if (checked === true) {
                        form.setValue('can_delete_team', 'true')
                        form.setValue('can_edit_members', 'true')
                        form.setValue('can_edit_projects', 'true')
                        form.setValue('can_edit_team', 'true')
                      }
                    }}
                  />
                  <div className="space-y-2 ps-4">
                    <CheckboxField
                      control={form.control}
                      inputId="can_edit_team"
                      inputName="can_edit_team"
                      label={t(($) => $.teamPermissions.canEditTeam)}
                      readOnly={isAdmin}
                    />
                    <CheckboxField
                      control={form.control}
                      inputId="can_delete_team"
                      inputName="can_delete_team"
                      label={t(($) => $.teamPermissions.canDeleteTeam)}
                      readOnly={isAdmin}
                    />
                    <CheckboxField
                      control={form.control}
                      inputId="can_edit_members"
                      inputName="can_edit_members"
                      label={t(($) => $.teamPermissions.canEditMembers)}
                      readOnly={isAdmin}
                    />
                    <CheckboxField
                      control={form.control}
                      inputId="can_edit_projects"
                      inputName="can_edit_projects"
                      label={t(($) => $.teamPermissions.canEditProjects)}
                      readOnly={isAdmin}
                    />
                  </div>
                </div>
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
