import { InvitationsTable } from '@/components/invitations/invitations-table'
import { SendInvitationForm } from '@/components/invitations/send-invitation-form'
import { Container } from '@/components/ui/container'
import { Format } from '@/components/ui/format'
import { Separator } from '@/components/ui/separator'
import DashboardLayout from '@/layouts/dashboard-layout'
import type { Invitation } from '@/types'
import { Head } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'

export default function InvitationsIndex({
  invitations
}: {
  invitations: Invitation[]
}) {
  // i18n
  const { t } = useTranslation()

  return (
    <DashboardLayout title={t(($) => $.invitation, { count: 2 })}>
      <Head title={t(($) => $.pages.dashboard.invitations.title)} />

      <Container className="grid gap-6">
        <Format
          h2={t(($) => $.pages.dashboard.invitations.send.h2)}
          p={t(($) => $.pages.dashboard.invitations.send.p)}
        >
          <SendInvitationForm />
        </Format>

        <Separator />

        <Format
          h2={t(($) => $.pages.dashboard.invitations.pending.h2)}
          p={t(($) => $.pages.dashboard.invitations.pending.p)}
        >
          <InvitationsTable invitations={invitations} />
        </Format>
      </Container>
    </DashboardLayout>
  )
}
