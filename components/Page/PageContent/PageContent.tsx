import React, { HTMLProps } from 'react'

import PageLoading from '../PageLoading'

export interface PageContentProps extends HTMLProps<'div'> {
  loading?: boolean
  padding?: 'p-0'
}

const PageContent: React.FC<React.PropsWithChildren<PageContentProps>> = ({ children, loading, padding }) => (
  <div className='desktop:px-6 tablet:px-4 mobile:px-3 pt-6 mb-4'>{children}</div>
)

export default PageContent
