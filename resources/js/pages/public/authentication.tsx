import { Separator } from '@gmcode/react-ui'
import { Head } from '@inertiajs/react'
import { Trans, useTranslation } from 'react-i18next'
import { Code } from '@/components/ui/code'
import { Heading } from '@/components/ui/heading'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import PublicLayout from '@/layouts/public-layout'

export default function Authentication() {
  // i18n
  const { i18n, t } = useTranslation()

  return (
    <PublicLayout>
      <Head title={t(($) => $.pages.public.authentication.title)} />
      <div className="mx-auto w-245">
        <section>
          <Heading
            className="mb-2"
            tag="h1"
            h={t(($) => $.pages.public.authentication.h1)}
            p={t(($) => $.pages.public.authentication.description)}
          />
          <p className="mb-1 text-sm">
            <Trans
              lang={i18n.language}
              components={{ code: <Code /> }}
              i18nKey={($) => $.pages.public.authentication.p1}
            />
          </p>
          <p className="text-sm">
            <Trans
              lang={i18n.language}
              components={{ code: <Code /> }}
              i18nKey={($) => $.pages.public.authentication.p2}
            />
          </p>
        </section>

        <Separator className="my-8" />

        <section>
          <Heading
            className="mb-2"
            h={t(($) => $.pages.public.authentication.configuration.h2)}
            p="config/custom.php"
          />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  {t(
                    ($) => $.pages.public.authentication.configuration.feature
                  )}
                </TableHead>
                <TableHead>
                  {t(
                    ($) =>
                      $.pages.public.authentication.configuration.description
                  )}
                </TableHead>
                <TableHead>
                  {t(
                    ($) => $.pages.public.authentication.configuration.default
                  )}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Code>register</Code>
                </TableCell>
                <TableCell className="whitespace-normal">
                  {t(
                    ($) => $.pages.public.authentication.configuration.register
                  )}
                </TableCell>
                <TableCell>
                  <Code>true</Code>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Code>reset</Code>
                </TableCell>
                <TableCell className="whitespace-normal">
                  {t(($) => $.pages.public.authentication.configuration.reset)}
                </TableCell>
                <TableCell>
                  <Code>true</Code>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Code>verification</Code>
                </TableCell>
                <TableCell className="whitespace-normal">
                  {t(
                    ($) =>
                      $.pages.public.authentication.configuration.verification
                  )}
                </TableCell>
                <TableCell>
                  <Code>true</Code>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Code>verify_on_reset</Code>
                </TableCell>
                <TableCell className="whitespace-normal">
                  {t(
                    ($) =>
                      $.pages.public.authentication.configuration.verifyOnReset
                  )}
                </TableCell>
                <TableCell>
                  <Code>true</Code>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </section>

        <Separator className="my-8" />

        <section>
          <Heading
            className="mb-2"
            h={t(($) => $.pages.public.authentication.emailVerification.h2)}
          />
          <p className="text-sm">
            <Trans
              lang={i18n.language}
              components={{ code: <Code /> }}
              i18nKey={($) => $.pages.public.authentication.emailVerification.p}
            />
          </p>
        </section>

        <Separator className="my-8" />

        <section>
          <Heading
            className="mb-2"
            h={t(($) => $.pages.public.authentication.requestThrottling.h2)}
          />
          <p className="mb-1 text-sm">
            {t(($) => $.pages.public.authentication.requestThrottling.p1)}
          </p>
          <p className="text-sm">
            <Trans
              lang={i18n.language}
              components={{ code: <Code /> }}
              i18nKey={($) =>
                $.pages.public.authentication.requestThrottling.p2
              }
            />
          </p>
        </section>
      </div>
    </PublicLayout>
  )
}
