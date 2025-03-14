'use client'
import React, { useEffect, useState } from 'react'
import { DefaultValues, useForm } from 'react-hook-form'
import { Form } from '@app/components/ui/form'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginPayloadSchema } from '@app/containers/Login/constants/login.schemas'
import { Input } from '@app/components/ui/input'
import FormField from '@app/components/Form/FormField'
import { Button } from '@app/components/ui/button'
import { LogInIcon, EyeIcon, EyeOffIcon } from 'lucide-react'
import Checkbox from '@app/components/Checkbox'
import useLogin from '@app/containers/Login/hooks/useLogin'
import useStore from '@app/store/useStore'
import { useParams, useRouter } from 'next/navigation'
import { DASHBOARD_ROUTE } from '@app/containers/Dashboard/constants'
import cookieStorage from '@app/utils/cookieStorage'
import logoImage from '@app/assets/logo/logo-2.png'
import Image from 'next/image'
import styled from 'styled-components'
import useSearchParams from '@app/hooks/useSearchParams'
import qs from 'qs'
import { FilterProps } from '@app/containers/TicketPlanning/types/ticket-planning.types'

type FormFields = z.infer<typeof loginPayloadSchema>

const defaultValues: DefaultValues<FormFields> = {
  userName: undefined,
  password: undefined,
  rememberMe: false
}

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const form = useForm<z.infer<typeof loginPayloadSchema>>({
    resolver: zodResolver(loginPayloadSchema),
    defaultValues: {
      ...defaultValues
    }
  })
  const token = cookieStorage.getByKey('token')
  const { setIsAuthenticated } = useStore()
  const router = useRouter()
  const { locale } = useParams()
  const { searchParams, setSearchParamsToUrl } = useSearchParams()
  const redirect = searchParams.get('redirect')

  const {
    handleSubmit,
    formState: { isDirty },
    control
  } = form

  const { mutate: mutateLogin, isPending: isLoggingIn } = useLogin()

  const onSubmit = (values: z.infer<typeof loginPayloadSchema>) => {
    const { userName, password, rememberMe } = values

    mutateLogin({
      userName,
      password
    })
  }

  useEffect(() => {
    if (!token) {
      setIsAuthenticated(false)

      return
    }

    setIsAuthenticated(true)
    router.push(`${redirect ? redirect : DASHBOARD_ROUTE}`)
  }, [token])

  return (
    <LoginFormStyled className='bg-background p-6 rounded-xl desktop:w-96 border-primary shadow-2xl shadow-primary'>
      <div className='flex items-center justify-center'>
        <div className='text-center text-4xl text-primary'>Hello!</div>
      </div>
      <div className='text-center text-sm my-2 text-foreground'>Sign in your account!</div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            control={control}
            name='userName'
            label={'Username'}
            renderComponent={({ field }) => <Input {...field} placeholder='Input your username' />}
          />
          <FormField
            control={control}
            name='password'
            label='Password'
            renderComponent={({ field }) => (
              <Input
                {...field}
                type={showPassword ? 'text' : 'password'}
                placeholder='Input your password'
                endIcon={
                  <Button variant='ghost' onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeIcon size={14} /> : <EyeOffIcon size={14} />}
                  </Button>
                }
              />
            )}
          />
          <FormField
            control={control}
            name='rememberMe'
            renderComponent={({ field }) => (
              <Checkbox name={field.name} label='Remember me' checked={field.value} onCheckedChange={field.onChange} />
            )}
          />
          <div className='flex justify-end mt-8'>
            <Button isLoading={isLoggingIn} disabled={!isDirty || isLoggingIn} type='submit'>
              <LogInIcon className='mr-2' size={14} />
              Login
            </Button>
          </div>
        </form>
      </Form>
      <div className='text-center text-sm text-primary mt-6 dark:text-foreground'>
        Contact the admin to get the account!
      </div>
    </LoginFormStyled>
  )
}

export default LoginForm

export const LoginFormStyled = styled.div`
  .end-icon {
    right: 2px;
  }
`
