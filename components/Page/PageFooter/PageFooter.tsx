import React, { PropsWithChildren } from 'react'

const PageFooter: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className='flex justify-end z-[9] sticky bottom-0 p-4 border-t-2 dark:border-t-border border-solid border-t-neutral-200 bg-background w-full'>
      <div className='flex gap-4'>{children}</div>
    </div>
  )
}

export default PageFooter
