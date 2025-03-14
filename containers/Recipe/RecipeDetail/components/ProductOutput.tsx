import { ReactNode } from 'react'

interface Props {
  productOutput: ReactNode
}

export const ProductOutput: React.FC<Props> = ({ productOutput }) => {
  return (
    <div className='flex items-center px-5 py-2 text-center rounded-md bg-emerald-100 text-emerald-500'>
      {productOutput}
    </div>
  )
}
