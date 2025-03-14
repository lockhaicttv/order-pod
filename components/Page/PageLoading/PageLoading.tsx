import React from 'react'
import { BounceLoader } from 'react-spinners'

interface Props {
  loading: boolean
}

const PageLoading: React.FC<React.PropsWithChildren<Props>> = ({ loading, children }) => (
  <>
    {loading ? (
      <div className='flex items-center content-center'>
        <BounceLoader color='#36d7b7' />
      </div>
    ) : (
      <>{children}</>
    )}
  </>
)

export default PageLoading
