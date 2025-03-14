import { z } from 'zod'
import { baseRecipeSchema } from '@app/containers/Recipe/constants/recipe.schemas'
import { baseProcessSchema } from '@app/containers/Processes/constants/process.schemas'

// Define the baseProduct schema
const baseProductSchema = z.object({
  id: z.string().nullable(),
  code: z.string(),
  name: z.string()
})

// Define the product schema
const productSchema = baseProductSchema.extend({
  type: z.string(),
  unit: z.string(),
  weight: z.number().nonnegative(),
  recipe: z.lazy(() => baseRecipeSchema.nullable().optional()),
  process: z.lazy(() => baseProcessSchema.nullable().optional())
})

const createProductPayloadSchema = productSchema.omit({
  id: true
})

export { baseProductSchema, productSchema, createProductPayloadSchema }
