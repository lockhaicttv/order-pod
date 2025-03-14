import CustomSidebar from './components/Sidebar/CustomSidebar'
import React, { ReactNode } from 'react'
import Header from '@app/components/Layout/components/Header/Header'

interface Props {
  children: ReactNode
}

const Layout: React.FC<React.PropsWithChildren<Props>> = ({ children }) => {
  return (
    <div>
      <Header />
      <div className='flex'>
        <CustomSidebar />
        <div className='bg-sky-50/45 dark:bg-background w-full'>{children}</div>
      </div>
    </div>
  )
}

export default Layout
