import React from 'react'
import { Label } from '@app/components/ui/label'

const DetailLabel = () => {
  return (
    <div className='space-y-2 desktop:w-[93%]'>
      <div className='grid grid-cols-11 gap-4 mb-4'>
        <div className='desktop:col-span-1'>
          <Label>Order </Label>
        </div>
        <div className='desktop:col-span-2'>
          <Label>Exchange Rate</Label>
        </div>
        <div className='desktop:col-span-2'>
          <Label>Backup Rate</Label>
        </div>
        <div className='desktop:col-span-2'>
          <Label>Stage</Label>
        </div>
        <div className='desktop:col-span-2'>
          <Label>Input</Label>
        </div>
        <div className='desktop:col-span-2'>
          <Label>Output</Label>
        </div>
      </div>
    </div>
  )
}

export default DetailLabel
