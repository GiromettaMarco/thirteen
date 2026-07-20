import {
  ConfirmPasswordFieldPreset,
  PasswordFieldPreset
} from '@/components/auth/fields'
import { Submit } from '@/components/ui/submit'
import AuthLayout from '@/layouts/auth-layout'
import { store } from '@/routes/password'
import { resetPasswordSchema } from '@/schemas/auth'
import { Form, HiddenField } from '@gmcode/forms'
import { Head } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'

export default function ResetPassword({
  email,
  token
}: {
  email: string
  token: string
}) {
  // i18n
  const { t } = useTranslation()

  return (
    <AuthLayout
      h1={t(($) => $.pages.auth.resetPassword.h1)}
      p={t(($) => $.pages.auth.resetPassword.p)}
    >
      <Head title={t(($) => $.pages.auth.resetPassword.title)} />

      <Form
        defaults={{ email, token }}
        route={store()}
        schema={resetPasswordSchema}
      >
        {({ form, loading }) => (
          <>
            <HiddenField
              control={form.control}
              inputId="email"
              inputName="email"
            />

            <PasswordFieldPreset control={form.control} />

            <ConfirmPasswordFieldPreset control={form.control} />

            <HiddenField
              control={form.control}
              inputId="token"
              inputName="token"
            />

            <Submit
              className="w-full"
              label={t(($) => $.pages.auth.resetPassword.submit)}
              loading={loading}
            />
          </>
        )}
      </Form>
    </AuthLayout>
  )
}
