import { z } from 'zod'

// Assuming the following schemas are defined elsewhere and imported accordingly
import { departmentSchema } from '@app/containers/Departments/constants/department.schemas'
import { employeeGroupSchema } from '@app/containers/EmployeeGroups/constants/employee-group.schemas'
import { positionSchema } from '@app/containers/Positions/constants/position.schemas'

const baseEmployeeSchema = z.object({
  id: z.string(),
  code: z.string(),
  name: z.string()
})

const employeeSchema = baseEmployeeSchema.extend({
  dept: departmentSchema,
  group: z.lazy(() => employeeGroupSchema),
  position: positionSchema
})

const updateEmployeePayloadSchema = employeeSchema.omit({ id: true })

const createEmployeePayloadSchema = employeeSchema.omit({ id: true })

const deleteEmployeesParamsSchema = z.object({
  id: z.array(z.string())
})

export {
  baseEmployeeSchema,
  employeeSchema,
  updateEmployeePayloadSchema,
  createEmployeePayloadSchema,
  deleteEmployeesParamsSchema
}
