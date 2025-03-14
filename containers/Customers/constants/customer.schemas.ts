import { z } from 'zod'

// Define the customer schema
const customerSchema = z.object({
  id: z.string(),
  name: z.string()
})

// Define the createCustomer schema
const createCustomerSchema = customerSchema.omit({ id: true })

// Define the deleteCustomersParams schema
const deleteCustomersParamsSchema = z.object({
  id: z.array(z.string())
})

// Define the getMachineParams schema
const getMachineParamsSchema = z.object({
  id: z.string()
})

// Define the updateCustomerPayload schema
const updateCustomerPayloadSchema = customerSchema

export {
  customerSchema,
  createCustomerSchema,
  deleteCustomersParamsSchema,
  getMachineParamsSchema,
  updateCustomerPayloadSchema
}
