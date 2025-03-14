import { z } from 'zod'
import { stageSchema } from '@app/containers/Stages/constants/stage.schemas' // Adjust the import path as needed
import { productSchema } from '@app/containers/Products/constants/product.schemas' // Adjust the import path as needed

// Define the baseToolSchema
const baseToolSchema = z.object({
  id: z.string(), // id is a required string
  name: z.string(), // name is a nullable string
  code: z.string() // code is a required string
})

// Define the toolSchema
const toolSchema = baseToolSchema.extend({
  cavity: z.number().int().nonnegative(), // cavity must be a non-negative integer
  stage: stageSchema, // stage is validated using the existing stageSchema
  outputProduct: productSchema.nullable(), // outputProduct is validated using the existing productSchema
  volume: z.number().nonnegative()
})

const creatToolSchema = toolSchema.omit({
  id: true
})

export { baseToolSchema, toolSchema, creatToolSchema }
