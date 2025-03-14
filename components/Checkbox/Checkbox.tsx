import React from 'react'
import { CheckboxProps } from '@radix-ui/react-checkbox'
import { Checkbox } from '@app/components/ui/checkbox'

interface Props extends CheckboxProps {
  label?: string
  description?: string
  name?: string
}

const CustomCheckbox = ({ label, description, name, ...rest }: Props) => {
  return (
    <div className='items-top flex space-x-2'>
      <Checkbox name={name} {...rest} />
      <div className='grid gap-1.5 leading-none'>
        {!!label && (
          <label
            htmlFor={name}
            className='text-foreground text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            {label}
          </label>
        )}
        {!description && <p className='text-sm text-muted-foreground'>{description}</p>}
      </div>
    </div>
  )
}

export default CustomCheckbox
