import React from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { Input } from '@app/components/ui/input'
import FormField from '@app/components/Form/FormField'
import { XIcon } from 'lucide-react'
import { Button } from '@app/components/ui/button'
import { Typography } from '@app/components/ui/typography'
import { PlusIcon } from '@radix-ui/react-icons'
import NumberInput from '@app/components/NumberInput'
import ProductInfo from '@app/containers/DailyReports/DailyReportDetail/components/ProductInfo'

interface Props {
  producingInfoIndex: number
}

const defaultMaterialInputValue = {
  material: undefined,
  weight: undefined,
  returnWeight: undefined,
  returnQuantity: undefined,
  notes: []
}

const MaterialsInput: React.FC<Props> = ({ producingInfoIndex }) => {
  const { control } = useFormContext()

  const {
    append: inputAppend,
    remove: inputRemove,
    fields: inputFields
  } = useFieldArray({
    control: control,
    name: `producingInfos.${producingInfoIndex}.input`
  })

  return (
    <div className='space-y-4'>
      <div className='flex justify-start gap-4 items-center'>
        <Typography className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
          Material inputs
        </Typography>
        <Button
          onClick={() => inputAppend(defaultMaterialInputValue)}
          type='button'
          variant='ghost'
          size='sm'
          className='rounded-full hover:bg-primary hover:text-white text-primary dark:text-white'
        >
          <PlusIcon />
        </Button>
      </div>
      {inputFields.map((materialsInputField, index) => {
        return (
          <div
            key={materialsInputField.id}
            className='flex justify-between mb-4 items-start border border-solid border-neutral-200 rounded-sm p-2 pl-4 pb-4'
          >
            <div className='w-10/12 flex flex-col gap-2 '>
              {/*<div className='w-4/5'>*/}
              {/*  <FormField*/}
              {/*    control={control}*/}
              {/*    name={`producingInfos.${producingInfoIndex}.materialsInput.${index}.material`}*/}
              {/*    label={'Material'}*/}
              {/*    renderComponent={({ field }) => <Input {...field} placeholder='Material name' />}*/}
              {/*  />*/}
              {/*</div>*/}
              <div className='desktop:w-11/12'>
                <ProductInfo
                  parentName={`producingInfos.${producingInfoIndex}.input.${index}.material`}
                  isShowWeightQuantity={false}
                />
              </div>
              <div className='flex flex-col desktop:flex-row gap-4'>
                <div className=''>
                  <FormField
                    control={control}
                    name={`producingInfos.${producingInfoIndex}.input.${index}.weight`}
                    label={'Weight'}
                    renderComponent={({ field }) => (
                      <NumberInput {...field} onChange={(value) => field.onChange(value)} placeholder='Weight' />
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={control}
                    name={`producingInfos.${producingInfoIndex}.input.${index}.returnWeight`}
                    label={'Return weight'}
                    renderComponent={({ field }) => (
                      <NumberInput {...field} onChange={(value) => field.onChange(value)} placeholder='Return weight' />
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={control}
                    name={`producingInfos.${producingInfoIndex}.input.${index}.returnQuantity`}
                    label={'Return quantity'}
                    renderComponent={({ field }) => (
                      <NumberInput
                        {...field}
                        onChange={(value) => field.onChange(value)}
                        placeholder='Return quantity'
                      />
                    )}
                  />
                </div>
              </div>
            </div>
            <div>
              <Button
                onClick={() => inputRemove(index)}
                variant='ghost'
                size='icon'
                className='rounded-full hover:bg-primary hover:text-white text-primary dark:text-white'
              >
                <XIcon size={15} />
              </Button>
            </div>
          </div>
        )
      })}
      <div className='flex justify-center'>
        <Button onClick={() => inputAppend(defaultMaterialInputValue)} type='button' size='sm'>
          <PlusIcon />
        </Button>
      </div>
    </div>
  )
}

export default MaterialsInput
