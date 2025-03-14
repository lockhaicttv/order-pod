import { z } from 'zod'
import { baseProductSchema } from '@app/containers/Products/constants/product.schemas'
import { stageSchema } from '@app/containers/Stages/constants/stage.schemas'

// Define the baseProcess schema
const baseProcessSchema = z.object({
  id: z.string(),
  code: z.string()
})

// Define the processDetail schema
const processDetailSchema = z.object({
  stageOrder: z.number().int().nonnegative(),
  stage: stageSchema.nullable(),
  exchangeRate: z.coerce.number().min(0).max(1).nonnegative().default(1),
  backupRate: z.coerce.number().min(0).max(1).nonnegative().default(0),
  input: z.lazy(() => baseProductSchema.nullable()),
  output: z.lazy(() => baseProductSchema)
})

// Define the process schema
const processSchema = baseProcessSchema.extend({
  product: z.lazy(() => baseProductSchema),
  detail: z.array(processDetailSchema)
})

// Define the createProcessPayload schema
const createProcessPayloadSchema = z.object({
  code: z.string(),
  product: z.lazy(() => baseProductSchema.nullable().optional()),
  detail: z.array(
    z.object({
      stageOrder: z.number().int().nonnegative(),
      exchangeRate: z.number().nonnegative(),
      backupRate: z.number().nonnegative(),
      input: z.lazy(() => baseProductSchema.nullable().optional()),
      output: z.lazy(() => baseProductSchema.nullable().optional()),
      stage: stageSchema.nullable().optional()
    })
  )
})

// Define the updateProcessPayload schema
const updateProcessPayloadSchema = createProcessPayloadSchema.extend({
  id: z.string()
})

export { baseProcessSchema, processDetailSchema, processSchema, createProcessPayloadSchema, updateProcessPayloadSchema }
