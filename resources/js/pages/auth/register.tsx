import { Form, Submit } from '@gmcode/forms'
import { Head } from '@inertiajs/react'
import { Trans, useTranslation } from 'react-i18next'
import {
  ConfirmPasswordFieldPreset,
  EmailFieldPreset,
  NameFieldPreset,
  PasswordFieldPreset
} from '@/components/auth/fields'
import { TextLink } from '@/components/text-link'
import AuthLayout from '@/layouts/auth-layout'
import { login } from '@/routes'
import { store } from '@/routes/register'
import { registerSchema } from '@/schemas/auth'

export default function Register() {
  // i18n
  const { i18n, t } = useTranslation()

  return (
    <AuthLayout
      h1={t(($) => $.pages.auth.register.h1)}
      p={t(($) => $.pages.auth.register.p)}
    >
      <Head title={t(($) => $.pages.auth.register.title)} />

      <div className="grid gap-6">
        <Form
          route={store()}
          schema={registerSchema}
        >
          {({ form, loading }) => (
            <>
              <NameFieldPreset
                control={form.control}
                i18n={i18n}
              />

              <EmailFieldPreset
                control={form.control}
                i18n={i18n}
              />

              <PasswordFieldPreset
                control={form.control}
                i18n={i18n}
              />

              <ConfirmPasswordFieldPreset
                control={form.control}
                i18n={i18n}
              />

              <Submit
                className="mt-2 w-full"
                label={t(($) => $.pages.auth.register.submit)}
                loading={loading}
              />
            </>
          )}
        </Form>

        <div className="text-center text-sm text-muted-foreground">
          <Trans
            components={{ a: <TextLink href={login()} /> }}
            i18nKey={($) => $.pages.auth.register.loginCTA}
          />
        </div>
      </div>
    </AuthLayout>
  )
}
