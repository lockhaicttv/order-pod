import React from 'react'
import { Input } from '@app/components/ui/input'
import Select from '@app/components/Select'
import useGetProducts from '@app/containers/Products/hooks/useGetProducts'
import { generateMultiSelectOptions } from '@app/utils/generateSelectOptions'
import FormField from '@app/components/Form/FormField'
import { DefaultValues, useFieldArray, useFormContext } from 'react-hook-form'
import { Typography } from '@app/components/ui/typography'
import { Button } from '@app/components/ui/button'
import { PlusIcon } from '@radix-ui/react-icons'
import { XIcon } from 'lucide-react'
import { z } from 'zod'
import { issueProductSchema } from '@app/containers/DailyReports/constants/daily-report.schemas'
import ProductInfo from '@app/containers/DailyReports/DailyReportDetail/components/ProductInfo'
import NumberInput from '@app/components/NumberInput'

type IssueProductValue = z.infer<typeof issueProductSchema>

const defaultIssueProductValue: DefaultValues<IssueProductValue> = {
  issue: undefined,
  product: undefined,
  weight: undefined,
  quantity: undefined,
  notes: []
}
const IssueProducts = () => {
  const { control, watch } = useFormContext()
  const {
    append: returnMaterialsAppend,
    remove: returnMaterialsRemove,
    fields: returnMaterialsFields
  } = useFieldArray({
    control: control,
    name: 'returnMaterials'
  })

  return (
    <div className='space-y-4'>
      <div className='flex justify-start gap-4 items-center'>
        <Typography className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
          Return materials
        </Typography>
        <Button onClick={() => returnMaterialsAppend(defaultIssueProductValue)} type='button' variant='ghost' size='sm'>
          <PlusIcon />
        </Button>
      </div>
      {returnMaterialsFields.map((returnMaterialsField, index) => {
        const selectedProduct = watch(`returnMaterials.${index}.product`)

        return (
          <div
            key={returnMaterialsField.id}
            className='flex space-x-2 justify-between mb-4 items-start border border-solid border-neutral-200 rounded-sm p-2 pl-4 pb-4'
          >
            <div className='w-10/12 space-y-2'>
              <div className=' w-full gap-4'>
                <div className=''>
                  <ProductInfo
                    parentName={`returnMaterials.${index}.product`}
                    synDataFrom={`returnMaterials.${index}`}
                    isShowWeightQuantity={false}
                  />
                </div>
                <div className='flex gap-4'>
                  <div className='desktop:w-3/12'>
                    <FormField
                      control={control}
                      name={`returnMaterials.${index}.weight`}
                      label={'Weight'}
                      renderComponent={({ field }) => (
                        <NumberInput {...field} onChange={(value) => field.onChange(value)} />
                      )}
                    />
                  </div>
                  <div className='desktop:w-3/12'>
                    <FormField
                      control={control}
                      name={`returnMaterials.${index}.quantity`}
                      label={`Quantity ${selectedProduct?.info?.unit ? `(${selectedProduct.info.unit})` : ''}`}
                      renderComponent={({ field }) => (
                        <NumberInput {...field} onChange={(value) => field.onChange(value)} />
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Button
                onClick={() => returnMaterialsRemove(index)}
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
        <Button onClick={() => returnMaterialsAppend(defaultIssueProductValue)} type='button' size='sm'>
          <PlusIcon />
        </Button>
      </div>
    </div>
  )
}

export default IssueProducts
