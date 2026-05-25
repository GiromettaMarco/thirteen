import DashboardLayout from '@/layouts/dashboard-layout'
import type { Project } from '@/types'
import { Head } from '@inertiajs/react'

export default function ProjectsShow({ project }: { project: Project }) {
  return (
    <DashboardLayout title={project.name}>
      <Head title={project.name} />

      <p>We are working on this page right now.</p>
    </DashboardLayout>
  )
}
