'use client'

import React from 'react'
import loginLeftImage from '@app/assets/login/login-left-image.png'
import Image from 'next/image'
import LoginForm from '@app/containers/Login/components/LoginForm'
import LanguageChanger from '@app/components/Layout/components/LanguageChanger'
import styled from 'styled-components'
import logoImage from '@app/assets/logo/logo-2.png'
import ModeToggle from '@app/components/ModeToggle'

const Login = () => {
  return (
    <LoginStyled className='h-screen w-full flex bg-white dark:bg-black'>
      <div className='h-full desktop:w-1/2 tabletLandscape:w-1/2 tablet:w-1/2 mobile:w-0'>
        <Image
          src={loginLeftImage}
          style={{
            height: '100%',
            width: '100%',
            objectFit: 'cover'
          }}
          alt='login-left-image'
        />
      </div>
      <div className='desktop:w-1/2 tabletLandscape:w-1/2 tablet:w-1/2 mobile:w-full flex flex-col'>
        <div className='flex items-center justify-end gap-2 p-4'>
          <Image
            src={logoImage}
            style={{
              height: '40px',
              width: '40px'
            }}
            alt='logo-icon'
          />
          <ModeToggle variant='default' />
          <LanguageChanger variant='default' />
        </div>
        <div className='flex items-center justify-center mt-14'>
          <LoginForm />
        </div>
      </div>
    </LoginStyled>
  )
}

export default Login

const LoginStyled = styled.div`
  @media only screen and (max-width: 768px) {
    background-image: url(${loginLeftImage.src});
  }
`
