import { Checkbox } from '@/components/ui/checkbox'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet
} from '@/components/ui/field'
import type { Checkbox as CheckboxPrimitive } from 'radix-ui'
import type { FC, SVGProps } from 'react'
import { useRef, type ComponentProps } from 'react'

export function MultipleCheckboxField({
  description,
  groupId,
  items,
  legend,
  name,
  onValueChange,
  ...props
}: ComponentProps<typeof FieldSet> & {
  description?: string
  groupId?: string
  items: Array<{
    defaultChecked?: boolean
    disabled?: boolean
    Icon?: FC<SVGProps<SVGSVGElement>>
    id?: string
    label?: string
    value: string
  }>
  legend?: string
  name: string
  onValueChange?: (values: string[]) => void
}) {
  const values = useRef<string[]>([])

  function updateValues(
    value: string,
    checked: CheckboxPrimitive.CheckedState
  ) {
    if (checked && !values.current.includes(value)) {
      values.current.push(value)
    } else {
      const index = values.current.indexOf(value)
      if (index > -1) {
        values.current.splice(index, 1)
      }
    }

    if (onValueChange) {
      onValueChange(values.current)
    }
  }

  return (
    <FieldSet {...props}>
      {legend && <FieldLegend variant="label">{legend}</FieldLegend>}

      {description && <FieldDescription>{description}</FieldDescription>}

      <FieldGroup
        className="gap-3"
        id={groupId}
      >
        {items.map((item, index) => (
          <Field
            key={item.id}
            orientation="horizontal"
          >
            <Checkbox
              defaultChecked={item.defaultChecked}
              disabled={item.disabled}
              id={item.id ?? `item-${index}`}
              name={`${name}[]`}
              onCheckedChange={(checked) => updateValues(item.value, checked)}
              value={item.value}
            />
            <FieldLabel
              htmlFor={item.id ?? `item-${index}`}
              className="flex font-normal"
            >
              {item.Icon && <item.Icon />}
              {item.label}
            </FieldLabel>
          </Field>
        ))}
      </FieldGroup>
    </FieldSet>
  )
}
