import React from 'react'

import PageContent from '../PageContent'
import PageLoading from '../PageLoading'

export interface PageProps {
  fullPage?: boolean
  theme?: any
}

interface PageComposition {
  Content: typeof PageContent
  Loading: typeof PageLoading
}

const Page: React.FC<React.PropsWithChildren<PageProps>> & PageComposition = ({ children, ...props }) => (
  <div className='bg-sky-50/45 dark:bg-background desktop:p-6 tablet:p-4 mobile:p-2 h-full' {...props}>
    {children as JSX.Element[]}
  </div>
)

Page.Content = PageContent
Page.Loading = PageLoading
export default Page
