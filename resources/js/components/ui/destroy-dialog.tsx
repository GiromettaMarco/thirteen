import { Form, type FormMethod } from '@/components/form'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle
} from '@/components/ui/dialog'
import { Infobox } from '@/components/ui/infobox'
import { Submit } from '@/components/ui/submit'
import { Schema } from '@/lib/tsv/schema'
import type { RouteDefinition } from '@/wayfinder'
import type { Dispatch, PropsWithChildren, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'

const deleteSchema = new Schema({})

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
  route: RouteDefinition<FormMethod>
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
