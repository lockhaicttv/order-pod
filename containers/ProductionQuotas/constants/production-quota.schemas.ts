import * as z from 'zod'
import { BaseProduct } from '@app/containers/Products/types/product.types'
import { BaseStage } from '@app/containers/Stages/types/stage.types'
import { BaseTool } from '@app/containers/Tools/types/tool.types'
import { baseProductSchema } from '@app/containers/Products/constants/product.schemas'
import { baseToolSchema } from '@app/containers/Tools/constants/tool.schemas'
import { baseStageSchema } from '@app/containers/Stages/constants/stage.schemas'
const productionQuotaSchema = z.object({
  id: z.string(),
  code: z.string(),
  stage: baseStageSchema.nullable().optional(),
  productOutput: baseProductSchema.nullable().optional(),
  tool: baseToolSchema.nullable().optional(),
  difficultLevel: z.string(),
  numberOfemployees: z.number(),
  produceQuota: z.number(),
  unit: z.string(),
  totalWeight: z.number()
})

const createProductionQuotaPayloadSchema = productionQuotaSchema.omit({
  id: true
})

const updateProductionQuotaPayloadSchema = createProductionQuotaPayloadSchema.extend({
  id: z.string()
})

export { productionQuotaSchema, createProductionQuotaPayloadSchema, updateProductionQuotaPayloadSchema }
