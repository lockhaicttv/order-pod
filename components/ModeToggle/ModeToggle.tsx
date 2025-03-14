'use client'

import * as React from 'react'
import { Moon, MoonIcon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button, ButtonProps } from '@app/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@app/components/ui/dropdown-menu'

interface Props {
  variant?: ButtonProps['variant']
}

export default function ModeToggle({ variant }: Props) {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant || 'ghost'} size='icon' className='rounded-full px-2 py-1'>
          <Sun
            className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0'
            color='white'
          />
          <Moon
            className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100'
            color='white'
          />
          <span className='sr-only'>Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
        {/*<DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>*/}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
