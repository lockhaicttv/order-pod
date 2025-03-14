import { z } from 'zod'
import { departmentSchema } from '@app/containers/Departments/constants/department.schemas'

// Define the baseStage schema
const baseStageSchema = z.object({
  id: z.string(),
  code: z.string(),
  name: z.string()
})

// Define the stage schema
const stageSchema = baseStageSchema.extend({
  workingDept: departmentSchema
})

const createStageSchema = stageSchema.omit({
  id: true
})

export { baseStageSchema, stageSchema, createStageSchema }
