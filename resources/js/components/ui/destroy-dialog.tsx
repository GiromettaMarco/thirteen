import { Form, Submit } from '@gmcode/forms'
import { Button, Infobox } from '@gmcode/react-ui'
import type { Method } from '@inertiajs/core'
import type { Dispatch, PropsWithChildren, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle
} from '@/components/ui/dialog'
import { deleteSchema } from '@/schemas/misc'
import type { RouteDefinition } from '@/wayfinder'

export function DestroyDialog({
  children,
  description,
  labels,
  open,
  route,
  setOpen,
  title,
  warning
}: PropsWithChildren<{
  description?: string
  labels?: {
    cancel?: string
    delete?: string
  }
  open: boolean
  route: RouteDefinition<Method>
  setOpen: Dispatch<SetStateAction<boolean>>
  title?: string
  warning?: string
}>) {
  // i18n
  const { t } = useTranslation()

  return (
    <Dialog
      onOpenChange={(open) => setOpen(open)}
      open={open}
    >
      <DialogContent
        onOpenAutoFocus={(event) => (event.target as HTMLElement).blur()}
      >
        {title && <DialogTitle>{title}</DialogTitle>}

        {description && <DialogDescription>{description}</DialogDescription>}

        {warning && <Infobox variant="warning">{warning}</Infobox>}

        {children}

        <Form
          id="destroy-dialog-form"
          onSuccess={() => setOpen(false)}
          route={route}
          schema={deleteSchema}
        >
          {({ loading }) => (
            <>
              <DialogFooter className="items-center">
                <DialogClose asChild>
                  <Button variant="secondary">
                    {labels?.cancel ?? t(($) => $.actions.cancel)}
                  </Button>
                </DialogClose>

                <Submit
                  label={labels?.delete ?? t(($) => $.actions.delete)}
                  loading={loading}
                  variant="destructive"
                />
              </DialogFooter>
            </>
          )}
        </Form>
      </DialogContent>
    </Dialog>
  )
}
