import React from 'react'
import Select from '@app/components/Select'
import { generateMultiSelectOptions } from '@app/utils/generateSelectOptions'
import useGetMachines from '@app/containers/Machines/hooks/useGetMachines'
import FormField from '@app/components/Form/FormField'
import { DefaultValues, useFieldArray, useFormContext } from 'react-hook-form'
import { Typography } from '@app/components/ui/typography'
import { Button } from '@app/components/ui/button'
import { PlusIcon } from '@radix-ui/react-icons'
import { XIcon } from 'lucide-react'
import MaterialsInput from '@app/containers/DailyReports/DailyReportDetail/components/MaterialsInput'
import ProductInfo from '@app/containers/DailyReports/DailyReportDetail/components/ProductInfo'
import { z } from 'zod'
import { producingInfoSchema } from '@app/containers/DailyReports/constants/daily-report.schemas'
import { Label } from '@app/components/ui/label'
import Combobox from '@app/components/Combobox'

type ProducingInfoValue = z.infer<typeof producingInfoSchema>

const defaultIssueProductValue: DefaultValues<ProducingInfoValue> = {
  input: [],
  output: undefined,
  machine: undefined
}

const ProducingInfo = () => {
  const { data: machines } = useGetMachines()
  const { control } = useFormContext()
  const {
    append: producingInfosAppend,
    remove: producingInfosRemove,
    fields: producingInfosFields
  } = useFieldArray({
    control: control,
    name: 'producingInfos'
  })

  const machineOptions = generateMultiSelectOptions({
    data: machines?.data || [],
    labelKey: 'code',
    valueKey: 'id',
    valueAsObject: true
  })

  return (
    <div>
      <div className='mb-4 flex justify-start gap-4 items-center'>
        <Typography className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
          Producing Information
        </Typography>
        <Button
          onClick={() => producingInfosAppend(defaultIssueProductValue)}
          type='button'
          variant='ghost'
          size='icon'
          className='rounded-full hover:bg-primary hover:text-white text-primary dark:text-white'
        >
          <PlusIcon />
        </Button>
      </div>
      {producingInfosFields.map((producingInfosField, index) => (
        <div
          className='flex justify-between mb-4 items-start border border-solid border-neutral-200 rounded-sm p-2 pl-4 pb-4'
          key={producingInfosField.id}
        >
          <div className='w-11/12'>
            <div className='space-y-4 w-full'>
              <div className=''>
                <div className='w-full desktop:w-2/3'>
                  <FormField
                    control={control}
                    name={`producingInfos.${index}.machine`}
                    label={'Machine'}
                    renderComponent={({ field }) => (
                      <Combobox
                        {...field}
                        placeholder='Select machine'
                        onValueChange={field.onChange}
                        options={machineOptions}
                        valueKey={'id'}
                      />
                    )}
                  />
                </div>
              </div>
              <div className=''>
                <MaterialsInput producingInfoIndex={index} />
              </div>
              {/*<div className=''>*/}
              {/*  <Label>Input</Label>*/}
              {/*  <ProductInfo parentName={`producingInfos.${index}.input`} />*/}
              {/*</div>*/}
              <div className=''>
                <Label>Output</Label>
                <ProductInfo parentName={`producingInfos.${index}.output`} />
              </div>
            </div>
          </div>

          <Button
            onClick={() => producingInfosRemove(index)}
            variant='ghost'
            size='icon'
            className='rounded-full hover:bg-primary hover:text-white text-primary dark:text-white'
          >
            <XIcon size={15} />
          </Button>
        </div>
      ))}
      <div className='flex justify-center'>
        <Button onClick={() => producingInfosAppend(defaultIssueProductValue)} type='button' size='sm'>
          <PlusIcon />
        </Button>
      </div>
    </div>
  )
}

export default ProducingInfo
