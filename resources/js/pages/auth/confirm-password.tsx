import { store } from '@/actions/App/Http/Controllers/Auth/ConfirmablePasswordController'
import { PasswordFieldPreset } from '@/components/auth/fields'
import { Submit } from '@/components/ui/submit'
import AuthLayout from '@/layouts/auth-layout'
import { passwordConfirmSchema } from '@/schemas/auth'
import { Form } from '@gmcode/forms'
import { Head } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'

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

            <Submit
              label={t(($) => $.submit)}
              loading={loading}
            />
          </>
        )}
      </Form>
    </AuthLayout>
  )
}
