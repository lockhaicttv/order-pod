import React, { ChangeEvent, useEffect, useState } from 'react'
import { Input, InputProps } from '@app/components/ui/input'
import { useMaskito } from '@maskito/react'
import { MaskitoOptions } from '@maskito/core'
import { maskitoNumberOptionsGenerator } from '@maskito/kit'

const digitsOnlyMask: MaskitoOptions = maskitoNumberOptionsGenerator({
  thousandSeparator: ',',
  decimalSeparator: '.',
  precision: 6
})
interface NumberInputProps extends Omit<InputProps, 'onChange'> {
  value: number
  onChange: (value: number) => void
}

const numberFormatter = new Intl.NumberFormat('en-US', {
  useGrouping: true,
  maximumFractionDigits: 6
})

const NumberInput: React.FC<NumberInputProps> = ({ value, onChange, ...props }) => {
  const [inputValue, setInputValue] = useState(value ? numberFormatter.format(value) : undefined)
  const inputRef = useMaskito({ options: digitsOnlyMask })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    const digits = e.target.value.replace(/[^0-9.]/g, '')

    onChange(parseFloat(digits))
  }

  useEffect(() => {
    if (value !== undefined && numberFormatter.format(value || 0) !== inputValue) {
      setInputValue(numberFormatter.format(value || 0))
    }
  }, [value]) // Dependency array for useEffect

  return <Input type='text' ref={inputRef} value={inputValue} onInput={handleInputChange} {...props} />
}

export default NumberInput
