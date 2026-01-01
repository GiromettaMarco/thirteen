import { EmailFieldPreset } from '@/components/auth/fields'
import { Form } from '@/components/form'
import { TextLink } from '@/components/text-link'
import { Submit } from '@/components/ui/submit'
import AuthLayout from '@/layouts/auth-layout'
import { login } from '@/routes'
import { email } from '@/routes/password'
import { forgotPasswordSchema } from '@/schemas/auth'
import { Head } from '@inertiajs/react'
import { Trans, useTranslation } from 'react-i18next'

export default function ForgotPassword() {
  // i18n
  const { t } = useTranslation()

  return (
    <AuthLayout
      h1={t(($) => $.pages.auth.forgotPassword.h1)}
      p={t(($) => $.pages.auth.forgotPassword.p)}
    >
      <Head title={t(($) => $.pages.auth.forgotPassword.title)} />

      <div className="grid gap-6">
        <Form
          defaults={{ email: '' }}
          route={email()}
          schema={forgotPasswordSchema}
        >
          {({ form, loading }) => (
            <>
              <EmailFieldPreset control={form.control} />

              <Submit
                className="w-full"
                label={t(($) => $.pages.auth.forgotPassword.submit)}
                loading={loading}
              />
            </>
          )}
        </Form>

        <div className="text-muted-foreground text-center text-sm">
          <Trans
            components={{ a: <TextLink href={login()} /> }}
            i18nKey={($) => $.pages.auth.forgotPassword.loginCTA}
          />
        </div>
      </div>
    </AuthLayout>
  )
}
