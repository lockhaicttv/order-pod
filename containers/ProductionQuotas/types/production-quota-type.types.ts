import { BaseProduct } from '@app/containers/Products/types/product.types'
import { BaseStage } from '@app/containers/Stages/types/stage.types'
import { BaseTool } from '@app/containers/Tools/types/tool.types'

export interface ProductionQuota {
  id: string
  code: string
  stage: BaseStage
  productOutput: BaseProduct
  tool: BaseTool
  difficultLevel: string
  numberOfemployees: number
  produceQuota: number
  unit: string
  totalWeight: number
}

export interface CreateProductionQuotaPayload extends Omit<ProductionQuota, 'productOutput' | 'stage' | 'tool' | 'id'> {
  stage?: BaseStage | null
  productOutput?: BaseProduct | null
  tool?: BaseTool | null
}

export type UpdateProductionQuotaPayload = CreateProductionQuotaPayload & { id: string }
