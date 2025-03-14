'use client'

import logo from '@app/assets/logo/logo-rectangle-2.png'
import styled from 'styled-components'
import { Button } from '@app/components/ui/button'
import { DragHandleHorizontalIcon } from '@radix-ui/react-icons'
import useStore from '@app/store/useStore'
import Search from '@app/components/Layout/components/Search'
import Link from 'next/link'
import Image from 'next/image'
import LanguageChanger from '@app/components/Layout/components/LanguageChanger'
import ModeToggle from '@app/components/ModeToggle'
import { PanelLeftIcon } from 'lucide-react'

const Header = () => {
  const { toggleNavigation, broken } = useStore((state) => state)
  return (
    <HeaderStyled className='flex h-16 desktop:h-20 align-middle bg-white'>
      <div className='w-1/2 tablet:w-1/4 desktop:w-1/3'>
        <div className='flex h-full'>
          <div className='flex items-center justify-start'>
            <Link href='/' className='flex items-center w-full h-full overflow-hidden pl-4 py-0.5'>
              <Image
                src={logo}
                style={{
                  height: '100%',
                  width: '90%'
                }}
                alt='header-logo'
              />
            </Link>
          </div>
        </div>
      </div>
      <div className='tablet:flex w-0 tablet:w-2/4 h-full items-center hidden'>
        <Search />
      </div>

      <div className='flex justify-end w-1/2 tablet:w-1/4 desktop:w-1/3 items-center pr-2'>
        <ModeToggle />
        <LanguageChanger />
        {broken && (
          <Button variant='ghost' size='icon' onClick={() => toggleNavigation(true)}>
            <PanelLeftIcon size={20} color='white' />
          </Button>
        )}
      </div>
    </HeaderStyled>
  )
}

export default Header

const HeaderStyled = styled.div`
  //border-bottom: solid 1px;
  //border-bottom-color: #efefef;
  //position: fixed;
  //top: 0;
  //width: 100%;
  //z-index: 99;
  background: hsl(var(--primary));
`
