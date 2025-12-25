import { TextLink } from '@/components/text-link'
import { logout } from '@/routes'
import type { Auth } from '@/types'
import { Head } from '@inertiajs/react'

export default function Dashboard({ auth }: { auth: Auth<true> }) {
  return (
    <>
      <Head title="Dashboard" />
      <div>
        <h1>Dashboard</h1>
        <p>Welcome {auth.user.name}. This is the dashboard.</p>
        <TextLink href={logout()}>Log out</TextLink>
      </div>
    </>
  )
}
