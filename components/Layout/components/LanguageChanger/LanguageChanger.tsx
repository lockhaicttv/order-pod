import React, { useEffect } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@app/components/ui/dropdown-menu'
import { Button, ButtonProps } from '@app/components/ui/button'
import { Globe2Icon } from 'lucide-react'
import { useParams, usePathname, useRouter } from 'next/navigation'

const languageOption = [
  { label: 'English', value: 'en' },
  { label: 'French', value: 'fr' },
  { label: 'Vietnam', value: 'vi' }
]

interface Props {
  variant?: ButtonProps['variant']
}

const LanguageChanger = ({ variant }: Props) => {
  const [language, setLanguage] = React.useState('en')
  const router = useRouter()
  const pathname = usePathname()
  const { locale } = useParams()
  const handleChange = (language: string) => {
    router.push(pathname.replace(locale as string, language))
  }

  useEffect(() => {
    if (locale && locale !== language) {
      setLanguage(locale as string)
    }
  }, [])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant || 'ghost'} size='icon' className='rounded-full px-2 py-1'>
          <Globe2Icon size={18} color='white' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>Language</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={language}
          onValueChange={(value) => {
            setLanguage(value)
            handleChange(value)
          }}
        >
          {languageOption.map((option) => (
            <DropdownMenuRadioItem value={option.value} key={option.value}>
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LanguageChanger
