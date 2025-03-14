'use client'
import OrderList from '@app/containers/Orders/OrderList'
import { Suspense } from 'react'

const OrderListPage = () => {
  return (
    <Suspense>
      <OrderList />
    </Suspense>
  )
}

export default OrderListPage
