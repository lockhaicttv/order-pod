import { z } from 'zod'

// Define the baseDepartment schema
const baseDepartmentSchema = z.object({
  id: z.string(),
  code: z.string(),
  name: z.string()
})

// Define the department schema
const departmentSchema = baseDepartmentSchema.extend({
  shiftPerDay: z.number().int().nonnegative().default(1)
})

// Define the updateDepartmentPayload schema
const updateDepartmentPayloadSchema = departmentSchema

// Define the createDepartmentPayload schema
const createDepartmentPayloadSchema = departmentSchema.omit({ id: true })

// Define the deleteDepartmentsParams schema
const deleteDepartmentsParamsSchema = z.object({
  id: z.array(z.string())
})

// Define the getDepartmentParams schema
const getDepartmentParamsSchema = z.object({
  id: z.string()
})

export {
  baseDepartmentSchema,
  departmentSchema,
  updateDepartmentPayloadSchema,
  createDepartmentPayloadSchema,
  deleteDepartmentsParamsSchema,
  getDepartmentParamsSchema
}
