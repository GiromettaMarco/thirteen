import { Form, Submit } from '@gmcode/forms'
import { Head } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import { store } from '@/actions/App/Http/Controllers/Auth/ConfirmablePasswordController'
import { PasswordFieldPreset } from '@/components/auth/fields'
import AuthLayout from '@/layouts/auth-layout'
import { passwordConfirmSchema } from '@/schemas/auth'

export default function ConfirmPassword() {
  // i18n
  const { t } = useTranslation()

  return (
    <AuthLayout
      h1={t(($) => $.pages.auth.confirmPassword.h1)}
      p={t(($) => $.pages.auth.confirmPassword.p)}
    >
      <Head title={t(($) => $.pages.auth.confirmPassword.title)} />

      <Form
        route={store()}
        schema={passwordConfirmSchema}
      >
        {({ form, loading }) => (
          <>
            <PasswordFieldPreset
              control={form.control}
              placeholder={false}
            />

            <Submit loading={loading} />
          </>
        )}
      </Form>
    </AuthLayout>
  )
}
