import { Stage } from '@app/containers/Stages/types/stage.types'
import { Product } from '@app/containers/Products/types/product.types'

export interface BaseTool {
  id: string
  name: string
  code: string
}
export interface Tool extends BaseTool {
  cavity: number
  stage: Stage
  outputProduct: Product | null
  volume: number
}
