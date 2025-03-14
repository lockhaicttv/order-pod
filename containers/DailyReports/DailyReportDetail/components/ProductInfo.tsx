import React, { useEffect } from 'react'
import FormField from '@app/components/Form/FormField'
import { useFormContext } from 'react-hook-form'
import { Input } from '@app/components/ui/input'
import { generateMultiSelectOptions } from '@app/utils/generateSelectOptions'
import useGetProducts from '@app/containers/Products/hooks/useGetProducts'
import NumberInput from '@app/components/NumberInput'
import classNames from 'classnames'
import Combobox from '@app/components/Combobox'

interface Props {
  parentName: string
  isShowWeightQuantity?: boolean
  synDataFrom?: string
}
const ProductInfo = ({ parentName, isShowWeightQuantity = true, synDataFrom }: Props) => {
  const { control, watch, setValue } = useFormContext()
  const { data: products } = useGetProducts()

  const parentWeight = watch(`${synDataFrom}.weight`)
  const parentQuantity = watch(`${synDataFrom}.quantity`)
  const selectedProduct = watch(`${parentName}.info`)

  useEffect(() => {
    if (synDataFrom) {
      setValue(`${synDataFrom}.product.weight`, parentWeight)
      setValue(`${synDataFrom}.product.quantity`, parentQuantity)
    }
  }, [parentWeight, parentQuantity, synDataFrom])

  const productOptions = generateMultiSelectOptions({
    data: products?.data || [],
    labelKey: 'code',
    valueKey: 'id',
    valueAsObject: true
  })

  return (
    <div className='flex flex-col desktop:flex-row tablet:flex-row gap-4 w-full'>
      <div
        className={classNames([
          {
            'desktop:w-2/12': isShowWeightQuantity
          },
          {
            'desktop:w-4/12': !isShowWeightQuantity
          }
        ])}
      >
        <FormField
          control={control}
          name={`${parentName}.code`}
          label={'Code'}
          renderComponent={({ field }) => <Input {...field} placeholder='Code' />}
        />
      </div>
      <div
        className={classNames([
          {
            'desktop:w-4/12': isShowWeightQuantity
          },
          {
            'desktop:w-8/12': !isShowWeightQuantity
          }
        ])}
      >
        <FormField
          control={control}
          name={`${parentName}.info`}
          label={'Product'}
          renderComponent={({ field }) => (
            <Combobox
              {...field}
              onValueChange={field.onChange}
              options={productOptions}
              placeholder={'Select product'}
              valueKey={'id'}
            />
          )}
        />
      </div>
      {isShowWeightQuantity && (
        <>
          <div className='desktop:w-3/12'>
            <FormField
              control={control}
              name={`${parentName}.weight`}
              label={'Weight'}
              renderComponent={({ field }) => (
                <NumberInput {...field} onChange={(value) => field.onChange(value)} placeholder='Weight' />
              )}
            />
          </div>
          <div className='desktop:w-3/12'>
            <FormField
              control={control}
              name={`${parentName}.quantity`}
              label={`Quantity ${selectedProduct?.unit ? `(${selectedProduct.unit})` : ''}`}
              renderComponent={({ field }) => (
                <NumberInput
                  {...field}
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  placeholder='Quantity'
                />
              )}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default ProductInfo
