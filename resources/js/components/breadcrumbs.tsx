import { Link } from '@inertiajs/react'
import { Fragment, type ComponentProps } from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import type { RouteDefinition } from '@/wayfinder'

export interface BreadcrumbLink {
  href?: string | RouteDefinition<'get'>
  key: string | number
  label: string
}

export function Breadcrumbs({
  links,
  ...props
}: ComponentProps<'nav'> & { links: BreadcrumbLink[] }) {
  // Render nothing if empty
  if (!links) {
    return null
  }

  return (
    <Breadcrumb {...props}>
      <BreadcrumbList>
        {links.map((item, index) => {
          // Omit separator at the end
          const isLast = index === links.length - 1

          return (
            <Fragment key={item.key}>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  {item.href ? (
                    <Link href={item.href}>{item.label}</Link>
                  ) : (
                    item.label
                  )}
                </BreadcrumbLink>
              </BreadcrumbItem>

              {!isLast && <BreadcrumbSeparator />}
            </Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
