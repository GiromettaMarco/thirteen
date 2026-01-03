import DashboardLayout from '@/layouts/dashboard-layout'
import { Head } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'

export default function InvitationsIndex() {
  // i18n
  const { t } = useTranslation()

  return (
    <DashboardLayout title={t(($) => $.invitation, { count: 2 })}>
      <Head title={t(($) => $.pages.dashboard.invitations.index.title)} />

      <p>We are working on this page right now.</p>
    </DashboardLayout>
  )
}
