import { z } from 'zod'

// Assuming the following schemas are defined elsewhere and imported accordingly
import { departmentSchema } from '@app/containers/Departments/constants/department.schemas'

const basePositionSchema = z.object({
  id: z.string(),
  name: z.string()
})

const positionSchema = basePositionSchema.extend({})

const updatePositionPayloadSchema = basePositionSchema.extend({})

const createPositionPayloadSchema = updatePositionPayloadSchema.omit({ id: true })

const deletePositionsParamsSchema = z.object({
  id: z.array(z.string())
})

export {
  basePositionSchema,
  positionSchema,
  updatePositionPayloadSchema,
  createPositionPayloadSchema,
  deletePositionsParamsSchema
}
