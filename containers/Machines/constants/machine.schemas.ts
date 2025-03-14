import { z } from 'zod'
import { stageSchema } from '@app/containers/Stages/constants/stage.schemas'

// Define the baseMachineSchema
const baseMachineSchema = z.object({
  id: z.string(),
  code: z.string()
})

// Define the machineSchema
const machineSchema = baseMachineSchema.extend({
  stage: stageSchema
})

export { baseMachineSchema, machineSchema }
