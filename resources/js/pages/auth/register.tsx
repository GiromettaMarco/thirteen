import { ErrorMonitor, Form, Submit } from '@gmcode/forms'
import {
  cn,
  Field,
  FieldLabel,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput
} from '@gmcode/react-ui'
import { Head } from '@inertiajs/react'
import { Info } from 'lucide-react'
import { Controller } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import {
  ConfirmPasswordFieldPreset,
  EmailFieldPreset,
  NameFieldPreset
} from '@/components/auth/fields'
import { TextLink } from '@/components/text-link'
import {
  HybridTooltip,
  HybridTooltipContent,
  HybridTooltipTrigger
} from '@/components/ui/hybrid-tooltip'
import { PasswordRequirements } from '@/components/ui/password-requirements'
import { usePasswordCheck } from '@/hooks/use-password-check'
import AuthLayout from '@/layouts/auth-layout'
import { login } from '@/routes'
import { store } from '@/routes/register'
import { registerSchema } from '@/schemas/auth'

export default function Register() {
  // i18n
  const { i18n, t } = useTranslation()
  const { check, report } = usePasswordCheck()

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

              <Controller
                control={form.control}
                name="password"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      className="flex justify-between"
                      htmlFor="password"
                    >
                      {t(($) => $.auth.password)}
                    </FieldLabel>
                    <InputGroup className="w-96">
                      <InputGroupInput
                        aria-invalid={fieldState.invalid}
                        autoComplete="off"
                        id="password"
                        placeholder={t(($) => $.auth.password)}
                        type="password"
                        {...field}
                        onChange={(event) => {
                          field.onChange(event)
                          check(event.target.value)
                        }}
                      />
                      <HybridTooltip>
                        <HybridTooltipTrigger asChild>
                          <InputGroupAddon align="inline-end">
                            <InputGroupButton>
                              <Info
                                className={cn('size-4', {
                                  'text-success-foreground': report.level === 5,
                                  'text-warning-foreground':
                                    report.level > 0 && report.level < 5
                                })}
                              />
                            </InputGroupButton>
                          </InputGroupAddon>
                        </HybridTooltipTrigger>
                        <HybridTooltipContent
                          className="px-4 py-2.5"
                          variant="popover"
                        >
                          <PasswordRequirements
                            i18n={i18n}
                            report={report}
                          />
                        </HybridTooltipContent>
                      </HybridTooltip>
                    </InputGroup>
                    <ErrorMonitor error={fieldState.error} />
                  </Field>
                )}
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
