import React from 'react'
import useGetStages from '@app/containers/Stages/hooks/useGetStages'
import useGetProducts from '@app/containers/Products/hooks/useGetProducts'
import { generateMultiSelectOptions } from '@app/utils/generateSelectOptions'
import NumberInput from '@app/components/NumberInput'
import FormField from '@app/components/Form/FormField'
import { useFormContext } from 'react-hook-form'
import Combobox from '@app/components/Combobox'

interface Props {
  index: number
}
const Detail = ({ index }: Props) => {
  const { control } = useFormContext()

  const { data: stages } = useGetStages()
  const { data: products } = useGetProducts()
  const stageOptions = generateMultiSelectOptions({
    data: stages?.data,
    labelKey: 'code',
    valueKey: 'id',
    valueAsObject: true
  })
  const productOptions = generateMultiSelectOptions({
    data: products?.data,
    labelKey: 'code',
    valueKey: 'id',
    valueAsObject: true
  })

  return (
    <div className='grid grid-cols-6 tablet:grid-cols-6 desktop:grid-cols-11 gap-4'>
      <div className='col-span-3 tablet:col-span-2 desktop:col-span-1'>
        <FormField
          control={control}
          name={`detail.${index}.stageOrder`}
          label={`Order`}
          renderComponent={({ field }) => (
            <NumberInput
              {...field}
              value={field.value}
              onChange={(value) => field.onChange(value)}
              placeholder='Stage order'
            />
          )}
        />
      </div>
      <div className='col-span-3 tablet:col-span-2 desktop:col-span-2'>
        <FormField
          control={control}
          name={`detail.${index}.exchangeRate`}
          label={`Exchange Rate`}
          renderComponent={({ field }) => (
            <NumberInput
              {...field}
              value={field.value}
              onChange={(value) => field.onChange(value)}
              placeholder='Exchange rate'
              min={0}
              max={1}
            />
          )}
        />
      </div>
      <div className='col-span-3 tablet:col-span-2 desktop:col-span-2'>
        <FormField
          control={control}
          name={`detail.${index}.backupRate`}
          label={`Backup Rate`}
          renderComponent={({ field }) => (
            <NumberInput
              {...field}
              value={field.value}
              onChange={(value) => field.onChange(value)}
              placeholder='Backup rate'
              min={0}
              max={1}
            />
          )}
        />
      </div>
      <div className='col-span-3 tablet:col-span-2 desktop:col-span-2'>
        <FormField
          control={control}
          name={`detail.${index}.stage`}
          label={'Stage'}
          renderComponent={({ field }) => (
            <Combobox
              onValueChange={field.onChange}
              value={field.value}
              options={stageOptions}
              name={'stage'}
              placeholder={'Select stage'}
              valueKey={'id'}
            />
          )}
        />
      </div>
      <div className='col-span-3 tablet:col-span-2 desktop:col-span-2'>
        <FormField
          control={control}
          name={`detail.${index}.input`}
          label={'Input'}
          renderComponent={({ field }) => (
            <Combobox
              {...field}
              onValueChange={field.onChange}
              options={productOptions}
              placeholder={'Select input'}
              valueKey={'id'}
            />
          )}
        />
      </div>
      <div className='col-span-3 tablet:col-span-2 desktop:col-span-2'>
        <FormField
          control={control}
          name={`detail.${index}.output`}
          label={'Output'}
          renderComponent={({ field }) => (
            <Combobox
              {...field}
              onValueChange={field.onChange}
              options={productOptions}
              placeholder={'Select output'}
              valueKey={'id'}
            />
          )}
        />
      </div>
    </div>
  )
}

export default Detail
