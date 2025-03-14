// import * as React from 'react'
//
// import { cn } from '@app/lib/utils'
//
// export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
//
// const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
//   return (
//     <input
//       type={type}
//       className={cn(
//         'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
//         className
//       )}
//       ref={ref}
//       {...props}
//     />
//   )
// })
// Input.displayName = 'Input'
//
// export { Input }
import { cn } from '@app/lib/utils'
import React, { ReactNode } from 'react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: ReactNode
  endIcon?: ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, startIcon, endIcon, ...props }, ref) => {
    return (
      <div className='w-full relative'>
        {startIcon && <div className='absolute left-2 top-1/2 transform -translate-y-1/2 start-icon'>{startIcon}</div>}
        <input
          type={type}
          className={cn(
            'text-foreground flex h-10 w-full rounded-md border border-input bg-background py-2 px-4 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50',
            startIcon ? 'pl-8' : '',
            endIcon ? 'pr-8' : '',
            className
          )}
          ref={ref}
          {...props}
        />
        {endIcon && <div className='absolute right-2 top-1/2 transform -translate-y-1/2 end-icon'>{endIcon}</div>}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
