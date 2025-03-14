import React from 'react'
import styled from 'styled-components'
import { Cloud, CloudUpload } from 'lucide-react'
import { Typography } from '@app/components/ui/typography'
import classNames from 'classnames'

export type ImageUploadProps = {
  hoverLabel?: string
  dropLabel?: string
  value: {
    file: File
    url: string
  }
  onChange: (value: { file: File; url: string }) => void
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  hoverLabel = 'Click or drag to upload file',
  dropLabel = 'Drop file here',
  value,
  onChange
}) => {
  const [labelText, setLabelText] = React.useState<string>(hoverLabel)
  const handleChangeFile = (files: FileList) => {
    const newImages = [...(files as any)].map((file) => ({
      url: URL.createObjectURL(file),
      file
    }))
    onChange(newImages?.[0])
  }

  const stopDefaults = (e: React.DragEvent) => {
    e.stopPropagation()
    e.preventDefault()
  }

  const dragEvents = {
    onDragEnter: (e: React.DragEvent) => {
      stopDefaults(e)
      setLabelText(dropLabel)
    },
    onDragLeave: (e: React.DragEvent) => {
      stopDefaults(e)
      setLabelText(hoverLabel)
    },
    onDragOver: stopDefaults,
    onDrop: (e: React.DragEvent<HTMLElement>) => {
      stopDefaults(e)
      setLabelText(hoverLabel)
      const files = e.dataTransfer.files
      if (files) {
        handleChangeFile(files)
      }
    }
  }

  return (
    <ImageUploadStyled
      className='flex h-full w-full justify-center items-center  relative min-h-48 min-w-48'
      backgroundImage={value?.url}
    >
      <div
        className={classNames('h-full w-full absolute right-0 left-0 border-dashed border-4 hover:opacity-70', {
          'opacity-0': value?.url
        })}
      >
        <input
          accept='image/*'
          className='hidden'
          id='file-upload'
          type='file'
          onChange={(e) => e.target.files && handleChangeFile(e.target.files)}
        />

        <label htmlFor='file-upload' {...dragEvents} className='root'>
          <div className='noMouseEvent h-full w-full bg-white'>
            <CloudUpload />
            <Typography>{labelText}</Typography>
          </div>
        </label>
      </div>
    </ImageUploadStyled>
  )
}

interface ImageUploadStyledProps {
  backgroundImage?: string
}

const ImageUploadStyled = styled.div<ImageUploadStyledProps>`
  background: url('${({ backgroundImage }) => backgroundImage}') no-repeat center;
  background-size: contain;

  .root {
    height: 100%;
    width: 100%;
    cursor: pointer;
    text-align: center;
    display: flex;
    justify-content: center;

    &:hover p,
    &:hover svg,
    & img {
      opacity: 1;
    }

    & p,
    svg {
      opacity: 0.4;
    }

    &:hover img {
      opacity: 0.3;
    }
  }

  .noMouseEvent {
    pointer-events: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .iconText {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    position: absolute;
  }

  .hidden {
    display: none;
  }

  .onDragOver {
    & img {
      opacity: 0.3;
    }

    & p,
    svg {
      opacity: 1;
    }
  }
`

export default ImageUpload
