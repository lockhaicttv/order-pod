import { z } from 'zod'
import { baseOrderSchema, orderDetailSchema } from '@app/containers/Orders/constants/order.schemas'
import { customerSchema } from '@app/containers/Customers/constants/customer.schemas'
import { baseStageSchema, stageSchema } from '@app/containers/Stages/constants/stage.schemas'
import { baseMachineSchema } from '@app/containers/Machines/constants/machine.schemas'
import { toolSchema } from '@app/containers/Tools/constants/tool.schemas'
import { baseProductSchema } from '@app/containers/Products/constants/product.schemas'

// Define the schedule schema
const scheduleSchema = z
  .object({
    id: z.string().nullable(),
    startDate: z.string(), // ISO 8601 date string
    endDate: z.string(), // ISO 8601 date string
    projectStartDate: z.string(), // ISO 8601 date string
    projectEndDate: z.string(), // ISO 8601 date string
    order: baseOrderSchema,
    customer: customerSchema,
    orderDetail: orderDetailSchema,
    employee: z.number().int().nonnegative().nullable(),
    machines: z.array(baseMachineSchema),
    tools: z.array(
      toolSchema
        .omit({
          stage: true
        })
        .extend({
          stage: baseStageSchema.nullable().default(null)
        })
    ),
    outputProduct: baseProductSchema,
    weightQuota: z.number().nonnegative()
  })
  .refine((data) => new Date(data.startDate) < new Date(data.endDate), {
    message: 'Start date must be earlier than end date',
    path: ['startDate'] // path is optional and will show the error at the startDate field
  })

// Define the planDetail schema
const planDetailSchema = z.object({
  id: z.string().optional(),
  stage: baseStageSchema,
  schedule: z.array(scheduleSchema)
})

// Define the plan schema
const planSchema = z.object({
  id: z.string(),
  code: z.string(),
  orders: z.array(baseOrderSchema),
  customers: z.array(customerSchema),
  status: z.string(),
  type: z.string(),
  detail: z.array(planDetailSchema)
})

const createPlanPayloadSchema = planSchema.omit({
  id: true
})

export { scheduleSchema, planDetailSchema, planSchema, createPlanPayloadSchema }
