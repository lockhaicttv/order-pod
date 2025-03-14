import { BaseStage } from '@app/containers/Stages/types/stage.types'

export interface ProductIssue {
  id?: string | null
  code: string
  name: string
  issueStage: BaseStage
}

export interface UpdateProductIssuePayload extends ProductIssue {}

export interface CreateProductIssuePayload extends Omit<UpdateProductIssuePayload, 'id'> {}

export interface DeleteProductIssuesParams {
  id: string[]
}
