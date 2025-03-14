import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@app/components/ui/select'
import { SelectProps } from '@radix-ui/react-select'
import { useEffect, useState } from 'react'

interface Option<T> {
  label: string
  value: T
}

interface Props<T> extends Omit<SelectProps, 'value' | 'onValueChange'> {
  label?: string
  name: string
  options: Option<T>[]
  placeholder?: string
  valueKey?: string
  value?: T
  onValueChange: (value: T) => void
  selectTriggerClassname?: string
}

function CSelect<T = undefined>({
  options,
  name,
  label,
  placeholder,
  defaultValue,
  value,
  onValueChange,
  valueKey,
  selectTriggerClassname,
  ...rest
}: Props<T>) {
  const [selectedValue, setSelectedValue] = useState('')

  const handleValueChange = (value: string) => {
    if (!value) return

    setSelectedValue(value)
    onValueChange(
      valueKey ? options.filter((option) => option.value[valueKey as keyof T] === value)[0]?.value : (value as T)
    )
  }

  useEffect(() => {
    if (value) {
      const inComingValue = valueKey
        ? (value[valueKey as keyof T] as string | number)?.toString()
        : (value as string | number)?.toString()

      if (inComingValue !== selectedValue) {
        setSelectedValue(inComingValue)
      }
    }
  }, [value])

  return (
    <Select value={selectedValue} onValueChange={handleValueChange} {...rest}>
      <SelectTrigger className={selectTriggerClassname}>
        <SelectValue placeholder={placeholder ?? ''} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => {
          return (
            <SelectItem
              value={
                valueKey
                  ? (option.value[valueKey as keyof T] as string | number)?.toString()
                  : (option.value as string | number)?.toString()
              }
              key={option.label + JSON.stringify(option.value)}
            >
              {option.label}
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}

export default CSelect
