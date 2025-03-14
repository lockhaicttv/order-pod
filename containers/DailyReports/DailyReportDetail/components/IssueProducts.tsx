import React from 'react'
import useGetProducts from '@app/containers/Products/hooks/useGetProducts'
import { generateMultiSelectOptions } from '@app/utils/generateSelectOptions'
import FormField from '@app/components/Form/FormField'
import { DefaultValues, useFieldArray, useFormContext } from 'react-hook-form'
import { Typography } from '@app/components/ui/typography'
import { Button } from '@app/components/ui/button'
import { PlusIcon } from '@radix-ui/react-icons'
import { XIcon } from 'lucide-react'
import useGetProductIssues from '@app/containers/ProductIssues/hooks/useGetProductIssues'
import { z } from 'zod'
import { issueProductSchema } from '@app/containers/DailyReports/constants/daily-report.schemas'
import ProductInfo from '@app/containers/DailyReports/DailyReportDetail/components/ProductInfo'
import NumberInput from '@app/components/NumberInput'
import Combobox from '@app/components/Combobox'

type IssueProductValue = z.infer<typeof issueProductSchema>

const defaultIssueProductValue: DefaultValues<IssueProductValue> = {
  issue: undefined,
  product: undefined,
  weight: undefined,
  quantity: undefined,
  notes: []
}
const IssueProducts = () => {
  const { data: products } = useGetProducts()
  const { data: productIssues } = useGetProductIssues()

  const { control, watch } = useFormContext()
  const {
    append: issueProductsAppend,
    remove: issueProductsRemove,
    fields: issueProductsFields
  } = useFieldArray({
    control: control,
    name: 'issueProducts'
  })

  const productOptions = generateMultiSelectOptions({
    data: products?.data || [],
    labelKey: 'code',
    valueKey: 'id',
    valueAsObject: true
  })
  const productIssuesOptions = generateMultiSelectOptions({
    data: productIssues?.data || [],
    labelKey: 'code',
    valueKey: 'id',
    valueAsObject: true
  })

  return (
    <div className='space-y-4'>
      <div className='flex justify-start gap-4 items-center'>
        <Typography className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
          Issue products
        </Typography>
        <Button onClick={() => issueProductsAppend(defaultIssueProductValue)} type='button' variant='ghost' size='sm'>
          <PlusIcon />
        </Button>
      </div>
      {issueProductsFields.map((issueProductsField, index) => {
        const selectedProduct = watch(`issueProducts.${index}.product`)

        return (
          <div
            key={issueProductsField.id}
            className='flex justify-between mb-4 items-start border border-solid border-neutral-200 rounded-sm p-2 pl-4 pb-4'
          >
            <div className='w-[95%] space-y-2'>
              <div className='w-full gap-4'>
                <div className=''>
                  <ProductInfo
                    parentName={`issueProducts.${index}.product`}
                    synDataFrom={`issueProducts.${index}`}
                    isShowWeightQuantity={false}
                  />
                </div>
                <div className='flex flex-col desktop:flex-row gap-4 mt-2'>
                  <div className='desktop:w-4/12'>
                    <FormField
                      control={control}
                      name={`issueProducts.${index}.issue`}
                      label={'Issue'}
                      renderComponent={({ field }) => (
                        <Combobox
                          {...field}
                          onValueChange={field.onChange}
                          options={productIssuesOptions}
                          placeholder={'Select issue'}
                          valueKey={'id'}
                        />
                      )}
                    />
                  </div>
                  <div className='desktop:w-3/12'>
                    <FormField
                      control={control}
                      name={`issueProducts.${index}.weight`}
                      label={'Weight'}
                      renderComponent={({ field }) => (
                        <NumberInput {...field} onChange={(value) => field.onChange(value)} placeholder='Weight' />
                      )}
                    />
                  </div>
                  <div className='desktop:w-3/12'>
                    <FormField
                      control={control}
                      name={`issueProducts.${index}.quantity`}
                      label={`Quantity ${selectedProduct?.info?.unit ? `(${selectedProduct.info.unit})` : ''}`}
                      renderComponent={({ field }) => (
                        <NumberInput {...field} onChange={(value) => field.onChange(value)} placeholder='Quantity' />
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Button
                onClick={() => issueProductsRemove(index)}
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
        <Button onClick={() => issueProductsAppend(defaultIssueProductValue)} type='button' size='sm'>
          <PlusIcon />
        </Button>
      </div>
    </div>
  )
}

export default IssueProducts
