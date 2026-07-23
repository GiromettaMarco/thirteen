import { Submit } from '@gmcode/forms'
import { Form, Head } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import { TextLink } from '@/components/text-link'
import AuthLayout from '@/layouts/auth-layout'
import { logout } from '@/routes'
import { send } from '@/routes/verification'

export default function VerifyEmail() {
  // i18n
  const { t } = useTranslation()

  return (
    <AuthLayout
      h1={t(($) => $.pages.auth.verifyEmail.h1)}
      p={t(($) => $.pages.auth.verifyEmail.p)}
    >
      <Head title={t(($) => $.pages.auth.verifyEmail.title)} />

      <div className="grid gap-4 text-center">
        <Form action={send()}>
          {({ processing }) => (
            <Submit
              label={t(($) => $.pages.auth.verifyEmail.submit)}
              loading={processing}
            />
          )}
        </Form>

        <TextLink
          className="text-sm"
          href={logout()}
        >
          {t(($) => $.auth.signOut)}
        </TextLink>
      </div>
    </AuthLayout>
  )
}
