'use client'

import { Input } from '@app/components/ui/input'
import { MagnifyingGlassIcon, CameraIcon } from '@radix-ui/react-icons'
import theme from '@app/utils/theme'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
const Search = () => {
  const [keyword, setKeyword] = useState('')
  const t = useTranslations()

  return (
    <div className='w-full'>
      <Input
        className='w-full'
        startIcon={<MagnifyingGlassIcon height={'20'} width='20' color={theme.colors.neutral['400']} />}
        endIcon={<CameraIcon height={'20'} width='20' color={theme.colors.neutral['400']} />}
        placeholder={t('global.searchPlaceholder')}
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
      />
    </div>
  )
}

export default Search
