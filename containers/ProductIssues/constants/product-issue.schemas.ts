import { z } from 'zod'
import { baseStageSchema } from '@app/containers/Stages/constants/stage.schemas' // Adjust the import path as needed

const productIssueSchema = z.object({
  id: z.string().nullish(),
  code: z.string(),
  name: z.string(),
  issueStage: baseStageSchema
})

const createProductIssueSchema = productIssueSchema.omit({
  id: true
})

export { productIssueSchema, createProductIssueSchema }
