import React from 'react'
import useGetProducts from '@app/containers/Products/hooks/useGetProducts'
import { generateMultiSelectOptions } from '@app/utils/generateSelectOptions'
import useGetOrders from '@app/containers/Orders/hooks/useGetOrders'
import useGetCustomers from '@app/containers/Customers/hooks/useGetCustomers'
import useGetTools from '@app/containers/Tools/hooks/useGetTools'
import MultiSelectHook from '@app/components/Form/MultiSelectHook/MultiSelectHook'
import { Tool } from '@app/containers/Tools/types/tool.types'
import useGetMachines from '@app/containers/Machines/hooks/useGetMachines'
import FormField from '@app/components/Form/FormField'
import { useFormContext } from 'react-hook-form'
import DatePicker from '@app/components/DatePicker'
import { Machine } from '@app/containers/Machines/types/machine.types'
import NumberInput from '@app/components/NumberInput'
import Combobox from '@app/components/Combobox'

interface Props {
  index: number
}
const Schedule = ({ index }: Props) => {
  const { data: products } = useGetProducts()
  const { data: orders } = useGetOrders()
  const { data: customers } = useGetCustomers()
  const { data: tools } = useGetTools()
  const { data: machines } = useGetMachines()
  const { control } = useFormContext()

  const productOptions = generateMultiSelectOptions({
    data: products?.data || [],
    labelKey: 'code',
    valueKey: 'id',
    valueAsObject: true
  })
  const orderOptions = generateMultiSelectOptions({
    data: orders?.data || [],
    labelKey: 'code',
    valueKey: 'id',
    valueAsObject: true
  })
  const customerOptions = generateMultiSelectOptions({
    data: customers?.data || [],
    labelKey: 'name',
    valueKey: 'id',
    valueAsObject: true
  })
  const toolOptions = generateMultiSelectOptions({
    data: tools?.data || [],
    labelKey: 'code',
    valueKey: 'id',
    valueAsObject: true
  })
  const machineOptions = generateMultiSelectOptions({
    data: machines?.data || [],
    labelKey: 'code',
    valueKey: 'id',
    valueAsObject: true
  })

  return (
    <div className='space-y-4 w-full'>
      <div className='flex w-full gap-4'>
        <div className='w-1/3'>
          <FormField
            control={control}
            name={`schedule.${index}.outputProduct`}
            label={'Output product'}
            renderComponent={({ field }) => (
              <Combobox
                onValueChange={field.onChange}
                {...field}
                options={productOptions}
                placeholder={'Select output product'}
                valueKey={'id'}
              />
            )}
          />
        </div>
        <div className='w-1/3'>
          <FormField
            control={control}
            name={`schedule.${index}.customer`}
            label={'Customer'}
            renderComponent={({ field }) => (
              <Combobox
                onValueChange={field.onChange}
                {...field}
                options={customerOptions}
                placeholder={'Select customer'}
                valueKey={'id'}
              />
            )}
          />
        </div>
        <div className='w-1/3'>
          <FormField
            control={control}
            name={`schedule.${index}.order`}
            label={'Order'}
            renderComponent={({ field }) => (
              <Combobox
                onValueChange={field.onChange}
                {...field}
                options={orderOptions}
                placeholder={'Select order'}
                valueKey={'id'}
              />
            )}
          />
        </div>
      </div>
      <div className='flex gap-4'>
        <div className='desktop:w-2/3'>
          <FormField
            control={control}
            name={`schedule.${index}.tools`}
            label={'Tools'}
            renderComponent={({ field }) => (
              <MultiSelectHook<Tool>
                value={field.value}
                onChange={field.onChange}
                options={toolOptions}
                filterByKey={'id'}
              />
            )}
          />
        </div>
        <div className='desktop:w-1/3'>
          <FormField
            control={control}
            name={`schedule.${index}.employee`}
            label={'Employee'}
            renderComponent={({ field }) => <NumberInput {...field} onChange={(value) => field.onChange(value)} />}
          />
        </div>
      </div>
      <div className='desktop:col-span-3'></div>
      <div className='desktop:col-span-3'></div>
      <div className='flex gap-4'>
        <div className='desktop:w-2/3'>
          <FormField
            control={control}
            name={`schedule.${index}.machines`}
            label={'Machines'}
            renderComponent={({ field }) => (
              <MultiSelectHook<Machine>
                value={field.value}
                onChange={field.onChange}
                options={machineOptions}
                filterByKey={'id'}
              />
            )}
          />
        </div>
        <div className='desktop:w-1/3'>
          <FormField
            control={control}
            name={`schedule.${index}.weightQuota`}
            label={'Weight Quota'}
            renderComponent={({ field }) => <NumberInput {...field} onChange={(value) => field.onChange(value)} />}
          />
        </div>
      </div>
      <div className='flex gap-4'>
        <div className='desktop:w-1/2'>
          <FormField
            control={control}
            name={`schedule.${index}.startDate`}
            label={'Start date'}
            renderComponent={({ field }) => (
              <DatePicker {...field} onChange={(date) => field.onChange(date?.toISOString())} />
            )}
          />
        </div>
        <div className='desktop:w-1/2'>
          <FormField
            control={control}
            name={`schedule.${index}.endDate`}
            label={'End date'}
            renderComponent={({ field }) => (
              <DatePicker {...field} onChange={(date) => field.onChange(date?.toISOString())} />
            )}
          />
        </div>
      </div>
    </div>
  )
}

export default Schedule
