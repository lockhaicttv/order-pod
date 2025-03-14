import React from 'react'
import { RingLoader } from 'react-spinners'
import theme from '@app/utils/theme'

interface Props {
  isLoading?: boolean
}

const BackDrop: React.FC<Props> = ({ isLoading = false }) => {
  if (!isLoading) return null

  return (
    <div className='h-screen w-screen fixed backdrop-blur-sm flex justify-center items-center left-0 top-0 right-0 bottom-0 z-[999999]'>
      <div>
        <RingLoader color={theme.colors.green[500]} size={60} />
      </div>
    </div>
  )
}

export default BackDrop
