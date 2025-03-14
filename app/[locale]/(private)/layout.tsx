'use client'

import { PropsWithChildren, useEffect } from 'react'
import CustomSidebar from '@app/components/Layout/components/Sidebar/CustomSidebar'
import Header from '@app/components/Layout/components/Header/Header'
import { useParams, useRouter } from 'next/navigation'
import useStore from '@app/store/useStore'

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  const router = useRouter()
  const { isAuthenticated } = useStore()
  const { locale } = useParams()

  useEffect(() => {
    if (!isAuthenticated) {
      console.log(window.location.pathname)
      router.push(`/login?redirect=${window.location.pathname}`)
    }
  }, [isAuthenticated])

  return (
    <div>
      <Header />
      <div className='bg-background flex min-h-[calc(100vh_-_5rem)]'>
        <CustomSidebar />
        <div className='w-full'>{children}</div>
      </div>
    </div>
  )
}
