'use client'

import { useEffect, useState } from 'react'
import { Check, ChevronsUpDownIcon, XIcon } from 'lucide-react'
import { cn } from '@app/lib/utils'
import { Button } from '@app/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@app/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@app/components/ui/popover'
import * as React from 'react'
import classNames from 'classnames'
import { Label } from '@app/components/ui/label'

interface Option<T> {
  label: string
  value: T
}

interface Props<T> {
  label?: string
  name: string
  options: Option<T>[]
  placeholder?: string
  valueKey?: string
  value?: T | null
  onValueChange: (value?: T | string | null) => void
  selectTriggerClassname?: string
  allowClear?: boolean
}

function Combobox<T>({
  options,
  name,
  label,
  placeholder,
  value,
  onValueChange,
  valueKey,
  selectTriggerClassname,
  allowClear = true
}: Props<T>) {
  const [open, setOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState('')
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [inputValue, setInputValue] = React.useState('')

  const handleValueChange = (value: string) => {
    if (!value) {
      setSelectedValue('')
      onValueChange(value)

      return
    }

    setSelectedValue(value)
    onValueChange(
      valueKey ? options.filter((option) => option.value[valueKey as keyof T] === value)[0]?.value : (value as T)
    )
  }

  const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    const input = inputRef.current
    if (input) {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (input.value === '') {
          onValueChange(null)
        }
      }
      // This is not a default behaviour of the <input /> field
      if (e.key === 'Escape') {
        input.blur()
      }
    }
  }, [])

  useEffect(() => {
    if (value) {
      const inComingValue = valueKey
        ? (value[valueKey as keyof T] as string | number)?.toString()
        : (value as string | number)?.toString()

      if (inComingValue !== selectedValue) {
        setSelectedValue(inComingValue)
      }
    } else {
      if (value !== selectedValue) {
        setSelectedValue('')
      }
    }
  }, [value])

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        {!!label && <Label className='mb-2'>{label}</Label>}
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            role='combobox'
            aria-expanded={open}
            className={classNames([
              `text-foreground w-full justify-between border-solid font-normal ${selectTriggerClassname}`,
              {
                'text-muted-foreground': !selectedValue
              }
            ])}
          >
            {selectedValue
              ? options.find((option) =>
                  valueKey ? option.value[valueKey as keyof T] === selectedValue : option.value === selectedValue
                )?.label
              : placeholder ?? 'Select option...'}
            <div className='flex items-center'>
              {!!selectedValue && allowClear && (
                <Button
                  className='h-auto p-1 rounded-full hover:bg-primary hover:text-white opacity-50'
                  variant='ghost'
                  onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    handleValueChange('')
                  }}
                >
                  <XIcon size={12} />
                </Button>
              )}
              <ChevronsUpDownIcon className='ml-2 shrink-0 opacity-50' size={12} />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <Command onKeyDown={handleKeyDown}>
            <CommandInput
              placeholder='Search...'
              ref={inputRef}
              value={inputValue}
              onValueChange={setInputValue}
              onBlur={() => setOpen(false)}
              onFocus={() => setOpen(true)}
            />
            <CommandList>
              <CommandEmpty>No options found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.label + JSON.stringify(option.value)}
                    onMouseDown={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                    }}
                    onSelect={(_currentValue) => {
                      handleValueChange(
                        valueKey
                          ? (option.value[valueKey as keyof T] as string | number)?.toString()
                          : (option.value as string | number)?.toString()
                      )
                      setOpen(false)
                    }}
                    className='flex justify-between cursor-pointer'
                  >
                    {option.label}
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        selectedValue === (valueKey ? option.value[valueKey as keyof T] : option.value)
                          ? 'opacity-100'
                          : 'opacity-0'
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default Combobox
