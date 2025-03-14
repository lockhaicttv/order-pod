import { z } from 'zod'

// Assuming the following schemas are defined elsewhere and imported accordingly
import { departmentSchema } from '@app/containers/Departments/constants/department.schemas'
import { baseEmployeeSchema } from '@app/containers/Employees/constants/employee.schemas'

const baseEmployeeGroupSchema = z.object({
  id: z.string(),
  code: z.string(),
  name: z.string()
})

const employeeGroupSchema = baseEmployeeGroupSchema.extend({
  dept: departmentSchema,
  employees: z.array(z.lazy(() => baseEmployeeSchema))
})

const updateEmployeeGroupPayloadSchema = employeeGroupSchema.extend({})

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
