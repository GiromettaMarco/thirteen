import { useTsvResolver, type InferSchema } from '@/lib/tsv/hookform'
import type { Schema } from '@/lib/tsv/schema'
import type { Ruleset } from '@/lib/tsv/types'
import { cn } from '@/lib/utils'
import type { RouteDefinition } from '@/wayfinder'
import { useForm as useInertiaForm } from '@inertiajs/react'
import { useEffect, type ReactNode } from 'react'
import type {
  DefaultValues,
  FieldValues,
  Path,
  UseFormReturn
} from 'react-hook-form'
import { useForm as userReactForm } from 'react-hook-form'

type Method = 'get' | 'post' | 'put' | 'delete' | 'patch'

type RenderFN<TValues extends FieldValues> = ({
  form,
  loading
}: {
  form: UseFormReturn<TValues>
  loading: boolean
}) => ReactNode

export function Form<
  TRuleset extends Ruleset,
  TSchema extends Schema<TRuleset>,
  TValues extends InferSchema<TSchema>
>({
  children,
  className,
  defaults,
  route,
  schema
}: {
  children: RenderFN<TValues>
  className?: string
  defaults: DefaultValues<TValues>
  route: RouteDefinition<Method>
  schema: Schema<TRuleset>
}) {
  // React Hook Form
  const reactForm = userReactForm<TValues>({
    resolver: useTsvResolver(schema),
    defaultValues: defaults
  })

  // Inertia
  const inertiaForm = useInertiaForm<object>(defaults)

  // Submit handler
  async function onSubmit(values: TValues) {
    inertiaForm.transform(() => values)
    inertiaForm[route.method](route.url)
  }

  // Add inertia (server) errors to react form.
  useEffect(() => {
    for (const [key, error] of Object.entries(inertiaForm.errors)) {
      if (error) {
        reactForm.setError(key as Path<TValues>, {
          type: 'inertia',
          message: error as string
        })
      }
    }
  }, [inertiaForm.errors, reactForm])

  return (
    <form
      action={route.url}
      className={cn('grid gap-6', className)}
      method={route.method}
      onSubmit={reactForm.handleSubmit(onSubmit)}
    >
      {children({
        form: reactForm,
        loading: inertiaForm.processing
      })}
    </form>
  )
}
