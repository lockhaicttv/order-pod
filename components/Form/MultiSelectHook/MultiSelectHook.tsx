'use client'

import * as React from 'react'
import { X } from 'lucide-react'

import { Badge } from '@app/components/ui/badge'
import { Command, CommandGroup, CommandItem } from '@app/components/ui/command'
import { Command as CommandPrimitive } from 'cmdk'
import { useEffect } from 'react'
import { intersection, intersectionBy } from 'lodash'

interface Option<T = undefined> {
  label: string
  value: T
}

interface Props<T = undefined> {
  options: Option<T>[]
  onChange: (selectedData: T[]) => void
  value: T[]
  placeholder?: string
  filterByKey?: keyof T
}

const MultiSelectHook = <T = undefined,>({ options, onChange, placeholder, value, filterByKey }: Props<T>) => {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [open, setOpen] = React.useState(false)
  const [selectedOptions, setSelectedOptions] = React.useState<Option<T>[]>([])
  const [inputValue, setInputValue] = React.useState('')

  useEffect(() => {
    const intersectionValue = filterByKey
      ? intersectionBy(
          value,
          selectedOptions.map((option) => option.value),
          filterByKey
        )
      : intersection(
          value,
          selectedOptions.map((option) => option.value)
        )

    if (value.length !== selectedOptions.length || value.length !== intersectionValue.length) {
      const values = filterByKey ? value.map((item) => item[filterByKey as keyof T]) : [...value]

      setSelectedOptions(
        options.filter((option) =>
          filterByKey
            ? values.includes(option.value[filterByKey as keyof T] as any)
            : values.includes(option.value as any)
        )
      )
    }
  }, [value])

  const handleUnselect = (option: Option<T>) => {
    const newOptions =
      typeof option.value !== 'object'
        ? selectedOptions.filter((item) => item.value !== option.value)
        : selectedOptions.filter((item) => item.value[filterByKey as keyof T] !== option.value[filterByKey as keyof T])

    setSelectedOptions(newOptions)
    onChange(newOptions.map((option) => option.value))
  }

  const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    const input = inputRef.current
    if (input) {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (input.value === '') {
          setSelectedOptions((prev) => {
            const newSelected = [...prev]
            newSelected.pop()
            return newSelected
          })
        }
      }
      // This is not a default behaviour of the <input /> field
      if (e.key === 'Escape') {
        input.blur()
      }
    }
  }, [])

  const selectables = options.filter((option) => !selectedOptions.includes(option))

  return (
    <Command onKeyDown={handleKeyDown} className='overflow-visible bg-transparent'>
      <div className='group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2'>
        <div className='flex gap-1 flex-wrap'>
          {selectedOptions.map((option) => {
            return (
              <Badge
                key={
                  typeof value == 'object'
                    ? option.value[filterByKey as keyof T]?.toString() || ''
                    : (option.value as string)
                }
                variant='secondary'
              >
                {option.label}
                <button
                  className='ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleUnselect(option)
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                  onClick={() => handleUnselect(option)}
                >
                  <X className='h-3 w-3 text-muted-foreground hover:text-foreground' />
                </button>
              </Badge>
            )
          })}
          {/* Avoid having the "Search" Icon */}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            className='ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1'
          />
        </div>
      </div>
      <div className='relative mt-2'>
        {open && selectables.length > 0 ? (
          <div className='absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in'>
            <CommandGroup className='h-full overflow-y-scroll max-h-56'>
              {selectables.map((option: Option<T>) => {
                return (
                  <CommandItem
                    key={
                      typeof value == 'object'
                        ? option.value[filterByKey as keyof T]?.toString() || ''
                        : (option.value as string)
                    }
                    onMouseDown={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                    }}
                    onSelect={(value) => {
                      const newOptions = [...selectedOptions, option]

                      setInputValue('')
                      setSelectedOptions(newOptions)
                      onChange(newOptions.map((option) => option.value))
                    }}
                    className={'cursor-pointer'}
                  >
                    {option.label}
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </div>
        ) : null}
      </div>
    </Command>
  )
}

export default MultiSelectHook
