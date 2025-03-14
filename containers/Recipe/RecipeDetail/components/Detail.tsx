import React from 'react'
import NumberInput from '@app/components/NumberInput'
import FormField from '@app/components/Form/FormField'
import { DefaultValues, useFieldArray, useFormContext } from 'react-hook-form'
import useGetProducts from '@app/containers/Products/hooks/useGetProducts'
import { generateMultiSelectOptions } from '@app/utils/generateSelectOptions'
import { Typography } from '@app/components/ui/typography'
import { Button } from '@app/components/ui/button'
import { z } from 'zod'
import { recipeDetailSchema } from '@app/containers/Recipe/constants/recipe.schemas'
import { PlusIcon } from '@radix-ui/react-icons'
import { XIcon } from 'lucide-react'
import Combobox from '@app/components/Combobox'

const Detail = () => {
  const { control } = useFormContext()
  const { data: products, isLoading: isGettingProducts } = useGetProducts()
  const {
    append: recipeDetailAppend,
    remove: recipeDetailRemove,
    fields: recipeDetailFields
  } = useFieldArray({
    control,
    name: 'detail'
  })
  const productOptions = generateMultiSelectOptions({
    data: products?.data || [],
    labelKey: 'code',
    valueKey: 'id',
    valueAsObject: true
  })

  return (
    <div>
      <div className='mb-4 flex gap-2 items-center'>
        <Typography className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
          Recipe details
        </Typography>
        <Button
          onClick={() =>
            recipeDetailAppend({
              material: undefined,
              weight: undefined
            } as DefaultValues<z.infer<typeof recipeDetailSchema>>)
          }
          variant='ghost'
          size='sm'
          className='h-full'
          type='button'
        >
          <PlusIcon />
        </Button>
      </div>
      {recipeDetailFields.map((recipeDetailField, index) => (
        <div
          className='flex space-x-2 mb-4 justify-between items-start border rounded-sm p-4 pr-1'
          key={recipeDetailField.id}
        >
          <div className='grid grid-cols-4 gap-4'>
            <div className='desktop:col-span-3'>
              <FormField
                label='Material'
                name={`detail.${index}.material`}
                renderComponent={({ field }) => (
                  <Combobox
                    {...field}
                    onValueChange={field.onChange}
                    options={productOptions}
                    valueKey={'id'}
                    placeholder={'Select material'}
                  />
                )}
              />
            </div>
            <div className='desktop:col-span-1'>
              <FormField
                control={control}
                name={`detail.${index}.weight`}
                label={`Weight`}
                renderComponent={({ field }) => (
                  <NumberInput
                    {...field}
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                    placeholder='Input weight'
                  />
                )}
              />
            </div>
          </div>
          <Button onClick={() => recipeDetailRemove(index)} variant='ghost' size='sm' className='h-full'>
            <XIcon size={15} />
          </Button>
        </div>
      ))}
      <div className='flex justify-center'>
        <Button
          onClick={() =>
            recipeDetailAppend({
              material: '',
              quantity: 0
            })
          }
          type='button'
          size='sm'
        >
          <PlusIcon />
        </Button>
      </div>
    </div>
  )
}

export default Detail
