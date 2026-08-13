import { CheckboxField, ErrorMonitor, Form, Submit } from '@gmcode/forms'
import { Field, FieldLabel, Input } from '@gmcode/react-ui'
import { Head } from '@inertiajs/react'
import { Controller } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { EmailFieldPreset } from '@/components/auth/fields'
import { TextLink } from '@/components/text-link'
import AuthLayout from '@/layouts/auth-layout'
import { register } from '@/routes'
import { store } from '@/routes/login'
import { request } from '@/routes/password'
import { loginSchema } from '@/schemas/auth'

export default function Login({
  canRegister = false,
  canReset = false
}: {
  canRegister?: boolean
  canReset?: boolean
}) {
  // i18n
  const { i18n, t } = useTranslation()

  return (
    <AuthLayout
      h1={t(($) => $.pages.auth.login.h1)}
      p={t(($) => $.pages.auth.login.p)}
    >
      <Head title={t(($) => $.pages.auth.login.title)} />

      <div className="grid gap-6">
        <Form
          id="login-form"
          route={store()}
          schema={loginSchema}
        >
          {({ form, loading }) => (
            <>
              <EmailFieldPreset
                control={form.control}
                i18n={i18n}
              />

              <Controller
                control={form.control}
                name="password"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div className="flex flex-col-reverse gap-2">
                      <Input
                        aria-invalid={fieldState.invalid}
                        autoComplete="off"
                        id="password"
                        placeholder={t(($) => $.auth.password)}
                        type="password"
                        {...field}
                      />

                      <div className="flex items-center">
                        <FieldLabel htmlFor="password">
                          {t(($) => $.auth.password)}
                        </FieldLabel>

                        {canReset && (
                          <TextLink
                            className="ms-auto text-sm"
                            href={request()}
                          >
                            {t(($) => $.pages.auth.login.forgotPasswordCTA)}
                          </TextLink>
                        )}
                      </div>
                    </div>

                    {fieldState.invalid && (
                      <ErrorMonitor error={fieldState.error} />
                    )}
                  </Field>
                )}
              />

              <CheckboxField
                control={form.control}
                inputId="rememberMe"
                inputName="remember"
                label={t(($) => $.pages.auth.login.rememberMe)}
              />

              <Submit
                className="mt-4 w-full"
                label={t(($) => $.auth.signIn)}
                loading={loading}
              />
            </>
          )}
        </Form>

        {canRegister && (
          <div className="text-center text-sm text-muted-foreground">
            <Trans
              components={{ a: <TextLink href={register()} /> }}
              i18nKey={($) => $.pages.auth.login.registerCTA}
            />
          </div>
        )}
      </div>
    </AuthLayout>
  )
}
