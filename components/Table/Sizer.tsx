import Select from '../Select'
import React, { useState, useMemo } from 'react'
import { DEFAULT_PAGINATION } from '@app/components/Table/constants/pagination-value.constants'

interface Props {
  sizeOptions: number[]
  value: string
  onValueChange: (pageSize: string) => void
}
export const Sizer: React.FC<Props> = ({ sizeOptions, onValueChange, value }) => {
  const options = useMemo(() => {
    return sizeOptions.map((option) => ({
      label: option.toString(),
      value: option.toString()
    }))
  }, [sizeOptions])

  return (
    <Select
      name='sizer'
      onValueChange={onValueChange}
      options={options}
      value={value}
      defaultValue={DEFAULT_PAGINATION.pageSize.toString()}
    />
  )
}
