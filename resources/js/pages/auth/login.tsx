import { EmailFieldPreset } from '@/components/auth/fields'
import { CheckboxField, Form } from '@/components/form'
import { TextLink } from '@/components/text-link'
import { Field, FieldLabel } from '@/components/ui/field'
import { FieldErrorI18n } from '@/components/ui/field-i18n'
import { Input } from '@/components/ui/input'
import { Submit } from '@/components/ui/submit'
import AuthLayout from '@/layouts/auth-layout'
import { register } from '@/routes'
import { store } from '@/routes/login'
import { request } from '@/routes/password'
import { loginSchema } from '@/schemas/auth'
import { Head } from '@inertiajs/react'
import { Controller } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'

export default function Login({
  canRegister = false,
  canReset = false
}: {
  canRegister?: boolean
  canReset?: boolean
}) {
  // i18n
  const { t } = useTranslation()

  return (
    <AuthLayout
      h1={t(($) => $.pages.auth.login.h1)}
      p={t(($) => $.pages.auth.login.p)}
    >
      <Head title={t(($) => $.pages.auth.login.title)} />

      <div className="grid gap-6">
        <Form
          route={store()}
          schema={loginSchema}
        >
          {({ form, loading }) => (
            <>
              <EmailFieldPreset control={form.control} />

              <Controller
                name="password"
                control={form.control}
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
                      <FieldErrorI18n errors={[fieldState.error]} />
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
                data-test="login-submit"
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
