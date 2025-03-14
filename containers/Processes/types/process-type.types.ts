import { BaseProduct } from '@app/containers/Products/types/product.types'
import { Stage } from '@app/containers/Stages/types/stage.types'

export interface BaseProcess {
  id: string
  code: string
}

export interface Process extends BaseProcess {
  product: BaseProduct
  detail: ProcessDetail[]
}

export interface ProcessDetail {
  stageOrder: number
  stage: Stage
  exchangeRate: number
  backupRate: number
  input: BaseProduct | null
  output: BaseProduct | null
}

export interface CreateProcessPayload extends Omit<Process, 'id' | 'product' | 'detail'> {
  product?: BaseProduct | null
  detail: (Omit<ProcessDetail, 'stage' | 'input' | 'output'> & {
    input?: BaseProduct | null
    output?: BaseProduct | null
    stage?: Stage | null
  })[]
}

export type UpdateProcessPayload = CreateProcessPayload & { id: string }
