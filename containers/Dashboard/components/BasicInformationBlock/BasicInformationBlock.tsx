import React from 'react'
import { Typography } from '@app/components/ui/typography'
import classNames from 'classnames'
import styled from 'styled-components'

interface Props {
  label: string
  value: string | number
  color?: string
}
const BasicInformationBlock = ({ label, value, color }: Props) => {
  return (
    <BasicInformationBlockStyled
      className={`flex p-2 desktop:px-12 desktop:py-6 flex-col content-center items-center space-y-2 desktop:space-y-4 shadow-sm border rounded w-full bg-background`}
      color={color}
    >
      <div>
        <Typography className='text-sm tablet:text-lg desktop:text-2xl font-bold uppercase label text-center dark:!text-foreground'>
          {label}
        </Typography>
      </div>
      <div>
        <Typography variant='h5' className='font-bold value dark:!text-foreground'>
          {value}
        </Typography>
      </div>
    </BasicInformationBlockStyled>
  )
}

export default BasicInformationBlock

export const BasicInformationBlockStyled = styled.div<{ color?: string }>`
  border-color: ${({ color = '#000' }) => color};

  .label {
    color: ${({ color = '#000' }) => color};
  }

  .value {
    color: ${({ color = '#000' }) => color};
  }
`
