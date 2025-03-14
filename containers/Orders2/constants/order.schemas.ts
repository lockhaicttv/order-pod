import { z } from 'zod'
import { baseProductSchema } from '@app/containers/Products/constants/product.schemas'
import { customerSchema } from '@app/containers/Customers/constants/customer.schemas'

// Define the orderDetail schema
const orderDetailSchema = z.object({
  id: z.string().nullable().optional(),
  product: baseProductSchema,
  quantity: z.number().int().nonnegative()
})

// Define the baseOrderSchema
const baseOrderSchema = z.object({
  id: z.string().nullish(),
  code: z.string() // code is a required string
})

// Define the order schema
const orderSchema = baseOrderSchema.extend({
  customer: customerSchema.optional().nullable(),
  detail: z.array(orderDetailSchema),
  projectValue: z.number().nonnegative(),
  projectStartDate: z.string(),
  projectEndDate: z.string()
})

// Define the createOrderPayload schema
const createOrderPayloadSchema = orderSchema

// Define the deleteOrdersParams schema
const deleteOrdersParamsSchema = z.object({
  id: z.array(z.string())
})

// Define the getOrderParams schema
const getOrderParamsSchema = z.object({
  id: z.string()
})

// Define the updateOrderPayload schema
const updateOrderPayloadSchema = orderSchema

export {
  baseOrderSchema,
  orderDetailSchema,
  orderSchema,
  createOrderPayloadSchema,
  deleteOrdersParamsSchema,
  getOrderParamsSchema,
  updateOrderPayloadSchema
}
