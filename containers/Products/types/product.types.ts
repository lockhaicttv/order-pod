import { BaseRecipe } from '@app/containers/Recipe/types/recipe.types'
import { BaseProcess } from '@app/containers/Processes/types/process-type.types'

export interface BaseProduct {
  id?: string | null
  code: string
  name: string
}

export interface Product extends BaseProduct {
  type: string
  unit: string
  weight: number
  recipe?: BaseRecipe | null
  process?: BaseProcess | null
}
