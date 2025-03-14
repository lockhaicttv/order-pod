'use client'
import OrderList from '@app/containers/Orders2/OrderList'
import { Suspense } from 'react'

const OrderListPage = () => {
  return (
    <Suspense>
      <OrderList />
    </Suspense>
  )
}

export default OrderListPage
