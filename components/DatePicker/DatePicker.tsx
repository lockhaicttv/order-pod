'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'

import { cn } from '@app/lib/utils'
import { Button } from '@app/components/ui/button'
import { Calendar } from '@app/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@app/components/ui/popover'
import { Label } from '@app/components/ui/label'

interface Props {
  label?: string
  value?: Date
  onChange: (date?: Date) => void
}

const DatePicker = ({ value, onChange, label }: Props) => {
  return (
    <div>
      <Popover>
        {!!label && <Label className='mb-2'>{label}</Label>}
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'text-foreground w-full justify-start text-left font-normal border border-input shadow-none border-solid',
              !value && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className='mr-2 h-4 w-4' />
            {value ? format(value, 'PPP') : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align={'start'}>
          <Calendar mode='single' selected={value} onSelect={onChange} initialFocus />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default DatePicker
