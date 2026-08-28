import { Form, Submit, type Method } from '@gmcode/forms'
import { Button, Infobox } from '@gmcode/react-ui'
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
  open,
  route,
  setOpen,
  title,
  warning
}: PropsWithChildren<{
  description?: string
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
                  <Button variant="secondary">{t(($) => $.cancel)}</Button>
                </DialogClose>

                <Submit
                  label={t(($) => $.delete)}
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
