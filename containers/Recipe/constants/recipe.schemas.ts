import { z } from 'zod'
import { baseProductSchema, productSchema } from '@app/containers/Products/constants/product.schemas'

// Define the recipeDetail schema
const recipeDetailSchema = z.object({
  material: z.lazy(() => productSchema),
  weight: z.number().nonnegative()
})

// Define the baseRecipe schema
const baseRecipeSchema = z.object({
  id: z.string(),
  code: z.string()
})

// Define the recipe schema
const recipeSchema = baseRecipeSchema.extend({
  posibilityProduct: z.lazy(() => z.array(baseProductSchema)),
  applyProduct: z.lazy(() => z.array(baseProductSchema)),
  detail: z.array(recipeDetailSchema)
})

// Define the createRecipePayload schema
const createRecipePayloadSchema = recipeSchema.omit({ id: true })

export { recipeDetailSchema, baseRecipeSchema, recipeSchema, createRecipePayloadSchema }
