import React, { ReactNode } from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@app/components/ui/form'
import {
  ControllerProps,
  FieldPath,
  FieldValues,
  ControllerRenderProps,
  UseFormStateReturn,
  ControllerFieldState
} from 'react-hook-form'

const CFormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  label,
  renderComponent,
  ...props
}: Omit<ControllerProps<TFieldValues, TName>, 'render'> & {
  label?: string | ReactNode
  renderComponent: (props: {
    field: ControllerRenderProps<TFieldValues, TName>
    fieldState: ControllerFieldState
    formState: UseFormStateReturn<TFieldValues>
  }) => ReactNode
}) => {
  return (
    <FormField
      render={(props) => (
        <FormItem>
          <FormControl>
            <>
              {!!label && <FormLabel>{label}</FormLabel>}
              {renderComponent(props)}
            </>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
      {...props}
    />
  )
}

export default CFormField
