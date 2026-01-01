import { store } from '@/actions/App/Http/Controllers/Auth/RegisteredUserController'
import {
  ConfirmPasswordFieldPreset,
  EmailFieldPreset,
  NameFieldPreset,
  PasswordFieldPreset
} from '@/components/auth/fields'
import { Form } from '@/components/form'
import { TextLink } from '@/components/text-link'
import { Submit } from '@/components/ui/submit'
import AuthLayout from '@/layouts/auth-layout'
import { login } from '@/routes'
import { registerSchema } from '@/schemas/auth'
import { Head } from '@inertiajs/react'
import { Trans, useTranslation } from 'react-i18next'

export default function Register() {
  // i18n
  const { t } = useTranslation()

  return (
    <AuthLayout
      h1={t(($) => $.pages.auth.register.h1)}
      p={t(($) => $.pages.auth.register.p)}
    >
      <Head title={t(($) => $.pages.auth.register.title)} />

      <div className="grid gap-6">
        <Form
          defaults={{
            name: '',
            email: '',
            password: '',
            password_confirmation: ''
          }}
          route={store()}
          schema={registerSchema}
        >
          {({ form, loading }) => (
            <>
              <NameFieldPreset control={form.control} />

              <EmailFieldPreset control={form.control} />

              <PasswordFieldPreset control={form.control} />

              <ConfirmPasswordFieldPreset control={form.control} />

              <Submit
                className="mt-2 w-full"
                label={t(($) => $.pages.auth.register.submit)}
                loading={loading}
              />
            </>
          )}
        </Form>

        <div className="text-muted-foreground text-center text-sm">
          <Trans
            components={{ a: <TextLink href={login()} /> }}
            i18nKey={($) => $.pages.auth.register.loginCTA}
          />
        </div>
      </div>
    </AuthLayout>
  )
}
