import { APP_NAME } from '@/config'
import { cn } from '@/lib/utils'
import type { ComponentProps, SVGAttributes } from 'react'

function Brand(props: SVGAttributes<SVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
    >
      <path
        className="fill-foreground"
        d="M13.09,28.32l-2.79.82a22.93,22.93,0,0,0-4,1.46,8,8,0,0,1-3.48,1.25c-1.23,0-1.8-.56-1.72-1.59S2.12,28.45,4,28c1.06-.28,2.12-.59,3.18-.9l27.89-8.38V80.4h-22Z"
      />
      <path
        className="fill-foreground"
        d="M67.57,45c.69,0,1.35,0,2-.08V22.05L68.61,22c-.32,0-.62,0-.91,0H65.88a25.88,25.88,0,0,0-3.46.28,24.28,24.28,0,0,0-3.74.79A9.65,9.65,0,0,0,54,25.53a3.88,3.88,0,0,1-2.45,1.59c-1.54.11-2.35-.39-2.4-1.5Q48.92,23,56.32,20.5a37.34,37.34,0,0,1,11.53-1.67,43,43,0,0,1,10.62,1.11,22.65,22.65,0,0,1,7.07,3,11.88,11.88,0,0,1,5.54,10.32q0,6.4-6.49,10.74a21.39,21.39,0,0,1-5.24,2.49q9.89,3.18,13,11a16.88,16.88,0,0,1,1,6.06,14.38,14.38,0,0,1-1.78,6.83,16.82,16.82,0,0,1-5.14,5.76q-7,5.07-19.2,5.07a29,29,0,0,1-18-5.8A10.28,10.28,0,0,1,45.57,71a2.79,2.79,0,0,1-.21-1.2c.09-1.2.63-1.76,1.63-1.68a3.17,3.17,0,0,1,2.41,1.92,10.53,10.53,0,0,0,2.36,3.05,18.27,18.27,0,0,0,3.61,2.47A21.76,21.76,0,0,0,65.6,78h4V48.35a24.73,24.73,0,0,0-2.84-.18H65.08l-4.47.26c-2,0-3-.56-3-1.67,0-1.38.94-2.07,2.83-2.07Z"
      />
    </svg>
  )
}

function Logo(props: ComponentProps<'span'>) {
  return <span {...props}>{APP_NAME}</span>
}

function BrandAndLogo({
  brandClassName,
  className,
  logoClassName
}: {
  brandClassName?: string
  className?: string
  href?: string
  logoClassName?: string
}) {
  return (
    <div className={className}>
      <Brand className={brandClassName} />
      <Logo
        className={cn('text-brand text-2xl font-semibold', logoClassName)}
      />
    </div>
  )
}

export { Brand, BrandAndLogo, Logo }
