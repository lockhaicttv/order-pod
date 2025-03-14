import React from 'react'
import useGetProducts from '@app/containers/Products/hooks/useGetProducts'
import { generateMultiSelectOptions } from '@app/utils/generateSelectOptions'
import { useFormContext } from 'react-hook-form'
import FormField from '@app/components/Form/FormField'
import NumberInput from '@app/components/NumberInput'
import Combobox from '@app/components/Combobox'
import { useParams } from 'next/navigation'
import useGetOrderQrCode from '../../hooks/useGetOrderQrCode'
import { Button } from '@app/components/ui/button'
import { EyeIcon, DownloadIcon } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@app/components/ui/dialog'
import { useState, useEffect } from 'react'
import { log } from 'console'
import classNames from 'classnames'

interface Props {
  index: number
  control: any
}
const Detail = ({ index, control }: Props) => {
  const { id } = useParams()
  const isEdit = !!id
  const { watch } = useFormContext()
  const selectedProduct = watch(`detail.${index}.product`)
  const { data: products } = useGetProducts()
  const { data: orderQrCode } = useGetOrderQrCode({
    orderId: id as string,
    productId: selectedProduct?.id as string
  })

  const [blobUrl, setBlobUrl] = useState<string | null>(null)

  useEffect(() => {
    if (orderQrCode) {
      const url = URL.createObjectURL(orderQrCode)
      setBlobUrl(url)
      return () => URL.revokeObjectURL(url)
    }
  }, [orderQrCode])

  const productOptions = generateMultiSelectOptions({
    data: products?.data.filter((product) => product.type === 'Thành Phẩm') || [],
    labelKey: 'code',
    valueKey: 'id',
    valueAsObject: true
  })

  return (
    <div className={classNames(['grid grid-cols-5 gap-4'])}>
      <div className='desktop:col-span-3 tablet:col-span-3 col-span-3'>
        <FormField
          control={control}
          name={`detail.${index}.product`}
          label={'Product'}
          renderComponent={({ field }) => (
            <Combobox
              onValueChange={field.onChange}
              options={productOptions}
              placeholder={'Select product'}
              valueKey={'id'}
              {...field}
            />
          )}
        />
      </div>
      <div className='desktop:col-span-2 tablet:col-span-2 col-span-2 flex justify-end items-end gap-2'>
        <FormField
          control={control}
          name={`detail.${index}.quantity`}
          label={`Quantity ${selectedProduct?.unit ? `(${selectedProduct.unit})` : ''}`}
          renderComponent={({ field }) => <NumberInput {...field} onChange={(value) => field.onChange(value)} />}
        />
        {isEdit && selectedProduct && orderQrCode && (
          <div className='desktop:col-span-1 flex justify-start items-end'>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant='outline' className='rounded-full p-1 h-[40px] w-[40px]'>
                  <EyeIcon size={16} />
                </Button>
              </DialogTrigger>
              <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                  <DialogTitle>Product QR Code</DialogTitle>
                </DialogHeader>
                <div className='flex justify-center items-center mt-2'>
                  {blobUrl && <img src={blobUrl} alt='QR Code' className='h-[400px] w-[400px]' />}
                </div>
                <div className='flex justify-center items-center'>
                  <Button
                    variant='default'
                    className='mt-4'
                    onClick={() => {
                      if (blobUrl) {
                        const link = document.createElement('a')
                        link.href = blobUrl
                        link.download = `qr_code_${selectedProduct?.code || 'product'}.png`
                        link.click()
                      }
                    }}
                  >
                    <DownloadIcon className='w-4 h-4 mr-2' />
                    Download QR Code
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </div>
  )
}

export default Detail
