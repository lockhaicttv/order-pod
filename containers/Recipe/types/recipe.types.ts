import { BaseProduct, Product } from '@app/containers/Products/types/product.types'

export interface RecipeDetail {
  material: Product
  weight: number
}

export interface BaseRecipe {
  id: string
  code: string
}

export interface Recipe extends BaseRecipe {
  posibilityProduct: BaseProduct[]
  applyProduct: BaseProduct[]
  detail: RecipeDetail[]
}

export interface UpdateRecipePayload extends Recipe {}
export interface CreateRecipePayload extends Omit<Recipe, 'id'> {}

export interface DeleteRecipesParams {
  id: string[]
}
