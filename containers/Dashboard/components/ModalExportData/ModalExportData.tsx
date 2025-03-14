import { Button } from '@app/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@app/components/ui/dialog'
import React, { useEffect } from 'react'
import { CloudDownloadIcon } from 'lucide-react'
import DatePicker from '@app/components/DatePicker'
import { Form } from '@app/components/ui/form'
import FormField from '@app/components/Form/FormField'
import { DefaultValues, useForm } from 'react-hook-form'
import useGetExportFileTypes from '@app/containers/Dashboard/hooks/useGetExportFileTypes'
import Combobox from '@app/components/Combobox'
import BackDrop from '@app/components/BackDrop/BackDrop'
import useDownloadExportFile from '@app/containers/Dashboard/hooks/useDownloadExportFile'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { exportFileSchema } from '@app/containers/Dashboard/constants/dashboard.schemas'
import dayjs from 'dayjs'

const defaultValues: DefaultValues<z.infer<typeof exportFileSchema>> = {
  exportType: '',
  startDate: '',
  endDate: ''
}
const b64toBlob = (b64Data: string, contentType = '', sliceSize = 512) => {
  const byteCharacters = atob(b64Data)
  const byteArrays = []
  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize)

    const byteNumbers = new Array(slice.length)
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }

    const byteArray = new Uint8Array(byteNumbers)
    byteArrays.push(byteArray)
  }

  const blob = new Blob(byteArrays, { type: contentType })
  return blob
}
const ModalExportData = () => {
  const form = useForm<z.infer<typeof exportFileSchema>>({
    resolver: zodResolver(exportFileSchema),
    defaultValues: {
      ...defaultValues
    }
  })
  const {
    handleSubmit,
    formState: { isDirty }
  } = form
  const { data: fileTypes, isLoading: isGettingFileTypes } = useGetExportFileTypes()
  const { mutate: mutateExportFile, isPending: isDownloadingExportFile } = useDownloadExportFile()

  const fileTypeOptions =
    fileTypes?.data.map((fileType) => ({
      label: fileType,
      value: fileType
    })) || []

  const onSubmit = (values: z.infer<typeof exportFileSchema>) => {
    const { startDate, endDate, exportType } = values

    mutateExportFile(
      {
        ...values,
        startDate,
        endDate
      },
      {
        onSuccess: (data) => {
          if (data) {
            const url = window.URL.createObjectURL(b64toBlob(data))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute(
              'download',
              `${exportType}-${dayjs(startDate).format('YYYY-MM-DD')}-${dayjs(endDate).format('YYYY-MM-DD')}.xlsx`
            )
            document.body.appendChild(link)
            link.click()
          }
        }
      }
    )
  }

  return (
    <Dialog>
      <BackDrop isLoading={isGettingFileTypes} />
      <DialogTrigger asChild>
        <Button className='flex gap-2' type='button'>
          <CloudDownloadIcon />
          Export
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Export Data</DialogTitle>
              <DialogDescription>Please fulfill the form below before export data</DialogDescription>
            </DialogHeader>
            <div className='space-y-2'>
              <FormField
                control={form.control}
                name='startDate'
                label={'Start date'}
                rules={{
                  required: true
                }}
                renderComponent={({ field }) => (
                  <DatePicker
                    value={field?.value ? new Date(field.value) : undefined}
                    onChange={(date) => field.onChange(date?.toISOString())}
                  />
                )}
              />
              <FormField
                control={form.control}
                name='endDate'
                label={'End date'}
                rules={{
                  required: true
                }}
                renderComponent={({ field }) => (
                  <DatePicker
                    value={field?.value ? new Date(field.value) : undefined}
                    onChange={(date) => field.onChange(date?.toISOString())}
                  />
                )}
              />
              <FormField
                control={form.control}
                name={`exportType`}
                label={'Export type'}
                rules={{
                  required: true
                }}
                renderComponent={({ field }) => (
                  <Combobox
                    {...field}
                    onValueChange={field.onChange}
                    options={fileTypeOptions}
                    placeholder='Select file type'
                  />
                )}
              />
            </div>
            <DialogFooter className='mt-4'>
              <Button type='submit' disabled={!isDirty || isDownloadingExportFile} isLoading={isDownloadingExportFile}>
                Export
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default ModalExportData
