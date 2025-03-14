import { z } from 'zod'

// Assuming the following schemas are defined elsewhere and imported accordingly
import { departmentSchema } from '@app/containers/Departments/constants/department.schemas'

const baseEmployeeGroupSchema = z.object({
  id: z.string(),
  code: z.string(),
  name: z.string()
})

const employeeGroupSchema = baseEmployeeGroupSchema.extend({
  dept: departmentSchema
})

const updateEmployeeGroupPayloadSchema = baseEmployeeGroupSchema.extend({
  dept: departmentSchema.nullish()
})

const createEmployeeGroupPayloadSchema = updateEmployeeGroupPayloadSchema.omit({ id: true })

const deleteEmployeeGroupsParamsSchema = z.object({
  id: z.array(z.string())
})

export {
  baseEmployeeGroupSchema,
  employeeGroupSchema,
  updateEmployeeGroupPayloadSchema,
  createEmployeeGroupPayloadSchema,
  deleteEmployeeGroupsParamsSchema
}
