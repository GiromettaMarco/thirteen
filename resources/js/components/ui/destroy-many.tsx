import { Form, Submit } from '@gmcode/forms'
import { Button, Infobox } from '@gmcode/react-ui'
import type { Method } from '@inertiajs/core'
import type { Table } from '@tanstack/react-table'
import { Trash2 } from 'lucide-react'
import { useState, type PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'
import type { Features, RowData } from '@/components/data-table/utility'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { isAnyItem } from '@/lib/utils'
import { massDeleteSchema } from '@/schemas/misc'
import type { RouteDefinition } from '@/wayfinder'

export function DestroyMany<TData extends RowData>({
  children,
  description,
  route,
  selectedList = true,
  table,
  title,
  warning
}: PropsWithChildren<{
  description?: string
  route: RouteDefinition<Method>
  selectedList?: boolean
  table: Table<Features, TData>
  title?: string
  warning?: string
}>) {
  // i18n
  const { t } = useTranslation()

  const ids: Array<string | number> = []

  const selectedItems = table.getSelectedRowModel().rows.map((row) => {
    if (isAnyItem(row.original)) {
      ids.push(row.original.id)
      return {
        id: row.original.id,
        name: row.original.name
      }
    }

    console.warn('The selected row does not contain a valid item.', row)

    return {
      id: 0
    }
  })

  const [open, setOpen] = useState(false)

  return (
    <Dialog
      onOpenChange={(open) => setOpen(open)}
      open={open}
    >
      <DialogTrigger
        asChild
        disabled={selectedItems.length < 1}
      >
        <Button
          data-action="open-destroy-many-dialog"
          size="sm"
          variant="destructive"
        >
          {t(($) => $.actions.delete)}
          <Trash2 />
        </Button>
      </DialogTrigger>

      <DialogContent
        onOpenAutoFocus={(event) => (event.target as HTMLElement).blur()}
      >
        {title && <DialogTitle>{title}</DialogTitle>}

        {description && <DialogDescription>{description}</DialogDescription>}

        {warning && <Infobox variant="warning">{warning}</Infobox>}

        {selectedList && (
          <div className="grid gap-1 text-sm text-muted-foreground">
            <p>{t(($) => $.dialogs.deleteMany.description)}</p>
            <ul className="list-disc ps-4">
              {selectedItems.map((item) => (
                <li key={item.id}>{item.name}</li>
              ))}
            </ul>
          </div>
        )}

        {children}

        <Form
          defaults={{ ids }}
          id="destroy-many-dialog-form"
          onSuccess={() => {
            setOpen(false)
            table.setRowSelection({})
          }}
          route={route}
          schema={massDeleteSchema}
        >
          {({ loading }) => (
            <>
              <DialogFooter className="items-center">
                <DialogClose asChild>
                  <Button variant="secondary">
                    {t(($) => $.actions.cancel)}
                  </Button>
                </DialogClose>

                <Submit
                  label={t(($) => $.actions.delete)}
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
