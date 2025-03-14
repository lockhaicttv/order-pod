'use client'

import React from 'react'
import dynamic from 'next/dynamic'

const Login = dynamic(() => import('@app/containers/Login'), { ssr: false })
const Page = () => {
  return <Login />
}

export default Page
